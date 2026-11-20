import { useState } from 'react'
import { Tag } from './ui'
import { StepPlayer } from './StepPlayer'

/* ==========================================================================
   第5章《细胞免疫应答》专属图示（原创 SVG）
   依据课件第 2、5—16 页；示意均标注为教学示意。
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
    <path d={d} fill="none" stroke={active ? C.gold : C.line} strokeWidth={active ? 2.4 : 1.5} markerEnd={active ? 'url(#ciArrowOn)' : 'url(#ciArrowOff)'} />
  )
}

function Defs() {
  return (
    <defs>
      <marker id="ciArrowOff" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill={C.line} />
      </marker>
      <marker id="ciArrowOn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill={C.gold} />
      </marker>
    </defs>
  )
}

/* ------------------------- 1. 细胞免疫 vs 体液免疫 ------------------------- */

export function CellularDivision() {
  const [active, setActive] = useState<'humoral' | 'cellular'>('cellular')
  return (
    <div className="figure">
      <svg viewBox="0 0 660 230" role="img" aria-label="体液免疫与细胞免疫的分工：抗体处理细胞外病原，细胞免疫处理细胞内目标">
        <Defs />
        <text x={330} y={26} textAnchor="middle" fontSize={12.5} fontWeight={700} fill={C.brand}>
          适应性免疫应答的两条分支
        </text>

        {/* 体液免疫 */}
        <g onClick={() => setActive('humoral')} style={{ cursor: 'pointer' }}>
          <rect x={24} y={46} width={290} height={116} rx={14} fill={active === 'humoral' ? C.blueBg : '#fff'} stroke={active === 'humoral' ? C.blue : C.line} strokeWidth={active === 'humoral' ? 2.6 : 1.4} />
          <text x={169} y={72} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.blue}>体液免疫（抗体）</text>
          <text x={169} y={96} textAnchor="middle" fontSize={10} fill={C.ink}>靶标：细胞外的病原与毒素</text>
          <text x={169} y={116} textAnchor="middle" fontSize={10} fill={C.muted}>中和 · 调理 · 激活补体 · ADCC</text>
          <text x={169} y={140} textAnchor="middle" fontSize={9.5} fill={C.muted}>抗体“够得到”的目标</text>
        </g>

        {/* 细胞免疫 */}
        <g onClick={() => setActive('cellular')} style={{ cursor: 'pointer' }}>
          <rect x={346} y={46} width={290} height={116} rx={14} fill={active === 'cellular' ? C.mintBg : '#fff'} stroke={active === 'cellular' ? C.brandMid : C.line} strokeWidth={active === 'cellular' ? 2.6 : 1.4} />
          <text x={491} y={72} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.brandMid}>细胞免疫（T 细胞）</text>
          <text x={491} y={96} textAnchor="middle" fontSize={10} fill={C.ink}>靶标：病毒感染细胞 · 肿瘤细胞 · 胞内菌</text>
          <text x={491} y={116} textAnchor="middle" fontSize={10} fill={C.muted}>CTL 直接杀伤 · 细胞因子协同</text>
          <text x={491} y={140} textAnchor="middle" fontSize={9.5} fill={C.muted}>抗体“够不到”的目标</text>
        </g>

        <text x={330} y={192} textAnchor="middle" fontSize={10.5} fill={C.ink}>
          {active === 'humoral'
            ? '体液免疫：抗体在细胞外拦截病原，是“外围防线”。'
            : '细胞免疫：T 细胞清除被感染的细胞与突变细胞，是“内部清查”。'}
        </text>
        <text x={330} y={214} textAnchor="middle" fontSize={9.5} fill={C.muted}>
          两者互补：抗体防“进入”，细胞免疫清“已经进入的”。
        </text>
      </svg>
      <div className="figure__toolbar">
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={active === 'humoral'} onClick={() => setActive('humoral')}>
          体液免疫
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={active === 'cellular'} onClick={() => setActive('cellular')}>
          细胞免疫
        </button>
      </div>
      <p className="figure__caption">
        {active === 'humoral'
          ? '体液免疫由抗体执行，主要针对细胞外的病原与毒素——它能阻止病原进入细胞，但无法清除已经进入细胞内的病原。'
          : '细胞免疫由 T 细胞执行，针对病毒感染细胞、肿瘤细胞、胞内菌——这些目标位于细胞内，抗体无法触及。'}
      </p>
    </div>
  )
}

