import { Link } from 'react-router-dom'
import { PageHeader } from '../components/learn'
import { usePageVisit, useProgress } from '../components/progress'
import { Callout, ProgressBar, SectionHead, Tag } from '../components/ui'
import { useGlossary } from '../components/glossary'
import { activeCourse } from '../content'

export default function Modules() {
  usePageVisit('/modules')
  const { state } = useProgress()
  const course = activeCourse.course
  const glossary = useGlossary()
  const doneCount = activeCourse.modules.filter((m) => state.visited[`/modules/${m.id}`]).length

  return (
    <>
      <PageHeader
        eyebrow="模块学习 · 三个知识模块"
        title="按课件三条主线，逐层深入"
        en="Modules"
        lead="模块一是基础（概念与特性），模块二是难点（诱导应答的机制），模块三是重点（兽医学重要抗原）。每个模块都有目标卡、正文、可视化与随堂小测。"
        meta={
          <>
            <Tag tone="gold">3 个模块</Tag>
            <Tag tone="line">共 60 分钟</Tag>
            <Tag tone="line">每模块含随堂小测</Tag>
          </>
        }
      />

      <section className="section section--tight">
        <div className="container">
          <div className="row row--between" style={{ marginBottom: 20 }}>
            <p className="muted small" style={{ margin: 0 }}>
              已完成 {doneCount} / {activeCourse.modules.length} 个模块
            </p>
            <div style={{ minWidth: 240 }}>
              <ProgressBar value={(doneCount / activeCourse.modules.length) * 100} thin />
            </div>
          </div>

          <div className="stack" style={{ gap: 20 }}>
            {activeCourse.modules.map((m) => {
              const visited = Boolean(state.visited[`/modules/${m.id}`])
              return (
                <article key={m.id} className="card card--hover modulecard">
                  <div className="modulecard__head">
                    <span className="num-pill">{m.no}</span>
                    <div>
                      <h2 className="card__title">
                        <Link to={`/modules/${m.id}`}>{m.title}</Link>
                        <span className="xs muted mono">{m.en}</span>
                      </h2>
                      <div className="row" style={{ marginTop: 6 }}>
                        <Tag tone={m.role === '难点' ? 'orange' : m.role === '重点' ? 'gold' : 'mint'}>{m.role}</Tag>
                        <Tag tone="line">{m.slides}</Tag>
                        <Tag tone="line">建议 {m.minutes} 分钟</Tag>
                        {visited ? <Tag tone="ok">已学习</Tag> : null}
                      </div>
                    </div>
                  </div>
                  <p>{m.summary}</p>
                  <div className="modulecard__cols">
                    <div>
                      <h4 className="xs muted">学习目标</h4>
                      <ul className="small">
                        {m.objectives.map((o) => (
                          <li key={o}>{o}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="xs muted">本模块小节</h4>
                      <ul className="small">
                        {m.sections.map((s) => (
                          <li key={s.id}>
                            <Link to={`/modules/${m.id}#${s.id}`}>{s.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <Link className="btn btn--sm" to={`/modules/${m.id}`}>
                      进入模块{m.no === 1 ? '一' : m.no === 2 ? '二' : '三'}
                    </Link>
                    <span className="xs muted">含 {m.sections.reduce((n, s) => n + (s.quizIds?.length ?? 0), 0)} 道随堂小测</span>
                  </div>
                </article>
              )
            })}
          </div>

          <Callout tone="blue" icon="🧭" title="学习建议">
            建议按“目标卡 → 正文 → 可视化 → 随堂小测”的顺序学习。遇到三维模型，先自己说出结构名称，再看面板反馈——先思考，后看答案，效果差别很大。
          </Callout>
        </div>
      </section>

      <section className="section section--tight section--mint" id="glossary">
        <div className="container">
          <SectionHead
            eyebrow="术语表"
            title="本节专业术语（中英对照）"
            intro="专业名称统一采用准确的简体中文，保留必要英文缩写与全称，便于后续英文文献阅读。"
          />
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">中文术语</th>
                  <th scope="col">English</th>
                  <th scope="col">释义</th>
                </tr>
              </thead>
              <tbody>
                {glossary.map((g) => (
                  <tr key={g.term}>
                    <td>
                      <strong>{g.term}</strong>
                    </td>
                    <td className="mono xs">{g.en}</td>
                    <td>{g.def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="xs muted" style={{ marginTop: 10 }}>
            释义依据本章课件表述；术语对照参考 Janeway’s Immunobiology 术语表（NCBI Bookshelf NBK10759）核对。
          </p>
          <div className="row" style={{ marginTop: 20 }}>
            <Link className="btn" to="/classroom">
              进入课堂互动
            </Link>
            <Link className="btn btn--ghost" to="/cases">
              进入案例教学
            </Link>
          </div>
          <p className="xs muted" style={{ marginTop: 12 }}>
            本章共 {course.graph.nodes.length - 1} 个知识点节点，图谱见
            <Link to="/#graph"> 首页知识图谱</Link>。
          </p>
        </div>
      </section>
    </>
  )
}
