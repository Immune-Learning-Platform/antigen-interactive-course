import * as THREE from 'three'
import type { ViewerPart, ViewerScene } from './ModelViewer'

/* 三维场景公共工具：配色、光照、材质、高亮 */

export const PALETTE = {
  wall: '#2f8a73',
  wallDark: '#17564a',
  membrane: '#7fc3a6',
  capsule: '#cfe9dd',
  flagella: '#d8b45a',
  pili: '#7aa8e0',
  teichoic: '#e0762f',
  envelope: '#3f8fa8',
  capsid: '#2f6f8f',
  genome: '#e4c76a',
  spike: '#e07a2f',
  antigen: '#8fc9ae',
  epitopeLinear: '#c9a227',
  epitopeConf: '#6fb0ef',
  antibodyHeavy: '#2f7d6a',
  antibodyLight: '#8fc9ae',
}

export function stdMat(
  color: string,
  opts: { opacity?: number; metalness?: number; roughness?: number; transparent?: boolean } = {},
) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: opts.roughness ?? 0.55,
    metalness: opts.metalness ?? 0.1,
    transparent: opts.transparent ?? (opts.opacity !== undefined && opts.opacity < 1),
    opacity: opts.opacity ?? 1,
    emissive: new THREE.Color('#000000'),
  })
}

export function baseScene(): THREE.Scene {
  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2('#071d1a', 0.045)

  const hemi = new THREE.HemisphereLight('#d9f2e8', '#07231f', 1.15)
  scene.add(hemi)

  const key = new THREE.DirectionalLight('#ffffff', 2.1)
  key.position.set(5, 7, 6)
  scene.add(key)

  const rim = new THREE.DirectionalLight('#8fc9ae', 1.1)
  rim.position.set(-6, -3, -5)
  scene.add(rim)

  const fill = new THREE.DirectionalLight('#9fc4ff', 0.7)
  fill.position.set(0, -6, 4)
  scene.add(fill)

  return scene
}

export function makeCamera(distance = 7.5, y = 1.4): THREE.PerspectiveCamera {
  const cam = new THREE.PerspectiveCamera(45, 16 / 9, 0.1, 100)
  cam.position.set(0, y, distance)
  cam.lookAt(0, 0, 0)
  return cam
}

/** 生成 setHighlight 实现：选中/悬停时提高自发光并轻微放大 */
export function makeHighlighter(parts: ViewerPart[]) {
  const originals = new Map<THREE.Object3D, { emissive: THREE.Color; scale: number }>()
  parts.forEach((p) =>
    p.objects.forEach((o) => {
      o.traverse((child) => {
        const mesh = child as THREE.Mesh
        const material = mesh.material as THREE.MeshStandardMaterial | undefined
        if (material && 'emissive' in material) {
          originals.set(child, { emissive: material.emissive.clone(), scale: child.scale.x })
        }
      })
    }),
  )

  return (activeId: string | null) => {
    parts.forEach((p) => {
      const on = p.id === activeId
      p.objects.forEach((o) =>
        o.traverse((child) => {
          const mesh = child as THREE.Mesh
          const material = mesh.material as THREE.MeshStandardMaterial | undefined
          if (!material || !('emissive' in material)) return
          const orig = originals.get(child)
          if (!orig) return
          material.emissive.copy(on ? new THREE.Color('#c9a227') : orig.emissive)
          material.emissiveIntensity = on ? 0.85 : 0.05
          const s = on ? orig.scale * 1.04 : orig.scale
          child.scale.setScalar(s)
        }),
      )
    })
  }
}

/** 释放场景内所有几何体与材质 */
export function disposeScene(scene: THREE.Scene) {
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh
    mesh.geometry?.dispose?.()
    const material = mesh.material as THREE.Material | THREE.Material[] | undefined
    if (Array.isArray(material)) material.forEach((m) => m.dispose())
    else material?.dispose?.()
  })
}

/** 组合：把 parts/toggles 与场景组装成 ViewerScene */
export function assemble(
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  parts: ViewerPart[],
  extra: Partial<ViewerScene> = {},
): ViewerScene {
  const highlight = makeHighlighter(parts)
  return {
    scene,
    camera,
    parts,
    setHighlight: highlight,
    dispose: () => disposeScene(scene),
    ...extra,
  }
}

/** 沿曲线生成管状结构（鞭毛/菌毛等） */
export function tubeAlong(points: [number, number, number][], radius: number, color: string) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)))
  const geometry = new THREE.TubeGeometry(curve, 64, radius, 8, false)
  const mesh = new THREE.Mesh(geometry, stdMat(color, { roughness: 0.5 }))
  return mesh
}
