import { Link } from 'react-router-dom'
import { PageHeader } from '../components/learn'
import { usePageVisit } from '../components/progress'
import { Callout, SectionHead, Tag } from '../components/ui'
import { activeCourse } from '../content'

const LEVEL_TONE = {
  课件原文: 'gold',
  课件延伸: 'blue',
  补充阅读: 'line',
} as const

export default function Frontier() {
  usePageVisit('/frontier')

  return (
    <>
      <PageHeader
        eyebrow="学科前沿 · 研究进展"
        title="从“表位”到“设计”：抗原研究正在往哪走"
        en="Frontiers"
        lead="本页严格区分三类内容：课件原文、由课件延伸的常规做法、以及标注来源的补充阅读。凡非课件原文，均给出可核验来源。"
        meta={
          <>
            <Tag tone="gold">课件原文 2 条</Tag>
            <Tag tone="blue">课件延伸 2 条</Tag>
            <Tag tone="line">补充阅读 1 条</Tag>
          </>
        }
      />

      <section className="section section--tight">
        <div className="container">
          <div className="stack" style={{ gap: 18 }}>
            {activeCourse.frontier.map((f) => (
              <article key={f.id} className="frontier">
                <header>
                  <div className="row">
                    <Tag tone={LEVEL_TONE[f.level]}>{f.level}</Tag>
                    <Tag tone="line">{f.tag}</Tag>
                  </div>
                  <h2>{f.title}</h2>
                  {f.en ? <p className="xs muted mono">{f.en}</p> : null}
                </header>
                <p>{f.body}</p>
                <p className="small muted">
                  <strong>与本章的连接：</strong>
                  {f.link}
                </p>
                <p className="xs muted">
                  来源：
                  {f.source.url ? (
                    <a href={f.source.url} target="_blank" rel="noreferrer noopener">
                      {f.source.label}
                    </a>
                  ) : (
                    f.source.label
                  )}
                  {f.source.note ? ` · ${f.source.note}` : ''}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight section--mint">
        <div className="container">
          <SectionHead
            eyebrow="怎样读前沿"
            title="三条判断标准"
            intro="面对任何“新技术/新结论”，先问三个问题，再决定信不信、用不用。"
          />
          <div className="grid grid--3">
            {[
              { t: '证据层级', d: '是课件/教材共识，还是单篇研究？是预测结果，还是实验验证？' },
              { t: '适用范围', d: '结论来自哪种动物、哪种病原、哪种表达系统？能否迁移到你的问题？' },
              { t: '可复现性', d: '方法是否写清？关键参数是否公开？能否被独立重复？' },
            ].map((x) => (
              <article key={x.t} className="card card--flat">
                <h3 className="card__title">{x.t}</h3>
                <p className="small muted">{x.d}</p>
              </article>
            ))}
          </div>
          <Callout tone="gold" icon="📎" title="关于引用">
            本站不使用需要授权才能公开的图片或数据；所有图示为原创绘制。补充阅读仅给出可公开访问的教材/数据库链接，
            便于学生自行核对，不代替原文阅读。
          </Callout>
          <div className="row" style={{ marginTop: 16 }}>
            <Link className="btn" to="/modules/m2">
              回到模块二（表位与机制）
            </Link>
            <Link className="btn btn--ghost" to="/qr">
              扫码在手机上继续阅读
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
