import type { CourseConfig, ModuleContent, Question, TeachingCase } from './types'
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
export interface CourseBundle {
  course: CourseConfig
  modules: ModuleContent[]
  cases: TeachingCase[]
  questions: Record<string, Question>
  groups: typeof questionGroups
  homeworkTiers: typeof homeworkTiers
  assessment: typeof assessmentDimensions
  ideology: typeof ideologyPoints
  frontier: typeof frontierItems
  glossary: typeof antigenGlossary
  /** 学习任务清单（可打卡） */
  checklist: string[]
}

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

/** 当前启用的课程（本次只交付第 1 个课件） */
export const courses: CourseBundle[] = [antigenBundle]
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

export function getModule(id: string | undefined): ModuleContent | undefined {
  return antigenBundle.modules.find((m) => m.id === id)
}

export function getQuestion(id: string): Question | undefined {
  return antigenBundle.questions[id]
}

export function questionsOf(ids: string[]): Question[] {
  return ids.map((id) => antigenBundle.questions[id]).filter(Boolean)
}
