import { useState } from 'react'
import { Tag } from './ui'
import { StepPlayer } from './StepPlayer'

/* ==========================================================================
   第7章《免疫层析试纸条技术》专属图示（原创 SVG）
   依据课件第 5—15 页；示意均标注为教学示意。
   ========================================================================== */

const C = {
  ink: '#16211f', muted: '#5a6b67', line: '#c3d2cc', brand: '#0b3b33', brandMid: '#12564c',
  mint: '#8fc9ae', mintBg: '#e8f3ee', gold: '#c9a227', goldBg: '#f7efd6',
  orange: '#e0762f', orangeBg: '#fcebdd', blue: '#1f6fd0', blueBg: '#e7f0fb',
  red: '#b8493f', redBg: '#fbebe9',
}

function Arrow({ d, active }: { d: string; active?: boolean }) {
  return (
    <path d={d} fill="none" stroke={active ? C.gold : C.line} strokeWidth={active ? 2.4 : 1.5} markerEnd={active ? 'url(#lfArrowOn)' : 'url(#lfArrowOff)'} />
  )
}

function Defs() {
  return (
    <defs>
      <marker id="lfArrowOff" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill={C.line} />
      </marker>
      <marker id="lfArrowOn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill={C.gold} />
      </marker>
    </defs>
  )
}

/* --------------------------- 1. 概念三要素 --------------------------- */

const CONCEPT = [
  { id: 'label', name: '标记物', sub: '胶体金 / 量子点 / 荧光微球', color: C.gold, desc: '与抗原或抗体结合，负责把“结合事件”变成可见的颜色或荧光信号。' },
  { id: 'capillary', name: '毛细作用', sub: '微孔膜毛细管作用', color: C.blue, desc: '驱动样品沿试纸条迁移——不需要泵与电源，这是“便携”的物理基础。' },
  { id: 'signal', name: '检测区域信号', sub: 'T 线 / C 线', color: C.brandMid, desc: '在检测区域产生颜色或荧光信号，实现对待测抗原或抗体的快速检测。' },
]

