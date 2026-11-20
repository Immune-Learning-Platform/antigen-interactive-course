import { chromium } from 'playwright-core'
const BASE = 'https://immune-learning-platform.github.io/antigen-interactive-course/'
const browser = await chromium.launch({ channel: 'msedge', args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] })
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
const errs = []
page.on('pageerror', e => errs.push('pageerror: ' + e.message))
page.on('console', m => { if (m.type()==='error') errs.push('console: ' + m.text()) })
page.on('response', r => { if (r.status() >= 400) errs.push(`HTTP${r.status()} ${r.url()}`) })
const log = (k,v) => console.log(`${k}: ${v}`)

await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(3000)
log('HTTP 标题', await page.title())
log('h1', (await page.locator('h1').first().innerText()).replace(/\s+/g,' ').slice(0,30))
log('CSS 生效(背景色)', await page.evaluate(() => getComputedStyle(document.body).backgroundColor))
log('三维 canvas', await page.locator('canvas').count())
log('导航项', await page.locator('.mainnav__link').count())

// 深链接刷新
await page.goto(BASE + '#/modules/m3', { waitUntil: 'networkidle' }); await page.waitForTimeout(900)
await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(1500)
log('深链接刷新 h1', (await page.locator('h1').first().innerText()).replace(/\s+/g,' ').slice(0,22))
log('深链接三维', await page.locator('canvas').count())

// 二维码页（线上应编码线上地址）
await page.goto(BASE + '#/qr', { waitUntil: 'networkidle' }); await page.waitForTimeout(1500)
log('二维码编码地址', await page.locator('.qrcard__url').innerText())
log('二维码图片宽', await page.locator('.qrcard__img').evaluate(el => el.naturalWidth).catch(()=>0))

console.log('ERRORS', errs.length)
errs.slice(0,6).forEach(e => console.log(' -', e))
await browser.close()
