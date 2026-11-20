import type { ReactNode } from 'react'

/**
 * 页内锚点跳转（HashRouter 安全版）
 * ---------------------------------------------------------------
 * 在 HashRouter 下直接写 <a href="#section"> 会把 location.hash 改成 "#section"，
 * 导致路由被破坏（页面变成 404）。因此页内跳转统一用本组件：
 * 只做滚动（并保留当前路由），键盘可操作。
 */
export function ScrollLink({
  id,
  children,
  className,
  label,
}: {
  id: string
  children: ReactNode
  className?: string
  label?: string
}) {
  return (
    <button
      type="button"
      className={className ?? 'linkbtn'}
      aria-label={label}
      onClick={() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          el.setAttribute('tabindex', '-1')
          ;(el as HTMLElement).focus({ preventScroll: true })
        }
      }}
    >
      {children}
    </button>
  )
}
