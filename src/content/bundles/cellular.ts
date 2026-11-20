import type { CourseBundle } from '../types'
import { cellularCourse } from '../cellular/course'
import { cellularModules } from '../cellular/modules'
import { cellularQuestionBank, cellularGroups } from '../cellular/questions'
import {
  cellularAssessment,
  cellularCases,
  cellularChecklist,
  cellularFrontier,
  cellularGlossary,
  cellularHomework,
  cellularIdeology,
} from '../cellular/extras'

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

export default cellularBundle
