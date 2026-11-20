import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, TaskCard } from '../components/learn'
import { ScrollLink } from '../components/ScrollLink'
import { StructureLab } from '../components/labs'
import { QuestionCard } from '../components/quiz'
import { BindingSimulator } from '../components/BindingSimulator'
import { usePageVisit, useProgress } from '../components/progress'
import { Callout, ProgressBar, SectionHead, Tag } from '../components/ui'
import { findQuestion, questionsOf } from '../content'
import { useCourse } from '../course-context'
import type { ClassroomTask, TaskInteraction } from '../content/types'
import type { CourseBundle } from '../content'

/**
 * 课堂互动页
 * ---------------------------------------------------------------
 * 本页不再包含任何学科内容：任务标题、情境、机制解释、小结、操作载体
 * 全部来自 `course.classroomTasks`（内容层）。
 * 换章节时只改内容文件，本文件无需改动。
 */

/** 把 `**加粗**` 标记解析为 <strong>，其余原样输出 */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

function Mechanism({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className="small">
          <RichText text={p} />
        </p>
      ))}
    </>
  )
}

/** 内容层缺少题目时的降级块：说明缺哪个 id、去哪里补，而不是白屏 */
function MissingTask({ what }: { what: string }) {
  return (
    <div className="callout callout--warn">
      <span className="callout__icon" aria-hidden="true">
        ⚠️
      </span>
      <div>
        <strong>本任务的题目尚未在内容层提供</strong>
        <br />
        缺少：<span className="mono">{what}</span>。请在{' '}
        <span className="mono">src/content/&lt;课程&gt;/questions.ts</span> 中补充该题目，
        并在 <span className="mono">classroomTasks</span> 的对应任务里引用。此提示不会出现在内容已配置完整的章节中。
      </div>
    </div>
  )
}

/** 结构识别任务：勾选目标即完成 */
function StructureLabTask({
  goals,
  doneHint,
  onComplete,
}: {
  goals: { id: string; label: string }[]
  doneHint?: string
  onComplete: () => void
}) {
  const [found, setFound] = useState<Record<string, boolean>>({})
  return (
    <>
      <StructureLab />
      <div className="goals" role="group" aria-label="任务目标清单">
        {goals.map((g) => (
          <button
            key={g.id}
            type="button"
            className={`goal ${found[g.id] ? 'is-done' : ''}`}
            aria-pressed={Boolean(found[g.id])}
            onClick={() => {
              const next = { ...found, [g.id]: !found[g.id] }
              setFound(next)
              if (goals.every((x) => next[x.id])) onComplete()
            }}
          >
            <span aria-hidden="true">{found[g.id] ? '✓' : '○'}</span>
            {g.label}
          </button>
        ))}
      </div>
      <p className="xs muted">{doneHint ?? `找到全部 ${goals.length} 项目标后，本任务自动记为完成。`}</p>
    </>
  )
}

/** 按内容层声明的载体类型渲染“学生操作”区 */
function TaskInteractionArea({
  task,
  bundle,
  onComplete,
}: {
  task: ClassroomTask
  bundle: CourseBundle
  onComplete: () => void
}): ReactNode {
  const it: TaskInteraction = task.interaction
  switch (it.kind) {
    case 'structure-lab':
      return <StructureLabTask goals={it.goals} doneHint={it.doneHint} onComplete={onComplete} />
    case 'binding-simulator':
      return <BindingSimulator />
    case 'question-set': {
      const qs = questionsOf(it.questionIds, bundle)
      if (qs.length === 0) return <MissingTask what={it.questionIds.join('、')} />
      return (
        <div className="stack" style={{ gap: 14 }}>
          {qs.map((q, i) => (
            <QuestionCard key={q.id} q={q} group="classroom" index={i} total={qs.length} />
          ))}
        </div>
      )
    }
    case 'question': {
      const q = findQuestion(it.questionId, bundle)
      return q ? <QuestionCard q={q} group="classroom" /> : <MissingTask what={it.missingLabel ?? it.questionId} />
    }
    default:
      return null
  }
}

export default function Classroom() {
  const bundle = useCourse()
  usePageVisit('/classroom')
  const { state, recordAnswer } = useProgress()
  const course = bundle.course
  const copy = course.pageCopy.classroom
  const tasks = course.classroomTasks

  const answeredClassroom = Object.values(state.answers).filter((a) => a.group === 'classroom').length
  const classroomTotal = Math.max(tasks.length, 1)

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        en={copy.en}
        lead={copy.lead}
        meta={
          <>
            <Tag tone="gold">{tasks.length} 个任务</Tag>
            <Tag tone="line">建议 15 分钟</Tag>
            <Tag tone="line">即时反馈</Tag>
            <Tag tone="line">可键盘操作</Tag>
          </>
        }
      />

      <section className="section section--tight">
        <div className="container">
          <nav className="taskindex" aria-label="任务索引">
            {tasks.map((t, i) => (
              <ScrollLink key={t.id} id={t.id} className="taskindex__btn">
                {i + 1}. {t.title}
              </ScrollLink>
            ))}
          </nav>
          <div className="row row--between" style={{ marginTop: 16 }}>
            <span className="small muted">本页已完成互动记录：{answeredClassroom} 项</span>
            <div style={{ minWidth: 220 }}>
              <ProgressBar value={(answeredClassroom / classroomTotal) * 100} thin />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="stack" style={{ gap: 28 }}>
            {tasks.map((task, i) => (
              <TaskCard
                key={task.id}
                index={i + 1}
                id={task.id}
                title={task.title}
                scenario={task.scenario}
                mechanism={<Mechanism paragraphs={task.mechanism} />}
                summary={task.summary}
              >
                <TaskInteractionArea
                  task={task}
                  bundle={bundle}
                  onComplete={() => recordAnswer(`task-${task.id}`, true, 'classroom', 'completed')}
                />
              </TaskCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight section--mint">
        <div className="container">
          <SectionHead eyebrow="课堂收束" title="从操作回到概念" />
          <ul className="takeaways">
            {bundle.modules.flatMap((m) => m.takeaways.slice(0, 1)).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <Callout tone="blue" icon="🧪" title="课后延伸">
            想进一步练习？请进入
            <Link to="/homework"> 课后作业 </Link>
            完成提升层任务，并在
            <Link to="/assessment"> 学习评价 </Link>
            页查看前后测对照。
          </Callout>
          <p className="xs muted">本页互动记录保存在本机浏览器，教师端不可见。</p>
        </div>
      </section>
    </>
  )
}
