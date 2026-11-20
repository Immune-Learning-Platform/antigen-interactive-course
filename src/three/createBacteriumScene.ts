import * as THREE from 'three'
import type { SceneFactory, ViewerPart } from './ModelViewer'
import { PALETTE, assemble, baseScene, makeCamera, stdMat, tubeAlong } from './shared'

/**
 * 细菌（革兰阳性菌）结构成分抗原模型
 * 依据课件第 15 页：H 抗原（鞭毛）、O 抗原（菌体）、荚膜抗原、菌毛抗原、革兰阳性菌磷壁酸。
 * 结构比例与位置为教学示意，不表示真实电镜尺寸。
 */
export const createBacteriumScene: SceneFactory = ({ lowPower }) => {
  const scene = baseScene()
  const camera = makeCamera(8.4, 1.2)

  const body = new THREE.Group()
  scene.add(body)

  // 细胞壁（含 O 抗原的菌体抗原层）
  const wall = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.86, 2.1, lowPower ? 8 : 20, lowPower ? 16 : 40),
    stdMat(PALETTE.wall, { roughness: 0.6 }),
  )
  wall.rotation.z = Math.PI / 2
  body.add(wall)

  // 细胞膜
  const membrane = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.76, 2.05, lowPower ? 8 : 16, lowPower ? 16 : 36),
    stdMat(PALETTE.membrane, { roughness: 0.4, opacity: 0.95 }),
  )
  membrane.rotation.z = Math.PI / 2
  body.add(membrane)

  // 荚膜（半透明外壳）
  const capsuleGroup = new THREE.Group()
  const capsule = new THREE.Mesh(
    new THREE.CapsuleGeometry(1.02, 2.12, lowPower ? 8 : 20, lowPower ? 16 : 40),
    stdMat(PALETTE.capsule, { opacity: 0.26, roughness: 0.2, transparent: true }),
  )
  capsule.rotation.z = Math.PI / 2
  capsuleGroup.add(capsule)
  body.add(capsuleGroup)

  // 磷壁酸：革兰阳性菌细胞壁表面的一类抗原成分
  const teichoicGroup = new THREE.Group()
  const teichoicMat = stdMat(PALETTE.teichoic, { roughness: 0.5 })
  for (let i = 0; i < (lowPower ? 10 : 22); i += 1) {
    const t = (i / (lowPower ? 10 : 22)) * Math.PI * 2
    const x = Math.cos(t) * 0.55 + (i % 3) * 0.5 - 0.5
    const y = Math.sin(t) * 0.9
    const z = Math.cos(t * 1.7) * 0.55
    const stub = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.16, 6), teichoicMat)
    stub.position.set(x, y, z)
    stub.lookAt(0, 0, 0)
    stub.rotateX(Math.PI / 2)
    teichoicGroup.add(stub)
  }
  body.add(teichoicGroup)

  // 菌毛
  const piliGroup = new THREE.Group()
  const piliMat = stdMat(PALETTE.pili, { roughness: 0.6 })
  const piliTargets: [number, number, number][] = [
    [0.8, 0.75, 0.2],
    [-0.4, 0.85, 0.35],
    [1.3, 0.1, 0.8],
    [-1.2, 0.2, 0.75],
    [0.2, -0.8, 0.6],
    [-0.8, -0.7, 0.5],
    [1.5, -0.35, -0.4],
    [-1.4, 0.55, -0.5],
    [0.6, 0.4, -0.85],
    [-0.2, -0.5, -0.9],
    [1.9, 0.6, 0.1],
    [-1.9, -0.4, -0.2],
  ]
  piliTargets.forEach(([x, y, z]) => {
    const dir = new THREE.Vector3(x, y, z).normalize()
    const pili = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.026, 0.72, 6), piliMat)
    pili.position.set(x * 0.9, y * 0.9, z * 0.9).addScaledVector(dir, 0.34)
    pili.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
    piliGroup.add(pili)
  })
  body.add(piliGroup)

  // 鞭毛（H 抗原）：自一端延伸的螺旋结构
  const flagellaGroup = new THREE.Group()
  const flagellaParts: THREE.Mesh[] = []
  const flagellaStart: [number, number, number][] = [
    [-1.55, 0.35, 0.3],
    [-1.6, -0.2, -0.35],
    [-1.5, 0.05, -0.8],
  ]
  flagellaStart.forEach(([sx, sy, sz], idx) => {
    const wave = idx === 1 ? -1 : 1
    const points: [number, number, number][] = []
    for (let i = 0; i <= 14; i += 1) {
      const t = i / 14
      points.push([
        sx - t * 2.3,
        sy + Math.sin(t * Math.PI * 3.4) * 0.38 * wave,
        sz + Math.cos(t * Math.PI * 3.4) * 0.38 * wave,
      ])
    }
    flagellaParts.push(tubeAlong(points, 0.035, PALETTE.flagella))
  })
  flagellaParts.forEach((f) => flagellaGroup.add(f))
  body.add(flagellaGroup)

  // O 抗原（菌体抗原）示意：细胞壁表面的重复糖链
  const oAntigen = new THREE.Group()
  const oMat = stdMat('#d9efe4', { roughness: 0.5 })
  for (let i = 0; i < (lowPower ? 12 : 26); i += 1) {
    const a = (i / (lowPower ? 12 : 26)) * Math.PI * 2
    const x = -1.1 + (i % 5) * 0.55
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 10), oMat)
    bead.position.set(x, Math.sin(a) * 0.86, Math.cos(a) * 0.86)
    oAntigen.add(bead)
  }
  body.add(oAntigen)

  // 轻微倾斜，便于观察
  body.rotation.set(0.12, -0.3, 0.05)

  const parts: ViewerPart[] = [
    {
      id: 'capsule',
      label: '荚膜抗原',
      detail:
        '细菌荚膜多糖等成分构成的抗原。荚膜位于细胞壁外，与抗吞噬、黏附相关；也是细菌分型与疫苗设计的重要靶点之一。',
      anchor: new THREE.Vector3(0.1, 1.15, 0.1),
      objects: [capsule],
    },
    {
      id: 'wall',
      label: '细胞壁 · O 抗原（菌体抗原）',
      detail:
        'O 抗原即菌体抗原，主要与细胞壁成分相关（革兰阴性菌为脂多糖）。课件中“O 抗原 = 菌体抗原”，与“H 抗原 = 鞭毛抗原”并列。',
      anchor: new THREE.Vector3(1.15, 0.55, 0.3),
      objects: [wall, oAntigen],
    },
    {
      id: 'membrane',
      label: '细胞膜',
      detail: '位于细胞壁内侧，本身不是课件强调的抗原成分，但在结构解剖中用于区分层次。',
      anchor: new THREE.Vector3(1.2, -0.55, 0.1),
      objects: [membrane],
    },
    {
      id: 'flagella',
      label: 'H 抗原（鞭毛抗原）',
      detail:
        '鞭毛抗原，代号 H（源自德语 Hauch，指鞭毛）。有鞭毛的细菌以 H 抗原参与血清型划分；无鞭毛菌株不表达 H 抗原。',
      anchor: new THREE.Vector3(-2.9, 0.55, 0.4),
      objects: flagellaParts,
    },
    {
      id: 'pili',
      label: '菌毛抗原',
      detail: '菌毛蛋白构成的抗原，与细菌黏附宿主细胞有关；也是部分疫苗与诊断靶标的结构基础。',
      anchor: new THREE.Vector3(1.9, 1.15, 0.35),
      objects: [piliGroup],
    },
    {
      id: 'teichoic',
      label: '磷壁酸（革兰阳性菌）',
      detail:
        '革兰阳性菌细胞壁的重要成分，具有抗原性。课件在“结构成分抗原”中将其与 H/O/荚膜/菌毛抗原并列。',
      anchor: new THREE.Vector3(-0.6, -1.1, 0.5),
      objects: [teichoicGroup],
    },
  ]

  return assemble(scene, camera, parts, {
    fit: { radius: 3.2 },
    toggles: [
      { id: 'capsule', label: '荚膜', on: true },
      { id: 'flagella', label: '鞭毛', on: true },
      { id: 'pili', label: '菌毛', on: true },
      { id: 'teichoic', label: '磷壁酸', on: true },
    ],
    setToggle: (id, on) => {
      if (id === 'capsule') capsuleGroup.visible = on
      if (id === 'flagella') flagellaGroup.visible = on
      if (id === 'pili') piliGroup.visible = on
      if (id === 'teichoic') teichoicGroup.visible = on
    },
  })
}
