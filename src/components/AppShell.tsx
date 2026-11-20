import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { activeCourse, REQUIRED_PAGES } from '../content'
import { useStats } from './progress'
import { ProgressBar } from './ui'

/* ==========================================================================
   全站骨架：双层导航（主流程 + 拓展工具）+ 面包屑 + 移动端抽屉 + 学习进度
   ========================================================================== */

const PRIMARY = ['home', 'pre', 'modules', 'classroom', 'cases', 'homework']
const UTILITY = ['assessment', 'ideology', 'frontier', 'qr']

export function AppShell() {
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [moduleOpen, setModuleOpen] = useState(false)
  const [progressPct, setProgressPct] = useState(0)
  const stats = useStats(REQUIRED_PAGES)

  const nav = activeCourse.course.nav
  const primary = PRIMARY.map((id) => nav.find((n) => n.id === id)).filter(Boolean)
  const utility = UTILITY.map((id) => nav.find((n) => n.id === id)).filter(Boolean)

  // 路由变化：关闭抽屉/下拉、回到顶部、滚动到锚点
  useEffect(() => {
    setDrawerOpen(false)
    setModuleOpen(false)
    const { hash } = location
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        window.setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname, location.hash])

  // 顶部阅读进度
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgressPct(max <= 0 ? 0 : Math.min(1, doc.scrollTop / max))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false)
        setModuleOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const crumbs = useMemo(() => {
    const path = location.pathname
    if (path === '/' || path === '') return [{ label: '首页', to: '/' }]
    const seg = path.split('/')[1]
    const top = nav.find((n) => n.to === `/${seg}`)
    const list: { label: string; to: string }[] = [{ label: '首页', to: '/' }]
    if (top) list.push({ label: top.label, to: top.to })
    if (seg === 'modules') {
      const sub = path.split('/')[2]
      const child = top?.children?.find((c) => c.to === `/modules/${sub}`)
      if (child) list.push({ label: child.label, to: child.to })
    }
    return list
  }, [location.pathname, nav])

  const course = activeCourse.course

  return (
    <div className="app">
      <button
        type="button"
        className="skip-link"
        onClick={() => {
          const main = document.getElementById('main')
          if (main) {
            main.setAttribute('tabindex', '-1')
            main.focus()
            main.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }}
      >
        跳到主要内容
      </button>
      <div className="readbar" aria-hidden="true">
        <div className="readbar__bar" style={{ transform: `scaleX(${progressPct})` }} />
      </div>

      <header className="site-header">
        <div className="utilbar">
          <div className="container utilbar__inner">
            <Link to="/" className="brand" aria-label={`${course.title} 互动学习资源首页`}>
              <span className="brand__mark" aria-hidden="true">
                <svg viewBox="0 0 40 40" width="30" height="30" aria-hidden="true">
                  <rect width="40" height="40" rx="11" fill="#0b3b33" />
                  <circle cx="15" cy="20" r="6.5" fill="none" stroke="#8fc9ae" strokeWidth="2.2" />
                  <path d="M22 11v6l5 5M22 29v-6l5-5" fill="none" stroke="#c9a227" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </span>
              <span className="brand__text">
                <strong>兽医免疫学</strong>
                <span className="xs muted">
                  {course.chapter} · {course.title}互动学习资源
                </span>
              </span>
            </Link>

            <div className="utilbar__right">
              <span className="progressPill" title="本机浏览器记录">
                学习进度 <b className="mono">{stats.pagePct}%</b>
              </span>
              {utility.map((item) =>
                item ? (
                  <NavLink key={item.id} to={item.to} className="utilbar__link">
                    {item.label}
                  </NavLink>
                ) : null,
              )}
              <button
                type="button"
                className="hamburger"
                aria-expanded={drawerOpen}
                aria-controls="mobile-drawer"
                onClick={() => setDrawerOpen((v) => !v)}
              >
                <span className="visually-hidden">打开导航菜单</span>
                <span className="hamburger__bars" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="navbar">
          <div className="container navbar__inner">
            <nav className="mainnav" aria-label="主导航">
              {primary.map((item) => {
                if (!item) return null
                if (item.children) {
                  return (
                    <div key={item.id} className="mainnav__group">
                      <button
                        type="button"
                        className={`mainnav__link ${location.pathname.startsWith(item.to) ? 'is-active' : ''}`}
                        aria-expanded={moduleOpen}
                        aria-haspopup="true"
                        onClick={() => setModuleOpen((v) => !v)}
                      >
                        {item.label}
                        <span aria-hidden="true">▾</span>
                      </button>
                      {moduleOpen ? (
                        <div className="dropdown" role="menu">
                          <Link to={item.to} role="menuitem" className="dropdown__item">
                            <strong>模块总览</strong>
                            <span className="xs muted">{item.desc}</span>
                          </Link>
                          {item.children.map((c) => (
                            <Link key={c.to} to={c.to} role="menuitem" className="dropdown__item">
                              <strong>{c.label}</strong>
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )
                }
                return (
                  <NavLink
                    key={item.id}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => `mainnav__link ${isActive ? 'is-active' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                )
              })}
            </nav>
            <span className="navbar__hint xs muted">课前 · 课中 · 课后一体化</span>
          </div>
        </div>
      </header>

      <nav className="breadcrumb" aria-label="面包屑导航">
        <div className="container">
          <ol>
            {crumbs.map((c, i) => (
              <li key={c.to + i}>
                {i === crumbs.length - 1 ? (
                  <span aria-current="page">{c.label}</span>
                ) : (
                  <Link to={c.to}>{c.label}</Link>
                )}
                {i < crumbs.length - 1 ? <span className="breadcrumb__sep" aria-hidden="true">/</span> : null}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <main id="main" className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            <div>
              <h4>关于本资源</h4>
              <p className="small">
                本章互动学习资源依据《兽医免疫学》课堂教学课件重构，服务“课前—课中—课后—评价”一体化学习。
                站点为静态资源，学习进度保存在本机浏览器，不上传服务器。
              </p>
              <p className="xs" style={{ marginTop: 10 }}>
                科学素材说明：站内图示与三维模型均为原创矢量/程序化绘制；超出课件原文的内容以“补充知识”标注并给出可核验来源。
              </p>
            </div>
            <div>
              <h4>本章页面</h4>
              <ul className="small">
                {nav.slice(0, 6).map((n) => (
                  <li key={n.id}>
                    <Link to={n.to}>{n.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>学习工具</h4>
              <ul className="small">
                <li>
                  <Link to="/assessment">学习评价与前后测</Link>
                </li>
                <li>
                  <Link to="/qr">扫码在手机上学习</Link>
                </li>
                <li>
                  <Link to="/ideology">课程思政</Link>
                </li>
                <li>
                  <Link to="/frontier">学科前沿</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__legal">
            <span>© 2026 兽医免疫学 · 互动学习资源</span>
            <span>内容仅供教学使用 · 沿用教材与公开文献结论，不构成临床诊疗建议</span>
          </div>
        </div>
      </footer>

      {/* 移动端抽屉 */}
      <div
        id="mobile-drawer"
        className={`drawer ${drawerOpen ? 'is-open' : ''}`}
        aria-hidden={drawerOpen ? undefined : true}
        role="dialog"
        aria-label="导航菜单"
      >
        <div className="drawer__head row row--between">
          <strong>全部栏目</strong>
          <button type="button" className="btn btn--quiet btn--sm" onClick={() => setDrawerOpen(false)}>
            关闭
          </button>
        </div>
        <div className="drawer__body">
          <p className="xs muted" style={{ marginBottom: 8 }}>
            学习进度 {stats.pagePct}%
          </p>
          <ProgressBar value={stats.pagePct} thin />
          <h4 className="drawer__title">学习流程</h4>
          <ul>
            {primary.map((n) =>
              n ? (
                <li key={n.id}>
                  <NavLink to={n.to} end={n.to === '/'}>
                    {n.label}
                  </NavLink>
                  {n.children ? (
                    <ul className="drawer__sub">
                      {n.children.map((c) => (
                        <li key={c.to}>
                          <NavLink to={c.to}>{c.label}</NavLink>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ) : null,
            )}
          </ul>
          <h4 className="drawer__title">拓展与工具</h4>
          <ul>
            {utility.map((n) =>
              n ? (
                <li key={n.id}>
                  <NavLink to={n.to}>{n.label}</NavLink>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      </div>
      {drawerOpen ? <div className="drawer__scrim" onClick={() => setDrawerOpen(false)} aria-hidden="true" /> : null}
    </div>
  )
}
