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
import { boneCourse } from './bone/course'
import { boneModules } from './bone/modules'
import { boneQuestionBank, boneGroups } from './bone/questions'
import {
  boneAssessment,
  boneCases,
  boneChecklist,
  boneFrontier,
  boneGlossary,
  boneHomework,
  boneIdeology,
} from './bone/extras'
import { antibodyCourse } from './antibody/course'
import { antibodyModules } from './antibody/modules'
import { antibodyQuestionBank, antibodyGroups } from './antibody/questions'
import {
  antibodyAssessment,
  antibodyCases,
  antibodyChecklist,
  antibodyFrontier,
  antibodyGlossary,
  antibodyHomework,
  antibodyIdeology,
} from './antibody/extras'
import { cytokineCourse } from './cytokine/course'
import { cytokineModules } from './cytokine/modules'
import { cytokineQuestionBank, cytokineGroups } from './cytokine/questions'
import {
  cytokineAssessment,
  cytokineCases,
  cytokineChecklist,
  cytokineFrontier,
  cytokineGlossary,
  cytokineHomework,
  cytokineIdeology,
} from './cytokine/extras'
import { cellularCourse } from './cellular/course'
import { cellularModules } from './cellular/modules'
import { cellularQuestionBank, cellularGroups } from './cellular/questions'
import {
  cellularAssessment,
  cellularCases,
  cellularChecklist,
  cellularFrontier,
  cellularGlossary,
  cellularHomework,
  cellularIdeology,
} from './cellular/extras'
import { hypersensitivityCourse } from './hypersensitivity/course'
import { hypersensitivityModules } from './hypersensitivity/modules'
import { hypersensitivityQuestionBank, hypersensitivityGroups } from './hypersensitivity/questions'
import {
  hypersensitivityAssessment,
  hypersensitivityCases,
  hypersensitivityChecklist,
  hypersensitivityFrontier,
  hypersensitivityGlossary,
  hypersensitivityHomework,
  hypersensitivityIdeology,
} from './hypersensitivity/extras'
import { lateralFlowCourse } from './lateral-flow/course'
import { lateralFlowModules } from './lateral-flow/modules'
import { lateralFlowQuestionBank, lateralFlowGroups } from './lateral-flow/questions'
import {
  lateralFlowAssessment,
  lateralFlowCases,
  lateralFlowChecklist,
  lateralFlowFrontier,
  lateralFlowGlossary,
  lateralFlowHomework,
  lateralFlowIdeology,
} from './lateral-flow/extras'

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
  /** 该课程的“主流程页面”清单（用于进度统计）；缺省回退到全局 REQUIRED_PAGES */
  requiredPages?: string[]
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

/** 第2章 免疫器官 · 骨髓 */
export const boneBundle: CourseBundle = {
  course: boneCourse,
  modules: boneModules,
  cases: boneCases,
  questions: boneQuestionBank,
  groups: boneGroups,
  homeworkTiers: boneHomework,
  assessment: boneAssessment,
  ideology: boneIdeology,
  frontier: boneFrontier,
  glossary: boneGlossary,
  checklist: boneChecklist,
  requiredPages: [
    '/course-02',
    '/course-02/pre-class',
    '/course-02/modules/m1',
    '/course-02/modules/m2',
    '/course-02/modules/m3',
    '/course-02/classroom',
    '/course-02/cases',
    '/course-02/homework',
  ],
}

/**
 * 已交付的课程包
 * courses[0] 恒为第1章（受保护基线，路由挂在站点根路径）；
 * 第2—8章通过 /course-0X/* 路由 + CourseProvider 注入。
 */
