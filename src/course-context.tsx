import { createContext, useContext, type ReactNode } from 'react'
import { antigenBundle, type CourseBundle } from './content'

/**
 * 当前课程上下文
 * ---------------------------------------------------------------
 * 设计要点（为满足“绝对不能破坏第 1 个网站”这条最高优先级）：
 *  - 默认值就是第 1 章（antigenBundle），因此**未包裹 Provider 时行为与改造前完全一致**；
 *  - 第 1 章的页面只需把 `activeCourse` 换成 `useCourse()`，取到的仍是同一对象；
 *  - 第 2—8 章通过各自的 Provider 注入自己的课程包，页面组件无需复制。
 */
const CourseContext = createContext<CourseBundle>(antigenBundle)

export function CourseProvider({ bundle, children }: { bundle: CourseBundle; children: ReactNode }) {
  return <CourseContext.Provider value={bundle}>{children}</CourseContext.Provider>
}

/** 取当前课程包（含 course / modules / questions / groups / cases 等全部内容） */
export function useCourse(): CourseBundle {
  return useContext(CourseContext)
}
