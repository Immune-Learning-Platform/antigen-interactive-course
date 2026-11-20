import type { CourseBundle } from '../types'
import { hypersensitivityCourse } from '../hypersensitivity/course'
import { hypersensitivityModules } from '../hypersensitivity/modules'
import { hypersensitivityQuestionBank, hypersensitivityGroups } from '../hypersensitivity/questions'
import {
  hypersensitivityAssessment,
  hypersensitivityCases,
  hypersensitivityChecklist,
  hypersensitivityFrontier,
  hypersensitivityGlossary,
  hypersensitivityHomework,
  hypersensitivityIdeology,
} from '../hypersensitivity/extras'

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

export default hypersensitivityBundle
