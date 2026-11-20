import { useState } from 'react'
import { Tag } from './ui'
import { StepPlayer } from './StepPlayer'

/* ==========================================================================
   第2章《骨髓》专属科学图示（原创 SVG，无位图/无版权风险）
   依据课件第 5—13 页；所有示意均标注为教学示意，不表示真实尺寸或测量值。
   ========================================================================== */

const C = {
  ink: '#16211f',
  muted: '#5a6b67',
  line: '#c3d2cc',
  brand: '#0b3b33',
  brandMid: '#12564c',
  mint: '#8fc9ae',
  mintBg: '#e8f3ee',
  gold: '#c9a227',
  goldBg: '#f7efd6',
  orange: '#e0762f',
  orangeBg: '#fcebdd',
  blue: '#1f6fd0',
  blueBg: '#e7f0fb',
  red: '#b8493f',
  redBg: '#fbebe9',
}

function Arrow({ d, active }: { d: string; active?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={active ? C.gold : C.line}
      strokeWidth={active ? 2.4 : 1.5}
      markerEnd={active ? 'url(#bArrowOn)' : 'url(#bArrowOff)'}
    />
  )
}

function Defs() {
  return (
    <defs>
      <marker id="bArrowOff" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill={C.line} />
      </marker>
      <marker id="bArrowOn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill={C.gold} />
      </marker>
    </defs>
  )
}

/* ------------------------------ 1. 认识骨髓的节点 ----------------------------- */

const BONE_TIMELINE = [
  {
    year: '古代',
    title: '骨与髓的关联',
    body: '课件：中国古人已认识到骨与髓的关系——经验层面的观察早于实验科学。',
  },
  {
    year: '1868',
    title: '揭示造血功能',
    body: '课件：1868 年，恩斯特·诺伊曼揭示骨髓的造血功能。骨髓从“结构”变成“功能器官”。',
  },
  {
    year: '现代',
    title: '临床突破',
    body: '课件：黄晓军院士创建半相合造血干细胞移植“北京方案”，扩大供者来源，让更多患者获得移植机会。',
  },
]

export function BoneTimeline() {
  const [active, setActive] = useState(0)
  return (
    <div className="figure">
      <svg viewBox="0 0 760 150" role="img" aria-label="认识骨髓的三个节点：骨与髓的经验认识、1868 年揭示造血功能、现代移植方案突破">
        <line x1={120} y1={70} x2={640} y2={70} stroke={C.line} strokeWidth={2} />
        {BONE_TIMELINE.map((t, i) => {
          const x = 140 + i * 250
          const on = i === active
          return (
            <g key={t.year} onClick={() => setActive(i)} style={{ cursor: 'pointer' }}>
              <circle cx={x} cy={70} r={on ? 14 : 10} fill={on ? C.gold : '#fff'} stroke={on ? C.gold : C.line} strokeWidth={2.5} />
              <text x={x} y={42} textAnchor="middle" fontSize={13} fontWeight={700} fill={on ? C.brand : C.muted}>
                {t.year}
              </text>
              <text x={x} y={106} textAnchor="middle" fontSize={11.5} fill={on ? C.ink : C.muted}>
                {t.title}
              </text>
              <rect x={x - 72} y={116} width={144} height={20} rx={10} fill={on ? C.mintBg : 'transparent'} />
              <text x={x} y={130} textAnchor="middle" fontSize={10.5} fill={C.muted}>
                {on ? '点击查看说明' : ''}
              </text>
            </g>
          )
        })}
      </svg>
      <p className="figure__caption">
        <strong>
          {BONE_TIMELINE[active].year} · {BONE_TIMELINE[active].title}：
        </strong>
        {BONE_TIMELINE[active].body}
      </p>
    </div>
  )
}

/* --------------------------- 2. HIM / HSC / MSC 关系 -------------------------- */

