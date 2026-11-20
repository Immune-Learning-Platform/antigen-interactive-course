import { chromium } from 'playwright-core'
const BASE='http://localhost:4321/'
const b = await chromium.launch({ channel:'msedge' })
const p = await (await b.newContext({viewport:{width:1280,height:900}})).newPage()
for (const [route,label] of [['/#/qr','第1章二维码'],['/#/course-02/qr','第2章二维码']]) {
  await p.goto(BASE+route.slice(1),{waitUntil:'domcontentloaded'}); await p.waitForTimeout(1200)
  const url = await p.locator('.qrcard__url').innerText()
  console.log(`${label}: ${url}`)
}
await b.close()
