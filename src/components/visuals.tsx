import { useState, type ReactNode } from 'react'
import { Tag } from './ui'
import { StepPlayer } from './StepPlayer'

/* ==========================================================================
   原创 SVG 科学图示（全部矢量绘制，无位图/无版权风险/无 EXIF）
   每个图示都可独立复用：只传状态，不依赖页面上下文
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
}

function Box({
  x,
  y,
  w,
  h,
  title,
  sub,
  active,
  tone = 'mint',
}: {
  x: number
  y: number
  w: number
  h: number
  title: string
  sub?: string
  active?: boolean
  tone?: 'mint' | 'gold' | 'blue' | 'orange'
}) {
  const fill =
    tone === 'gold' ? C.goldBg : tone === 'blue' ? C.blueBg : tone === 'orange' ? C.orangeBg : '#f4faf7'
  const stroke = tone === 'gold' ? C.gold : tone === 'blue' ? C.blue : tone === 'orange' ? C.orange : C.mint
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={fill}
        stroke={active ? C.brand : stroke}
        strokeWidth={active ? 2.4 : 1.2}
      />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 4 : h / 2 + 5)} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.ink}>
        {title}
      </text>
      {sub ? (
        <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" fontSize={11.5} fill={C.muted}>
          {sub}
        </text>
      ) : null}
    </g>
  )
}

function Arrow({ d, active, dashed }: { d: string; active?: boolean; dashed?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={active ? C.gold : C.line}
      strokeWidth={active ? 2.4 : 1.6}
      strokeDasharray={dashed ? '5 5' : undefined}
      markerEnd={active ? 'url(#arrowOn)' : 'url(#arrowOff)'}
    />
  )
}

function Defs() {
  return (
    <defs>
      <marker id="arrowOff" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill={C.line} />
      </marker>
      <marker id="arrowOn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill={C.gold} />
      </marker>
    </defs>
  )
}

/* ---------------------------------- 1. 两大特性 --------------------------------- */

