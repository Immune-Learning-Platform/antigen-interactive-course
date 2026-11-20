#!/usr/bin/env node
/**
 * 生成静态二维码（PNG + SVG），用于印刷或贴在 PPT / 讲义上。
 *
 * 用法：
 *   npm run qr -- https://example.github.io/antigen-interactive-course/
 *
 * 说明：
 *  · 二维码内容 = 你传入的固定网址（务必使用“站点根地址”，不要带 # 路由片段）；
 *  · 输出到 public/qr/，随站点一起部署，可用作长期复用的印刷素材；
 *  · 网址变更后必须重新生成，并同步替换已印制材料。
 */
import QRCode from 'qrcode'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const url = process.argv[2]
if (!url || !/^https?:\/\//.test(url)) {
  console.error('用法: npm run qr -- <https://你的站点根地址/>')
  process.exit(1)
}
if (url.includes('#')) {
  console.error('请传入站点根地址，不要包含 # 路由片段')
  process.exit(1)
}

const outDir = resolve(process.cwd(), 'public/qr')
await mkdir(outDir, { recursive: true })

const common = { errorCorrectionLevel: 'M', margin: 2, color: { dark: '#0b3b33', light: '#ffffff' } }

const pngBuffer = await QRCode.toBuffer(url, { ...common, type: 'png', width: 1024 })
const svgText = await QRCode.toString(url, { ...common, type: 'svg', width: 1024 })

await writeFile(resolve(outDir, 'site-qr.png'), pngBuffer)
await writeFile(resolve(outDir, 'site-qr.svg'), svgText)
await writeFile(
  resolve(outDir, 'site-qr.txt'),
  [
    '本章互动学习资源 · 二维码信息',
    `目标地址: ${url}`,
    '生成时间: ' + new Date().toISOString(),
    '',
    '可用性说明：二维码本身不会过期，但它指向的站点地址必须持续可访问。',
    '若更换托管平台、仓库或域名，请重新运行 npm run qr -- <新地址>，并替换已印制的二维码。',
  ].join('\n'),
)

console.log('已生成：')
console.log('  public/qr/site-qr.png')
console.log('  public/qr/site-qr.svg')
console.log('  public/qr/site-qr.txt')
console.log(`目标地址: ${url}`)
