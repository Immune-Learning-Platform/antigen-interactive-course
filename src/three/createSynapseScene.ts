import * as THREE from 'three'
import type { SceneFactory, ViewerPart } from './ModelViewer'
import { assemble, baseScene, makeCamera, stdMat } from './shared'

/**
 * 免疫突触模型（第5章 · 细胞免疫应答）
 * 依据课件第 8—10 页：
 *  · T 细胞不能直接识别构象抗原，只能通过 TCR 识别 p-MHC；
 *  · TCR 识别后黏附分子结合增强、结合时间延长，形成免疫突触；
 *  · 活化需要抗原刺激信号、共刺激信号与细胞因子信号共同作用。
 *
 * 结构为教学示意：分子数量、间距与排布经简化，不代表真实膜分子密度。
 */
export const createSynapseScene: SceneFactory = ({ lowPower }) => {
  const scene = baseScene()
  const camera = makeCamera(9.4, 1.2)

  const root = new THREE.Group()
  scene.add(root)

  // ---------- APC（左）与 T 细胞（右）两大细胞，中间形成突触间隙 ----------
  const apcGroup = new THREE.Group()
  const tcellGroup = new THREE.Group()

  const apc = new THREE.Mesh(
    new THREE.SphereGeometry(2.0, lowPower ? 24 : 40, lowPower ? 16 : 28),
    stdMat('#7fb8a6', { opacity: 0.2, roughness: 0.3, transparent: true }),
  )
  apc.position.set(-2.35, 0, 0)
  apcGroup.add(apc)
  root.add(apcGroup)

  const tcell = new THREE.Mesh(
    new THREE.SphereGeometry(2.0, lowPower ? 24 : 40, lowPower ? 16 : 28),
    stdMat('#2f6f8f', { opacity: 0.2, roughness: 0.3, transparent: true }),
  )
  tcell.position.set(2.35, 0, 0)
  tcellGroup.add(tcell)
  root.add(tcellGroup)

  // ---------- p-MHC（APC 膜上，朝向 T 细胞） ----------
  const pmhcGroup = new THREE.Group()
  const mhcMat = stdMat('#12564c', { roughness: 0.45 })
  const peptideMat = stdMat('#c9a227', { roughness: 0.35 })
  const pmhcPositions: THREE.Vector3[] = [
    new THREE.Vector3(-0.52, 0.42, 0.3),
    new THREE.Vector3(-0.52, 0.0, 0.0),
    new THREE.Vector3(-0.52, -0.42, -0.3),
  ]
  pmhcPositions.forEach((p) => {
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.19, 0.42, 12), mhcMat)
    base.position.copy(p).add(new THREE.Vector3(-0.12, 0, 0))
    base.rotation.z = Math.PI / 2
    const peptide = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 10), peptideMat)
    peptide.position.copy(p).add(new THREE.Vector3(0.14, 0, 0))
    pmhcGroup.add(base, peptide)
  })
  root.add(pmhcGroup)

  // ---------- TCR（T 细胞膜上，朝向 APC） ----------
  const tcrGroup = new THREE.Group()
  const tcrMat = stdMat('#1f8472', { roughness: 0.4 })
  pmhcPositions.forEach((p) => {
    const mirror = p.clone().multiplyScalar(-1)
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 0.4, 12), tcrMat)
    stem.position.copy(mirror).add(new THREE.Vector3(0.12, 0, 0))
    stem.rotation.z = Math.PI / 2
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 12), tcrMat)
    head.position.copy(mirror).add(new THREE.Vector3(-0.14, 0, 0))
    tcrGroup.add(stem, head)
  })
  root.add(tcrGroup)

  // ---------- 共刺激分子（第二信号，成对出现） ----------
  const costimGroup = new THREE.Group()
  const costimMatA = stdMat('#e0762f', { roughness: 0.4 })
  const costimMatB = stdMat('#d9b64a', { roughness: 0.4 })
  const costimPairs: [THREE.Vector3, THREE.Vector3][] = [
    [new THREE.Vector3(-0.55, 1.05, 0.35), new THREE.Vector3(0.55, 1.05, 0.35)],
    [new THREE.Vector3(-0.55, -1.05, -0.2), new THREE.Vector3(0.55, -1.05, -0.2)],
  ]
  costimPairs.forEach(([a, b]) => {
    const left = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.26, 6, 10), costimMatA)
    left.position.copy(a)
    left.rotation.z = Math.PI / 2
    const right = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.26, 6, 10), costimMatB)
    right.position.copy(b)
    right.rotation.z = Math.PI / 2
    costimGroup.add(left, right)
  })
  root.add(costimGroup)

  // ---------- 黏附分子（非特异性识别，数量更多、颜色更淡） ----------
  const adhesionGroup = new THREE.Group()
  const adhesionMat = stdMat('#8fc9ae', { roughness: 0.5, opacity: 0.75 })
  for (let i = 0; i < (lowPower ? 8 : 14); i += 1) {
    const a = (i / (lowPower ? 8 : 14)) * Math.PI * 2
    const y = Math.cos(a) * 1.55
    const z = Math.sin(a) * 1.55
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.72, 6), adhesionMat)
    rod.position.set(0, y, z)
    rod.rotation.z = Math.PI / 2
    adhesionGroup.add(rod)
  }
  root.add(adhesionGroup)

  // ---------- 细胞因子（第三信号，从 T 细胞释放） ----------
  const cytokineGroup = new THREE.Group()
  const cytokineMat = stdMat('#57b08c', { roughness: 0.35 })
  for (let i = 0; i < (lowPower ? 6 : 12); i += 1) {
    const p = new THREE.Vector3(
      1.2 + (i % 4) * 0.34,
      -0.9 + Math.floor(i / 4) * 0.5 + (i % 2) * 0.2,
      0.5 + (i % 3) * 0.3,
    )
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.075, 10, 8), cytokineMat)
    bead.position.copy(p)
    cytokineGroup.add(bead)
  }
  root.add(cytokineGroup)

  root.rotation.set(0.04, -0.16, 0)

  const parts: ViewerPart[] = [
    {
      id: 'pmhc',
      label: 'p-MHC 复合体（抗原肽 + MHC）',
      detail:
        '抗原递呈细胞把抗原加工成抗原肽，与 MHC 分子结合形成 p-MHC。课件原文：T 细胞不能直接识别构象型抗原，只能通过 TCR 识别抗原肽-MHC 复合体。',
      anchor: new THREE.Vector3(-0.95, 1.35, 0.4),
      objects: [pmhcGroup],
    },
    {
      id: 'tcr',
      label: 'TCR（T 细胞受体）',
      detail:
        'TCR 特异性识别 p-MHC。识别之后，黏附分子结合增强、结合时间延长，使信号能够累积到足以激活 T 细胞的程度。',
      anchor: new THREE.Vector3(0.95, 0.95, 0.4),
      objects: [tcrGroup],
    },
    {
      id: 'costim',
      label: '共刺激分子（第二信号）',
      detail:
        'T 细胞活化的第二信号，来自 APC 与 T 细胞表面共刺激分子的互作。它决定应答是否真正启动——避免对无害抗原“误开火”。',
      anchor: new THREE.Vector3(0, 1.85, 0.2),
      objects: [costimGroup],
    },
    {
      id: 'adhesion',
      label: '黏附分子（非特异性识别）',
      detail:
        'T 细胞利用表面黏附分子与 APC 表面配体结合，促进 TCR 识别效率。这种结合**可逆而短暂**——先“黏上试探”，再“认准锁稳”。',
      anchor: new THREE.Vector3(0, -2.1, 0.3),
      objects: [adhesionGroup],
    },
    {
      id: 'cytokine',
      label: '细胞因子（第三信号）',
      detail:
        '由细胞因子提供第三信号，决定 T 细胞分化为哪一类效应细胞（如 CTL、Th1、Th2）。图中为 T 细胞释放的细胞因子颗粒。',
      anchor: new THREE.Vector3(2.1, -0.55, 0.5),
      objects: [cytokineGroup],
    },
    {
      id: 'cells',
      label: 'APC 与 T 细胞（免疫突触）',
      detail:
        '左为抗原递呈细胞（APC），右为 T 细胞。两者接触面即为**免疫突触**——TCR 识别 p-MHC 并稳定结合后形成的结构，是信号累积与 T 细胞活化的场所。',
      anchor: new THREE.Vector3(0, 2.35, 0),
      objects: [apcGroup, tcellGroup],
    },
  ]

  return assemble(scene, camera, parts, {
    fit: { radius: 4.3 },
    toggles: [
      { id: 'cells', label: '细胞轮廓', on: true },
      { id: 'adhesion', label: '黏附分子', on: true },
      { id: 'cytokine', label: '细胞因子', on: true },
      { id: 'costim', label: '共刺激分子', on: true },
    ],
    setToggle: (id, on) => {
      if (id === 'cells') {
        apcGroup.visible = on
        tcellGroup.visible = on
      }
      if (id === 'adhesion') adhesionGroup.visible = on
      if (id === 'cytokine') cytokineGroup.visible = on
      if (id === 'costim') costimGroup.visible = on
    },
  })
}
