#!/usr/bin/env node
/**
 * 冒烟验收脚本（本机运行）
 * ---------------------------------------------------------------
 * 前置：先启动预览服务  npm run build && npm run preview -- --port 4321
 * 运行：npm run e2e
 * 依赖：playwright-core + 本机 Edge/Chrome（不下载浏览器）
 *
 * 检查内容：
 *  1) 全部路由可渲染、无 console/page 错误
 *  2) 三维模型可渲染（canvas 存在 + 部件标签 + 工具栏）+ 部件显隐生效
 *  3) 题目即时反馈、拖拽分类、排序、滑杆、打卡等交互可用
 *  4) 二维码图片真实加载
 *  5) 深链接刷新不 404（HashRouter）
 *  6) 1920×1080 / 1440×900 / 390×844 / 375×780 无横向溢出
 *  7) 移动端抽屉导航可用
 */
import { chromium } from 'playwright-core'

const BASE = process.env.E2E_BASE ?? 'http://localhost:4321/'
/**
 * 线上托管（GitHub Pages 等）常有长连接/预取，networkidle 容易等到超时。
 * 统一使用 domcontentloaded + 显式等待，本地与线上行为一致且更稳定。
 */
const NAV = { waitUntil: 'domcontentloaded', timeout: 45000 }
const results = []
let failed = 0
const check = (name, ok, detail = '') => {
  results.push({ name, ok: Boolean(ok), detail })
  if (!ok) failed += 1
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  —— ' + detail : ''}`)
}

const routes = [
  ['/', '抗原'],
  ['/#/pre-class', '带问题进课堂'],
  ['/#/modules', '按课件三条主线'],
  ['/#/modules/m1', '概念与特性'],
  ['/#/modules/m2', '诱导免疫应答的机制'],
  ['/#/modules/m3', '兽医学中重要的抗原'],
  ['/#/classroom', '六个任务'],
  ['/#/cases', '三个问题'],
  ['/#/homework', '基础 / 提升 / 拓展'],
  ['/#/assessment', '看清自己学到了哪一步'],
  ['/#/ideology', '四个融入点'],
  ['/#/frontier', '从“表位”到“设计”'],
  ['/#/qr', '用手机扫描同一个地址'],
  ['/#/nope', '没有找到这个页面'],
]

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

// 1) 路由渲染
for (const [path, expect] of routes) {
  await page.goto(BASE + path.slice(1), { ...NAV })
  await page.waitForTimeout(500)
  const h1 = (await page.locator('h1').first().innerText().catch(() => '')).replace(/\s+/g, ' ')
  const is404 = (await page.locator('body').innerText()).includes('没有找到这个页面')
  const ok = h1.includes(expect) && (expect === '没有找到这个页面' ? is404 : !is404)
  check(`路由渲染 ${path}`, ok, `h1=「${h1.slice(0, 22)}」`)
}

// 2) 首页三维
await page.goto(BASE + '/', { ...NAV })
await page.waitForTimeout(3000)
check('首页三维 canvas 渲染', (await page.locator('canvas').count()) === 1)
const labels = await page.locator('.stage__label').count()
check('三维部件标签数量', labels >= 4, `${labels} 个标签`)
check('三维工具栏按钮', (await page.locator('.stage__toolbar button').count()) >= 5)
const box = await page.locator('canvas').first().boundingBox()
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
await page.mouse.down()
await page.mouse.move(box.x + box.width / 2 + 80, box.y + box.height / 2 + 15, { steps: 10 })
await page.mouse.up()
await page.waitForTimeout(300)
check('三维拖动旋转后仍存活', (await page.locator('canvas').count()) === 1)
const denature = page.getByRole('button', { name: '变性处理（观察构象表位）' })
await denature.scrollIntoViewIfNeeded()
await denature.click()
await page.waitForTimeout(300)
check('三维“变性处理”开关生效', (await denature.getAttribute('aria-pressed')) === 'true')

// 3) 课前预习即时反馈
await page.goto(BASE + '/#/pre-class', { ...NAV })
await page.waitForTimeout(500)
const q1 = page.locator('.qcard').first()
await q1.locator('.opt').nth(2).click()
await page.waitForTimeout(300)
check('单选即时反馈出现', (await q1.locator('.qfeedback').count()) === 1)
check('答题后标记“已作答”', (await q1.locator('.tag--ok').count()) >= 1)

// 4) 模块二：三维 + 分步动画
await page.goto(BASE + '/#/modules/m2', { ...NAV })
await page.waitForTimeout(1000)
check('模块二三维表位模型', (await page.locator('canvas').count()) === 1)
const player = page.locator('.stepPlayer').first()
check('分步动画播放器存在', (await page.locator('.stepPlayer').count()) >= 2)
await player.getByRole('button', { name: /播放/ }).click()
await page.waitForTimeout(1800)
await player.getByRole('button', { name: /暂停/ }).click()
check('动画可播放/暂停', (await player.locator('.stepChip.is-active').count()) === 1)

