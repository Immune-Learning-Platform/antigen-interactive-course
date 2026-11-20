import { useState } from 'react'
import { Tag } from './ui'
import { StepPlayer } from './StepPlayer'

/* ==========================================================================
   第3章《抗体生物学功能》专属图示（原创 SVG）
   依据课件第 5—19 页；示意均标注为教学示意。
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
      markerEnd={active ? 'url(#abArrowOn)' : 'url(#abArrowOff)'}
    />
  )
}

function Defs() {
  return (
    <defs>
      <marker id="abArrowOff" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill={C.line} />
      </marker>
      <marker id="abArrowOn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill={C.gold} />
      </marker>
    </defs>
  )
}

/* --------------------------- 1. 基本结构（V 区/C 区） --------------------------- */

export function AntibodyBasicStructure() {
  const [active, setActive] = useState<'v' | 'c'>('v')
  return (
    <div className="figure">
      <svg viewBox="0 0 620 300" role="img" aria-label="抗体 Y 字型结构示意：四条肽链、可变区与恒定区">
        {/* 重链：铰链→肘→臂内 */}
        <path d="M310 210 L310 150 L390 70" fill="none" stroke={C.brandMid} strokeWidth={16} strokeLinecap="round" />
        <path d="M310 210 L310 150 L230 70" fill="none" stroke={C.brandMid} strokeWidth={16} strokeLinecap="round" />
        {/* 重链 Fc 主干 */}
        <path d="M310 210 L310 280" fill="none" stroke={C.brandMid} strokeWidth={18} strokeLinecap="round" />
        {/* 轻链 */}
        <path d="M390 70 L430 30" fill="none" stroke={C.mint} strokeWidth={13} strokeLinecap="round" />
        <path d="M230 70 L190 30" fill="none" stroke={C.mint} strokeWidth={13} strokeLinecap="round" />

        {/* V 区高亮（两臂远端） */}
        <g opacity={active === 'v' ? 1 : 0.35}>
          <path d="M390 70 L430 30" fill="none" stroke={C.gold} strokeWidth={active === 'v' ? 17 : 13} strokeLinecap="round" />
          <path d="M230 70 L190 30" fill="none" stroke={C.gold} strokeWidth={active === 'v' ? 17 : 13} strokeLinecap="round" />
          <circle cx={430} cy={30} r={12} fill={C.gold} />
          <circle cx={190} cy={30} r={12} fill={C.gold} />
        </g>

        {/* C 区示意 */}
        <g opacity={active === 'c' ? 1 : 0.28}>
          <path d="M310 210 L310 150 L390 70" fill="none" stroke={C.blue} strokeWidth={22} strokeLinecap="round" opacity={0.35} />
          <path d="M310 210 L310 150 L230 70" fill="none" stroke={C.blue} strokeWidth={22} strokeLinecap="round" opacity={0.35} />
          <path d="M310 210 L310 280" fill="none" stroke={C.blue} strokeWidth={24} strokeLinecap="round" opacity={0.35} />
        </g>

        {/* 二硫键 */}
        <line x1={378} y1={82} x2={394} y2={66} stroke={C.orange} strokeWidth={3} />
        <line x1={242} y1={82} x2={226} y2={66} stroke={C.orange} strokeWidth={3} />

        {/* 标注 */}
        <text x={455} y={28} fontSize={12} fontWeight={700} fill={C.gold}>V 区</text>
        <text x={455} y={44} fontSize={9.5} fill={C.muted}>决定“认谁”</text>
        <text x={455} y={170} fontSize={12} fontWeight={700} fill={C.blue}>C 区</text>
        <text x={455} y={186} fontSize={9.5} fill={C.muted}>决定“做什么”</text>
        <text x={120} y={110} fontSize={11} fontWeight={700} fill={C.brandMid}>重链</text>
        <text x={120} y={126} fontSize={9.5} fill={C.muted}>450~550 aa</text>
        <text x={120} y={48} fontSize={11} fontWeight={700} fill={C.mint}>轻链</text>
        <text x={120} y={64} fontSize={9.5} fill={C.muted}>约 214 aa</text>
        <text x={330} y={272} fontSize={11} fontWeight={700} fill={C.brandMid}>Fc 段</text>

        <text x={20} y={296} fontSize={9.5} fill={C.muted}>
          教学示意：2 条重链 + 2 条轻链，二硫键连接呈 Y 字型；链长比例经简化。
        </text>
      </svg>
      <div className="figure__toolbar">
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={active === 'v'} onClick={() => setActive('v')}>
          突出可变区 V 区
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={active === 'c'} onClick={() => setActive('c')}>
          突出恒定区 C 区
        </button>
      </div>
      <p className="figure__caption">
        {active === 'v'
          ? 'V 区：重链和轻链靠近 N 端约 110 个氨基酸，序列变化大，与抗原表位互补结合——决定抗体识别什么。'
          : 'C 区：除 V 区以外的部分，序列相对恒定，与补体 C1q、Fc 受体等相互作用——决定抗体能招募什么效应机制。'}
      </p>
    </div>
  )
}

