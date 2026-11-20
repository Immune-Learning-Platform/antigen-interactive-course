import { Link } from 'react-router-dom'
import { PageHeader } from '../components/learn'
import { usePageVisit } from '../components/progress'
import { Callout, SectionHead, Tag } from '../components/ui'
import { activeCourse } from '../content'

export default function Ideology() {
  usePageVisit('/ideology')

  return (
    <>
      <PageHeader
        eyebrow="课程思政 · 价值引领"
        title="四个融入点：从分子机制到职业责任"
        en="Value education"
        lead="思政不是额外加一段话，而是从知识点本身“长出来”：抗原检测连着公共卫生，抗原制备连着生物安全，表位预测连着科学精神，疫苗创制连着产业能力。"
        meta={
          <>
            <Tag tone="gold">4 个融入点</Tag>
            <Tag tone="line">与知识点一一对应</Tag>
            <Tag tone="line">含反思题</Tag>
          </>
        }
      />

      <section className="section section--tight">
        <div className="container">
          <div className="stack" style={{ gap: 20 }}>
            {activeCourse.ideology.map((p, i) => (
              <article key={p.id} className="ideology">
                <header>
                  <span className="num-pill">{i + 1}</span>
                  <div>
                    <h2>{p.title}</h2>
                    {p.en ? <p className="xs muted mono">{p.en}</p> : null}
                  </div>
                </header>
                <p className="ideology__hook">“{p.hook}”</p>
                <div className="ideology__grid">
                  <div>
                    {p.body.map((b) => (
                      <p key={b.slice(0, 12)} className="small">
                        {b}
                      </p>
                    ))}
                  </div>
                  <div className="ideology__side">
                    <h3 className="xs muted">与知识点的结合</h3>
                    <p className="small">{p.link}</p>
                    <h3 className="xs muted" style={{ marginTop: 12 }}>
                      反思 / 讨论
                    </h3>
                    <p className="small">{p.reflection}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight section--mint">
        <div className="container">
          <SectionHead eyebrow="课堂组织建议" title="思政融入的三种做法" />
          <div className="grid grid--3">
            {[
              { t: '情境式', d: '用快检试纸的真实工作场景开场，让学生先感到“这件事与我有关”。' },
              { t: '辨析式', d: '给出“更贵的疫苗一定更好”这类说法，让学生用本课知识反驳。' },
              { t: '任务式', d: '把“为本地区某种动物疫病设计抗原方案”作为小组任务，落到能力上。' },
            ].map((x) => (
              <article key={x.t} className="card card--flat">
                <h3 className="card__title">{x.t}</h3>
                <p className="small muted">{x.d}</p>
              </article>
            ))}
          </div>
          <Callout tone="blue" icon="🧭" title="表述边界">
            本页所有表述均为教学层面的一般性讨论，不涉及具体单位、团队或个人成果归属；
            涉及领域进展的表述以“行业进展”呈现，不代表任何机构的评价结论。
          </Callout>
          <div className="row" style={{ marginTop: 16 }}>
            <Link className="btn" to="/frontier">
              看学科前沿
            </Link>
            <Link className="btn btn--ghost" to="/cases">
              回到案例教学
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
