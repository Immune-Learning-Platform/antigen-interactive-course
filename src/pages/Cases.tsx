import { Link } from 'react-router-dom'
import { PageHeader } from '../components/learn'
import { usePageVisit } from '../components/progress'
import { Callout, SectionHead, Tag } from '../components/ui'
import { activeCourse } from '../content'

export default function Cases() {
  usePageVisit('/cases')

  return (
    <>
      <PageHeader
        eyebrow="案例教学 · 真实问题驱动"
        title="三个问题，三种“用得上”的免疫学"
        en="Case studies"
        lead="案例统一按“真实问题 → 科学分析 → 知识应用 → 结果反馈”四段呈现。每个案例都标注依据来源，并声明是否为教学情境——本页不虚构真实病例与实验数据。"
        meta={
          <>
            <Tag tone="gold">3 个案例</Tag>
            <Tag tone="line">建议 20 分钟</Tag>
            <Tag tone="line">含开放任务</Tag>
          </>
        }
      />

      <section className="section section--tight">
        <div className="container">
          <Callout tone="warn" icon="📌" title="关于案例真实性的说明">
            以下案例为<strong>教学情境</strong>：情境与问题依据本章课件（快检试纸、抗原变异、基因工程抗原流程、结构成分抗原）与公开教材结论构建，
            不对应任何具体养殖场、企业或研究团队的记录；文中不含虚构的实验数值。
          </Callout>

          <div className="stack" style={{ gap: 26, marginTop: 20 }}>
            {activeCourse.cases.map((c, i) => (
              <article key={c.id} id={c.id} className="casecard">
                <header className="casecard__head">
                  <span className="num-pill">{i + 1}</span>
                  <div>
                    <h2>{c.title}</h2>
                    {c.en ? <p className="xs muted mono">{c.en}</p> : null}
                  </div>
                  <Tag tone="blue">{c.badge}</Tag>
                </header>

                <div className="casecard__grid">
                  <div>
                    <h3 className="casecard__label">① 真实问题</h3>
                    <p>{c.background}</p>
                    <h4 className="xs muted" style={{ marginTop: 14 }}>
                      关键事实（可核验）
                    </h4>
                    <ul className="casefacts">
                      {c.facts.map((f) => (
                        <li key={f.text}>
                          <Tag tone="line">{f.label}</Tag>
                          <span>{f.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="casecard__label">② 科学分析</h3>
                    <ol className="caseanalysis">
                      {c.analysis.map((a) => (
                        <li key={a.title}>
                          <strong>{a.title}</strong>
                          <p className="small">{a.body}</p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h3 className="casecard__label">③ 知识应用（任务）</h3>
                    <p>{c.task}</p>
                    <h4 className="xs muted" style={{ marginTop: 14 }}>
                      ④ 结果反馈（判据）
                    </h4>
                    <ul className="checklist">
                      {c.feedback.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <footer className="casecard__foot">
                  <div className="row">
                    <span className="xs muted">关联模块：</span>
                    {c.moduleIds.map((id) => {
                      const m = activeCourse.modules.find((x) => x.id === id)
                      return m ? (
                        <Link key={id} className="tag tag--line" to={`/modules/${id}`}>
                          模块{m.no} {m.title}
                        </Link>
                      ) : null
                    })}
                  </div>
                  <p className="xs muted">
                    依据来源：
                    {c.sources.map((s, si) => (
                      <span key={s.label}>
                        {si > 0 ? '；' : ''}
                        {s.url ? (
                          <a href={s.url} target="_blank" rel="noreferrer noopener">
                            {s.label}
                          </a>
                        ) : (
                          s.label
                        )}
                      </span>
                    ))}
                  </p>
                  <p className="xs muted">真实性声明：{c.authenticity}</p>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight section--mint">
        <div className="container">
          <SectionHead
            eyebrow="案例学习方法"
            title="先自己写，再看反馈"
            intro="建议顺序：读情境 → 写 3 句话结论 → 展开科学分析 → 对照判据自查 → 回到模块补漏。"
          />
          <div className="grid grid--3">
            {[
              { t: '看得见的分子', d: '把“抗体抓不住病毒”翻译成“表位互补关系被改变”。' },
              { t: '说得清的链路', d: '每个结论都要落到“哪条特性、哪个表位、哪一步加工”。' },
              { t: '守得住的边界', d: '分清“课件结论”“教材共识”“我的推断”，并写出依据。' },
            ].map((x) => (
              <article key={x.t} className="card card--flat">
                <h3 className="card__title">{x.t}</h3>
                <p className="small muted">{x.d}</p>
              </article>
            ))}
          </div>
          <div className="row" style={{ marginTop: 24 }}>
            <Link className="btn" to="/classroom">
              去课堂互动练一遍
            </Link>
            <Link className="btn btn--ghost" to="/homework">
              进入课后作业
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