/* ---------------------------- 2. J 链与分泌片 ---------------------------- */

export function JChainSecretory() {
  const [active, setActive] = useState<'j' | 'sc'>('sc')
  return (
    <div className="figure">
      <svg viewBox="0 0 700 230" role="img" aria-label="单体 Ig 经 J 链连接为二聚体，再由分泌片结合形成分泌型 IgA">
        <Defs />
        {/* 单体 1 */}
        <g>
          <path d="M120 150 L120 110 L150 80" fill="none" stroke={C.brandMid} strokeWidth={9} strokeLinecap="round" />
          <path d="M120 150 L120 110 L90 80" fill="none" stroke={C.brandMid} strokeWidth={9} strokeLinecap="round" />
          <text x={120} y={176} textAnchor="middle" fontSize={10} fill={C.muted}>Ig 单体</text>
        </g>
        {/* 单体 2 */}
        <g>
          <path d="M240 150 L240 110 L270 80" fill="none" stroke={C.brandMid} strokeWidth={9} strokeLinecap="round" />
          <path d="M240 150 L240 110 L210 80" fill="none" stroke={C.brandMid} strokeWidth={9} strokeLinecap="round" />
          <text x={240} y={176} textAnchor="middle" fontSize={10} fill={C.muted}>Ig 单体</text>
        </g>

        {/* J 链连接 */}
        <g opacity={active === 'j' ? 1 : 0.35}>
          <line x1={150} y1={150} x2={210} y2={150} stroke={C.gold} strokeWidth={active === 'j' ? 7 : 4} strokeLinecap="round" />
          <text x={180} y={168} textAnchor="middle" fontSize={11} fontWeight={active === 'j' ? 800 : 500} fill={C.gold}>J 链</text>
        </g>

        <Arrow d="M300 125 H350" active />

        {/* 二聚体 + 分泌片 */}
        <g transform="translate(370,0)">
          <path d="M40 150 L40 110 L70 80" fill="none" stroke={C.brandMid} strokeWidth={9} strokeLinecap="round" />
          <path d="M40 150 L40 110 L10 80" fill="none" stroke={C.brandMid} strokeWidth={9} strokeLinecap="round" />
          <path d="M120 150 L120 110 L150 80" fill="none" stroke={C.brandMid} strokeWidth={9} strokeLinecap="round" />
          <path d="M120 150 L120 110 L90 80" fill="none" stroke={C.brandMid} strokeWidth={9} strokeLinecap="round" />
          <line x1={50} y1={140} x2={110} y2={140} stroke={C.gold} strokeWidth={5} strokeLinecap="round" />
          <text x={80} y={168} textAnchor="middle" fontSize={10} fill={C.muted}>二聚体</text>

          {/* 分泌片包裹 */}
          <g opacity={active === 'sc' ? 1 : 0.35}>
            <path
              d="M8 62 C-6 110, 20 160, 80 168 C140 160, 166 110, 152 62"
              fill="none"
              stroke={C.blue}
              strokeWidth={active === 'sc' ? 6 : 4}
              strokeDasharray="8 5"
              strokeLinecap="round"
            />
            <text x={80} y={40} textAnchor="middle" fontSize={11} fontWeight={active === 'sc' ? 800 : 500} fill={C.blue}>
              分泌片
            </text>
          </g>
          <text x={80} y={196} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.brand}>分泌型 IgA（sIgA）</text>
        </g>

        <text x={20} y={220} fontSize={9.5} fill={C.muted}>
          教学示意：J 链由浆细胞合成、连接单体；分泌片由黏膜上皮细胞产生、以非共价形式结合，保护 sIgA 抵抗蛋白水解。
        </text>
      </svg>
      <div className="figure__toolbar">
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={active === 'j'} onClick={() => setActive('j')}>
          J 链的作用
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={active === 'sc'} onClick={() => setActive('sc')}>
          分泌片的作用
        </button>
      </div>
      <p className="figure__caption">
        {active === 'j'
          ? 'J 链：由浆细胞合成，能将 Ig 单体连接为二聚体或多聚体，并与抗体的体内运转有关。'
          : '分泌片：由黏膜上皮细胞合成和分泌，以非共价形式结合到二聚体上，形成 sIgA，能抵抗蛋白水解酶消化——这是 sIgA 能在黏膜表面存活的关键。'}
      </p>
    </div>
  )
}

