import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { CourseConfig, PathwayStep } from '../content/types'
import { useProgress } from './progress'
import { Tag } from './ui'

/* ==========================================================================
   学习类组件（可复用）：页头 / 三维目标卡 / 知识图谱 / 学习路径 / 课堂任务卡
   ========================================================================== */

export function PageHeader({
  eyebrow,
  title,
  en,
  lead,
  meta,
}: {
  eyebrow: string
  title: string
  en?: string
  lead?: string
  meta?: ReactNode
}) {
  return (
    <section className="pagehead">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>
          {title}
          {en ? <span className="pagehead__en">{en}</span> : null}
        </h1>
        {lead ? <p className="lead">{lead}</p> : null}
        {meta ? <div className="pagehead__meta">{meta}</div> : null}
      </div>
    </section>
  )
}

export function LearningObjectives({ objectives }: { objectives: CourseConfig['objectives'] }) {
  const dims = [
    { id: 'k', icon: '📘', title: '知识与技能', items: objectives.knowledge },
    { id: 'a', icon: '🧭', title: '过程与方法', items: objectives.ability },
    { id: 'v', icon: '❤️', title: '情感态度与价值观', items: objectives.value },
  ]
  return (
    <div className="objectives">
      <div className="objectives__grid">
        {dims.map((d) => (
          <article key={d.id} className="objectives__card">
            <header>
              <span aria-hidden="true">{d.icon}</span>
              <h3>{d.title}</h3>
            </header>
            <ul>
              {d.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="objectives__standard">
        <Tag tone="gold">达标线</Tag>
        {objectives.standard}
      </p>
    </div>
  )
}

/* --------------------------------- 知识图谱 -------------------------------- */

const LEVEL2_POS: Record<string, [number, number]> = {
  m1: [150, 120],
  m2: [700, 120],
  m3: [425, 400],
}

const LEVEL2_FAN: Record<string, number> = {
  m1: 180,
  m2: 0,
  m3: 90,
}

export function KnowledgeGraph({ graph }: { graph: CourseConfig['graph'] }) {
  const navigate = useNavigate()
  const root = graph.nodes.find((n) => n.level === 1)
  const branches = graph.nodes.filter((n) => n.level === 2)

  const children: Record<string, { id: string; label: string; to?: string; x: number; y: number }[]> = {}
  branches.forEach((b) => {
    const kids = graph.links.filter((l) => l[0] === b.id).map((l) => graph.nodes.find((n) => n.id === l[1])).filter(Boolean)
    const baseAngle = LEVEL2_FAN[b.id] ?? 90
    const spread = Math.min(150, kids.length * 34)
    const [bx, by] = LEVEL2_POS[b.id]
    children[b.id] = kids.map((k, i) => {
      const t = kids.length === 1 ? 0.5 : i / (kids.length - 1)
      const angle = baseAngle - spread / 2 + spread * t
      const rad = (angle * Math.PI) / 180
      const dist = b.id === 'm3' ? 132 : 150
      return {
        id: k!.id,
        label: k!.label,
        to: k!.to,
        x: bx + Math.cos(rad) * dist,
        y: by + Math.sin(rad) * dist * (b.id === 'm3' ? 0.55 : 1),
      }
    })
  })

  return (
    <div className="graph">
      <svg viewBox="0 0 860 500" role="img" aria-label="本节核心知识图谱">
        <defs>
          <radialGradient id="graphRoot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1f8472" />
            <stop offset="100%" stopColor="#0b3b33" />
          </radialGradient>
        </defs>

        {branches.map((b) => {
          const [x, y] = LEVEL2_POS[b.id]
          return (
            <g key={`line-${b.id}`}>
              <line x1={425} y1={240} x2={x} y2={y} stroke="#c3d2cc" strokeWidth={2} strokeDasharray="4 5" />
              {(children[b.id] ?? []).map((c) => (
                <line key={`${b.id}-${c.id}`} x1={x} y1={y} x2={c.x} y2={c.y} stroke="#dde6e2" strokeWidth={1.4} />
              ))}
            </g>
          )
        })}

        {branches.map((b) => {
          const [x, y] = LEVEL2_POS[b.id]
          return (
            <g
              key={b.id}
              role="link"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
              onClick={() => b.to && navigate(b.to)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && b.to) navigate(b.to)
              }}
            >
              <circle cx={x} cy={y} r={44} fill="#fff" stroke={b.flag === '难点' ? '#e0762f' : b.flag === '重点' ? '#c9a227' : '#8fc9ae'} strokeWidth={2.5} />
              <text x={x} y={y - 2} textAnchor="middle" fontSize={13} fontWeight={700} fill="#0b3b33">
                {b.label.length > 6 ? b.label.slice(0, 6) : b.label}
              </text>
              {b.label.length > 6 ? (
                <text x={x} y={y + 16} textAnchor="middle" fontSize={13} fontWeight={700} fill="#0b3b33">
                  {b.label.slice(6)}
                </text>
              ) : null}
              {b.flag ? (
                <text x={x} y={y + 34} textAnchor="middle" fontSize={10} fill={b.flag === '难点' ? '#b8571a' : '#9c7c14'}>
                  {b.flag}
                </text>
              ) : null}
            </g>
          )
        })}

        {Object.values(children)
          .flat()
          .map((c) => (
            <g
              key={c.id}
              role="link"
              tabIndex={0}
              style={{ cursor: c.to ? 'pointer' : 'default' }}
              onClick={() => c.to && navigate(c.to)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && c.to) navigate(c.to)
              }}
            >
              <circle cx={c.x} cy={c.y} r={5.5} fill="#1f8472" />
              <text x={c.x} y={c.y + 20} textAnchor="middle" fontSize={11.5} fill="#35443f">
                {c.label}
              </text>
            </g>
          ))}

        <g>
          <circle cx={425} cy={240} r={62} fill="url(#graphRoot)" />
          <text x={425} y={236} textAnchor="middle" fontSize={19} fontWeight={800} fill="#fff">
            {root?.label}
          </text>
          <text x={425} y={258} textAnchor="middle" fontSize={11} fill="#a9d8c3">
            {root?.en}
          </text>
        </g>
      </svg>
      <p className="xs muted graph__note">
        点击任一节点进入对应内容；橙框为“难点”，金框为“重点”。图谱依据本章课件的三条授课主线绘制。
      </p>
    </div>
  )
}