export function LfaConcept() {
  const [active, setActive] = useState('label')
  const hit = CONCEPT.find((c) => c.id === active) ?? CONCEPT[0]
  return (
    <div className="figure">
      <svg viewBox="0 0 640 190" role="img" aria-label="免疫层析试纸条的三个技术要素：标记物、毛细作用、检测区域信号">
        <Defs />
        {CONCEPT.map((c, i) => {
          const x = 40 + i * 200
          const on = c.id === active
          return (
            <g key={c.id} onClick={() => setActive(c.id)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={40} width={176} height={88} rx={12} fill={on ? `${c.color}1a` : '#fff'} stroke={on ? c.color : C.line} strokeWidth={on ? 2.8 : 1.4} />
              <text x={x + 88} y={66} textAnchor="middle" fontSize={12.5} fontWeight={800} fill={c.color}>{c.name}</text>
              <text x={x + 88} y={86} textAnchor="middle" fontSize={8.5} fill={C.ink}>{c.sub}</text>
              <text x={x + 88} y={110} textAnchor="middle" fontSize={8} fill={C.muted}>点击查看说明</text>
              {i < CONCEPT.length - 1 ? <Arrow d={`M${x + 178} 84 H${x + 196}`} active={on} /> : null}
            </g>
          )
        })}
        <text x={320} y={158} textAnchor="middle" fontSize={10} fontWeight={700} fill={C.brand}>
          三个要素缺一不可
        </text>
        <text x={320} y={178} textAnchor="middle" fontSize={8.5} fill={C.muted}>
          课件原文：以胶体金、量子点、荧光微球等作为标记物，利用毛细作用使样品沿试纸条迁移，通过检测区域产生的颜色或荧光信号实现快速检测
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
        <strong>{c0(hit)}</strong>{hit.desc}
      </p>
    </div>
  )
}
function c0(c: { name: string; sub: string }) {
  return `${c.name}（${c.sub}）：`
}

/* --------------------------- 2. 试纸条结构 --------------------------- */

const SEGMENTS = [
  { id: 'sample', name: '样品垫', x: 40, w: 110, color: '#d9efe4', desc: '滴样处。样品从这里进入试纸条。' },
  { id: 'conjugate', name: '结合垫（金垫）', x: 150, w: 110, color: C.goldBg, desc: '预先干燥固定金标抗体或金标抗原；液体流经时被重新润湿释放。' },
  { id: 'nc', name: 'NC 膜', x: 260, w: 240, color: '#fbfdfc', desc: '硝酸纤维素膜，载体；T 线与 C 线固定在其上。' },
  { id: 'absorbent', name: '吸水垫', x: 500, w: 100, color: '#dfe7e3', desc: '在末端抽水，维持毛细流动持续向前。' },
]

export function LfaStructure() {
  const [active, setActive] = useState('nc')
  const hit = SEGMENTS.find((s) => s.id === active) ?? SEGMENTS[2]
  return (
    <div className="figure">
      <svg viewBox="0 0 640 190" role="img" aria-label="试纸条结构：样品垫、结合垫、NC膜（含T线与C线）、吸水垫，液体朝吸水垫方向流动">
        <Defs />
        {/* 底板 */}
        <rect x={34} y={72} width={572} height={54} rx={6} fill="#e6dccb" stroke={C.line} />
        {SEGMENTS.map((s) => {
          const on = s.id === active
          return (
            <g key={s.id} onClick={() => setActive(s.id)} style={{ cursor: 'pointer' }}>
              <rect
                x={s.x}
                y={64}
                width={s.w}
                height={44}
                rx={4}
                fill={s.color}
                stroke={on ? C.brand : C.line}
                strokeWidth={on ? 2.8 : 1.2}
              />
              <text x={s.x + s.w / 2} y={90} textAnchor="middle" fontSize={s.id === 'conjugate' ? 7.5 : 8.5} fontWeight={on ? 800 : 600} fill={C.ink}>
                {s.name.length > 7 ? s.name.slice(0, 7) : s.name}
              </text>
              {s.name.length > 7 ? (
                <text x={s.x + s.w / 2} y={101} textAnchor="middle" fontSize={7.5} fontWeight={on ? 800 : 600} fill={C.ink}>
                  {s.name.slice(7)}
                </text>
              ) : null}
            </g>
          )
        })}
        {/* T / C 线 */}
        <rect x={330} y={64} width={9} height={44} fill={C.red} />
        <text x={334} y={58} textAnchor="middle" fontSize={8.5} fontWeight={800} fill={C.red}>T</text>
        <rect x={430} y={64} width={9} height={44} fill={C.brandMid} />
        <text x={434} y={58} textAnchor="middle" fontSize={8.5} fontWeight={800} fill={C.brandMid}>C</text>

        {/* 流动方向 */}
        <path d="M46 132 H590" stroke={C.blue} strokeWidth={2} markerEnd="url(#lfArrowOn)" strokeDasharray="7 5" />
        <text x={318} y={148} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.blue}>液体流动方向（毛细作用驱动）</text>
        <text x={318} y={172} textAnchor="middle" fontSize={8.5} fill={C.muted}>
          注意 T 线在 C 线之前——被 T 线拦截后剩下的才到 C 线
        </text>
      </svg>
      <div className="figure__toolbar">
        {SEGMENTS.map((s) => (
          <button key={s.id} type="button" className="btn btn--quiet btn--sm" aria-pressed={active === s.id} onClick={() => setActive(s.id)}>
            {s.name}
          </button>
        ))}
      </div>
      <p className="figure__caption">
        <strong>{hit.name}：</strong>{hit.desc}
      </p>
    </div>
  )
}

/* --------------------------- 3. 三环节 --------------------------- */

const THREE_STEPS = [
  { title: '毛细作用驱动', question: '样品怎样向前移动？', color: C.blue },
  { title: '特异识别', question: '为什么能检测目标物？', color: C.brandMid },
  { title: '信号显现', question: '为什么能用肉眼看到？', color: C.gold },
]