export function TwoPropertiesVisual() {
  const [mode, setMode] = useState<'immuno' | 'react' | 'both'>('both')
  const showImmuno = mode !== 'react'
  const showReact = mode !== 'immuno'

  return (
    <div className="figure">
      <div className="figure__toolbar">
        <span className="xs muted">选择路径：</span>
        {(
          [
            ['immuno', '免疫原性（疫苗）'],
            ['react', '反应原性（检测）'],
            ['both', '两条一起看'],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            className="btn btn--quiet btn--sm"
            aria-pressed={mode === k}
            onClick={() => setMode(k)}
          >
            {label}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 760 340" role="img" aria-label="抗原两大特性示意图：免疫原性路径与反应原性路径">
        <Defs />
        <text x={24} y={26} fontSize={13} fontWeight={700} fill={C.brand}>
          免疫原性：把免疫系统叫醒
        </text>
        <g opacity={showImmuno ? 1 : 0.22}>
          <Box x={24} y={40} w={112} h={54} title="抗原 / 疫苗" tone="gold" active={showImmuno} />
          <Arrow d="M138 67 H186" active={showImmuno} />
          <Box x={188} y={40} w={120} h={54} title="免疫系统" sub="识别 + 启动" active={showImmuno} />
          <Arrow d="M310 67 H356" active={showImmuno} />
          <Box x={358} y={22} w={140} h={44} title="细胞免疫应答" sub="效应 T 细胞" active={showImmuno} />
          <Box x={358} y={78} w={140} h={44} title="体液免疫应答" sub="抗体" active={showImmuno} />
          <Arrow d="M500 44 H548" active={showImmuno} />
          <Arrow d="M500 100 H548" active={showImmuno} />
          <Box x={550} y={22} w={150} h={100} title="保护性免疫" sub="中和 / 清除病原" tone="blue" active={showImmuno} />
        </g>

        <line x1={24} y1={158} x2={736} y2={158} stroke={C.line} strokeDasharray="4 6" />

        <text x={24} y={186} fontSize={13} fontWeight={700} fill={C.brand}>
          反应原性：被免疫应答产物认出来
        </text>
        <g opacity={showReact ? 1 : 0.22}>
          <Box x={24} y={200} w={132} h={54} title="包被特异抗原" sub="固相载体" tone="gold" active={showReact} />
          <Arrow d="M158 227 H206" active={showReact} />
          <Box x={208} y={200} w={132} h={54} title="待检血清" sub="含特异性抗体" active={showReact} />
          <Arrow d="M342 227 H390" active={showReact} />
          <Box x={392} y={200} w={140} h={54} title="抗原—抗体" sub="特异性结合" active={showReact} />
          <Arrow d="M534 227 H582" active={showReact} />
          <Box x={584} y={200} w={116} h={54} title="显色 / 读数" sub="检测抗体水平" tone="blue" active={showReact} />
        </g>

        <text x={24} y={300} fontSize={11.5} fill={C.muted}>
          同一抗原的两条特性可以“分开考”：疫苗看免疫原性；快检、ELISA、血凝抑制试验看反应原性。
        </text>
        <text x={24} y={320} fontSize={11} fill={C.muted}>
          图示依据：本章课件第 6 页“抗原特性”流程（疫苗→细胞/体液免疫；试剂盒→检测抗体水平）。
        </text>
      </svg>
    </div>
  )
}

/* -------------------------------- 2. 概念时间轴 -------------------------------- */

const TIMELINE = [
  { year: '古代', title: '实践先于概念', body: '古人利用含有抗原的物质防病——此时还没有“抗原”这个词，但已经在用抗原。' },
  { year: '1899', title: '提出抗原概念', body: '课件：1899 年提出抗原概念（拉迪斯劳斯·多伊奇）。' },
  { year: '1903', title: '明确抗原作用', body: '课件：1903 年明确抗原作用，抗原从“现象”变成“可研究的作用物”。' },
  { year: '现代', title: '肿瘤抗原与靶向疫苗', body: '课件：克隆鉴定多种肿瘤抗原，研制抗原靶点肿瘤疫苗（陈慰峰院士相关工作）。' },
]

export function ConceptTimeline() {
  const [active, setActive] = useState(0)
  return (
    <div className="figure">
      <svg viewBox="0 0 760 150" role="img" aria-label="抗原概念发展时间轴">
        <line x1={60} y1={70} x2={700} y2={70} stroke={C.line} strokeWidth={2} />
        {TIMELINE.map((t, i) => {
          const x = 70 + i * 200
          const on = i === active
          return (
            <g key={t.year} onClick={() => setActive(i)} style={{ cursor: 'pointer' }}>
              <circle cx={x} cy={70} r={on ? 13 : 9} fill={on ? C.gold : '#fff'} stroke={on ? C.gold : C.line} strokeWidth={2.5} />
              <text x={x} y={44} textAnchor="middle" fontSize={13} fontWeight={700} fill={on ? C.brand : C.muted}>
                {t.year}
              </text>
              <text x={x} y={104} textAnchor="middle" fontSize={11.5} fill={on ? C.ink : C.muted}>
                {t.title}
              </text>
              <rect x={x - 70} y={114} width={140} height={22} rx={11} fill={on ? C.mintBg : 'transparent'} />
              <text x={x} y={129} textAnchor="middle" fontSize={10.5} fill={C.muted}>
                {on ? '点击查看说明' : ''}
              </text>
            </g>
          )
        })}
      </svg>
      <p className="figure__caption">
        <strong>{TIMELINE[active].year} · {TIMELINE[active].title}：</strong>
        {TIMELINE[active].body}
      </p>
    </div>
  )
}

/* ------------------------------ 3. 线性/构象表位 ------------------------------ */

export function EpitopeTypesVisual() {
  const [denatured, setDenatured] = useState(false)
  return (
    <div className="figure">
      <div className="figure__toolbar">
        <button
          type="button"
          className="btn btn--quiet btn--sm"
          aria-pressed={denatured}
          onClick={() => setDenatured((v) => !v)}
        >
          {denatured ? '恢复天然构象' : '模拟变性处理'}
        </button>
        <span className="xs muted">
          {denatured ? '变性后：线性表位仍在，构象表位消失' : '天然状态：两种表位都可被识别'}
        </span>
      </div>
      <svg viewBox="0 0 760 300" role="img" aria-label="线性表位与构象表位在变性前后的对比示意">
        {/* 线性表位 */}
        <text x={30} y={28} fontSize={13} fontWeight={700} fill={C.brand}>
          线性表位 Linear epitope
        </text>
        <text x={30} y={48} fontSize={11} fill={C.muted}>
          由连续排列的氨基酸残基组成的短肽
        </text>
        <path d="M60 120 H330" stroke={C.line} strokeWidth={3} />
        {Array.from({ length: 9 }).map((_, i) => {
          const x = 60 + i * 33
          const on = i >= 3 && i <= 5
          return <circle key={i} cx={x} cy={120} r={on ? 11 : 7} fill={on ? C.gold : C.mint} stroke={on ? '#8a6a10' : 'none'} strokeWidth={1.2} />
        })}
        <text x={195} y={158} textAnchor="middle" fontSize={11.5} fill={C.gold} fontWeight={700}>
          变性后依然可识别 ✓
        </text>

        {/* 构象表位 */}
        <text x={420} y={28} fontSize={13} fontWeight={700} fill={C.brand}>
          构象表位 Conformational epitope
        </text>
        <text x={420} y={48} fontSize={11} fill={C.muted}>
          序列上不连续、空间上彼此靠近
        </text>
        <path
          d="M430 210 C470 120, 520 230, 560 150 S630 90, 680 170"
          fill="none"
          stroke={denatured ? C.line : C.brandMid}
          strokeWidth={3}
          strokeDasharray={denatured ? '6 6' : undefined}
          style={{ transition: 'all .4s ease' }}
        />
        {Array.from({ length: 7 }).map((_, i) => {
          const folded = [
            [430, 210],
            [470, 130],
            [520, 210],
            [560, 150],
            [600, 120],
            [640, 150],
            [680, 170],
          ]
          const unfolded = Array.from({ length: 7 }, (_, k) => [430 + k * 40, 210])
          const pos = denatured ? unfolded[i] : folded[i]
          const on = i === 3 || i === 4 || i === 5
          return (
            <circle
              key={i}
              cx={pos[0]}
              cy={pos[1]}
              r={on ? 11 : 7}
              fill={on ? (denatured ? '#c9d6d2' : C.blue) : C.mint}
              style={{ transition: 'all .45s ease' }}
            />
          )
        })}
        <text x={560} y={255} textAnchor="middle" fontSize={11.5} fontWeight={700} fill={denatured ? '#b3261e' : C.blue}>
          {denatured ? '折叠被破坏 → 构象表位消失 ✕' : '依赖正确折叠 ✓'}
        </text>

        <text x={30} y={280} fontSize={11} fill={C.muted}>
          识别分工：TCR 识别由 MHC 递呈的线性表位；BCR / 抗体可直接识别构象表位与线性表位。
        </text>
      </svg>
    </div>
  )
}

/* ------------------------------ 4. 病原微生物抗原库 ----------------------------- */

const PATHOGENS = [
  {
    id: 'salmonella',
    kind: '细菌',
    name: '沙门菌',
    en: 'Salmonella',
    note: '课件例举的细菌抗原之一。革兰阴性杆菌，具有 O 抗原（菌体）、H 抗原（鞭毛）等结构成分抗原。',
    glyph: (
      <g>
        <rect x={22} y={34} width={76} height={30} rx={15} fill={C.mintBg} stroke={C.mint} strokeWidth={2} />
        <path d="M22 49 C4 40, 4 58, 22 49" fill="none" stroke={C.gold} strokeWidth={2} />
        <path d="M98 44 C114 34, 114 50, 98 44" fill="none" stroke={C.gold} strokeWidth={2} />
      </g>
    ),
  },
  {
    id: 'strep',
    kind: '细菌',
    name: '链球菌',
    en: 'Streptococcus',
    note: '课件例举的细菌抗原之一。球菌呈链状排列，具有菌体与型特异性抗原成分。',
    glyph: (
      <g>
        {[34, 56, 78, 100].map((cx) => (
          <circle key={cx} cx={cx} cy={49} r={13} fill={C.mintBg} stroke={C.mint} strokeWidth={2} />
        ))}
      </g>
    ),
  },
  {
    id: 'adeno',
    kind: '病毒',
    name: '腺病毒',
    en: 'Adenovirus',
    note: '课件例举的病毒抗原之一。无囊膜、二十面体衣壳，衣壳蛋白是主要抗原成分。',
    glyph: (
      <g>
        <polygon points="60,20 94,40 94,74 60,94 26,74 26,40" fill={C.blueBg} stroke={C.blue} strokeWidth={2} />
        <path d="M60 20 V94 M26 40 L94 74 M94 40 L26 74" stroke={C.blue} strokeWidth={1} opacity={0.45} />
      </g>
    ),
  },
  {
    id: 'rabies',
    kind: '病毒',
    name: '狂犬病毒',
    en: 'Rabies virus',
    note: '课件例举的病毒抗原之一。弹状（子弹形）有囊膜病毒，表面糖蛋白 G 是中和抗体的主要靶点。',
    glyph: (
      <g>
        <path d="M30 30 H86 A18 18 0 0 1 86 68 H30 A10 10 0 0 1 30 30 Z" fill={C.orangeBg} stroke={C.orange} strokeWidth={2} />
        {[38, 52, 66, 80].map((x) => (
          <line key={x} x1={x} y1={30} x2={x} y2={18} stroke={C.orange} strokeWidth={2.4} strokeLinecap="round" />
        ))}
      </g>
    ),
  },
]

export function PathogenBoard() {
  const [filter, setFilter] = useState<'全部' | '细菌' | '病毒'>('全部')
  const [active, setActive] = useState<string | null>(null)
  const list = PATHOGENS.filter((p) => filter === '全部' || p.kind === filter)
  const hit = PATHOGENS.find((p) => p.id === active)

  return (
    <div className="figure">
      <div className="figure__toolbar">
        {(['全部', '细菌', '病毒'] as const).map((f) => (
          <button
            key={f}
            type="button"
            className="btn btn--quiet btn--sm"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
        <span className="xs muted">点击卡片查看抗原成分</span>
      </div>
      <ul className="pathogengrid">
        {list.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              className={`pathogencard ${active === p.id ? 'is-active' : ''}`}
              aria-pressed={active === p.id}
              onClick={() => setActive(active === p.id ? null : p.id)}
            >
              <svg viewBox="0 0 120 100" aria-hidden="true">
                {p.glyph}
              </svg>
              <span className="pathogencard__name">{p.name}</span>
              <span className="pathogencard__en">{p.en}</span>
              <Tag tone={p.kind === '细菌' ? 'mint' : 'blue'}>{p.kind}</Tag>
            </button>
          </li>
        ))}
      </ul>
      {hit ? (
        <p className="figure__caption">
          <strong>
            {hit.name} {hit.en}：
          </strong>
          {hit.note}
        </p>
      ) : (
        <p className="figure__caption muted xs">病毒和细菌都是完整抗原；各结构成分又可分别作为抗原。</p>
      )}
    </div>
  )
}

/* --------------------------- 5. 免疫应答启动（分步动画） -------------------------- */

const BRANCH_STEPS = [
  { title: '抗原进入机体', desc: '完整抗原（细菌/病毒）或疫苗中的抗原成分进入机体，被局部免疫细胞接触。' },
  { title: '抗原被摄取', desc: '抗原递呈细胞（APC）摄取抗原——这是 T 细胞能“看到”抗原的前提。' },
  { title: '加工为肽段', desc: '抗原在细胞内被加工处理，降解为短肽片段。' },
  { title: 'MHC 递呈', desc: '肽段与 MHC 分子结合，被运送到细胞表面呈递——此时呈现的是“线性表位”。' },
  { title: 'TCR 识别', desc: 'T 细胞受识别“MHC—肽段”复合物；这一步决定了 T 细胞应答的特异性。' },
  { title: 'T 细胞活化', desc: '识别成功后 T 细胞活化、增殖，分化为效应 T 细胞，执行细胞免疫。' },
]

export function ResponseBranchVisual() {
  return (
    <StepPlayer
      ariaLabel="抗原诱导 T 细胞应答的分步演示"
      steps={BRANCH_STEPS}
      render={(active) => (
        <svg viewBox="0 0 760 220" role="img" aria-label="抗原经加工与 MHC 递呈后被 T 细胞识别">
          <Defs />
          <rect x={18} y={54} width={724} height={112} rx={16} fill="#f7fbf9" stroke={C.line} />
          <text x={30} y={44} fontSize={11.5} fill={C.muted}>
            抗原递呈细胞（APC）内
          </text>
          {BRANCH_STEPS.map((s, i) => {
            const x = 44 + i * 118
            const on = i === active
            const done = i < active
            return (
              <g key={s.title}>
                <circle
                  cx={x + 30}
                  cy={110}
                  r={26}
                  fill={on ? C.gold : done ? C.mintBg : '#fff'}
                  stroke={on ? C.gold : C.line}
                  strokeWidth={on ? 3 : 1.6}
                />
                <text x={x + 30} y={115} textAnchor="middle" fontSize={13} fontWeight={700} fill={on ? '#2a2200' : C.brand}>
                  {i + 1}
                </text>
                <text x={x + 30} y={158} textAnchor="middle" fontSize={11} fill={on ? C.ink : C.muted}>
                  {s.title}
                </text>
                {i < BRANCH_STEPS.length - 1 ? (
                  <Arrow d={`M${x + 60} 110 H${x + 104}`} active={on} dashed={!done && !on} />
                ) : null}
              </g>
            )
          })}
          <text x={30} y={200} fontSize={11} fill={C.muted}>
            关键：T 细胞看不到“完整抗原”，只能看到被 MHC 递呈的肽段（线性表位）。
          </text>
        </svg>
      )}
    />
  )
}

/* ------------------------- 6. 翻译后修饰与 MHC 呈递（分步） ------------------------ */

const PTM_STEPS = [
  { title: '蛋白合成', desc: '抗原蛋白在细胞内合成，此时尚未发生翻译后修饰。' },
  { title: '翻译后修饰', desc: '如糖基化等修饰被加上：课件指出，修饰可改变表位的空间构象或暴露程度。' },
  { title: '加工成肽段', desc: '修饰后的蛋白被加工为肽段，修饰位点可能落在肽段内，也可能影响切割。' },
  { title: '与 MHC 结合', desc: '不同肽段与 MHC 的亲和力不同，因此“呈递的肽库”会随修饰而改变。' },
  { title: 'T 细胞识别', desc: 'T 细胞看到的“信息集合”随之变化——这解释了修饰如何影响免疫原性。' },
]

export function PtmMhcVisual() {
  return (
    <StepPlayer
      ariaLabel="翻译后修饰影响 MHC 呈递肽库的分步演示"
      steps={PTM_STEPS}
      render={(active) => (
        <svg viewBox="0 0 760 220" role="img" aria-label="翻译后修饰改变 MHC 呈递肽库">
          <Defs />
          <text x={20} y={26} fontSize={12} fill={C.muted}>
            课件要点：超过 200 种翻译后修饰会改变 MHC 分子上呈递的肽库。
          </text>
          {/* 蛋白链 */}
          <path d="M40 100 C90 70, 120 130, 160 100" fill="none" stroke={active >= 0 ? C.brandMid : C.line} strokeWidth={4} />
          {[
            [70, 86],
            [100, 112],
            [130, 92],
          ].map(([cx, cy]) => (
            <circle key={cx} cx={cx} cy={cy} r={7} fill={C.mint} />
          ))}
          {/* 修饰糖链 */}
          <g opacity={active >= 1 ? 1 : 0.25} style={{ transition: 'opacity .35s' }}>
            <line x1={100} y1={104} x2={100} y2={80} stroke={C.orange} strokeWidth={2.4} />
            <circle cx={100} cy={74} r={7} fill={C.orangeBg} stroke={C.orange} strokeWidth={2} />
            <circle cx={112} cy={64} r={5} fill={C.orangeBg} stroke={C.orange} strokeWidth={2} />
            <text x={126} y={60} fontSize={10.5} fill={C.orange}>
              糖基等修饰
            </text>
          </g>

          <Arrow d="M178 100 H236" active={active >= 2} />

          {/* 肽段 */}
          <g opacity={active >= 2 ? 1 : 0.25} style={{ transition: 'opacity .35s' }}>
            {[250, 272, 294, 316].map((cx, i) => (
              <circle key={cx} cx={cx} cy={100} r={8} fill={i === 1 ? C.orange : C.mint} stroke={i === 1 ? C.orange : 'none'} strokeWidth={1.5} />
            ))}
            <text x={250} y={132} fontSize={10.5} fill={C.muted}>
              加工后的肽段
            </text>
          </g>

          <Arrow d="M336 100 H394" active={active >= 3} />

          {/* MHC */}
          <g opacity={active >= 3 ? 1 : 0.25} style={{ transition: 'opacity .35s' }}>
            <path d="M404 88 h96 v14 c0 18 -22 26 -48 26 s-48 -8 -48 -26 z" fill={C.blueBg} stroke={C.blue} strokeWidth={2} />
            <rect x={428} y={80} width={48} height={12} rx={6} fill={C.orange} opacity={0.85} />
            <text x={404} y={150} fontSize={10.5} fill={C.blue}>
              MHC 分子
            </text>
          </g>

          <Arrow d="M512 100 H570" active={active >= 4} />

          {/* T 细胞 */}
          <g opacity={active >= 4 ? 1 : 0.25} style={{ transition: 'opacity .35s' }}>
            <circle cx={630} cy={100} r={44} fill="#f4faf7" stroke={C.brand} strokeWidth={2} />
            <path d="M610 86 q20 -12 40 0" fill="none" stroke={C.brandMid} strokeWidth={2.4} />
            <text x={630} y={106} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.brand}>
              T 细胞
            </text>
            <text x={630} y={124} textAnchor="middle" fontSize={10} fill={C.muted}>
              TCR 识别
            </text>
          </g>
        </svg>
      )}
    />
  )
}

/* --------------------------- 7. 基因工程抗原制备流水线 --------------------------- */

const PIPELINE = [
  { title: '基因设计与克隆', detail: '选定目标抗原（如流感病毒 HA）的关键基因序列，进行设计与克隆。' },
  { title: '构建重组表达载体', detail: '把目标基因装入表达载体，形成可导入宿主细胞的重组分子。' },
  { title: '导入 CHO 细胞', detail: '导入哺乳动物细胞表达系统；真核系统可完成折叠与糖基化等修饰。' },
  { title: '表达与纯化', detail: '收获表达产物并纯化，得到纯度较高的抗原蛋白。' },
  { title: '质量检测 + 佐剂', detail: '检定抗原含量/纯度/完整性；配伍佐剂以增强纯化抗原的免疫原性。' },
]

export function RecombinantPipelineVisual() {
  const [active, setActive] = useState(0)
  return (
    <div className="figure">
      <svg viewBox="0 0 760 150" role="img" aria-label="基因工程抗原制备五步流程">
        <Defs />
        {PIPELINE.map((p, i) => {
          const x = 16 + i * 150
          const on = i === active
          return (
            <g key={p.title} onClick={() => setActive(i)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={40} width={128} height={62} rx={12} fill={on ? C.goldBg : '#f4faf7'} stroke={on ? C.gold : C.line} strokeWidth={on ? 2.4 : 1.4} />
              <text x={x + 64} y={66} textAnchor="middle" fontSize={11.5} fontWeight={700} fill={C.brand}>
                {p.title.length > 8 ? p.title.slice(0, 8) : p.title}
              </text>
              {p.title.length > 8 ? (
                <text x={x + 64} y={84} textAnchor="middle" fontSize={11.5} fontWeight={700} fill={C.brand}>
                  {p.title.slice(8)}
                </text>
              ) : null}
              <text x={x + 64} y={96} textAnchor="middle" fontSize={10} fill={C.muted}>
                第 {i + 1} 步
              </text>
              {i < PIPELINE.length - 1 ? <Arrow d={`M${x + 130} 71 H${x + 148}`} active={on} /> : null}
            </g>
          )
        })}
      </svg>
      <p className="figure__caption">
        <strong>{PIPELINE[active].title}：</strong>
        {PIPELINE[active].detail}
      </p>
    </div>
  )
}

/* --------------------------- 8. 通用小部件：指标条 --------------------------- */

export function FigureNote({ children }: { children: ReactNode }) {
  return <p className="figure__caption xs muted">{children}</p>
}
