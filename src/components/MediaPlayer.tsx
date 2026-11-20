import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { MediaClip } from '../content/types'
import { Tag } from './ui'

/* ==========================================================================
   视频 / 动画播放器（可复用，第 2—8 章通用）
   ---------------------------------------------------------------------------
   设计原则：
   1) 素材未核验时不投放：`available: false` 的条目只显示“待接入”说明，
      绝不出现一个点了没反应的播放按钮；
   2) 接入后即为标准控件：播放/暂停、进度、音量、全屏、倍速、键盘可操作；
   3) 所有视频来自站内相对路径（public/media/…），不依赖开发机本地路径，
      也不引用任何第三方视频平台（避免外链与追踪）。
   ========================================================================== */

export type MediaClipView = MediaClip & { animation?: ReactNode }

function VideoEl({ clip }: { clip: MediaClipView }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [rate, setRate] = useState(1)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onError = () => setFailed(true)
    el.addEventListener('error', onError)
    return () => el.removeEventListener('error', onError)
  }, [])

  if (failed) {
    return (
      <div className="mediaplayer__fallback" role="alert">
        <strong>视频加载失败</strong>
        <p className="small">
          可能是网络中断或该文件未随站点部署。请刷新重试；若持续失败，请通过页面说明的其它方式学习该知识点。
        </p>
      </div>
    )
  }

  return (
    <div className="mediaplayer__frame">
      <video
        ref={ref}
        className="mediaplayer__video"
        controls
        preload="metadata"
        playsInline
        poster={clip.poster}
        aria-label={`${clip.title}：${clip.caption}`}
      >
        <source src={clip.src} type="video/mp4" />
        你的浏览器不支持内嵌视频播放。
      </video>
      <div className="mediaplayer__bar">
        <label className="xs muted row" style={{ gap: 6 }}>
          倍速
          <select
            className="select"
            value={rate}
            aria-label="播放速度"
            onChange={(e) => {
              const v = Number(e.target.value)
              setRate(v)
              if (ref.current) ref.current.playbackRate = v
            }}
          >
            <option value={0.5}>0.5×</option>
            <option value={0.75}>0.75×</option>
            <option value={1}>1×</option>
            <option value={1.25}>1.25×</option>
            <option value={1.5}>1.5×</option>
            <option value={2}>2×</option>
          </select>
        </label>
        <button
          type="button"
          className="btn btn--quiet btn--sm"
          onClick={() => {
            const el = ref.current
            if (!el) return
            el.currentTime = 0
            void el.play()
          }}
        >
          ↺ 重播
        </button>
        {clip.duration ? <span className="xs muted mono">时长 {clip.duration}</span> : null}
      </div>
    </div>
  )
}

export function MediaPlayerList({ clips }: { clips: MediaClipView[] }) {
  if (clips.length === 0) return null
  return (
    <div className="mediaList">
      {clips.map((clip) => (
        <article key={clip.id} className={`mediaplayer ${clip.available ? '' : 'mediaplayer--pending'}`}>
          <header className="mediaplayer__head">
            <h3>{clip.title}</h3>
            <Tag tone={clip.available ? 'ok' : 'line'}>{clip.available ? '已接入' : '待核验接入'}</Tag>
            {clip.duration ? <Tag tone="line">{clip.duration}</Tag> : null}
          </header>

          {clip.available && clip.kind === 'video' && clip.src ? (
            <VideoEl clip={clip} />
          ) : null}

          {clip.available && clip.kind === 'animation' && clip.animation ? (
            <div className="mediaplayer__anim">{clip.animation}</div>
          ) : null}

          {!clip.available ? (
            <div className="mediaplayer__pending">
              <strong>该素材尚未接入</strong>
              <p className="small">
                课件中的此类视频含软件界面与可识别元素，需先完成内容核验与去标识化再公开投放。
                在核验完成前，本页用下方的三维模型与分步动画承担同一知识点的讲解，学习内容不缺失。
              </p>
            </div>
          ) : null}

          <footer className="mediaplayer__foot">
            <p className="small">
              <strong>内容说明：</strong>
              {clip.caption}
            </p>
            <p className="xs muted">
              <strong>来源与处置：</strong>
              {clip.provenance}
            </p>
          </footer>
        </article>
      ))}
    </div>
  )
}
