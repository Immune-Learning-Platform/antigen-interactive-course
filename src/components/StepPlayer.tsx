import { useEffect, useRef, useState, type ReactNode } from 'react'

/* ==========================================================================
   分步动画播放器（可复用）
   —— 播放 / 暂停 / 重播 / 0.5×–2× 变速 / 步骤跳转 / 键盘可操作
   画面由 render 回调按“当前步骤”绘制，便于每章替换内容
   ========================================================================== */

export interface Step {
  title: string
  desc: string
}

export function StepPlayer({
  steps,
  render,
  baseMs = 3200,
  ariaLabel,
}: {
  steps: Step[]
  render: (active: number) => ReactNode
  baseMs?: number
  ariaLabel: string
}) {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (!playing) return
    if (active >= steps.length - 1) {
      setPlaying(false)
      return
    }
    timer.current = window.setTimeout(() => setActive((a) => Math.min(a + 1, steps.length - 1)), baseMs / speed)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [playing, active, speed, steps.length, baseMs])

  const go = (next: number) => {
    setActive(Math.max(0, Math.min(steps.length - 1, next)))
  }

  return (
    <div className="stepPlayer" aria-label={ariaLabel} role="group">
      <div className="stepPlayer__stage">{render(active)}</div>
      <div className="stepPlayer__controls">
        <button
          type="button"
          className="btn btn--sm"
          onClick={() => {
            if (active >= steps.length - 1) setActive(0)
            setPlaying((p) => !p)
          }}
        >
          {playing ? '⏸ 暂停' : '▶ 播放'}
        </button>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={() => {
            setPlaying(false)
            setActive(0)
          }}
        >
          ↺ 重播
        </button>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          aria-label="上一步"
          onClick={() => go(active - 1)}
          disabled={active === 0}
        >
          ‹ 上一步
        </button>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          aria-label="下一步"
          onClick={() => go(active + 1)}
          disabled={active === steps.length - 1}
        >
          下一步 ›
        </button>
        <label className="xs muted row" style={{ gap: 6 }}>
          速度
          <select
            className="select"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            aria-label="播放速度"
          >
            <option value={0.5}>0.5×</option>
            <option value={1}>1×</option>
            <option value={1.5}>1.5×</option>
            <option value={2}>2×</option>
          </select>
        </label>
        <span className="xs muted mono" aria-live="polite">
          {active + 1} / {steps.length}
        </span>
      </div>
      <ol className="stepPlayer__steps">
        {steps.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              className={`stepChip ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}
              aria-current={i === active}
              onClick={() => {
                setPlaying(false)
                go(i)
              }}
            >
              <span className="stepChip__no">{i + 1}</span>
              <span className="stepChip__title">{s.title}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="stepPlayer__desc" aria-live="polite">
        <strong>{steps[active]?.title}：</strong>
        {steps[active]?.desc}
      </p>
    </div>
  )
}
