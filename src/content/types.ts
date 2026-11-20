/**
 * 课程内容数据模型（8 个课件通用）
 * ------------------------------------------------------------------
 * 每一章课件 = 一个 content/<course-id>/ 目录，包含：
 *   course.ts     课程元信息、导航、首页分区、路径、知识图谱
 *   modules.ts    模块学习正文（章节页）
 *   questions.ts  全部题目（课前预习 / 随堂 / 课堂互动 / 课后作业）
 *   cases.ts      案例教学
 *   extras.ts     课程思政 / 学科前沿 / 学习评价 / 术语表
 * 页面组件只负责“渲染 + 交互”，不硬编码任何学科知识。
 */

export type ModuleRole = '基础' | '难点' | '重点' | '应用'

export interface SourceRef {
  /** 展示用简称，如 “Janeway's Immunobiology, 10e · Glossary” */
  label: string
  /** 可核验链接（可选） */
  url?: string
  /** 与课件原文的关系说明 */
  note?: string
}

/** 标注“非课件原文”的补充知识，与课件内容严格区分 */
export interface Supplement {
  title: string
  body: string
  source: SourceRef
}

/**
 * 视频 / 动画素材登记项
 * available=false 表示“尚未完成核验与去标识化”，此时页面只显示说明，不出现空按钮。
 */
export interface MediaClip {
  id: string
  kind: 'video' | 'animation'
  title: string
  /** 相对站点根目录的路径，如 './media/xxx.mp4'；未核验前留空 */
  src?: string
  poster?: string
  duration?: string
  /** 这段素材讲什么、对应哪个知识点 */
  caption: string
  /** 来源与处置（匿名/版权/核验状态） */
  provenance: string
  available: boolean
}

export interface KnowledgeCard {
  title: string
  en?: string
  body: string
  tags?: string[]
}

export interface ModuleSection {
  id: string
  title: string
  eyebrow?: string
  paragraphs?: string[]
  cards?: KnowledgeCard[]
  points?: { label: string; text: string }[]
  supplement?: Supplement
  /** 该小节内嵌的随堂小测题目 id */
  quizIds?: string[]
  /** 该小节需要渲染的可视化组件 key（由 pages/Modules 分发） */
  visual?: VisualKey
  /** 该小节的视频/动画素材（含未核验条目，如实标注） */
  media?: MediaClip[]
  note?: string
}

export type VisualKey =
  // —— 第1章 抗原 ——
  | 'two-properties'
  | 'concept-timeline'
  | 'epitope-lab'
  | 'epitope-types'
  | 'response-branch'
  | 'ptm-mhc'
  | 'pathogen-board'
  | 'structure-lab'
  | 'recombinant-pipeline'
  | 'ai-structure'
  // —— 第2章 骨髓 ——
  | 'bone-structure'
  | 'bone-timeline'
  | 'stem-cell-relations'
  | 'hematopoiesis-tree'
  | 'lymphocyte-lineage'
  | 'bone-dual-role'
  | 'transplant-flow'
  | 'msc-repair'
  | 'organoid-frontier'
  // —— 第3章 抗体 ——
  | 'antibody-structure'
  | 'antibody-basic'
  | 'jchain-secretory'
  | 'antibody-hydrolysis'
  | 'antibody-functions'
  | 'adcc-vs-cdc'
  | 'antiserum-production'
  | 'antibody-industry'
  | 'antibody-applications'

export interface ModuleContent {
  id: string
  no: number
  title: string
  en: string
  role: ModuleRole
  minutes: number
  summary: string
  /** 对应课件页码，便于教师核对（不对外展示为“PPT 页码”？保留，便于教学对照） */
  slides: string
  objectives: string[]
  sections: ModuleSection[]
  takeaways: string[]
}

/* ---------------------------------- 题目 --------------------------------- */

export type QuestionType = 'single' | 'multi' | 'judge' | 'ordering' | 'sorting' | 'open'

interface QuestionBase {
  id: string
  type: QuestionType
  stem: string
  /** 情境/任务说明（先情境、后问题） */
  scenario?: string
  explain: string
  /** 机制解释之后的知识总结 */
  summary?: string
  /** 关联模块锚点，用于“去复习” */
  ref?: { moduleId: string; label: string; anchor?: string }
  tags?: string[]
  supplement?: SourceRef
}

export interface SingleChoice extends QuestionBase {
  type: 'single'
  options: { key: string; text: string }[]
  answer: string
}

export interface MultiChoice extends QuestionBase {
  type: 'multi'
  options: { key: string; text: string }[]
  answer: string[]
}

export interface JudgeQuestion extends QuestionBase {
  type: 'judge'
  answer: boolean
}

export interface OrderingQuestion extends QuestionBase {
  type: 'ordering'
  /** 已按正确顺序给出；渲染时打乱 */
  items: { id: string; text: string; hint?: string }[]
}

export interface SortingQuestion extends QuestionBase {
  type: 'sorting'
  buckets: { id: string; label: string; hint?: string }[]
  items: { id: string; text: string; bucket: string }[]
}

