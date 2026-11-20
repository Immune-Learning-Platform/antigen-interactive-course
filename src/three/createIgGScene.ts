import * as THREE from 'three'
import type { SceneFactory, ViewerPart } from './ModelViewer'
import { assemble, baseScene, makeCamera, stdMat } from './shared'

/**
 * IgG 结构解剖模型（第3章 · 抗体结构）
 * 依据课件第 5—6 页：
 *  · 两条相同重链 + 两条相同轻链，二硫键连接，呈“Y”字型；
 *  · 重链 450~550 aa，轻链约 214 aa；
 *  · 靠近 N 端约 110 aa 为可变区（V 区），其余为恒定区（C 区）。
 *
 * 几何为教学示意：链长比例、角度与二硫键位置经简化，不代表真实原子级结构。
 */
const HEAVY = '#2f7d6a'
const LIGHT = '#8fc9ae'
const VREGION = '#c9a227'
const HINGE = '#12564c'

function segment(
  a: THREE.Vector3,
  b: THREE.Vector3,
  radius: number,
  color: string,
  opacity = 1,
) {
  const dir = new THREE.Vector3().subVectors(b, a)
  const len = dir.length()
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius * 0.96, len, 18),
    stdMat(color, { roughness: 0.45, opacity, transparent: opacity < 1 }),
  )
  mesh.position.copy(a).addScaledVector(dir, 0.5)
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
  return mesh
}

function bead(position: THREE.Vector3, r: number, color: string) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 14), stdMat(color, { roughness: 0.4 }))
  mesh.position.copy(position)
  return mesh
}

