import * as THREE from 'three'
import type { SceneFactory, ViewerPart } from './ModelViewer'
import { assemble, baseScene, makeCamera, stdMat } from './shared'

/**
 * 疫苗三类抗原成分模型（第8章 · 疫苗）
 * 依据课件第 7 页：
 *  · 传统疫苗（灭活/弱毒）抗原成分 = 全病毒
 *  · 亚单位疫苗抗原成分 = 病毒蛋白
 *  · 核酸疫苗抗原成分 = 病毒核酸
 *
 * 三个并列的示意模型，便于对比“抗原成分的粗细”。
 * 结构为教学示意，不代表真实病毒形态。
 */
export const createVaccineScene: SceneFactory = ({ lowPower }) => {
  const scene = baseScene()
  const camera = makeCamera(10.2, 1.6)

  const root = new THREE.Group()
  scene.add(root)

  const X = { whole: -3.1, protein: 0, nucleic: 3.1 }

  /* ---------------- ① 全病毒（传统疫苗） ---------------- */
  const wholeGroup = new THREE.Group()
  const envelope = new THREE.Mesh(
    new THREE.SphereGeometry(1.0, lowPower ? 24 : 40, lowPower ? 16 : 28),
    stdMat('#2f6f8f', { opacity: 0.28, roughness: 0.3, transparent: true }),
  )
  wholeGroup.add(envelope)
  const capsid = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.62, 0),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color('#12564c'),
      roughness: 0.45,
      flatShading: true,
    }),
  )
  wholeGroup.add(capsid)
  const spikeMat = stdMat('#e0762f', { roughness: 0.4 })
  for (let i = 0; i < (lowPower ? 8 : 14); i += 1) {
    const y = 1 - (i / ((lowPower ? 8 : 14) - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = Math.PI * (3 - Math.sqrt(5)) * i
    const dir = new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).normalize()
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.22, 6), spikeMat)
    stem.position.copy(dir.clone().multiplyScalar(1.06))
    stem.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), spikeMat)
    head.position.copy(dir.clone().multiplyScalar(1.2))
    wholeGroup.add(stem, head)
  }
  wholeGroup.position.x = X.whole
  root.add(wholeGroup)

  /* ---------------- ② 病毒蛋白（亚单位疫苗） ---------------- */
  const proteinGroup = new THREE.Group()
  const protMat = stdMat('#57b08c', { roughness: 0.45 })
  // 用几个球状亚基拼成一个蛋白颗粒，示意“单一关键蛋白”
  const lobes: [number, number, number, number][] = [
    [0, 0, 0, 0.52],
    [0.5, 0.3, 0.1, 0.36],
    [-0.46, 0.26, -0.14, 0.34],
    [0.12, -0.5, 0.2, 0.32],
    [-0.2, 0.5, 0.24, 0.28],
  ]
  lobes.forEach(([x, y, z, r]) => {
    const lobe = new THREE.Mesh(new THREE.SphereGeometry(r, lowPower ? 14 : 22, lowPower ? 12 : 18), protMat)
    lobe.position.set(x, y, z)
    proteinGroup.add(lobe)
  })
  // 表位高亮
  const epitopeMat = stdMat('#c9a227', { roughness: 0.35 })
  ;[
    [0.72, 0.42, 0.2],
    [-0.38, 0.62, 0.3],
  ].forEach(([x, y, z]) => {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 10), epitopeMat)
    dot.position.set(x, y, z)
    proteinGroup.add(dot)
  })
  proteinGroup.position.x = X.protein
  root.add(proteinGroup)

  /* ---------------- ③ 病毒核酸（核酸疫苗） ---------------- */
  const nucleicGroup = new THREE.Group()
  const helixPts: THREE.Vector3[] = []
  for (let i = 0; i <= 110; i += 1) {
    const t = i / 110
    const angle = t * Math.PI * 5.5
    helixPts.push(
      new THREE.Vector3(Math.cos(angle) * 0.5, (t - 0.5) * 1.9, Math.sin(angle) * 0.5),
    )
  }
  const helixCurve = new THREE.CatmullRomCurve3(helixPts)
  const nucleic = new THREE.Mesh(
    new THREE.TubeGeometry(helixCurve, lowPower ? 40 : 110, 0.075, 8, false),
    stdMat('#c9a227', { roughness: 0.4 }),
  )
  nucleicGroup.add(nucleic)
  // 碱基对示意
  const baseMat = stdMat('#8fc9ae', { roughness: 0.5 })
  for (let i = 0; i < (lowPower ? 6 : 12); i += 1) {
    const t = (i + 0.5) / (lowPower ? 6 : 12)
    const angle = t * Math.PI * 5.5
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.85, 6), baseMat)
    bar.position.set(0, (t - 0.5) * 1.9, 0)
    bar.rotation.set(0, -angle, Math.PI / 2)
    nucleicGroup.add(bar)
  }
  nucleicGroup.position.x = X.nucleic
  root.add(nucleicGroup)

  /* ---------------- 底座与标签锚点 ---------------- */
  const baseGroup = new THREE.Group()
  ;[X.whole, X.protein, X.nucleic].forEach((x) => {
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(1.15, 1.15, 0.06, 40),
      stdMat('#0f4c44', { roughness: 0.7, opacity: 0.5 }),
    )
    disc.position.set(x, -1.35, 0)
    baseGroup.add(disc)
  })
  root.add(baseGroup)

  root.rotation.set(0.1, -0.12, 0)

  const parts: ViewerPart[] = [
    {
      id: 'whole',
      label: '全病毒（传统疫苗抗原）',
      detail:
        '**灭活疫苗与弱毒疫苗**的抗原成分都是全病毒：包含完整的病毒结构（包膜、衣壳、表面糖蛋白）。免疫原性较好，但课件指出**灭活苗诱导的细胞免疫较弱**。',
      anchor: new THREE.Vector3(X.whole, 1.55, 0.2),
      objects: [wholeGroup],
    },
    {
      id: 'protein',
      label: '病毒蛋白（亚单位疫苗抗原）',
      detail:
        '**亚单位疫苗**只取病毒的关键蛋白作为抗原（图中金色小球示意被抗体识别的表位）。安全性高，但纯化蛋白免疫原性通常较弱，常需佐剂。',
      anchor: new THREE.Vector3(X.protein, 1.45, 0.2),
      objects: [proteinGroup],
    },
    {
      id: 'nucleic',
      label: '病毒核酸（核酸疫苗抗原）',
      detail:
        '**核酸疫苗**的抗原成分是病毒核酸，由宿主细胞摄取后自行表达抗原。图中双螺旋示意核酸，浅色横梁示意碱基配对。',
      anchor: new THREE.Vector3(X.nucleic, 1.45, 0.2),
      objects: [nucleicGroup],
    },
    {
      id: 'antigen',
      label: '共同核心：它们都是“抗原”',
      detail:
        '无论哪种类型，疫苗的有效成分本质上都是**抗原**（见第一章）。三类模型的差别，就是“抗原成分的粗细”——越精细，安全性越高，免疫原性往往越弱。',
      anchor: new THREE.Vector3(0, -1.55, 0.6),
      objects: [baseGroup],
    },
  ]

  return assemble(scene, camera, parts, {
    fit: { radius: 5.0 },
    toggles: [
      { id: 'whole', label: '全病毒', on: true },
      { id: 'protein', label: '病毒蛋白', on: true },
      { id: 'nucleic', label: '病毒核酸', on: true },
    ],
    setToggle: (id, on) => {
      if (id === 'whole') wholeGroup.visible = on
      if (id === 'protein') proteinGroup.visible = on
      if (id === 'nucleic') nucleicGroup.visible = on
    },
    // 说明：不让模型自转——标签锚点是固定坐标，自转会导致标签与实体结构错位。
    // 旋转交给轨道控制器（用户操作），保证标签始终指向正确结构。
  })
}