const THREE_CONCEPTS = [
  {
    id: 'him',
    name: 'HIM',
    full: '造血诱导微环境',
    analogy: '土壤',
    color: C.mint,
    bg: C.mintBg,
    role: '支持和调控造血细胞生存、增殖与分化的局部环境。它本身不是细胞，而是“环境”。',
  },
  {
    id: 'hsc',
    name: 'HSC',
    full: '造血干细胞',
    analogy: '种子',
    color: C.brandMid,
    bg: '#e6f0ec',
    role: '具有高度自我更新能力和分化潜能，是体内所有血细胞的共同祖先。',
  },
  {
    id: 'msc',
    name: 'MSC',
    full: '间充质干细胞',
    analogy: '多面手',
    color: C.gold,
    bg: C.goldBg,
    role: '具有自我更新和多向分化潜能，可向成骨、成软骨及成脂肪细胞分化，参与支持与修复。',
  },
]

export function StemCellRelations() {
  const [active, setActive] = useState('him')
  const hit = THREE_CONCEPTS.find((c) => c.id === active) ?? THREE_CONCEPTS[0]
  return (
    <div className="figure">
      <svg viewBox="0 0 760 260" role="img" aria-label="HIM 造血微环境、HSC 造血干细胞与 MSC 间充质干细胞的关系示意">
        {THREE_CONCEPTS.map((c, i) => {
          const x = 60 + i * 240
          const on = c.id === active
          return (
            <g key={c.id} onClick={() => setActive(c.id)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={60} width={200} height={110} rx={14} fill={c.bg} stroke={on ? c.color : C.line} strokeWidth={on ? 3 : 1.5} />
              <text x={x + 100} y={94} textAnchor="middle" fontSize={20} fontWeight={800} fill={c.color}>
                {c.name}
              </text>
              <text x={x + 100} y={116} textAnchor="middle" fontSize={12} fill={C.ink}>
                {c.full}
              </text>
              <rect x={x + 54} y={130} width={92} height={22} rx={11} fill={on ? c.color : '#fff'} stroke={c.color} strokeWidth={1.2} />
              <text x={x + 100} y={145} textAnchor="middle" fontSize={11} fill={on ? '#fff' : c.color} fontWeight={700}>
                {c.analogy}
              </text>
            </g>
          )
        })}
        {/* 关系连线 */}
        <Arrow d="M160 175 C160 210, 340 210, 340 175" active={active === 'him' || active === 'hsc'} />
        <text x={250} y={214} textAnchor="middle" fontSize={10.5} fill={C.muted}>
          环境支持种子
        </text>
        <Arrow d="M540 175 C540 210, 360 210, 360 175" active={active === 'msc' || active === 'hsc'} />
        <text x={460} y={214} textAnchor="middle" fontSize={10.5} fill={C.muted}>
          多面手协同支持
        </text>
        <text x={380} y={30} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.brand}>
          骨髓免疫功能的三块基石
        </text>
        <text x={380} y={244} textAnchor="middle" fontSize={10.5} fill={C.muted}>
          三者分工不同：环境 / 源头 / 支持与修复
        </text>
      </svg>
      <div className="figure__toolbar">
        {THREE_CONCEPTS.map((c) => (
          <button
            key={c.id}
            type="button"
            className="btn btn--quiet btn--sm"
            aria-pressed={active === c.id}
            onClick={() => setActive(c.id)}
          >
            {c.name} {c.full}
          </button>
        ))}
      </div>
      <p className="figure__caption">
        <strong>
          {hit.name}（{hit.full}）：
        </strong>
        {hit.role}
      </p>
    </div>
  )
}

/* ------------------------------ 3. 造血谱系树 ------------------------------ */

const LINEAGES = [
  { id: 'rbc', name: '红细胞', from: '红系祖细胞', color: C.red },
  { id: 'gran', name: '粒细胞', from: '粒系祖细胞', color: C.mint },
  { id: 'mono', name: '单核细胞', from: '单核系祖细胞', color: C.blue },
  { id: 'lymph', name: '淋巴细胞', from: '淋巴样前体细胞', color: C.brandMid },
  { id: 'plt', name: '血小板', from: '巨核系祖细胞', color: C.gold },
]