/* --------------------------- 3. 水解片段对照 --------------------------- */

export function AntibodyHydrolysis() {
  const [enzyme, setEnzyme] = useState<'papain' | 'pepsin'>('papain')
  const isPapain = enzyme === 'papain'
  return (
    <div className="figure">
      <div className="figure__toolbar">
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={isPapain} onClick={() => setEnzyme('papain')}>
          木瓜蛋白酶水解
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={!isPapain} onClick={() => setEnzyme('pepsin')}>
          胃蛋白酶水解
        </button>
      </div>
      <svg viewBox="0 0 700 280" role="img" aria-label={`IgG 经${isPapain ? '木瓜蛋白酶' : '胃蛋白酶'}水解的产物示意`}>
        <Defs />
        {/* 完整 IgG */}
        <g>
          <path d="M120 150 L120 110 L152 78" fill="none" stroke={C.brandMid} strokeWidth={10} strokeLinecap="round" />
          <path d="M120 150 L120 110 L88 78" fill="none" stroke={C.brandMid} strokeWidth={10} strokeLinecap="round" />
          <path d="M120 150 L120 210" fill="none" stroke={C.brandMid} strokeWidth={11} strokeLinecap="round" />
          <text x={120} y={238} textAnchor="middle" fontSize={10.5} fill={C.muted}>完整 IgG</text>
        </g>

        {/* 切割线 */}
        <g>
          <line x1={60} y1={128} x2={180} y2={128} stroke={C.orange} strokeWidth={2.5} strokeDasharray="6 4" />
          {!isPapain ? (
            <line x1={60} y1={192} x2={180} y2={192} stroke={C.orange} strokeWidth={2.5} strokeDasharray="6 4" />
          ) : null}
        </g>

        <Arrow d="M210 150 H268" active />

        {/* 产物 */}
        {isPapain ? (
          <g>
            {/* 2 个 Fab */}
            <g transform="translate(300,0)">
              <path d="M40 96 L40 60 L70 30" fill="none" stroke={C.brandMid} strokeWidth={9} strokeLinecap="round" />
              <path d="M40 96 L40 60 L12 30" fill="none" stroke={C.mint} strokeWidth={8} strokeLinecap="round" />
              <circle cx={70} cy={30} r={9} fill={C.gold} />
              <text x={40} y={122} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.brand}>Fab</text>
              <text x={40} y={138} textAnchor="middle" fontSize={9} fill={C.muted}>1 个结合位点</text>
            </g>
            <g transform="translate(300,130)">
              <path d="M40 96 L40 60 L70 30" fill="none" stroke={C.brandMid} strokeWidth={9} strokeLinecap="round" />
              <path d="M40 96 L40 60 L12 30" fill="none" stroke={C.mint} strokeWidth={8} strokeLinecap="round" />
              <circle cx={70} cy={30} r={9} fill={C.gold} />
              <text x={40} y={122} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.brand}>Fab</text>
              <text x={40} y={138} textAnchor="middle" fontSize={9} fill={C.muted}>1 个结合位点</text>
            </g>
            {/* 1 个 Fc */}
            <g transform="translate(480,60)">
              <rect x={0} y={0} width={86} height={80} rx={14} fill={C.mintBg} stroke={C.brandMid} strokeWidth={2.4} />
              <text x={43} y={36} textAnchor="middle" fontSize={12} fontWeight={800} fill={C.brandMid}>Fc</text>
              <text x={43} y={56} textAnchor="middle" fontSize={9} fill={C.muted}>完整保留</text>
            </g>
            <text x={600} y={150} fontSize={10.5} fill={C.brand}>结果：2 Fab + 1 Fc</text>
          </g>
        ) : (
          <g>
            {/* 1 个 F(ab')2 */}
            <g transform="translate(300,54)">
              <path d="M70 96 L70 60 L104 26" fill="none" stroke={C.brandMid} strokeWidth={9} strokeLinecap="round" />
              <path d="M70 96 L70 60 L36 26" fill="none" stroke={C.brandMid} strokeWidth={9} strokeLinecap="round" />
              <path d="M70 96 L104 26" fill="none" stroke={C.mint} strokeWidth={7} strokeLinecap="round" opacity={0.7} />
              <path d="M70 96 L36 26" fill="none" stroke={C.mint} strokeWidth={7} strokeLinecap="round" opacity={0.7} />
              <circle cx={104} cy={26} r={9} fill={C.gold} />
              <circle cx={36} cy={26} r={9} fill={C.gold} />
              <text x={70} y={122} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.brand}>F(ab′)₂</text>
              <text x={70} y={138} textAnchor="middle" fontSize={9} fill={C.muted}>保留 2 个结合位点</text>
            </g>
            {/* Fc 降解 */}
            <g transform="translate(470,60)">
              <rect x={0} y={0} width={110} height={80} rx={14} fill={C.orangeBg} stroke={C.orange} strokeWidth={2} strokeDasharray="6 4" />
              <text x={55} y={36} textAnchor="middle" fontSize={11.5} fontWeight={700} fill={C.orange}>Fc 区</text>
              <text x={55} y={54} textAnchor="middle" fontSize={10} fontWeight={600} fill={C.orange}>被降解</text>
            </g>
            <text x={600} y={150} fontSize={10.5} fill={C.brand}>结果：1 F(ab′)₂</text>
          </g>
        )}
        <text x={20} y={268} fontSize={9.5} fill={C.muted}>
          依据课件第 6 页原文；抗蛇毒血清选择胃蛋白酶路线，正是为了得到保留双价结合的 F(ab′)₂。
        </text>
      </svg>
      <p className="figure__caption">
        <strong>{isPapain ? '木瓜蛋白酶' : '胃蛋白酶'}：</strong>
        {isPapain
          ? '产生两个单独结合抗原的 Fab 片段和一个 Fc 片段。注意每个 Fab 只有 1 个抗原结合位点（单价）。'
          : '产生一个保留两个抗原结合位点的 F(ab′)₂ 片段，Fc 区降解。双价结合 + 去掉异种 Fc，是抗血清设计的要点。'}
      </p>
    </div>
  )
}

