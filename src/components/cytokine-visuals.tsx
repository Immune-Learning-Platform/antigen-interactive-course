import { useState } from 'react'
import { Tag } from './ui'
import { StepPlayer } from './StepPlayer'

/* ==========================================================================
   第4章《细胞因子应用》专属图示（原创 SVG）
   依据课件第 6—15 页；示意均标注为教学示意。
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
    <path d={d} fill="none" stroke={active ? C.gold : C.line} strokeWidth={active ? 2.4 : 1.5} markerEnd={active ? 'url(#ckArrowOn)' : 'url(#ckArrowOff)'} />
  )
}

function Defs() {
  return (
    <defs>
      <marker id="ckArrowOff" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill={C.line} />
      </marker>
      <marker id="ckArrowOn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill={C.gold} />
      </marker>
    </defs>
  )
}

/* ---------------------------- 1. 细胞因子网络 ---------------------------- */

export function CytokineNetwork() {
  const [active, setActive] = useState<'pass' | 'help' | 'restrain'>('pass')
  const nodes = [
    { id: 't', label: 'T 细胞', x: 120, y: 60 },
    { id: 'b', label: 'B 细胞', x: 300, y: 40 },
    { id: 'm', label: '巨噬细胞', x: 90, y: 170 },
    { id: 'n', label: 'NK 细胞', x: 300, y: 175 },
    { id: 'e', label: '内皮细胞', x: 200, y: 118 },
  ]
  return (
    <div className="figure">
      <svg viewBox="0 0 420 230" role="img" aria-label="细胞因子在免疫细胞之间传递信息、彼此协助与制约的网络示意">
        <Defs />
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={26} fill={C.mintBg} stroke={C.brandMid} strokeWidth={2} />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={C.brand}>
              {n.label}
            </text>
          </g>
        ))}
        {/* 传递 */}
        <g opacity={active === 'pass' ? 1 : 0.25}>
          <path d="M146 70 Q200 60, 274 48" fill="none" stroke={C.gold} strokeWidth={2.4} markerEnd="url(#ckArrowOn)" strokeDasharray="6 4" />
          <text x={210} y={38} textAnchor="middle" fontSize={9} fill={C.gold}>传递信息</text>
        </g>
        {/* 协助 */}
        <g opacity={active === 'help' ? 1 : 0.25}>
          <path d="M116 168 Q170 145, 194 128" fill="none" stroke={C.blue} strokeWidth={2.4} markerEnd="url(#ckArrowOn)" strokeDasharray="6 4" />
          <text x={140} y={140} textAnchor="middle" fontSize={9} fill={C.blue}>相互协助</text>
        </g>
        {/* 制约 */}
        <g opacity={active === 'restrain' ? 1 : 0.25}>
          <path d="M200 144 Q250 160, 274 172" fill="none" stroke={C.orange} strokeWidth={2.4} markerEnd="url(#ckArrowOn)" strokeDasharray="6 4" />
          <text x={244} y={138} textAnchor="middle" fontSize={9} fill={C.orange}>彼此约束</text>
        </g>
        <text x={210} y={216} textAnchor="middle" fontSize={9} fill={C.muted}>
          维持免疫系统稳定平衡
        </text>
      </svg>
      <div className="figure__toolbar">
        {([['pass', '传递信息'], ['help', '相互协助'], ['restrain', '彼此制约']] as const).map(([k, label]) => (
          <button key={k} type="button" className="btn btn--quiet btn--sm" aria-pressed={active === k} onClick={() => setActive(k)}>
            {label}
          </button>
        ))}
      </div>
      <p className="figure__caption">
        {active === 'pass'
          ? '传递信息：细胞因子把“现在需要什么反应”从一个细胞传给另一个细胞——这是最基本的功能。'
          : active === 'help'
            ? '相互协助：多种细胞因子协同放大某一类应答，例如促进 T 细胞增殖。'
            : '彼此制约：也存在抑制性信号，避免应答无限放大。促进与抑制之间的平衡，就是“调控”。'}
      </p>
    </div>
  )
}

