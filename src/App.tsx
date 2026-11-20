import { useEffect, useState, type ReactNode } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { GlossaryProvider } from './components/glossary'
import { ProgressProvider } from './components/progress'
import { CourseProvider } from './course-context'
import { activeCourse, type CourseBundle } from './content'
import { chapterRegistry, type ChapterEntry } from './content/registry'
import Home from './pages/Home'
import PreClass from './pages/PreClass'
import Modules from './pages/Modules'
import ModuleDetail from './pages/ModuleDetail'
import Classroom from './pages/Classroom'
import Cases from './pages/Cases'
import Homework from './pages/Homework'
import Assessment from './pages/Assessment'
import Ideology from './pages/Ideology'
import Frontier from './pages/Frontier'
import QrShare from './pages/QrShare'
import NotFound from './pages/NotFound'
import CoursesIndex from './pages/CoursesIndex'

/**
 * 路由采用 HashRouter：
 * 静态托管（GitHub Pages 等）下任意深链接刷新都不会 404，无需服务端重写规则。
 *
 * 路径约定（保护第 1 章的既有网址，绝不改动）：
 *  - 第1章 抗原：站点根路径 `/#/`、`/#/modules/...`（原网址与二维码保持不变）
 *  - 第2—8章：`/#/course-0X/...`，课程内容**按需加载**（见 content/registry.ts）
 *
 * 注意：AppShell 必须位于 Chapter 内部——否则导航栏读到的是默认课程（第1章），
 * 导致第2章的菜单显示成第1章的栏目与链接。
 */

/** 为一个课程包提供上下文（术语表 + 独立进度存储键 + 课程数据） */
function Chapter({ bundle, children }: { bundle: CourseBundle; children: ReactNode }) {
  return (
    <GlossaryProvider terms={bundle.glossary}>
      <ProgressProvider storageKey={`vei.progress.${bundle.course.id}.v1`}>
        <CourseProvider bundle={bundle}>{children}</CourseProvider>
      </ProgressProvider>
    </GlossaryProvider>
  )
}

/** 一个课程包的 11 个子页面（相对路径，依附于所属章节前缀） */
function courseRoutes() {
  return (
    <>
      <Route index element={<Home />} />
      <Route path="pre-class" element={<PreClass />} />
      <Route path="modules" element={<Modules />} />
      <Route path="modules/:moduleId" element={<ModuleDetail />} />
      <Route path="classroom" element={<Classroom />} />
      <Route path="cases" element={<Cases />} />
      <Route path="homework" element={<Homework />} />
      <Route path="assessment" element={<Assessment />} />
      <Route path="ideology" element={<Ideology />} />
      <Route path="frontier" element={<Frontier />} />
      <Route path="qr" element={<QrShare />} />
    </>
  )
}

/**
 * 懒加载章节：先按需 import 该章的内容包，再渲染整章。
 * 加载中显示一个简洁的占位，加载失败给出可操作提示（不白屏）。
 */
function LazyChapter({ entry }: { entry: ChapterEntry }) {
  const [bundle, setBundle] = useState<CourseBundle | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let alive = true
    setBundle(null)
    setError(false)
    entry
      .load()
      .then((mod) => {
        if (alive) setBundle(mod.default)
      })
      .catch(() => {
        if (alive) setError(true)
      })
    return () => {
      alive = false
    }
  }, [entry])

  if (error) {
    return (
      <div className="container section">
        <div className="callout callout--warn">
          <span className="callout__icon" aria-hidden="true">
            ⚠️
          </span>
          <div>
            <strong>本章内容加载失败</strong>
            <br />
            可能是网络中断。请刷新页面重试；若持续失败，请检查网络连接后重新打开链接。
          </div>
        </div>
      </div>
    )
  }

  if (!bundle) {
    return (
      <div className="container section" aria-live="polite">
        <p className="muted small">正在加载本章内容…</p>
      </div>
    )
  }

  return (
    <Chapter bundle={bundle}>
      <AppShell />
    </Chapter>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* ---------- 第1章 抗原：根路径，同步加载，保持原网址与行为 ---------- */}
        <Route
          path="/"
          element={
            <Chapter bundle={activeCourse}>
              <AppShell />
            </Chapter>
          }
        >
          {courseRoutes()}
        </Route>

        {/* ---------- 第2—8章：按需加载 ---------- */}
        {chapterRegistry.map((entry) => (
          <Route key={entry.segment} path={entry.segment} element={<LazyChapter entry={entry} />}>
            {courseRoutes()}
          </Route>
        ))}

        {/* ---------- 系列课程总入口（不占用第1章根路径） ---------- */}
        <Route path="courses" element={<CoursesIndex />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}
