import type { CourseConfig } from '../types'

/**
 * 第8章 适应性免疫应答 · 第3节 细胞免疫应答
 * 依据：`5.细胞免疫应答.pptx`（18 页）逐页重构。
 * 匿名化处置：
 *  · 课件中的第三方视频链接（bilibili）未引入；
 *  · “参赛教师自建信息化平台”未引入；
 *  · 课件“实验室创新成果”页涉及具体单位成果，本站改为不指代单位的技术表述。
 */
export const cellularCourse: CourseConfig = {
  id: 'cellular',
  chapter: '第八章第三节',
  title: '细胞免疫应答',
  en: 'Cellular Immune Response',
  tagline: '精准识别 · 靶向清除',
  lead:
    '体液免疫靠抗体“拦截”，细胞免疫靠 T 细胞“清除”——针对的是藏进细胞里的病原和突变细胞。本节按致敏、反应、效应三个阶段，讲清 T 细胞如何被“教会”识别、如何扩增、又如何执行杀伤。',
  stats: [
    { value: '3', label: '知识模块' },
    { value: '6', label: '课堂互动任务' },
    { value: '2', label: '可交互三维模型' },
    { value: '15′', label: '课前建议用时' },
  ],
  keywords: ['p-MHC', 'TCR', '免疫突触', '共刺激信号', 'CTL', 'Th1', 'MHC 限制性', 'CAR-T'],
  pageCopy: {
    preClass: {
      eyebrow: '课前学习 · 学习任务驱动型预习',
      title: '为什么有些病原“抗体管不了”？',
      en: 'Pre-class',
      lead: '先分清体液免疫与细胞免疫各管什么，再读 6 张知识卡。答完立刻能看到解析——把没想通的问题带进课堂。',
    },
    modules: {
      eyebrow: '模块学习 · 三个知识模块',
      title: '概念 → 机制 → 应用',
      en: 'Modules',
      lead: '模块一是概念与历史，模块二是难点（致敏、反应、效应三阶段），模块三是重点（抗感染、抗肿瘤与临床检测）。',
    },
    classroom: {
      eyebrow: '课堂互动 · 现场可操作',
      title: '六个任务，把三阶段“走”一遍',
      en: 'Classroom interaction',
      lead: '每个任务都按“任务情境 → 学生操作 → 结果反馈 → 机制解释 → 知识总结”组织。建议课堂分组完成。',
    },
    cases: {
      eyebrow: '案例教学 · 真实问题驱动',
      title: '三个问题，三种“用得上”的细胞免疫',
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
      title: '四个融入点：从一次识别到一份责任',
      en: 'Value education',
      lead: '思政从知识点本身长出来：MHC 限制性连着科学发现的严谨，CAR-T 连着自主创新，免疫损伤连着风险意识。',
    },
    frontier: {
      eyebrow: '学科前沿 · 研究进展',
      title: '从 TCR 克隆到 CAR-T',
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
      title: '免疫突触结构识别（三维）',
      scenario:
        '实验室给你一个 T 细胞与抗原递呈细胞接触的模型。请上台操作，指出 TCR、p-MHC、共刺激分子与细胞因子，并说明各自在“识别”中的作用。',
      mechanism: [
        '**T 细胞不能直接识别构象型抗原**，只能通过 **TCR 识别抗原肽-MHC 复合体（p-MHC）**。',
        '**非特异性识别**：T 细胞用表面黏附分子与 APC 表面配体结合，促进 TCR 识别效率，这种结合**可逆而短暂**。',
        '**特异性识别**：TCR 识别 p-MHC 后，黏附分子结合增强，稳定并延长结合时间，T 细胞与 APC 形成**免疫突触**。',
      ],
      summary: '识别分两步：先“黏上”（非特异、短暂），再“认准”（特异、稳定）——免疫突触就是两者共同的结果。',
      interaction: {
        kind: 'structure-lab',
        goals: [
          { id: 'tcr', label: '找到 TCR' },
          { id: 'pmhc', label: '找到 p-MHC 复合体' },
          { id: 'costim', label: '找到共刺激分子' },
          { id: 'cytokine', label: '找到细胞因子信号' },
        ],
        doneHint: '找到全部 4 项目标后，本任务自动记为完成。若三维不可用，可直接在右侧结构清单中点击查看。',
      },
    },
    {
      id: 't2',
      title: '三阶段排序',
      scenario:
        '课件把细胞免疫应答分为致敏阶段、反应阶段、效应阶段。请把 6 个关键事件按发生顺序排好。',
      mechanism: [
        '**致敏阶段**：抗原递呈细胞（APC）加工抗原并递呈，T 细胞识别 p-MHC——包含“递呈”与“识别”两个环节。',
        '**反应阶段**：T 细胞在**抗原刺激信号、共刺激信号和细胞因子信号**共同作用下活化、增殖、分化。',
        '**效应阶段**：分化为效应性 T 细胞（如 CTL、Th1）和少量记忆性 T 细胞，执行杀伤或辅助功能。',
      ],
      summary: '致敏（认出）→ 反应（扩增）→ 效应（执行）。顺序不能颠倒，否则 T 细胞会“没认出就开火”。',
      interaction: { kind: 'question', questionId: 'c05-t2', missingLabel: 'c05-t2（三阶段排序题）' },
    },
    {
      id: 't3',
      title: '内源性 vs 外源性抗原递呈',
      scenario:
        '同一个抗原，从不同途径进入细胞，会走不同的递呈路线。请判断下列描述各属于内源性还是外源性递呈。',
      mechanism: [
        '**内源性抗原**（如细胞内感染的病毒蛋白、肿瘤抗原）经加工后与 **MHC I** 结合，递呈给 **CD8⁺ T 细胞**，诱导 CTL。',
        '**外源性抗原**（如被吞噬的细菌）经加工后与 **MHC II** 结合，递呈给 **CD4⁺ T 细胞**，诱导辅助性 T 细胞。',
        '这条对应关系是细胞免疫应答的“分流器”：抗原来自哪里，决定了由谁来应战。',
      ],
      summary: '内源 → MHC I → CD8 → CTL；外源 → MHC II → CD4 → Th。',
      interaction: { kind: 'question', questionId: 'c05-t3', missingLabel: 'c05-t3（内外源性递呈归类题）' },
    },
    {
      id: 't4',
      title: '三重信号辨析',
      scenario:
        'T 细胞活化需要三种信号共同作用。请判断下列描述各属于哪一种信号，并说明缺少它会怎样。',
      mechanism: [
        '**抗原刺激信号（第一信号）**：TCR 识别 p-MHC，赋予应答的**特异性**。',
        '**共刺激信号（第二信号）**：来自 APC 与 T 细胞表面的共刺激分子互作，确保应答**只对“危险信号”启动**。',
        '**细胞因子信号（第三信号）**：决定 T 细胞**分化为哪一类**效应细胞（如 Th1、Th2、CTL）。',
        '课件原文：T 细胞活化、增殖和分化是在抗原刺激信号、共刺激信号和细胞因子信号共同作用下，分化为不同种类的效应性 T 细胞和少量记忆性 T 细胞。',
      ],
      summary: '第一信号定“认谁”，第二信号定“要不要打”，第三信号定“用什么打法”。',
      interaction: { kind: 'question', questionId: 'c05-t4', missingLabel: 'c05-t4（三重信号判断题）' },
    },
    {
      id: 't5',
      title: '效应细胞与功能匹配',
      scenario:
        '三种效应方式摆在面前：释放淋巴因子、巨噬细胞活化、CTL 效应。请把描述与对应的机制配对。',
      mechanism: [
        '**CTL 效应**：细胞毒性 T 细胞识别靶细胞表面 p-MHC I，直接杀伤病毒感染细胞或肿瘤细胞。',
        '**巨噬细胞活化**：Th1 类细胞因子（如 IFN-γ）活化巨噬细胞，增强其杀伤与清除能力。',
        '**释放淋巴因子**：效应 T 细胞分泌多种细胞因子，招募并激活其他免疫细胞，放大局部反应。',
        '课件还指出：抗原被清除后，DTH（迟发型超敏反应）能自行消退；若抗原持续存在，可致单核/巨噬细胞呈慢性活化状态，局部组织出现纤维化和肉芽肿。',
      ],
      summary: 'CTL 是“直接杀手”，Th1 是“指挥官”，淋巴因子是“战场命令”。',
      interaction: { kind: 'question-set', questionIds: ['c05-t5', 'c05-q1'] },
    },
    {
      id: 't6',
      title: '双刃剑：何时细胞免疫会“伤自己”',
      scenario:
        '课件指出“细胞免疫应答在 IV 型超敏反应发生中发挥不利作用”。请判断下列情形中哪些属于这种“不利作用”。',
      mechanism: [
        '课件原文：细胞免疫应答在 **IV 型超敏反应**发生中发挥不利作用。',
        '机制线索：抗原持续存在时，单核/巨噬细胞呈慢性活化状态，局部组织出现**纤维化和肉芽肿**。',
        '这解释了为什么结核病等慢性感染中，免疫反应本身也会造成组织损伤——保护与损伤常常同源。',
      ],
      summary: '同一套 CTL / 巨噬细胞活化机制，在抗原清除后是保护，在抗原持续时是损伤。',
      interaction: { kind: 'question', questionId: 'c05-t6', missingLabel: 'c05-t6（IV型超敏情境题）' },
    },
  ],
  objectives: {
    knowledge: [
      '能说出细胞免疫应答的概念与三个阶段',
      '能说明 T 细胞为何不能直接识别完整抗原',
      '能区分内源性与外源性抗原递呈路线',
      '能说明 T 细胞活化的三重信号',
      '能列举细胞免疫应答的三种效应方式',
      '能说明细胞免疫在抗感染、抗肿瘤与 IV 型超敏中的作用',
    ],
    ability: [
      '能借助模型讲清“TCR—p-MHC—免疫突触”的识别过程',
      '能画出三阶段流程图并标注关键分子',
      '能判断某一临床检测（如牛结核检测）依赖的是哪条免疫通路',
    ],
    value: [
      '体会基础发现（MHC 限制性等）如何转化为临床技术',
      '认识免疫保护与免疫损伤的同源性',
      '了解细胞治疗产业的意义与规范要求',
    ],
    standard: '随堂小测与课堂互动正确率 ≥ 80%，并完成 1 次机制表述',
  },
  keyPoints: ['细胞免疫应答的三阶段', '内源性/外源性抗原递呈与 T 细胞亚群的对应', '三种效应方式'],
  hardPoints: [
    'T 细胞只能识别 p-MHC（不能识别游离构象抗原）的原因与意义',
    '内源性→MHC I→CD8 与 外源性→MHC II→CD4 的分流逻辑',
    '三重信号各自决定什么（特异性 / 是否启动 / 分化方向）',
  ],
  nav: [
    { id: 'home', label: '首页', to: '/course-05', desc: '本章主题、学习路径与全部入口' },
    { id: 'pre', label: '课前学习', to: '/course-05/pre-class', desc: '情境导入 · 三维目标 · 预习任务' },
    {
      id: 'modules',
      label: '模块学习',
      to: '/course-05/modules',
      desc: '三个知识模块的正文与可视化',
      children: [
        { label: '模块一 概念与历史', to: '/course-05/modules/m1' },
        { label: '模块二 应答机制', to: '/course-05/modules/m2' },
        { label: '模块三 应用与检测', to: '/course-05/modules/m3' },
      ],
    },
    { id: 'classroom', label: '课堂互动', to: '/course-05/classroom', desc: '六个互动任务的现场操作' },
    { id: 'cases', label: '案例教学', to: '/course-05/cases', desc: '真实问题驱动的三个案例' },
    { id: 'homework', label: '课后作业', to: '/course-05/homework', desc: '基础 / 提升 / 拓展三层任务' },
    { id: 'assessment', label: '学习评价', to: '/course-05/assessment', desc: '形成性评价与前后测对照' },
    { id: 'ideology', label: '课程思政', to: '/course-05/ideology', desc: '四个价值融入点' },
    { id: 'frontier', label: '学科前沿', to: '/course-05/frontier', desc: 'CAR-T 与 T 细胞治疗' },
    { id: 'qr', label: '扫码学习', to: '/course-05/qr', desc: '本章固定网址二维码' },
  ],
  pathway: [
    { id: 'p0', stage: '课前', title: '带问题进课堂', detail: '分清体液免疫与细胞免疫、读 6 张知识卡、做 4 道预习任务。', to: '/course-05/pre-class', minutes: 15 },
    { id: 'p1', stage: '课中', title: '模块一：概念与历史', detail: '概念、三个阶段、TCR/MHC 限制性等关键发现。', to: '/course-05/modules/m1', minutes: 15 },
    { id: 'p2', stage: '课中', title: '模块二：应答机制（难点）', detail: '抗原递呈 → T 细胞识别 → 免疫突触 → 三重信号增殖 → 效应。', to: '/course-05/modules/m2', minutes: 25 },
    { id: 'p3', stage: '课中', title: '模块三：应用与检测（重点）', detail: '抗感染、抗肿瘤、牛结核检测、CAR-T 与 CTL 检测技术。', to: '/course-05/modules/m3', minutes: 20 },
    { id: 'p4', stage: '课中', title: '课堂互动', detail: '免疫突触识别、三阶段排序、内外源递呈、三重信号、效应匹配、IV 型超敏。', to: '/course-05/classroom', minutes: 15 },
    { id: 'p5', stage: '课后', title: '作业与评价', detail: '三层作业 + 学习评价，对照课前—课后测验结果。', to: '/course-05/homework', minutes: 25 },
  ],
  graph: {
    nodes: [
      { id: 'root', label: '细胞免疫应答', en: 'Cellular immunity', level: 1, to: '/course-05' },
      { id: 'm1', label: '概念与历史', en: 'Concept', level: 2, to: '/course-05/modules/m1' },
      { id: 'm2', label: '应答机制', en: 'Mechanism', level: 2, to: '/course-05/modules/m2', flag: '难点' },
      { id: 'm3', label: '应用与检测', en: 'Applications', level: 2, to: '/course-05/modules/m3', flag: '重点' },
      { id: 'g1', label: '致敏阶段', level: 3, to: '/course-05/modules/m2' },
      { id: 'g2', label: '反应阶段', level: 3, to: '/course-05/modules/m2' },
      { id: 'g3', label: '效应阶段', level: 3, to: '/course-05/modules/m2' },
      { id: 'g4', label: '抗原递呈', level: 3, to: '/course-05/modules/m2' },
      { id: 'g5', label: 'TCR 识别 p-MHC', level: 3, to: '/course-05/modules/m2' },
      { id: 'g6', label: '免疫突触', level: 3, to: '/course-05/modules/m2' },
      { id: 'g7', label: '三重信号', level: 3, to: '/course-05/modules/m2' },
      { id: 'g8', label: 'CTL 效应', level: 3, to: '/course-05/modules/m2' },
      { id: 'g9', label: '抗感染', level: 3, to: '/course-05/modules/m3' },
      { id: 'g10', label: '抗肿瘤', level: 3, to: '/course-05/modules/m3' },
      { id: 'g11', label: 'IV 型超敏', level: 3, to: '/course-05/modules/m3' },
      { id: 'g12', label: '牛结核检测', level: 3, to: '/course-05/modules/m3' },
      { id: 'g13', label: 'CAR-T', level: 3, to: '/course-05/modules/m3' },
    ],
    links: [
      ['root', 'm1'], ['root', 'm2'], ['root', 'm3'],
      ['m2', 'g1'], ['m2', 'g2'], ['m2', 'g3'],
      ['g1', 'g4'], ['g1', 'g5'], ['g1', 'g6'],
      ['g2', 'g7'],
      ['g3', 'g8'],
      ['m3', 'g9'], ['m3', 'g10'], ['m3', 'g11'], ['m3', 'g12'], ['m3', 'g13'],
    ],
  },
  preClass: {
    scenario: {
      title: '为什么“抗体够高”仍挡不住某些病原？',
      en: 'Field scenario',
      body: [
        '某场免疫程序完整、抗体检测合格，却仍出现病毒持续感染与肿瘤病例。技术员困惑：抗体水平不低，为什么还会发病？',
        '原因在于分工：抗体主要作用于**细胞外**的病原；一旦病毒进入细胞、或在细胞表面呈递异常蛋白（如肿瘤抗原），就需要**细胞免疫**来处理。',
        '课件明确指出：细胞免疫应答针对的是**病毒感染细胞、肿瘤细胞、胞内菌**等——这些正是抗体“够不到”的目标。',
      ],
      questions: [
        '细胞免疫应答与体液免疫应答，各自负责清除什么？',
        'T 细胞为什么不能直接识别完整的病毒颗粒？',
        '为什么说细胞免疫也是一把“双刃剑”？',
      ],
      visual: 'concept-timeline',
    },
    taskIds: ['c05-pre1', 'c05-pre2', 'c05-pre3', 'c05-pre4'],
    cards: [
      { title: '细胞免疫应答', en: 'Cellular immune response', body: 'T 细胞受抗原刺激后分化、增殖、转化为致敏 T 细胞，通过直接杀伤作用及所释放细胞因子的协同杀伤作用清除抗原。', tags: ['课件定义', '核心概念'] },
      { title: 'p-MHC 复合体', en: 'Peptide-MHC complex', body: '抗原肽与 MHC 分子结合形成的复合物。T 细胞不能直接识别构象型抗原，只能通过 TCR 识别 p-MHC。', tags: ['关键概念'] },
      { title: 'TCR', en: 'T cell receptor', body: 'T 细胞受体，特异性识别 p-MHC，赋予细胞免疫应答的特异性。', tags: ['关键分子'] },
      { title: '免疫突触', en: 'Immunological synapse', body: 'TCR 识别 p-MHC 后，黏附分子结合增强、结合时间延长，T 细胞与 APC 之间形成的稳定接触结构。', tags: ['关键结构'] },
      { title: 'CTL', en: 'Cytotoxic T lymphocyte', body: '细胞毒性 T 细胞，识别靶细胞表面 p-MHC I 后直接杀伤病毒感染细胞或肿瘤细胞。', tags: ['效应细胞'] },
      { title: 'MHC 限制性', en: 'MHC restriction', body: 'T 细胞只能识别与自身 MHC 分子结合的抗原肽。该现象由 Zinkernagel 与 Doherty 于 1974 年发表。', tags: ['关键发现'] },
    ],
    prior: [
      { subject: '第四章 抗体', text: '抗体识别细胞外抗原；本章的 T 细胞识别的是“细胞表面呈递的抗原肽”——两者分工互补。' },
      { subject: '动物病理学', text: '结核、肿瘤等疾病中可见的肉芽肿、纤维化，与本章 IV 型超敏反应的组织学表现直接相关。' },
      { subject: '后续章节', text: '第九章超敏反应会展开 IV 型超敏；第十章免疫学技术会用到本章的 CTL 检测方法。' },
    ],
  },
  outcomes: [
    { title: '分得清', body: '能说清体液免疫与细胞免疫各自清除什么，不再把两者混为一谈。' },
    { title: '走得通', body: '能按致敏、反应、效应三个阶段完整讲一遍，并指出每个阶段的关键分子。' },
    { title: '用得上', body: '能解释牛结核检测、CAR-T 治疗这类应用背后依赖的是哪条免疫通路。' },
  ],
  positioning: [
    { left: '第一章 抗原', right: '敌方武装力量' },
    { left: '第二章 免疫系统', right: '国家的国防体系' },
    { left: '第三章 免疫细胞', right: '国防体系各兵种士兵' },
    { left: '第四章 抗体', right: '精准制导导弹' },
    { left: '第五章 细胞因子', right: '战斗信号' },
    { left: '第六章 补体系统', right: '智能地雷' },
    { left: '第七章 先天性免疫应答', right: '边防武警部队' },
    { left: '第八章 适应性免疫应答', right: '特种作战部队', current: true },
    { left: '第九章 超敏反应', right: '友军误击 / 过度火力覆盖' },
    { left: '第十章 免疫学技术', right: '敌情侦察与情报分析' },
    { left: '第十一章 疫苗与免疫预防', right: '新兵军事演习与战前推演' },
  ],
}