/* --------------------------- 4. 六大功能总览 --------------------------- */

const FUNCTIONS = [
  { id: 'neutral', name: '中和作用', executor: '抗体本身（V 区）', color: C.gold, bg: C.goldBg, desc: '可变区结合病毒或毒素，阻断其与宿主靶标相互作用。' },
  { id: 'opsonin', name: '调理作用', executor: '吞噬细胞', color: C.mint, bg: C.mintBg, desc: 'Fc 与吞噬细胞受体结合，活化吞噬细胞促进吞噬。' },
  { id: 'adcc', name: 'ADCC', executor: 'NK 细胞', color: C.blue, bg: C.blueBg, desc: 'NK 细胞借 Fc 受体结合抗体 Fc 段，杀伤靶细胞。' },
  { id: 'cdc', name: '激活补体 CDC', executor: '补体（MAC）', color: C.brandMid, bg: '#e6f0ec', desc: '复合物结合 C1q，经典途径形成 MAC 杀伤靶细胞或细菌。' },
  { id: 'mucosal', name: '黏膜免疫', executor: 'sIgA', color: '#57b08c', bg: C.mintBg, desc: '分泌型 IgA 在黏膜表面发挥作用，抵抗蛋白水解酶。' },
  { id: 'damage', name: '免疫损伤', executor: 'IgE / IgG / IgM', color: C.red, bg: C.redBg, desc: 'IgE 介导 I 型；IgG、IgM 介导 II、III 型超敏反应。' },
]