/* --------------------------------- 学习路径 -------------------------------- */

export function PathTimeline({ steps }: { steps: PathwayStep[] }) {
  const { state } = useProgress()
  const stages: PathwayStep['stage'][] = ['课前', '课中', '课后']
  return (
    <div className="pathway">
      {stages.map((stage) => (
        <div key={stage} className="pathway__col">
          <h3 className="pathway__stage">
            <span>{stage}</span>
          </h3>
          <ul>
            {steps
              .filter((s) => s.stage === stage)
              .map((s) => {
                const done = Boolean(state.visited[s.to])
                return (
                  <li key={s.id}>
                    <Link to={s.to} className={`pathway__card ${done ? 'is-done' : ''}`}>
                      <span className="pathway__state" aria-hidden="true">
                        {done ? '✓' : '○'}
                      </span>
                      <strong>{s.title}</strong>
                      <span className="xs muted">{s.detail}</span>
                      {s.minutes ? <span className="xs mono pathway__min">{s.minutes} min</span> : null}
                      <span className="visually-hidden">{done ? '已完成' : '未完成'}</span>
                    </Link>
                  </li>
                )
              })}
          </ul>
        </div>
      ))}
    </div>
  )
}

/* -------------------------------- 课堂任务卡 ------------------------------- */

export function TaskCard({
  index,
  id,
  title,
  scenario,
  children,
  mechanism,
  summary,
}: {
  index: number
  id: string
  title: string
  scenario: string
  children: ReactNode
  mechanism: ReactNode
  summary: string
}) {
  return (
    <section id={id} className="taskcard">
      <header className="taskcard__head">
        <span className="num-pill">{index}</span>
        <h2>{title}</h2>
      </header>
      <div className="taskcard__flow">
        <div className="taskcard__step">
          <span className="taskcard__label">① 任务情境</span>
          <p>{scenario}</p>
        </div>
        <div className="taskcard__step">
          <span className="taskcard__label">② 学生操作</span>
          <div className="taskcard__op">{children}</div>
        </div>
        <div className="taskcard__step taskcard__step--mech">
          <span className="taskcard__label">③ 结果反馈与机制解释</span>
          <div>{mechanism}</div>
        </div>
        <div className="taskcard__step taskcard__step--sum">
          <span className="taskcard__label">④ 知识总结</span>
          <p>{summary}</p>
        </div>
      </div>
    </section>
  )
}
