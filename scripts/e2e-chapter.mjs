#!/usr/bin/env node
/**
 * 单章验收脚本（第2—8章通用）
 * ---------------------------------------------------------------
 * 用法：
 *   node scripts/e2e-chapter.mjs --prefix course-02 --name 骨髓
 *   E2E_BASE=https://... node scripts/e2e-chapter.mjs --prefix course-02 --name 骨髓
 *
 * 检查内容（每个课件都必须通过）：
 *  1) 该章 13 条路由可渲染且非 404
 *  2) 导航链接已切换到本章前缀（不会串到第1章）
 *  3) 三维模型可渲染（canvas + 部件标签 + 工具栏）
 *  4) 题目即时反馈（单选作答后出现 .qfeedback）
 *  5) 课堂互动任务卡数量与目标打卡
 *  6) 二维码图片真实加载
 *  7) 深链接刷新不 404
 *  8) 多分辨率无横向溢出
 *  9) 移动端抽屉可开且指向本章
 * 10) 无 console/page 错误
 * 11) **第1章仍在**（回归哨兵：本章开发不得影响根路径章节）
 */
import { chromium } from 'playwright-core'

const args = process.argv.slice(2)
const getArg = (k, d) => {
  const i = args.indexOf(k)
  return i >= 0 && args[i + 1] ? args[i + 1] : d
}
const PREFIX = getArg('--prefix', 'course-02')
const NAME = getArg('--name', PREFIX)
const BASE = process.env.E2E_BASE ?? 'http://localhost:4321/'
const NAV = { waitUntil: 'domcontentloaded', timeout: 45000 }
const ROOT = BASE.replace(/\/$/, '') + '/#/'
const C = ROOT + PREFIX

const results = []
let failed = 0
const check = (name, ok, detail = '') => {
  results.push({ name, ok: Boolean(ok), detail })
  if (!ok) failed += 1
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  —— ' + detail : ''}`)
}

const browser = await chromium.launch({
  channel: process.env.E2E_CHANNEL ?? 'msedge',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
})
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(`pageerror ${page.url()} :: ${e.message}`))
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`console ${page.url()} :: ${m.text()}`)
})

console.log(`\n=== ${PREFIX}（${NAME}）=== 基址 ${BASE}\n`)

/* 1) 13 条路由 */
const pages = [
  ['', '首页'],
  ['/pre-class', '课前学习'],
  ['/modules', '模块学习'],
  ['/modules/m1', '模块一'],
  ['/modules/m2', '模块二'],
  ['/modules/m3', '模块三'],
  ['/classroom', '课堂互动'],
  ['/cases', '案例教学'],
  ['/homework', '课后作业'],
  ['/assessment', '学习评价'],
  ['/ideology', '课程思政'],
  ['/frontier', '学科前沿'],
  ['/qr', '扫码学习'],
]
for (const [sub, label] of pages) {
  await page.goto(C + sub, { ...NAV })
  await page.waitForTimeout(700)
  const body = await page.locator('body').innerText()
  const h1 = (await page.locator('h1').first().innerText().catch(() => '')).replace(/\s+/g, ' ')
  const is404 = body.includes('没有找到这个页面')
  check(`路由 ${PREFIX}${sub || '/'}（${label}）`, !is404 && h1.length > 0, h1.slice(0, 24))
}

/* 2) 导航已切到本章前缀 */
await page.goto(C, { ...NAV })
await page.waitForTimeout(1200)
const navHrefs = await page.locator('.mainnav__link').evaluateAll((els) => els.map((e) => e.getAttribute('href') || ''))
const scoped = navHrefs.filter((h) => h.includes(PREFIX)).length
check('导航链接属于本章前缀', scoped >= 5, `含本章前缀 ${scoped}/${navHrefs.length}`)

/* 3) 三维模型 */
const canvas = await page.locator('canvas').count()
check('首页三维 canvas 渲染', canvas === 1, `${canvas} 个`)
if (canvas) {
  const labels = await page.locator('.stage__label').count()
  check('三维部件标签', labels >= 3, `${labels} 个标签`)
  check('三维工具栏按钮', (await page.locator('.stage__toolbar button').count()) >= 3)
  const box = await page.locator('canvas').first().boundingBox()
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.mouse.down()
  await page.mouse.move(box.x + box.width / 2 + 80, box.y + box.height / 2 + 12, { steps: 10 })
  await page.mouse.up()
  await page.waitForTimeout(300)
  check('三维拖动旋转后仍存活', (await page.locator('canvas').count()) === 1)
}

