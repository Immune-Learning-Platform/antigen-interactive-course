import * as THREE from 'three'
import type { SceneFactory, ViewerPart } from './ModelViewer'
import { PALETTE, assemble, baseScene, makeCamera, stdMat } from './shared'

/**
 * 有囊膜病毒（示意）结构成分抗原模型
 * 依据课件第 15 页：衣壳蛋白、包膜糖蛋白、核酸抗原。
 * 结构为教学示意：二十面体衣壳 + 脂质包膜 + 表面糖蛋白突起 + 内部核酸。
 */
export const createVirusScene: SceneFactory = ({ lowPower }) => {
  const scene = baseScene()
  const camera = makeCamera(7.2, 0.9)

  const virus = new THREE.Group()
  scene.add(virus)

  // 包膜（脂质双层）
  const envelope = new THREE.Mesh(
    new THREE.SphereGeometry(1.62, lowPower ? 24 : 48, lowPower ? 18 : 32),
    stdMat(PALETTE.envelope, { opacity: 0.3, roughness: 0.25, transparent: true }),
  )
  virus.add(envelope)

  // 衣壳（二十面体）
  const capsid = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.16, 1),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(PALETTE.capsid),
      roughness: 0.45,
      metalness: 0.15,
      flatShading: true,
      transparent: true,
      opacity: 0.92,
    }),
  )
  virus.add(capsid)

  // 核酸（内部螺旋）
  const genomeGroup = new THREE.Group()
  const helixPoints: THREE.Vector3[] = []
  for (let i = 0; i <= 120; i += 1) {
    const t = i / 120
    const angle = t * Math.PI * 6
    const radius = 0.62
    helixPoints.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        (t - 0.5) * 2.2,
        Math.sin(angle) * radius * 0.55,
      ),
    )
  }
  const helixCurve = new THREE.CatmullRomCurve3(helixPoints)
  const genome = new THREE.Mesh(
    new THREE.TubeGeometry(helixCurve, lowPower ? 40 : 120, 0.05, 6, false),
    stdMat(PALETTE.genome, { roughness: 0.4 }),
  )
  genomeGroup.add(genome)
  virus.add(genomeGroup)

  // 包膜糖蛋白（表面突起，常为中和抗体主要靶点）
  const spikes = new THREE.Group()
  const spikeMat = stdMat(PALETTE.spike, { roughness: 0.4 })
  const headMat = stdMat('#f0b27f', { roughness: 0.35 })
  const count = lowPower ? 20 : 44
  const spikeMeshes: THREE.Mesh[] = []
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = Math.PI * (3 - Math.sqrt(5)) * i
    const dir = new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).normalize()

    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.035, 0.34, 6), spikeMat)
    stem.position.copy(dir.clone().multiplyScalar(1.72))
    stem.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.085, 10, 10), headMat)
    head.position.copy(dir.clone().multiplyScalar(1.94))
    head.scale.set(1, 0.75, 1)

    spikes.add(stem, head)
    spikeMeshes.push(stem, head)
  }
  virus.add(spikes)

  virus.rotation.set(0.1, 0.4, 0)

  const parts: ViewerPart[] = [
    {
      id: 'glycoprotein',
      label: '包膜糖蛋白（表面抗原）',
      detail:
        '有囊膜病毒表面的糖蛋白，是课件列出的病毒抗原之一，通常也是中和抗体的主要靶点（如流感病毒 HA）。抗体必须在病毒进入细胞前结合这些暴露的表位。',
      anchor: new THREE.Vector3(0, 2.15, 0),
      objects: spikeMeshes,
    },
    {
      id: 'envelope',
      label: '包膜（脂质双层）',
      detail: '来源于宿主细胞膜的脂质双层，糖蛋白镶嵌其中。去污剂等处理可破坏包膜，使病毒感染性丧失。',
      anchor: new THREE.Vector3(1.55, -0.95, 0.5),
      objects: [envelope],
    },
    {
      id: 'capsid',
      label: '衣壳蛋白抗原',
      detail:
        '构成病毒衣壳的蛋白，决定病毒的型/亚型特征，是课件列出的病毒抗原成分之一。衣壳蛋白常含线性表位，耐变性。',
      anchor: new THREE.Vector3(-1.35, 0.85, 0.35),
      objects: [capsid],
    },
    {
      id: 'genome',
      label: '核酸抗原',
      detail:
        '病毒核酸本身也具有抗原性，可作为检测靶标。课件将核酸抗原与衣壳蛋白、包膜糖蛋白并列为病毒抗原成分。',
      anchor: new THREE.Vector3(0.15, -0.35, 0.55),
      objects: [genome],
    },
  ]

  return assemble(scene, camera, parts, {
    fit: { radius: 2.45 },
    toggles: [
      { id: 'glycoprotein', label: '表面糖蛋白', on: true },
      { id: 'envelope', label: '包膜', on: true },
      { id: 'capsid', label: '衣壳', on: true },
      { id: 'genome', label: '核酸', on: true },
    ],
    setToggle: (id, on) => {
      if (id === 'glycoprotein') spikes.visible = on
      if (id === 'envelope') envelope.visible = on
      if (id === 'capsid') capsid.visible = on
      if (id === 'genome') genomeGroup.visible = on
    },
    update: (elapsed) => {
      genomeGroup.rotation.y = elapsed * 0.25
    },
  })
}
