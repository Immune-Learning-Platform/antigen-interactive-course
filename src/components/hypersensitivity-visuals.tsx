import { useState } from 'react'
import { Tag } from './ui'
import { StepPlayer } from './StepPlayer'

/* ==========================================================================
   第6章《I型超敏反应》专属图示（原创 SVG）
   依据课件 p1–p19；示意均标注为教学示意。
   ========================================================================== */

const C = {
  ink: '#16211f', muted: '#5a6b67', line: '#c3d2cc', brand: '#0b3b33', brandMid: '#12564c',
  mint: '#8fc9ae', mintBg: '#e8f3ee', gold: '#c9a227', goldBg: '#f7efd6',
  orange: '#e0762f', orangeBg: '#fcebdd', blue: '#1f6fd0', blueBg: '#e7f0fb',
  red: '#b8493f', redBg: '#fbebe9',
}

function Arrow({ d, active }: { d: string; active?: boolean }) {
  return (
    <path d={d} fill="none" stroke={active ? C.gold : C.line} strokeWidth={active ? 2.4 : 1.5} markerEnd={active ? 'url(#hsArrowOn)' : 'url(#hsArrowOff)'} />
  )
}

function Defs() {
  return (
    <defs>
      <marker id="hsArrowOff" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill={C.line} />
      </marker>
      <marker id="hsArrowOn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill={C.gold} />
      </marker>
    </defs>
  )
}

/* --------------------------- 1. 三要素 --------------------------- */

const ELEMENTS = [
  { id: 'allergen', name: '过敏原', sub: '变应原', color: C.red, desc: '药物或酶类物质、吸入性变应原、食物变应原等。是“进来的东西”。' },
  { id: 'ige', name: '变应素', sub: 'IgE 抗体', color: C.brandMid, desc: '由 B 细胞产生，产生依赖 IL-4，具有同种组织细胞亲嗜性。是“认它的抗体”。' },
  { id: 'cell', name: '效应细胞', sub: '肥大细胞 / 嗜碱性粒细胞', color: C.gold, desc: '具有高亲和性 IgE Fc 受体，可释放出生物活性介质。是“执行它的细胞”。' },
]

export function HypersensitivityElements() {
  const [active, setActive] = useState('ige')
  const hit = ELEMENTS.find((e) => e.id === active) ?? ELEMENTS[0]
  return (
    <div className="figure">
      <svg viewBox="0 0 660 210" role="img" aria-label="I型超敏反应的三个要素：过敏原、变应素IgE、效应细胞">
        <Defs />
        {ELEMENTS.map((e, i) => {
          const x = 40 + i * 200
          const on = e.id === active
          return (
            <g key={e.id} onClick={() => setActive(e.id)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={44} width={170} height={96} rx={13} fill={on ? `${e.color}1a` : '#fff'} stroke={on ? e.color : C.line} strokeWidth={on ? 2.8 : 1.4} />
              <text x={x + 85} y={72} textAnchor="middle" fontSize={13} fontWeight={800} fill={e.color}>{e.name}</text>
              <text x={x + 85} y={92} textAnchor="middle" fontSize={9.5} fill={C.ink}>{e.sub}</text>
              <text x={x + 85} y={122} textAnchor="middle" fontSize={8.5} fill={C.muted}>点击查看说明</text>
              {i < ELEMENTS.length - 1 ? <Arrow d={`M${x + 172} 92 H${x + 196}`} active={on} /> : null}
            </g>
          )
        })}
        <text x={330} y={172} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.brand}>
          三者缺一，过敏反应就无法完成
        </text>
        <text x={330} y={194} textAnchor="middle" fontSize={9} fill={C.muted}>
          课件原文：已致敏的机体再次接触相同抗原后，由 IgE 抗体介导、以肥大细胞和嗜碱性粒细胞为主要效应细胞
        </text>
      </svg>
      <div className="figure__toolbar">
        {ELEMENTS.map((e) => (
          <button key={e.id} type="button" className="btn btn--quiet btn--sm" aria-pressed={active === e.id} onClick={() => setActive(e.id)}>
            {e.name}
          </button>
        ))}
      </div>
      <p className="figure__caption">
        <strong>{hit.name}（{hit.sub}）：</strong>{hit.desc}
      </p>
    </div>
  )
}

