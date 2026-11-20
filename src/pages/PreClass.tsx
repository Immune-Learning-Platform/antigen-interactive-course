import { Link } from 'react-router-dom'
import { LearningObjectives, PageHeader } from '../components/learn'
import { MediaPlayerList } from '../components/MediaPlayer'
import { ModuleVisual } from '../components/ModuleVisual'
import { QuestionCard } from '../components/quiz'
import { usePageVisit, useProgress } from '../components/progress'
import { Callout, ProgressBar, Reveal, SectionHead, Tag } from '../components/ui'
import { useGlossary } from '../components/glossary'
import { activeCourse, questionsOf } from '../content'

export default function PreClass() {
  usePageVisit('/pre-class')
  const course = activeCourse.course
  const { state } = useProgress()
  const glossary = useGlossary()
  const tasks = questionsOf(course.preClass.taskIds)
  const answered = tasks.filter((t) => state.answers[t.id]).length
  const correct = tasks.filter((t) => state.answers[t.id]?.correct).length
  const objectiveCount = tasks.filter((t) => t.type !== 'open').length

  return (
    <>
      <PageHeader
        eyebrow="课前学习 · 学习任务驱动型预习"
        title="带问题进课堂"
        en="Pre-class"
        lead="先看一个真实的养殖场情境，再带着 4 个问题读完知识卡。答完立刻能看到对错与解析——不必一次记牢，把没想通的问题带进课堂就好。"
        meta={
          <>
            <Tag tone="gold">建议 15 分钟</Tag>
            <Tag tone="line">预习任务 {tasks.length} 道</Tag>
            <Tag tone="line">即时反馈</Tag>
          </>
        }
      />

      {/* 情境导入 */}
      <section className="section section--tight" id="scenario">
        <div className="container">
          <SectionHead eyebrow="① 情境导入" title={course.preClass.scenario.title} />
          <div className="split">
            <div className="stack">
              {course.preClass.scenario.body.map((p) => (
                <p key={p.slice(0, 12)}>{p}</p>
              ))}
              <ul className="questionlist">
                {course.preClass.scenario.questions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
              <Callout tone="blue" icon="🔎" title="带着问题学习">
                这三个问题分别对应“反应原性”“表位特异性”“免疫原性”，读完模块一、二就能自己回答。
              </Callout>
            </div>
            <Reveal>
              <ModuleVisual visual={course.preClass.scenario.visual} />
            </Reveal>
          </div>

          {course.preClass.scenario.media?.length ? (
            <div style={{ marginTop: 24 }}>
              <h3 className="moduleSection__quizTitle">情境素材说明</h3>
              <MediaPlayerList clips={course.preClass.scenario.media} />
            </div>
          ) : null}
        </div>
      </section>

      {/* 学习目标 */}
      <section className="section section--tight section--mint" id="objectives">
        <div className="container">
          <SectionHead
            eyebrow="② 学习目标（三维）"
            title="这节课要达成什么"
            intro="按“知识—能力—素养”三维列出，达标线写在最后。课后再回看一次，自查是否真的做到。"
          />
          <LearningObjectives objectives={course.objectives} />
        </div>
      </section>

      {/* 基础知识预习 */}
      <section className="section section--tight" id="cards">
        <div className="container">
          <SectionHead
            eyebrow="③ 基础知识预习"
            title="六张知识卡，先建立概念"
            intro="蓝色虚线术语可悬停（或点击）查看解释——桌面端悬停、手机端点按。"
          />
          <div className="grid grid--3">
            {course.preClass.cards.map((c) => (
              <article key={c.title} className="card card--hover">
                <h3 className="card__title">
                  {c.title}
                  {c.en ? <span className="xs muted mono">{c.en}</span> : null}
                </h3>
                <p className="small">{c.body}</p>
                <div className="row" style={{ marginTop: 10 }}>
                  {c.tags?.map((t) => (
                    <Tag key={t} tone="line">
                      {t}
                    </Tag>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="card card--mint" style={{ marginTop: 20 }}>
            <h3 className="card__title">术语速查（悬停试试）</h3>
            <p className="small">
              本节会反复用到这些词：
              {glossary.slice(0, 8).map((g, i) => (
                <span key={g.term}>
                  {i > 0 ? ' · ' : ''}
                  <span className="term-static">{g.term}</span>
                </span>
              ))}
              。完整术语表见
              <Link to="/modules#glossary">模块学习页的术语表</Link>。
            </p>
          </div>
        </div>
      </section>

      {/* 预习任务 */}
      <section className="section section--tight section--mint" id="tasks">
        <div className="container">
          <SectionHead
            eyebrow="④ 预习任务"
            title="4 道题，边读边做"
            intro="前 3 题即时判分并给出解析；第 4 题是开放题，先自己写，再对照参考思路。"
          />
          <div className="stack" style={{ gap: 18 }}>
            {tasks.map((q, i) => (
              <QuestionCard key={q.id} q={q} group="pre" index={i} total={tasks.length} />
            ))}
          </div>
        </div>
      </section>

      {/* 完成状态 */}
      <section className="section section--tight" id="status">
        <div className="container">
          <SectionHead eyebrow="⑤ 学习完成状态" title="你的课前预习进度" />
          <div className="grid grid--3">
            <article className="card">
              <p className="metric__label">已作答</p>
              <p className="metric__value">
                {answered} / {tasks.length}
              </p>
              <ProgressBar value={(answered / tasks.length) * 100} thin />
            </article>
            <article className="card">
              <p className="metric__label">客观题正确率</p>
              <p className="metric__value">{objectiveCount ? Math.round((correct / objectiveCount) * 100) : 0}%</p>
              <p className="xs muted">目标：≥ 80%。做错不要紧，先看解析。</p>
            </article>
            <article className="card">
              <p className="metric__label">下一步</p>
              <p className="small">
                带着还没想通的问题进入
                <Link to="/modules/m1">模块一</Link>。
              </p>
              <Link className="btn btn--sm" to="/modules/m1">
                开始模块一
              </Link>
            </article>
          </div>

          <div className="grid grid--3" style={{ marginTop: 20 }}>
            {course.preClass.prior.map((p) => (
              <article key={p.subject} className="card card--flat">
                <span className="card__kicker">旧知衔接</span>
                <h3 className="card__title">{p.subject}</h3>
                <p className="small muted">{p.text}</p>
              </article>
            ))}
          </div>

          <Callout tone="warn" icon="⚠️" title="关于学习记录的说明" >
            本站为纯静态站点：学习进度、答题记录与作业草稿仅保存在<strong>本机浏览器</strong>中，
            不会上传服务器，教师端也无法查看。清除浏览器数据、更换设备或使用隐私模式后，记录可能丢失。
          </Callout>
        </div>
      </section>
    </>
  )
}