export function AntibodyFunctions() {
  const [active, setActive] = useState('neutral')
  const hit = FUNCTIONS.find((f) => f.id === active) ?? FUNCTIONS[0]
  return (
    <div className="figure">
      <ul className="pathogengrid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))' }}>
        {FUNCTIONS.map((f) => (
          <li key={f.id}>
            <button
              type="button"
              className={`pathogencard ${active === f.id ? 'is-active' : ''}`}
              aria-pressed={active === f.id}
              onClick={() => setActive(f.id)}
              style={{ borderColor: active === f.id ? f.color : undefined }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: f.bg,
                  border: `2px solid ${f.color}`,
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 12,
                  fontWeight: 800,
                  color: f.color,
                  marginBottom: 6,
                }}
              >
                {f.name.slice(0, 1)}
              </span>
              <span className="pathogencard__name" style={{ fontSize: '0.8rem' }}>{f.name}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="figure__caption">
        <strong>{hit.name}</strong>（执行者：{hit.executor}）—— {hit.desc}
      </p>
      <p className="xs muted">
        提示：除中和作用由抗体 V 区直接完成外，其余功能大多靠 Fc 段“招募”效应系统（细胞或补体）来实现。
      </p>
    </div>
  )
}

/* --------------------------- 5. ADCC vs CDC --------------------------- */

export function AdccVsCdc() {
  const [mode, setMode] = useState<'adcc' | 'cdc'>('adcc')
  return (
    <div className="figure">
      <div className="figure__toolbar">
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={mode === 'adcc'} onClick={() => setMode('adcc')}>
          ADCC（NK 细胞执行）
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={mode === 'cdc'} onClick={() => setMode('cdc')}>
          CDC（补体执行）
        </button>
      </div>
      <svg viewBox="0 0 700 250" role="img" aria-label={mode === 'adcc' ? 'ADCC：NK 细胞通过 Fc 受体结合抗体杀伤靶细胞' : 'CDC：复合物结合 C1q 激活补体形成 MAC 杀伤靶细胞'}>
        <Defs />
        {/* 靶细胞 */}
        <circle cx={130} cy={125} r={54} fill={C.redBg} stroke={C.red} strokeWidth={2.6} />
        <text x={130} y={122} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.red}>靶细胞</text>
        <text x={130} y={140} textAnchor="middle" fontSize={9} fill={C.muted}>表面带抗原</text>

        {/* 抗体（桥） */}
        <g>
          <path d="M186 112 L214 100" stroke={C.brandMid} strokeWidth={7} strokeLinecap="round" />
          <path d="M186 138 L214 150" stroke={C.brandMid} strokeWidth={7} strokeLinecap="round" />
          <circle cx={186} cy={112} r={6} fill={C.gold} />
          <circle cx={186} cy={138} r={6} fill={C.gold} />
          <text x={200} y={172} textAnchor="middle" fontSize={9.5} fill={C.brandMid}>抗体</text>
        </g>

        {mode === 'adcc' ? (
          <>
            {/* NK 细胞 */}
            <circle cx={300} cy={125} r={48} fill={C.blueBg} stroke={C.blue} strokeWidth={2.6} />
            <text x={300} y={120} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.blue}>NK 细胞</text>
            <text x={300} y={138} textAnchor="middle" fontSize={9} fill={C.muted}>Fc 受体</text>
            <line x1={252} y1={125} x2={216} y2={125} stroke={C.gold} strokeWidth={2.6} strokeDasharray="5 3" />
            <text x={234} y={116} textAnchor="middle" fontSize={8.5} fill={C.gold}>Fc 结合</text>

            <Arrow d="M352 125 H430" active />
            <rect x={432} y={96} width={230} height={58} rx={12} fill={C.blueBg} stroke={C.blue} strokeWidth={2} />
            <text x={547} y={120} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.blue}>细胞毒作用</text>
            <text x={547} y={138} textAnchor="middle" fontSize={9.5} fill={C.ink}>NK 细胞杀伤靶细胞</text>
          </>
        ) : (
          <>
            {/* C1q → 级联 → MAC */}
            <rect x={216} y={100} width={92} height={50} rx={10} fill={C.goldBg} stroke={C.gold} strokeWidth={2} />
            <text x={262} y={122} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.gold}>C1q</text>
            <text x={262} y={138} textAnchor="middle" fontSize={8.5} fill={C.muted}>结合复合物</text>

            <Arrow d="M310 125 H352" active />
            <rect x={354} y={100} width={104} height={50} rx={10} fill={C.mintBg} stroke={C.brandMid} strokeWidth={2} />
            <text x={406} y={122} textAnchor="middle" fontSize={10.5} fontWeight={700} fill={C.brandMid}>经典途径</text>
            <text x={406} y={138} textAnchor="middle" fontSize={8.5} fill={C.muted}>级联激活</text>

            <Arrow d="M460 125 H502" active />
            <rect x={504} y={96} width={158} height={58} rx={12} fill={C.brand} />
            <text x={583} y={120} textAnchor="middle" fontSize={12} fontWeight={800} fill="#fff">MAC</text>
            <text x={583} y={138} textAnchor="middle" fontSize={9} fill="#a9d8c3">膜攻击复合物</text>
          </>
        )}
        <text x={20} y={232} fontSize={9.5} fill={C.muted}>
          {mode === 'adcc'
            ? 'ADCC 的执行者是 NK 细胞；抗体 Fc 段在此充当“桥”。'
            : 'CDC 的执行者是补体（MAC）。课件要点：抗体不能直接杀死细菌，MAC 可以；且 CDC 可与 ADCC 联合作用。'}
        </text>
      </svg>
      <p className="figure__caption">
        {mode === 'adcc'
          ? 'ADCC：NK 细胞表面具有抗体 Fc 片段的受体，当抗体与靶细胞结合后，NK 细胞借 Fc 受体与抗体 Fc 段结合，发挥细胞毒作用杀伤靶细胞。'
          : 'CDC：抗原抗体复合物通过结合补体 C1q 成分，级联激活补体经典途径，形成膜攻击复合物（MAC）杀伤靶细胞或细菌。'}
      </p>
    </div>
  )
}

