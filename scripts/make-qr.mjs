#!/usr/bin/env node
/**
 * 生成静态二维码（PNG + SVG），用于印刷或贴在 PPT / 讲义上。
 *
 * 用法：
 *   npm run qr -- https://example.github.io/repo/                     # 第1章（站点根，输出到 public/qr/）
 *   npm run qr -- https://example.github.io/repo/#/course-02          # 第2章（输出到 public/qr/course-02/）
 *   npm run qr -- "<url>" --slug custom-name                          # 自定义子目录名
 *
 * 安全约定（保护第1章已印制的二维码）：
 *   · 第1章的二维码固定写到 public/qr/site-qr.{png,svg}，**不会被其它章节覆盖**；
 *   · 各章节写入各自的子目录 public/qr/<slug>/，互不干扰。
 */
import QRCode from 'qrcode'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const args = process.argv.slice(2)
const getArg = (k) => {
  const i = args.indexOf(k)
  return i >= 0 && args[i + 1] ? args[i + 1] : null
}
const url = args.find((a) => !a.startsWith('--') && /^https?:\/\//.test(a))
const explicitSlug = getArg('--slug')

if (!url) {
  console.error(`用法：
  npm run qr -- https://<你的站点根地址>/
  npm run qr -- https://<你的站点根地址>/#/course-02
  npm run qr -- "<完整地址>" --slug <子目录名>

说明：
  · 不带 # 的根地址 → 第1章，输出到 public/qr/site-qr.{png,svg}
  · 带 #/course-XX     → 输出到 public/qr/course-XX/，不会覆盖第1章文件
  · 二维码内容就是传入的完整地址，请确认它是正式 HTTPS 地址（不是 localhost）
`)
  process.exit(1)
}

if (/localhost|127\.0\.0\.1|0\.0\.0\.0/.test(url)) {
  console.error('✗ 不要用本地地址生成二维码：请使用正式部署后的 HTTPS 地址。')
  process.exit(1)
}

// 从 hash 推断章节 slug
const hashMatch = url.match(/#\/?(course-\d+)/)
const slug = explicitSlug ?? hashMatch?.[1] ?? 'site'

const outDir = slug === 'site' ? resolve(process.cwd(), 'public/qr') : resolve(process.cwd(), 'public/qr', slug)
await mkdir(outDir, { recursive: true })

const common = { errorCorrectionLevel: 'M', margin: 2, color: { dark: '#0b3b33', light: '#ffffff' } }
const pngBuffer = await QRCode.toBuffer(url, { ...common, type: 'png', width: 1024 })
const svgText = await QRCode.toString(url, { ...common, type: 'svg', width: 1024 })

await writeFile(resolve(outDir, 'site-qr.png'), pngBuffer)
await writeFile(resolve(outDir, 'site-qr.svg'), svgText)
await writeFile(
  resolve(outDir, 'site-qr.txt'),
  [
    '《兽医免疫学》互动学习资源 · 二维码信息',
    `章节标识: ${slug}`,
    `目标地址: ${url}`,
    '生成时间: ' + new Date().toISOString(),
    '',
    '可用性说明：二维码本身不会过期，但它指向的站点地址必须持续可访问。',
    '若更换托管平台、仓库或域名，请重新运行 npm run qr -- <新地址>，并替换已印制的二维码。',
  ].join('\n'),
)

console.log('已生成：')
console.log(`  public/qr${slug === 'site' ? '' : '/' + slug}/site-qr.png`)
console.log(`  public/qr${slug === 'site' ? '' : '/' + slug}/site-qr.svg`)
console.log(`  public/qr${slug === 'site' ? '' : '/' + slug}/site-qr.txt`)
console.log(`章节标识: ${slug}`)
console.log(`目标地址: ${url}`)
