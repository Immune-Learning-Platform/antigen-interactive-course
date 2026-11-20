import { HashRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { GlossaryProvider } from './components/glossary'
import { ProgressProvider } from './components/progress'
import { activeCourse } from './content'
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
 * 稳定性优先于“漂亮 URL”——二维码指向站点根地址即可长期使用。
 */
export default function App() {
  return (
    <GlossaryProvider terms={activeCourse.glossary}>
      <ProgressProvider>
        <HashRouter>
          <Routes>
            <Route element={<AppShell />}>
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
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </HashRouter>
      </ProgressProvider>
    </GlossaryProvider>
  )
}
