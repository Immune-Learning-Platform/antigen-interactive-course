import { Link } from 'react-router-dom'
import { PageHeader } from '../components/learn'
import { QuestionCard } from '../components/quiz'
import { usePageVisit, useProgress } from '../components/progress'
import { Callout, ProgressBar, SectionHead, Tag } from '../components/ui'
import { questionsOf } from '../content'
import { useCourse } from '../course-context'

export default function Homework() {
  const bundle = useCourse()
  const copy = bundle.course.pageCopy.homework
  usePageVisit('/homework')
  const { state } = useProgress()

  const allIds = bundle.homeworkTiers.flatMap((t) => t.questionIds)
  const answered = allIds.filter((id) => state.answers[id] || state.drafts[id]).length
  const objectiveIds = allIds.filter((id) => bundle.questions[id]?.type !== 'open')
  const correct = objectiveIds.filter((id) => state.answers[id]?.correct).length
  const safeAll = Math.max(allIds.length, 1)
  const safeObj = Math.max(objectiveIds.length, 1)

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        en={copy.en}
        lead={copy.lead}
        meta={
          <>
            <Tag tone="gold">3 层任务</Tag>
            <Tag tone="line">{allIds.length} 道题</Tag>
            <Tag tone="line">支持重做</Tag>
          </>
        }
      />

      <section className="section section--tight">
        <div className="container">
          <div className="grid grid--3">
            <article className="card">
              <p className="metric__label">已完成</p>
              <p className="metric__value">
                {answered} / {allIds.length}
              </p>
              <ProgressBar value={(answered / safeAll) * 100} thin />
            </article>
            <article className="card">
              <p className="metric__label">客观题正确率</p>
              <p className="metric__value">
                {Math.round((correct / safeObj) * 100)}%
              </p>
              <p className="xs muted">目标 ≥ 80%；错题请回到对应模块查看解析。</p>
            </article>
            <article className="card">
              <p className="metric__label">提交方式</p>
              <p className="small">
                本页不收集任何个人信息，也不向服务器提交答案。如需提交，请按任课教师要求导出或手写提交。
              </p>
            </article>
          </div>

          <Callout tone="warn" icon="⚠️" title="本地存储说明">
            作业答案与草稿仅保存在<strong>本机浏览器</strong>（localStorage）。清除浏览器数据、更换设备或使用隐私模式后无法保留；
            本站不是教师可查看的学习分析后台。
          </Callout>
        </div>
      </section>

      {bundle.homeworkTiers.map((tier) => (
        <section key={tier.id} className="section section--tight" id={tier.id}>
          <div className="container">
            <SectionHead
              eyebrow={`${tier.level}层 · 建议 ${tier.minutes} 分钟`}
              title={tier.title}
              intro={tier.intro}
            />
            {tier.deliverable ? (
              <p className="xs muted" style={{ marginBottom: 14 }}>
                📄 {tier.deliverable}
              </p>
            ) : null}
            <div className="stack" style={{ gap: 16 }}>
              {questionsOf(tier.questionIds, bundle).map((q, i) => (
                <QuestionCard
                  key={q.id}
                  q={q}
                  group="homework"
                  index={i}
                  total={tier.questionIds.length}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section section--tight section--mint">
        <div className="container">
          <SectionHead eyebrow="下一步" title="做完作业，去看评价与前后测对照" />
          <div className="row">
            <Link className="btn" to="/assessment">
              查看学习评价
            </Link>
            <Link className="btn btn--ghost" to="/modules">
              回到模块补漏
            </Link>
            <Link className="btn btn--ghost" to="/frontier">
              看学科前沿
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