/* ---------------------------- 2. 三个阶段 ---------------------------- */

const STAGES = [
  { id: 's1', name: '致敏阶段', actors: '抗原递呈细胞 + T 细胞', color: C.blue, key: '抗原加工递呈 → TCR 识别 p-MHC → 免疫突触' },
  { id: 's2', name: '反应阶段', actors: 'T 细胞', color: C.gold, key: '三重信号共同作用 → 活化、增殖、分化' },
  { id: 's3', name: '效应阶段', actors: '效应性 T 细胞', color: C.brandMid, key: 'CTL 杀伤 · 巨噬细胞活化 · 释放淋巴因子' },
]

export function CellularThreeStages() {
  const [active, setActive] = useState('s1')
  const hit = STAGES.find((s) => s.id === active) ?? STAGES[0]
  return (
    <div className="figure">
      <svg viewBox="0 0 660 180" role="img" aria-label="细胞免疫应答的三个阶段：致敏、反应、效应">
        <Defs />
        {STAGES.map((s, i) => {
          const x = 24 + i * 210
          const on = s.id === active
          return (
            <g key={s.id} onClick={() => setActive(s.id)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={40} width={186} height={86} rx={12} fill={on ? `${s.color}1a` : '#fff'} stroke={on ? s.color : C.line} strokeWidth={on ? 2.8 : 1.5} />
              <text x={x + 93} y={66} textAnchor="middle" fontSize={12.5} fontWeight={800} fill={s.color}>
                {i + 1}. {s.name}
              </text>
              <text x={x + 93} y={88} textAnchor="middle" fontSize={9.5} fill={C.ink}>
                主角：{s.actors}
              </text>
              <text x={x + 93} y={108} textAnchor="middle" fontSize={9} fill={C.muted}>
                点击查看关键事件
              </text>
              {i < STAGES.length - 1 ? <Arrow d={`M${x + 188} 83 H${x + 204}`} active={on} /> : null}
            </g>
          )
        })}
        <text x={330} y={152} textAnchor="middle" fontSize={10} fill={C.ink}>{hit.key}</text>
        <text x={330} y={172} textAnchor="middle" fontSize={9} fill={C.muted}>
          课件原文：分为致敏阶段（抗原递呈细胞和 T 细胞）、反应阶段和效应阶段（T 细胞）。
        </text>
      </svg>
      <p className="figure__caption">
        <strong>{hit.name}：</strong>
        主角是「{hit.actors}」；关键事件——{hit.key}。
      </p>
    </div>
  )
}

/* ---------------------------- 3. 历史进程 ---------------------------- */

const HISTORY = [
  { year: '1961', name: 'Miller', text: '揭示胸腺免疫功能——确立胸腺在 T 细胞发育中的地位。' },
  { year: '1973', name: 'Steinman、Cohn', text: '发现树突状细胞激活 T 细胞的作用——找到最有效的抗原递呈细胞。' },
  { year: '1974', name: 'Zinkernagel、Doherty', text: '发表 MHC 限制性研究——解释 T 细胞“必须看 p-MHC”的根本原因。' },
  { year: '1984', name: 'Mak、Davis 等', text: '克隆 TCR 相关基因——从分子层面锁定识别受体。' },
  { year: '1986', name: 'Mosmann、Coffman', text: '提出 Th1/Th2 分类——讲清 T 细胞的功能分化。' },
  { year: '2017', name: 'CAR-T 获批', text: '细胞治疗进入临床应用（课件记载 6 岁白血病女孩 Emily 完全缓解）。' },
]

export function CellularHistory() {
  const [active, setActive] = useState(2)
  return (
    <div className="figure">
      <svg viewBox="0 0 720 150" role="img" aria-label="细胞免疫应答研究的关键发现时间轴">
        <line x1={40} y1={72} x2={680} y2={72} stroke={C.line} strokeWidth={2} />
        {HISTORY.map((h, i) => {
          const x = 60 + i * 108
          const on = i === active
          return (
            <g key={h.year} onClick={() => setActive(i)} style={{ cursor: 'pointer' }}>
              <circle cx={x} cy={72} r={on ? 13 : 8} fill={on ? C.gold : '#fff'} stroke={on ? C.gold : C.line} strokeWidth={2.4} />
              <text x={x} y={48} textAnchor="middle" fontSize={11} fontWeight={700} fill={on ? C.brand : C.muted}>{h.year}</text>
              <text x={x} y={104} textAnchor="middle" fontSize={8.5} fill={on ? C.ink : C.muted}>
                {h.name.length > 8 ? h.name.slice(0, 8) : h.name}
              </text>
            </g>
          )
        })}
        <text x={360} y={136} textAnchor="middle" fontSize={9} fill={C.muted}>
          点击节点查看说明 · 人物与年份引自课件原文
        </text>
      </svg>
      <p className="figure__caption">
        <strong>{HISTORY[active].year} · {HISTORY[active].name}：</strong>
        {HISTORY[active].text}
      </p>
    </div>
  )
}

/* ---------------------------- 4. 抗原递呈 ---------------------------- */

const PRESENT_STEPS = [
  { title: '抗原进入', desc: '抗原被抗原递呈细胞（APC）摄取，或来自细胞内部（内源性）。' },
  { title: '加工成抗原肽', desc: '课件原文：需抗原递呈细胞将抗原降解并加工成抗原肽。' },
  { title: '与 MHC 结合', desc: '抗原肽与 MHC 分子结合，形成 p-MHC 复合物。' },
  { title: '递呈到细胞表面', desc: 'p-MHC 被运送到 APC 表面，供 T 细胞识别。' },
  { title: 'TCR 识别', desc: 'T 细胞通过 TCR 识别 p-MHC——这一步决定应答的特异性。' },
]

export function AntigenPresentation() {
  return (
    <StepPlayer
      ariaLabel="抗原加工与递呈的分步演示"
      steps={PRESENT_STEPS.map((s) => ({ title: s.title, desc: s.desc }))}
      render={(active) => (
        <svg viewBox="0 0 640 180" role="img" aria-label="抗原经加工与 MHC 结合形成 p-MHC 并被 TCR 识别">
          <Defs />
          <rect x={16} y={30} width={608} height={110} rx={14} fill="#fbfdfc" stroke={C.line} />
          <text x={28} y={24} fontSize={9.5} fill={C.muted}>抗原递呈细胞（APC）</text>

          {PRESENT_STEPS.map((s, i) => {
            const x = 40 + i * 116
            const on = i === active
            const done = i < active
            return (
              <g key={s.title}>
                <circle cx={x + 22} cy={80} r={22} fill={on ? C.gold : done ? C.mintBg : '#fff'} stroke={on ? C.gold : C.line} strokeWidth={on ? 3 : 1.6} />
                <text x={x + 22} y={85} textAnchor="middle" fontSize={12} fontWeight={700} fill={on ? '#2a2200' : C.brand}>{i + 1}</text>
                <text x={x + 22} y={120} textAnchor="middle" fontSize={8.5} fill={on ? C.ink : C.muted}>
                  {s.title.length > 5 ? s.title.slice(0, 5) : s.title}
                </text>
                {s.title.length > 5 ? (
                  <text x={x + 22} y={132} textAnchor="middle" fontSize={8.5} fill={on ? C.ink : C.muted}>
                    {s.title.slice(5)}
                  </text>
                ) : null}
                {i < PRESENT_STEPS.length - 1 ? <Arrow d={`M${x + 46} 80 H${x + 90}`} active={on} /> : null}
              </g>
            )
          })}
          <text x={16} y={164} fontSize={9} fill={C.muted}>
            课件要点：T 细胞不能直接识别构象型抗原，只能通过 TCR 识别 p-MHC。
          </text>
        </svg>
      )}
    />
  )
}

/* ---------------------------- 5. 两条递呈路线 ---------------------------- */

export function PresentationRoutes() {
  const [route, setRoute] = useState<'endo' | 'exo'>('endo')
  return (
    <div className="figure">
      <div className="figure__toolbar">
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={route === 'endo'} onClick={() => setRoute('endo')}>
          内源性抗原递呈
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={route === 'exo'} onClick={() => setRoute('exo')}>
          外源性抗原递呈
        </button>
      </div>
      <svg viewBox="0 0 640 220" role="img" aria-label={route === 'endo' ? '内源性抗原经 MHC I 递呈给 CD8⁺ T 细胞' : '外源性抗原经 MHC II 递呈给 CD4⁺ T 细胞'}>
        <Defs />
        <rect x={20} y={30} width={420} height={130} rx={14} fill="#fbfdfc" stroke={C.line} />
        <text x={32} y={24} fontSize={9.5} fill={C.muted}>抗原递呈细胞</text>

        {/* 抗原来源 */}
        <g>
          <circle cx={90} cy={78} r={22} fill={route === 'endo' ? C.redBg : C.blueBg} stroke={route === 'endo' ? C.red : C.blue} strokeWidth={2} />
          <text x={90} y={82} textAnchor="middle" fontSize={8} fill={route === 'endo' ? C.red : C.blue}>
            {route === 'endo' ? '胞内抗原' : '胞外抗原'}
          </text>
          <text x={90} y={118} textAnchor="middle" fontSize={8.5} fill={C.muted}>
            {route === 'endo' ? '病毒蛋白/肿瘤抗原' : '被吞噬的细菌'}
          </text>
        </g>

        <Arrow d="M118 78 H168" active />

        {/* 加工 */}
        <rect x={170} y={58} width={80} height={40} rx={9} fill="#fff" stroke={C.line} strokeWidth={1.5} />
        <text x={210} y={82} textAnchor="middle" fontSize={9} fill={C.ink}>加工为抗原肽</text>

        <Arrow d="M252 78 H302" active />

        {/* MHC + 递呈 */}
        <g>
          <rect x={304} y={48} width={64} height={34} rx={8} fill={route === 'endo' ? C.mintBg : C.goldBg} stroke={route === 'endo' ? C.brandMid : C.gold} strokeWidth={2} />
          <text x={336} y={68} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={route === 'endo' ? C.brandMid : C.gold}>
            {route === 'endo' ? 'MHC I' : 'MHC II'}
          </text>
          <text x={336} y={100} textAnchor="middle" fontSize={8.5} fill={C.muted}>形成 p-MHC</text>
        </g>

        <Arrow d="M372 65 H438" active />

        {/* T 细胞 */}
        <g>
          <circle cx={500} cy={80} r={40} fill={route === 'endo' ? C.blueBg : C.goldBg} stroke={route === 'endo' ? C.blue : C.gold} strokeWidth={2.4} />
          <text x={500} y={76} textAnchor="middle" fontSize={11} fontWeight={800} fill={route === 'endo' ? C.blue : C.gold}>
            {route === 'endo' ? 'CD8⁺' : 'CD4⁺'}
          </text>
          <text x={500} y={92} textAnchor="middle" fontSize={9} fill={C.ink}>T 细胞</text>
          <text x={500} y={136} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={route === 'endo' ? C.blue : C.gold}>
            → {route === 'endo' ? 'CTL' : 'Th'}
          </text>
        </g>

        <text x={20} y={186} fontSize={10} fill={C.ink}>
          {route === 'endo'
            ? '内源性：细胞内部出问题（感染或突变）→ 需要 CTL 直接把问题细胞清除。'
            : '外源性：外面有敌人（被吞噬的细菌）→ 需要 Th 协调更大的免疫反应。'}
        </text>
        <text x={20} y={208} fontSize={9} fill={C.muted}>
          记忆锚点：抗原来自哪里，决定由谁来应战。
        </text>
      </svg>
      <p className="figure__caption">
        <strong>{route === 'endo' ? '内源性抗原递呈' : '外源性抗原递呈'}：</strong>
        {route === 'endo'
          ? '抗原经加工后与 MHC I 类分子结合，递呈给 CD8⁺ T 细胞，诱导细胞毒性 T 细胞（CTL）。'
          : '抗原经加工后与 MHC II 类分子结合，递呈给 CD4⁺ T 细胞，诱导辅助性 T 细胞（Th）。'}
      </p>
    </div>
  )
}

/* ---------------------------- 6. 免疫突触 ---------------------------- */

const SYNAPSE_STEPS = [
  { title: '非特异性接触', desc: 'T 细胞表面黏附分子与 APC 表面配体结合，促进后续识别效率。这种结合可逆而短暂。' },
  { title: 'TCR 识别 p-MHC', desc: 'TCR 特异性识别抗原肽-MHC 复合体——这是特异性识别的关键一步。' },
  { title: '结合增强', desc: '识别成功后，黏附分子结合增强，稳定并延长 T 细胞与 APC 的结合时间。' },
  { title: '形成免疫突触', desc: '稳定的接触结构即免疫突触，信号在此累积，最终驱动 T 细胞活化。' },
]

export function ImmuneSynapse() {
  return (
    <StepPlayer
      ariaLabel="T 细胞识别与免疫突触形成的分步演示"
      steps={SYNAPSE_STEPS.map((s) => ({ title: s.title, desc: s.desc }))}
      render={(active) => (
        <svg viewBox="0 0 560 190" role="img" aria-label="T 细胞与 APC 从非特异性接触到形成免疫突触">
          <Defs />
          {/* APC */}
          <circle cx={170} cy={95} r={62} fill={C.mintBg} stroke={C.brandMid} strokeWidth={2} />
          <text x={170} y={92} textAnchor="middle" fontSize={10.5} fontWeight={700} fill={C.brand}>APC</text>
          <text x={170} y={108} textAnchor="middle" fontSize={8.5} fill={C.muted}>抗原递呈细胞</text>
          {/* T 细胞 */}
          <circle cx={390} cy={95} r={62} fill={C.blueBg} stroke={C.blue} strokeWidth={2} />
          <text x={390} y={92} textAnchor="middle" fontSize={10.5} fontWeight={700} fill={C.blue}>T 细胞</text>
          <text x={390} y={108} textAnchor="middle" fontSize={8.5} fill={C.muted}>TCR</text>

          {/* p-MHC / TCR 接触 */}
          <g opacity={active >= 1 ? 1 : 0.3}>
            <rect x={236} y={82} width={10} height={26} rx={3} fill={C.brandMid} />
            <rect x={314} y={82} width={10} height={26} rx={3} fill={C.brandMid} />
            <text x={280} y={64} textAnchor="middle" fontSize={8.5} fill={C.brandMid}>p-MHC ↔ TCR</text>
          </g>

          {/* 黏附分子（多） */}
          <g opacity={active === 0 || active >= 2 ? 1 : 0.3}>
            {[68, 88, 116, 134].map((y) => (
              <g key={y}>
                <rect x={246} y={y} width={26} height={5} rx={2} fill={C.mint} />
                <rect x={288} y={y} width={26} height={5} rx={2} fill={C.mint} />
              </g>
            ))}
          </g>

          {/* 突触标记 */}
          {active >= 3 ? (
            <g>
              <ellipse cx={280} cy={95} rx={54} ry={62} fill="none" stroke={C.gold} strokeWidth={2.6} strokeDasharray="7 5" />
              <text x={280} y={172} textAnchor="middle" fontSize={10} fontWeight={800} fill={C.gold}>免疫突触</text>
            </g>
          ) : null}

          <text x={280} y={16} textAnchor="middle" fontSize={9} fill={C.muted}>
            {active === 0
              ? '第一步：黏附分子先“黏上”——可逆、短暂'
              : active === 1
                ? '第二步：TCR 认准 p-MHC——特异性识别'
                : active === 2
                  ? '第三步：黏附增强、结合时间延长'
                  : '第四步：形成免疫突触，信号累积'}
          </text>
        </svg>
      )}
    />
  )
}

/* ---------------------------- 7. 三重信号 ---------------------------- */

const SIGNALS = [
  { id: 's1', name: '抗原刺激信号', sub: '第一信号', decide: '决定特异性（认谁）', color: C.gold, content: 'TCR 识别 p-MHC 复合体。' },
  { id: 's2', name: '共刺激信号', sub: '第二信号', decide: '决定是否真正启动', color: C.blue, content: 'APC 与 T 细胞表面共刺激分子互作。避免对无害抗原“误开火”。' },
  { id: 's3', name: '细胞因子信号', sub: '第三信号', decide: '决定分化方向', color: C.brandMid, content: '决定 T 细胞分化为哪一类效应细胞（CTL、Th1、Th2 等）。' },
]

export function ThreeSignals() {
  const [active, setActive] = useState('s1')
  const hit = SIGNALS.find((s) => s.id === active) ?? SIGNALS[0]
  return (
    <div className="figure">
      <svg viewBox="0 0 620 190" role="img" aria-label="T 细胞活化所需的三重信号：抗原刺激、共刺激、细胞因子">
        <Defs />
        <ellipse cx={310} cy={100} rx={72} ry={52} fill={C.mintBg} stroke={C.brandMid} strokeWidth={2.2} />
        <text x={310} y={96} textAnchor="middle" fontSize={11} fontWeight={800} fill={C.brand}>T 细胞</text>
        <text x={310} y={114} textAnchor="middle" fontSize={8.5} fill={C.muted}>活化 / 增殖 / 分化</text>

        {SIGNALS.map((s, i) => {
          const on = s.id === active
          const y = 34 + i * 56
          return (
            <g key={s.id} onClick={() => setActive(s.id)} style={{ cursor: 'pointer' }}>
              <rect x={16} y={y - 18} width={150} height={40} rx={9} fill={on ? `${s.color}1f` : '#fff'} stroke={on ? s.color : C.line} strokeWidth={on ? 2.6 : 1.3} />
              <text x={91} y={y - 1} textAnchor="middle" fontSize={9.5} fontWeight={on ? 800 : 600} fill={on ? s.color : C.ink}>{s.name}</text>
              <text x={91} y={y + 13} textAnchor="middle" fontSize={8} fill={C.muted}>{s.sub}</text>
              <Arrow d={`M168 ${y + 2} H232`} active={on} />
            </g>
          )
        })}

        <rect x={400} y={30} width={204} height={130} rx={12} fill="#fff" stroke={C.line} />
        <text x={502} y={54} textAnchor="middle" fontSize={10} fontWeight={700} fill={hit.color}>{hit.decide}</text>
        <foreignObject x={412} y={64} width={180} height={88}>
          <div style={{ fontSize: 9, lineHeight: 1.5, color: '#35443f' }}>{hit.content}</div>
        </foreignObject>
      </svg>
      <div className="figure__toolbar">
        {SIGNALS.map((s) => (
          <button key={s.id} type="button" className="btn btn--quiet btn--sm" aria-pressed={active === s.id} onClick={() => setActive(s.id)}>
            {s.sub}
          </button>
        ))}
      </div>
      <p className="figure__caption">
        <strong>{hit.name}（{hit.sub}）：</strong>
        {hit.content} —— 它{hit.decide}。
      </p>
      <p className="xs muted">课件原文：三种信号共同作用下，T 细胞分化为不同种类的效应性 T 细胞和少量记忆性 T 细胞。</p>
    </div>
  )
}

/* ---------------------------- 8. 效应机制 ---------------------------- */

const EFFECTORS = [
  { id: 'ctl', name: 'CTL 效应', color: C.red, desc: '细胞毒性 T 细胞识别靶细胞表面 p-MHC I，直接杀伤病毒感染细胞或肿瘤细胞。', target: '病毒感染细胞 · 肿瘤细胞' },
  { id: 'macro', name: '巨噬细胞活化', color: C.blue, desc: '效应 T 细胞释放细胞因子活化巨噬细胞，增强其吞噬与杀伤能力，并释放溶酶体酶。', target: '胞内菌 · 被吞噬的病原' },
  { id: 'lymph', name: '释放淋巴因子', color: C.gold, desc: '效应 T 细胞分泌多种细胞因子，招募并激活周围免疫细胞，放大局部反应。', target: '周围免疫细胞（放大反应）' },
]

export function EffectorMechanisms() {
  const [active, setActive] = useState('ctl')
  const hit = EFFECTORS.find((e) => e.id === active) ?? EFFECTORS[0]
  return (
    <div className="figure">
      <svg viewBox="0 0 620 180" role="img" aria-label="效应 T 细胞的三种作用方式">
        <Defs />
        <ellipse cx={90} cy={92} rx={54} ry={40} fill={C.mintBg} stroke={C.brandMid} strokeWidth={2.2} />
        <text x={90} y={90} textAnchor="middle" fontSize={10} fontWeight={800} fill={C.brand}>效应 T 细胞</text>
        <text x={90} y={106} textAnchor="middle" fontSize={8} fill={C.muted}>致敏 T 细胞</text>

        {EFFECTORS.map((e, i) => {
          const on = e.id === active
          const y = 36 + i * 52
          return (
            <g key={e.id} onClick={() => setActive(e.id)} style={{ cursor: 'pointer' }}>
              <Arrow d={`M148 92 C200 92, 200 ${y + 6}, 250 ${y + 6}`} active={on} />
              <rect x={252} y={y - 14} width={150} height={38} rx={9} fill={on ? `${e.color}1f` : '#fff'} stroke={on ? e.color : C.line} strokeWidth={on ? 2.6 : 1.3} />
              <text x={327} y={y + 8} textAnchor="middle" fontSize={9.5} fontWeight={on ? 800 : 600} fill={on ? e.color : C.ink}>{e.name}</text>
            </g>
          )
        })}

        <rect x={420} y={34} width={184} height={118} rx={12} fill="#fff" stroke={C.line} />
        <text x={512} y={56} textAnchor="middle" fontSize={9} fontWeight={700} fill={hit.color}>主要作用对象</text>
        <foreignObject x={430} y={64} width={164} height={80}>
          <div style={{ fontSize: 9, lineHeight: 1.5, color: '#35443f' }}>{hit.desc}</div>
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
        <strong>{hit.name}（{hit.target}）：</strong>
        {hit.desc}
      </p>
    </div>
  )
}

/* ---------------------------- 9. 应用与检测 ---------------------------- */

const APPS = [
  { id: 'infection', name: '抗微生物感染', tone: 'mint' as const, points: ['胞内菌（如结核分枝杆菌）：Th1 活化巨噬细胞', '病毒感染细胞：CTL 直接杀伤', '抗体够不到的目标，必须靠细胞免疫'] },
  { id: 'tumor', name: '抗肿瘤', tone: 'blue' as const, points: ['CTL 识别肿瘤抗原相关的 p-MHC I', '直接杀伤肿瘤细胞', '是肿瘤免疫治疗的理论基础'] },
  { id: 'tb', name: '牛结核检测', tone: 'gold' as const, points: ['结核分枝杆菌为胞内菌', '机体免疫以细胞免疫为主', '因此检测思路是查细胞免疫反应，而非抗体'] },
]

export function CellularApplications() {
  const [active, setActive] = useState('tb')
  const hit = APPS.find((a) => a.id === active) ?? APPS[0]
  return (
    <div className="figure">
      <div className="figure__toolbar">
        {APPS.map((a) => (
          <button key={a.id} type="button" className="btn btn--quiet btn--sm" aria-pressed={active === a.id} onClick={() => setActive(a.id)}>
            {a.name}
          </button>
        ))}
      </div>
      <div className="card card--flat" style={{ marginTop: 4 }}>
        <div className="row row--between">
          <strong>{hit.name}</strong>
          <Tag tone={hit.tone}>细胞免疫</Tag>
        </div>
        <ul className="checklist" style={{ marginTop: 10 }}>
          {hit.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
      <p className="figure__caption">
        {active === 'tb'
          ? '牛结核检测是本章的典型应用：正因为结核以细胞免疫为主，检疫才检测细胞免疫反应——这也解释了“抗体合格≠防住结核”。'
          : active === 'infection'
            ? '抗感染是细胞免疫最基础的作用：清除藏在细胞内的病原。'
            : '抗肿瘤体现了 CTL 的精准性：识别肿瘤抗原相关的 p-MHC 后直接杀伤。'}
      </p>
    </div>
  )
}

/* ---------------------------- 10. IV 型超敏双刃剑 ---------------------------- */

export function DthDual() {
  const [mode, setMode] = useState<'clear' | 'persist'>('clear')
  return (
    <div className="figure">
      <div className="figure__toolbar">
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={mode === 'clear'} onClick={() => setMode('clear')}>
          抗原被清除（保护）
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={mode === 'persist'} onClick={() => setMode('persist')}>
          抗原持续存在（损伤）
        </button>
      </div>
      <svg viewBox="0 0 620 200" role="img" aria-label={mode === 'clear' ? '抗原被清除后迟发型超敏反应自行消退' : '抗原持续存在导致慢性活化、纤维化与肉芽肿'}>
        <Defs />
        <rect x={20} y={30} width={250} height={120} rx={12} fill={mode === 'clear' ? C.mintBg : '#fff'} stroke={mode === 'clear' ? C.brandMid : C.line} strokeWidth={mode === 'clear' ? 2.4 : 1.3} />
        <text x={145} y={54} textAnchor="middle" fontSize={10.5} fontWeight={700} fill={C.brandMid}>抗原被清除</text>
        <text x={145} y={78} textAnchor="middle" fontSize={9.5} fill={C.ink}>DTH 能自行消退</text>
        <text x={145} y={100} textAnchor="middle" fontSize={9} fill={C.muted}>反应随抗原消失而结束</text>
        <text x={145} y={126} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={C.brandMid}>结果：保护</text>

        <rect x={350} y={30} width={250} height={120} rx={12} fill={mode === 'persist' ? C.orangeBg : '#fff'} stroke={mode === 'persist' ? C.orange : C.line} strokeWidth={mode === 'persist' ? 2.4 : 1.3} />
        <text x={475} y={54} textAnchor="middle" fontSize={10.5} fontWeight={700} fill={C.orange}>抗原持续存在</text>
        <text x={475} y={78} textAnchor="middle" fontSize={9.5} fill={C.ink}>单核/巨噬细胞慢性活化</text>
        <text x={475} y={100} textAnchor="middle" fontSize={9} fill={C.muted}>局部出现纤维化和肉芽肿</text>
        <text x={475} y={126} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={C.orange}>结果：损伤</text>

        <Arrow d={`M${mode === 'clear' ? 272 : 348} 90 H${mode === 'clear' ? 348 : 272}`} active />
        <text x={310} y={78} textAnchor="middle" fontSize={9} fill={C.muted}>同一机制</text>

        <text x={310} y={176} textAnchor="middle" fontSize={10} fontWeight={700} fill={C.ink}>
          {mode === 'clear' ? '同一套机制，抗原清除后是保护' : '同一套机制，抗原持续时转为损伤'}
        </text>
        <text x={310} y={194} textAnchor="middle" fontSize={9} fill={C.muted}>
          课件原文：细胞免疫应答在 IV 型超敏反应发生中发挥不利作用。
        </text>
      </svg>
      <p className="figure__caption">
        {mode === 'clear'
          ? '抗原被清除后，DTH 能自行消退——此时细胞免疫表现为完整的保护作用。'
          : '若抗原持续存在，可致单核/巨噬细胞呈慢性活化状态，局部组织出现纤维化和肉芽肿——这就是细胞免疫的“不利作用”。'}
      </p>
    </div>
  )
}

/* ---------------------------- 11. CAR-T ---------------------------- */

const CART_STEPS = [
  { title: '采集 T 细胞', desc: '从患者（自体）或供者体内采集 T 细胞。' },
  { title: '装入 CAR 基因', desc: '通过基因工程把识别特定靶点的嵌合抗原受体（CAR）导入 T 细胞。' },
  { title: '体外扩增', desc: '在体外培养扩增，获得足够数量的 CAR-T 细胞。' },
  { title: '回输体内', desc: '把扩增后的 CAR-T 细胞回输给患者。' },
  { title: '识别并杀伤靶细胞', desc: 'CAR 直接识别靶细胞表面抗原，突破“天然 TCR 只能识别 p-MHC”的限制。' },
]

export function CartFlow() {
  return (
    <StepPlayer
      ariaLabel="CAR-T 制备与作用流程的分步演示"
      steps={CART_STEPS.map((s) => ({ title: s.title, desc: s.desc }))}
      render={(active) => (
        <svg viewBox="0 0 660 170" role="img" aria-label="CAR-T 流程：采集T细胞、装入CAR基因、扩增、回输、识别杀伤">
          <Defs />
          {CART_STEPS.map((s, i) => {
            const x = 14 + i * 130
            const on = i === active
            const done = i < active
            return (
              <g key={s.title}>
                <rect x={x} y={42} width={114} height={66} rx={10} fill={on ? C.goldBg : done ? C.mintBg : '#fff'} stroke={on ? C.gold : C.line} strokeWidth={on ? 2.6 : 1.4} />
                <text x={x + 57} y={62} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.muted}>第 {i + 1} 步</text>
                <text x={x + 57} y={82} textAnchor="middle" fontSize={9.5} fontWeight={on ? 800 : 600} fill={on ? C.brand : C.ink}>
                  {s.title.length > 6 ? s.title.slice(0, 6) : s.title}
                </text>
                {s.title.length > 6 ? (
                  <text x={x + 57} y={96} textAnchor="middle" fontSize={9.5} fontWeight={on ? 800 : 600} fill={on ? C.brand : C.ink}>
                    {s.title.slice(6)}
                  </text>
                ) : null}
                {i < CART_STEPS.length - 1 ? <Arrow d={`M${x + 116} 75 H${x + 126}`} active={on} /> : null}
              </g>
            )
          })}
          <text x={14} y={140} fontSize={9.5} fill={C.muted}>
            课件要点：CAR-T 通过工程化受体突破“天然 TCR 只能识别 p-MHC”的限制；2017 年 CAR-T 疗法获批。
          </text>
          <text x={14} y={160} fontSize={9} fill={C.muted}>
            流程为教学整理，不代表具体产品的制备规范。
          </text>
        </svg>
      )}
    />
  )
}