/* 4) 课前题目即时反馈 */
await page.goto(C + '/pre-class', { ...NAV })
await page.waitForTimeout(900)
const q1 = page.locator('.qcard').first()
if (await q1.count()) {
  const opts = q1.locator('.opt')
  if (await opts.count()) {
    await opts.first().click()
    await page.waitForTimeout(300)
  }
  check('课前题目即时反馈出现', (await q1.locator('.qfeedback').count()) >= 1 || (await q1.locator('textarea').count()) > 0)
} else {
  check('课前题目存在', false, '未找到 .qcard')
}

/* 5) 课堂互动任务 */
await page.goto(C + '/classroom', { ...NAV })
await page.waitForTimeout(1300)
const tasks = await page.locator('.taskcard').count()
check('课堂互动任务卡 ≥ 4', tasks >= 4, `${tasks} 个`)
const goals = page.locator('.goal')
if (await goals.count()) {
  await goals.first().click()
  await page.waitForTimeout(250)
  check('结构识别目标可打卡', (await page.locator('.goal.is-done').count()) >= 1)
} else {
  check('课堂互动含可操作控件', (await page.locator('.taskcard button, .taskcard .opt').count()) > 5)
}

/* 6) 二维码 */
await page.goto(C + '/qr', { ...NAV })
await page.waitForTimeout(1200)
const qrW = await page.locator('.qrcard__img').evaluate((el) => el.naturalWidth).catch(() => 0)
check('二维码图片加载成功', qrW > 200, `naturalWidth=${qrW}`)
const qrUrl = await page.locator('.qrcard__url').innerText().catch(() => '')
check('二维码地址含本章前缀', qrUrl.includes(PREFIX), qrUrl)

/* 7) 深链接刷新 */
await page.goto(C + '/modules/m2', { ...NAV })
await page.reload({ ...NAV })
await page.waitForTimeout(1200)
check('深链接刷新不 404', !(await page.locator('body').innerText()).includes('没有找到这个页面'))

/* 8) 多分辨率 */
for (const [w, h] of [
  [1920, 1080],
  [1440, 900],
  [390, 844],
]) {
  const c = await browser.newContext({ viewport: { width: w, height: h }, isMobile: w < 500, hasTouch: w < 500 })
  const p = await c.newPage()
  for (const sub of ['', '/classroom', '/modules/m3']) {
    await p.goto(C + sub, { ...NAV })
    await p.waitForTimeout(600)
    const over = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    check(`${w}×${h} ${PREFIX}${sub || '/'} 无横向溢出`, over <= 0, `overflow=${over}px`)
  }
  await c.close()
}

/* 9) 移动端抽屉 */
const mob = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
const mp = await mob.newPage()
await mp.goto(C, { ...NAV })
await mp.waitForTimeout(2000)
check('移动端汉堡按钮可见', await mp.locator('.hamburger').isVisible())
await mp.locator('.hamburger').click()
await mp.waitForTimeout(400)
check('移动端抽屉可打开', (await mp.locator('.drawer.is-open').count()) === 1)
const drawerHrefs = await mp.locator('.drawer a').evaluateAll((els) => els.map((e) => e.getAttribute('href') || ''))
check('抽屉链接指向本章', drawerHrefs.filter((h) => h.includes(PREFIX)).length >= 5, `${drawerHrefs.filter((h) => h.includes(PREFIX)).length} 个`)
await mob.close()

/* 10) 第1章回归哨兵 */
await page.goto(BASE, { ...NAV })
await page.waitForTimeout(1800)
const rootH1 = (await page.locator('h1').first().innerText()).replace(/\s+/g, ' ')
const rootNav = await page.locator('.mainnav__link').evaluateAll((els) => els.map((e) => e.getAttribute('href') || ''))
check('第1章首页仍在（回归哨兵）', rootH1.length > 0 && !rootH1.includes('没有找到'), rootH1.slice(0, 20))
check('第1章导航未被本章污染', rootNav.filter((h) => h.includes('course-')).length === 0, rootNav.slice(0, 3).join(' '))
const rootCanvas = await page.locator('canvas').count()
check('第1章三维仍可渲染', rootCanvas === 1, `${rootCanvas} 个`)

/* 11) 错误 */
check('无 console/page 运行错误', errors.length === 0, errors.slice(0, 3).join(' | '))

await browser.close()
const pass = results.length - failed
console.log(`\n合计：${results.length} 项，通过 ${pass} 项，失败 ${failed} 项`)
if (failed > 0) process.exit(1)