/* --------------------------- 6. 抗血清制备流程 --------------------------- */

const ANTISERUM_STEPS = [
  { title: '免疫马匹', desc: '用蛇毒素免疫马匹，使其产生针对蛇毒素的抗体。' },
  { title: '采集血浆', desc: '采集高效价血浆——这一步需要检测抗体效价，确保达到要求。' },
  { title: '酶解', desc: '用酶（如胃蛋白酶）水解，使 Fc 区降解、保留 F(ab′)₂。' },
  { title: '提取与纯化', desc: '提取并纯化抗体片段，得到主要含 F(ab′)₂ 的制品。' },
  { title: '临床使用', desc: '用于毒蛇咬伤的治疗和预防——与毒素结合，发挥中和作用。' },
]

export function AntiserumProduction() {
  return (
    <StepPlayer
      ariaLabel="抗蛇毒血清制备流程的分步演示"
      steps={ANTISERUM_STEPS.map((s) => ({ title: s.title, desc: s.desc }))}
      render={(active) => (
        <svg viewBox="0 0 700 170" role="img" aria-label="抗蛇毒血清制备五步流程">
          <Defs />
          {ANTISERUM_STEPS.map((s, i) => {
            const x = 16 + i * 137
            const on = i === active
            const done = i < active
            return (
              <g key={s.title}>
                <rect x={x} y={44} width={120} height={64} rx={10} fill={on ? C.goldBg : done ? C.mintBg : '#fff'} stroke={on ? C.gold : C.line} strokeWidth={on ? 2.6 : 1.4} />
                <text x={x + 60} y={66} textAnchor="middle" fontSize={10} fontWeight={700} fill={C.muted}>第 {i + 1} 步</text>
                <text x={x + 60} y={88} textAnchor="middle" fontSize={11} fontWeight={on ? 800 : 600} fill={on ? C.brand : C.ink}>
                  {s.title}
                </text>
                {i < ANTISERUM_STEPS.length - 1 ? <Arrow d={`M${x + 122} 76 H${x + 134}`} active={on} /> : null}
              </g>
            )
          })}
          <text x={16} y={146} fontSize={9.5} fill={C.muted}>
            依据课件第 14 页：用蛇毒素免疫马匹后采集高效价血浆，经酶解、提取和纯化，主要含 F(ab′)₂ 片段。
          </text>
        </svg>
      )}
    />
  )
}

