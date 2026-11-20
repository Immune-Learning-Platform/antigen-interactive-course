import { useEffect, useMemo, useState } from 'react'
import QRCode from 'qrcode'
import { PageHeader } from '../components/learn'
import { usePageVisit } from '../components/progress'
import { Callout, SectionHead, Tag } from '../components/ui'
import { activeCourse } from '../content'

/**
 * 扫码学习页
 * ---------------------------------------------------------------
 * 二维码由浏览器端实时生成（地址 = 当前站点根地址），因此：
 *   · 部署到正式地址后，二维码自动指向正确地方，不会出现“印着旧地址”的问题；
 *   · 如需可印刷的静态 PNG/SVG，运行 `npm run qr -- <正式网址>` 生成到 public/qr/。
 */
function siteRootUrl() {
  if (typeof window === 'undefined') return ''
  const { origin, pathname } = window.location
  const path = pathname.replace(/index\.html?$/, '').replace(/\/{2,}/g, '/')
  return origin + path
}

export default function QrShare() {
  usePageVisit('/qr')
  const [png, setPng] = useState('')
  const [svgUrl, setSvgUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const url = useMemo(() => siteRootUrl(), [])
  const pageCopy = activeCourse.course.pageCopy.qr

  useEffect(() => {
    let pngAlive = true
    let objectUrl = ''
    const opts = {
      margin: 1,
      width: 640,
      errorCorrectionLevel: 'M' as const,
      color: { dark: '#0b3b33', light: '#ffffff' },
    }
    QRCode.toDataURL(url, opts)
      .then((d) => {
        if (pngAlive) setPng(d)
      })
      .catch(() => setPng(''))
    QRCode.toString(url, { ...opts, type: 'svg' })
      .then((svg) => {
        objectUrl = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
        if (pngAlive) setSvgUrl(objectUrl)
      })
      .catch(() => setSvgUrl(''))
    return () => {
      pngAlive = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [url])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow={pageCopy.eyebrow}
        title={pageCopy.title}
        en={pageCopy.en}
        lead={pageCopy.lead}
        meta={
          <>
            <Tag tone="gold">固定地址</Tag>
            <Tag tone="line">HTTPS</Tag>
            <Tag tone="line">手机 / 平板 / 电脑通用</Tag>
          </>
        }
      />

      <section className="section section--tight">
        <div className="container">
          <div className="qrgrid">
            <div className="card qrcard">
              <h2 className="card__title">本章资源二维码</h2>
              {png ? (
                <img src={png} alt={`指向 ${url} 的二维码`} width={260} height={260} className="qrcard__img" />
              ) : (
                <p className="small muted">正在生成二维码…</p>
              )}
              <p className="xs muted mono qrcard__url">{url}</p>
              <div className="row">
                {png ? (
                  <a className="btn btn--sm" href={png} download="vet-immunology-antigen-qr.png">
                    下载 PNG
                  </a>
                ) : null}
                {svgUrl ? (
                  <a className="btn btn--ghost btn--sm" href={svgUrl} download="vet-immunology-antigen-qr.svg">
                    下载 SVG
                  </a>
                ) : null}
                <button type="button" className="btn btn--quiet btn--sm" onClick={copy}>
                  {copied ? '已复制' : '复制链接'}
                </button>
              </div>
            </div>

            <div className="stack">
              <div className="card">
                <h3 className="card__title">使用方法</h3>
                <ol className="small">
                  <li>手机相机或微信“扫一扫”对准二维码 → 打开本章资源。</li>
                  <li>课堂上可投屏本页，学生扫码进入课前/互动页面。</li>
                  <li>若用于打印材料，请下载 SVG（矢量，放大不失真）后排版。</li>
                </ol>
              </div>
              <div className="card">
                <h3 className="card__title">可用性说明（请如实告知使用者）</h3>
                <ul className="small">
                  <li>二维码本身不设过期时间，但它指向的<strong>站点地址必须持续可访问</strong>。</li>
                  <li>站点托管在第三方静态托管服务上：若仓库被删除、账号失效、托管策略变更或域名到期，链接可能失效。</li>
                  <li>建议在课程材料中同时保留纯文本链接与二维码，便于失效时补救。</li>
                  <li>校园网/单位网络若对境外托管有限制，请提前测试；必要时由学校网络环境放行。</li>
                </ul>
              </div>
            </div>
          </div>

          <Callout tone="warn" icon="🧪" title="跨设备自检清单（建议部署后逐项验证）">
            ① Windows 电脑 Chrome/Edge 打开正常；② Android 手机相机扫码可打开；③ iPhone 相机扫码可打开；
            ④ 4G/5G 与 Wi-Fi 两种网络均可访问；⑤ 刷新页面不出现 404；⑥ 页内栏目链接逐一点击无失效；
            ⑦ 三维模型与图示正常加载（弱网/低端机自动降级）；⑧ 深色模式与字号放大后仍可阅读。
          </Callout>
        </div>
      </section>

      <section className="section section--tight section--mint">
        <div className="container">
          <SectionHead
            eyebrow="维护说明"
            title="重新部署后，二维码为什么还能用"
            intro="因为二维码编码的是“站点根地址”，而不是某一次构建的产物地址。"
          />
          <ul className="takeaways">
            <li>内容更新：只替换站点文件，地址不变 → 二维码继续有效。</li>
            <li>需要印刷版：用同一地址生成静态 PNG/SVG，与页面内二维码一致。</li>
            <li>更换托管或域名：必须重新生成二维码，并同步更新已印制的材料。</li>
          </ul>
        </div>
      </section>
    </>
  )
}