export function LfaThreeSteps() {
  const [active, setActive] = useState(0)
  return (
    <div className="figure">
      <svg viewBox="0 0 640 180" role="img" aria-label="免疫层析的三个环节及各自解决的问题">
        <Defs />
        {THREE_STEPS.map((s, i) => {
          const x = 40 + i * 200
          const on = i === active
          return (
            <g key={s.title} onClick={() => setActive(i)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={44} width={176} height={92} rx={12} fill={on ? `${s.color}1a` : '#fff'} stroke={on ? s.color : C.line} strokeWidth={on ? 2.8 : 1.4} />
              <circle cx={x + 88} cy={72} r={16} fill={on ? s.color : '#eef2f0'} />
              <text x={x + 88} y={77} textAnchor="middle" fontSize={12} fontWeight={800} fill={on ? '#fff' : C.muted}>{i + 1}</text>
              <text x={x + 88} y={104} textAnchor="middle" fontSize={11} fontWeight={on ? 800 : 600} fill={on ? s.color : C.ink}>{s.title}</text>
              <text x={x + 88} y={124} textAnchor="middle" fontSize={8.5} fill={C.muted}>{s.question}</text>
              {i < THREE_STEPS.length - 1 ? <Arrow d={`M${x + 178} 90 H${x + 196}`} active={on} /> : null}
            </g>
          )
        })}
        <text x={320} y={160} textAnchor="middle" fontSize={10} fontWeight={700} fill={C.brand}>
          流动 → 识别 → 显色：把分子事件转成肉眼可见的结果
        </text>
        <text x={320} y={176} textAnchor="middle" fontSize={8.5} fill={C.muted}>
          不流动就接触不到，不特异就认错，不显色就看不到
        </text>
      </svg>
      <div className="figure__toolbar">
        {THREE_STEPS.map((s, i) => (
          <button key={s.title} type="button" className="btn btn--quiet btn--sm" aria-pressed={active === i} onClick={() => setActive(i)}>
            {s.title}
          </button>
        ))}
      </div>
      <p className="figure__caption">
        <strong>{THREE_STEPS[active].title}：</strong>它解决的是「{THREE_STEPS[active].question}」。
      </p>
    </div>
  )
}

/* --------------------------- 4. 夹心法 --------------------------- */

const SANDWICH_STEPS = [
  { title: '加样与迁移', desc: '样品滴到样品垫后，在毛细管作用下向吸水垫方向移动。' },
  { title: '释放金标抗体', desc: '流经金垫时，预先干燥的金标抗体被重新润湿、释放。' },
  { title: '形成复合物', desc: '样品中若含目标抗原，会形成“金标抗体—抗原”复合物，继续向前迁移。' },
  { title: 'T 线拦截显色', desc: '复合物泳动到检测线时，被 T 线固定的抗体拦截并聚集，在检测线上聚集显色。' },
  { title: 'C 线拦截显色', desc: '未被检测线拦截的金标抗体及部分复合物，被质控线拦截并聚集显色。' },
]

export function SandwichAssay() {
  return (
    <StepPlayer
      ariaLabel="双抗体夹心法检测抗原的分步演示"
      steps={SANDWICH_STEPS.map((s) => ({ title: s.title, desc: s.desc }))}
      render={(active) => (
        <svg viewBox="0 0 640 190" role="img" aria-label="双抗体夹心法：金标抗体与抗原形成复合物，被T线拦截显色，其余被C线拦截">
          <Defs />
          {/* 试纸条布局 */}
          <rect x={30} y={70} width={580} height={40} rx={5} fill="#fbfdfc" stroke={C.line} />
          <rect x={30} y={70} width={96} height={40} rx={5} fill="#d9efe4" stroke={C.line} />
          <text x={78} y={128} textAnchor="middle" fontSize={8} fill={C.muted}>样品垫</text>
          <rect x={126} y={70} width={96} height={40} rx={5} fill={C.goldBg} stroke={C.line} />
          <text x={174} y={128} textAnchor="middle" fontSize={8} fill={C.muted}>金垫</text>
          <rect x={330} y={62} width={9} height={56} fill={active >= 3 ? C.red : '#e6dccb'} />
          <text x={334} y={54} textAnchor="middle" fontSize={9} fontWeight={800} fill={active >= 3 ? C.red : C.muted}>T</text>
          <rect x={440} y={62} width={9} height={56} fill={active >= 4 ? C.brandMid : '#e6dccb'} />
          <text x={444} y={54} textAnchor="middle" fontSize={9} fontWeight={800} fill={active >= 4 ? C.brandMid : C.muted}>C</text>
          <rect x={540} y={70} width={70} height={40} rx={5} fill="#dfe7e3" stroke={C.line} />
          <text x={575} y={128} textAnchor="middle" fontSize={8} fill={C.muted}>吸水垫</text>

          {/* 金标抗体（第1步之后出现） */}
          {active >= 1 ? (
            <g>
              {[150, 172, 194].map((x) => (
                <g key={x}>
                  <circle cx={x} cy={90} r={5} fill={C.gold} />
                </g>
              ))}
            </g>
          ) : null}

          {/* 抗原 + 复合物（第2步之后） */}
          {active >= 2 ? (
            <g>
              {[230, 270, 310].map((x) => (
                <g key={x}>
                  <circle cx={x} cy={88} r={4} fill={C.red} />
                  <circle cx={x - 7} cy={94} r={4} fill={C.gold} />
                  <circle cx={x + 7} cy={94} r={4} fill={C.gold} />
                </g>
              ))}
              <text x={270} y={118} textAnchor="middle" fontSize={7.5} fill={C.muted}>金标抗体—抗原复合物</text>
            </g>
          ) : null}

          {/* T 线聚集（第3步） */}
          {active >= 3 ? (
            <g>
              {[82, 90, 98].map((y) => (
                <circle key={y} cx={334} cy={y} r={4} fill={C.red} />
              ))}
              <text x={334} y={148} textAnchor="middle" fontSize={8} fontWeight={700} fill={C.red}>T 线显色</text>
            </g>
          ) : null}

          {/* C 线聚集（第4步） */}
          {active >= 4 ? (
            <g>
              {[82, 90, 98].map((y) => (
                <circle key={y} cx={444} cy={y} r={4} fill={C.brandMid} />
              ))}
              <text x={444} y={148} textAnchor="middle" fontSize={8} fontWeight={700} fill={C.brandMid}>C 线显色</text>
            </g>
          ) : null}

          <text x={320} y={172} textAnchor="middle" fontSize={9} fill={C.muted}>
            {SANDWICH_STEPS[Math.min(active, 4)].title}：{SANDWICH_STEPS[Math.min(active, 4)].desc.slice(0, 34)}
          </text>
        </svg>
      )}
    />
  )
}

/* --------------------------- 5. 间接法 --------------------------- */

const INDIRECT_STEPS = [
  { title: '金标抗原制备', desc: '将重组抗原（如 NP）用胶体金标记，分散固定于结合垫（金垫）上。' },
  { title: 'T 线固定抗待检抗体', desc: '检测线固定抗待检抗体的抗体——如检测人血清 IgM，则固定抗人 IgM 抗体。' },
  { title: 'C 线固定抗抗原抗体', desc: '质控线固定抗 NP 抗原的单抗或多抗。' },
  { title: '待检抗体被 T 线捕获', desc: '样品中的待检抗体流经 T 线时，被 T 线固定的抗体抓住。' },
  { title: '金标抗原结合上去', desc: '金标抗原随后与已捕获的待检抗体结合，形成可见信号。' },
]

export function IndirectAssay() {
  return (
    <StepPlayer
      ariaLabel="间接法检测抗体的分步演示"
      steps={INDIRECT_STEPS.map((s) => ({ title: s.title, desc: s.desc }))}
      render={(active) => (
        <svg viewBox="0 0 640 190" role="img" aria-label="间接法：T线固定抗待检抗体抗体，金标抗原结合已捕获的待检抗体">
          <Defs />
          <rect x={30} y={70} width={580} height={40} rx={5} fill="#fbfdfc" stroke={C.line} />
          <rect x={30} y={70} width={96} height={40} rx={5} fill="#d9efe4" stroke={C.line} />
          <text x={78} y={128} textAnchor="middle" fontSize={8} fill={C.muted}>样品垫</text>
          <rect x={126} y={70} width={100} height={40} rx={5} fill={active >= 1 ? C.goldBg : '#f2f5f4'} stroke={C.line} />
          <text x={176} y={128} textAnchor="middle" fontSize={8} fill={C.muted}>金垫（金标抗原）</text>

          {/* T 线：固定抗待检抗体 */}
          <rect x={330} y={62} width={9} height={56} fill={active >= 2 ? C.blue : '#e6dccb'} />
          <text x={334} y={54} textAnchor="middle" fontSize={9} fontWeight={800} fill={active >= 2 ? C.blue : C.muted}>T</text>
          <text x={334} y={148} textAnchor="middle" fontSize={7.5} fill={C.blue}>抗待检抗体</text>

          {/* C 线：固定抗抗原抗体 */}
          <rect x={440} y={62} width={9} height={56} fill={active >= 3 ? C.brandMid : '#e6dccb'} />
          <text x={444} y={54} textAnchor="middle" fontSize={9} fontWeight={800} fill={active >= 3 ? C.brandMid : C.muted}>C</text>
          <text x={444} y={148} textAnchor="middle" fontSize={7.5} fill={C.brandMid}>抗抗原抗体</text>

          <rect x={540} y={70} width={70} height={40} rx={5} fill="#dfe7e3" stroke={C.line} />
          <text x={575} y={128} textAnchor="middle" fontSize={8} fill={C.muted}>吸水垫</text>

          {/* 待检抗体（第4步被捕获） */}
          {active >= 4 ? (
            <g>
              {[84, 92, 100].map((y) => (
                <circle key={y} cx={334} cy={y} r={4} fill={C.orange} />
              ))}
            </g>
          ) : null}

          {/* 金标抗原结合（第5步） */}
          {active >= 5 ? (
            <g>
              {[84, 92, 100].map((y) => (
                <circle key={y} cx={344} cy={y} r={3.5} fill={C.gold} />
              ))}
              <text x={334} y={166} textAnchor="middle" fontSize={8} fontWeight={700} fill={C.gold}>T 线显色</text>
            </g>
          ) : null}

          <text x={320} y={182} textAnchor="middle" fontSize={8.5} fill={C.muted}>
            {INDIRECT_STEPS[Math.min(active, 4)].title}
          </text>
        </svg>
      )}
    />
  )
}

/* --------------------------- 6. 两模式对比 --------------------------- */

const ROWS = [
  { k: '金垫上放的是', sand: '金标抗体', ind: '金标抗原' },
  { k: 'T 线固定的是', sand: '抗目标抗原的抗体', ind: '抗待检抗体的抗体' },
  { k: '检测目标', sand: '样品中的抗原', ind: '样品中的抗体' },
  { k: '复合物形式', sand: '金标抗体—抗原—T 线抗体', ind: 'T 线抗体—待检抗体—金标抗原' },
  { k: '典型用途', sand: '检测病原本身（是否正在感染）', ind: '检测机体是否产生过相应抗体' },
]

export function LfaCompare() {
  return (
    <div className="figure">
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th scope="col">对比项</th>
              <th scope="col">双抗体夹心法（测抗原）</th>
              <th scope="col">间接法（测抗体）</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.k}>
                <td>{r.k}</td>
                <td>
                  <strong style={{ color: C.brandMid }}>{r.sand}</strong>
                </td>
                <td>
                  <strong style={{ color: C.blue }}>{r.ind}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="figure__caption">
        <strong>记忆锚点：</strong>测抗原时金标的是<strong>抗体</strong>；测抗体时金标的是<strong>抗原</strong>——两端角色正好互换。
      </p>
    </div>
  )
}

