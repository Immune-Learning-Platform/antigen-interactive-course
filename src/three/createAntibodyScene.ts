import * as THREE from 'three'
import type { SceneFactory, ViewerPart } from './ModelViewer'
import { PALETTE, assemble, baseScene, makeCamera, stdMat } from './shared'

/**
 * 抗体—抗原表位模型（IgG 示意）
 * 依据课件第 6—9 页：抗体可变区识别抗原表位；线性表位耐变性，构象表位怕变性。
 * 几何比例为教学示意，不代表真实原子级结构。
 */
function limb(a: THREE.Vector3, b: THREE.Vector3, radius: number, color: string) {
  const dir = new THREE.Vector3().subVectors(b, a)
  const len = dir.length()
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius * 0.94, len, 18),
    stdMat(color, { roughness: 0.45 }),
  )
  mesh.position.copy(a).addScaledVector(dir, 0.5)
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
  return mesh
}

function knob(position: THREE.Vector3, radius: number, color: string) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 18, 14), stdMat(color, { roughness: 0.4 }))
  mesh.position.copy(position)
  return mesh
}

export const createAntibodyScene: SceneFactory = ({ lowPower }) => {
  const scene = baseScene()
  const camera = makeCamera(7.4, 0.6)

  const root = new THREE.Group()
  // 将整体几何包围盒中心移到原点：x 中心 0.73，y 中心 0.51（见模型坐标推导）
  root.position.set(-0.73, -0.51, 0)
  scene.add(root)

  // ---- 抗体（IgG，Y 形） ----
  const antibodyParts: THREE.Object3D[] = []
  const hinge = new THREE.Vector3(0, 0, 0)
  const rightElbow = new THREE.Vector3(0.95, 1.15, 0)
  const leftElbow = new THREE.Vector3(-0.95, 1.15, 0)
  const rightTip = new THREE.Vector3(1.42, 2.02, 0)
  const leftTip = new THREE.Vector3(-1.42, 2.02, 0)
  const stemEnd = new THREE.Vector3(0, -1.75, 0)

  const heavyRight = limb(hinge, rightElbow, 0.13, PALETTE.antibodyHeavy)
  const heavyLeft = limb(hinge, leftElbow, 0.13, PALETTE.antibodyHeavy)
  const stem = limb(hinge, stemEnd, 0.15, PALETTE.antibodyHeavy)
  const lightRight = limb(rightElbow, rightTip, 0.11, PALETTE.antibodyLight)
  const lightLeft = limb(leftElbow, leftTip, 0.11, PALETTE.antibodyLight)
  antibodyParts.push(heavyRight, heavyLeft, stem, lightRight, lightLeft)

  root.add(heavyRight, heavyLeft, stem, lightRight, lightLeft)

  // Fab 抗原结合部位（可变区顶端）
  const fabRight = knob(rightTip, 0.19, '#1f8472')
  const fabLeft = knob(leftTip, 0.19, '#1f8472')
  antibodyParts.push(fabRight, fabLeft)
  root.add(fabRight, fabLeft)

  const hingeKnob = knob(hinge, 0.14, '#12564c')
  root.add(hingeKnob)

  // ---- 抗原（表面带表位的蛋白颗粒） ----
  const antigenGroup = new THREE.Group()
  const antigenCenter = new THREE.Vector3(2.35, 2.05, 0)
  const antigenRadius = 0.72
  const antigenBody = new THREE.Mesh(
    new THREE.IcosahedronGeometry(antigenRadius, lowPower ? 2 : 3),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(PALETTE.antigen),
      roughness: 0.62,
      metalness: 0.05,
      flatShading: true,
    }),
  )
  antigenBody.position.copy(antigenCenter)
  antigenGroup.add(antigenBody)

  // 表面起伏（蛋白颗粒感）
  const bumpMat = stdMat('#a9d8c3', { roughness: 0.65 })
  const bumpPositions: THREE.Vector3[] = []
  const bumpCount = lowPower ? 14 : 26
  for (let i = 0; i < bumpCount; i += 1) {
    const y = 1 - (i / (bumpCount - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = Math.PI * (3 - Math.sqrt(5)) * i
    const dir = new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).normalize()
    const pos = antigenCenter.clone().addScaledVector(dir, antigenRadius * 0.95)
    bumpPositions.push(pos)
    const bump = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), bumpMat)
    bump.position.copy(pos)
    antigenGroup.add(bump)
  }

  // 构象表位：由空间上相邻、序列上不连续的几个残基组成
  const confGroup = new THREE.Group()
  const confColor = PALETTE.epitopeConf
  ;[-0.32, 0, 0.32].forEach((dy, index) => {
    const dir = new THREE.Vector3(-1, dy * 1.4 + 0.15, 0.35 + index * 0.12).normalize()
    const pos = antigenCenter.clone().addScaledVector(dir, antigenRadius * 1.02)
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.135, 14, 12), stdMat(confColor, { roughness: 0.3 }))
    bead.position.copy(pos)
    confGroup.add(bead)
  })
  antigenGroup.add(confGroup)

  // 线性表位：连续排列的残基（变性后依然保留）
  const linGroup = new THREE.Group()
  const linStart = antigenCenter.clone().add(new THREE.Vector3(-0.15, -0.62, 0.3))
  for (let i = 0; i < 4; i += 1) {
    const bead = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 14, 12),
      stdMat(PALETTE.epitopeLinear, { roughness: 0.35 }),
    )
    bead.position.copy(linStart).add(new THREE.Vector3(i * 0.16, -i * 0.14, 0))
    linGroup.add(bead)
  }
  antigenGroup.add(linGroup)

  root.add(antigenGroup)

  const parts: ViewerPart[] = [
    {
      id: 'fab',
      label: '抗体可变区（抗原结合部位）',
      detail:
        '抗体（BCR/免疫球蛋白）可变区与抗原表位互补结合。BCR 可直接识别天然抗原的构象表位与线性表位，不需要 MHC 递呈。',
      anchor: rightTip.clone().add(new THREE.Vector3(0.2, 0.28, 0)),
      objects: antibodyParts,
    },
    {
      id: 'conformational',
      label: '构象表位',
      detail:
        '氨基酸在序列上不连续排列，但折叠后在空间上彼此靠近形成的表位。变性破坏折叠后，构象表位随之消失——这就是“构象表位怕变性”。',
      anchor: antigenCenter.clone().add(new THREE.Vector3(-0.75, 0.25, 0.35)),
      objects: [confGroup],
    },
    {
      id: 'linear',
      label: '线性表位',
      detail:
        '由连续性线性排列的氨基酸残基组成的短肽表位。变性后肽链展开，线性表位仍可被抗体识别——这也是变性条件（如 Western blot）下仍能检测的原因。',
      anchor: antigenCenter.clone().add(new THREE.Vector3(-0.1, -0.95, 0.35)),
      objects: [linGroup],
    },
    {
      id: 'antigen',
      label: '抗原表面（多个表位共存）',
      detail:
        '同一抗原分子可具有多种、多个表位。抗原因其表位被特异性识别，从而同时体现免疫原性与反应原性。',
      anchor: antigenCenter.clone().add(new THREE.Vector3(0.55, 0.7, 0.2)),
      objects: [antigenBody],
    },
  ]

  return assemble(scene, camera, parts, {
    fit: { radius: 2.85 },
    toggles: [
      { id: 'denature', label: '变性处理（观察构象表位）', on: false },
      { id: 'antigen', label: '抗原', on: true },
      { id: 'fab', label: '抗体', on: true },
    ],
    setToggle: (id, on) => {
      if (id === 'denature') {
        confGroup.visible = !on
        antigenBody.scale.set(on ? 1.06 : 1, on ? 0.92 : 1, on ? 1.06 : 1)
      }
      if (id === 'antigen') antigenGroup.visible = on
      if (id === 'fab') {
        antibodyParts.forEach((o) => {
          o.visible = on
        })
        hingeKnob.visible = on
      }
    },
    // 说明：抗原不做自转——标签锚点为固定坐标，自转会与实体结构错位。
    // 旋转交由轨道控制器（用户操作），保证“标签始终指向正确结构”。
  })
}