/* --------------------------- 7. 产业现状 --------------------------- */

export function AntibodyIndustry() {
  const [active, setActive] = useState<'gap' | 'vet'>('gap')
  return (
    <div className="figure">
      <svg viewBox="0 0 700 220" role="img" aria-label="抗体药物产业现状：单抗在全球畅销药中居多，我国仍处跟跑；兽医领域存在差异化空间">
        <rect x={24} y={30} width={300} height={70} rx={12} fill={C.blueBg} stroke={C.blue} strokeWidth={2} />
        <text x={174} y={54} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.blue}>近 5 年全球销售 Top10 药品</text>
        <text x={174} y={76} textAnchor="middle" fontSize={11} fill={C.ink}>单抗居多</text>

        <rect x={24} y={116} width={300} height={70} rx={12} fill={C.orangeBg} stroke={C.orange} strokeWidth={2} />
        <text x={174} y={140} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.orange}>课件：尚未有一家中国药企上榜</text>
        <text x={174} y={162} textAnchor="middle" fontSize={11} fill={C.ink}>我国抗体药物产业仍处于“跟跑”</text>

        <g onClick={() => setActive('gap')} style={{ cursor: 'pointer' }}>
          <rect x={380} y={56} width={290} height={64} rx={12} fill={active === 'gap' ? C.goldBg : '#fff'} stroke={active === 'gap' ? C.gold : C.line} strokeWidth={active === 'gap' ? 2.6 : 1.4} />
          <text x={525} y={80} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.gold}>看清差距</text>
          <text x={525} y={100} textAnchor="middle" fontSize={9.5} fill={C.ink}>靶点发现 · 工程化改造 · 规模化生产 · 质量体系</text>
        </g>
        <g onClick={() => setActive('vet')} style={{ cursor: 'pointer' }}>
          <rect x={380} y={132} width={290} height={64} rx={12} fill={active === 'vet' ? C.mintBg : '#fff'} stroke={active === 'vet' ? C.brandMid : C.line} strokeWidth={active === 'vet' ? 2.6 : 1.4} />
          <text x={525} y={156} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.brandMid}>兽医的差异化空间</text>
          <text x={525} y={176} textAnchor="middle" fontSize={9.5} fill={C.ink}>物种多 · 成本敏感 · 可接受口服/拌料</text>
        </g>
        <text x={24} y={210} fontSize={9.5} fill={C.muted}>
          数据与表述均引自课件第 13 页；本页未补充任何未经核实的市场数据。
        </text>
      </svg>
      <div className="figure__toolbar">
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={active === 'gap'} onClick={() => setActive('gap')}>
          看清差距
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={active === 'vet'} onClick={() => setActive('vet')}>
          兽医的空间
        </button>
      </div>
      <p className="figure__caption">
        {active === 'gap'
          ? '差距的实质：抗体药物是技术高地，差距集中在靶点发现、工程化改造、规模化生产与质量体系四个环节。'
          : '兽医特色：动物专用抗体需求与人类不同——物种多、成本敏感、可接受口服或拌料方案，这正是差异化切口。'}
      </p>
    </div>
  )
}

