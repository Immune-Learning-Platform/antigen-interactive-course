import type { CourseConfig } from '../types'

/**
 * 第5章 细胞因子 · 第3节 细胞因子应用
 * 依据：`4.细胞因子.pptx`（18 页）逐页重构。
 * 匿名化：课件中的“参赛教师自建信息化平台”与第三方资讯链接均未引入；
 *         课件所列兽用产品仅保留通用成分（如重组猫 IL-2 / IFN），不点名商品。
 */
export const cytokineCourse: CourseConfig = {
  id: 'cytokine',
  chapter: '第五章第三节',
  title: '细胞因子应用',
  en: 'Cytokine Applications',
  tagline: '信号传递 · 协同调控',
  lead:
    '细胞因子是免疫细胞之间传递信息、相互协助和制约的分子——在“国防体系”类比里，它们是“战斗信号”。本节先讲特性，再讲四种作用机制，最后落到临床应用与产业现状。',
  stats: [
    { value: '3', label: '知识模块' },
    { value: '6', label: '课堂互动任务' },
    { value: '2', label: '可交互三维模型' },
    { value: '15′', label: '课前建议用时' },
  ],
  keywords: ['多效性', '重叠性', '拮抗性', '协同性', '网络性', 'JAK-STAT', '细胞因子风暴', 'IFN-ω'],
  pageCopy: {
    preClass: {
      eyebrow: '课前学习 · 学习任务驱动型预习',
      title: '一条“战斗信号”的价值',
      en: 'Pre-class',
      lead: '先看一组犬细小病毒性肠炎的辅助治疗数据，再读 6 张知识卡。答完立刻能看到解析——不必一次记牢，把没想通的问题带进课堂。',
    },
    modules: {
      eyebrow: '模块学习 · 三个知识模块',
      title: '特性 → 机制 → 应用',
      en: 'Modules',
      lead: '模块一是特性（小分子、高效、五种性质），模块二是难点（四种作用机制），模块三是重点（临床应用与产业）。',
    },
    classroom: {
      eyebrow: '课堂互动 · 现场可操作',
      title: '六个任务，看懂“信号”如何被传递',
      en: 'Classroom interaction',
      lead: '每个任务都按“任务情境 → 学生操作 → 结果反馈 → 机制解释 → 知识总结”组织。建议课堂分组完成。',
    },
    cases: {
      eyebrow: '案例教学 · 真实问题驱动',
      title: '三个问题，三种“用得上”的细胞因子',
      en: 'Case studies',
      lead: '案例统一按“真实问题 → 科学分析 → 知识应用 → 结果反馈”四段呈现，并标注依据来源与真实性声明。',
    },
    homework: {
      eyebrow: '课后作业 · 分层任务',
      title: '基础 / 提升 / 拓展：按需完成任务',
      en: 'Homework',
      lead: '客观题即时判分并给出解析，可反复练习；开放题请先写再看参考思路。',
    },
    assessment: {
      eyebrow: '学习评价 · 形成性评价',
      title: '看清自己学到了哪一步',
      en: 'Assessment',
      lead: '评价由四部分组成：知识掌握、任务完成、互动练习、前后测对照。本页数据均来自本机浏览器。',
    },
    ideology: {
      eyebrow: '课程思政 · 价值引领',
      title: '四个融入点：从一条信号到一份责任',
      en: 'Value education',
      lead: '思政从知识点本身长出来：辅助治疗连着循证意识，细胞因子风暴连着风险认知，产业短板连着创新空间。',
    },
    frontier: {
      eyebrow: '学科前沿 · 研究进展',
      title: '从天然细胞因子到工程化药物',
      en: 'Frontiers',
      lead: '本页区分课件原文、课件延伸与补充阅读；凡非课件原文，均给出可核验来源。',
    },
    qr: {
      eyebrow: '扫码学习 · 手机端入口',
      title: '用手机扫描本章二维码',
      en: 'QR access',
      lead: '二维码指向本章的固定地址。重新部署内容后地址不变，二维码依然有效。',
    },
  },
  classroomTasks: [
    {
      id: 't1',
      title: '细胞因子—受体结合（三维）',
      scenario:
        '实验室给你一个细胞因子与其受体的模型。请上台操作，指出配体、受体与信号传向细胞核的方向，并说明“信号从哪进、到哪里去”。',
      mechanism: [
        '细胞因子通过与**靶细胞表面的特异性受体结合**，把**胞外信号传入细胞**，改变靶细胞的功能。',
        '不同细胞因子结合受体后激活不同通路：如增殖相关通路涉及 **JAK–STAT 信号轴**，把信号传递至细胞核调控基因表达。',
      ],
      summary: '细胞因子的工作方式是“信号”而非“执行”——它改变的是靶细胞的功能状态。',
      interaction: {
        kind: 'structure-lab',
        lab: 'cytokine-signal',
        goals: [
          { id: 'ligand', label: '找到细胞因子（配体）' },
          { id: 'receptor', label: '找到细胞表面受体' },
          { id: 'nucleus', label: '找到信号最终作用的细胞核' },
          { id: 'target', label: '找到靶细胞' },
        ],
        doneHint: '找到全部 4 项目标后，本任务自动记为完成。若三维不可用，可直接在右侧结构清单中点击查看。',
      },
    },
    {
      id: 't2',
      title: '四种作用机制归类',
      scenario:
        '课件给出四种机制：抗病毒、促增殖、促炎募集、趋化定向迁移。请把 6 条描述归入对应机制。',
      mechanism: [
        '**抗病毒**：干扰素与受体结合后经信号转导诱导**抗病毒蛋白**，抑制病毒复制。',
        '**促增殖**：与特异性受体结合，**促进靶细胞分裂**，使细胞数量增加；经 JAK–STAT 轴调控增殖。',
        '**促炎募集**：与炎症细胞受体结合后促进其**募集活化**，启动或增强炎症反应；IL-6 可放大细胞因子风暴。',
        '**趋化**：引导**定向迁移**——中性粒细胞沿趋化因子浓度梯度向炎症部位移动（CXCL8 → CXCR1/CXCR2 → G 蛋白 → 细胞骨架重排）。',
      ],
      summary: '四种机制的共同点是“受体介导”，区别在于信号传入后改变的是什么功能。',
      interaction: { kind: 'question', questionId: 'c04-t2', missingLabel: 'c04-t2（四种机制归类题）' },
    },
    {
      id: 't3',
      title: '五大特性辨析',
      scenario:
        '多效性、重叠性、拮抗性、协同性、网络性——五个词很像，但含义不同。请判断下列描述各指哪一种。',
      mechanism: [
        '**多效性**：一种细胞因子可作用于多种靶细胞、产生多种效应。',
        '**重叠性**：不同细胞因子可产生相同或相似的效应。',
        '**拮抗性**：一种细胞因子可抑制另一种细胞因子的作用。',
        '**协同性**：两种细胞因子共同作用的效果强于各自单独作用之和。',
        '**网络性**：细胞因子之间相互影响，构成复杂的调控网络。',
      ],
      summary: '五个词描述的是“一个因子对多目标”“多个因子对同一目标”“彼此增强/抑制”“整体成网”四种关系。',
      interaction: { kind: 'question', questionId: 'c04-t3', missingLabel: 'c04-t3（五大特性归类题）' },
    },
    {
      id: 't4',
      title: '分泌方式与作用范围',
      scenario:
        '同一种细胞因子可以通过自分泌、旁分泌或内分泌三种方式发挥作用。请判断三种情形分别属于哪一种。',
      mechanism: [
        '**自分泌**：细胞分泌的细胞因子作用于自身（如 T 细胞分泌 IL-2 促进自身增殖）。',
        '**旁分泌**：作用于邻近细胞。',
        '**内分泌**：进入血液循环作用于远距离靶细胞。',
        '课件指出细胞因子“以自分泌、旁分泌或内分泌形式发挥作用”，这三种方式决定了作用范围与起效速度。',
      ],
      summary: '自分泌管自己、旁分泌管邻居、内分泌管全身——范围依次扩大。',
      interaction: { kind: 'question', questionId: 'c04-t4', missingLabel: 'c04-t4（分泌方式判断题）' },
    },
    {
      id: 't5',
      title: '临床应用匹配',
      scenario:
        '四类细胞因子应用摆在面前：抗病毒辅助治疗、肿瘤治疗、抑制剂类药物、免疫调节。请把药物与用途对上号。',
      mechanism: [
        '**干扰素（IFN）**：具有抗病毒、抗肿瘤、免疫调节等多功能糖蛋白，用于犬、猫病毒病的辅助治疗。',
        '**白介素（IL）**：可直接作为药物/免疫调节剂使用（如重组 IL-2），也可针对通路开发药物（如抗 IL-6、抗 IL-5、IL-1 受体拮抗剂）。',
        '**课件举例**：重组猫 IL-2 制剂用于猫纤维肉瘤的治疗；重组猫 IFN-α 制剂用于犬猫病毒病。',
        '**产业分类**：细胞因子药物包括干扰素、白细胞介素、集落刺激因子、肿瘤坏死因子抑制剂和生长因子等类别。',
      ],
      summary: '“补它”与“抑它”是两条相反的应用路线：补（用 IFN/IL 治疗），抑（用抗体/拮抗剂控制过度反应）。',
      interaction: { kind: 'question-set', questionIds: ['c04-t5', 'c04-q1'] },
    },
    {
      id: 't6',
      title: '细胞因子风暴情境决策',
      scenario:
        '一例重症感染患犬出现高热、呼吸急促、炎症指标急剧升高，怀疑细胞因子风暴。请判断哪些处置思路有依据。',
      mechanism: [
        '课件指出：**细胞因子风暴是引起急性呼吸窘迫综合征和多器官衰竭的重要原因**。',
        '**IL-6 作用于血管内皮细胞**，促进内皮激活及炎症介质释放，**放大细胞因子风暴**并加重全身炎症反应。',
        '因此“抑制或中和细胞因子”成为疾病治疗的方向之一——这解释了抗 IL-6 等药物的研发思路。',
        '同时要注意：细胞因子本身是正常免疫应答所必需，抑制必须把握强度与时机，不能简单理解为“全部压掉”。',
      ],
      summary: '细胞因子是双刃剑：不足则防御不力，过度则自身损伤。治疗的关键是“调”而不是“灭”。',
      interaction: { kind: 'question', questionId: 'c04-t6', missingLabel: 'c04-t6（细胞因子风暴决策题）' },
    },
  ],
  objectives: {
    knowledge: [
      '能说出细胞因子的五项基本特性',
      '能说明四种作用机制（抗病毒、促增殖、促炎募集、趋化）',
      '能区分自分泌、旁分泌与内分泌三种作用方式',
      '能解释细胞因子风暴的形成与危害',
      '能列举细胞因子药物的主要类别与典型应用',
    ],
    ability: [
      '能借助模型讲清“受体介导—信号转导—功能改变”这条链条',
      '能比较“补充细胞因子”与“抑制细胞因子”两条应用路线',
      '能判断某一临床情境下细胞因子相关治疗是否适用',
    ],
    value: [
      '树立循证意识：数据要看分组与对照',
      '认识“双刃剑”风险，形成审慎的用药态度',
      '了解产业短板，建立创新意识',
    ],
    standard: '随堂小测与课堂互动正确率 ≥ 80%，并完成 1 次临床情境表述',
  },
  keyPoints: ['细胞因子的五项特性', '细胞因子的临床应用与产品类别'],
  hardPoints: [
    '四种作用机制的区分（尤其促炎募集与趋化的差别）',
    '多效性/重叠性/拮抗性/协同性/网络性五个概念的分辨',
    '细胞因子风暴的机制与“抑制但不可全灭”的治疗逻辑',
  ],
  nav: [
    { id: 'home', label: '首页', to: '/course-04', desc: '本章主题、学习路径与全部入口' },
    { id: 'pre', label: '课前学习', to: '/course-04/pre-class', desc: '情境导入 · 三维目标 · 预习任务' },
    {
      id: 'modules',
      label: '模块学习',
      to: '/course-04/modules',
      desc: '三个知识模块的正文与可视化',
      children: [
        { label: '模块一 细胞因子特性', to: '/course-04/modules/m1' },
        { label: '模块二 作用机制', to: '/course-04/modules/m2' },
        { label: '模块三 临床应用', to: '/course-04/modules/m3' },
      ],
    },
    { id: 'classroom', label: '课堂互动', to: '/course-04/classroom', desc: '六个互动任务的现场操作' },
    { id: 'cases', label: '案例教学', to: '/course-04/cases', desc: '真实问题驱动的三个案例' },
    { id: 'homework', label: '课后作业', to: '/course-04/homework', desc: '基础 / 提升 / 拓展三层任务' },
    { id: 'assessment', label: '学习评价', to: '/course-04/assessment', desc: '形成性评价与前后测对照' },
    { id: 'ideology', label: '课程思政', to: '/course-04/ideology', desc: '四个价值融入点' },
    { id: 'frontier', label: '学科前沿', to: '/course-04/frontier', desc: '工程化细胞因子药物' },
    { id: 'qr', label: '扫码学习', to: '/course-04/qr', desc: '本章固定网址二维码' },
  ],
  pathway: [
    { id: 'p0', stage: '课前', title: '带问题进课堂', detail: '看 1 组临床数据、读 6 张知识卡、做 4 道预习任务。', to: '/course-04/pre-class', minutes: 15 },
    { id: 'p1', stage: '课中', title: '模块一：细胞因子特性', detail: '小分子、高效性、三种分泌方式、五种性质。', to: '/course-04/modules/m1', minutes: 15 },
    { id: 'p2', stage: '课中', title: '模块二：作用机制（难点）', detail: '抗病毒、促增殖、促炎募集、趋化定向迁移。', to: '/course-04/modules/m2', minutes: 25 },
    { id: 'p3', stage: '课中', title: '模块三：临床应用（重点）', detail: 'IFN 与 IL 的应用、细胞因子风暴、产业现状。', to: '/course-04/modules/m3', minutes: 20 },
    { id: 'p4', stage: '课中', title: '课堂互动', detail: '受体结合、四机制归类、五特性辨析、分泌方式、应用匹配、风暴决策。', to: '/course-04/classroom', minutes: 15 },
    { id: 'p5', stage: '课后', title: '作业与评价', detail: '三层作业 + 学习评价，对照课前—课后测验结果。', to: '/course-04/homework', minutes: 25 },
  ],
  graph: {
    nodes: [
      { id: 'root', label: '细胞因子', en: 'Cytokine', level: 1, to: '/course-04' },
      { id: 'm1', label: '特性', en: 'Properties', level: 2, to: '/course-04/modules/m1' },
      { id: 'm2', label: '作用机制', en: 'Mechanisms', level: 2, to: '/course-04/modules/m2', flag: '难点' },
      { id: 'm3', label: '临床应用', en: 'Applications', level: 2, to: '/course-04/modules/m3', flag: '重点' },
      { id: 'g1', label: '小分子·高效', level: 3, to: '/course-04/modules/m1' },
      { id: 'g2', label: '三种分泌方式', level: 3, to: '/course-04/modules/m1' },
      { id: 'g3', label: '多效性/网络性', level: 3, to: '/course-04/modules/m1' },
      { id: 'g4', label: '抗病毒', level: 3, to: '/course-04/modules/m2' },
      { id: 'g5', label: '促增殖', level: 3, to: '/course-04/modules/m2' },
      { id: 'g6', label: '促炎募集', level: 3, to: '/course-04/modules/m2' },
      { id: 'g7', label: '趋化迁移', level: 3, to: '/course-04/modules/m2' },
      { id: 'g8', label: 'IFN 应用', level: 3, to: '/course-04/modules/m3' },
      { id: 'g9', label: 'IL 应用', level: 3, to: '/course-04/modules/m3' },
      { id: 'g10', label: '细胞因子风暴', level: 3, to: '/course-04/modules/m3' },
    ],
    links: [
      ['root', 'm1'], ['root', 'm2'], ['root', 'm3'],
      ['m1', 'g1'], ['m1', 'g2'], ['m1', 'g3'],
      ['m2', 'g4'], ['m2', 'g5'], ['m2', 'g6'], ['m2', 'g7'],
      ['m3', 'g8'], ['m3', 'g9'], ['m3', 'g10'],
    ],
  },
  preClass: {
    scenario: {
      title: '一组数据：IFN-ω 辅助治疗犬细小病毒性肠炎',
      en: 'Field scenario',
      body: [
        '犬细小病毒感染发病急、危害大、死亡率高。课件给出了一组辅助治疗的对照数据：',
        '**常规治疗 + IFN-ω 组：10 天内死亡 3/43（7%）；常规治疗 + 安慰剂组：10 天内死亡 14/49（28.6%）**。',
        '这组数据说明了什么？它能不能证明“干扰素能治细小”？读的时候请留意：两组都在“常规治疗”之上比较，且是辅助治疗——这决定了结论的边界。',
      ],
      questions: [
        '细胞因子是什么？它和抗体、激素有什么区别？',
        '为什么一个细胞因子能作用于很多种细胞，而效果又各不相同？',
        '细胞因子既然是“信号”，为什么也会造成损伤？',
      ],
      visual: 'concept-timeline',
    },
    taskIds: ['c04-pre1', 'c04-pre2', 'c04-pre3', 'c04-pre4'],
    cards: [
      { title: '细胞因子', en: 'Cytokine', body: '免疫细胞之间传递信息、相互协助和制约的分子；多为小分子（8～30kD）多肽或蛋白质。', tags: ['课件定义', '核心概念'] },
      { title: '多效性', en: 'Pleiotropy', body: '一种细胞因子可作用于多种靶细胞、产生多种生物学效应。', tags: ['五大特性'] },
      { title: '重叠性 / 协同性 / 拮抗性', en: 'Redundancy / Synergy / Antagonism', body: '重叠：不同因子效应相似；协同：共同作用强于单独之和；拮抗：一种抑制另一种。', tags: ['五大特性'] },
      { title: '网络性', en: 'Network', body: '细胞因子之间相互影响，构成复杂的调控网络——这也是“牵一发而动全身”的原因。', tags: ['五大特性'] },
      { title: '细胞因子风暴', en: 'Cytokine storm', body: '促炎细胞因子过度释放形成的失控级联，是引起急性呼吸窘迫综合征和多器官衰竭的重要原因。', tags: ['临床意义'] },
      { title: 'IFN / IL', en: 'Interferon / Interleukin', body: '干扰素具有抗病毒、抗肿瘤、免疫调节等多功能；白介素可直接作药物或作为通路靶点开发抑制剂。', tags: ['应用'] },
    ],
    prior: [
      { subject: '第四章 抗体', text: '上一章讲“精准制导导弹”（抗体），本章讲“战斗信号”（细胞因子）——两者常配合使用（如抗体+细胞因子联用）。' },
      { subject: '细胞生物学', text: '受体—信号转导—基因表达这条通路是理解本章机制的基础。' },
      { subject: '后续章节', text: '第八章适应性免疫应答会用到 IL-2 等因子的增殖作用；第十章免疫学技术会用到细胞因子的检测。' },
    ],
  },
  outcomes: [
    { title: '说得清', body: '能用“受体介导—信号转导—功能改变”一句话概括细胞因子的工作方式。' },
    { title: '分得开', body: '能分清多效性、重叠性、拮抗性、协同性、网络性五个概念，不再混用。' },
    { title: '看得懂', body: '能读懂一组临床对照数据的分组与结论边界，不被数字表象误导。' },
  ],
  positioning: [
    { left: '第一章 抗原', right: '敌方武装力量' },
    { left: '第二章 免疫系统', right: '国家的国防体系' },
    { left: '第三章 免疫细胞', right: '国防体系各兵种士兵' },
    { left: '第四章 抗体', right: '精准制导导弹' },
    { left: '第五章 细胞因子', right: '战斗信号', current: true },
    { left: '第六章 补体系统', right: '智能地雷' },
    { left: '第七章 先天性免疫应答', right: '边防武警部队' },
    { left: '第八章 适应性免疫应答', right: '特种作战部队' },
    { left: '第九章 超敏反应', right: '友军误击 / 过度火力覆盖' },
    { left: '第十章 免疫学技术', right: '敌情侦察与情报分析' },
    { left: '第十一章 疫苗与免疫预防', right: '新兵军事演习与战前推演' },
  ],
}