/** 第3章 抗体生物学功能 */
export const antibodyBundle: CourseBundle = {
  course: antibodyCourse,
  modules: antibodyModules,
  cases: antibodyCases,
  questions: antibodyQuestionBank,
  groups: antibodyGroups,
  homeworkTiers: antibodyHomework,
  assessment: antibodyAssessment,
  ideology: antibodyIdeology,
  frontier: antibodyFrontier,
  glossary: antibodyGlossary,
  checklist: antibodyChecklist,
  requiredPages: [
    '/course-03',
    '/course-03/pre-class',
    '/course-03/modules/m1',
    '/course-03/modules/m2',
    '/course-03/modules/m3',
    '/course-03/classroom',
    '/course-03/cases',
    '/course-03/homework',
  ],
}

/** 第4章 细胞因子应用 */
export const cytokineBundle: CourseBundle = {
  course: cytokineCourse,
  modules: cytokineModules,
  cases: cytokineCases,
  questions: cytokineQuestionBank,
  groups: cytokineGroups,
  homeworkTiers: cytokineHomework,
  assessment: cytokineAssessment,
  ideology: cytokineIdeology,
  frontier: cytokineFrontier,
  glossary: cytokineGlossary,
  checklist: cytokineChecklist,
  requiredPages: [
    '/course-04',
    '/course-04/pre-class',
    '/course-04/modules/m1',
    '/course-04/modules/m2',
    '/course-04/modules/m3',
    '/course-04/classroom',
    '/course-04/cases',
    '/course-04/homework',
  ],
}

/** 第5章 细胞免疫应答 */
export const cellularBundle: CourseBundle = {
  course: cellularCourse,
  modules: cellularModules,
  cases: cellularCases,
  questions: cellularQuestionBank,
  groups: cellularGroups,
  homeworkTiers: cellularHomework,
  assessment: cellularAssessment,
  ideology: cellularIdeology,
  frontier: cellularFrontier,
  glossary: cellularGlossary,
  checklist: cellularChecklist,
  requiredPages: [
    '/course-05',
    '/course-05/pre-class',
    '/course-05/modules/m1',
    '/course-05/modules/m2',
    '/course-05/modules/m3',
    '/course-05/classroom',
    '/course-05/cases',
    '/course-05/homework',
  ],
}

/** 第6章 I型超敏反应 */
export const hypersensitivityBundle: CourseBundle = {
  course: hypersensitivityCourse,
  modules: hypersensitivityModules,
  cases: hypersensitivityCases,
  questions: hypersensitivityQuestionBank,
  groups: hypersensitivityGroups,
  homeworkTiers: hypersensitivityHomework,
  assessment: hypersensitivityAssessment,
  ideology: hypersensitivityIdeology,
  frontier: hypersensitivityFrontier,
  glossary: hypersensitivityGlossary,
  checklist: hypersensitivityChecklist,
  requiredPages: [
    '/course-06',
    '/course-06/pre-class',
    '/course-06/modules/m1',
    '/course-06/modules/m2',
    '/course-06/modules/m3',
    '/course-06/classroom',
    '/course-06/cases',
    '/course-06/homework',
  ],
}

/** 第7章 免疫层析试纸条技术 */
export const lateralFlowBundle: CourseBundle = {
  course: lateralFlowCourse,
  modules: lateralFlowModules,
  cases: lateralFlowCases,
  questions: lateralFlowQuestionBank,
  groups: lateralFlowGroups,
  homeworkTiers: lateralFlowHomework,
  assessment: lateralFlowAssessment,
  ideology: lateralFlowIdeology,
  frontier: lateralFlowFrontier,
  glossary: lateralFlowGlossary,
  checklist: lateralFlowChecklist,
  requiredPages: [
    '/course-07',
    '/course-07/pre-class',
    '/course-07/modules/m1',
    '/course-07/modules/m2',
    '/course-07/modules/m3',
    '/course-07/classroom',
    '/course-07/cases',
    '/course-07/homework',
  ],
}

export const courses: CourseBundle[] = [
  antigenBundle,
  boneBundle,
  antibodyBundle,
  cytokineBundle,
  cellularBundle,
  hypersensitivityBundle,
  lateralFlowBundle,
]
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
