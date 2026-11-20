import type { CourseBundle } from '../types'
import { cytokineCourse } from '../cytokine/course'
import { cytokineModules } from '../cytokine/modules'
import { cytokineQuestionBank, cytokineGroups } from '../cytokine/questions'
import {
  cytokineAssessment,
  cytokineCases,
  cytokineChecklist,
  cytokineFrontier,
  cytokineGlossary,
  cytokineHomework,
  cytokineIdeology,
} from '../cytokine/extras'

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

export default cytokineBundle