/* --------------------------- 7. 结果判读（含层析流动模拟） --------------------------- */

export function LfaReading() {
  const [progress, setProgress] = useState(100)
  const [hasTarget, setHasTarget] = useState(true)

  // 计算两条线的显色强度（0~1）
  const p = progress / 100
  const tIntensity = hasTarget ? Math.max(0, Math.min(1, (p - 0.45) * 3)) : 0
  const cIntensity = Math.max(0, Math.min(1, (p - 0.68) * 3))

  const verdict = !(cIntensity > 0.25)
    ? { text: '尚不可判读 / 无效', tone: 'line' as const, note: 'C 线尚未显色：可能层析未完成，或试纸条无效。' }
    : tIntensity > 0.25
      ? { text: '阳性', tone: 'err' as const, note: 'T 线与 C 线同时显色——检出目标物。' }
      : { text: '阴性', tone: 'ok' as const, note: '仅 C 线显色——本次未检出目标物。' }

  return (
    <div className="figure">
      <div className="figure__toolbar">
        <label className="xs muted row" style={{ gap: 6 }}>
          层析进度
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            aria-valuetext={`层析进度 ${progress}%`}
            style={{ width: 180 }}
          />
          <span className="mono xs">{progress}%</span>
        </label>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={hasTarget} onClick={() => setHasTarget((v) => !v)}>
          {hasTarget ? '样品含目标物' : '样品不含目标物'}
        </button>
        <button type="button" className="btn btn--quiet btn--sm" onClick={() => setProgress(0)}>
          ↺ 重置
        </button>
      </div>
      <svg viewBox="0 0 640 200" role="img" aria-label={`层析进度 ${progress}%，T 线强度 ${(tIntensity * 100).toFixed(0)}%，C 线强度 ${(cIntensity * 100).toFixed(0)}%`}>
        <Defs />
        {/* 试纸条 */}
        <rect x={40} y={64} width={560} height={48} rx={5} fill="#fbfdfc" stroke={C.line} />
        <rect x={40} y={64} width={90} height={48} rx={5} fill="#d9efe4" stroke={C.line} />
        <text x={85} y={128} textAnchor="middle" fontSize={8} fill={C.muted}>样品垫</text>
        <rect x={130} y={64} width={90} height={48} rx={5} fill={C.goldBg} stroke={C.line} />
        <text x={175} y={128} textAnchor="middle" fontSize={8} fill={C.muted}>金垫</text>

        {/* 液体前沿 */}
        <rect x={220} y={68} width={Math.max(0, (560 * p) - 2)} height={40} fill={C.blue} opacity={0.12} />
        <line x1={220 + Math.max(0, 558 * p)} y1={62} x2={220 + Math.max(0, 558 * p)} y2={116} stroke={C.blue} strokeWidth={2} strokeDasharray="4 3" />

        {/* T 线 */}
        <rect x={340} y={64} width={11} height={48} fill={C.red} opacity={0.12} />
        {tIntensity > 0.02 ? (
          <rect x={340} y={64} width={11} height={48} fill={C.red} opacity={tIntensity} />
        ) : null}
        <text x={345} y={56} textAnchor="middle" fontSize={9} fontWeight={800} fill={tIntensity > 0.25 ? C.red : C.muted}>T</text>

        {/* C 线 */}
        <rect x={450} y={64} width={11} height={48} fill={C.brandMid} opacity={0.12} />
        {cIntensity > 0.02 ? (
          <rect x={450} y={64} width={11} height={48} fill={C.brandMid} opacity={cIntensity} />
        ) : null}
        <text x={455} y={56} textAnchor="middle" fontSize={9} fontWeight={800} fill={cIntensity > 0.25 ? C.brandMid : C.muted}>C</text>

        <rect x={520} y={64} width={80} height={48} rx={5} fill="#dfe7e3" stroke={C.line} />
        <text x={560} y={128} textAnchor="middle" fontSize={8} fill={C.muted}>吸水垫</text>

        {/* 判读结果 */}
        <text x={320} y={160} textAnchor="middle" fontSize={12} fontWeight={800} fill={verdict.tone === 'ok' ? C.brandMid : verdict.tone === 'err' ? C.red : C.muted}>
          判读：{verdict.text}
        </text>
        <text x={320} y={182} textAnchor="middle" fontSize={8.5} fill={C.muted}>{verdict.note}</text>
      </svg>
      <div className="figure__toolbar">
        <Tag tone={verdict.tone}>{verdict.text}</Tag>
        <span className="xs muted">拖动滑杆推进层析；切换“样品是否含目标物”观察 T 线变化</span>
      </div>
      <p className="figure__caption">
        <strong>判读顺序：</strong>先看 C 线是否显色（试纸条是否有效），再看 T 线是否显色（有无目标物）。C 线不显色时，无论 T 线如何都不能采信。
      </p>
    </div>
  )
}

