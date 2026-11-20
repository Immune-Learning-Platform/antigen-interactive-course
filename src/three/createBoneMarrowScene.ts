import * as THREE from 'three'
import type { SceneFactory, ViewerPart } from './ModelViewer'
import { assemble, baseScene, makeCamera, stdMat } from './shared'

/**
 * 骨髓腔结构模型（第2章 · 骨髓）
 * 依据课件第 5—6 页：骨髓 = 骨髓腔 + 松质骨骨小梁间隙内的软组织，
 * 含黄骨髓、红骨髓；红骨髓是造血场所，含 HSC/MSC；造血组织与血窦构成空间结构，
 * HIM（造血诱导微环境）支持与调控造血。
 *
 * 结构为教学示意：骨小梁的形态、数量与比例不代表真实解剖测量值。
 */
export const createBoneMarrowScene: SceneFactory = ({ lowPower }) => {
  const scene = baseScene()
  const camera = makeCamera(8.6, 1.6)

  const root = new THREE.Group()
  scene.add(root)

  // ---------- 骨皮质（外层骨筒，剖开一半以便观察内部） ----------
  const cortexGroup = new THREE.Group()
  const cortexMat = stdMat('#d8d2c4', { roughness: 0.85, metalness: 0.02 })
  const cortex = new THREE.Mesh(
    new THREE.CylinderGeometry(1.62, 1.62, 5.4, lowPower ? 20 : 44, 1, true, 0, Math.PI * 1.35),
    cortexMat,
  )
  cortex.rotation.z = Math.PI / 2
  cortexGroup.add(cortex)
  root.add(cortexGroup)

  // ---------- 骨小梁（松质骨，海绵状网格） ----------
  const trabeculae = new THREE.Group()
  const trabMat = stdMat('#e6dccb', { roughness: 0.9 })
  const trabCount = lowPower ? 16 : 30
  for (let i = 0; i < trabCount; i += 1) {
    const a = (i / trabCount) * Math.PI * 2
    const y = ((i % 5) - 2) * 0.42
    const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 1.5, 6), trabMat)
    strut.position.set((i % 3 - 1) * 0.55, y, Math.cos(a) * 0.72)
    strut.rotation.set(Math.cos(a) * 0.7, a, Math.sin(a) * 0.6)
    trabeculae.add(strut)
  }
  root.add(trabeculae)

  // ---------- 红骨髓（造血场所） ----------
  const redMarrow = new THREE.Group()
  const redMat = stdMat('#b8493f', { roughness: 0.62, opacity: 0.94 })
  const redBody = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.86, 3.1, lowPower ? 8 : 18, lowPower ? 16 : 32),
    redMat,
  )
  redBody.rotation.z = Math.PI / 2
  redMarrow.add(redBody)
  root.add(redMarrow)

  // ---------- 黄骨髓（脂肪为主，位于一端作对比） ----------
  const yellowMarrow = new THREE.Group()
  const yellowMat = stdMat('#d9b64a', { roughness: 0.55, opacity: 0.92 })
  const yellowBody = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.8, 0.9, lowPower ? 6 : 14, lowPower ? 12 : 24),
    yellowMat,
  )
  yellowBody.rotation.z = Math.PI / 2
  yellowBody.position.set(2.05, 0, 0)
  yellowMarrow.add(yellowBody)
  root.add(yellowMarrow)

  // ---------- 血窦（贯穿骨髓的血管通道） ----------
  const sinusGroup = new THREE.Group()
  const sinusMat = stdMat('#2f6f8f', { roughness: 0.45, opacity: 0.75 })
  const sinusPaths: [number, number, number][][] = [
    [
      [-1.7, 0.34, 0.18],
      [-0.6, 0.2, 0.3],
      [0.5, 0.1, 0.22],
      [1.6, 0.02, 0.12],
    ],
    [
      [-1.6, -0.36, -0.14],
      [-0.4, -0.26, -0.24],
      [0.7, -0.16, -0.18],
      [1.7, -0.06, -0.1],
    ],
    [
      [-1.2, 0.02, -0.4],
      [0.0, -0.02, -0.34],
      [1.2, -0.04, -0.26],
    ],
  ]
  sinusPaths.forEach((pts) => {
    const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)))
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.075, 8, false), sinusMat)
    sinusGroup.add(tube)
  })
  root.add(sinusGroup)

  // ---------- 造血微环境（HIM）：围绕造血的细胞与因子网络 ----------
  const nicheGroup = new THREE.Group()
  const stromaMat = stdMat('#57b08c', { roughness: 0.6 })
  const cytokineMat = stdMat('#c9a227', { roughness: 0.4 })
  const nicheCenter = new THREE.Vector3(-0.15, 0.05, 0.42)
  const nicheCount = lowPower ? 10 : 20
  for (let i = 0; i < nicheCount; i += 1) {
    const a = (i / nicheCount) * Math.PI * 2
    const r = 0.52 + (i % 3) * 0.09
    const cell = new THREE.Mesh(new THREE.SphereGeometry(0.062, 10, 8), stromaMat)
    cell.position.set(nicheCenter.x + Math.cos(a) * r, nicheCenter.y + Math.sin(a) * r * 0.62, nicheCenter.z)
    nicheGroup.add(cell)
  }
  // 细胞因子：小颗粒散布于微环境中
  for (let i = 0; i < (lowPower ? 8 : 16); i += 1) {
    const a = (i / 16) * Math.PI * 2 + 0.3
    const factor = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 6), cytokineMat)
    factor.position.set(
      nicheCenter.x + Math.cos(a) * 0.34,
      nicheCenter.y + Math.sin(a) * 0.24,
      nicheCenter.z + 0.1,
    )
    nicheGroup.add(factor)
  }
  root.add(nicheGroup)

  // ---------- 造血干细胞（HSC）：位于微环境中的“种子” ----------
  const hscGroup = new THREE.Group()
  const hscMat = stdMat('#1f8472', { roughness: 0.35 })
  for (let i = 0; i < (lowPower ? 3 : 5); i += 1) {
    const stem = new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 12), hscMat)
    stem.position.set(
      nicheCenter.x - 0.2 + i * 0.11,
      nicheCenter.y - 0.08 + (i % 2) * 0.14,
      nicheCenter.z + 0.14,
    )
    hscGroup.add(stem)
  }
  root.add(hscGroup)

  root.rotation.set(0.08, -0.42, 0)

  const parts: ViewerPart[] = [
    {
      id: 'red',
      label: '红骨髓（造血场所）',
      detail:
        '红骨髓是血细胞生产的重要场所，含造血干细胞、间充质干细胞等。课件指出：骨髓包括黄骨髓和红骨髓，红骨髓承担造血。',
      anchor: new THREE.Vector3(-1.0, 0.95, 0.3),
      objects: [redMarrow],
    },
    {
      id: 'yellow',
      label: '黄骨髓',
      detail:
        '骨髓的组成部分之一，课件在定义中与红骨髓并列提出。图示为便于对比而放在一端，实际两者可随生理状态相互转化。',
      anchor: new THREE.Vector3(2.15, 0.9, 0.2),
      objects: [yellowMarrow],
    },
    {
      id: 'sinus',
      label: '血窦',
      detail:
        '骨髓内的血管通道，血细胞成熟后经血窦进入血液循环。课件在“骨髓定义与组成”页把血窦与造血组织并列为骨髓的空间结构成分。',
      anchor: new THREE.Vector3(1.75, -0.45, 0.1),
      objects: [sinusGroup],
    },
    {
      id: 'niche',
      label: '造血微环境（HIM）',
      detail:
        'HIM：骨髓中支持和调控造血细胞生存、增殖与分化的局部环境。图中绿色细胞（基质细胞）与金色颗粒（细胞因子）共同构成这一环境——相当于造血的“土壤”。',
      anchor: new THREE.Vector3(-0.15, 0.85, 0.5),
      objects: [nicheGroup],
    },
    {
      id: 'hsc',
      label: '造血干细胞（HSC）',
      detail:
        'HSC 具有高度自我更新能力和分化潜能，是体内所有血细胞的共同祖先。它居住在 HIM 之中——种子与土壤的关系。',
      anchor: new THREE.Vector3(-0.55, -0.55, 0.55),
      objects: [hscGroup],
    },
    {
      id: 'cortex',
      label: '骨皮质与骨小梁',
      detail:
        '骨髓位于骨髓腔（外层骨皮质围成）和松质骨骨小梁间隙内。图中剖开一半骨筒以展示内部结构；骨小梁为海绵状网格。',
      anchor: new THREE.Vector3(-1.7, 1.35, 0),
      objects: [cortexGroup, trabeculae],
    },
  ]

  return assemble(scene, camera, parts, {
    fit: { radius: 3.4 },
    toggles: [
      { id: 'cortex', label: '骨皮质/骨小梁', on: true },
      { id: 'red', label: '红骨髓', on: true },
      { id: 'yellow', label: '黄骨髓', on: true },
      { id: 'sinus', label: '血窦', on: true },
      { id: 'niche', label: '微环境 HIM', on: true },
    ],
    setToggle: (id, on) => {
      if (id === 'cortex') {
        cortexGroup.visible = on
        trabeculae.visible = on
      }
      if (id === 'red') redMarrow.visible = on
      if (id === 'yellow') yellowMarrow.visible = on
      if (id === 'sinus') sinusGroup.visible = on
      if (id === 'niche') {
        nicheGroup.visible = on
        hscGroup.visible = on
      }
    },
  })
}
