import { useState } from 'react'
import { Tag } from './ui'
import { StepPlayer } from './StepPlayer'

/* ==========================================================================
   第8章《疫苗》专属图示（原创 SVG）
   依据课件第 6—22 页；示意均标注为教学示意。
   ========================================================================== */

const C = {
  ink: '#16211f', muted: '#5a6b67', line: '#c3d2cc', brand: '#0b3b33', brandMid: '#12564c',
  mint: '#8fc9ae', mintBg: '#e8f3ee', gold: '#c9a227', goldBg: '#f7efd6',
  orange: '#e0762f', orangeBg: '#fcebdd', blue: '#1f6fd0', blueBg: '#e7f0fb',
  red: '#b8493f', redBg: '#fbebe9',
}

function Arrow({ d, active }: { d: string; active?: boolean }) {
  return (
    <path d={d} fill="none" stroke={active ? C.gold : C.line} strokeWidth={active ? 2.4 : 1.5} markerEnd={active ? 'url(#vcArrowOn)' : 'url(#vcArrowOff)'} />
  )
}

function Defs() {
  return (
    <defs>
      <marker id="vcArrowOff" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill={C.line} />
      </marker>
      <marker id="vcArrowOn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill={C.gold} />
      </marker>
    </defs>
  )
}

/* --------------------------- 1. 疫苗概念 --------------------------- */

const CONCEPT = [
  { id: 'source', name: '来源', text: '病原微生物、它们的代谢产物，或基因工程产品等', color: C.mint },
  { id: 'antigen', name: '核心成分', text: '制备抗原——疫苗的有效成分本质上是抗原，不是“药物”', color: C.gold },
  { id: 'mode', name: '作用方式', text: '人工主动免疫——让机体自己产生免疫力，而非输入现成抗体', color: C.brandMid },
]

