import { useEffect, useRef, useState, type ReactNode } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

/* ==========================================================================
   通用三维查看器（Three.js）
   —— 轨道旋转 / 滚轮缩放 / 悬停标签 / 点击识别 / 部件显隐 / 自动降级
   场景由 factory 提供，满足“换章节只换内容、不重写查看器”
   ========================================================================== */

export interface ViewerPart {
  id: string
  label: string
  detail: string
  anchor: THREE.Vector3
  objects: THREE.Object3D[]
}

export interface ViewerToggle {
  id: string
  label: string
  on: boolean
}

export interface ViewerScene {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  parts: ViewerPart[]
  toggles?: ViewerToggle[]
  setToggle?: (id: string, on: boolean) => void
  setHighlight?: (id: string | null) => void
  /** 取景包围球半径：用于按视口自动调整相机距离，避免裁切 */
  fit?: { radius: number }
  /** 每帧更新（可选），用于自定义动画 */
  update?: (elapsed: number, delta: number) => void
  dispose?: () => void
}

export type SceneFactory = (ctx: { lowPower: boolean; reducedMotion: boolean }) => ViewerScene

export interface ModelViewerProps {
  factory: SceneFactory
  title: string
  hint?: string
  /** WebGL 不可用时的等价静态图 */
  fallback: ReactNode
  onSelect?: (part: ViewerPart | null) => void
  /** 场景构建完成后回传部件清单，供外部面板复用（避免文案重复维护） */
  onReady?: (parts: ViewerPart[]) => void
  selectedId?: string | null
  height?: number
  badge?: string
}

function detectLowPower(): boolean {
  const cores = navigator.hardwareConcurrency ?? 8
  const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8
  const small = window.innerWidth < 720
  return cores <= 4 || mem <= 4 || small
}

