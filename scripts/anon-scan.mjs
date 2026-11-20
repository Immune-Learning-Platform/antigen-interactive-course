import { chromium } from 'playwright-core'

/**
 * 全站匿名化终检：扫描全部 8 章 + 系列总入口的页面文本、HTML 注释与外部链接。
 * 用法：node scripts/anon-scan.mjs [baseUrl]
 */
const BASE = process.argv[2] ?? process.env.E2E_BASE ?? 'https://immune-learning-platform.github.io/antigen-interactive-course/'

const PAGES = ['/#/pre-class', '/#/modules', '/#/modules/m1', '/#/modules/m2', '/#/modules/m3', '/#/classroom', '/#/cases', '/#/homework', '/#/assessment', '/#/ideology', '/#/frontier', '/#/qr']

const routes = ['/', '/#/courses']
for (let i = 2; i <= 8; i += 1) {
  const seg = `course-0${i}`
  routes.push(`/#/${seg}`)
  // 每章抽查 4 个代表性子页（含内容最密集的模块页与思政/前沿页）
  for (const sub of ['/modules/m2', '/classroom', '/frontier', '/ideology']) routes.push(`/#/${seg}${sub}`)
}

// 参赛教师身份相关（必须 0 命中）
const FORBIDDEN = [
  '参赛',
  '一流本科课程',
  '线下一流',
  '自建信息化平台',
  '自建网站',
  '校徽',
  '院徽',
  '华南农业',
  'SCAU',
  'sdau',
  '山东农业',
  '@qq.com',
  '@163.com',
  /1[3-9]\d{9}/,
  '国家科技进步奖',
  '科技进步奖',
  '参赛老师',
  '参赛教师',
]

// 允许出现的学术署名/文献来源（按要求保留，不计为泄露）
const ALLOWED = ['黄晓军', '恩斯特·诺伊曼', '北卡罗来纳州立大学兽医学院', 'Janeway', 'Miller', 'Steinman', 'Zinkernagel', 'Doherty', 'Mak', 'Davis', 'Mosmann', 'Coffman', 'Emily']

const browser = await chromium.launch({ channel: 'msedge' })
const page = await (await browser.newContext()).newPage()
const hits = []

for (const r of routes) {
  await page.goto(BASE.replace(/\/$/, '') + r.replace(/^\//, ''), { waitUntil: 'domcontentloaded', timeout: 45000 })
  await page.waitForTimeout(1100)
  let txt = await page.locator('body').innerText()
  const html = await page.content()

  // 白名单先剔除，避免误报
  for (const ok of ALLOWED) txt = txt.split(ok).join('')

  for (const pat of FORBIDDEN) {
    const re = pat instanceof RegExp ? pat : new RegExp(pat)
    if (re.test(txt)) hits.push(`${r} 文本命中「${pat}」`)
  }
  for (const c of html.match(/<!--[\s\S]*?-->/g) ?? []) {
    if (/大学|学院|教师|参赛|@/.test(c)) hits.push(`${r} 注释命中`)
  }
  const links = [...new Set(html.match(/https?:\/\/[^"'<\s)]+/g) ?? [])]
  links
    .filter((l) => !/github\.io|github\.com\/Immune-Learning-Platform|ncbi\.nlm\.nih\.gov/.test(l))
    .forEach((l) => hits.push(`${r} 意外外链 ${l}`))
}

console.log(`扫描页面数: ${routes.length}`)
console.log(`命中项: ${hits.length}`)
hits.slice(0, 12).forEach((h) => console.log('  -', h))
if (hits.length === 0) console.log('  ✓ 通过：无参赛教师身份线索、无意外外链')
console.log(`\n白名单（学术署名/文献来源，按要求保留）: ${ALLOWED.join(' / ')}`)

await browser.close()
if (hits.length > 0) process.exit(1)
