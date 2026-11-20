import type { ReactNode } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { GlossaryProvider } from './components/glossary'
import { ProgressProvider } from './components/progress'
import { CourseProvider } from './course-context'
import { activeCourse, boneBundle, type CourseBundle } from './content'
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

/**
 * 路由采用 HashRouter：
 * 静态托管（GitHub Pages 等）下任意深链接刷新都不会 404，无需服务端重写规则。
 *
 * 路径约定（保护第 1 章的既有网址，绝不改动）：
 *  - 第1章 抗原：站点根路径 `/#/`、`/#/modules/...`（原网址与二维码保持不变）
 *  - 第2—8章：`/#/course-0X/...`，通过 CourseProvider 注入各自课程包
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

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* ---------- 第1章 抗原：根路径，保持原网址 ---------- */}
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

        {/* ---------- 第2章 免疫器官 · 骨髓 ---------- */}
        <Route
          path="course-02"
          element={
            <Chapter bundle={boneBundle}>
              <AppShell />
            </Chapter>
          }
        >
          {courseRoutes()}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}
