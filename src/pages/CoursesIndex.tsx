import { Link } from 'react-router-dom'
import { chapterRegistry, firstChapter } from '../content/registry'
import { Tag } from '../components/ui'

/**
 * 系列课程总入口
 * ---------------------------------------------------------------
 * 路径：`/#/courses`（**不占用**第 1 章的根路径，也不覆盖其首页）
 * 作用：展示 8 个课件的封面、章节名与简介，点击进入各自站点。
 *
 * 说明：本页属于“系列导航”，不属于任何一个章节的内容包，
 * 因此不使用 CourseProvider / AppShell 的章节级 UI。
 */
export default function CoursesIndex() {
  type Tile = {
    id: string
    title: string
    tagline: string
    source: string
    path: string
    isFirst: boolean
  }
  const all: Tile[] = [
    { ...firstChapter, path: '/', isFirst: true },
    ...chapterRegistry.map((c) => ({
      id: c.id,
      title: c.title,
      tagline: c.tagline,
      source: c.source,
      path: `/${c.segment}`,
      isFirst: false,
    })),
  ]

  return (
    <div className="coursesIndex">
      <header className="coursesIndex__hero">
        <div className="container">
          <span className="eyebrow">系列数字化交互教学资源</span>
          <h1>《兽医免疫学》互动学习资源</h1>
          <p className="lead">
            以“抗原入侵与免疫保卫”为主线，把课程内容转化为可视化、可操作、可评价的在线学习资源。
            每个课件独立访问、独立二维码，可单独用于课前预习、课堂演示或课后复习。
          </p>
          <div className="coursesIndex__meta">
            <Tag tone="gold">{all.length} 个课件</Tag>
            <Tag tone="line">三个模块 / 六个互动任务 / 三层作业</Tag>
            <Tag tone="line">支持电脑与手机</Tag>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="coursesGrid">
            {all.map((c, i) => (
              <article key={c.id} className={`courseTile ${c.isFirst ? 'courseTile--first' : ''}`}>
                <div className="courseTile__cover" aria-hidden="true">
                  <span className="courseTile__no">{String(i + 1).padStart(2, '0')}</span>
                  <svg viewBox="0 0 120 70" role="presentation">
                    <circle cx="26" cy="35" r="13" fill="none" stroke="rgba(143,201,174,.75)" strokeWidth="2" />
                    <path d="M46 20v10l9 9M46 50V40l9-9" fill="none" stroke="rgba(201,162,39,.85)" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="26" cy="35" r="4.5" fill="rgba(201,162,39,.9)" />
                    <path d="M70 35h34" stroke="rgba(255,255,255,.25)" strokeWidth="1.5" />
                    <path d="M78 24h26M78 46h26" stroke="rgba(255,255,255,.14)" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="courseTile__body">
                  <div className="row row--between">
                    <span className="card__kicker">第 {i + 1} 个课件</span>
                    {c.isFirst ? <Tag tone="gold">受保护基线</Tag> : null}
                  </div>
                  <h2 className="courseTile__title">{c.title}</h2>
                  <p className="courseTile__tagline">{c.tagline}</p>
                  <p className="xs muted">{c.source}</p>
                  <Link className="btn btn--sm" to={c.path}>
                    进入学习
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="callout callout--blue" style={{ marginTop: 28 }}>
            <span className="callout__icon" aria-hidden="true">
              ⓘ
            </span>
            <div>
              <strong>关于本页路径</strong>
              <br />
              本页是系列课程的总入口（<code>#/courses</code>），不覆盖任何课件的首页。
              各课件拥有独立地址与独立二维码，重新部署内容不会改变地址。
            </div>
          </div>
        </div>
      </section>

      <footer className="coursesIndex__footer">
        <div className="container">
          <p className="xs">
            内容依据《兽医免疫学》课堂教学课件重构；站内图示与三维模型均为原创矢量/程序化绘制。
            学习进度保存在本机浏览器，不上传服务器。
          </p>
          <Link className="btn btn--ghost btn--sm" to="/">
            从第一个课件开始
          </Link>
        </div>
      </footer>
    </div>
  )
}