/* --------------------------- 8. 为什么 C 线能结合 --------------------------- */

export function LfaWhyC() {
  const [active, setActive] = useState<'species' | 'why'>('species')
  return (
    <div className="figure">
      <div className="figure__toolbar">
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={active === 'species'} onClick={() => setActive('species')}>
          抗体遗传标志区域
        </button>
        <button type="button" className="btn btn--quiet btn--sm" aria-pressed={active === 'why'} onClick={() => setActive('why')}>
          为什么能作为质控
        </button>
      </div>
      <svg viewBox="0 0 620 190" role="img" aria-label="C 线抗体识别金标抗体的物种标志（同种异型差异区域）">
        <Defs />
        {/* 金标抗体 */}
        <g>
          <circle cx={120} cy={92} r={20} fill={C.goldBg} stroke={C.gold} strokeWidth={2} />
          <text x={120} y={96} textAnchor="middle" fontSize={8} fontWeight={700} fill={C.gold}>金标</text>
          <path d="M140 88 L172 66" stroke={C.brandMid} strokeWidth={8} strokeLinecap="round" />
          <path d="M140 96 L172 118" stroke={C.brandMid} strokeWidth={8} strokeLinecap="round" />
          <text x={176} y={60} fontSize={8} fill={C.brandMid}>Fab</text>
          <text x={120} y={128} textAnchor="middle" fontSize={8} fill={C.muted}>金标抗体（一抗）</text>
        </g>

        {/* 恒定区高亮 */}
        <circle cx={150} cy={92} r={12} fill="none" stroke={C.orange} strokeWidth={2.2} strokeDasharray="4 3" />
        <text x={150} y={44} textAnchor="middle" fontSize={8} fontWeight={700} fill={C.orange}>恒定区（物种标志）</text>
        <line x1={150} y1={52} x2={150} y2={80} stroke={C.orange} strokeWidth={1.6} strokeDasharray="3 3" />

        <Arrow d="M210 92 H262" active />

        {/* C 线抗体 */}
        <g>
          <rect x={264} y={78} width={10} height={40} rx={3} fill={C.brandMid} />
          <path d="M274 88 L306 66" stroke={C.brandMid} strokeWidth={8} strokeLinecap="round" />
          <path d="M274 96 L306 118" stroke={C.brandMid} strokeWidth={8} strokeLinecap="round" />
          <text x={290} y={140} textAnchor="middle" fontSize={8} fontWeight={700} fill={C.brandMid}>C 线抗体（二抗）</text>
          <text x={290} y={156} textAnchor="middle" fontSize={7.5} fill={C.muted}>如山羊抗鼠抗体</text>
        </g>

        <rect x={340} y={40} width={262} height={128} rx={12} fill={active === 'species' ? C.goldBg : C.mintBg} stroke={active === 'species' ? C.gold : C.brandMid} strokeWidth={2} />
        <foreignObject x={352} y={52} width={238} height={106}>
          <div style={{ fontSize: 8.5, lineHeight: 1.6, color: '#35443f' }}>
            {active === 'species'
              ? '课件原文：如 IgG 抗体（一抗）来源于鼠，则鼠源 IgG 的 CH1-CL 基本上相同；二抗若是抗鼠的抗体（如山羊抗鼠，用纯化的小鼠 IgG 免疫山羊后获得的血清），则都可以识别并结合该一抗。'
              : 'C 线抗体认的是“鼠源抗体的恒定区”这一物种标志，而不是目标抗原。因此只要是鼠源抗体，无论它结合了什么，都能被 C 线抓住——这就是 C 线能作为独立质控的原因。'}
          </div>
        </foreignObject>
        <text x={320} y={182} textAnchor="middle" fontSize={8.5} fill={C.muted}>
          它证明“金标抗体确实流动到了这里且有活性”，与是否存在目标物无关
        </text>
      </svg>
      <p className="figure__caption">
        {active === 'species'
          ? '抗体的遗传标志区域（同种异型差异区域）决定了二抗能识别一抗——这是免疫学中“抗抗体”工具的基础。'
          : 'C 线的意义在于“独立对照”：它不依赖目标物，只验证整个层析与金标系统是否正常工作。'}
      </p>
    </div>
  )
}