/* ---------------------------- 2. 三种分泌方式 ---------------------------- */

export function CytokineSecretion() {
  const [mode, setMode] = useState<'auto' | 'para' | 'endo'>('auto')
  return (
    <div className="figure">
      <div className="figure__toolbar">
        {([['auto', '自分泌'], ['para', '旁分泌'], ['endo', '内分泌']] as const).map(([k, l]) => (
          <button key={k} type="button" className="btn btn--quiet btn--sm" aria-pressed={mode === k} onClick={() => setMode(k)}>
            {l}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 520 200" role="img" aria-label={`细胞因子${mode === 'auto' ? '自分泌' : mode === 'para' ? '旁分泌' : '内分泌'}作用方式示意`}>
        <Defs />
        {/* 分泌细胞 */}
        <circle cx={mode === 'endo' ? 90 : 110} cy={100} r={34} fill={C.goldBg} stroke={C.gold} strokeWidth={2.4} />
        <text x={mode === 'endo' ? 90 : 110} y={104} textAnchor="middle" fontSize={10} fontWeight={700} fill={C.gold}>分泌细胞</text>

        {mode === 'auto' ? (
          <>
            <path d="M110 66 Q150 30, 128 62" fill="none" stroke={C.brandMid} strokeWidth={2.4} markerEnd="url(#ckArrowOn)" />
            <text x={160} y={54} fontSize={10.5} fontWeight={700} fill={C.brandMid}>作用于自身</text>
            <text x={160} y={72} fontSize={9.5} fill={C.muted}>如 T 细胞分泌 IL-2 促进自身增殖</text>
          </>
        ) : mode === 'para' ? (
          <>
            <circle cx={260} cy={100} r={28} fill={C.mintBg} stroke={C.brandMid} strokeWidth={2} />
            <text x={260} y={104} textAnchor="middle" fontSize={9.5} fill={C.brand}>邻近细胞</text>
            <Arrow d="M146 100 H228" active />
            <text x={300} y={86} fontSize={10.5} fontWeight={700} fill={C.brandMid}>作用于邻近细胞</text>
            <text x={300} y={104} fontSize={9.5} fill={C.muted}>局部范围，起效较快</text>
          </>
        ) : (
          <>
            <path d="M126 100 H200" stroke={C.blue} strokeWidth={2.6} markerEnd="url(#ckArrowOn)" />
            <path d="M200 100 C230 70, 260 70, 290 100 S350 130, 380 100" fill="none" stroke={C.blue} strokeWidth={2} strokeDasharray="6 4" />
            <circle cx={420} cy={100} r={26} fill={C.blueBg} stroke={C.blue} strokeWidth={2} />
            <text x={420} y={104} textAnchor="middle" fontSize={9} fill={C.blue}>远端靶细胞</text>
            <text x={250} y={54} fontSize={10.5} fontWeight={700} fill={C.blue}>经血液循环</text>
            <text x={250} y={72} fontSize={9.5} fill={C.muted}>作用范围最广，起效较慢</text>
          </>
        )}
        <text x={20} y={186} fontSize={9.5} fill={C.muted}>课件原文：细胞因子以自分泌、旁分泌或内分泌形式发挥作用。</text>
      </svg>
      <p className="figure__caption">
        {mode === 'auto'
          ? '自分泌：细胞分泌的细胞因子作用于自身。'
          : mode === 'para'
            ? '旁分泌：作用于邻近细胞——这是免疫应答中最常见的方式。'
            : '内分泌：进入血液循环，作用于远距离靶细胞，作用范围最广。'}
      </p>
    </div>
  )
}

/* ---------------------------- 3. 五种性质 ---------------------------- */

const PROPS = [
  { id: 'pleio', name: '多效性', rel: '一因子 → 多效应', desc: '一种细胞因子可作用于多种靶细胞、产生多种生物学效应。', color: C.gold },
  { id: 'redun', name: '重叠性', rel: '多因子 → 相似效应', desc: '不同细胞因子可产生相同或相似的效应（功能冗余）。', color: C.mint },
  { id: 'ant', name: '拮抗性', rel: '互相抑制', desc: '一种细胞因子抑制另一种细胞因子的作用。', color: C.orange },
  { id: 'syn', name: '协同性', rel: '共同作用更强', desc: '两种细胞因子共同作用的效果优于各自单独作用。', color: C.blue },
  { id: 'net', name: '网络性', rel: '整体成网', desc: '细胞因子之间相互影响，构成复杂的调控网络。', color: C.brandMid },
]

export function CytokineFiveProperties() {
  const [active, setActive] = useState('pleio')
  const hit = PROPS.find((p) => p.id === active) ?? PROPS[0]
  return (
    <div className="figure">
      <ul className="pathogengrid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(104px, 1fr))' }}>
        {PROPS.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              className={`pathogencard ${active === p.id ? 'is-active' : ''}`}
              aria-pressed={active === p.id}
              onClick={() => setActive(p.id)}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: '#fff',
                  border: `2px solid ${p.color}`,
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 14,
                  fontWeight: 800,
                  color: p.color,
                  marginBottom: 6,
                }}
              >
                {p.name.slice(0, 1)}
              </span>
              <span className="pathogencard__name" style={{ fontSize: '0.82rem' }}>{p.name}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="figure__caption">
        <strong>{hit.name}</strong>（{hit.rel}）—— {hit.desc}
      </p>
      <p className="xs muted">记忆口诀：先问“参战几个因子”——一个对多目标=多效；多个对同一目标=重叠；互相加减=协同/拮抗；整体成网=网络。</p>
    </div>
  )
}

/* ---------------------------- 4. 信号转导链条 ---------------------------- */

const SIGNAL_STEPS = [
  { title: '细胞因子释放', desc: '分泌细胞释放细胞因子，作为胞外信号分子。' },
  { title: '结合特异性受体', desc: '细胞因子与靶细胞表面的特异性受体结合——这是“识别”环节。' },
  { title: '信号转导', desc: '胞外信号被传入细胞，激活胞内通路（如 JAK–STAT 信号轴）。' },
  { title: '改变靶细胞功能', desc: '信号传至细胞核，调控基因表达，从而改变靶细胞功能（如增殖、抗病毒状态）。' },
]

export function CytokineSignal() {
  return (
    <StepPlayer
      ariaLabel="细胞因子受体介导信号转导的分步演示"
      steps={SIGNAL_STEPS.map((s) => ({ title: s.title, desc: s.desc }))}
      render={(active) => (
        <svg viewBox="0 0 600 190" role="img" aria-label="细胞因子结合受体后经信号转导改变靶细胞功能">
          <Defs />
          {/* 靶细胞轮廓 */}
          <rect x={30} y={26} width={540} height={140} rx={16} fill="#fbfdfc" stroke={C.line} />
          <text x={44} y={46} fontSize={9.5} fill={C.muted}>靶细胞</text>
          {/* 细胞因子 */}
          <circle cx={96} cy={96} r={12} fill={C.gold} opacity={active >= 0 ? 1 : 0.3} />
          <text x={96} y={74} textAnchor="middle" fontSize={9} fill={C.gold}>细胞因子</text>
          {/* 受体（膜上） */}
          <rect x={136} y={78} width={12} height={36} rx={4} fill={C.brandMid} opacity={active >= 1 ? 1 : 0.3} />
          <rect x={136} y={78} width={40} height={12} rx={4} fill={C.brandMid} opacity={active >= 1 ? 0.9 : 0.25} />
          <text x={166} y={140} textAnchor="middle" fontSize={9} fill={C.brandMid}>特异性受体</text>
          {/* 胞内信号 */}
          <g opacity={active >= 2 ? 1 : 0.2}>
            <Arrow d="M186 96 H300" active />
            <rect x={302} y={78} width={104} height={36} rx={9} fill={C.mintBg} stroke={C.brandMid} strokeWidth={1.8} />
            <text x={354} y={100} textAnchor="middle" fontSize={10} fontWeight={700} fill={C.brandMid}>JAK–STAT</text>
          </g>
          {/* 细胞核 */}
          <g opacity={active >= 3 ? 1 : 0.2}>
            <Arrow d="M410 96 H462" active />
            <circle cx={498} cy={96} r={30} fill={C.blueBg} stroke={C.blue} strokeWidth={2.2} />
            <text x={498} y={100} textAnchor="middle" fontSize={10} fontWeight={700} fill={C.blue}>细胞核</text>
            <text x={498} y={146} textAnchor="middle" fontSize={9} fill={C.blue}>调控基因表达</text>
          </g>
          <text x={30} y={182} fontSize={9.5} fill={C.muted}>
            课件要点：细胞因子通过与靶细胞表面特异性受体结合，把胞外信号传入细胞，改变靶细胞的功能。
          </text>
        </svg>
      )}
    />
  )
}

/* ---------------------------- 5. 四种作用机制 ---------------------------- */

const MECHS = [
  { id: 'antiviral', name: '抗病毒', color: C.blue, key: '诱导抗病毒蛋白 → 抑制病毒复制' },
  { id: 'prolif', name: '促增殖', color: C.mint, key: '促进靶细胞分裂，细胞数量增加' },
  { id: 'inflam', name: '促炎募集', color: C.orange, key: '促进炎症细胞募集活化，增强炎症反应' },
  { id: 'chemo', name: '趋化', color: C.gold, key: '沿浓度梯度定向迁移（CXCL8→CXCR1/2→G 蛋白→骨架重排）' },
]

export function CytokineMechanisms() {
  const [active, setActive] = useState('antiviral')
  const hit = MECHS.find((m) => m.id === active) ?? MECHS[0]
  return (
    <div className="figure">
      <div className="figure__toolbar">
        {MECHS.map((m) => (
          <button key={m.id} type="button" className="btn btn--quiet btn--sm" aria-pressed={active === m.id} onClick={() => setActive(m.id)}>
            {m.name}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 600 170" role="img" aria-label={`细胞因子作用机制：${hit.name}`}>
        <Defs />
        <rect x={20} y={40} width={120} height={56} rx={10} fill={hit.color} opacity={0.15} stroke={hit.color} strokeWidth={2} />
        <text x={80} y={64} textAnchor="middle" fontSize={10.5} fontWeight={700} fill={hit.color}>细胞因子</text>
        <text x={80} y={82} textAnchor="middle" fontSize={9} fill={C.muted}>结合受体</text>
        <Arrow d="M146 68 H214" active />
        <rect x={216} y={40} width={150} height={56} rx={10} fill="#fff" stroke={hit.color} strokeWidth={2} />
        <text x={291} y={64} textAnchor="middle" fontSize={10} fontWeight={700} fill={C.ink}>信号转导</text>
        <text x={291} y={82} textAnchor="middle" fontSize={9} fill={C.muted}>改变靶细胞功能</text>
        <Arrow d="M372 68 H440" active />
        <rect x={442} y={32} width={140} height={72} rx={10} fill={hit.color} opacity={0.12} stroke={hit.color} strokeWidth={2} />
        <text x={512} y={62} textAnchor="middle" fontSize={10.5} fontWeight={800} fill={hit.color}>结果</text>
        <text x={512} y={82} textAnchor="middle" fontSize={8.5} fill={C.ink} style={{ maxWidth: 120 }}>
          {hit.name}
        </text>
        <text x={20} y={136} fontSize={10} fill={C.ink}>{hit.key}</text>
        <text x={20} y={158} fontSize={9} fill={C.muted}>
          四种机制共同起点都是“受体介导”，区别在于信号传入后改变的是什么功能。
        </text>
      </svg>
      <p className="figure__caption">
        <strong>{hit.name}</strong>：{hit.key}。
      </p>
    </div>
  )
}

/* ---------------------------- 6. 细胞因子风暴 ---------------------------- */

const STORM_STEPS = [
  { title: '感染触发', desc: '病原刺激引发促炎细胞因子释放，这是正常的防御反应。' },
  { title: '正反馈放大', desc: '促炎因子进一步激活更多炎症细胞，形成级联放大。' },
  { title: '内皮激活', desc: '课件原文：IL-6 作用于血管内皮细胞，促进内皮激活及炎症介质释放。' },
  { title: '全身炎症加重', desc: '放大细胞因子风暴，加重全身炎症反应，形成失控状态。' },
  { title: '器官损伤', desc: '课件原文：细胞因子风暴是引起急性呼吸窘迫综合征和多器官衰竭的重要原因。' },
]

export function CytokineStorm() {
  return (
    <StepPlayer
      ariaLabel="细胞因子风暴形成过程的分步演示"
      steps={STORM_STEPS.map((s) => ({ title: s.title, desc: s.desc }))}
      baseMs={2900}
      render={(active) => (
        <svg viewBox="0 0 600 200" role="img" aria-label="细胞因子风暴由局部炎症放大为全身失控的过程">
          <Defs />
          {STORM_STEPS.map((s, i) => {
            const x = 16 + i * 116
            const on = i === active
            const done = i < active
            const tone = i >= 3 ? C.orange : C.brandMid
            return (
              <g key={s.title}>
                <rect x={x} y={44} width={104} height={72} rx={10} fill={on ? C.goldBg : done ? C.mintBg : '#fff'} stroke={on ? C.gold : i >= 3 ? C.orange : C.line} strokeWidth={on ? 2.6 : 1.4} />
                <text x={x + 52} y={64} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.muted}>第 {i + 1} 步</text>
                <text x={x + 52} y={84} textAnchor="middle" fontSize={10} fontWeight={on ? 800 : 600} fill={on ? C.brand : i >= 3 ? C.orange : tone}>
                  {s.title.length > 5 ? s.title.slice(0, 5) : s.title}
                </text>
                {s.title.length > 5 ? (
                  <text x={x + 52} y={100} textAnchor="middle" fontSize={10} fontWeight={on ? 800 : 600} fill={on ? C.brand : i >= 3 ? C.orange : tone}>
                    {s.title.slice(5)}
                  </text>
                ) : null}
                {i < STORM_STEPS.length - 1 ? <Arrow d={`M${x + 106} 80 H${x + 114}`} active={on} /> : null}
              </g>
            )
          })}
          <text x={16} y={150} fontSize={9.5} fill={C.muted}>
            关键理解：前三步是正常防御，后两步是“失控”——同一条通路，过度即损伤。
          </text>
          <text x={16} y={172} fontSize={9} fill={C.muted}>
            治疗逻辑因此是“精准调控”而非“全面压制”。
          </text>
        </svg>
      )}
    />
  )
}

/* ---------------------------- 7. 临床对照数据 ---------------------------- */

export function IfnTrial() {
  const [show, setShow] = useState<'ratio' | 'pct'>('ratio')
  const a = show === 'ratio' ? '3 / 43' : '7.0%'
  const b = show === 'ratio' ? '14 / 49' : '28.6%'
  const ha = show === 'ratio' ? 7 : 7
  const hb = show === 'ratio' ? 28.6 : 28.6
  return (
    <div className="figure">
      <svg viewBox="0 0 560 200" role="img" aria-label="IFN-ω 辅助治疗犬细小病毒性肠炎的对照数据：两组 10 天内死亡比例对比">
        {/* 轴 */}
        <line x1={70} y1={160} x2={520} y2={160} stroke={C.line} strokeWidth={1.5} />
        <text x={20} y={24} fontSize={10.5} fontWeight={700} fill={C.brand}>10 天内死亡比例</text>

        {/* 条 A */}
        <rect x={110} y={160 - ha * 3.2} width={90} height={ha * 3.2} fill={C.mint} stroke={C.brandMid} strokeWidth={1.6} />
        <text x={155} y={160 - ha * 3.2 - 8} textAnchor="middle" fontSize={12} fontWeight={800} fill={C.brandMid}>{a}</text>
        <text x={155} y={178} textAnchor="middle" fontSize={9.5} fill={C.ink}>常规治疗 + IFN-ω</text>

        {/* 条 B */}
        <rect x={300} y={160 - hb * 3.2} width={90} height={hb * 3.2} fill={C.orangeBg} stroke={C.orange} strokeWidth={1.6} />
        <text x={345} y={160 - hb * 3.2 - 8} textAnchor="middle" fontSize={12} fontWeight={800} fill={C.orange}>{b}</text>
        <text x={345} y={178} textAnchor="middle" fontSize={9.5} fill={C.ink}>常规治疗 + 安慰剂</text>

        <text x={430} y={60} fontSize={9.5} fill={C.muted}>n=43</text>
        <text x={430} y={76} fontSize={9.5} fill={C.muted}>n=49</text>
        <text x={70} y={196} fontSize={9} fill={C.muted}>数据为课件原文所列；柱高按比例示意。</text>
      </svg>
      <div className="figure__toolbar">
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={show === 'ratio'} onClick={() => setShow('ratio')}>
          显示比例（x/n）
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={show === 'pct'} onClick={() => setShow('pct')}>
          显示百分比
        </button>
        <Tag tone="gold">课件原文数据</Tag>
      </div>
      <p className="figure__caption">
        <strong>读数据的三个要点：</strong>① 两组<strong>都在常规治疗之上</strong>比较 → 说明 IFN-ω 是<strong>辅助</strong>；② 有<strong>安慰剂对照</strong> → 结论较可靠；③ 结论边界是“辅助治疗可降低 10 天内死亡率”，<strong>不能外推</strong>为“干扰素能治愈细小”。
      </p>
    </div>
  )
}

/* ---------------------------- 8. 应用矩阵 ---------------------------- */

const APPS = [
  { id: 'ifn', name: '干扰素（IFN）', route: '补充/增强', tone: 'mint' as const, points: ['抗病毒、抗肿瘤、免疫调节等多功能糖蛋白', '用于犬、猫病毒病的辅助治疗', '作用方式：诱导抗病毒蛋白，抑制病毒复制'] },
  { id: 'il-add', name: '白介素（补充）', route: '补充/增强', tone: 'gold' as const, points: ['直接作为药物/免疫调节剂使用', '如重组 IL-2 制剂用于猫纤维肉瘤的治疗', '机制：促进免疫细胞增殖与活化'] },
  { id: 'il-block', name: '白介素通路阻断', route: '抑制/阻断', tone: 'blue' as const, points: ['针对白介素通路开发药物', '如抗 IL-6、抗 IL-5、IL-1 受体拮抗剂', '机制：阻断过度升高的细胞因子信号'] },
  { id: 'csf', name: '其他类别', route: '按需', tone: 'line' as const, points: ['集落刺激因子', '肿瘤坏死因子抑制剂', '生长因子'] },
]

export function CytokineApplications() {
  const [active, setActive] = useState('ifn')
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
          <Tag tone={hit.tone}>{hit.route}</Tag>
        </div>
        <ul className="checklist" style={{ marginTop: 10 }}>
          {hit.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
      <p className="figure__caption">
        两条相反的路线：<strong>补</strong>（给予 IFN、IL-2 等）与<strong>抑</strong>（抗 IL-6、IL-1R 拮抗剂）。选哪条，取决于该因子在具体疾病中是“不足”还是“过度”。
      </p>
    </div>
  )
}
