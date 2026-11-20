#!/usr/bin/env node
/**
 * 部署助手
 * ---------------------------------------------------------------------------
 * 你可以只传 GitHub 用户名（我会自动拼出 URL），也可以传完整仓库地址：
 *
 *   node scripts/deploy.mjs my-github-name
 *   node scripts/deploy.mjs https://github.com/my-github-name/antigen-interactive-course.git
 *
 * 它会做四件事：
 *   1) 拼出并校验仓库 URL
 *   2) 匿名风险自检（用户名是否为真实姓名拼音 / 含生日 / 含学校缩写）
 *   3) 检查本机 git 状态与认证方式（Git Credential Manager）
 *   4) 打印可直接执行的命令；带 --run 时真正执行 remote + push
 *
 * 注意：push 是对外可见操作，脚本默认只“预演”，必须显式加 --run 才执行。
 */
import { execSync } from 'node:child_process'
import process from 'node:process'

const REPO_NAME = 'antigen-interactive-course'
const args = process.argv.slice(2)
const run = args.includes('--run')
const input = args.find((a) => !a.startsWith('--'))

const c = {
  ok: (s) => `\x1b[32m${s}\x1b[0m`,
  warn: (s) => `\x1b[33m${s}\x1b[0m`,
  err: (s) => `\x1b[31m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
}

function die(msg) {
  console.error(c.err('✗ ' + msg))
  process.exit(1)
}

if (!input) {
  console.error(`
用法：
  node scripts/deploy.mjs <GitHub用户名>                  # 最省事：只给用户名
  node scripts/deploy.mjs <完整仓库URL>                    # 或给完整地址
  node scripts/deploy.mjs <用户名> --run                   # 真正执行 push

例：
  node scripts/deploy.mjs vet-edu-lab
  node scripts/deploy.mjs https://github.com/vet-edu-lab/${REPO_NAME}.git --run
`)
  process.exit(1)
}

/* ---------------------------- 1) 解析出 URL ---------------------------- */
let owner = ''
let repoUrl = ''
let pagesUrl = ''

if (/^https?:\/\//.test(input)) {
  const m = input.match(/^https?:\/\/github\.com\/([^/]+)\/([^/?#]+?)(?:\.git)?\/?$/)
  if (!m) die(`无法识别的 GitHub 地址：${input}\n  期望形如 https://github.com/<用户名>/<仓库名>`)
  owner = m[1]
  const repo = m[2].replace(/\.git$/, '')
  repoUrl = `https://github.com/${owner}/${repo}.git`
  pagesUrl = `https://${owner.toLowerCase()}.github.io/${repo}/`
} else {
  owner = input.replace(/^@/, '').trim()
  if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(owner)) {
    die(`"${owner}" 不像 GitHub 用户名或仓库地址。\n  用户名只能含字母、数字、连字符，且不能以连字符开头/结尾。`)
  }
  repoUrl = `https://github.com/${owner}/${REPO_NAME}.git`
  pagesUrl = `https://${owner.toLowerCase()}.github.io/${REPO_NAME}/`
}

console.log(c.bold('\n=== 1. 仓库地址 ==='))
console.log(`  所有者   ${owner}`)
console.log(`  仓库名   ${repoUrl.split('/').pop().replace(/\.git$/, '')}`)
console.log(`  push URL ${c.ok(repoUrl)}`)
console.log(`  发布后   ${c.ok(pagesUrl)}`)

/* ------------------------- 2) 匿名风险自检 ------------------------- */
console.log(c.bold('\n=== 2. 匿名风险自检（Pages 地址里会完整出现用户名）==='))