/* --------------------------- 9. 量子点 --------------------------- */

const QD_STEPS = [
  { title: '试剂制备', detail: '质粒构建 → 诱导表达 → 蛋白纯化 → 蛋白浓缩；量子点与抗体偶联。' },
  { title: '试纸条优化', detail: 'NC 膜抗原包被浓度、量子点包被检测条件的确定。' },
  { title: '性能评价', detail: '阴阳性诊断标准确定、特异性评价、敏感性评价、重复性评价。' },
  { title: '性能数据', detail: '最低检测限 1:250 稀释度；78 份样品中本品阳性检出率 95%、商品化试剂盒 91%、符合率 95.79%。' },
]

export function QuantumDot() {
  const [active, setActive] = useState(0)
  return (
    <div className="figure">
      <svg viewBox="0 0 620 160" role="img" aria-label="量子点标记试纸条的研制与性能评价流程">
        <Defs />
        {QD_STEPS.map((s, i) => {
          const x = 24 + i * 148
          const on = i === active
          return (
            <g key={s.title} onClick={() => setActive(i)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={40} width={132} height={72} rx={11} fill={on ? C.goldBg : '#fff'} stroke={on ? C.gold : C.line} strokeWidth={on ? 2.8 : 1.4} />
              <text x={x + 66} y={62} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.muted}>第 {i + 1} 步</text>
              <text x={x + 66} y={84} textAnchor="middle" fontSize={10.5} fontWeight={on ? 800 : 600} fill={on ? C.brand : C.ink}>{s.title}</text>
              <text x={x + 66} y={102} textAnchor="middle" fontSize={7.5} fill={C.muted}>点击查看</text>
              {i < QD_STEPS.length - 1 ? <Arrow d={`M${x + 134} 76 H${x + 144}`} active={on} /> : null}
            </g>
          )
        })}
        <text x={310} y={136} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={C.brand}>
          {QD_STEPS[active].title}
        </text>
        <foreignObject x={40} y={142} width={540} height={20}>
          <div style={{ fontSize: 8, textAlign: 'center', color: '#5a6b67' }}>{QD_STEPS[active].detail}</div>
        </foreignObject>
      </svg>
      <div className="figure__toolbar">
        {QD_STEPS.map((s, i) => (
          <button key={s.title} type="button" className="btn btn--quiet btn--sm" aria-pressed={active === i} onClick={() => setActive(i)}>
            {s.title}
          </button>
        ))}
        <Tag tone="gold">课件原文数据</Tag>
      </div>
      <p className="figure__caption">
        <strong>量子点的核心价值：</strong>通过检测荧光值（对照 OD 值）判断抗体水平，<strong>解决试纸条无法定量的难题</strong>——从回答“有没有”升级到“有多少”。
      </p>
    </div>
  )
}
