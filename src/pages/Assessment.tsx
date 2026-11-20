import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/learn'
import { ScrollLink } from '../components/ScrollLink'
import { QuestionCard } from '../components/quiz'
import { usePageVisit, useProgress, useStats } from '../components/progress'
import { Callout, ProgressBar, SectionHead, Tag } from '../components/ui'
import { activeCourse, REQUIRED_PAGES } from '../content'

const GROUP_LABEL: Record<string, string> = {
  pre: '课前预习',
  module: '模块随堂',
  classroom: '课堂互动',
  homework: '课后作业',
  post: '课后测验',
  free: '自由练习',
}

export default function Assessment() {
  const copy = activeCourse.course.pageCopy.assessment
  usePageVisit('/assessment')
  const { state, reset, storageAvailable, toggleCheck } = useProgress()
  const stats = useStats(REQUIRED_PAGES)
  const [confirming, setConfirming] = useState(false)
  const postQuestions = activeCourse.groups.postTest
  const checked = state.checklist

  const pre = stats.byGroup.pre
  const post = stats.byGroup.post
  const growth = post.total && pre.total ? post.pct - pre.pct : null

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        en={copy.en}
        lead={copy.lead}
        meta={
          <>
            <Tag tone="gold">四维评价</Tag>
            <Tag tone="line">前后测对照</Tag>
            <Tag tone="line">数据仅存本机</Tag>
          </>
        }
      />

      <section className="section section--tight">
        <div className="container">
          <SectionHead
            eyebrow="评价方案"
            title="四个维度与权重"
            intro="权重与判据由任课教师依教学要求设定；下方权重为本章示例方案，可按课程要求调整。"
          />
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">维度</th>
                  <th scope="col">权重</th>
                  <th scope="col">评价依据</th>
                  <th scope="col">观测指标</th>
                  <th scope="col">数据来源</th>
                </tr>
              </thead>
              <tbody>
                {activeCourse.assessment.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <strong>{d.title}</strong>
                    </td>
                    <td className="mono">{d.weight}</td>
                    <td className="small">{d.basis}</td>
                    <td>
                      <ul className="small" style={{ margin: 0, paddingLeft: 18 }}>
                        {d.indicators.map((i) => (
                          <li key={i}>{i}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <Tag tone={d.source === '本地记录' ? 'mint' : 'line'}>{d.source}</Tag>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section--tight section--mint">
        <div className="container">
          <SectionHead
            eyebrow="我的学习数据"
            title="来自本机浏览器的记录"
            intro="这些数字只在你自己的设备上，用于自我诊断；教师端无法查看。"
          />
          <div className="grid grid--4">
            <article className="card">
              <p className="metric__label">页面学习完成度</p>
              <p className="metric__value">{stats.pagePct}%</p>
              <ProgressBar value={stats.pagePct} thin />
            </article>
            <article className="card">
              <p className="metric__label">已作答题目</p>
              <p className="metric__value">{stats.answeredTotal}</p>
              <p className="xs muted">含课前/随堂/互动/作业/测验</p>
            </article>
            <article className="card">
              <p className="metric__label">任务清单打卡</p>
              <p className="metric__value">
                {stats.checkedCount} / {activeCourse.checklist.length}
              </p>
              <ProgressBar value={(stats.checkedCount / activeCourse.checklist.length) * 100} thin />
            </article>
            <article className="card">
              <p className="metric__label">本地存储</p>
              <p className="metric__value" style={{ fontSize: '1.1rem' }}>
                {storageAvailable ? '可用' : '不可用'}
              </p>
              <p className="xs muted">
                {storageAvailable ? '记录已保存在本机' : '浏览器禁用了本地存储，刷新后记录会丢失'}
              </p>
            </article>
          </div>

          <div className="card" style={{ marginTop: 20 }}>
            <h3 className="card__title">各部分正确率</h3>
            <div className="bars">
              {Object.entries(stats.byGroup)
                .filter(([k, v]) => k !== 'free' && (v.total > 0 || k === 'pre' || k === 'post'))
                .map(([k, v]) => (
                  <div key={k} className="bars__row">
                    <span className="bars__label">{GROUP_LABEL[k]}</span>
                    <div className="bars__track">
                      <div className="bars__fill" style={{ width: `${v.pct}%` }} />
                    </div>
                    <span className="bars__value mono">
                      {v.total === 0 ? '—' : `${v.pct}% (${v.correct}/${v.total})`}
                    </span>
                  </div>
                ))}
            </div>
            <p className="xs muted" style={{ marginTop: 10 }}>
              提示：课前预习正确率天然偏低（因为还没学），这正是前后测对照的意义——看的是“进步幅度”。
            </p>
          </div>

          <div className="card card--mint" style={{ marginTop: 20 }}>
            <h3 className="card__title">课前—课后对照</h3>
            <div className="compare">
              <div>
                <p className="metric__label">课前预习正确率</p>
                <p className="metric__value">{pre.total ? `${pre.pct}%` : '未作答'}</p>
                <p className="xs muted">
                  {pre.correct} / {pre.total} 题
                </p>
              </div>
              <div className="compare__arrow" aria-hidden="true">
                →
              </div>
              <div>
                <p className="metric__label">课后测验正确率</p>
                <p className="metric__value">{post.total ? `${post.pct}%` : '待完成'}</p>
                <p className="xs muted">
                  {post.correct} / {post.total} 题
                </p>
              </div>
              <div>
                <p className="metric__label">进步幅度</p>
                <p className="metric__value" style={{ color: growth !== null && growth >= 0 ? 'var(--ok)' : 'var(--muted)' }}>
                  {growth === null ? '—' : `${growth > 0 ? '+' : ''}${growth} pt`}
                </p>
                <p className="xs muted">{post.total ? '按百分点计' : '完成课后测验后显示'}</p>
              </div>
            </div>
            {post.total === 0 ? (
              <p className="small">
                还没有完成课后测验。请向下滚动完成
                <ScrollLink id="posttest">课后测验（5 题）</ScrollLink>。
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <SectionHead eyebrow="学习任务清单" title="逐项打卡" intro="点击条目即可打勾，状态保存在本机浏览器。" />
          <ul className="checklist checklist--interactive">
            {activeCourse.checklist.map((item, i) => {
              const id = `check-${i}`
              const on = Boolean(checked[id])
              return (
                <li key={id}>
                  <button
                    type="button"
                    className={`checkitem ${on ? 'is-done' : ''}`}
                    aria-pressed={on}
                    onClick={() => toggleCheck(id)}
                  >
                    <span className="checkitem__box" aria-hidden="true">
                      {on ? '✓' : ''}
                    </span>
                    <span>{item}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="section section--tight section--mint" id="posttest">
        <div className="container">
          <SectionHead
            eyebrow="课后测验"
            title="5 题自测：与课前预习对照"
            intro="完成后回到上方查看“课前—课后对照”。每题都有解析与知识点回链。"
          />
          <div className="stack" style={{ gap: 16 }}>
            {postQuestions.map((q, i) => (
              <QuestionCard key={q.id} q={q} group="post" index={i} total={postQuestions.length} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <Callout tone="warn" icon="🔒" title="关于“学习分析后台”的说明">
            本站为纯静态站点，<strong>没有服务器数据库</strong>，因此不存在“教师可查看的学习分析后台”。
            页面上的统计只读取你本机浏览器的记录，用于自我诊断；正式成绩以任课教师掌握的过程性记录与提交材料为准。
          </Callout>
          <div className="row" style={{ marginTop: 16 }}>
            <Link className="btn btn--ghost" to="/homework">
              回到作业
            </Link>
            {confirming ? (
              <>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    reset()
                    setConfirming(false)
                  }}
                >
                  确认清空本机记录
                </button>
                <button type="button" className="btn btn--quiet" onClick={() => setConfirming(false)}>
                  取消
                </button>
              </>
            ) : (
              <button type="button" className="btn btn--quiet" onClick={() => setConfirming(true)}>
                清空本机学习记录
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