export function HematopoiesisTree() {
  const [active, setActive] = useState('lymph')
  const hit = LINEAGES.find((l) => l.id === active) ?? LINEAGES[0]
  return (
    <div className="figure">
      <svg viewBox="0 0 760 280" role="img" aria-label="造血干细胞分化为红细胞、粒细胞、单核细胞、淋巴细胞与血小板的谱系示意">
        <Defs />
        {/* 根 */}
        <rect x={300} y={20} width={160} height={44} rx={12} fill={C.brand} />
        <text x={380} y={48} textAnchor="middle" fontSize={14} fontWeight={800} fill="#fff">
          造血干细胞 HSC
        </text>
        <text x={380} y={78} textAnchor="middle" fontSize={10.5} fill={C.muted}>
          体内所有血细胞的共同祖先
        </text>
        <Arrow d="M380 84 V110" active />
        <line x1={100} y1={110} x2={660} y2={110} stroke={C.line} strokeWidth={1.5} />

        {LINEAGES.map((l, i) => {
          const x = 100 + i * 140
          const on = l.id === active
          return (
            <g key={l.id} onClick={() => setActive(l.id)} style={{ cursor: 'pointer' }}>
              <line x1={x} y1={110} x2={x} y2={140} stroke={on ? C.gold : C.line} strokeWidth={on ? 2.4 : 1.5} />
              <rect x={x - 60} y={140} width={120} height={40} rx={10} fill={on ? C.goldBg : '#fff'} stroke={on ? C.gold : C.line} strokeWidth={on ? 2.4 : 1.4} />
              <text x={x} y={165} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.brand}>
                {l.from}
              </text>
              <line x1={x} y1={180} x2={x} y2={206} stroke={on ? C.gold : C.line} strokeWidth={on ? 2.4 : 1.5} />
              <circle cx={x} cy={228} r={20} fill={on ? l.color : '#fff'} stroke={l.color} strokeWidth={2} opacity={on ? 0.92 : 1} />
              <text x={x} y={264} textAnchor="middle" fontSize={11.5} fontWeight={on ? 700 : 400} fill={on ? C.ink : C.muted}>
                {l.name}
              </text>
            </g>
          )
        })}
        <text x={380} y={18} textAnchor="middle" fontSize={10.5} fill={C.muted}>
          教学示意：仅示主要谱系，不代表全部分化亚群
        </text>
      </svg>
      <p className="figure__caption">
        <strong>已选中：{hit.name}</strong> —— 由「{hit.from}」发育而来。这正是课件所说的“骨髓是各类血细胞和免疫细胞发生、发育的场所”。
      </p>
    </div>
  )
}

/* ----------------------- 4. B 细胞与 NK 细胞两条发育路径 ---------------------- */

const B_PATH = ['造血干细胞', '淋巴样前体细胞', '祖B细胞', '前B细胞', '未成熟B细胞', '成熟B细胞']
const NK_PATH = ['造血干细胞', '共同淋巴祖细胞', 'NK细胞祖细胞', '未成熟NK细胞', '成熟NK细胞']

