import type { CourseBundle } from '../types'
import { boneCourse } from '../bone/course'
import { boneModules } from '../bone/modules'
import { boneQuestionBank, boneGroups } from '../bone/questions'
import {
  boneAssessment,
  boneCases,
  boneChecklist,
  boneFrontier,
  boneGlossary,
  boneHomework,
  boneIdeology,
} from '../bone/extras'

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

export default boneBundle
