#!/usr/bin/env node
/**
 * 版式巡检：检查文本裁切、元素越界、图片加载失败、空链接。
 * 用法：先启动 npm run preview:test，再 node scripts/check-layout.mjs
 */
import { chromium } from 'playwright-core'
const BASE = process.env.E2E_BASE ?? 'http://localhost:4321/'
const browser = await chromium.launch({ channel: 'msedge', args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] })
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
const paths = ['/', '/#/pre-class', '/#/modules', '/#/modules/m1', '/#/modules/m2', '/#/modules/m3', '/#/classroom', '/#/cases', '/#/homework', '/#/assessment', '/#/ideology', '/#/frontier', '/#/qr']
for (const p of paths) {
  await page.goto(BASE + p.slice(1), { waitUntil: 'networkidle' })
  await page.waitForTimeout(700)
  const issues = await page.evaluate(() => {
    const out = []
    // 1) 文本被横向裁切
    document.querySelectorAll('h1,h2,h3,h4,p,li,td,th,span,strong').forEach((el) => {
      if (el.children.length) return
      const cs = getComputedStyle(el)
      if (cs.overflow === 'hidden' && el.scrollWidth > el.clientWidth + 3) out.push(`clip:${el.tagName}:${el.textContent.slice(0, 18)}`)
      if (el.getBoundingClientRect().width === 0 && el.textContent.trim().length > 2) out.push(`zero-width:${el.tagName}:${el.textContent.slice(0, 18)}`)
    })
    // 2) 元素超出视口右侧
    document.querySelectorAll('.card, .taskcard, .casecard, .figure, .qcard, .lab, .stage').forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.right > window.innerWidth + 2) out.push(`overflow-right:${el.className.toString().slice(0,26)}`)
    })
    // 3) 图片资源
    const imgs = [...document.images]
    imgs.forEach((i) => { if (!i.complete || i.naturalWidth === 0) out.push(`img-fail:${i.src.slice(0, 40)}`) })
    // 4) 空链接
    document.querySelectorAll('a[href]').forEach((a) => {
      const h = a.getAttribute('href')
      if (!h || h === '#' || h === 'javascript:void(0)') out.push(`empty-href:${a.textContent.slice(0, 16)}`)
    })
    return { issues: [...new Set(out)], imgs: imgs.length, sections: document.querySelectorAll('section').length }
  })
  console.log(`${p}: sections=${issues.sections} imgs=${issues.imgs} issues=${issues.issues.length}`)
  issues.issues.slice(0, 6).forEach((i) => console.log('   -', i))
}
await browser.close()