/* --------------------------- 8. 四类创新应用 --------------------------- */

const APPS = [
  {
    id: 'mab',
    name: '宠物临床单抗',
    tag: '治疗',
    tone: 'gold' as const,
    points: ['犬细小单抗：静脉注射快速中和病毒', '猫止痒单抗：靶向 IL-31，代替长期激素', '猫杯状单抗：减少抗病毒药与抗生素使用'],
    note: '课件原文：抗体药物正成为宠物医院的新一代治疗手段。',
  },
  {
    id: 'igy',
    name: '卵黄抗体 IgY',
    tag: '替代/减抗',
    tone: 'mint' as const,
    points: ['免疫产蛋母鸡 → IgY 富集到蛋黄', '蛋黄中 IgY 浓度高、提取简单', '制粉拌料口服，用于仔猪腹泻与水产弧菌病'],
    note: '课件原文：可减少抗生素使用；学生用实验鸡就能完成一轮制备。',
  },
  {
    id: 'combo',
    name: '抗体与细胞因子联用',
    tag: '联用',
    tone: 'blue' as const,
    points: ['问题：宠物治疗用特异性抗体缺乏', '方案：制备特异性抗体 + 筛选最佳细胞因子类型'],
    note: '课件原文：这是从“有抗体”到“用得好”的一步。',
  },
  {
    id: 'dual',
    name: '诊断 + 治疗双轮驱动',
    tag: '双用',
    tone: 'line' as const,
    points: ['抗体偶联物：抗体＋连接子＋毒素，精准递送', '层析试纸条：胶体金/量子点标记，快速出结果', '无需仪器、无需冷链'],
    note: '课件原文：一条抗体分子，既能进药房，也能进检测卡。',
  },
]

export function AntibodyApplications() {
  const [active, setActive] = useState('mab')
  const hit = APPS.find((a) => a.id === active) ?? APPS[0]
  return (
    <div className="figure">
      <div className="figure__toolbar">
        {APPS.map((a) => (
          <button
            key={a.id}
            type="button"
            className="btn btn--quiet btn--sm"
            aria-pressed={active === a.id}
            onClick={() => setActive(a.id)}
          >
            {a.name}
          </button>
        ))}
      </div>
      <div className="card card--flat" style={{ marginTop: 4 }}>
        <div className="row row--between">
          <strong>{hit.name}</strong>
          <Tag tone={hit.tone}>{hit.tag}</Tag>
        </div>
        <ul className="checklist" style={{ marginTop: 10 }}>
          {hit.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p className="xs muted" style={{ marginTop: 8 }}>{hit.note}</p>
      </div>
      <p className="xs muted">
        说明：课件原文中涉及具体单位成果的表述已作匿名化处理，本页仅保留技术原理与应用逻辑。
      </p>
    </div>
  )
}