/* --------------------------- 2. 特征 --------------------------- */

const FEATURES = [
  { id: 'fast', name: '发生迅速', detail: '再次接触过敏原后**数分钟内**发生——这是临床识别的关键线索。', color: C.orange },
  { id: 'vary', name: '个体差异与遗传倾向', detail: '同样的变应原，有的个体发病、有的不发；过敏有明显的品种/个体倾向。', color: C.blue },
  { id: 'func', name: '以生理功能紊乱为主', detail: '主要引起生理功能紊乱，**严重时可发生组织损伤甚至过敏性休克**。', color: C.brandMid },
]

export function HypersensitivityFeatures() {
  const [active, setActive] = useState('fast')
  const hit = FEATURES.find((f) => f.id === active) ?? FEATURES[0]
  return (
    <div className="figure">
      <div className="figure__toolbar">
        {FEATURES.map((f) => (
          <button key={f.id} type="button" className="btn btn--quiet btn--sm" aria-pressed={active === f.id} onClick={() => setActive(f.id)}>
            {f.name}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 620 170" role="img" aria-label="I型超敏反应的三个特征">
        <Defs />
        {/* 时间轴示意 */}
        <line x1={60} y1={96} x2={560} y2={96} stroke={C.line} strokeWidth={2} />
        <circle cx={110} cy={96} r={9} fill={C.orange} />
        <text x={110} y={74} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={C.orange}>接触变应原</text>
        <circle cx={210} cy={96} r={13} fill={active === 'fast' ? C.gold : '#fff'} stroke={C.gold} strokeWidth={2.6} />
        <text x={210} y={128} textAnchor="middle" fontSize={10} fontWeight={700} fill={C.gold}>数分钟内</text>
        <text x={210} y={144} textAnchor="middle" fontSize={8.5} fill={C.muted}>出现症状</text>
        <text x={400} y={82} fontSize={10} fontWeight={700} fill={C.blue}>个体差异 + 遗传倾向</text>
        <text x={400} y={118} fontSize={10} fontWeight={700} fill={C.brandMid}>以生理功能紊乱为主</text>
        <text x={400} y={134} fontSize={8.5} fill={C.muted}>严重时组织损伤 / 过敏性休克</text>
        <text x={310} y={164} textAnchor="middle" fontSize={9} fill={C.muted}>
          注意：24~72 小时才出现的是 IV 型（迟发型），不要与 I 型混淆
        </text>
      </svg>
      <p className="figure__caption">
        <strong>{hit.name}：</strong>
        {hit.detail.replace(/\*\*/g, '')}
      </p>
    </div>
  )
}

/* --------------------------- 3. 两次接触时间轴 --------------------------- */

const TIMELINE = [
  { title: '第 1 次接触', desc: '变应原首次进入体内，机体尚未致敏，通常无症状。' },
  { title: '产生 IgE', desc: 'APC 摄取变应原 → MHC II 递呈给 Th2 → Th2 分泌 IL-4 → B 细胞产生 IgE。' },
  { title: '致敏（装弹）', desc: 'IgE 的 Fc 段与效应细胞表面 FcεRI 结合。此时仍无症状——弹药已装好。' },
  { title: '第 2 次接触', desc: '同一变应原再次进入，与细胞上 IgE 的 Fab 段结合。' },
  { title: '激发（开火）', desc: 'IgE 交联 → Fc 段变构 → 激活细胞产生刺激信号。' },
  { title: '效应（症状）', desc: '脱颗粒释放组胺等 → 毛细血管扩张、通透性增强、腺体分泌增加。' },
]

export function HypersensitivityTimeline() {
  return (
    <StepPlayer
      ariaLabel="I型超敏反应两次接触过程的分步演示"
      steps={TIMELINE.map((t) => ({ title: t.title, desc: t.desc }))}
      baseMs={3000}
      render={(active) => (
        <svg viewBox="0 0 640 190" role="img" aria-label="I型超敏反应的两次接触：首次致敏，再次激发并产生症状">
          <Defs />
          <line x1={40} y1={86} x2={600} y2={86} stroke={C.line} strokeWidth={2} />
          {/* 阶段分隔：致敏区与激发区 */}
          <rect x={30} y={40} width={290} height={30} rx={8} fill={C.mintBg} />
          <text x={175} y={60} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={C.brandMid}>首次接触 → 致敏（无症状）</text>
          <rect x={330} y={40} width={280} height={30} rx={8} fill={C.orangeBg} />
          <text x={470} y={60} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={C.orange}>再次接触 → 激发与效应（有症状）</text>

          {TIMELINE.map((t, i) => {
            const x = 60 + i * 96
            const on = i === active
            const inSens = i <= 2
            return (
              <g key={t.title}>
                <circle cx={x} cy={86} r={on ? 12 : 7} fill={on ? C.gold : '#fff'} stroke={on ? C.gold : inSens ? C.mint : C.orange} strokeWidth={2.2} />
                <text x={x} y={78} textAnchor="middle" fontSize={8} fill={C.muted}>{i + 1}</text>
                <text x={x} y={118} textAnchor="middle" fontSize={8} fontWeight={on ? 800 : 500} fill={on ? C.brand : C.muted}>
                  {t.title.length > 4 ? t.title.slice(0, 4) : t.title}
                </text>
                {t.title.length > 4 ? (
                  <text x={x} y={130} textAnchor="middle" fontSize={8} fontWeight={on ? 800 : 500} fill={on ? C.brand : C.muted}>
                    {t.title.slice(4)}
                  </text>
                ) : null}
              </g>
            )
          })}
          <text x={320} y={170} textAnchor="middle" fontSize={9} fill={C.muted}>
            关键：致敏用 Fc 段（装到细胞上），激发用 Fab 段（认出抗原）
          </text>
        </svg>
      )}
    />
  )
}

/* --------------------------- 4. IgE 产生 --------------------------- */

const IGE_STEPS = [
  { title: '摄取变应原', desc: '抗原递呈细胞摄取变应原。' },
  { title: '加工处理', desc: '变应原在细胞内被加工处理。' },
  { title: 'MHC II 递呈', desc: '经 MHC II 递呈给 Th2 细胞——因为变应原属外源性抗原，走 MHC II 路线。' },
  { title: 'Th2 分泌 IL-4', desc: 'Th2 细胞分泌 IL-4，并为 B 细胞活化提供第二信号。' },
  { title: 'B 细胞产生 IgE', desc: '在 IL-4 与第二信号共同作用下，B 细胞产生 IgE 抗体。' },
]

export function IgeProduction() {
  return (
    <StepPlayer
      ariaLabel="IgE 抗体产生过程的分步演示"
      steps={IGE_STEPS.map((s) => ({ title: s.title, desc: s.desc }))}
      render={(active) => (
        <svg viewBox="0 0 640 170" role="img" aria-label="变应原经MHC II递呈给Th2、IL-4促使B细胞产生IgE">
          <Defs />
          {[
            { label: '变应原', x: 30, color: C.red },
            { label: 'APC', x: 150, color: C.mint },
            { label: 'Th2 细胞', x: 280, color: C.blue },
            { label: 'B 细胞', x: 420, color: C.brandMid },
            { label: 'IgE', x: 545, color: C.gold },
          ].map((n, i) => {
            const on = i === Math.min(active + (active >= 4 ? 1 : 0), 4)
            return (
              <g key={n.label}>
                <circle cx={n.x + 30} cy={78} r={30} fill={`${n.color}1f`} stroke={n.color} strokeWidth={on ? 2.8 : 1.6} />
                <text x={n.x + 30} y={82} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={n.color}>{n.label}</text>
                {i < 4 ? <Arrow d={`M${n.x + 62} 78 H${n.x + 86}`} active={i <= active} /> : null}
              </g>
            )
          })}
          <text x={310} y={52} textAnchor="middle" fontSize={8.5} fill={C.muted}>MHC II 递呈</text>
          <text x={400} y={52} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={C.gold}>IL-4 + 第二信号</text>
          <text x={320} y={136} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={C.brand}>
            {IGE_STEPS[Math.min(active, 4)].title}
          </text>
          <text x={320} y={154} textAnchor="middle" fontSize={8.5} fill={C.muted}>
            变应原属外源性抗原 → 走 MHC II 路线 → 激活 CD4⁺ T 并分化为 Th2
          </text>
        </svg>
      )}
    />
  )
}

/* --------------------------- 5. 致敏 vs 激发 --------------------------- */

export function SensitizationTrigger() {
  const [mode, setMode] = useState<'sens' | 'trig'>('sens')
  const isSens = mode === 'sens'
  return (
    <div className="figure">
      <div className="figure__toolbar">
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={isSens} onClick={() => setMode('sens')}>
          致敏阶段（装弹）
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={!isSens} onClick={() => setMode('trig')}>
          激发阶段（开火）
        </button>
      </div>
      <svg viewBox="0 0 620 210" role="img" aria-label={isSens ? '致敏阶段：IgE的Fc段与FcεRI结合' : '激发阶段：变应原与IgE的Fab段结合、IgE交联'}>
        <Defs />
        {/* 细胞膜 */}
        <line x1={40} y1={150} x2={300} y2={150} stroke={C.brandMid} strokeWidth={7} />
        <text x={170} y={176} textAnchor="middle" fontSize={9} fill={C.brandMid}>效应细胞膜</text>

        {/* 受体 */}
        <rect x={150} y={118} width={14} height={34} rx={4} fill={C.brandMid} />
        <text x={157} y={108} textAnchor="middle" fontSize={8} fill={C.brandMid}>FcεRI</text>

        {/* IgE */}
        <g opacity={1}>
          {/* Fc 段：贴受体 */}
          <rect x={152} y={64} width={10} height={54} rx={4} fill={isSens ? C.mint : C.mint} opacity={isSens ? 1 : 0.85} />
          <text x={97} y={92} textAnchor="middle" fontSize={8} fontWeight={700} fill={C.brandMid}>Fc 段</text>
          {/* Fab 两臂 */}
          <path d="M157 64 L130 32" stroke={C.mint} strokeWidth={8} strokeLinecap="round" />
          <path d="M157 64 L184 32" stroke={C.mint} strokeWidth={8} strokeLinecap="round" />
          <text x={214} y={56} fontSize={8} fontWeight={700} fill={C.brandMid}>Fab 段</text>
        </g>

        {/* 变应原（仅激发阶段） */}
        {!isSens ? (
          <g>
            <circle cx={124} cy={22} r={13} fill={C.redBg} stroke={C.red} strokeWidth={2} />
            <circle cx={190} cy={22} r={13} fill={C.redBg} stroke={C.red} strokeWidth={2} />
            <text x={157} y={8} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={C.red}>变应原（再次进入）</text>
            {/* 交联虚线 */}
            <line x1={124} y1={35} x2={130} y2={32} stroke={C.gold} strokeWidth={2.4} strokeDasharray="4 3" />
            <line x1={190} y1={35} x2={184} y2={32} stroke={C.gold} strokeWidth={2.4} strokeDasharray="4 3" />
            <text x={157} y={196} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.gold}>IgE 交联 → Fc 段变构 → 激活细胞</text>
          </g>
        ) : (
          <text x={157} y={196} textAnchor="middle" fontSize={9} fill={C.muted}>
            IgE Fc 段与 FcεRI 结合 —— 此时变应原尚未参与，机体已致敏但无症状
          </text>
        )}

        {/* 右侧说明 */}
        <rect x={330} y={44} width={270} height={130} rx={12} fill={isSens ? C.mintBg : C.goldBg} stroke={isSens ? C.brandMid : C.gold} strokeWidth={2} />
        <text x={465} y={70} textAnchor="middle" fontSize={11} fontWeight={800} fill={isSens ? C.brandMid : C.gold}>
          {isSens ? '致敏阶段' : '激发阶段'}
        </text>
        <foreignObject x={345} y={80} width={240} height={88}>
          <div style={{ fontSize: 9, lineHeight: 1.6, color: '#35443f' }}>
            {isSens
              ? 'IgE 的 Fc 段与效应细胞表面的 FcεRI 受体结合，机体处于致敏状态。此时尚无任何症状——只是“装好了弹药”。'
              : '变应原再次进入，与 IgE 的 Fab 段结合；IgE 交联引起 Fc 段变构，激活细胞产生刺激信号，随后脱颗粒释放介质。'}
          </div>
        </foreignObject>
      </svg>
      <p className="figure__caption">
        <strong>记忆锚点：</strong>Fc 段负责“装到细胞上”，Fab 段负责“认出抗原”——同一抗体、两个部位、两种作用。
      </p>
    </div>
  )
}

/* --------------------------- 6. 介质效应 --------------------------- */

const MEDIATORS = [
  { id: 'dilate', name: '毛细血管扩张', sign: '局部发红、发热', desc: '皮肤红斑的形成原因。', color: C.red },
  { id: 'perme', name: '通透性增强', sign: '血浆渗出、组织水肿', desc: '面部肿胀、皮下水肿的形成原因。', color: C.blue },
  { id: 'secrete', name: '腺体分泌增加', sign: '流涕、流泪、分泌物增多', desc: '呼吸道与眼部症状的来源。', color: C.brandMid },
]

export function MediatorEffects() {
  const [active, setActive] = useState('dilate')
  const hit = MEDIATORS.find((m) => m.id === active) ?? MEDIATORS[0]
  return (
    <div className="figure">
      <svg viewBox="0 0 620 200" role="img" aria-label="组胺等介质引起毛细血管扩张、通透性增强、腺体分泌增加">
        <Defs />
        {/* 肥大细胞脱颗粒 */}
        <circle cx={90} cy={100} r={40} fill={C.mintBg} stroke={C.brandMid} strokeWidth={2.2} />
        <text x={90} y={96} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.brandMid}>肥大细胞</text>
        <text x={90} y={112} textAnchor="middle" fontSize={8} fill={C.muted}>脱颗粒</text>
        {[40, 0, -40].map((dy, i) => (
          <circle key={i} cx={140 + i * 6} cy={100 + dy} r={5} fill={C.orange} />
        ))}
        <text x={148} y={60} fontSize={8.5} fontWeight={700} fill={C.orange}>组胺等</text>

        {MEDIATORS.map((m, i) => {
          const y = 40 + i * 52
          const on = m.id === active
          return (
            <g key={m.id} onClick={() => setActive(m.id)} style={{ cursor: 'pointer' }}>
              <Arrow d={`M198 100 C240 100, 240 ${y}, 270 ${y}`} active={on} />
              <rect x={272} y={y - 18} width={320} height={38} rx={9} fill={on ? `${m.color}1f` : '#fff'} stroke={on ? m.color : C.line} strokeWidth={on ? 2.6 : 1.3} />
              <text x={286} y={y - 2} fontSize={9.5} fontWeight={on ? 800 : 600} fill={on ? m.color : C.ink}>{m.name}</text>
              <text x={286} y={y + 12} fontSize={8.5} fill={C.muted}>→ {m.sign}</text>
            </g>
          )
        })}
        <text x={310} y={192} textAnchor="middle" fontSize={9} fill={C.muted}>
          课件原文：组胺等引起毛细血管扩张、通透性增强、腺体分泌增加
        </text>
      </svg>
      <div className="figure__toolbar">
        {MEDIATORS.map((m) => (
          <button key={m.id} type="button" className="btn btn--quiet btn--sm" aria-pressed={active === m.id} onClick={() => setActive(m.id)}>
            {m.name}
          </button>
        ))}
      </div>
      <p className="figure__caption">
        <strong>{hit.name}（{hit.sign}）：</strong>{hit.desc}
      </p>
    </div>
  )
}

/* --------------------------- 7. IgE 双重角色 --------------------------- */

export function IgeDualRole() {
  const [mode, setMode] = useState<'parasite' | 'allergen'>('parasite')
  return (
    <div className="figure">
      <div className="figure__toolbar">
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={mode === 'parasite'} onClick={() => setMode('parasite')}>
          遇到寄生虫（保护）
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={mode === 'allergen'} onClick={() => setMode('allergen')}>
          遇到花粉尘螨（烦恼）
        </button>
      </div>
      <svg viewBox="0 0 620 190" role="img" aria-label="同一套IgE—肥大细胞机制在抗寄生虫时是保护、在无害变应原时成为过敏">
        <Defs />
        <circle cx={100} cy={92} r={44} fill={C.mintBg} stroke={C.brandMid} strokeWidth={2.2} />
        <text x={100} y={88} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.brandMid}>肥大细胞</text>
        <text x={100} y={104} textAnchor="middle" fontSize={8} fill={C.muted}>已被 IgE 致敏</text>

        <Arrow d="M152 92 H214" active />

        <circle cx={262} cy={92} r={26} fill={mode === 'parasite' ? C.blueBg : C.orangeBg} stroke={mode === 'parasite' ? C.blue : C.orange} strokeWidth={2.2} />
        <text x={262} y={96} textAnchor="middle" fontSize={8.5} fill={mode === 'parasite' ? C.blue : C.orange}>
          {mode === 'parasite' ? '血吸虫' : '花粉/尘螨'}
        </text>

        <Arrow d="M294 92 H356" active />

        <rect x={358} y={mode === 'parasite' ? 56 : 56} width={240} height={72} rx={12} fill={mode === 'parasite' ? C.mintBg : C.orangeBg} stroke={mode === 'parasite' ? C.brandMid : C.orange} strokeWidth={2.2} />
        <text x={478} y={80} textAnchor="middle" fontSize={11} fontWeight={800} fill={mode === 'parasite' ? C.brandMid : C.orange}>
          {mode === 'parasite' ? '保护作用' : '过敏反应'}
        </text>
        <foreignObject x={370} y={86} width={216} height={40}>
          <div style={{ fontSize: 8.5, lineHeight: 1.5, color: '#35443f' }}>
            {mode === 'parasite'
              ? '课件：IgE 抗体在抵抗血吸虫的感染中发挥重要作用。'
              : '同一机制遇到无害变应原 → 生理功能紊乱，成为“烦恼”。'}
          </div>
        </foreignObject>

        <text x={310} y={158} textAnchor="middle" fontSize={10} fontWeight={700} fill={C.brand}>
          {mode === 'parasite' ? '机制本身没错——它是在防御真正的敌人' : '机制本身没错——只是对象错了'}
        </text>
        <text x={310} y={178} textAnchor="middle" fontSize={9} fill={C.muted}>
          这就是“免疫有度，平衡为要”：治疗应是调控，而不是消灭整个系统。
        </text>
      </svg>
      <p className="figure__caption">
        {mode === 'parasite'
          ? 'IgE 与肥大细胞在抗寄生虫防御中有明确价值——这也解释了为什么它没有被进化淘汰。'
          : '同一套机制遇到无害变应原时，产生的是没有保护意义的反应，即过敏。'}
      </p>
    </div>
  )
}

