import { chromium } from 'playwright-core'

/**
 * 课堂互动三维模型一致性校验
 * ---------------------------------------------------------------
 * 背景：此前第2—8章的课堂互动都硬编码渲染第1章的细菌/病毒模型，
 * 目标卡片让学生"找红骨髓"，模型上却是"鞭毛/荚膜"，交互失去教学意义。
 *
 * 本脚本对每一章的课堂互动页，读取三维实验室内实际渲染的部件标签，
 * 断言其属于**本章**的结构清单（而不是第1章的细菌/病毒清单）。
 *
 * 用法：node scripts/verify-labs.mjs [baseUrl]
 */
const BASE = process.argv[2] ?? process.env.E2E_BASE ?? 'http://localhost:4321/'

/** 每章课堂互动应出现的部件标签关键词（取本章独有词，避免与第1章混淆） */
const EXPECTED = [
  {
    seg: '',
    name: '第1章 抗原',
    // 第1章必须是细菌/病毒模型
    mustInclude: ['H 抗原', 'O 抗原', '荚膜', '磷壁酸'],
    mustExclude: ['红骨髓', '重链', 'FcεRI', '样品垫', 'TCR'],
  },
  {
    seg: 'course-02',
    name: '第2章 骨髓',
    mustInclude: ['红骨髓', '黄骨髓', '血窦', '造血微环境'],
    mustExclude: ['H 抗原', '重链', 'IgE', '样品垫'],
  },
  {
    seg: 'course-03',
    name: '第3章 抗体',
    mustInclude: ['重链', '轻链', '可变区'],
    mustExclude: ['红骨髓', 'H 抗原', '样品垫', 'TCR'],
  },
  {
    seg: 'course-04',
    name: '第4章 细胞因子',
    mustInclude: ['细胞因子', '受体', '细胞核'],
    mustExclude: ['红骨髓', 'H 抗原', '重链', '样品垫'],
  },
  {
    seg: 'course-05',
    name: '第5章 细胞免疫应答',
    mustInclude: ['TCR', 'p-MHC'],
    mustExclude: ['红骨髓', 'H 抗原', '重链', '样品垫'],
  },
  {
    seg: 'course-06',
    name: '第6章 I型超敏反应',
    mustInclude: ['IgE', 'FcεRI'],
    mustExclude: ['红骨髓', 'H 抗原', '重链', '样品垫'],
  },
  {
    seg: 'course-07',
    name: '第7章 免疫层析',
    mustInclude: ['样品垫', '检测线', '质控线'],
    mustExclude: ['红骨髓', 'H 抗原', '重链', 'IgE'],
  },
  {
    seg: 'course-08',
    name: '第8章 疫苗',
    mustInclude: ['全病毒', '病毒蛋白', '病毒核酸'],
    mustExclude: ['红骨髓', 'H 抗原', '重链', '样品垫'],
  },
]

const browser = await chromium.launch({
  channel: process.env.E2E_CHANNEL ?? 'msedge',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
})
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage()

let failed = 0
const check = (ok, msg) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`)
  if (!ok) failed += 1
}

for (const c of EXPECTED) {
  // 第1章走根路径 `/#/classroom`；其余走 `/#/course-0X/classroom`
  const hashPath = c.seg ? `/${c.seg}/classroom` : '/classroom'
  const url = BASE.replace(/\/$/, '') + '/#' + hashPath
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
  await page.waitForTimeout(2600)

  // 三维实验室的部件清单（LabPanel 中的 chip）
  const chips = await page.locator('#t1 .lab__chips .chip').allInnerTexts().catch(() => [])
  const joined = chips.join(' | ')
  const canvas = await page.locator('#t1 canvas').count()

  console.log(`\n--- ${c.name}  (#t1 部件: ${chips.length} 个, canvas: ${canvas})`)
  if (chips.length) console.log(`    实际: ${joined}`)

  check(canvas === 1, `${c.name} 课堂互动有三维模型`)
  check(chips.length > 0, `${c.name} 有三维部件清单`)

  const missing = c.mustInclude.filter((k) => !joined.includes(k))
  check(missing.length === 0, `${c.name} 包含本章部件（缺: ${missing.join('/') || '无'}）`)

  const wrong = c.mustExclude.filter((k) => joined.includes(k))
  check(wrong.length === 0, `${c.name} 不含其他章节部件（误含: ${wrong.join('/') || '无'}）`)

  // 目标卡片文案应与本章模型匹配（抽样第一条）
  const firstGoal = await page.locator('#t1 .goal').first().innerText().catch(() => '')
  check(firstGoal.trim().length > 0, `${c.name} 目标卡片存在：${firstGoal.trim().slice(0, 22)}`)
}

await browser.close()
console.log(`\n合计：${EXPECTED.length} 章校验，失败 ${failed} 项`)
if (failed > 0) process.exit(1)
