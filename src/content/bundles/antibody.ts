import type { CourseBundle } from '../types'
import { antibodyCourse } from '../antibody/course'
import { antibodyModules } from '../antibody/modules'
import { antibodyQuestionBank, antibodyGroups } from '../antibody/questions'
import {
  antibodyAssessment,
  antibodyCases,
  antibodyChecklist,
  antibodyFrontier,
  antibodyGlossary,
  antibodyHomework,
  antibodyIdeology,
} from '../antibody/extras'

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

export default antibodyBundle
