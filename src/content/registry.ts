import type { CourseBundle } from './types'

/**
 * 章节注册表（按需加载）
 * ---------------------------------------------------------------
 * 第 1 章不从注册表加载——它在 content/index.ts 中同步提供，作为 CourseContext 的默认值，
 * 以保证受保护基线在任何情况下都不受本机制影响。
 *
 * 第 2—8 章通过动态 import 按需加载，避免学生只学一章却要下载全部八章的内容。
 */
export interface ChapterEntry {
  /** 路由前缀，如 'course-02' */
  segment: string
  /** 章节标识，用于进度存储 key 与二维码 */
  id: string
  /** 章节标题（用于课程总入口展示） */
  title: string
  /** 一句话简介（用于课程总入口展示） */
  tagline: string
  /** 来源课件，便于教学对照 */
  source: string
  load: () => Promise<{ default: CourseBundle }>
}

export const chapterRegistry: ChapterEntry[] = [
  {
    segment: 'course-02',
    id: 'bone',
    title: '免疫器官 · 骨髓',
    tagline: '骨骼支撑运动，骨髓孕育免疫',
    source: '2.骨骼.pptx（15 页）',
    load: () => import('./bundles/bone'),
  },
  {
    segment: 'course-03',
    id: 'antibody',
    title: '抗体生物学功能',
    tagline: '精准识别 · 协同御敌',
    source: '3.抗体.pptx（21 页）',
    load: () => import('./bundles/antibody'),
  },
  {
    segment: 'course-04',
    id: 'cytokine',
    title: '细胞因子应用',
    tagline: '信号传递 · 协同调控',
    source: '4.细胞因子.pptx（18 页）',
    load: () => import('./bundles/cytokine'),
  },
  {
    segment: 'course-05',
    id: 'cellular',
    title: '细胞免疫应答',
    tagline: '精准识别 · 靶向清除',
    source: '5.细胞免疫应答.pptx（18 页）',
    load: () => import('./bundles/cellular'),
  },
  {
    segment: 'course-06',
    id: 'hypersensitivity',
    title: 'I 型超敏反应',
    tagline: '免疫有度 · 平衡为要',
    source: '6.I型超敏反应.pptx（p1–p19）',
    load: () => import('./bundles/hypersensitivity'),
  },
  {
    segment: 'course-07',
    id: 'lateral-flow',
    title: '免疫层析试纸条技术',
    tagline: '精准检测 · 科学诊断',
    source: '7.检测方法.pptx（17 页）',
    load: () => import('./bundles/lateral-flow'),
  },
  {
    segment: 'course-08',
    id: 'vaccine',
    title: '疫苗',
    tagline: '疫苗先行 · 防患未然',
    source: '8.疫苗.pptx（24 页）',
    load: () => import('./bundles/vaccine'),
  },
]

/** 第 1 章的元信息（同步加载，供课程总入口展示） */
export const firstChapter = {
  segment: '',
  id: 'antigen',
  title: '抗原',
  tagline: '免疫应答的“启动开关”与“身份档案”',
  source: '1.抗原.pptx（20 页）',
  path: '/',
}

export function findChapter(segment: string): ChapterEntry | undefined {
  return chapterRegistry.find((c) => c.segment === segment)
}
