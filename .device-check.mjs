import { chromium, devices } from 'playwright-core'
const BASE = 'https://immune-learning-platform.github.io/antigen-interactive-course/'
const browser = await chromium.launch({ channel: 'msedge', args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] })
const log = (k,v) => console.log(`${k}: ${v}`)

// Android
const android = await browser.newContext({ ...devices['Pixel 7'] })
const a = await android.newPage()
await a.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 })
await a.waitForTimeout(3000)
log('Android(Pixel 7) h1', (await a.locator('h1').first().innerText()).replace(/\s+/g,' ').slice(0,20))
log('  UA', (await a.evaluate(() => navigator.userAgent)).slice(0, 70))
log('  三维 canvas', await a.locator('canvas').count())
log('  横向溢出', await a.evaluate(() => document.documentElement.scrollWidth - window.innerWidth))
await a.locator('.hamburger').click(); await a.waitForTimeout(500)
log('  抽屉可开', await a.locator('.drawer.is-open').count())
await android.close()

// iPhone
const iphone = await browser.newContext({ ...devices['iPhone 14'] })
const i = await iphone.newPage()
await i.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 })
await i.waitForTimeout(3000)
log('iPhone 14 h1', (await i.locator('h1').first().innerText()).replace(/\s+/g,' ').slice(0,20))
log('  UA', (await i.evaluate(() => navigator.userAgent)).slice(0, 60))
log('  三维 canvas', await i.locator('canvas').count())
log('  横向溢出', await i.evaluate(() => document.documentElement.scrollWidth - window.innerWidth))
await i.goto(BASE + '#/classroom', { waitUntil: 'domcontentloaded' }); await i.waitForTimeout(2500)
log('  iPhone 课堂互动 h1', (await i.locator('h1').first().innerText()).replace(/\s+/g,' ').slice(0,18))
await iphone.close()

// 平板
const pad = await browser.newContext({ ...devices['iPad (gen 7)'] })
const t = await pad.newPage()
await t.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 }); await t.waitForTimeout(2500)
log('iPad h1', (await t.locator('h1').first().innerText()).replace(/\s+/g,' ').slice(0,20))
log('  横向溢出', await t.evaluate(() => document.documentElement.scrollWidth - window.innerWidth))
await pad.close()
await browser.close()
