#!/usr/bin/env node
/**
 * 发布构建产物到 gh-pages 分支（不需要 Actions / workflow scope）
 * ---------------------------------------------------------------
 * 原理：GitHub Pages 的 "Deploy from a branch" 模式直接从分支根目录提供服务。
 * 把 dist/ 内容推到 gh-pages 分支根目录即可，站点地址为：
 *   https://<owner>.github.io/<repo>/
 *
 * 用法：npm run publish
 */
import { execSync } from 'node:child_process'
import { cpSync, mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

// Windows 的文件系统不记录 ownership，git 会对新建的临时仓库报 "dubious ownership"。
// 这里统一加上 -c safe.directory=* 仅作用于本次临时仓库命令，不修改用户全局配置。
const SAFE = '-c safe.directory=*'
const sh = (cmd, opts = {}) => execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...opts }).trim()
const run = (cmd) => execSync(cmd, { stdio: 'inherit' })

const dist = resolve(process.cwd(), 'dist')
if (!existsSync(dist)) {
  console.error('✗ 找不到 dist/，请先运行 npm run build')
  process.exit(1)
}

const remote = sh('git remote get-url origin')
const branch = 'gh-pages'
const tmp = resolve(process.cwd(), '.publish-tmp')

console.log('→ 准备发布目录')
rmSync(tmp, { recursive: true, force: true })
mkdirSync(tmp, { recursive: true })
cpSync(dist, tmp, { recursive: true })
// 静态托管根路径需要 .nojekyll，否则以下划线开头的文件会被 Jekyll 忽略
writeFileSync(resolve(tmp, '.nojekyll'), '')

console.log('→ 构建 gh-pages 分支内容')
run(`git ${SAFE} -C "${tmp}" init -q`)
run(`git ${SAFE} -C "${tmp}" checkout -q -b ${branch}`)
run(`git ${SAFE} -C "${tmp}" add -A`)
run(
  `git ${SAFE} -C "${tmp}" -c user.name="course-maintainer" -c user.email="course-maintainer@users.noreply.github.com" commit -q -m "deploy: ${new Date().toISOString()}"`,
)

console.log('→ 推送到远端 gh-pages')
run(`git ${SAFE} -C "${tmp}" push -f "${remote}" ${branch}:${branch}`)

rmSync(tmp, { recursive: true, force: true })
console.log(`
✓ 已发布到 ${branch} 分支。

还差一步（仅首次需要，GitHub 网页操作）：
  打开 ${remote.replace(/\.git$/, '').replace('https://github.com/', 'https://github.com/')}/settings/pages
  Build and deployment → Source 选择 "Deploy from a branch"
  Branch 选 ${branch}，目录选 / (root)，Save

约 1 分钟后访问：${remote.replace(/\.git$/, '').replace('https://github.com/', 'https://').replace(/^https:\/\/([^/]+)\/([^/]+)$/, 'https://$1.github.io/$2/')}
`)