const SURNAMES = [
  'zhang', 'wang', 'li', 'zhao', 'liu', 'chen', 'yang', 'huang', 'wu', 'zhou',
  'xu', 'sun', 'ma', 'zhu', 'hu', 'guo', 'he', 'gao', 'lin', 'luo', 'zheng',
  'liang', 'xie', 'tang', 'song', 'han', 'deng', 'feng', 'cao', 'peng', 'zeng',
  'xiao', 'tian', 'dong', 'pan', 'yuan', 'cai', 'jiang', 'yu', 'du', 'ye', 'cheng',
]
const GIVEN = [
  'wei', 'fang', 'na', 'min', 'jing', 'li', 'qiang', 'lei', 'jun', 'yang', 'yong',
  'yan', 'jie', 'tao', 'ming', 'chao', 'xin', 'hua', 'ping', 'gang', 'bo', 'hui',
  'xiang', 'long', 'fei', 'rui', 'chen', 'hao', 'yu', 'ting', 'xuan', 'qian',
]
/** 具体院校缩写：出现在用户名里基本可定位单位，判为 mid */
const SCHOOL_HINTS = [
  'scau', 'gdaib', 'gdufs', 'sysu', 'scut', 'jnu', 'hnust', 'njau', 'cau',
  'caas', 'cas', 'gzhs', 'gdou', 'fosu', 'wyu', 'dgut',
]
/** 领域通用词：教学类站点用这些词是正常的，不构成身份线索，仅做提示 */
const GENERIC_HINTS = ['vet', 'vetmed', 'agri', 'agric', 'univ', 'college', 'edu', 'immuno', 'bio', 'lab', 'learn', 'course']

const findings = []
const lower = owner.toLowerCase()