export function LymphocyteLineage() {
  const [path, setPath] = useState<'b' | 'nk'>('b')
  const [step, setStep] = useState(0)
  const list = path === 'b' ? B_PATH : NK_PATH
  const current = list[Math.min(step, list.length - 1)]

  return (
    <div className="figure">
      <div className="figure__toolbar">
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={path === 'b'} onClick={() => { setPath('b'); setStep(0) }}>
          B 细胞路径（6 阶段）
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={path === 'nk'} onClick={() => { setPath('nk'); setStep(0) }}>
          NK 细胞路径（5 阶段）
        </button>
        <span className="xs muted">点击下方阶段可逐步查看</span>
      </div>
      <svg viewBox="0 0 760 200" role="img" aria-label={`${path === 'b' ? 'B 细胞' : 'NK 细胞'}在骨髓内的发育阶段`}>
        <Defs />
        {/* 分叉示意 */}
        <rect x={20} y={76} width={110} height={44} rx={10} fill={C.brand} />
        <text x={75} y={104} textAnchor="middle" fontSize={11.5} fontWeight={700} fill="#fff">
          造血干细胞
        </text>
        <path d="M130 98 C170 98, 170 56, 210 56" fill="none" stroke={path === 'b' ? C.gold : C.line} strokeWidth={path === 'b' ? 2.6 : 1.5} markerEnd={path === 'b' ? 'url(#bArrowOn)' : 'url(#bArrowOff)'} />
        <path d="M130 98 C170 98, 170 140, 210 140" fill="none" stroke={path === 'nk' ? C.gold : C.line} strokeWidth={path === 'nk' ? 2.6 : 1.5} markerEnd={path === 'nk' ? 'url(#bArrowOn)' : 'url(#bArrowOff)'} />
        <text x={170} y={38} fontSize={11} fontWeight={path === 'b' ? 700 : 400} fill={path === 'b' ? C.gold : C.muted}>
          B 细胞系
        </text>
        <text x={170} y={166} fontSize={11} fontWeight={path === 'nk' ? 700 : 400} fill={path === 'nk' ? C.gold : C.muted}>
          NK 细胞系
        </text>

        {list.map((s, i) => {
          if (i === 0) return null
          const x = 220 + (i - 1) * 108
          const on = i === Math.min(step, list.length - 1)
          const done = i < step
          return (
            <g key={s} onClick={() => setStep(i)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={path === 'b' ? 36 : 120} width={96} height={40} rx={9} fill={on ? C.gold : done ? C.mintBg : '#fff'} stroke={on ? C.gold : C.line} strokeWidth={on ? 2.4 : 1.3} />
              <text x={x + 48} y={path === 'b' ? 60 : 144} textAnchor="middle" fontSize={10} fontWeight={on ? 800 : 600} fill={on ? '#2a2200' : C.ink}>
                {s.length > 6 ? s.slice(0, 6) : s}
              </text>
              {s.length > 6 ? (
                <text x={x + 48} y={path === 'b' ? 72 : 156} textAnchor="middle" fontSize={10} fontWeight={on ? 800 : 600} fill={on ? '#2a2200' : C.ink}>
                  {s.slice(6)}
                </text>
              ) : null}
              {i < list.length - 1 ? <Arrow d={`M${x + 98} ${path === 'b' ? 56 : 140} H${x + 106}`} active={on} /> : null}
            </g>
          )
        })}
        <text x={20} y={192} fontSize={10.5} fill={C.muted}>
          两条路径同源于造血干细胞；T 细胞则离开骨髓前往胸腺成熟（不在图中）。
        </text>
      </svg>
      <p className="figure__caption" aria-live="polite">
        <strong>
          第 {Math.min(step, list.length - 1) + 1} / {list.length} 阶段：{current}
        </strong>
        {path === 'b'
          ? ' —— B 细胞全程在骨髓内完成从祖细胞到成熟 B 细胞的分化。'
          : ' —— NK 细胞同样在骨髓内发育成熟，但走的是共同淋巴祖细胞这一支。'}
      </p>
    </div>
  )
}

/* ------------------------- 5. 中枢 / 外周双重身份 ------------------------- */

export function BoneDualRole() {
  const [active, setActive] = useState<'central' | 'periph'>('central')
  return (
    <div className="figure">
      <svg viewBox="0 0 760 250" role="img" aria-label="骨髓既是中枢免疫器官又是外周免疫器官的双重身份示意">
        <Defs />
        <rect x={280} y={100} width={200} height={60} rx={14} fill={C.brand} />
        <text x={380} y={126} textAnchor="middle" fontSize={16} fontWeight={800} fill="#fff">
          骨髓
        </text>
        <text x={380} y={146} textAnchor="middle" fontSize={10.5} fill="#a9d8c3">
          一个器官 · 两重身份
        </text>

        {/* 中枢 */}
        <g onClick={() => setActive('central')} style={{ cursor: 'pointer' }}>
          <path d={`M280 118 C220 118, 220 60, 160 60`} fill="none" stroke={active === 'central' ? C.blue : C.line} strokeWidth={active === 'central' ? 3 : 1.6} markerEnd={active === 'central' ? 'url(#bArrowOn)' : 'url(#bArrowOff)'} />
          <rect x={20} y={26} width={140} height={70} rx={12} fill={active === 'central' ? C.blueBg : '#fff'} stroke={active === 'central' ? C.blue : C.line} strokeWidth={active === 'central' ? 2.6 : 1.4} />
          <text x={90} y={50} textAnchor="middle" fontSize={12.5} fontWeight={700} fill={C.blue}>
            中枢免疫器官
          </text>
          <text x={90} y={68} textAnchor="middle" fontSize={10} fill={C.ink}>
            细胞发生 · 发育
          </text>
          <text x={90} y={84} textAnchor="middle" fontSize={10} fill={C.ink}>
            B / NK 细胞成熟
          </text>
        </g>

        {/* 外周 */}
        <g onClick={() => setActive('periph')} style={{ cursor: 'pointer' }}>
          <path d={`M480 142 C540 142, 540 200, 600 200`} fill="none" stroke={active === 'periph' ? C.gold : C.line} strokeWidth={active === 'periph' ? 3 : 1.6} markerEnd={active === 'periph' ? 'url(#bArrowOn)' : 'url(#bArrowOff)'} />
          <rect x={600} y={166} width={140} height={70} rx={12} fill={active === 'periph' ? C.goldBg : '#fff'} stroke={active === 'periph' ? C.gold : C.line} strokeWidth={active === 'periph' ? 2.6 : 1.4} />
          <text x={670} y={190} textAnchor="middle" fontSize={12.5} fontWeight={700} fill={C.gold}>
            外周免疫器官
          </text>
          <text x={670} y={208} textAnchor="middle" fontSize={10} fill={C.ink}>
            免疫应答实际发生
          </text>
          <text x={670} y={224} textAnchor="middle" fontSize={10} fill={C.ink}>
            浆细胞持续分泌抗体
          </text>
        </g>

        <text x={380} y={200} textAnchor="middle" fontSize={11} fill={C.muted}>
          记忆性B细胞再次活化 → 迁移至骨髓 → 分化为成熟浆细胞 → 持续分泌抗体
        </text>
        <text x={380} y={230} textAnchor="middle" fontSize={10.5} fill={C.muted}>
          课件结论：骨髓既是中枢免疫器官又是外周免疫器官
        </text>
      </svg>
      <div className="figure__toolbar">
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={active === 'central'} onClick={() => setActive('central')}>
          中枢身份
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={active === 'periph'} onClick={() => setActive('periph')}>
          外周身份
        </button>
      </div>
      <p className="figure__caption">
        {active === 'central'
          ? '中枢身份的依据：骨髓是各类血细胞和免疫细胞发生、发育的场所，也是 B 细胞与 NK 细胞分化、成熟的场所。'
          : '外周身份的依据：记忆性B细胞再次活化后迁移至骨髓，分化为成熟浆细胞并持续分泌抗体——免疫应答的效应环节发生在这里。'}
      </p>
    </div>
  )
}

/* ------------------------------ 6. 移植流程 ------------------------------ */

const TRANSPLANT_STEPS = [
  { title: '适应证评估', desc: '确认疾病类型与状态（课件案例为犬 B 细胞淋巴瘤），判断患者是否适合移植。' },
  { title: '化疗缓解', desc: '课件案例中的时间线：化疗获得缓解后，才进入下一步——为供体干细胞腾出空间。' },
  { title: '寻找匹配供体', desc: '课件案例：找到匹配供体（McKinley）。供体匹配是降低排斥与移植物抗宿主反应风险的关键。' },
  { title: '移植前处理与移植', desc: '课件记录：2019 年 1 月 27 日接受异基因造血干细胞移植。造血干细胞经回输进入受体。' },
  { title: '造血与免疫重建', desc: '移植的 HSC 在受体内重建整条造血与免疫谱系——这是“重建”而非“补充”的核心。' },
  { title: '长期监测', desc: '移植后需监测造血重建、免疫恢复与并发症。课件表述为“恢复良好”，未给出长期随访数据。' },
]

export function TransplantFlow() {
  return (
    <StepPlayer
      ariaLabel="造血干细胞移植的分步流程演示"
      steps={TRANSPLANT_STEPS.map((s) => ({ title: s.title, desc: s.desc }))}
      render={(active) => (
        <svg viewBox="0 0 760 180" role="img" aria-label="造血干细胞移植流程：适应证评估、化疗缓解、寻找供体、移植、重建、监测">
          <Defs />
          {TRANSPLANT_STEPS.map((s, i) => {
            const x = 20 + i * 124
            const on = i === active
            const done = i < active
            return (
              <g key={s.title}>
                <rect x={x} y={54} width={108} height={68} rx={10} fill={on ? C.goldBg : done ? C.mintBg : '#fff'} stroke={on ? C.gold : C.line} strokeWidth={on ? 2.6 : 1.4} />
                <text x={x + 54} y={74} textAnchor="middle" fontSize={10} fontWeight={700} fill={C.muted}>
                  第 {i + 1} 步
                </text>
                <text x={x + 54} y={94} textAnchor="middle" fontSize={10.5} fontWeight={on ? 800 : 600} fill={on ? C.brand : C.ink}>
                  {s.title.length > 6 ? s.title.slice(0, 6) : s.title}
                </text>
                {s.title.length > 6 ? (
                  <text x={x + 54} y={108} textAnchor="middle" fontSize={10.5} fontWeight={on ? 800 : 600} fill={on ? C.brand : C.ink}>
                    {s.title.slice(6)}
                  </text>
                ) : null}
                {i < TRANSPLANT_STEPS.length - 1 ? <Arrow d={`M${x + 110} 88 H${x + 122}`} active={on} /> : null}
              </g>
            )
          })}
          <text x={20} y={158} fontSize={10.5} fill={C.muted}>
            依据课件第 11 页案例时间线与“造血干细胞移植”表述；流程为教学整理，不是临床操作规范。
          </text>
        </svg>
      )}
    />
  )
}

/* ---------------------------- 7. MSC 炎症修复 ---------------------------- */

export function MscRepair() {
  const [active, setActive] = useState<'repair' | 'inflammation'>('inflammation')
  return (
    <div className="figure">
      <svg viewBox="0 0 760 230" role="img" aria-label="间充质干细胞参与炎症调节与组织修复的双重作用示意">
        <Defs />
        <circle cx={380} cy={110} r={40} fill={C.goldBg} stroke={C.gold} strokeWidth={2.4} />
        <text x={380} y={106} textAnchor="middle" fontSize={13} fontWeight={800} fill={C.gold}>
          MSC
        </text>
        <text x={380} y={124} textAnchor="middle" fontSize={9.5} fill={C.muted}>
          骨髓来源
        </text>

        {/* 左：炎症调节 */}
        <g onClick={() => setActive('inflammation')} style={{ cursor: 'pointer' }}>
          <Arrow d="M340 110 C280 110, 280 62, 220 62" active={active === 'inflammation'} />
          <rect x={40} y={28} width={180} height={70} rx={12} fill={active === 'inflammation' ? C.blueBg : '#fff'} stroke={active === 'inflammation' ? C.blue : C.line} strokeWidth={active === 'inflammation' ? 2.6 : 1.4} />
          <text x={130} y={52} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.blue}>
            炎症调节
          </text>
          <text x={130} y={70} textAnchor="middle" fontSize={10} fill={C.ink}>
            调节炎症反应强度
          </text>
          <text x={130} y={86} textAnchor="middle" fontSize={10} fill={C.ink}>
            课件：参与炎症修复
          </text>
        </g>

        {/* 右：组织修复 / 多向分化 */}
        <g onClick={() => setActive('repair')} style={{ cursor: 'pointer' }}>
          <Arrow d="M420 110 C480 110, 480 62, 540 62" active={active === 'repair'} />
          <rect x={540} y={28} width={180} height={70} rx={12} fill={active === 'repair' ? C.mintBg : '#fff'} stroke={active === 'repair' ? C.brandMid : C.line} strokeWidth={active === 'repair' ? 2.6 : 1.4} />
          <text x={630} y={52} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.brandMid}>
            支持与修复
          </text>
          <text x={630} y={70} textAnchor="middle" fontSize={10} fill={C.ink}>
            向成骨 / 成软骨 / 成脂肪分化
          </text>
          <text x={630} y={86} textAnchor="middle" fontSize={10} fill={C.ink}>
            支持组织修复
          </text>
        </g>

        {/* 下方三个分化方向 */}
        <text x={380} y={186} textAnchor="middle" fontSize={11} fill={C.muted}>
          多向分化潜能：成骨细胞 · 成软骨细胞 · 成脂肪细胞
        </text>
        <text x={380} y={210} textAnchor="middle" fontSize={10.5} fill={C.muted}>
          课件：MSC 具有自我更新和多向分化潜能（教学示意，不代表体内真实分化比例）
        </text>
      </svg>
      <div className="figure__toolbar">
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={active === 'inflammation'} onClick={() => setActive('inflammation')}>
          炎症调节
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={active === 'repair'} onClick={() => setActive('repair')}>
          支持与修复
        </button>
      </div>
      <p className="figure__caption">
        {active === 'inflammation'
          ? 'MSC 参与炎症调节——课件标题为“骨髓间充质干细胞参与炎症修复”，说明其作用方式偏“调节”而非“替换”。'
          : 'MSC 的多向分化潜能使其可向成骨、成软骨及成脂肪细胞分化，为组织修复提供细胞来源。'}
      </p>
    </div>
  )
}

