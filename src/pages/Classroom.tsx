import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, TaskCard } from '../components/learn'
import { ScrollLink } from '../components/ScrollLink'
import { StructureLab } from '../components/labs'
import { QuestionCard } from '../components/quiz'
import { BindingSimulator } from '../components/BindingSimulator'
import { usePageVisit, useProgress } from '../components/progress'
import { Callout, ProgressBar, SectionHead, Tag } from '../components/ui'
import { activeCourse, questionsOf } from '../content'

const STRUCTURE_GOALS = [
  { id: 'flagella', label: '找到“H 抗原”（鞭毛）' },
  { id: 'wall', label: '找到“O 抗原”（菌体 / 细胞壁）' },
  { id: 'capsule', label: '找到荚膜抗原' },
  { id: 'teichoic', label: '找到革兰阳性菌的磷壁酸' },
]

export default function Classroom() {
  usePageVisit('/classroom')
  const { state, recordAnswer } = useProgress()
  const [found, setFound] = useState<Record<string, boolean>>({})
  const quick = questionsOf(['cl-q1', 'cl-q2', 'cl-q3'])

  const answeredClassroom = Object.values(state.answers).filter((a) => a.group === 'classroom').length
  const classroomTotal = 6

  return (
    <>
      <PageHeader
        eyebrow="课堂互动 · 现场可操作"
        title="六个任务，把“看懂”变成“会做”"
        en="Classroom interaction"
        lead="每个任务都按“任务情境 → 学生操作 → 结果反馈 → 机制解释 → 知识总结”组织。建议课堂分组完成，每组 1—2 个任务，完成后向全班讲解机制。"
        meta={
          <>
            <Tag tone="gold">6 个任务</Tag>
            <Tag tone="line">建议 15 分钟</Tag>
            <Tag tone="line">即时反馈</Tag>
            <Tag tone="line">可键盘操作</Tag>
          </>
        }
      />

      <section className="section section--tight">
        <div className="container">
          <nav className="taskindex" aria-label="任务索引">
            {[
              ['t1', '结构抗原识别'],
              ['t2', '表位分类'],
              ['t3', '应答流程排序'],
              ['t4', '结合匹配模拟'],
              ['t5', '快速判断'],
              ['t6', '变异情境决策'],
            ].map(([id, label]) => (
              <ScrollLink key={id} id={id} className="taskindex__btn">
                {label}
              </ScrollLink>
            ))}
          </nav>
          <div className="row row--between" style={{ marginTop: 16 }}>
            <span className="small muted">本页已完成互动记录：{answeredClassroom} 项</span>
            <div style={{ minWidth: 220 }}>
              <ProgressBar value={(answeredClassroom / classroomTotal) * 100} thin />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="stack" style={{ gap: 28 }}>
            <TaskCard
              index={1}
              id="t1"
              title="病原体结构抗原识别（三维）"
              scenario="实验室给你两株病原：一株革兰阳性菌、一株有囊膜病毒。请上台操作三维模型，指出各结构成分抗原，并说出它的代号。"
              mechanism={
                <>
                  <p className="small">
                    细菌的结构成分抗原：<strong>H 抗原</strong>（鞭毛）、<strong>O 抗原</strong>（菌体/细胞壁）、
                    荚膜抗原、菌毛抗原，以及革兰阳性菌的<strong>磷壁酸</strong>。
                    病毒的结构成分抗原：<strong>衣壳蛋白</strong>、<strong>包膜糖蛋白</strong>、<strong>核酸抗原</strong>。
                  </p>
                  <div className="goals" role="group" aria-label="任务目标清单">
                    {STRUCTURE_GOALS.map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        className={`goal ${found[g.id] ? 'is-done' : ''}`}
                        aria-pressed={Boolean(found[g.id])}
                        onClick={() => {
                          const next = { ...found, [g.id]: !found[g.id] }
                          setFound(next)
                          const done = STRUCTURE_GOALS.every((x) => next[x.id])
                          if (done) recordAnswer('task-t1', true, 'classroom', 'structures-found')
                        }}
                      >
                        <span aria-hidden="true">{found[g.id] ? '✓' : '○'}</span>
                        {g.label}
                      </button>
                    ))}
                  </div>
                  <p className="xs muted">
                    找到全部 4 项目标后，本任务自动记为完成。若三维不可用，可直接在右侧结构清单中点击查看（内容一致）。
                  </p>
                </>
              }
              summary="“结构成分抗原”是细菌分型与疫苗设计的分子基础：同一株菌的不同零件，是不同抗体识别的对象。"
            >
              <StructureLab />
            </TaskCard>

            <TaskCard
              index={2}
              id="t2"
              title="表位分类：线性还是构象？"
              scenario="给你 6 张描述卡。请判断每条描述说的是线性表位还是构象表位，并把卡片放进对应分类框。"
              mechanism={
                <p className="small">
                  判断的关键是问一句：<strong>这条性质是否依赖空间折叠？</strong>
                  依赖折叠 → 构象表位（变性即消失）；只看氨基酸顺序 → 线性表位（变性仍保留）。
                  T 细胞之所以“只能看到线性表位”，正是因为它识别的是被 MHC 递呈的加工后肽段。
                </p>
              }
              summary="线性表位讲“序列”，构象表位讲“形状”；这决定了疫苗抗原该不该保持天然构象。"
            >
              <QuestionCard q={activeCourse.questions['cl-t2']} group="classroom" />
            </TaskCard>

            <TaskCard
              index={3}
              id="t3"
              title="免疫应答启动流程排序"
              scenario="小组把 6 张步骤卡按“抗原 → T 细胞活化”的正确顺序排列，然后派代表说明每一步为什么不能颠倒。"
              mechanism={
                <p className="small">
                  顺序的关键在于：T 细胞看不到完整抗原。必须先由 APC <strong>摄取 → 加工 → MHC 递呈</strong>，
                  TCR 才有东西可识别；识别之后才谈活化与分化。把“TCR 识别”提前，就等于让 T 细胞去看一个它看不到的东西。
                </p>
              }
              summary="摄取 → 加工 → 递呈 → 识别 → 活化：这条链条解释了为什么“灭活不当/构象破坏”会影响细胞免疫。"
            >
              <QuestionCard q={activeCourse.questions['cl-t3']} group="classroom" />
            </TaskCard>

            <TaskCard
              index={4}
              id="t4"
              title="抗原—抗体匹配模拟"
              scenario="拖动滑杆改变“表位与抗体可变区的互补度”，观察结合强度的变化，并解释：为什么抗原变异会让原有抗体“抓不住”病毒？"
              mechanism={
                <p className="small">
                  抗原变异（氨基酸替换）改变了表位表面的形状与化学性质，等价于把滑杆往左拖：
                  <strong>互补度下降 → 结合变弱 → 中和能力下降</strong>。
                  但要注意，“结合得牢”不等于“能中和”——中和还要求抗体结合的是病毒表面与感染相关的关键表位。
                </p>
              }
              summary="抗体的特异性来自“可变区—表位”的互补；表位一变，原有的互补关系就被打破。"
            >
              <BindingSimulator />
            </TaskCard>

            <TaskCard
              index={5}
              id="t5"
              title="快速判断（3 题）"
              scenario="课堂抢答：每题限时 20 秒，答完立刻显示判定与解析。可以个人作答，也可以小组统一作答。"
              mechanism={
                <p className="small">
                  三题分别对应：细菌结构成分抗原的代号（O/H）、病毒抗原成分的组成、AI 在抗原结构解析中的作用与边界。
                </p>
              }
              summary="O = 菌体、H = 鞭毛；病毒有衣壳蛋白/包膜糖蛋白/核酸抗原；AI 预测需实验验证。"
            >
              <div className="stack" style={{ gap: 14 }}>
                {quick.map((q, i) => (
                  <QuestionCard key={q.id} q={q} group="classroom" index={i} total={quick.length} />
                ))}
              </div>
            </TaskCard>

            <TaskCard
              index={6}
              id="t6"
              title="抗原变异情境决策"
              scenario="某场 H9 亚型禽流感免疫后抗体水平偏低，场方要求“马上换更贵的疫苗”。请先判断哪些处置思路有依据，再给出你的建议顺序。"
              mechanism={
                <p className="small">
                  抗体水平偏低至少有三类原因：<strong>抗原质量</strong>（含量、完整性、保存）、
                  <strong>抗原匹配性</strong>（流行株关键位点是否变异）、
                  <strong>免疫实施</strong>（日龄、剂量、途径、佐剂）。
                  科学的顺序是“先分因，再决策”，而不是把价格当作有效性的证据。
                </p>
              }
              summary="遇到免疫失败，先分清“抗原问题 / 匹配问题 / 实施问题”，再谈换不换疫苗。"
            >
              <QuestionCard q={activeCourse.questions['cl-t6']} group="classroom" />
            </TaskCard>
          </div>
        </div>
      </section>

      <section className="section section--tight section--mint">
        <div className="container">
          <SectionHead eyebrow="课堂收束" title="从操作回到概念" />
          <ul className="takeaways">
            <li>结构成分抗原是“病原的零件”，不同零件对应不同抗体与不同血清型。</li>
            <li>表位是特异性的结构基础；线性/构象的差别决定了抗原制备与检测条件。</li>
            <li>抗体结合依赖互补；表位改变会同步影响反应原性（旧抗体失效）与免疫原性（新表位）。</li>
            <li>免疫失败要先分因：抗原质量、抗原匹配、免疫实施，三者不能混为一谈。</li>
          </ul>
          <Callout tone="blue" icon="🧪" title="课后延伸">
            想进一步练习？请进入
            <Link to="/homework"> 课后作业 </Link>
            完成提升层的“变异分析”与“流程排序”，并在
            <Link to="/assessment"> 学习评价 </Link>
            页查看前后测对照。
          </Callout>
          <p className="xs muted">本页互动记录保存在本机浏览器，教师端不可见。</p>
        </div>
      </section>
    </>
  )
}
