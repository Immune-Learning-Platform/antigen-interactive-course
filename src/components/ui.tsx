import { useEffect, useRef, type ReactNode } from 'react'

/* ==========================================================================
   原子组件（可复用）：入场动画 / 标题块 / 卡片 / 提示条 / 标签 / 指标 / 补充知识标注
   ========================================================================== */

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('is-in')
            io.unobserve(el)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  id,
}: {
  eyebrow?: string
  title: string
  intro?: ReactNode
  id?: string
}) {
  return (
    <div className="section-head">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 id={id}>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  )
}

export function Tag({
  children,
  tone = 'mint',
}: {
  children: ReactNode
  tone?: 'mint' | 'blue' | 'gold' | 'orange' | 'line' | 'ok' | 'err'
}) {
  return <span className={`tag tag--${tone}`}>{children}</span>
}

export function Callout({
  children,
  tone = 'default',
  icon = 'ⓘ',
  title,
}: {
  children: ReactNode
  tone?: 'default' | 'warn' | 'gold' | 'blue' | 'ok'
  icon?: string
  title?: string
}) {
  return (
    <div className={`callout ${tone !== 'default' ? `callout--${tone}` : ''}`}>
      <span className="callout__icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        {title ? <strong>{title}</strong> : null}
        {title ? <br /> : null}
        {children}
      </div>
    </div>
  )
}

/** 补充知识标注：把“非课件原文”的内容与课件内容严格区分 */
export function SupplementNote({
  title,
  body,
  source,
}: {
  title: string
  body: string
  source: { label: string; url?: string; note?: string }
}) {
  return (
    <aside className="supplement" aria-label="补充知识（非课件原文）">
      <div className="supplement__head">
        <Tag tone="blue">补充知识 · 非课件原文</Tag>
        <strong>{title}</strong>
      </div>
      <p>{body}</p>
      <p className="xs muted">
        来源：
        {source.url ? (
          <a href={source.url} target="_blank" rel="noreferrer noopener">
            {source.label}
          </a>
        ) : (
          source.label
        )}
        {source.note ? ` · ${source.note}` : ''}
      </p>
    </aside>
  )
}

export function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="metric">
      <span className="metric__value">{value}</span>
      <span className="metric__label">{label}</span>
    </div>
  )
}

export function ProgressBar({
  value,
  label,
  thin,
}: {
  value: number
  label?: string
  thin?: boolean
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div>
      {label ? (
        <div className="row row--between xs muted" style={{ marginBottom: 6 }}>
          <span>{label}</span>
          <span className="mono">{pct}%</span>
        </div>
      ) : null}
      <div
        className={`progress ${thin ? 'progress--thin' : ''}`}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? '完成度'}
      >
        <div className="progress__bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