/* --------------------------- 8. 三类防治策略 --------------------------- */

const STRATEGIES = [
  { id: 'avoid', name: '查明并避免', layer: '第 1 层', color: C.mint, points: ['变应原皮试：查明变应原', '避免接触（环境管理、食物调整）', '不改变机体，只改变接触'], note: '最基础也最安全，但执行难度最大。' },
  { id: 'desens', name: '脱敏治疗', layer: '第 2 层', color: C.gold, points: ['反复接触逐渐增加剂量的过敏原提取物', '调节 IgE 和 IgG 抗体生成', '使机体产生耐受性', '异种血清脱敏：短期、小剂量、多次注射', '特异性脱敏：小剂量、多次、5~7 天长间隔皮下注射'], note: '改变免疫应答方式，需要长期坚持。' },
  { id: 'target', name: '特异性免疫治疗', layer: '第 3 层', color: C.blue, points: ['中和变应原：抗 Fel d 1 IgY', '中和 IgE：奥马珠单抗', '阻断 IL-5：美泊利珠单抗（“断粮战术”）', '抑制 IL-4/IL-13：杜普利尤单抗'], note: '直接阻断关键分子，起效快、针对性强，通常需持续给药。' },
]

export function ManagementStrategies() {
  const [active, setActive] = useState('desens')
  const hit = STRATEGIES.find((s) => s.id === active) ?? STRATEGIES[0]
  return (
    <div className="figure">
      <svg viewBox="0 0 620 130" role="img" aria-label="三类防治策略的作用层次：避免、脱敏、靶向治疗">
        <Defs />
        {STRATEGIES.map((s, i) => {
          const x = 30 + i * 196
          const on = s.id === active
          const h = 46 + i * 16
          return (
            <g key={s.id} onClick={() => setActive(s.id)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={110 - h} width={176} height={h} rx={9} fill={on ? `${s.color}33` : '#fff'} stroke={on ? s.color : C.line} strokeWidth={on ? 2.8 : 1.4} />
              <text x={x + 88} y={110 - h + 20} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.muted}>{s.layer}</text>
              <text x={x + 88} y={110 - h + 38} textAnchor="middle" fontSize={10.5} fontWeight={on ? 800 : 600} fill={on ? s.color : C.ink}>{s.name}</text>
              {i < STRATEGIES.length - 1 ? <Arrow d={`M${x + 178} ${110 - h / 2} H${x + 192}`} active={on} /> : null}
            </g>
          )
        })}
        <text x={310} y={126} textAnchor="middle" fontSize={8.5} fill={C.muted}>作用层次逐渐深入 →</text>
      </svg>
      <div className="figure__toolbar">
        {STRATEGIES.map((s) => (
          <button key={s.id} type="button" className="btn btn--quiet btn--sm" aria-pressed={active === s.id} onClick={() => setActive(s.id)}>
            {s.name}
          </button>
        ))}
      </div>
      <div className="card card--flat" style={{ marginTop: 6 }}>
        <div className="row row--between">
          <strong>{hit.name}</strong>
          <Tag tone={hit.id === 'avoid' ? 'mint' : hit.id === 'desens' ? 'gold' : 'blue'}>{hit.layer}</Tag>
        </div>
        <ul className="checklist" style={{ marginTop: 8 }}>
          {hit.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p className="xs muted" style={{ marginTop: 6 }}>{hit.note}</p>
      </div>
    </div>
  )
}

/* --------------------------- 9. 脱敏治疗 --------------------------- */

const DESENS_STEPS = [
  { title: '低剂量开始', desc: '以很小的剂量开始接触过敏原提取物，避免诱发严重反应。' },
  { title: '逐渐增加', desc: '在机体可耐受的范围内逐步增加剂量——这是建立耐受的关键。' },
  { title: '长间隔重复', desc: '课件：特异性脱敏为小剂量、多次、长间隔（5~7 天）皮下注射。' },
  { title: '调节抗体生成', desc: '调节 IgE 和 IgG 抗体生成，影响免疫效应细胞。' },
  { title: '建立耐受', desc: '使机体对过敏原产生耐受性，从而控制或减轻过敏症状。' },
]

export function Desensitization() {
  return (
    <StepPlayer
      ariaLabel="脱敏治疗建立免疫耐受的分步演示"
      steps={DESENS_STEPS.map((s) => ({ title: s.title, desc: s.desc }))}
      render={(active) => (
        <svg viewBox="0 0 620 180" role="img" aria-label="脱敏治疗：低剂量开始、逐渐增加、长间隔重复、建立耐受">
          <Defs />
          {/* 剂量阶梯 */}
          {DESENS_STEPS.map((s, i) => {
            const x = 40 + i * 112
            const h = 26 + i * 20
            const on = i === active
            const done = i < active
            return (
              <g key={s.title}>
                <rect x={x} y={128 - h} width={78} height={h} rx={7} fill={on ? C.gold : done ? C.mint : '#eef2f0'} stroke={on ? '#8a6a10' : C.line} strokeWidth={on ? 2.4 : 1.2} />
                <text x={x + 39} y={128 - h - 6} textAnchor="middle" fontSize={8} fill={on ? C.gold : C.muted}>
                  {i + 1}
                </text>
                {i < DESENS_STEPS.length - 1 ? <Arrow d={`M${x + 80} ${128 - h + 6} H${x + 110}`} active={on} /> : null}
              </g>
            )
          })}
          <line x1={30} y1={128} x2={600} y2={128} stroke={C.line} strokeWidth={2} />
          <text x={310} y={150} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={C.brand}>
            {DESENS_STEPS[Math.min(active, 4)].title}
          </text>
          <text x={310} y={168} textAnchor="middle" fontSize={8.5} fill={C.muted}>
            剂量必须“逐渐增加”：一步给足会诱发严重反应——这就是脱敏治疗需要耐心的原因
          </text>
        </svg>
      )}
    />
  )
}

/* --------------------------- 10. 靶向治疗靶点 --------------------------- */

const TARGETS = [
  { id: 'ige', name: '奥马珠单抗', target: 'IgE', color: C.gold, desc: '人源化单克隆抗体，特异性结合血清中的 IgE，从而阻止后续的过敏反应。课件称 IgE 为过敏反应的“第一警报器”。' },
  { id: 'il5', name: '美泊利珠单抗', target: 'IL-5', color: C.blue, desc: 'IL-5 指挥骨髓生产更多嗜酸性粒细胞。该抗体以高亲和力结合 IL-5，阻碍其与 IL-5Rα 连接，通过“断粮战术”让嗜酸性粒细胞得不到增援，减少肺部炎症。' },
  { id: 'il4', name: '杜普利尤单抗', target: 'IL-4 / IL-13', color: C.brandMid, desc: 'IL-4 和 IL-13 负责指挥 Th2 免疫反应，促使 B 细胞产生更多 IgE，同时让皮肤屏障变差。该抗体通过抑制这两种细胞因子迅速缓解过敏症状。' },
]

export function TargetedTherapy() {
  const [active, setActive] = useState('ige')
  const hit = TARGETS.find((t) => t.id === active) ?? TARGETS[0]
  return (
    <div className="figure">
      <svg viewBox="0 0 620 150" role="img" aria-label="靶向治疗的三个靶点：IgE、IL-5、IL-4与IL-13">
        <Defs />
        {/* 机制链 */}
        <rect x={20} y={44} width={116} height={52} rx={9} fill={C.mintBg} stroke={C.brandMid} strokeWidth={1.8} />
        <text x={78} y={66} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.brandMid}>变应原</text>
        <text x={78} y={82} textAnchor="middle" fontSize={8} fill={C.muted}>→ Th2 → IgE</text>

        <Arrow d="M138 70 H176" active />
        <rect x={178} y={44} width={112} height={52} rx={9} fill={active === 'ige' ? C.goldBg : '#fff'} stroke={active === 'ige' ? C.gold : C.line} strokeWidth={active === 'ige' ? 2.6 : 1.3} />
        <text x={234} y={66} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.gold}>IgE</text>
        <text x={234} y={82} textAnchor="middle" fontSize={8} fill={C.muted}>结合 FcεRI</text>

        <Arrow d="M292 70 H330" active />
        <rect x={332} y={44} width={122} height={52} rx={9} fill={C.mintBg} stroke={C.brandMid} strokeWidth={1.8} />
        <text x={393} y={66} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.brandMid}>肥大细胞</text>
        <text x={393} y={82} textAnchor="middle" fontSize={8} fill={C.muted}>脱颗粒</text>

        <Arrow d="M456 70 H494" active />
        <rect x={496} y={44} width={108} height={52} rx={9} fill={C.orangeBg} stroke={C.orange} strokeWidth={1.8} />
        <text x={550} y={66} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.orange}>症状</text>
        <text x={550} y={82} textAnchor="middle" fontSize={8} fill={C.muted}>炎症 / 瘙痒</text>

        {/* 靶点标注 */}
        <text x={310} y={26} textAnchor="middle" fontSize={8.5} fill={C.muted}>
          靶向药物作用在这个链条的不同环节
        </text>
        <text x={310} y={124} textAnchor="middle" fontSize={8.5} fill={C.muted}>
          IL-5 / IL-4 / IL-13 作用于 Th2 与嗜酸性粒细胞环节，不在此链条图示范围内
        </text>
      </svg>
      <div className="figure__toolbar">
        {TARGETS.map((t) => (
          <button key={t.id} type="button" className="btn btn--quiet btn--sm" aria-pressed={active === t.id} onClick={() => setActive(t.id)}>
            {t.name}
          </button>
        ))}
      </div>
      <div className="card card--flat" style={{ marginTop: 6 }}>
        <div className="row row--between">
          <strong>{hit.name}</strong>
          <Tag tone={hit.id === 'ige' ? 'gold' : hit.id === 'il5' ? 'blue' : 'mint'}>靶点：{hit.target}</Tag>
        </div>
        <p className="small" style={{ marginTop: 8 }}>{hit.desc}</p>
      </div>
      <p className="xs muted">课件所列生物制剂仅用于说明作用靶点与机制，不构成用药建议。</p>
    </div>
  )
}
