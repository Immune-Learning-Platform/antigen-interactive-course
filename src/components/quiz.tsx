import { useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Question, SingleChoice, MultiChoice, JudgeQuestion, OrderingQuestion, SortingQuestion, OpenQuestion } from '../content/types'
import { useProgress, type QuestionGroup } from './progress'

/* ==========================================================================
   题目组件（可复用）：单选 / 多选 / 判断 / 排序 / 拖拽分类 / 开放题
   统一结构：题干（可含情境）→ 作答 → 即时反馈（判定 + 解析 + 机制 + 回链）
   ========================================================================== */

export type Response = string | string[] | boolean | Record<string, string> | null

export function gradeQuestion(q: Question, r: Response): boolean {
  switch (q.type) {
    case 'single':
      return r === q.answer
    case 'judge':
      return r === q.answer
    case 'multi': {
      if (!Array.isArray(r)) return false
      const a = [...q.answer].sort()
      const b = [...(r as string[])].sort()
      return a.length === b.length && a.every((v, i) => v === b[i])
    }
    case 'ordering': {
      if (!Array.isArray(r)) return false
      const target = q.items.map((i) => i.id)
      return target.length === r.length && target.every((v, i) => v === r[i])
    }
    case 'sorting': {
      if (!r || typeof r !== 'object' || Array.isArray(r)) return false
      const map = r as Record<string, string>
      return q.items.every((it) => map[it.id] === it.bucket)
    }
    default:
      return false
  }
}

