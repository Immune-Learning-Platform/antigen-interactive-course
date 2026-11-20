import type { CourseBundle, ModuleContent, Question } from './types'

export type { CourseBundle }
import { antigenCourse } from './antigen/course'
import { antigenModules } from './antigen/modules'
import { questionBank, questionGroups } from './antigen/questions'
import {
  antigenCases,
  antigenGlossary,
  assessmentDimensions,
  frontierItems,
  homeworkTiers,
  ideologyPoints,
  learningChecklist,
} from './antigen/extras'

/**
 * 课程包（Course Bundle）
 * ---------------------------------------------------------------
 * 新增第 2—8 个课件时：复制 content/<course-id>/ 目录 → 改写四类数据文件
 * → 在下面 courses 数组注册一行即可。页面与组件层无需改动。
 */
export const antigenBundle: CourseBundle = {
  course: antigenCourse,
  modules: antigenModules,
  cases: antigenCases,
  questions: questionBank,
  groups: questionGroups,
  homeworkTiers,
  assessment: assessmentDimensions,
  ideology: ideologyPoints,
  frontier: frontierItems,
  glossary: antigenGlossary,
  checklist: learningChecklist,
}

/**
 * 已交付的课程包
 * courses[0] 恒为第1章（受保护基线，路由挂在站点根路径）；
 * 第2—8章通过 /course-0X/* 路由 + CourseProvider 注入。
 */
/**
 * 已交付课程包（**仅第1章同步加载**）
 * ---------------------------------------------------------------
 * 第1章是受保护基线：它的内容必须同步可用，作为 CourseContext 的默认值。
 * 第2—8章改为按需加载（见 content/registry.ts），避免学生学一章却要下载全部八章的内容。
 */
export const courses: CourseBundle[] = [antigenBundle]
/** 兼容旧代码：默认课程 = 第1章（行为与改造前一致） */
export const activeCourse = courses[0]

/** 学习进度统计口径：完成这些页面即视为“走完主流程” */
export const REQUIRED_PAGES = [
  '/',
  '/pre-class',
  '/modules/m1',
  '/modules/m2',
  '/modules/m3',
  '/classroom',
  '/cases',
  '/homework',
]

/*
 * 查找函数一律基于 activeCourse，而不是写死某个课程包。
 * 否则“换一章只改内容”就不成立：页面会继续显示上一章的数据。
 */
export function getModule(
  id: string | undefined,
  bundle: CourseBundle = antigenBundle,
): ModuleContent | undefined {
  return bundle.modules.find((m) => m.id === id)
}

export function getQuestion(id: string, bundle: CourseBundle = antigenBundle): Question | undefined {
  return bundle.questions[id]
}

export function questionsOf(ids: string[], bundle: CourseBundle = antigenBundle): Question[] {
  return ids.map((id) => bundle.questions[id]).filter(Boolean)
}

/** 安全取题：缺题时返回 undefined，由页面决定如何降级，而不是渲染空白卡片 */
export function findQuestion(id: string, bundle: CourseBundle = antigenBundle): Question | undefined {
  return bundle.questions[id]
}
