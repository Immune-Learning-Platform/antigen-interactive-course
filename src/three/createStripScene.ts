import * as THREE from 'three'
import type { SceneFactory, ViewerPart } from './ModelViewer'
import { assemble, baseScene, makeCamera, stdMat } from './shared'

/**
 * 免疫层析试纸条结构模型（第7章）
 * 依据课件第 6—10 页：以硝酸纤维素膜为载体、微孔膜毛细管作用驱动；
 * 结构含样品垫 → 结合垫（金垫）→ NC 膜（T 线、C 线）→ 吸水垫。
 *
 * 比例为教学示意：各段长度与实际产品不一致。
 */
export const createStripScene: SceneFactory = ({ lowPower }) => {
  const scene = baseScene()
  const camera = makeCamera(9.8, 3.6)

  const root = new THREE.Group()
  scene.add(root)

  const BASE_Z = 0
  const H = 0.14 // 片材厚度

  // ---------- 背板（底板） ----------
  const backing = new THREE.Mesh(
    new THREE.BoxGeometry(6.6, 0.1, 1.5),
    stdMat('#e6dccb', { roughness: 0.85 }),
  )
  backing.position.set(0, -0.1, BASE_Z)
  root.add(backing)

  // ---------- 样品垫 ----------
  const samplePad = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, H, 1.4),
    stdMat('#d9efe4', { roughness: 0.8 }),
  )
  samplePad.position.set(-2.65, 0, BASE_Z)
  const padGroup = new THREE.Group()
  padGroup.add(samplePad)
  root.add(padGroup)

  // ---------- 结合垫（金垫） ----------
  const conjugatePad = new THREE.Mesh(
    new THREE.BoxGeometry(1.15, H, 1.4),
    stdMat('#c9a227', { roughness: 0.6, opacity: 0.85 }),
  )
  conjugatePad.position.set(-1.42, 0, BASE_Z)
  const conjugateGroup = new THREE.Group()
  conjugateGroup.add(conjugatePad)

  // 金标抗体颗粒（示意）
  const goldMat = stdMat('#c9a227', { roughness: 0.3 })
  for (let i = 0; i < (lowPower ? 6 : 12); i += 1) {
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 6), goldMat)
    bead.position.set(-1.85 + (i % 4) * 0.22, 0.1, -0.45 + Math.floor(i / 4) * 0.45)
    conjugateGroup.add(bead)
  }
  root.add(conjugateGroup)

  // ---------- NC 膜 ----------
  const ncMembrane = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, H, 1.4),
    stdMat('#fbfdfc', { roughness: 0.9 }),
  )
  ncMembrane.position.set(0.95, 0, BASE_Z)
  const ncGroup = new THREE.Group()
  ncGroup.add(ncMembrane)
  root.add(ncGroup)

  // ---------- T 线 ----------
  const tLine = new THREE.Mesh(
    new THREE.BoxGeometry(0.13, H + 0.02, 1.3),
    stdMat('#b8493f', { roughness: 0.5 }),
  )
  tLine.position.set(0.45, 0.01, BASE_Z)
  const tGroup = new THREE.Group()
  tGroup.add(tLine)
  root.add(tGroup)

  // ---------- C 线 ----------
  const cLine = new THREE.Mesh(
    new THREE.BoxGeometry(0.13, H + 0.02, 1.3),
    stdMat('#12564c', { roughness: 0.5 }),
  )
  cLine.position.set(1.55, 0.01, BASE_Z)
  const cGroup = new THREE.Group()
  cGroup.add(cLine)
  root.add(cGroup)

  // ---------- 吸水垫 ----------
  const absorbentPad = new THREE.Mesh(
    new THREE.BoxGeometry(1.35, H, 1.4),
    stdMat('#dfe7e3', { roughness: 0.9 }),
  )
  absorbentPad.position.set(3.4, 0, BASE_Z)
  const absorbentGroup = new THREE.Group()
  absorbentGroup.add(absorbentPad)
  root.add(absorbentGroup)

  // ---------- 流动方向箭头（示意） ----------
  const flowGroup = new THREE.Group()
  const flowMat = stdMat('#1f6fd0', { roughness: 0.4 })
  for (let i = 0; i < 5; i += 1) {
    const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.28, 10), flowMat)
    arrow.position.set(-3.0 + i * 1.5, 0.42, BASE_Z)
    arrow.rotation.z = -Math.PI / 2
    flowGroup.add(arrow)
  }
  root.add(flowGroup)

  root.rotation.set(0.62, 0, 0) // 俯视角度，便于观察各段
  root.position.y = -0.4

  const parts: ViewerPart[] = [
    {
      id: 'pad',
      label: '样品垫（滴样处）',
      detail:
        '样品从这里滴入，是整条试纸条液体流动的起点。样品的体积与加样方式会直接影响结果（加样不足可能导致 C 线不显色）。',
      anchor: new THREE.Vector3(-2.65, 0.75, 0.2),
      objects: [padGroup],
    },
    {
      id: 'conjugate',
      label: '结合垫（金垫）',
      detail:
        '预先干燥固定着**金标抗体**（检测抗原时）或**金标抗原**（检测抗体时）。液体流经时被重新润湿、释放，与样品中的目标物结合形成复合物。',
      anchor: new THREE.Vector3(-1.42, 0.75, 0.2),
      objects: [conjugateGroup],
    },
    {
      id: 'tline',
      label: '检测线（T 线）',
      detail:
        '夹心法中固定**抗该抗原的抗体**，负责拦截“金标抗体—抗原”复合物并聚集显色。**T 线是否显色代表有没有目标物**。',
      anchor: new THREE.Vector3(0.45, 0.72, 0.2),
      objects: [tGroup],
    },
    {
      id: 'cline',
      label: '质控线（C 线）',
      detail:
        '固定能识别金标抗体物种标志的抗体（如抗鼠抗体）。它拦截未被 T 线拦截的金标物并显色，**证明液体正常流过且金标物有活性**。C 线不显色 = 试纸条无效。',
      anchor: new THREE.Vector3(1.55, 0.72, 0.2),
      objects: [cGroup],
    },
    {
      id: 'absorbent',
      label: '吸水垫',
      detail:
        '位于末端，负责“抽水”，维持毛细流动持续向前。若吸水垫饱和或受潮，层析会中断，可能导致结果异常。',
      anchor: new THREE.Vector3(3.4, 0.72, 0.2),
      objects: [absorbentGroup],
    },
    {
      id: 'flow',
      label: '流动方向（毛细作用）',
      detail:
        '液体始终从样品垫流向吸水垫。课件三个环节的第一个就是“毛细管作用驱动层析”——它解决“样品怎样向前移动”。',
      anchor: new THREE.Vector3(0, 1.35, 0),
      objects: [flowGroup],
    },
  ]

  return assemble(scene, camera, parts, {
    fit: { radius: 4.4 },
    toggles: [
      { id: 'flow', label: '流动方向', on: true },
      { id: 'nc', label: 'NC 膜', on: true },
      { id: 'conjugate', label: '金垫颗粒', on: true },
    ],
    setToggle: (id, on) => {
      if (id === 'flow') flowGroup.visible = on
      if (id === 'nc') ncGroup.visible = on
      if (id === 'conjugate') conjugateGroup.visible = on
    },
  })
}