export function ModelViewer({
  factory,
  title,
  hint = '拖动旋转 · 滚轮缩放 · 点击结构查看说明',
  fallback,
  onSelect,
  onReady,
  selectedId,
  height = 420,
  badge,
}: ModelViewerProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<ViewerScene | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const rotateRef = useRef(true)
  const hoverRef = useRef<string | null>(null)

  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [toggles, setToggles] = useState<ViewerToggle[]>([])
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady

  useEffect(() => {
    const host = hostRef.current
    const labelLayer = labelRef.current
    if (!host || !labelLayer) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lowPower = detectLowPower()

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !lowPower, alpha: true, powerPreference: 'high-performance' })
    } catch {
      setFailed(true)
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? 1.5 : 2))
    renderer.setSize(host.clientWidth, host.clientHeight, false)
    renderer.domElement.className = 'stage__canvas'
    renderer.domElement.setAttribute('tabindex', '0')
    renderer.domElement.setAttribute('role', 'img')
    renderer.domElement.setAttribute('aria-label', `${title}：可旋转的三维模型`)
    host.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const built = factory({ lowPower, reducedMotion })
    sceneRef.current = built
    onReadyRef.current?.(built.parts)
    setToggles(built.toggles ? built.toggles.map((t) => ({ ...t })) : [])
    setFailed(false)
    setReady(true)

    const controls = new OrbitControls(built.camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.enablePan = false
    controls.minDistance = 3
    controls.maxDistance = 14
    controls.autoRotate = !reducedMotion
    controls.autoRotateSpeed = 0.9
    rotateRef.current = !reducedMotion
    controlsRef.current = controls

    /** 依据视口宽高比自动取景：保证模型在任意屏幕比例下完整可见 */
    const fitCamera = () => {
      const fit = built.fit
      if (!fit) return
      const aspect = built.camera.aspect || 1
      const fov = (built.camera.fov * Math.PI) / 180
      const distH = (fit.radius / Math.tan(fov / 2)) * 1.06
      const distW = distH / Math.max(aspect, 0.45)
      const dist = Math.max(distH, distW)
      const dir = built.camera.position.clone().sub(controls.target).normalize()
      built.camera.position.copy(controls.target).addScaledVector(dir, dist)
      controls.minDistance = dist * 0.45
      controls.maxDistance = dist * 2.4
      built.camera.updateProjectionMatrix()
    }
    fitCamera()

    // ---- 标签元素（命令式创建，避免每帧触发 React 重渲染） ----
    const labelEls = new Map<string, HTMLButtonElement>()
    built.parts.forEach((p) => {
      const el = document.createElement('button')
      el.type = 'button'
      el.className = 'stage__label'
      el.textContent = p.label
      el.style.opacity = '0'
      el.setAttribute('tabindex', '-1')
      el.addEventListener('click', () => {
        built.setHighlight?.(p.id)
        onSelectRef.current?.(p)
      })
      labelLayer.appendChild(el)
      labelEls.set(p.id, el)
    })

    // ---- 指针拾取 ----
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    const pickables = built.parts.flatMap((p) => p.objects)

    const findPart = (event: PointerEvent): ViewerPart | null => {
      const rect = renderer.domElement.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(pointer, built.camera)
      const hits = raycaster.intersectObjects(pickables, true)
      if (hits.length === 0) return null
      // 从命中的子网格向上回溯，找到所属部件
      let node: THREE.Object3D | null = hits[0].object
      while (node) {
        const part = built.parts.find((p) => p.objects.some((o) => o === node))
        if (part) return part
        node = node.parent
      }
      return null
    }

    /** 判断对象是否真的可见（含父级组） */
    const effectivelyVisible = (obj: THREE.Object3D): boolean => {
      let node: THREE.Object3D | null = obj
      while (node) {
        if (!node.visible) return false
        node = node.parent
      }
      return true
    }

    const handleMove = (event: PointerEvent) => {
      const part = findPart(event)
      const id = part?.id ?? null
      if (id !== hoverRef.current) {
        hoverRef.current = id
        renderer.domElement.style.cursor = id ? 'pointer' : 'grab'
        built.setHighlight?.(id)
      }
    }
    const handleLeave = () => {
      if (hoverRef.current) {
        hoverRef.current = null
        built.setHighlight?.(null)
        renderer.domElement.style.cursor = 'grab'
      }
    }
    const handleClick = (event: PointerEvent) => {
      const part = findPart(event)
      if (part) {
        built.setHighlight?.(part.id)
        onSelectRef.current?.(part)
      }
    }
    renderer.domElement.addEventListener('pointermove', handleMove)
    renderer.domElement.addEventListener('pointerleave', handleLeave)
    renderer.domElement.addEventListener('pointerdown', handleClick)

    // ---- 尺寸自适应 ----
    const resize = () => {
      if (!host.clientWidth || !host.clientHeight) return
      renderer.setSize(host.clientWidth, host.clientHeight, false)
      built.camera.aspect = host.clientWidth / host.clientHeight
      built.camera.updateProjectionMatrix()
      fitCamera()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(host)

    // ---- 渲染循环 ----
    const clock = new THREE.Clock()
    let raf = 0
    let frame = 0
    const tmp = new THREE.Vector3()
    const loop = () => {
      raf = requestAnimationFrame(loop)
      const delta = clock.getDelta()
      const elapsed = clock.elapsedTime
      controls.autoRotate = rotateRef.current
      controls.update()
      built.update?.(elapsed, delta)

      // 标签投影（限帧，降低开销）
      frame += 1
      if (frame % (lowPower ? 4 : 2) === 0) {
        built.parts.forEach((p) => {
          const el = labelEls.get(p.id)
          if (!el) return
          tmp.copy(p.anchor).project(built.camera)
          const visible = tmp.z < 1 && effectivelyVisible(p.objects[0])
          el.style.left = `${((tmp.x + 1) / 2) * 100}%`
          el.style.top = `${((1 - tmp.y) / 2) * 100}%`
          el.style.opacity = visible ? (hoverRef.current === p.id ? '1' : '0.72') : '0'
        })
      }
      renderer.render(built.scene, built.camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      renderer.domElement.removeEventListener('pointermove', handleMove)
      renderer.domElement.removeEventListener('pointerleave', handleLeave)
      renderer.domElement.removeEventListener('pointerdown', handleClick)
      controls.dispose()
      built.dispose?.()
      labelEls.forEach((el) => el.remove())
      renderer.dispose()
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement)
      sceneRef.current = null
    }
  }, [factory, title])

  // 外部选中项同步高亮
  useEffect(() => {
    if (selectedId !== undefined && sceneRef.current) {
      sceneRef.current.setHighlight?.(selectedId)
    }
  }, [selectedId])

  const handleToggle = (id: string, on: boolean) => {
    sceneRef.current?.setToggle?.(id, on)
    setToggles((prev) => prev.map((t) => (t.id === id ? { ...t, on } : t)))
  }

  return (
    <div className="modelviewer">
      {failed ? (
        <div className="stage" style={{ height }}>
          {fallback}
        </div>
      ) : (
        <div className="stage" style={{ height }}>
          <div className="stage__viewport">
            <div ref={hostRef} className="stage__host" />
            <div ref={labelRef} className="stage__labels" aria-hidden="true" />
            {badge ? <span className="stage__badge">{badge}</span> : null}
            {ready ? <span className="stage__hint">{hint}</span> : null}
          </div>
          <div className="stage__toolbar">
            <button
              type="button"
              className="btn btn--sm"
              aria-pressed={autoRotate}
              onClick={() => {
                const next = !autoRotate
                setAutoRotate(next)
                rotateRef.current = next
              }}
            >
              {autoRotate ? '暂停旋转' : '自动旋转'}
            </button>
            <button
              type="button"
              className="btn btn--sm"
              onClick={() => {
                const s = sceneRef.current
                const c = controlsRef.current
                if (s && c) {
                  c.target.set(0, 0, 0)
                  s.camera.position.set(0, 1.6, 7.5)
                  c.update()
                }
              }}
            >
              复位视角
            </button>
            {toggles.map((t) => (
              <button
                key={t.id}
                type="button"
                className="btn btn--sm"
                aria-pressed={t.on}
                onClick={() => handleToggle(t.id, !t.on)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