/* ---------------------------- 8. 骨类器官 ---------------------------- */

export function OrganoidFrontier() {
  const [active, setActive] = useState<'donor' | 'model'>('donor')
  return (
    <div className="figure">
      <svg viewBox="0 0 760 240" role="img" aria-label="骨类器官应对大段骨缺损供体不足并作为体外模型的双重价值">
        <Defs />
        {/* 问题 */}
        <rect x={24} y={30} width={200} height={70} rx={12} fill={C.orangeBg} stroke={C.orange} strokeWidth={1.8} />
        <text x={124} y={54} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.orange}>
          临床问题
        </text>
        <text x={124} y={72} textAnchor="middle" fontSize={10} fill={C.ink}>
          大段骨缺损修复
        </text>
        <text x={124} y={88} textAnchor="middle" fontSize={10} fill={C.ink}>
          供体不足
        </text>

        <Arrow d="M226 65 H286" active />

        {/* 中间：MSC → 类器官 */}
        <rect x={288} y={30} width={184} height={70} rx={12} fill={C.goldBg} stroke={C.gold} strokeWidth={2} />
        <text x={380} y={54} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.gold}>
          骨髓 MSC
        </text>
        <text x={380} y={72} textAnchor="middle" fontSize={10} fill={C.ink}>
          成骨 / 成软骨分化
        </text>
        <text x={380} y={88} textAnchor="middle" fontSize={10} fill={C.ink}>
          → 骨类器官
        </text>

        <Arrow d="M474 65 H534" active />

        {/* 右：两个价值 */}
        <g onClick={() => setActive('donor')} style={{ cursor: 'pointer' }}>
          <rect x={536} y={16} width={200} height={52} rx={11} fill={active === 'donor' ? C.mintBg : '#fff'} stroke={active === 'donor' ? C.brandMid : C.line} strokeWidth={active === 'donor' ? 2.4 : 1.3} />
          <text x={636} y={38} textAnchor="middle" fontSize={11.5} fontWeight={700} fill={C.brandMid}>
            价值一：替代供体
          </text>
          <text x={636} y={55} textAnchor="middle" fontSize={9.5} fill={C.ink}>
            缓解修复材料不足
          </text>
        </g>
        <g onClick={() => setActive('model')} style={{ cursor: 'pointer' }}>
          <rect x={536} y={78} width={200} height={52} rx={11} fill={active === 'model' ? C.blueBg : '#fff'} stroke={active === 'model' ? C.blue : C.line} strokeWidth={active === 'model' ? 2.4 : 1.3} />
          <text x={636} y={100} textAnchor="middle" fontSize={11.5} fontWeight={700} fill={C.blue}>
            价值二：体外模型
          </text>
          <text x={636} y={117} textAnchor="middle" fontSize={9.5} fill={C.ink}>
            模拟骨组织功能用于研究
          </text>
        </g>

        <text x={24} y={170} fontSize={10.5} fill={C.muted}>
          课件：骨类器官可体外模拟骨组织功能，具备骨修复潜力；类器官研究是全球重视的前沿领域。
        </text>
        <text x={24} y={194} fontSize={10.5} fill={C.muted}>
          课件：农业动物类器官亦充满机遇。
        </text>
        <text x={24} y={218} fontSize={10} fill={C.muted}>
          图示为教学整理，不代表任何具体产品的技术成熟度。
        </text>
      </svg>
      <div className="figure__toolbar">
        <Tag tone="gold">课件前沿</Tag>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={active === 'donor'} onClick={() => setActive('donor')}>
          替代供体
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={active === 'model'} onClick={() => setActive('model')}>
          体外模型
        </button>
      </div>
      <p className="figure__caption">
        {active === 'donor'
          ? '骨类器官的价值之一：为“大段骨缺损修复供体不足”提供潜在的替代来源。'
          : '骨类器官的价值之二：在体外模拟骨组织功能，可作为一种研究模型用于机制研究与效果评价。'}
      </p>
    </div>
  )
}