export const createIgGScene: SceneFactory = ({ lowPower }) => {
  const scene = baseScene()
  const camera = makeCamera(8.4, 0.8)

  const root = new THREE.Group()
  root.position.y = -0.5
  scene.add(root)

  // ---- 关键坐标（Y 字型：铰链在下，两条臂向上分开）----
  const hinge = new THREE.Vector3(0, 0, 0)
  const stemEnd = new THREE.Vector3(0, -1.9, 0) // Fc 底端
  const rightElbow = new THREE.Vector3(1.05, 1.25, 0)
  const leftElbow = new THREE.Vector3(-1.05, 1.25, 0)
  const rightTip = new THREE.Vector3(1.62, 2.25, 0)
  const leftTip = new THREE.Vector3(-1.62, 2.25, 0)

  // ---- 重链（两条）：铰链 → 肘部 → 臂内段 ----
  const heavyRight = segment(hinge, rightElbow, 0.135, HEAVY)
  const heavyLeft = segment(hinge, leftElbow, 0.135, HEAVY)
  // 重链的 Fc 主干（铰链 → 底端）
  const heavyStem = segment(hinge, stemEnd, 0.155, HEAVY)

  // ---- 轻链（两条）：与重链臂并行，略靠外侧 ----
  const lightRight = segment(rightElbow, rightTip, 0.115, LIGHT)
  const lightLeft = segment(leftElbow, leftTip, 0.115, LIGHT)

  const heavyGroup = new THREE.Group()
  heavyGroup.add(heavyRight, heavyLeft, heavyStem)

  const lightGroup = new THREE.Group()
  lightGroup.add(lightRight, lightLeft)

  // ---- 可变区（V 区）：臂的远端约 1/3，金色高亮 ----
  const vGroup = new THREE.Group()
  const vRightA = rightElbow.clone().lerp(rightTip, 0.42)
  const vRightB = rightTip.clone()
  const vLeftA = leftElbow.clone().lerp(leftTip, 0.42)
  const vLeftB = leftTip.clone()
  vGroup.add(
    segment(vRightA, vRightB, 0.145, VREGION),
    segment(vLeftA, vLeftB, 0.145, VREGION),
    bead(rightTip, 0.165, VREGION),
    bead(leftTip, 0.165, VREGION),
  )

  // ---- 恒定区（C 区）：除 V 区以外的部分（用半透明包覆示意分区）----
  const cGroup = new THREE.Group()
  const cMat = '#7fb8a6'
  cGroup.add(
    segment(hinge, rightElbow, 0.16, cMat, 0.32),
    segment(hinge, leftElbow, 0.16, cMat, 0.32),
    segment(hinge, stemEnd, 0.18, cMat, 0.32),
    segment(rightElbow, vRightA, 0.155, cMat, 0.32),
    segment(leftElbow, vLeftA, 0.155, cMat, 0.32),
  )

  // ---- Fc 段：双链主干（铰链以下）----
  const fcGroup = new THREE.Group()
  fcGroup.add(heavyStem, bead(stemEnd, 0.2, '#1f8472'))
  if (!lowPower) {
    // 两条重链在 Fc 段的并行示意
    fcGroup.add(
      segment(hinge.clone().add(new THREE.Vector3(0.11, 0, 0)), stemEnd.clone().add(new THREE.Vector3(0.11, 0, 0)), 0.09, HEAVY, 0.85),
      segment(hinge.clone().add(new THREE.Vector3(-0.11, 0, 0)), stemEnd.clone().add(new THREE.Vector3(-0.11, 0, 0)), 0.09, HEAVY, 0.85),
    )
  }

  // ---- 二硫键：重链与轻链之间 ----
  const ssGroup = new THREE.Group()
  const ssMat = stdMat('#e0762f', { roughness: 0.35 })
  const ssPositions: [THREE.Vector3, THREE.Vector3][] = [
    [rightElbow.clone().add(new THREE.Vector3(0.06, 0.02, 0.12)), rightElbow.clone().add(new THREE.Vector3(-0.02, -0.06, -0.02))],
    [leftElbow.clone().add(new THREE.Vector3(-0.06, 0.02, 0.12)), leftElbow.clone().add(new THREE.Vector3(0.02, -0.06, -0.02))],
    [hinge.clone().add(new THREE.Vector3(0.14, 0.1, 0)), hinge.clone().add(new THREE.Vector3(-0.14, 0.1, 0))],
  ]
  ssPositions.forEach(([a, b]) => {
    const ss = segment(a, b, 0.032, '#e0762f')
    ;(ss.material as THREE.MeshStandardMaterial).roughness = 0.35
    ssGroup.add(ss)
  })
  void ssMat

  // ---- 铰链区 ----
  const hingeGroup = new THREE.Group()
  hingeGroup.add(bead(hinge, 0.15, HINGE))

  root.add(heavyGroup, lightGroup, vGroup, cGroup, fcGroup, ssGroup, hingeGroup)
  root.rotation.set(0.06, -0.22, 0)

  const parts: ViewerPart[] = [
    {
      id: 'heavy',
      label: '重链（H 链）',
      detail:
        '重链含 450~550 个氨基酸。抗体由两条相同的重链与两条相同的轻链组成，重链构成 Y 字的主干与臂的内侧部分。',
      anchor: new THREE.Vector3(-1.45, 0.85, 0.25),
      objects: [heavyGroup],
    },
    {
      id: 'light',
      label: '轻链（L 链）',
      detail:
        '轻链约 214 个氨基酸。两条相同的轻链与重链的 N 端部分共同构成抗原结合臂。',
      anchor: new THREE.Vector3(1.75, 1.6, 0.25),
      objects: [lightGroup],
    },
    {
      id: 'vregion',
      label: '可变区（V 区）',
      detail:
        '重链和轻链靠近 N 端约 110 个氨基酸为可变区。V 区序列变化大，与抗原表位互补结合，**决定抗体识别什么抗原**。图中以金色标出两臂的远端。',
      anchor: new THREE.Vector3(0, 2.65, 0.15),
      objects: [vGroup],
    },
    {
      id: 'cregion',
      label: '恒定区（C 区）',
      detail:
        '除 V 区以外的部分，氨基酸序列相对恒定。C 区承担**效应功能**：与补体 C1q、Fc 受体等相互作用，从而介导调理、ADCC、CDC 等。图中以半透明层示意分区。',
      anchor: new THREE.Vector3(-0.75, 0.35, 0.4),
      objects: [cGroup],
    },
    {
      id: 'fc',
      label: 'Fc 段',
      detail:
        '位于 Y 的主干（铰链以下）。木瓜蛋白酶水解可得到完整的 Fc 片段；胃蛋白酶水解时 Fc 区被降解——这正是抗蛇毒血清以 F(ab′)₂ 为主要成分的原因。',
      anchor: new THREE.Vector3(0, -2.25, 0.2),
      objects: [fcGroup, hingeGroup],
    },
    {
      id: 'disulfide',
      label: '二硫键',
      detail:
        '连接重链与轻链、以及链内球型结构之间。课件指出：每条多肽链均可折叠成多个球型结构，球型结构之间由二硫键相连。',
      anchor: new THREE.Vector3(1.15, 1.05, 0.35),
      objects: [ssGroup],
    },
  ]

  return assemble(scene, camera, parts, {
    fit: { radius: 3.1 },
    toggles: [
      { id: 'v', label: 'V 区高亮', on: true },
      { id: 'c', label: 'C 区示意', on: false },
      { id: 'light', label: '轻链', on: true },
      { id: 'disulfide', label: '二硫键', on: true },
    ],
    setToggle: (id, on) => {
      if (id === 'v') vGroup.visible = on
      if (id === 'c') cGroup.visible = on
      if (id === 'light') lightGroup.visible = on
      if (id === 'disulfide') ssGroup.visible = on
    },
  })
}
