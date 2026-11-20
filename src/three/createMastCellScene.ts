import * as THREE from 'three'
import type { SceneFactory, ViewerPart } from './ModelViewer'
import { assemble, baseScene, makeCamera, stdMat } from './shared'

/**
 * 致敏靶细胞模型（第6章 · I 型超敏反应）
 * 依据课件第 4、9、10 页：
 *  · 效应细胞为肥大细胞和嗜碱性粒细胞，具高亲和性 IgE Fc 受体（FcεRI），可释放生物活性介质；
 *  · 致敏：IgE 的 Fc 段与 FcεRI 结合；
 *  · 激发：变应原与 IgE 的 Fab 段结合，IgE 交联引起 Fc 段变构，激活细胞产生刺激信号；
 *  · 效应：释放组胺等，引起毛细血管扩张、通透性增强、腺体分泌增加。
 *
 * 结构为教学示意：介质数量、受体密度与排布经简化。
 */
export const createMastCellScene: SceneFactory = ({ lowPower }) => {
  const scene = baseScene()
  const camera = makeCamera(9.6, 1.0)

  const root = new THREE.Group()
  scene.add(root)

  // ---------- 细胞膜（肥大细胞轮廓） ----------
  const membraneGroup = new THREE.Group()
  const membrane = new THREE.Mesh(
    new THREE.SphereGeometry(2.2, lowPower ? 26 : 44, lowPower ? 18 : 30),
    stdMat('#7fb8a6', { opacity: 0.18, roughness: 0.3, transparent: true }),
  )
  membraneGroup.add(membrane)
  root.add(membraneGroup)

  // ---------- 胞内颗粒（介质来源） ----------
  const granuleGroup = new THREE.Group()
  const granuleMat = stdMat('#c9a227', { roughness: 0.42 })
  const granuleCount = lowPower ? 12 : 24
  for (let i = 0; i < granuleCount; i += 1) {
    const y = 1 - (i / (granuleCount - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = Math.PI * (3 - Math.sqrt(5)) * i
    const dir = new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).normalize()
    const g = new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 10), granuleMat)
    g.position.copy(dir.multiplyScalar(1.05 + (i % 3) * 0.16))
    granuleGroup.add(g)
  }
  root.add(granuleGroup)

  // ---------- FcεRI 受体（膜上，朝外） ----------
  const receptorGroup = new THREE.Group()
  const receptorMat = stdMat('#12564c', { roughness: 0.45 })
  const receptorSites: THREE.Vector3[] = [
    new THREE.Vector3(0, 1, 0.1),
    new THREE.Vector3(0.75, 0.6, 0.35),
    new THREE.Vector3(-0.75, 0.6, 0.3),
    new THREE.Vector3(0.9, -0.45, -0.2),
    new THREE.Vector3(-0.9, -0.5, -0.15),
    new THREE.Vector3(0.1, -0.85, 0.55),
  ]
  const receptorMeshes: THREE.Mesh[] = []
  receptorSites.forEach((s) => {
    const dir = s.clone().normalize()
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.11, 0.36, 10), receptorMat)
    stem.position.copy(dir.clone().multiplyScalar(2.06)).addScaledVector(dir, 0.16)
    stem.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
    receptorGroup.add(stem)
    receptorMeshes.push(stem)
  })
  root.add(receptorGroup)

  // ---------- IgE（Fc 段已结合受体，Fab 段朝外） ----------
  const igeGroup = new THREE.Group()
  const igeStemMat = stdMat('#1f8472', { roughness: 0.4 })
  const igeFabMat = stdMat('#8fc9ae', { roughness: 0.38 })
  const igeSites = receptorSites.slice(0, 5)
  igeSites.forEach((s) => {
    const dir = s.clone().normalize()
    const base = dir.clone().multiplyScalar(2.42)
    // Fc 段（贴着受体）
    const fc = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.3, 10), igeStemMat)
    fc.position.copy(base)
    fc.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
    // Fab 两臂（朝外、张开）
    const tangent = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 0, 1)).normalize()
    if (tangent.length() < 0.1) tangent.set(1, 0, 0)
    ;[-1, 1].forEach((sign) => {
      const tip = base.clone().addScaledVector(dir, 0.3).addScaledVector(tangent, sign * 0.2)
      const limbDir = new THREE.Vector3().subVectors(tip, base)
      const limb = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.06, limbDir.length(), 8),
        igeFabMat,
      )
      limb.position.copy(base).addScaledVector(limbDir, 0.5)
      limb.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), limbDir.clone().normalize())
      igeGroup.add(limb)
      const knob = new THREE.Mesh(new THREE.SphereGeometry(0.075, 10, 8), igeFabMat)
      knob.position.copy(tip)
      igeGroup.add(knob)
    })
    igeGroup.add(fc)
  })
  root.add(igeGroup)

  // ---------- 变应原（外部，准备交联 IgE） ----------
  const allergenGroup = new THREE.Group()
  const allergenMat = stdMat('#b8493f', { roughness: 0.4 })
  const allergenPositions: THREE.Vector3[] = [
    new THREE.Vector3(0.5, 3.15, 0.5),
    new THREE.Vector3(-0.85, 2.95, 0.55),
    new THREE.Vector3(1.6, 2.6, 0.2),
  ]
  allergenPositions.forEach((p) => {
    const a = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 12), allergenMat)
    a.position.copy(p)
    allergenGroup.add(a)
  })
  root.add(allergenGroup)

  // ---------- 已释放的介质（组胺等） ----------
  const mediatorGroup = new THREE.Group()
  const mediatorMat = stdMat('#e0762f', { roughness: 0.35 })
  for (let i = 0; i < (lowPower ? 8 : 16); i += 1) {
    const a = (i / (lowPower ? 8 : 16)) * Math.PI * 2
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.062, 8, 6), mediatorMat)
    m.position.set(Math.cos(a) * (2.7 + (i % 3) * 0.28), -1.3 + (i % 4) * 0.5, Math.sin(a) * 1.5)
    mediatorGroup.add(m)
  }
  root.add(mediatorGroup)

  root.rotation.set(0.04, -0.2, 0)

  const parts: ViewerPart[] = [
    {
      id: 'ige',
      label: 'IgE 抗体（变应素）',
      detail:
        'IgE 由 B 细胞产生、产生依赖 IL-4，具有**同种组织细胞亲嗜性**。图中青色小 Y 型结构：竖直段为 Fc 段（已与受体结合），张开的双臂为 Fab 段（面向外，等待结合变应原）。',
      anchor: new THREE.Vector3(0.15, 3.0, 0.45),
      objects: [igeGroup],
    },
    {
      id: 'fceri',
      label: 'FcεRI（高亲和性 IgE Fc 受体）',
      detail:
        '效应细胞表面的高亲和性 IgE Fc 受体。**致敏阶段**就是 IgE 的 Fc 段与它结合的过程——此时机体已“装弹”，但尚无症状。',
      anchor: new THREE.Vector3(1.55, 1.55, 0.3),
      objects: receptorMeshes,
    },
    {
      id: 'granule',
      label: '胞内颗粒（介质来源）',
      detail:
        '效应细胞“可释放出生物活性介质”，这些介质预存在胞内颗粒中。激发后细胞脱颗粒，把组胺等释放到胞外。',
      anchor: new THREE.Vector3(-0.5, -1.9, 0.5),
      objects: [granuleGroup],
    },
    {
      id: 'allergen',
      label: '变应原（过敏原）',
      detail:
        '课件列举：药物或酶类物质、吸入性变应原、食物变应原。**激发阶段**：变应原再次进入，与 IgE 的 Fab 段结合，导致 IgE 交联、Fc 段变构。',
      anchor: new THREE.Vector3(0.5, 3.55, 0.5),
      objects: [allergenGroup],
    },
    {
      id: 'mediator',
      label: '已释放介质（组胺等）',
      detail:
        '**效应阶段**：组胺等引起毛细血管扩张、通透性增强、腺体分泌增加——分别对应临床上见到的红/热、水肿、分泌物增多。',
      anchor: new THREE.Vector3(2.35, -0.9, 0.6),
      objects: [mediatorGroup],
    },
    {
      id: 'membrane',
      label: '细胞膜（肥大细胞轮廓）',
      detail:
        '效应细胞主要是肥大细胞和嗜碱性粒细胞。图示为肥大细胞轮廓剖面；胞内浅色球体为颗粒。',
      anchor: new THREE.Vector3(-1.9, -1.4, 0.4),
      objects: [membraneGroup],
    },
  ]

  return assemble(scene, camera, parts, {
    fit: { radius: 4.0 },
    toggles: [
      { id: 'membrane', label: '细胞轮廓', on: true },
      { id: 'allergen', label: '变应原', on: true },
      { id: 'mediator', label: '已释放介质', on: true },
      { id: 'granule', label: '胞内颗粒', on: true },
    ],
    setToggle: (id, on) => {
      if (id === 'membrane') membraneGroup.visible = on
      if (id === 'allergen') allergenGroup.visible = on
      if (id === 'mediator') mediatorGroup.visible = on
      if (id === 'granule') granuleGroup.visible = on
    },
  })
}
