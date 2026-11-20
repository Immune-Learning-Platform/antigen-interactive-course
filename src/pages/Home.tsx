import { Link } from 'react-router-dom'
import { ModelViewer } from '../three/ModelViewer'
import { createAntibodyScene } from '../three/createAntibodyScene'
import { KnowledgeGraph, PathTimeline } from '../components/learn'
import { EpitopeTypesVisual } from '../components/visuals'
import { usePageVisit, useStats } from '../components/progress'
import { ProgressBar, Reveal, SectionHead, Tag } from '../components/ui'
import { activeCourse, REQUIRED_PAGES } from '../content'

export default function Home() {
  usePageVisit('/')
  const stats = useStats(REQUIRED_PAGES)
  const course = activeCourse.course
  const tasks = [
    { id: 't1', title: '病原体结构抗原识别', desc: '在三维细菌/病毒上点选结构并说出抗原代号' },
    { id: 't2', title: '表位分类', desc: '把 6 条描述分入线性表位 / 构象表位两栏' },
    { id: 't3', title: '免疫应答流程排序', desc: '把“抗原→T 细胞活化”6 步排成正确顺序' },
    { id: 't4', title: '抗原—抗体匹配模拟', desc: '拖动互补度滑杆，观察结合强度变化' },
    { id: 't5', title: '快速判断', desc: '3 道抢答题，即时判定并给解析' },
    { id: 't6', title: '抗原变异情境决策', desc: '面对“抗体水平偏低”，选出有依据的处置思路' },
  ]

  return (
    <>
      {/* ============ 首屏 ============ */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="eyebrow">
              {course.chapter} · {course.en}
            </span>
            <h1 className="hero__title">
              {course.title}
              <span className="hero__en">{course.en}</span>
            </h1>
            <p className="hero__tagline">{course.tagline}</p>
            <p className="lead hero__lead">{course.lead}</p>

            <div className="hero__actions">
              <Link className="btn btn--lg" to="/pre-class">
                开始学习 · 课前 15 分钟
              </Link>
              <Link className="btn btn--ghost btn--lg" to="/classroom#t1">
                探索三维模型
              </Link>
            </div>

            <ul className="hero__keywords" aria-label="本节关键词">
              {course.keywords.map((k) => (
                <li key={k}>
                  <Tag tone="line">{k}</Tag>
                </li>
              ))}
            </ul>

            <dl className="hero__stats">
              {course.stats.map((s) => (
                <div key={s.label}>
                  <dt className="metric__value">{s.value}</dt>
                  <dd className="metric__label">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero__visual">
            <ModelViewer
              factory={createAntibodyScene}
              title="抗体识别抗原表位"
              badge="可交互三维模型"
              hint="拖动旋转 · 滚轮缩放 · 点击结构查看说明"
              height={460}
              fallback={
                <div style={{ padding: 16 }}>
                  <EpitopeTypesVisual />
                </div>
              }
            />
            <div className="hero__visualNote">
              <Tag tone="gold">本模型回答的问题</Tag>
              <p className="small">
                抗体到底“抓”住抗原的哪一部分？为什么变性之后有些表位就消失了？
                打开工具栏的“变性处理”，对比线性表位与构象表位。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 知识图谱 ============ */}
      <section className="section section--mint" id="graph">
        <div className="container">
          <SectionHead
            eyebrow="本节核心知识图谱"
            title="一个主题，三条主线，十五个知识点"
            intro="课程内容按课件三条授课主线组织：概念与特性（基础）→ 诱导应答的机制（难点）→ 兽医学重要抗原（重点）。点击节点可直接进入对应小节。"
          />
          <Reveal>
            <KnowledgeGraph graph={course.graph} />
          </Reveal>
          <div className="grid grid--3" style={{ marginTop: 24 }}>
            {activeCourse.modules.map((m) => (
              <article key={m.id} className="card card--hover">
                <div className="row row--between">
                  <span className="card__kicker">模块 {m.no}</span>
                  <Tag tone={m.role === '难点' ? 'orange' : m.role === '重点' ? 'gold' : 'mint'}>{m.role}</Tag>
                </div>
                <h3 className="card__title">
                  <Link to={`/modules/${m.id}`}>{m.title}</Link>
                </h3>
                <p className="small muted">{m.summary}</p>
                <p className="xs muted" style={{ marginTop: 8 }}>
                  {m.slides} · 建议 {m.minutes} 分钟
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 学习路径 ============ */}
      <section className="section" id="pathway">
        <div className="container">
          <div className="row row--between" style={{ alignItems: 'flex-end' }}>
            <SectionHead
              eyebrow="学习任务导航"
              title="课前 — 课中 — 课后：按顺序走完即可"
              intro="每完成一个页面，下方路径与顶部进度会自动更新（记录保存在本机浏览器）。"
            />
            <div style={{ minWidth: 220 }}>
              <ProgressBar value={stats.pagePct} label="本章学习进度" />
            </div>
          </div>
          <PathTimeline steps={course.pathway} />
        </div>
      </section>

      {/* ============ 可视化预览 ============ */}
      <section className="section section--mint" id="preview">
        <div className="container">
          <SectionHead
            eyebrow="重点知识可视化预览"
            title="抽象机制，用图和模型讲清楚"
            intro="站内图示与三维模型均为原创绘制：不沿用课件截图，避免低分辨率、水印与版权问题。"
          />
          <div className="previewGrid">
            <article className="card previewGrid__wide">
              <div className="row row--between">
                <h3 className="card__title">表位：线性 vs 构象</h3>
                <Tag tone="blue">可交互图示</Tag>
              </div>
              <EpitopeTypesVisual />
              <p className="xs muted">
                点“模拟变性处理”，观察构象表位如何消失、线性表位为何仍在。
              </p>
            </article>
            <div className="previewGrid__side">
              <article className="card card--hover">
                <h3 className="card__title">三维结构解剖台</h3>
                <p className="small muted">
                  细菌与病毒的结构成分抗原：H / O / 荚膜 / 菌毛 / 磷壁酸；衣壳蛋白 / 包膜糖蛋白 / 核酸抗原。
                </p>
                <Link className="btn btn--ghost btn--sm" to="/modules/m3#m3-structure">
                  进入三维解剖台
                </Link>
              </article>
              <article className="card card--hover">
                <h3 className="card__title">分步机制动画</h3>
                <p className="small muted">
                  抗原 → APC 摄取 → 加工 → MHC 递呈 → TCR 识别 → 活化，可暂停、重播、0.5×–2× 变速。
                </p>
                <Link className="btn btn--ghost btn--sm" to="/modules/m2#m2-types">
                  查看分步动画
                </Link>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 案例 + 互动入口 ============ */}
      <section className="section" id="enter">
        <div className="container">
          <div className="grid grid--2" style={{ gap: 32 }}>
            <div>
              <SectionHead
                eyebrow="代表性案例"
                title="三个真实问题，把知识用起来"
                intro="每个案例都按“真实问题 → 科学分析 → 知识应用 → 结果反馈”四段展开，并标注依据来源。"
              />
              <ul className="entrylist">
                {activeCourse.cases.map((c, i) => (
                  <li key={c.id}>
                    <Link to={`/cases#${c.id}`} className="entrylist__item">
                      <span className="num-pill num-pill--ghost">{i + 1}</span>
                      <span>
                        <strong>{c.title}</strong>
                        <span className="xs muted">{c.badge}</span>
                      </span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link className="btn btn--ghost btn--sm" to="/cases">
                进入案例教学
              </Link>
            </div>
            <div>
              <SectionHead
                eyebrow="课堂互动"
                title="六个任务，现场可操作、可判定"
                intro="每个任务都包含：任务情境 → 学生操作 → 结果反馈 → 机制解释 → 知识总结。"
              />
              <ul className="entrylist">
                {tasks.map((t, i) => (
                  <li key={t.id}>
                    <Link to={`/classroom#${t.id}`} className="entrylist__item">
                      <span className="num-pill num-pill--ghost">{i + 1}</span>
                      <span>
                        <strong>{t.title}</strong>
                        <span className="xs muted">{t.desc}</span>
                      </span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link className="btn btn--ghost btn--sm" to="/classroom">
                进入课堂互动
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 学完能做什么 ============ */}
      <section className="section section--ink">
        <div className="container">
          <SectionHead eyebrow="学习产出" title="学完本节，你应该能做到这三件事" />
          <div className="grid grid--3">
            {course.outcomes.map((o, i) => (
              <article key={o.title} className="card card--ink">
                <span className="card__kicker">0{i + 1}</span>
                <h3 className="card__title">{o.title}</h3>
                <p className="small">{o.body}</p>
              </article>
            ))}
          </div>
          <div className="row" style={{ marginTop: 28 }}>
            <Link className="btn btn--gold" to="/homework">
              查看课后作业
            </Link>
            <Link className="btn btn--ghost" to="/qr" style={{ color: '#eaf4f0', borderColor: 'rgba(255,255,255,.4)' }}>
              扫码在手机上学习
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 课程定位 ============ */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="本节在课程中的位置"
            title="全书用一套“国防体系”类比串起来"
            intro="依据课件“章节知识类比”页：第一章抗原是“敌方武装力量”，后面各章讲“国防体系如何应战”。"
          />
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">课程章节</th>
                  <th scope="col">类比对象（国防体系）</th>
                  <th scope="col">课程章节</th>
                  <th scope="col">类比对象（国防体系）</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.ceil(course.positioning.length / 2) }).map((_, i) => {
                  const left = course.positioning[i * 2]
                  const right = course.positioning[i * 2 + 1]
                  return (
                    <tr key={i} className={left?.current || right?.current ? 'is-current' : ''}>
                      <td>{left?.left}</td>
                      <td>{left?.right}</td>
                      <td>{right?.left}</td>
                      <td>{right?.right}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
