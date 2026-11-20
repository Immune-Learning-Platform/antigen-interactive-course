import { chromium } from 'playwright-core'
const BASE='https://immune-learning-platform.github.io/antigen-interactive-course/'
const b = await chromium.launch({ channel:'msedge' })
const p = await (await b.newContext()).newPage()
const routes=['/#/course-07','/#/course-07/pre-class','/#/course-07/modules','/#/course-07/modules/m1','/#/course-07/modules/m2','/#/course-07/modules/m3','/#/course-07/classroom','/#/course-07/cases','/#/course-07/homework','/#/course-07/assessment','/#/course-07/ideology','/#/course-07/frontier','/#/course-07/qr']
// 参赛教师身份相关（必须 0 命中）
const FORBIDDEN=['参赛','一流本科课程','线下一流','自建信息化平台','自建网站','校徽','院徽','学院','大学名称','华南农业','SCAU','@qq.com','@163.com',/1[3-9]\d{9}/]
// 允许出现的学术署名/文献来源（白名单，不计为泄露）
const ALLOWED=['黄晓军','恩斯特·诺伊曼','北卡罗来纳州立大学兽医学院','Janeway']
const hits=[]
for (const r of routes){
  await p.goto(BASE+r.slice(1),{waitUntil:'domcontentloaded',timeout:45000}); await p.waitForTimeout(1300)
  let txt = await p.locator('body').innerText()
  const html = await p.content()
  // 白名单先剔除，避免误报
  for (const ok of ALLOWED) txt = txt.split(ok).join('')
  for (const pat of FORBIDDEN){
    const re = pat instanceof RegExp ? pat : new RegExp(pat)
    if (re.test(txt)) hits.push(`${r} 命中「${pat}」`)
  }
  for (const c of (html.match(/<!--[\s\S]*?-->/g)||[])) {
    if (/大学|学院|教师|参赛|@/.test(c)) hits.push(`${r} 注释命中`)
  }
  const links=[...new Set((html.match(/https?:\/\/[^"'<\s)]+/g)||[]))]
  links.filter(l=>!/github\.io|github\.com\/Immune-Learning-Platform|ncbi\.nlm\.nih\.gov/.test(l))
       .forEach(l=>hits.push(`${r} 意外外链 ${l}`))
}
console.log('扫描页面数:', routes.length)
console.log('命中项:', hits.length)
hits.slice(0,10).forEach(h=>console.log('  -',h))
if(!hits.length) console.log('  ✓ 通过：无参赛教师身份线索、无意外外链')
console.log('\n白名单（学术署名/文献来源，按要求保留）:', ALLOWED.join(' / '))
await b.close()