// 5) 课堂互动六任务
await page.goto(BASE + '/#/classroom', { ...NAV })
await page.waitForTimeout(1200)
check('课堂互动含 6 个任务卡', (await page.locator('.taskcard').count()) === 6)
check('结构解剖台三维可用', (await page.locator('canvas').count()) === 1)
await page.evaluate(() => document.querySelector('.goal')?.click())
check('结构识别目标可打卡', (await page.locator('.goal.is-done').count()) >= 1)
await page.locator('#t2 .chip').first().click()
await page.waitForTimeout(250)
await page.locator('#t2 .bucket__head').first().click()
await page.waitForTimeout(250)
check('点选条目 + 点分类框可归类', (await page.locator('#t2 .bucket .chip').count()) >= 1)
await page.evaluate(() => document.querySelector('#t3 .orderlist__btns button:nth-child(2)')?.click())
check('排序题可调整顺序', (await page.locator('#t3 .orderlist__row').count()) === 6)
await page.locator('#t4 input[type=range]').fill('90')
check('匹配模拟滑杆有反馈', (await page.locator('.binder__result').innerText()).includes('强结合'))

// 5.5) 页内锚点按钮（HashRouter 安全跳转）
await page.goto(BASE + '#/modules/m2', { ...NAV })
await page.waitForTimeout(700)
const hashBefore = await page.evaluate(() => window.location.hash)
await page.locator('.sectionnav__btn').nth(2).click()
await page.waitForTimeout(800)
const hashAfter = await page.evaluate(() => window.location.hash)
check('页内锚点跳转不破坏路由', hashAfter.includes('/modules/m2') && hashAfter === hashBefore, `${hashBefore} → ${hashAfter}`)
const inView = await page.evaluate(() => {
  const ids = ['m2-types', 'm2-epitope', 'm2-variation', 'm2-ptm']
  return ids.some((id) => {
    const el = document.getElementById(id)
    if (!el) return false
    const r = el.getBoundingClientRect()
    return r.top > -80 && r.top < 220
  })
})
check('页内锚点滚动到目标小节', inView)

// 6) 二维码图片真实加载
await page.goto(BASE + '/#/qr', { ...NAV })
await page.waitForTimeout(900)
const qrWidth = await page.locator('.qrcard__img').evaluate((el) => el.naturalWidth).catch(() => 0)
check('二维码图片加载成功', qrWidth > 200, `naturalWidth=${qrWidth}`)

// 7) 深链接刷新
await page.goto(BASE + '/#/modules/m3', { ...NAV })
await page.reload({ ...NAV })
await page.waitForTimeout(600)
check('深链接刷新不 404', (await page.locator('body').innerText()).includes('兽医学中重要的抗原'))

// 8) 多分辨率横向溢出
for (const [w, h] of [
  [1920, 1080],
  [1440, 900],
  [390, 844],
  [375, 780],
]) {
  const c = await browser.newContext({ viewport: { width: w, height: h }, isMobile: w < 500, hasTouch: w < 500 })
  const p = await c.newPage()
  for (const path of ['/', '/#/classroom', '/#/modules/m3', '/#/assessment']) {
    await p.goto(BASE + path.slice(1), { ...NAV })
    await p.waitForTimeout(500)
    const over = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    check(`${w}×${h} ${path} 无横向溢出`, over <= 0, `overflow=${over}px`)
  }
  await c.close()
}

// 9) 移动端抽屉
const mob = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
const mp = await mob.newPage()
await mp.goto(BASE, { ...NAV })
await mp.waitForTimeout(2500)
check('移动端汉堡按钮可见', await mp.locator('.hamburger').isVisible())
await mp.locator('.hamburger').click()
await mp.waitForTimeout(400)
check('移动端抽屉可打开', (await mp.locator('.drawer.is-open').count()) === 1)
check('抽屉包含全部栏目', (await mp.locator('.drawer a').count()) >= 13)
await mp.locator('.drawer a', { hasText: '课前学习' }).first().click()
await mp.waitForTimeout(700)
check('抽屉内链接可跳转', mp.url().includes('pre-class'), mp.url())

// 10) 控制台错误
check('无 console/page 运行错误', errors.length === 0, errors.slice(0, 3).join(' | '))

await browser.close()

const pass = results.length - failed
console.log(`\n合计：${results.length} 项，通过 ${pass} 项，失败 ${failed} 项`)
if (failed > 0) process.exit(1)
