#!/usr/bin/env node
/**
 * 站内链接巡检：抓取全站所有 href / 页内锚点，逐一打开验证不落到 404，且锚点元素存在。
 * 用法：先启动 preview（4321），再 node scripts/check-links.mjs
 */
import { chromium } from 'playwright-core'

const BASE = process.env.E2E_BASE ?? 'http://localhost:4321/'
const SEEDS = ['/', '/#/pre-class', '/#/modules', '/#/modules/m1', '/#/modules/m2', '/#/modules/m3', '/#/classroom', '/#/cases', '/#/homework', '/#/assessment', '/#/ideology', '/#/frontier', '/#/qr']

const browser = await chromium.launch({ channel: process.env.E2E_CHANNEL ?? 'msedge' })
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage()

const hrefs = new Set()
for (const seed of SEEDS) {
  await page.goto(BASE + seed.slice(1), { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  const list = await page.evaluate(() =>
    [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).filter(Boolean),
  )
  list.forEach((h) => hrefs.add(h))
}

const routes = new Set()
const anchors = new Set()
hrefs.forEach((h) => {
  const seg = h.split('#') // 例如 "#/modules/m2#m2-types" → ['', '/modules/m2', 'm2-types']
  const route = seg[1]
  const anchor = seg[2]
  if (route) routes.add(route.startsWith('/') ? route : '/' + route)
  if (route && anchor) anchors.add(`${route}|${anchor}`)
})

let bad = 0
for (const r of routes) {
  await page.goto(BASE + r.replace(/^\//, ''), { waitUntil: 'networkidle' })
  await page.waitForTimeout(250)
  const is404 = (await page.locator('body').innerText()).includes('没有找到这个页面')
  if (is404) { console.log('DEAD ROUTE', r); bad += 1 }
}
for (const a of anchors) {
  const [path, hash] = a.split('|')
  await page.goto(BASE + '#' + path + '#' + hash, { waitUntil: 'networkidle' }).catch(() => {})
  await page.waitForTimeout(450)
  const exists = await page.evaluate((id) => Boolean(document.getElementById(id)), hash)
  if (!exists) { console.log('MISSING ANCHOR', a); bad += 1 }
}

const external = [...hrefs].filter((h) => /^https?:/.test(h))
console.log(`\n扫描页面 ${SEEDS.length} 个；唯一链接 ${hrefs.size} 条；站内路由 ${routes.size} 条；页内锚点 ${anchors.size} 条；外部链接 ${external.length} 条`)
if (external.length) console.log('外链：' + [...new Set(external)].join(', '))
console.log(bad === 0 ? '结果：全部站内链接与锚点有效' : `结果：发现 ${bad} 处失效链接`)
await browser.close()
if (bad > 0) process.exit(1)