export function VaccineConcept() {
  const [active, setActive] = useState('antigen')
  const hit = CONCEPT.find((c) => c.id === active) ?? CONCEPT[1]
  return (
    <div className="figure">
      <svg viewBox="0 0 640 180" role="img" aria-label="疫苗概念的三个要点：来源、核心成分、作用方式">
        <Defs />
        {CONCEPT.map((c, i) => {
          const x = 34 + i * 200
          const on = c.id === active
          return (
            <g key={c.id} onClick={() => setActive(c.id)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={40} width={180} height={80} rx={12} fill={on ? `${c.color}1f` : '#fff'} stroke={on ? c.color : C.line} strokeWidth={on ? 2.8 : 1.4} />
              <text x={x + 90} y={66} textAnchor="middle" fontSize={12} fontWeight={800} fill={c.color}>{c.name}</text>
              <text x={x + 90} y={88} textAnchor="middle" fontSize={8} fill={C.muted}>点击查看</text>
              {i < CONCEPT.length - 1 ? <Arrow d={`M${x + 182} 80 H${x + 198}`} active={on} /> : null}
            </g>
          )
        })}
        <text x={320} y={148} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={C.brand}>
          {hit.name}：{hit.text}
        </text>
        <text x={320} y={170} textAnchor="middle" fontSize={8.5} fill={C.muted}>
          课件原文：以病原微生物，或它们的代谢产物，或基因工程产品等制备抗原，人工主动免疫预防动物传染病的生物制品
        </text>
      </svg>
      <div className="figure__toolbar">
        {CONCEPT.map((c) => (
          <button key={c.id} type="button" className="btn btn--quiet btn--sm" aria-pressed={active === c.id} onClick={() => setActive(c.id)}>
            {c.name}
          </button>
        ))}
      </div>
      <p className="figure__caption">
        <strong>{hit.name}：</strong>{hit.text}
      </p>
    </div>
  )
}

/* --------------------------- 2. 历史 --------------------------- */

const HISTORY = [
  { year: '明代 1567 前后', name: '人痘接种技术成熟', text: '用经验方法预防天花——这是疫苗思想的起点。' },
  { year: '1741 年', name: '记录种痘效果', text: '开始有系统的效果观察，从“做法”走向“证据”。' },
  { year: '1798 年', name: '牛痘 = 疫苗首次定义', text: '“Vaccine（疫苗）”这个词由此而来。' },
]

export function VaccineHistory() {
  const [active, setActive] = useState(2)
  return (
    <div className="figure">
      <svg viewBox="0 0 640 160" role="img" aria-label="疫苗发展的三个历史节点：人痘接种、记录种痘效果、疫苗首次定义">
        <line x1={80} y1={72} x2={560} y2={72} stroke={C.line} strokeWidth={2} />
        {HISTORY.map((h, i) => {
          const x = 130 + i * 190
          const on = i === active
          return (
            <g key={h.year} onClick={() => setActive(i)} style={{ cursor: 'pointer' }}>
              <circle cx={x} cy={72} r={on ? 14 : 9} fill={on ? C.gold : '#fff'} stroke={on ? C.gold : C.line} strokeWidth={2.4} />
              <text x={x} y={44} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={on ? C.brand : C.muted}>{h.year}</text>
              <text x={x} y={104} textAnchor="middle" fontSize={8.5} fill={on ? C.ink : C.muted}>
                {h.name.length > 9 ? h.name.slice(0, 9) : h.name}
              </text>
              {h.name.length > 9 ? (
                <text x={x} y={116} textAnchor="middle" fontSize={8.5} fill={on ? C.ink : C.muted}>
                  {h.name.slice(9)}
                </text>
              ) : null}
            </g>
          )
        })}
        <text x={320} y={144} textAnchor="middle" fontSize={8.5} fill={C.muted}>
          从“经验有效”到“概念确立”：年份与表述引自课件原文
        </text>
      </svg>
      <p className="figure__caption">
        <strong>{HISTORY[active].year} · {HISTORY[active].name}：</strong>{HISTORY[active].text}
      </p>
    </div>
  )
}

/* --------------------------- 3. 疫苗种类 --------------------------- */

const TYPES = [
  { id: 'inact', name: '灭活疫苗', group: '传统', antigen: '全病毒', color: C.brandMid, note: '已失去感染性；免疫原性较好，但课件指出其诱导的细胞免疫较弱。' },
  { id: 'live', name: '弱毒疫苗', group: '传统', antigen: '全病毒', color: C.mint, note: '保留低毒力活病原，可模拟自然感染，通常诱导更全面的免疫应答。' },
  { id: 'subunit', name: '亚单位疫苗', group: '新型', antigen: '病毒蛋白', color: C.gold, note: '只取关键蛋白，安全性高；纯化蛋白免疫原性通常较弱，常需佐剂。' },
  { id: 'vector', name: '载体疫苗', group: '新型', antigen: '抗原基因（经载体递送）', color: C.blue, note: '用活载体递送抗原基因，使机体细胞表达抗原。' },
  { id: 'nucleic', name: '核酸疫苗', group: '新型', antigen: '病毒核酸', color: C.orange, note: '由宿主细胞自行表达抗原。' },
]

export function VaccineTypes() {
  const [active, setActive] = useState('inact')
  const hit = TYPES.find((t) => t.id === active) ?? TYPES[0]
  return (
    <div className="figure">
      <svg viewBox="0 0 640 170" role="img" aria-label="疫苗按传统与新型分类，及各自的抗原成分">
        <Defs />
        {/* 传统 */}
        <rect x={24} y={36} width={280} height={100} rx={12} fill={C.mintBg} stroke={C.mint} strokeWidth={1.8} />
        <text x={164} y={56} textAnchor="middle" fontSize={10.5} fontWeight={800} fill={C.brandMid}>传统疫苗 · 抗原：全病毒</text>
        {TYPES.filter((t) => t.group === '传统').map((t, i) => {
          const on = t.id === active
          return (
            <g key={t.id} onClick={() => setActive(t.id)} style={{ cursor: 'pointer' }}>
              <rect x={44 + i * 132} y={70} width={120} height={44} rx={9} fill={on ? '#fff' : '#ffffffaa'} stroke={on ? t.color : C.line} strokeWidth={on ? 2.6 : 1.2} />
              <text x={104 + i * 132} y={97} textAnchor="middle" fontSize={10} fontWeight={on ? 800 : 600} fill={on ? t.color : C.ink}>{t.name}</text>
            </g>
          )
        })}
        {/* 新型 */}
        <rect x={336} y={36} width={280} height={100} rx={12} fill={C.goldBg} stroke={C.gold} strokeWidth={1.8} />
        <text x={476} y={56} textAnchor="middle" fontSize={10.5} fontWeight={800} fill={C.gold}>新型疫苗 · 抗原：蛋白 / 核酸</text>
        {TYPES.filter((t) => t.group === '新型').map((t, i) => {
          const on = t.id === active
          return (
            <g key={t.id} onClick={() => setActive(t.id)} style={{ cursor: 'pointer' }}>
              <rect x={348 + i * 88} y={70} width={80} height={44} rx={9} fill={on ? '#fff' : '#ffffffaa'} stroke={on ? t.color : C.line} strokeWidth={on ? 2.6 : 1.2} />
              <text x={388 + i * 88} y={97} textAnchor="middle" fontSize={9} fontWeight={on ? 800 : 600} fill={on ? t.color : C.ink}>{t.name}</text>
            </g>
          )
        })}
        <text x={320} y={156} textAnchor="middle" fontSize={8.5} fill={C.muted}>
          课件分类依据：制备工艺和所含成分
        </text>
      </svg>
      <div className="figure__toolbar">
        {TYPES.map((t) => (
          <button key={t.id} type="button" className="btn btn--quiet btn--sm" aria-pressed={active === t.id} onClick={() => setActive(t.id)}>
            {t.name}
          </button>
        ))}
      </div>
      <div className="card card--flat" style={{ marginTop: 6 }}>
        <div className="row row--between">
          <strong>{hit.name}</strong>
          <Tag tone={hit.group === '传统' ? 'mint' : 'gold'}>{hit.group}疫苗 · {hit.antigen}</Tag>
        </div>
        <p className="small" style={{ marginTop: 8 }}>{hit.note}</p>
      </div>
    </div>
  )
}

/* --------------------------- 4. 作用原理 --------------------------- */

export function VaccinePrinciple() {
  const [step, setStep] = useState(0)
  const stages = ['接种疫苗（抗原进入）', '诱导适应性免疫应答', '形成免疫记忆', '野毒入侵时启动再次应答']
  return (
    <div className="figure">
      <svg viewBox="0 0 640 190" role="img" aria-label="疫苗不直接结合病原，而是诱导免疫应答与记忆，在真正感染时发挥作用">
        <Defs />
        {/* 上下两条时间线：接种期 vs 感染期 */}
        <rect x={20} y={30} width={340} height={64} rx={10} fill={C.mintBg} stroke={C.mint} strokeWidth={1.6} />
        <text x={190} y={48} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={C.brandMid}>接种时（训练期）</text>
        <text x={190} y={70} textAnchor="middle" fontSize={9} fill={C.ink}>疫苗 → 免疫应答 → 免疫记忆</text>
        <text x={190} y={86} textAnchor="middle" fontSize={8} fill={C.muted}>不直接与病原结合</text>

        <rect x={380} y={30} width={238} height={64} rx={10} fill={C.orangeBg} stroke={C.orange} strokeWidth={1.6} />
        <text x={499} y={48} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={C.orange}>真正感染时（作战期）</text>
        <text x={499} y={70} textAnchor="middle" fontSize={9} fill={C.ink}>靠记忆迅速启动再次应答</text>
        <text x={499} y={86} textAnchor="middle" fontSize={8} fill={C.muted}>识别与清除由免疫系统完成</text>

        <Arrow d="M362 62 H376" active />

        {/* 关键说明 */}
        <rect x={20} y={108} width={598} height={64} rx={10} fill="#fff" stroke={C.line} />
        <text x={32} y={128} fontSize={9.5} fontWeight={700} fill={C.brand}>
          课件原文的理解要点
        </text>
        <foreignObject x={32} y={134} width={574} height={34}>
          <div style={{ fontSize: 8.5, lineHeight: 1.5, color: '#35443f' }}>
            “疫苗作为抗原，不直接与入侵的病原微生物发生结合……其保护效应依赖于宿主免疫系统后续的识别与清除功能。”
            —— 所以疫苗是<strong>教练</strong>，不是<strong>士兵</strong>；真正作战发生在感染时。
          </div>
        </foreignObject>

        <text x={320} y={186} textAnchor="middle" fontSize={8.5} fill={C.muted}>
          国防体系类比：第十一章疫苗 = 新兵军事演习与战前推演（课件原文）
        </text>
      </svg>
      <div className="figure__toolbar">
        {stages.map((s, i) => (
          <button key={s} type="button" className="btn btn--quiet btn--sm" aria-pressed={step === i} onClick={() => setStep(i)}>
            {s.slice(0, 6)}
          </button>
        ))}
      </div>
      <p className="figure__caption">
        <strong>{stages[step]}</strong>
        {step === 0
          ? '：疫苗进入机体，其主要成分是抗原。'
          : step === 1
            ? '：抗原被递呈、识别，激活体液与细胞免疫应答。'
            : step === 2
              ? '：增殖分化时少数分化为记忆 T/B 细胞，形成免疫记忆。'
              : '：野毒入侵被识别为“再次接触”，记忆细胞迅速动员，启动快速、高效、持久的再次应答。'}
      </p>
    </div>
  )
}

/* --------------------------- 5. 初次应答三阶段 --------------------------- */

const PRIMARY_STEPS = [
  { title: '抗原被捕获', desc: '抗原递呈细胞对疫苗中的抗原进行捕获。', stage: '致敏阶段' },
  { title: '加工与递呈', desc: '抗原被加工处理并递呈。', stage: '致敏阶段' },
  { title: 'T/B 细胞识别', desc: '特异性淋巴细胞（T 细胞和 B 细胞）对递呈抗原进行识别。', stage: '致敏阶段' },
  { title: '母细胞化增殖', desc: '免疫活性细胞受疫苗抗原刺激后母细胞化而大量增殖。', stage: '增殖分化阶段' },
  { title: '分化为效应 + 记忆', desc: '分化为效应细胞及少量记忆 T/B 细胞（多数分化效应、少数分化记忆）。', stage: '增殖分化阶段' },
  { title: '效应清除', desc: '浆细胞分泌抗体、Th 释放细胞因子、CTL 杀伤靶细胞，共同清除抗原。', stage: '效应阶段' },
]

export function PrimaryResponse() {
  return (
    <StepPlayer
      ariaLabel="疫苗诱导初次免疫应答的分步演示"
      steps={PRIMARY_STEPS.map((s) => ({ title: s.title, desc: `${s.stage} — ${s.desc}` }))}
      baseMs={2900}
      render={(active) => (
        <svg viewBox="0 0 640 190" role="img" aria-label="初次免疫应答三阶段：致敏、增殖分化、效应">
          <Defs />
          {/* 阶段背景带 */}
          <rect x={20} y={26} width={250} height={20} rx={6} fill={C.blueBg} />
          <text x={145} y={40} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={C.blue}>致敏阶段</text>
          <rect x={272} y={26} width={190} height={20} rx={6} fill={C.goldBg} />
          <text x={367} y={40} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={C.gold}>增殖分化阶段</text>
          <rect x={464} y={26} width={156} height={20} rx={6} fill={C.mintBg} />
          <text x={542} y={40} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={C.brandMid}>效应阶段</text>

          {PRIMARY_STEPS.map((s, i) => {
            const x = 22 + i * 102
            const on = i === active
            const done = i < active
            return (
              <g key={s.title}>
                <rect x={x} y={58} width={90} height={62} rx={9} fill={on ? C.goldBg : done ? C.mintBg : '#fff'} stroke={on ? C.gold : C.line} strokeWidth={on ? 2.6 : 1.3} />
                <text x={x + 45} y={76} textAnchor="middle" fontSize={7.5} fontWeight={700} fill={C.muted}>{i + 1}</text>
                <text x={x + 45} y={94} textAnchor="middle" fontSize={8} fontWeight={on ? 800 : 600} fill={on ? C.brand : C.ink}>
                  {s.title.length > 5 ? s.title.slice(0, 5) : s.title}
                </text>
                {s.title.length > 5 ? (
                  <text x={x + 45} y={106} textAnchor="middle" fontSize={8} fontWeight={on ? 800 : 600} fill={on ? C.brand : C.ink}>
                    {s.title.slice(5)}
                  </text>
                ) : null}
                {i < PRIMARY_STEPS.length - 1 ? <Arrow d={`M${x + 92} 89 H${x + 100}`} active={on} /> : null}
              </g>
            )
          })}
          <text x={320} y={146} textAnchor="middle" fontSize={8.5} fill={C.muted}>
            注意第 5 步：多数分化为效应细胞，<tspan fontWeight={700}>少数分化为记忆细胞</tspan>——这少数决定了长期保护
          </text>
          <text x={320} y={170} textAnchor="middle" fontSize={8} fill={C.muted}>
            {s0(PRIMARY_STEPS, active)}
          </text>
        </svg>
      )}
    />
  )
}
function s0(steps: { desc: string }[], i: number) {
  return steps[Math.min(i, steps.length - 1)].desc
}

/* --------------------------- 6. 三种效应功能 --------------------------- */

const EFFECTORS = [
  { id: 'ab', name: '抗体', sub: '体液免疫应答', color: C.brandMid, text: '疫苗刺激机体产生体液免疫应答，通过抗体多种功能发挥保护作用。' },
  { id: 'th', name: '辅助性 T 细胞', sub: '细胞免疫应答', color: C.blue, text: '分泌细胞因子：促进 B 细胞产生抗体及类别转换、促进 CTL 活化增殖、增强巨噬细胞杀伤作用。课件特别标注：灭活苗诱导的细胞免疫较弱。' },
  { id: 'ctl', name: '细胞毒性 T 细胞', sub: '细胞免疫应答', color: C.red, text: '识别并杀伤靶细胞：释放穿孔素和颗粒酶破坏靶细胞膜，或启动 Fas/FasL 途径诱导靶细胞凋亡。' },
]

export function VaccineEffectors() {
  const [active, setActive] = useState('th')
  const hit = EFFECTORS.find((e) => e.id === active) ?? EFFECTORS[1]
  return (
    <div className="figure">
      <svg viewBox="0 0 620 170" role="img" aria-label="疫苗保护的三种效应功能：抗体、辅助性T细胞、细胞毒性T细胞">
        <Defs />
        <ellipse cx={92} cy={80} rx={52} ry={38} fill={C.mintBg} stroke={C.brandMid} strokeWidth={2.2} />
        <text x={92} y={78} textAnchor="middle" fontSize={9.5} fontWeight={800} fill={C.brand}>疫苗</text>
        <text x={92} y={94} textAnchor="middle" fontSize={8} fill={C.muted}>诱导应答</text>

        {EFFECTORS.map((e, i) => {
          const on = e.id === active
          const y = 34 + i * 46
          return (
            <g key={e.id} onClick={() => setActive(e.id)} style={{ cursor: 'pointer' }}>
              <Arrow d={`M148 80 C186 80, 186 ${y + 6}, 218 ${y + 6}`} active={on} />
              <rect x={220} y={y - 14} width={148} height={38} rx={9} fill={on ? `${e.color}1f` : '#fff'} stroke={on ? e.color : C.line} strokeWidth={on ? 2.6 : 1.3} />
              <text x={294} y={y + 1} textAnchor="middle" fontSize={9.5} fontWeight={on ? 800 : 600} fill={on ? e.color : C.ink}>{e.name}</text>
              <text x={294} y={y + 14} textAnchor="middle" fontSize={7.5} fill={C.muted}>{e.sub}</text>
            </g>
          )
        })}

        <rect x={384} y={28} width={222} height={120} rx={12} fill="#fff" stroke={C.line} />
        <text x={495} y={48} textAnchor="middle" fontSize={9} fontWeight={700} fill={hit.color}>作用机制</text>
        <foreignObject x={394} y={56} width={202} height={86}>
          <div style={{ fontSize: 8.5, lineHeight: 1.55, color: '#35443f' }}>{hit.text}</div>
        </foreignObject>
      </svg>
      <div className="figure__toolbar">
        {EFFECTORS.map((e) => (
          <button key={e.id} type="button" className="btn btn--quiet btn--sm" aria-pressed={active === e.id} onClick={() => setActive(e.id)}>
            {e.name}
          </button>
        ))}
      </div>
      <p className="figure__caption">
        <strong>{hit.name}（{hit.sub}）：</strong>{hit.text}
      </p>
    </div>
  )
}

/* --------------------------- 7. 初次 vs 再次应答 --------------------------- */

export function SecondaryResponse() {
  const [show, setShow] = useState<'both' | 'primary' | 'secondary'>('both')
  return (
    <div className="figure">
      <svg viewBox="0 0 620 200" role="img" aria-label="初次与再次免疫应答的对比：再次应答潜伏期更短、抗体水平更高、持续时间更长">
        <Defs />
        {/* 坐标轴 */}
        <line x1={60} y1={160} x2={580} y2={160} stroke={C.line} strokeWidth={1.5} />
        <line x1={60} y1={160} x2={60} y2={30} stroke={C.line} strokeWidth={1.5} />
        <text x={26} y={40} fontSize={8.5} fill={C.muted}>抗体水平</text>
        <text x={560} y={178} fontSize={8.5} fill={C.muted}>时间</text>

        {/* 初次应答曲线 */}
        {show !== 'secondary' ? (
          <g>
            <path d="M80 160 C120 158, 140 120, 180 106 S230 96, 280 92 C320 90, 340 104, 360 118" fill="none" stroke={C.mint} strokeWidth={2.6} />
            <text x={205} y={82} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={C.brandMid}>
              初次应答：慢、弱
            </text>
            <circle cx={80} cy={160} r={4} fill={C.mint} />
            <text x={80} y={174} textAnchor="middle" fontSize={7.5} fill={C.muted}>首次接种</text>
          </g>
        ) : null}

        {/* 再次应答曲线 */}
        {show !== 'primary' ? (
          <g>
            <path d="M360 118 C385 116, 395 60, 420 42 S470 34, 520 48" fill="none" stroke={C.orange} strokeWidth={2.8} />
            <text x={455} y={28} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={C.orange}>
              再次应答：快、强、持久
            </text>
            <circle cx={360} cy={118} r={4} fill={C.orange} />
            <text x={360} y={140} textAnchor="middle" fontSize={7.5} fill={C.muted}>再次接触</text>
          </g>
        ) : null}

        {/* 图例 */}
        <text x={70} y={194} fontSize={8} fill={C.muted}>
          课件原文：再次免疫应答快速、高效且持久，T 细胞比率和有效抗体含量更高，潜伏期更短
        </text>
      </svg>
      <div className="figure__toolbar">
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={show === 'both'} onClick={() => setShow('both')}>
          两条一起看
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={show === 'primary'} onClick={() => setShow('primary')}>
          只看初次应答
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={show === 'secondary'} onClick={() => setShow('secondary')}>
          只看再次应答
        </button>
      </div>
      <p className="figure__caption">
        <strong>为什么加强免疫有效：</strong>初次应答留下少量记忆 T/B 细胞；再次接触抗原时，记忆细胞迅速动员，产生更快、更强、更持久的再次应答。这正是课件思考题“为什么有些传染病需要免疫两次”的答案。
      </p>
    </div>
  )
}

/* --------------------------- 8. 研制流程 --------------------------- */

const PIPELINE = [
  { title: '抗原确定与制备', detail: '选定目标抗原（可用 AI 辅助筛选与表位预测，需实验验证）。' },
  { title: '表达或培养', detail: '按疫苗类型选择表达系统或培养方式。' },
  { title: '纯化', detail: '获得纯度较高的抗原；注意保持构象表位完整性。' },
  { title: '配制（含佐剂）', detail: '纯化抗原免疫原性往往偏弱，需配伍佐剂。' },
  { title: '质量检验', detail: '抗原含量、纯度、完整性、批间一致性。' },
  { title: '效力与安全评价', detail: '免疫效力与安全性评价——决定产品能否使用的最后关口。' },
]

export function VaccinePipeline() {
  const [active, setActive] = useState(0)
  return (
    <div className="figure">
      <svg viewBox="0 0 640 170" role="img" aria-label="疫苗研制的六个核心步骤">
        <Defs />
        {PIPELINE.map((p, i) => {
          const x = 16 + i * 104
          const on = i === active
          const done = i < active
          return (
            <g key={p.title} onClick={() => setActive(i)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={40} width={94} height={70} rx={9} fill={on ? C.goldBg : done ? C.mintBg : '#fff'} stroke={on ? C.gold : C.line} strokeWidth={on ? 2.6 : 1.3} />
              <text x={x + 47} y={58} textAnchor="middle" fontSize={7.5} fontWeight={700} fill={C.muted}>第 {i + 1} 步</text>
              <text x={x + 47} y={76} textAnchor="middle" fontSize={8} fontWeight={on ? 800 : 600} fill={on ? C.brand : C.ink}>
                {p.title.length > 5 ? p.title.slice(0, 5) : p.title}
              </text>
              {p.title.length > 5 ? (
                <text x={x + 47} y={88} textAnchor="middle" fontSize={8} fontWeight={on ? 800 : 600} fill={on ? C.brand : C.ink}>
                  {p.title.slice(5)}
                </text>
              ) : null}
              {i < PIPELINE.length - 1 ? <Arrow d={`M${x + 96} 75 H${x + 102}`} active={on} /> : null}
            </g>
          )
        })}
        <foreignObject x={16} y={120} width={608} height={34}>
          <div style={{ fontSize: 8.5, lineHeight: 1.5, color: '#35443f', textAlign: 'center' }}>
            <strong>{PIPELINE[active].title}：</strong>{PIPELINE[active].detail}
          </div>
        </foreignObject>
        <text x={320} y={164} textAnchor="middle" fontSize={8} fill={C.muted}>
          课件：虚拟仿真实验室可解决“生产周期长、生物安全风险高、设备昂贵”带来的实操难题
        </text>
      </svg>
      <div className="figure__toolbar">
        {PIPELINE.map((p, i) => (
          <button key={p.title} type="button" className="btn btn--quiet btn--sm" aria-pressed={active === i} onClick={() => setActive(i)}>
            {i + 1}
          </button>
        ))}
      </div>
      <p className="figure__caption">
        <strong>{PIPELINE[active].title}：</strong>{PIPELINE[active].detail}
      </p>
    </div>
  )
}

/* --------------------------- 9. AI 辅助 --------------------------- */

export function VaccineAi() {
  const [mode, setMode] = useState<'value' | 'limit'>('value')
  return (
    <div className="figure">
      <div className="figure__toolbar">
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={mode === 'value'} onClick={() => setMode('value')}>
          AI 的价值
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={mode === 'limit'} onClick={() => setMode('limit')}>
          AI 的边界
        </button>
      </div>
      <svg viewBox="0 0 640 180" role="img" aria-label={mode === 'value' ? 'AI 加速抗原筛选与设计' : 'AI 预测仍需实验验证'}>
        <Defs />
        <rect x={20} y={40} width={180} height={80} rx={12} fill={C.blueBg} stroke={C.blue} strokeWidth={2.2} />
        <text x={110} y={68} textAnchor="middle" fontSize={11} fontWeight={800} fill={C.blue}>AI</text>
        <text x={110} y={88} textAnchor="middle" fontSize={8.5} fill={C.ink}>整合抗原数据</text>
        <text x={110} y={104} textAnchor="middle" fontSize={8} fill={C.muted}>序列 / 结构 / 表位</text>

        <Arrow d="M204 80 H250" active />

        <rect x={252} y={40} width={170} height={80} rx={12} fill={mode === 'value' ? C.mintBg : C.orangeBg} stroke={mode === 'value' ? C.brandMid : C.orange} strokeWidth={2.2} />
        <text x={337} y={66} textAnchor="middle" fontSize={9.5} fontWeight={800} fill={mode === 'value' ? C.brandMid : C.orange}>
          {mode === 'value' ? '候选抗原 / 表位' : '预测结果'}
        </text>
        <text x={337} y={86} textAnchor="middle" fontSize={8} fill={C.ink}>
          {mode === 'value' ? '快速筛选，缩短前期探索' : '仍是“假设”，非结论'}
        </text>

        <Arrow d="M426 80 H472" active />

        <rect x={474} y={40} width={146} height={80} rx={12} fill={mode === 'value' ? C.goldBg : C.blueBg} stroke={mode === 'value' ? C.gold : C.blue} strokeWidth={2.2} />
        <text x={547} y={66} textAnchor="middle" fontSize={9.5} fontWeight={800} fill={mode === 'value' ? C.gold : C.blue}>
          {mode === 'value' ? '智能设计' : '实验验证'}
        </text>
        <text x={547} y={86} textAnchor="middle" fontSize={8} fill={C.ink}>
          {mode === 'value' ? '经验研发 → 数据驱动' : '表达·纯化·质检·评价'}
        </text>

        <foreignObject x={20} y={132} width={600} height={40}>
          <div style={{ fontSize: 8.5, lineHeight: 1.6, color: '#35443f', textAlign: 'center' }}>
            {mode === 'value'
              ? '课件：人工智能在疫苗的智慧研发中展现非常显著优势；AI 整合抗原数据，加速疫苗从“经验研发”向“智能设计”转变。'
              : 'AI 是设计端的加速器，不是验证端的替代品——表达、纯化、质量检验、免疫效力与安全性评价仍必须依靠实验完成。'}
          </div>
        </foreignObject>
      </svg>
      <p className="figure__caption">
        {mode === 'value'
          ? 'AI 的价值集中在“选什么”这一步：从海量信息中快速筛出值得一试的候选。'
          : 'AI 的边界在于“验得实”：任何预测都要回到实验与动物试验中确认。'}
      </p>
    </div>
  )
}

/* --------------------------- 10. 全课收束 --------------------------- */

const CHAIN = [
  { ch: '第一章', name: '抗原', role: '疫苗的有效成分就是抗原' },
  { ch: '第二、三章', name: '免疫系统 / 免疫细胞', role: '疫苗要“教会”的正是这些细胞' },
  { ch: '第四、五章', name: '抗体 / 细胞因子', role: '抗体功能与 Th 细胞因子构成两条保护主线' },
  { ch: '第八章', name: '适应性免疫应答', role: '初次/再次应答是保护机制的核心' },
  { ch: '第九章', name: '超敏反应', role: '应答“过度”的另一面' },
  { ch: '第十章', name: '免疫学技术', role: '检测抗体、评价效果都靠这些方法' },
]

export function VaccineSummary() {
  const [active, setActive] = useState(3)
  return (
    <div className="figure">
      <svg viewBox="0 0 640 190" role="img" aria-label="疫苗作为整门免疫学课程的汇合点">
        <Defs />
        <ellipse cx={320} cy={54} rx={86} ry={28} fill={C.brand} />
        <text x={320} y={50} textAnchor="middle" fontSize={12} fontWeight={800} fill="#fff">第十一章 疫苗</text>
        <text x={320} y={66} textAnchor="middle" fontSize={8} fill="#a9d8c3">整门课的汇合点</text>

        {CHAIN.map((c, i) => {
          const x = 34 + i * 98
          const on = i === active
          return (
            <g key={c.ch} onClick={() => setActive(i)} style={{ cursor: 'pointer' }}>
              <line x1={320} y1={82} x2={x + 44} y2={112} stroke={on ? C.gold : C.line} strokeWidth={on ? 2.4 : 1.2} />
              <rect x={x} y={112} width={88} height={44} rx={8} fill={on ? C.goldBg : '#fff'} stroke={on ? C.gold : C.line} strokeWidth={on ? 2.4 : 1.2} />
              <text x={x + 44} y={130} textAnchor="middle" fontSize={7.5} fontWeight={700} fill={C.muted}>{c.ch}</text>
              <text x={x + 44} y={146} textAnchor="middle" fontSize={8.5} fontWeight={on ? 800 : 600} fill={on ? C.brand : C.ink}>{c.name}</text>
            </g>
          )
        })}
        <text x={320} y={176} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={C.brand}>
          {CHAIN[active].name}：{CHAIN[active].role}
        </text>
      </svg>
      <div className="figure__toolbar">
        {CHAIN.map((c, i) => (
          <button key={c.ch} type="button" className="btn btn--quiet btn--sm" aria-pressed={active === i} onClick={() => setActive(i)}>
            {c.name}
          </button>
        ))}
      </div>
      <p className="figure__caption">
        <strong>{CHAIN[active].ch} {CHAIN[active].name}：</strong>{CHAIN[active].role}
      </p>
    </div>
  )
}
