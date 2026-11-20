import * as THREE from 'three'
import type { SceneFactory, ViewerPart } from './ModelViewer'
import { assemble, baseScene, makeCamera, stdMat } from './shared'

/**
 * 细胞因子—受体—信号转导模型（第4章 · 细胞因子）
 * 依据课件第 8—9 页：细胞因子与靶细胞表面特异性受体结合，把胞外信号传入细胞，
 * 经 JAK–STAT 等通路传至细胞核，改变靶细胞功能。
 */
export const createCytokineScene: SceneFactory = ({ lowPower }) => {
  const scene = baseScene()
  const camera = makeCamera(9.2, 1.4)

  const root = new THREE.Group()
  root.position.set(-0.8, 0, 0)
  scene.add(root)

  // ---------- 靶细胞（球体剖面示意） ----------
  const cellGroup = new THREE.Group()
  const cell = new THREE.Mesh(
    new THREE.SphereGeometry(2.1, lowPower ? 24 : 40, lowPower ? 16 : 28),
    stdMat('#2f6f8f', { opacity: 0.18, roughness: 0.3, transparent: true }),
  )
  cellGroup.add(cell)
  root.add(cellGroup)

  // ---------- 细胞核 ----------
  const nucleusGroup = new THREE.Group()
  const nucleus = new THREE.Mesh(
    new THREE.SphereGeometry(0.86, lowPower ? 20 : 34, lowPower ? 14 : 26),
    stdMat('#1f6fd0', { opacity: 0.5, roughness: 0.35, transparent: true }),
  )
  nucleus.position.set(0.75, -0.1, 0)
  nucleusGroup.add(nucleus)
  root.add(nucleusGroup)

  // ---------- 受体（膜上） ----------
  const receptorGroup = new THREE.Group()
  const receptorMat = stdMat('#12564c', { roughness: 0.45 })
  const receptorTipMat = stdMat('#c9a227', { roughness: 0.4 })
  const receptorDirs: THREE.Vector3[] = [
    new THREE.Vector3(-1, 0.15, 0.35).normalize(),
    new THREE.Vector3(-0.95, -0.35, -0.1).normalize(),
    new THREE.Vector3(-0.6, 0.7, -0.45).normalize(),
  ]
  const receptorMeshes: THREE.Mesh[] = []
  receptorDirs.forEach((dir) => {
    const base = dir.clone().multiplyScalar(1.95)
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.13, 0.42, 12), receptorMat)
    stem.position.copy(base).addScaledVector(dir, 0.2)
    stem.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
    const tip = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.055, 10, 20, Math.PI * 1.4), receptorTipMat)
    tip.position.copy(base).addScaledVector(dir, 0.46)
    tip.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir)
    receptorGroup.add(stem, tip)
    receptorMeshes.push(stem, tip)
  })
  root.add(receptorGroup)

  // ---------- 细胞因子（配体） ----------
  const ligandGroup = new THREE.Group()
  const ligandMat = stdMat('#c9a227', { roughness: 0.32 })
  const ligandMain = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 16), ligandMat)
  ligandMain.position.set(-3.05, 0.3, 0.75)
  const ligandLobe = new THREE.Mesh(new THREE.SphereGeometry(0.19, 16, 12), ligandMat)
  ligandLobe.position.set(-3.3, 0.56, 0.62)
  ligandGroup.add(ligandMain, ligandLobe)
  root.add(ligandGroup)

  // ---------- 信号转导通路（受体 → 细胞核） ----------
  const pathwayGroup = new THREE.Group()
  const pathMat = stdMat('#57b08c', { roughness: 0.4 })
  const pathPoints: THREE.Vector3[] = [
    new THREE.Vector3(-1.75, 0.25, 0.35),
    new THREE.Vector3(-1.1, 0.15, 0.2),
    new THREE.Vector3(-0.4, 0.05, 0.1),
    new THREE.Vector3(0.35, -0.05, 0.05),
  ]
  for (let i = 0; i < pathPoints.length - 1; i += 1) {
    const a = pathPoints[i]
    const b = pathPoints[i + 1]
    const dir = new THREE.Vector3().subVectors(b, a)
    const len = dir.length()
    const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, len, 8), pathMat)
    seg.position.copy(a).addScaledVector(dir, 0.5)
    seg.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
    pathwayGroup.add(seg)
  }
  pathPoints.forEach((p) => {
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.085, 12, 10), stdMat('#1f8472', { roughness: 0.35 }))
    bead.position.copy(p)
    pathwayGroup.add(bead)
  })
  root.add(pathwayGroup)

  root.rotation.set(0.05, 0.28, 0)

  const parts: ViewerPart[] = [
    {
      id: 'ligand',
      label: '细胞因子（配体）',
      detail:
        '细胞因子多为小分子（8～30 kD）多肽或蛋白质，作为胞外信号分子发挥作用。注意：它本身不进入细胞“干活”，只负责传令。',
      anchor: new THREE.Vector3(-3.5, 0.95, 0.6),
      objects: [ligandGroup],
    },
    {
      id: 'receptor',
      label: '细胞表面特异性受体',
      detail:
        '课件原文：细胞因子通过与靶细胞表面的**特异性受体**结合，把胞外信号传入细胞。受体的特异性决定了“谁能对这条信号作出反应”。',
      anchor: new THREE.Vector3(-2.5, -0.75, 0.4),
      objects: receptorMeshes,
    },
    {
      id: 'pathway',
      label: '信号转导通路（如 JAK–STAT）',
      detail:
        '结合受体后，胞外信号被传入细胞内部。课件以增殖为例：经 JAK–STAT 信号轴把信号传递至细胞核，调控免疫细胞增殖。',
      anchor: new THREE.Vector3(-0.7, -0.62, 0.25),
      objects: [pathwayGroup],
    },
    {
      id: 'nucleus',
      label: '细胞核（信号终点）',
      detail:
        '信号最终传至细胞核，调控基因表达，从而改变靶细胞功能——如进入抗病毒状态、开始分裂增殖，或被募集活化。',
      anchor: new THREE.Vector3(0.95, 0.85, 0.1),
      objects: [nucleusGroup],
    },
    {
      id: 'target',
      label: '靶细胞',
      detail:
        '同一种细胞因子可作用于多种靶细胞（多效性），但只有表达相应受体的细胞才会响应。图示为细胞膜轮廓剖面。',
      anchor: new THREE.Vector3(1.1, -1.85, 0.2),
      objects: [cellGroup],
    },
  ]

  return assemble(scene, camera, parts, {
    fit: { radius: 3.9 },
    toggles: [
      { id: 'cell', label: '细胞轮廓', on: true },
      { id: 'pathway', label: '信号通路', on: true },
      { id: 'ligand', label: '细胞因子', on: true },
    ],
    setToggle: (id, on) => {
      if (id === 'cell') cellGroup.visible = on
      if (id === 'pathway') pathwayGroup.visible = on
      if (id === 'ligand') ligandGroup.visible = on
    },
  })
}
