import type { CourseBundle } from '../types'
import { vaccineCourse } from '../vaccine/course'
import { vaccineModules } from '../vaccine/modules'
import { vaccineQuestionBank, vaccineGroups } from '../vaccine/questions'
import {
  vaccineAssessment,
  vaccineCases,
  vaccineChecklist,
  vaccineFrontier,
  vaccineGlossary,
  vaccineHomework,
  vaccineIdeology,
} from '../vaccine/extras'

/** 第8章 疫苗 */
export const vaccineBundle: CourseBundle = {
  course: vaccineCourse,
  modules: vaccineModules,
  cases: vaccineCases,
  questions: vaccineQuestionBank,
  groups: vaccineGroups,
  homeworkTiers: vaccineHomework,
  assessment: vaccineAssessment,
  ideology: vaccineIdeology,
  frontier: vaccineFrontier,
  glossary: vaccineGlossary,
  checklist: vaccineChecklist,
  requiredPages: [
    '/course-08',
    '/course-08/pre-class',
    '/course-08/modules/m1',
    '/course-08/modules/m2',
    '/course-08/modules/m3',
    '/course-08/classroom',
    '/course-08/cases',
    '/course-08/homework',
  ],
}

export default vaccineBundle
