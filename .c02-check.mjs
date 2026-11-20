import { chromium } from 'playwright-core'
const BASE='http://localhost:4321/'
const b = await chromium.launch({ channel:'msedge', args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] })
const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage()
const errs=[]
p.on('pageerror',e=>errs.push('pageerror: '+e.message))
p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text())})
const log=(k,v)=>console.log(`${k}: ${v}`)

const routes=[['/#/course-02','第2章首页'],['/#/course-02/pre-class','课前'],['/#/course-02/modules','模块'],['/#/course-02/modules/m1','模块一'],['/#/course-02/modules/m2','模块二'],['/#/course-02/modules/m3','模块三'],['/#/course-02/classroom','互动'],['/#/course-02/cases','案例'],['/#/course-02/homework','作业'],['/#/course-02/assessment','评价'],['/#/course-02/ideology','思政'],['/#/course-02/frontier','前沿'],['/#/course-02/qr','二维码']]
for(const [r,name] of routes){
  await p.goto(BASE+r.slice(1),{waitUntil:'domcontentloaded'}); await p.waitForTimeout(1200)
  const h1=(await p.locator('h1').first().innerText().catch(()=>'NO-H1')).replace(/\s+/g,' ').slice(0,26)
  const nav=await p.locator('.mainnav__link').count()
  const hlinks=await p.locator('a[href*="course-02"]').count()
  console.log(`${name.padEnd(6)} h1="${h1}" nav=${nav} c02链接=${hlinks}`)
}
// 三章首页对比
await p.goto(BASE,{waitUntil:'domcontentloaded'}); await p.waitForTimeout(1500)
log('第1章首页 h1', (await p.locator('h1').first().innerText()).replace(/\s+/g,' ').slice(0,24))
log('第1章 canvas', await p.locator('canvas').count())
await p.goto(BASE+'#/course-02',{waitUntil:'domcontentloaded'}); await p.waitForTimeout(2000)
log('第2章首页 h1', (await p.locator('h1').first().innerText()).replace(/\s+/g,' ').slice(0,24))
log('第2章 canvas', await p.locator('canvas').count())
log('第2章导航首项链接', await p.locator('.mainnav__link').first().getAttribute('href'))
console.log('ERRORS', errs.length); errs.slice(0,5).forEach(e=>console.log(' -',e))
await b.close()