function answerText(q: Question): ReactNode {
  switch (q.type) {
    case 'single': {
      const opt = (q as SingleChoice).options.find((o) => o.key === q.answer)
      return `${q.answer}．${opt?.text ?? ''}`
    }
    case 'multi': {
      const m = q as MultiChoice
      return m.answer
        .map((k) => `${k}．${m.options.find((o) => o.key === k)?.text ?? ''}`)
        .join('；')
    }
    case 'judge':
      return (q as JudgeQuestion).answer ? '正确' : '错误'
    case 'ordering':
      return (q as OrderingQuestion).items.map((i, idx) => `${idx + 1}. ${i.text}`).join(' → ')
    case 'sorting': {
      const s = q as SortingQuestion
      return s.buckets
        .map(
          (b) =>
            `${b.label}：` +
            s.items
              .filter((i) => i.bucket === b.id)
              .map((i) => i.text)
              .join('、'),
        )
        .join('；')
    }
    default:
      return null
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface QuestionCardProps {
  q: Question
  group: QuestionGroup
  index?: number
  total?: number
  /** 紧凑模式：用于模块页内嵌 */
  compact?: boolean
}

export function QuestionCard({ q, group, index, total, compact }: QuestionCardProps) {
  const { state, recordAnswer, setDraft } = useProgress()
  const prev = state.answers[q.id]
  const [submitted, setSubmitted] = useState(Boolean(prev))
  const [correct, setCorrect] = useState<boolean>(Boolean(prev?.correct))
  const [value, setValue] = useState<Response>(null)
  const [showGuide, setShowGuide] = useState(false)

  const [order, setOrder] = useState<string[]>(() =>
    q.type === 'ordering' ? shuffle((q as OrderingQuestion).items.map((i) => i.id)) : [],
  )
  const [assign, setAssign] = useState<Record<string, string>>({})
  const [picked, setPicked] = useState<string | null>(null)

  const heading = useMemo(() => {
    const tagText =
      q.type === 'single'
        ? '单选'
        : q.type === 'multi'
          ? '多选'
          : q.type === 'judge'
            ? '判断'
            : q.type === 'ordering'
              ? '排序'
              : q.type === 'sorting'
                ? '分类'
                : '开放题'
    return { tagText }
  }, [q.type])

  const submit = (r: Response) => {
    if (submitted && q.type !== 'open') return
    const ok = gradeQuestion(q, r)
    setValue(r)
    setCorrect(ok)
    setSubmitted(true)
    recordAnswer(q.id, ok, group, typeof r === 'string' ? r : Array.isArray(r) ? r.join(',') : undefined)
  }

  const openQuestion = q.type === 'open' ? (q as OpenQuestion) : null
  const draft = openQuestion ? (state.drafts[q.id] ?? '') : ''

  return (
    <article className={`qcard ${compact ? 'qcard--compact' : ''}`} id={`q-${q.id}`}>
      <header className="qcard__head">
        <span className="tag tag--line">{heading.tagText}</span>
        {typeof index === 'number' && total ? (
          <span className="xs muted mono">
            {index + 1} / {total}
          </span>
        ) : null}
        {prev ? <span className="tag tag--ok">已作答</span> : null}
        {q.tags?.length
          ? q.tags.map((t) => (
              <span key={t} className="tag tag--gold">
                {t}
              </span>
            ))
          : null}
      </header>

      {q.scenario ? (
        <p className="qcard__scenario">
          <strong>任务情境：</strong>
          {q.scenario}
        </p>
      ) : null}

      <p className="qcard__stem">{q.stem}</p>

      {/* ---------------- 单选 ---------------- */}
      {q.type === 'single' ? (
        <div className="opts" role="radiogroup" aria-label="选项">
          {(q as SingleChoice).options.map((o) => {
            const pickedNow = value === o.key
            const isAnswer = submitted && o.key === q.answer
            const isWrongPick = submitted && pickedNow && o.key !== q.answer
            return (
              <button
                key={o.key}
                type="button"
                role="radio"
                aria-checked={pickedNow}
                className={`opt ${isAnswer ? 'is-answer' : ''} ${isWrongPick ? 'is-wrong' : ''}`}
                onClick={() => submit(o.key)}
                disabled={submitted}
              >
                <span className="opt__key">{o.key}</span>
                <span>{o.text}</span>
              </button>
            )
          })}
        </div>
      ) : null}

      {/* ---------------- 多选 ---------------- */}
      {q.type === 'multi' ? (
        <MultiPicker
          q={q as MultiChoice}
          submitted={submitted}
          onSubmit={(r) => submit(r)}
          picked={Array.isArray(value) ? (value as string[]) : []}
        />
      ) : null}

      {/* ---------------- 判断 ---------------- */}
      {q.type === 'judge' ? (
        <div className="opts opts--inline">
          {[true, false].map((v) => {
            const isAnswer = submitted && v === (q as JudgeQuestion).answer
            const isWrongPick = submitted && value === v && v !== (q as JudgeQuestion).answer
            return (
              <button
                key={String(v)}
                type="button"
                className={`opt ${isAnswer ? 'is-answer' : ''} ${isWrongPick ? 'is-wrong' : ''}`}
                onClick={() => submit(v)}
                disabled={submitted}
              >
                <span className="opt__key">{v ? '✓' : '✕'}</span>
                <span>{v ? '正确' : '错误'}</span>
              </button>
            )
          })}
        </div>
      ) : null}

      {/* ---------------- 排序 ---------------- */}
      {q.type === 'ordering' ? (
        <div>
          <ol className="orderlist">
            {order.map((id, i) => {
              const item = (q as OrderingQuestion).items.find((x) => x.id === id)
              return (
                <li key={id} className="orderlist__row">
                  <span className="num-pill num-pill--ghost">{i + 1}</span>
                  <span className="orderlist__text">
                    {item?.text}
                    {item?.hint ? <em className="xs muted">（提示：{item.hint}）</em> : null}
                  </span>
                  <span className="orderlist__btns">
                    <button
                      type="button"
                      className="btn btn--quiet btn--sm"
                      aria-label={`上移：${item?.text}`}
                      disabled={i === 0 || submitted}
                      onClick={() => {
                        const next = [...order]
                        ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
                        setOrder(next)
                      }}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="btn btn--quiet btn--sm"
                      aria-label={`下移：${item?.text}`}
                      disabled={i === order.length - 1 || submitted}
                      onClick={() => {
                        const next = [...order]
                        ;[next[i + 1], next[i]] = [next[i], next[i + 1]]
                        setOrder(next)
                      }}
                    >
                      ↓
                    </button>
                  </span>
                </li>
              )
            })}
          </ol>
          <div className="row" style={{ marginTop: 12 }}>
            <button
              type="button"
              className="btn btn--sm"
              disabled={submitted}
              onClick={() => submit(order)}
            >
              提交顺序
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              disabled={submitted}
              onClick={() => setOrder(shuffle(order))}
            >
              打乱重排
            </button>
          </div>
        </div>
      ) : null}

      {/* ---------------- 拖拽 / 点击分类 ---------------- */}
      {q.type === 'sorting' ? (
        <SortingBoard
          q={q as SortingQuestion}
          assign={assign}
          setAssign={setAssign}
          picked={picked}
          setPicked={setPicked}
          submitted={submitted}
          onSubmit={(m) => submit(m)}
        />
      ) : null}

      {/* ---------------- 开放题 ---------------- */}
      {openQuestion ? (
        <div>
          <label className="visually-hidden" htmlFor={`open-${q.id}`}>
            作答区
          </label>
          <textarea
            id={`open-${q.id}`}
            className="textarea"
            rows={5}
            defaultValue={draft}
            placeholder="先自己写，再看参考思路（内容仅保存在本机浏览器）"
            onChange={(e) => setDraft(q.id, e.target.value)}
          />
          <div className="row" style={{ marginTop: 10 }}>
            <button
              type="button"
              className="btn btn--sm"
              onClick={() => {
                setSubmitted(true)
                setShowGuide(true)
              }}
            >
              我写好了，看参考思路
            </button>
            <span className="xs muted">
              {openQuestion.minLength ? `建议不少于 ${openQuestion.minLength} 字` : ''}
            </span>
          </div>
        </div>
      ) : null}

      {/* ---------------- 反馈 ---------------- */}
      {submitted && q.type !== 'open' ? (
        <div className={`qfeedback ${correct ? 'qfeedback--ok' : 'qfeedback--err'}`} role="status">
          <div className="qfeedback__head">
            <strong>{correct ? '✅ 回答正确' : '❌ 再想想'}</strong>
            <span className="xs">
              正确答案：
              <span className="mono">{answerText(q)}</span>
            </span>
          </div>
          <p>
            <strong>解析：</strong>
            {q.explain}
          </p>
          {q.summary ? (
            <p>
              <strong>知识小结：</strong>
              {q.summary}
            </p>
          ) : null}
          {q.supplement ? (
            <p className="xs muted">
              本题涉及补充知识，来源：
              {q.supplement.url ? (
                <a href={q.supplement.url} target="_blank" rel="noreferrer noopener">
                  {q.supplement.label}
                </a>
              ) : (
                q.supplement.label
              )}
            </p>
          ) : null}
          {q.ref ? (
            <p className="xs">
              对应知识点：
              <Link to={`/modules/${q.ref.moduleId}`}>
                {q.ref.label}
              </Link>
              {q.ref.anchor ? (
                <>
                  {' '}
                  ·{' '}
                  <Link to={`/modules/${q.ref.moduleId}#${q.ref.anchor}`}>去复习该小节</Link>
                </>
              ) : null}
            </p>
          ) : null}
          <button
            type="button"
            className="btn btn--quiet btn--sm"
            onClick={() => {
              setSubmitted(false)
              setValue(q.type === 'ordering' ? null : null)
              setAssign({})
              setPicked(null)
              if (q.type === 'ordering') {
                setOrder(shuffle((q as OrderingQuestion).items.map((i) => i.id)))
              }
            }}
          >
            再做一次
          </button>
        </div>
      ) : null}

      {openQuestion && showGuide ? (
        <div className="qfeedback qfeedback--ok" role="status">
          <div className="qfeedback__head">
            <strong>参考思路（开放题，言之成理即可）</strong>
          </div>
          <ol>
            {openQuestion.guidance.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ol>
          <p>
            <strong>评价要点：</strong>
            {q.explain}
          </p>
        </div>
      ) : null}
    </article>
  )
}

function MultiPicker({
  q,
  picked,
  submitted,
  onSubmit,
}: {
  q: MultiChoice
  picked: string[]
  submitted: boolean
  onSubmit: (r: string[]) => void
}) {
  const [local, setLocal] = useState<string[]>([])
  const current = picked.length > 0 ? picked : local
  return (
    <div>
      <div className="opts" role="group" aria-label="多选选项">
        {q.options.map((o) => {
          const on = current.includes(o.key)
          const isAnswer = submitted && q.answer.includes(o.key)
          const isWrong = submitted && on && !q.answer.includes(o.key)
          return (
            <button
              key={o.key}
              type="button"
              aria-pressed={on}
              className={`opt ${isAnswer ? 'is-answer' : ''} ${isWrong ? 'is-wrong' : ''}`}
              disabled={submitted}
              onClick={() =>
                setLocal((prev) => (prev.includes(o.key) ? prev.filter((k) => k !== o.key) : [...prev, o.key]))
              }
            >
              <span className="opt__key">{on ? '✓' : o.key}</span>
              <span>{o.text}</span>
            </button>
          )
        })}
      </div>
      {!submitted ? (
        <div className="row" style={{ marginTop: 10 }}>
          <button
            type="button"
            className="btn btn--sm"
            disabled={local.length === 0}
            onClick={() => onSubmit(local)}
          >
            提交（可多选）
          </button>
          <span className="xs muted">已选 {local.length} 项</span>
        </div>
      ) : null}
    </div>
  )
}

function SortingBoard({
  q,
  assign,
  setAssign,
  picked,
  setPicked,
  submitted,
  onSubmit,
}: {
  q: SortingQuestion
  assign: Record<string, string>
  setAssign: (m: Record<string, string>) => void
  picked: string | null
  setPicked: (v: string | null) => void
  submitted: boolean
  onSubmit: (m: Record<string, string>) => void
}) {
  const pool = q.items.filter((i) => !assign[i.id])
  const put = (itemId: string, bucket: string) => {
    setAssign({ ...assign, [itemId]: bucket })
    setPicked(null)
  }
  return (
    <div className="sortboard">
      <p className="xs muted">
        操作方式：拖拽条目到下方分类框；触屏或键盘操作时，先点选条目，再点分类框。
      </p>
      <ul className="sortboard__pool" aria-label="待分类条目">
        {pool.length === 0 ? <li className="xs muted">全部条目已分类</li> : null}
        {pool.map((it) => (
          <li key={it.id}>
            <button
              type="button"
              draggable={!submitted}
              className={`chip ${picked === it.id ? 'is-picked' : ''}`}
              aria-pressed={picked === it.id}
              disabled={submitted}
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', it.id)
              }}
              onClick={() => setPicked(picked === it.id ? null : it.id)}
            >
              {it.text}
            </button>
          </li>
        ))}
      </ul>
      <div className="sortboard__buckets">
        {q.buckets.map((b) => {
          const items = q.items.filter((i) => assign[i.id] === b.id)
          return (
            <div
              key={b.id}
              className="bucket"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                const id = e.dataTransfer.getData('text/plain')
                if (id) put(id, b.id)
              }}
            >
              <button
                type="button"
                className="bucket__head"
                onClick={() => {
                  if (picked) put(picked, b.id)
                }}
                disabled={submitted}
                aria-label={`归入 ${b.label}`}
              >
                {b.label}
                {b.hint ? <span className="xs muted"> · {b.hint}</span> : null}
              </button>
              <ul>
                {items.map((it) => {
                  const ok = submitted && it.bucket === b.id
                  return (
                    <li key={it.id}>
                      <button
                        type="button"
                        className={`chip chip--sm ${submitted ? (ok ? 'is-ok' : 'is-err') : ''}`}
                        disabled={submitted}
                        onClick={() => {
                          const next = { ...assign }
                          delete next[it.id]
                          setAssign(next)
                        }}
                        aria-label={`移回待分类：${it.text}`}
                      >
                        {it.text} {submitted ? (ok ? '✓' : '✕') : '×'}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
      {!submitted ? (
        <div className="row" style={{ marginTop: 10 }}>
          <button
            type="button"
            className="btn btn--sm"
            disabled={Object.keys(assign).length !== q.items.length}
            onClick={() => onSubmit(assign)}
          >
            提交分类
          </button>
          <span className="xs muted">
            已分类 {Object.keys(assign).length} / {q.items.length}
          </span>
        </div>
      ) : null}
    </div>
  )
}