// a) 姓名拼音：姓 + 名 直接相连，或 姓 与 名 之间仅一个分隔
for (const s of SURNAMES) {
  if (lower === s) findings.push({ level: 'high', text: `用户名就是姓氏拼音 "${s}"` })
  for (const g of GIVEN) {
    if (lower === s + g || lower === s + '-' + g || lower === s + '_' + g || lower === s + '.' + g) {
      findings.push({ level: 'high', text: `用户名形如“姓+名”拼音 "${owner}"` })
    }
    if (lower.includes(s + g)) {
      findings.push({ level: 'high', text: `用户名包含“姓+名”拼音 "${s + g}"（疑似真实姓名）` })
    }
  }
}
// b) 生日 / 年份
const year = lower.match(/(19|20)\d{2}/)
if (year) findings.push({ level: 'mid', text: `用户名含年份 "${year[0]}"（可能是出生年或入学年）` })
const bday = lower.match(/(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/)
if (bday) findings.push({ level: 'mid', text: `用户名末尾疑似日期 "${bday[0]}"` })
// c) 学校 / 单位缩写
const hitSchool = SCHOOL_HINTS.filter((h) => lower.includes(h)).sort((a, b) => b.length - a.length)
if (hitSchool.length) {
  findings.push({ level: 'mid', text: `用户名含具体院校缩写 "${hitSchool[0]}"` })
}
for (const h of GENERIC_HINTS) {
  if (lower === h) findings.push({ level: 'low', text: `用户名就是领域通用词 "${h}"（不构成身份线索）` })
}
// d) 长度过长、罕见词（无法判断，只提示）
if (owner.length > 20) findings.push({ level: 'low', text: '用户名较长，请自行确认其中不含真实姓名' })

const uniq = [...new Map(findings.map((f) => [f.text, f])).values()]
const high = uniq.filter((f) => f.level === 'high')
const mid = uniq.filter((f) => f.level === 'mid')
const low = uniq.filter((f) => f.level === 'low')

if (high.length) {
  console.log(c.err('  高风险：'))
  high.forEach((f) => console.log('   ✗ ' + f.text))
}
if (mid.length) {
  console.log(c.warn('  需确认：'))
  mid.forEach((f) => console.log('   ⚠ ' + f.text))
}
if (low.length) {
  console.log('  提示：')
  low.forEach((f) => console.log('   · ' + f.text))
}
if (!high.length && !mid.length && !low.length) {
  console.log(c.ok('  未发现明显身份线索，用户名看起来是中性别名。'))
}

if (high.length) {
  console.log(`
${c.err('建议不要用这个账号直接公开部署。')}两个替代方案：
  1) 新建一个中性 GitHub 账号专门放本仓库（地址不含真实姓名，最干净）
  2) 用 GitHub 组织承载：组织名取中性词，地址变为 https://<组织名>.github.io/${REPO_NAME}/
     ${c.dim('注意：组织名同样会出现在网址里，也必须中性。')}
`)
} else if (mid.length) {
  console.log(c.dim('  以上为启发式判断，可能有误。若含真实姓名/生日/校名缩写，建议换中性账号。\n'))
} else {
  console.log('')
}

/* ----------------------- 3) 本机 git 与认证状态 ----------------------- */
console.log(c.bold('=== 3. 本机状态 ==='))
function sh(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch {
    return ''
  }
}
const inRepo = Boolean(sh('git rev-parse --is-inside-work-tree'))
console.log(`  在 git 仓库内   ${inRepo ? c.ok('是') : c.err('否（请在 web/ 目录下运行本脚本）')}`)
if (!inRepo) process.exit(1)

let branch = sh('git rev-parse --abbrev-ref HEAD') || 'main'
const commits = sh('git rev-list --count HEAD') || '0'
const dirty = sh('git status --porcelain')
const helper = sh('git config --get credential.helper') || sh('git config --system --get credential.helper')
const remote = sh('git remote get-url origin')

const CI_BRANCH = 'main'
const branchOk = branch === CI_BRANCH
console.log(`  当前分支       ${branchOk ? c.ok(branch) : c.err(branch + `  ← CI 只监听 ${CI_BRANCH}，需先改名`)}`)
console.log(`  提交数         ${commits}`)
console.log(`  工作区         ${dirty ? c.warn('有未提交改动') : c.ok('干净')}`)
console.log(`  凭据助手       ${helper ? c.ok(helper) : c.warn('未配置（push 会要求输入 token）')}`)
console.log(`  远程 origin    ${remote ? c.ok(remote) : c.dim('未设置')}`)

if (dirty) {
  console.log(c.warn('\n  工作区有未提交改动，建议先 git add -A && git commit -m "..."'))
}

/* ------------------------- 4) 输出/执行命令 ------------------------- */
console.log(c.bold('\n=== 4. 接下来执行的命令 ==='))
const cmds = []
if (!branchOk) cmds.push(`git branch -M ${CI_BRANCH}`)
if (!branchOk) branch = CI_BRANCH
if (remote && remote !== repoUrl) {
  cmds.push(`git remote set-url origin ${repoUrl}`)
} else if (!remote) {
  cmds.push(`git remote add origin ${repoUrl}`)
}
cmds.push(`git push -u origin ${branch}`)

cmds.forEach((cmd, i) => console.log(`  ${i + 1}. ${cmd}`))

if (!run) {
  console.log(`
${c.dim('以上为预演。确认无误后加 --run 真正执行：')}
  node scripts/deploy.mjs ${input} --run

${c.bold('push 之后还要做两件事（GitHub 网页上点几下）：')}
  1. 仓库 Settings → Pages → Build and deployment → Source 选 ${c.bold('GitHub Actions')}
  2. 等待 Actions 里的 "Build and deploy to GitHub Pages" 变绿（约 1—2 分钟）

${c.bold('发布后回来生成二维码：')}
  npm run qr -- ${pagesUrl}
`)
  process.exit(0)
}

console.log(c.bold('\n=== 5. 执行 ==='))
for (const cmd of cmds) {
  console.log(c.dim('$ ') + cmd)
  try {
    execSync(cmd, { stdio: 'inherit' })
  } catch {
    die(`命令失败：${cmd}\n  常见原因：仓库还没在 GitHub 上创建；或认证被取消。`)
  }
}

console.log(`
${c.ok('✓ 已推送。')}

${c.bold('请完成最后两步（GitHub 网页）：')}
  1. 打开 ${c.ok(`https://github.com/${owner}/${repoUrl.split('/').pop().replace(/\.git$/, '')}/settings/pages`)}
     Source 选择 ${c.bold('GitHub Actions')}（只需设置一次）
  2. 打开 Actions 页确认构建变绿

${c.bold('然后生成二维码并做线上验收：')}
  npm run qr -- ${pagesUrl}
  E2E_BASE=${pagesUrl} node scripts/e2e-smoke.mjs

${c.dim('二维码可用性依赖：仓库/账号存续、Pages 未关闭、未更换域名。地址变更后需重新生成并替换已印材料。')}
`)
