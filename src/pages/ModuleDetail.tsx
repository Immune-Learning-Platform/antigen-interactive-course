import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../components/learn'
import { ScrollLink } from '../components/ScrollLink'
import { MediaPlayerList } from '../components/MediaPlayer'
import { ModuleVisual } from '../components/ModuleVisual'
import { QuestionCard } from '../components/quiz'
import { usePageVisit } from '../components/progress'
import { Callout, Reveal, SectionHead, SupplementNote, Tag } from '../components/ui'
import { Term } from '../components/glossary'
import { activeCourse, getModule, questionsOf } from '../content'
import NotFound from './NotFound'

export default function ModuleDetail() {
  const { moduleId } = useParams()
  const mod = getModule(moduleId)
  const index = activeCourse.modules.findIndex((m) => m.id === moduleId)
  usePageVisit(`/modules/${moduleId ?? ''}`)

  if (!mod) return <NotFound />

  const prev = index > 0 ? activeCourse.modules[index - 1] : null
  const next = index < activeCourse.modules.length - 1 ? activeCourse.modules[index + 1] : null

  return (
    <>
      <PageHeader
        eyebrow={`模块${mod.no === 1 ? '一' : mod.no === 2 ? '二' : '三'} · ${mod.en}`}
        title={mod.title}
        lead={mod.summary}
        meta={
          <>
            <Tag tone={mod.role === '难点' ? 'orange' : mod.role === '重点' ? 'gold' : 'mint'}>
              {mod.role === '难点' ? '本节难点' : mod.role === '重点' ? '本节重点' : '基础知识'}
            </Tag>
            <Tag tone="line">{mod.slides}</Tag>
            <Tag tone="line">建议 {mod.minutes} 分钟</Tag>
            <Tag tone="line">
              {mod.sections.reduce((n, s) => n + (s.quizIds?.length ?? 0), 0)} 道随堂小测
            </Tag>
          </>
        }
      />

      <section className="section section--tight">
        <div className="container">
          <div className="card card--mint">
            <h2 className="card__title">学习目标</h2>
            <ul className="checklist">
              {mod.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>

          <nav className="sectionnav" aria-label="模块小节导航">
            {mod.sections.map((s, i) => (
              <ScrollLink key={s.id} id={s.id} className="sectionnav__btn">
                {i + 1}. {s.title}
              </ScrollLink>
            ))}
          </nav>
        </div>
      </section>

      {mod.sections.map((s, si) => (
        <section key={s.id} id={s.id} className="section section--tight moduleSection">
          <div className="container">
            <div className="moduleSection__head">
              <span className="eyebrow">{s.eyebrow ?? `小节 ${si + 1}`}</span>
              <h2>{s.title}</h2>
            </div>

            {s.paragraphs?.map((p) => (
              <p key={p.slice(0, 14)} className="moduleSection__p">
                {p}
              </p>
            ))}

            {s.points ? (
              <div className="grid grid--2" style={{ marginTop: 16 }}>
                {s.points.map((pt) => (
                  <article key={pt.label} className="card card--flat">
                    <h3 className="card__title">{pt.label}</h3>
                    <p className="small">{pt.text}</p>
                  </article>
                ))}
              </div>
            ) : null}

            {s.visual ? (
              <Reveal className="moduleSection__visual">
                <ModuleVisual visual={s.visual} />
              </Reveal>
            ) : null}

            {s.media?.length ? (
              <div style={{ marginTop: 18 }}>
                <h3 className="moduleSection__quizTitle">
                  视频 / 动画素材 <span className="xs muted">（如实标注来源与核验状态）</span>
                </h3>
                <MediaPlayerList clips={s.media} />
              </div>
            ) : null}

            {s.note ? (
              <p className="xs muted" style={{ marginTop: 10 }}>
                📌 {s.note}
              </p>
            ) : null}

            {s.supplement ? (
              <div style={{ marginTop: 16 }}>
                <SupplementNote
                  title={s.supplement.title}
                  body={s.supplement.body}
                  source={s.supplement.source}
                />
              </div>
            ) : null}

            {s.quizIds?.length ? (
              <div className="stack" style={{ marginTop: 20, gap: 16 }}>
                <h3 className="moduleSection__quizTitle">
                  随堂小测 <span className="xs muted">（即时判定 + 解析 + 回链复习）</span>
                </h3>
                {questionsOf(s.quizIds).map((q, qi) => (
                  <QuestionCard key={q.id} q={q} group="module" index={qi} total={s.quizIds!.length} compact />
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ))}

      <section className="section section--tight section--mint">
        <div className="container">
          <SectionHead eyebrow="模块小结" title="把这一模块收成几句话" />
          <ul className="takeaways">
            {mod.takeaways.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <Callout tone="gold" icon="🧠" title="自检：能不能不看资料说出来？">
            请尝试用 60 秒向同学复述本模块的三条小结；如果卡住，回到对应小节再看一遍图。
            本节难点内容（表位与 T/B 识别分工）还会在
            <Link to="/classroom"> 课堂互动 </Link>
            中以操作任务的形式再练一遍。
          </Callout>

          <nav className="moduleNav" aria-label="模块翻页">
            {prev ? (
              <Link to={`/modules/${prev.id}`} className="moduleNav__item">
                <span className="xs muted">上一模块</span>
                <strong>← {prev.title}</strong>
              </Link>
            ) : (
              <Link to="/pre-class" className="moduleNav__item">
                <span className="xs muted">返回</span>
                <strong>← 课前学习</strong>
              </Link>
            )}
            {next ? (
              <Link to={`/modules/${next.id}`} className="moduleNav__item moduleNav__item--right">
                <span className="xs muted">下一模块</span>
                <strong>{next.title} →</strong>
              </Link>
            ) : (
              <Link to="/classroom" className="moduleNav__item moduleNav__item--right">
                <span className="xs muted">继续</span>
                <strong>课堂互动 →</strong>
              </Link>
            )}
          </nav>

          <p className="xs muted" style={{ marginTop: 14 }}>
            术语提示：正文中的关键术语（如
            <Term name="抗原表位">抗原表位</Term>、
            <Term name="构象表位">构象表位</Term>）可悬停查看解释。
          </p>
        </div>
      </section>
    </>
  )
}
