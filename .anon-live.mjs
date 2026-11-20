import { chromium } from 'playwright-core'
const BASE='https://immune-learning-platform.github.io/antigen-interactive-course/'
const b = await chromium.launch({ channel:'msedge' })
const p = await (await b.newContext()).newPage()
const routes=['/','/#/pre-class','/#/modules','/#/modules/m1','/#/modules/m2','/#/modules/m3','/#/classroom','/#/cases','/#/homework','/#/assessment','/#/ideology','/#/frontier','/#/qr']
const BAD=[/大学/,'学院','校徽','院徽','参赛','一等奖','二等奖','科技进步','一流本科','@qq.com','@163.com',/[1][3-9]\d{9}/,'华南农业','SCAU','scau']
const hits=[]
for (const r of routes){
  await p.goto(BASE+r.slice(1),{waitUntil:'domcontentloaded',timeout:45000}); await p.waitForTimeout(1200)
  const txt = await p.locator('body').innerText()
  const html = await p.content()
  for (const pat of BAD){
    const re = pat instanceof RegExp ? pat : new RegExp(pat,'g')
    if (re.test(txt)) hits.push(`${r} 文本命中 ${pat}`)
  }
  // 检查注释与外链
  const comments = html.match(/<!--[\s\S]*?-->/g) || []
  comments.forEach(c => { if (/大学|学院|教师|参赛|@/.test(c)) hits.push(`${r} 注释命中`) })
  const links = [...new Set((html.match(/https?:\/\/[^"'<\s)]+/g)||[]))]
  links.filter(l => !/github\.io|github\.com\/Immune-Learning-Platform|ncbi\.nlm\.nih\.gov/.test(l))
       .forEach(l => hits.push(`${r} 意外外链 ${l}`))
}
console.log('扫描页面数:', routes.length)
console.log('命中项:', hits.length)
hits.slice(0,10).forEach(h=>console.log('  -', h))
if (!hits.length) console.log('  ✓ 通过：无学校名/姓名/奖项/联系方式/意外外链')
await b.close()