export interface OpenQuestion extends QuestionBase {
  type: 'open'
  /** 参考思路（分点） */
  guidance: string[]
  minLength?: number
}

export type Question =
  | SingleChoice
  | MultiChoice
  | JudgeQuestion
  | OrderingQuestion
  | SortingQuestion
  | OpenQuestion

/* ---------------------------------- 案例 --------------------------------- */

export interface TeachingCase {
  id: string
  title: string
  en?: string
  badge: string
  /** 真实问题 */
  background: string
  /** 关键事实（可核验，注明来源） */
  facts: { label: string; text: string }[]
  /** 科学分析：分点 */
  analysis: { title: string; body: string }[]
  /** 知识应用：任务 */
  task: string
  /** 结果反馈：判据 */
  feedback: string[]
  sources: SourceRef[]
  /** 与哪些模块相关 */
  moduleIds: string[]
  /** 明确声明“非虚构病例”的措辞 */
  authenticity: string
}

/* --------------------------------- 作业/评价 ------------------------------ */

export interface HomeworkTier {
  id: string
  title: string
  level: '基础' | '提升' | '拓展'
  minutes: number
  intro: string
  questionIds: string[]
  deliverable?: string
}

export interface AssessmentDimension {
  id: string
  title: string
  weight: string
  basis: string
  indicators: string[]
  source: '本地记录' | '课堂记录' | '作业记录'
}

export interface IdeologyPoint {
  id: string
  title: string
  en?: string
  hook: string
  body: string[]
  /** 与知识点的结合方式 */
  link: string
  /** 反思/讨论题 */
  reflection: string
}

export interface FrontierItem {
  id: string
  title: string
  en?: string
  tag: string
  body: string
  /** 与本章知识的连接 */
  link: string
  source: SourceRef
  level: '课件原文' | '课件延伸' | '补充阅读'
}

/* ------------------------------- 课程元信息 ------------------------------- */

export interface PathwayStep {
  id: string
  stage: '课前' | '课中' | '课后'
  title: string
  detail: string
  to: string
  minutes?: number
}

export interface GraphNode {
  id: string
  label: string
  en?: string
  /** 层级：1 = 本章主题，2 = 三大主线，3 = 知识点 */
  level: 1 | 2 | 3
  to?: string
  /** 重点/难点标记 */
  flag?: '重点' | '难点'
}

export interface CourseNavItem {
  id: string
  label: string
  to: string
  /** 二级导航 */
  children?: { label: string; to: string }[]
  desc: string
}

/** 单个页面的标题区文案（数据化，换章节时随内容一起替换） */
export interface PageCopy {
  eyebrow: string
  title: string
  lead: string
  en?: string
}

/** 页面文案集合：键名对应页面标识 */
export interface PageCopyMap {
  preClass: PageCopy
  modules: PageCopy
  classroom: PageCopy
  cases: PageCopy
  homework: PageCopy
  assessment: PageCopy
  ideology: PageCopy
  frontier: PageCopy
  qr: PageCopy
}

/** 课堂互动任务的“学生操作”载体类型 */
export type TaskInteraction =
  | { kind: 'structure-lab'; goals: { id: string; label: string }[]; doneHint?: string }
  | { kind: 'question'; questionId: string; missingLabel?: string }
  | { kind: 'question-set'; questionIds: string[] }
  | { kind: 'binding-simulator' }

export interface ClassroomTask {
  id: string
  title: string
  scenario: string
  /** 机制解释段落；`**文字**` 表示加粗 */
  mechanism: string[]
  summary: string
  interaction: TaskInteraction
}

export interface CourseConfig {
  id: string
  /** 例如 “第一章第一节” */
  chapter: string
  title: string
  en: string
  /** 首页副标题：一句话主题 */
  tagline: string
  /** 首页导语 */
  lead: string
  /** 首屏的三个关键数字 */
  stats: { value: string; label: string }[]
  keywords: string[]
  /** 各页面标题区文案（避免页面里写死上一章的话术） */
  pageCopy: PageCopyMap
  /** 课堂互动任务（6 个左右，按本章内容定义） */
  classroomTasks: ClassroomTask[]
  objectives: {
    knowledge: string[]
    ability: string[]
    value: string[]
    /** 达标线 */
    standard: string
  }
  keyPoints: string[]
  hardPoints: string[]
  nav: CourseNavItem[]
  pathway: PathwayStep[]
  graph: { nodes: GraphNode[]; links: [string, string][] }
  /** 课前学习 */
  preClass: {
    scenario: {
      title: string
      en?: string
      body: string[]
      questions: string[]
      visual: VisualKey
      /** 情境素材（视频未核验时只登记不投放） */
      media?: MediaClip[]
    }
    /** 预习问题（来自 questions.ts 的 id） */
    taskIds: string[]
    /** 预习知识卡 */
    cards: KnowledgeCard[]
    /** 承接旧知 */
    prior: { subject: string; text: string }[]
  }
  /** 首页“学完能做什么” */
  outcomes: { title: string; body: string }[]
  /** 课程定位（教材类比） */
  positioning: { left: string; right: string; current?: boolean }[]
}
