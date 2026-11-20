import { createContext, useContext, useId, useState, type ReactNode } from 'react'

/* ==========================================================================
   专业术语悬停解释（Glossary）
   —— 桌面端 hover 显示，键盘 focus 显示，触屏点击切换；Esc / 失焦关闭。
   ========================================================================== */

export interface GlossaryTerm {
  term: string
  en: string
  def: string
}

const GlossaryContext = createContext<GlossaryTerm[]>([])

export function GlossaryProvider({
  terms,
  children,
}: {
  terms: GlossaryTerm[]
  children: ReactNode
}) {
  return <GlossaryContext.Provider value={terms}>{children}</GlossaryContext.Provider>
}

export function useGlossary() {
  return useContext(GlossaryContext)
}

export function Term({ children, name }: { children?: ReactNode; name?: string }) {
  const terms = useGlossary()
  const [open, setOpen] = useState(false)
  const id = useId()
  const label = name ?? (typeof children === 'string' ? children : '')
  const hit = terms.find((t) => t.term === label || t.en.split(/[ (（]/)[0] === label)

  if (!hit) return <>{children ?? label}</>

  return (
    <span className="term-wrap">
      <button
        type="button"
        className="term"
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false)
        }}
      >
        {children ?? hit.term}
      </button>
      {open ? (
        <span className="term__pop" role="tooltip" id={id}>
          <span className="term__en">
            {hit.en}
          </span>
          <span className="term__def">{hit.def}</span>
        </span>
      ) : null}
    </span>
  )
}
