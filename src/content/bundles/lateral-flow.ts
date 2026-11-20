import type { CourseBundle } from '../types'
import { lateralFlowCourse } from '../lateral-flow/course'
import { lateralFlowModules } from '../lateral-flow/modules'
import { lateralFlowQuestionBank, lateralFlowGroups } from '../lateral-flow/questions'
import {
  lateralFlowAssessment,
  lateralFlowCases,
  lateralFlowChecklist,
  lateralFlowFrontier,
  lateralFlowGlossary,
  lateralFlowHomework,
  lateralFlowIdeology,
} from '../lateral-flow/extras'

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

export default lateralFlowBundle
