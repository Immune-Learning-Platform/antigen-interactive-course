import type { CourseConfig } from '../types'

/**
 * 《兽医免疫学》第一章第一节 · 抗原
 * 依据：本章课堂教学课件（20 页，16:9）逐页重构。
 * 原则：课件原文优先；超出课件的概念一律以 supplement + 可核验来源标注。
 */
export const antigenCourse: CourseConfig = {
  id: 'antigen',
  chapter: '第一章第一节',
  title: '抗原',
  en: 'Antigen',
  tagline: '免疫应答的“启动开关”与“身份档案”',
  lead:
    '抗原是免疫学全部故事的起点：它既是免疫系统要识别的“异物”，也是疫苗、抗血清与诊断试剂的“核心有效成分”。本节从抗原的概念与两大特性出发，进入表位这一结构基础，再落到兽医学中三类重要抗原的制备与应用。',
  stats: [
    { value: '3', label: '知识模块' },
    { value: '6', label: '课堂互动任务' },
    { value: '3', label: '可交互三维模型' },
    { value: '15′', label: '课前建议用时' },
  ],
  keywords: ['免疫原性', '反应原性', '抗原表位', '线性表位', '构象表位', '完全抗原', '基因工程抗原'],
  objectives: {
    knowledge: [
      '能准确复述抗原的定义，并说明“特异性识别 + 特异性结合 + 生物学效应”三个要点。',
      '能辨析免疫原性与反应原性，并判断某一现象体现的是哪一种特性。',
      '能说明抗原表位是抗原特异性的结构基础，区分线性表位与构象表位。',
      '能说出 T 细胞（TCR）与 B 细胞（BCR）识别表位的差异。',
      '能列举兽医学中重要的抗原类型（细菌、病毒、细菌结构成分、基因工程抗原）及其应用。',
    ],
    ability: [
      '能沿“真实问题 → 科学问题 → 机制分析 → 应用方案”的链条分析一个动物疫病防控问题。',
      '能借助三维模型/图示把抽象的分子识别过程讲清楚。',
      '能比较不同抗原制备路线（完整病原 / 结构成分 / 基因工程表达）的优缺点。',
    ],
    value: [
      '体会“人病兽防、关口前移”在动物疫病防控与公共卫生中的意义。',
      '认同生物安全与科研规范（灭活验证、重组抗原质控）的价值。',
      '建立用免疫学知识服务养殖业与动物健康的职业认同。',
    ],
    standard: '模块随堂小测与课堂互动正确率 ≥ 80%，并完成 1 次案例分析表述',
  },
  keyPoints: [
    '抗原的定义与两大特性（免疫原性 / 反应原性）',
    '兽医学中的重要抗原：病原微生物抗原、细菌结构成分抗原、基因工程抗原',
  ],
  hardPoints: [
    '抗原表位：线性表位与构象表位的差别，以及“T 细胞只能识别由 MHC 递呈的线性表位”的原因',
    '抗原变异（氨基酸替换/位点改变）如何改变表位，从而影响免疫原性与反应原性',
    '翻译后修饰如何改变抗原的加工与 MHC 结合，进而改变免疫原性',
  ],
  nav: [
    { id: 'home', label: '首页', to: '/', desc: '本章主题、学习路径与全部入口' },
    { id: 'pre', label: '课前学习', to: '/pre-class', desc: '情境导入 · 三维目标 · 预习任务' },
    {
      id: 'modules',
      label: '模块学习',
      to: '/modules',
      desc: '三个知识模块的正文与可视化',
      children: [
        { label: '模块一 概念与特性', to: '/modules/m1' },
        { label: '模块二 诱导应答的机制', to: '/modules/m2' },
        { label: '模块三 兽医学重要抗原', to: '/modules/m3' },
      ],
    },
    { id: 'classroom', label: '课堂互动', to: '/classroom', desc: '六个互动任务的现场操作' },
    { id: 'cases', label: '案例教学', to: '/cases', desc: '真实问题驱动的三段案例' },
    { id: 'homework', label: '课后作业', to: '/homework', desc: '基础 / 提升 / 拓展三层任务' },
    { id: 'assessment', label: '学习评价', to: '/assessment', desc: '形成性评价与前后测对照' },
    { id: 'ideology', label: '课程思政', to: '/ideology', desc: '四个价值融入点' },
    { id: 'frontier', label: '学科前沿', to: '/frontier', desc: '表位研究与抗原设计新进展' },
    { id: 'qr', label: '扫码学习', to: '/qr', desc: '固定网址二维码与使用说明' },
  ],
  pathway: [
    {
      id: 'p0',
      stage: '课前',
      title: '带问题进课堂',
      detail: '看 1 个临床情境、读 1 组知识卡、做 4 道预习任务（即时反馈）。',
      to: '/pre-class',
      minutes: 15,
    },
    {
      id: 'p1',
      stage: '课中',
      title: '模块一：概念与特性',
      detail: '抗原定义、免疫原性与反应原性的区别、疫苗与检测两条应用路径。',
      to: '/modules/m1',
      minutes: 15,
    },
    {
      id: 'p2',
      stage: '课中',
      title: '模块二：诱导应答的机制（难点）',
      detail: '表位 → 线性/构象 → T/B 识别差异 → 抗原变异与翻译后修饰。',
      to: '/modules/m2',
      minutes: 25,
    },
    {
      id: 'p3',
      stage: '课中',
      title: '模块三：兽医学重要抗原（重点）',
      detail: '细菌与病毒抗原、结构成分抗原、基因工程抗原制备与 AI 结构解析。',
      to: '/modules/m3',
      minutes: 20,
    },
    {
      id: 'p4',
      stage: '课中',
      title: '课堂互动',
      detail: '三维结构识别、表位分类、机制排序、结合模拟、快速判断、情境决策。',
      to: '/classroom',
      minutes: 15,
    },
    {
      id: 'p5',
      stage: '课后',
      title: '作业与评价',
      detail: '三层作业 + 学习评价，对照课前—课后测验结果。',
      to: '/homework',
      minutes: 25,
    },
  ],
  graph: {
    nodes: [
      { id: 'root', label: '抗原', en: 'Antigen', level: 1, to: '/' },
      { id: 'm1', label: '概念与特性', en: 'Concept & Properties', level: 2, to: '/modules/m1' },
      { id: 'm2', label: '诱导应答的机制', en: 'Mechanism', level: 2, to: '/modules/m2', flag: '难点' },
      { id: 'm3', label: '兽医学重要抗原', en: 'Veterinary Antigens', level: 2, to: '/modules/m3', flag: '重点' },
      { id: 'g1', label: '定义', level: 3, to: '/modules/m1#m1-def' },
      { id: 'g2', label: '免疫原性', level: 3, to: '/modules/m1#m1-props' },
      { id: 'g3', label: '反应原性', level: 3, to: '/modules/m1#m1-props' },
      { id: 'g4', label: '抗原表位', level: 3, to: '/modules/m2#m2-epitope' },
      { id: 'g5', label: '线性表位', level: 3, to: '/modules/m2#m2-types' },
      { id: 'g6', label: '构象表位', level: 3, to: '/modules/m2#m2-types' },
      { id: 'g7', label: 'T / B 细胞识别', level: 3, to: '/modules/m2#m2-types' },
      { id: 'g8', label: '抗原变异', level: 3, to: '/modules/m2#m2-variation' },
      { id: 'g9', label: '翻译后修饰', level: 3, to: '/modules/m2#m2-ptm' },
      { id: 'g10', label: '细菌抗原', level: 3, to: '/modules/m3#m3-pathogen' },
      { id: 'g11', label: '病毒抗原', level: 3, to: '/modules/m3#m3-pathogen' },
      { id: 'g12', label: '结构成分抗原', level: 3, to: '/modules/m3#m3-structure' },
      { id: 'g13', label: '基因工程抗原', level: 3, to: '/modules/m3#m3-recombinant' },
      { id: 'g14', label: 'AI 结构解析', level: 3, to: '/modules/m3#m3-ai' },
    ],
    links: [
      ['root', 'm1'],
      ['root', 'm2'],
      ['root', 'm3'],
      ['m1', 'g1'],
      ['m1', 'g2'],
      ['m1', 'g3'],
      ['m2', 'g4'],
      ['g4', 'g5'],
      ['g4', 'g6'],
      ['g4', 'g7'],
      ['g4', 'g8'],
      ['g4', 'g9'],
      ['m3', 'g10'],
      ['m3', 'g11'],
      ['m3', 'g12'],
      ['m3', 'g13'],
      ['m3', 'g14'],
    ],
  },
  preClass: {
    scenario: {
      title: '一张快检试纸、一支三联苗，引出的三个问题',
      en: 'Field scenario',
      body: [
        '某蛋鸡场出现呼吸道症状。技术员现场用“禽流感抗原快速检测试纸”对气管拭子进行检测，10 分钟后读取结果；同时，该场日常免疫程序中包含“鸡新城疫、禽流感（H9 亚型）、禽腺病毒病三联灭活疫苗”，每批疫苗出厂前都要检定抗原含量。',
        '同一场里，三个动作都指向同一件东西：抗原。试纸测的是抗原，疫苗里装的主要有效成分是抗原，疫苗质量的关键指标之一还是抗原。',
      ],
      questions: [
        '试纸为什么能“测出”病毒？它测的到底是病毒的什么结构？',
        '为什么打一种疫苗不能预防所有传染病？',
        '疫苗里的“抗原含量”为什么要检定？它和疫苗效果是什么关系？',
      ],
      visual: 'two-properties',
      media: [
        {
          id: 'clip-scene',
          kind: 'video',
          title: '课件第 2 页：养殖场情境片段',
          duration: '18 s',
          caption:
            '课件用一段现场片段引出“抗原检测—抗原变异—疫苗抗原含量”三个线索，对应本节课前情境与模块一的两大特性。',
          provenance:
            '原文件为本课件内嵌视频（1280×736，18 s）。画面可能含软件界面、产品包装等可识别元素，需逐帧核验并去标识化后方可公开投放，因此当前未接入；同一知识点由下方“两大特性”图示承担。',
          available: false,
        },
      ],
    },
    taskIds: ['pre-1', 'pre-2', 'pre-3', 'pre-4'],
    cards: [
      {
        title: '抗原',
        en: 'Antigen, Ag',
        body:
          '能刺激机体免疫系统启动特异性免疫应答，能与相应的免疫应答产物发生特异性结合，并能产生一系列生物学效应的物质。',
        tags: ['课件定义', '核心概念'],
      },
      {
        title: '免疫原性',
        en: 'Immunogenicity',
        body: '指抗原分子能够刺激机体产生免疫应答的性质。它回答的是“能不能把免疫系统叫醒”。',
        tags: ['两大特性之一'],
      },
      {
        title: '反应原性',
        en: 'Reactivity / Antigenicity',
        body: '指抗原分子与免疫应答产物（抗体、致敏淋巴细胞等）发生特异性结合的性质。它回答的是“能不能被认出来并抓住”。',
        tags: ['两大特性之二'],
      },
      {
        title: '抗原表位',
        en: 'Epitope / Antigenic determinant',
        body:
          '抗原分子上被特异性识别的局部结构，是抗原特异性的结构基础。表位可由氨基酸、糖基等组成，同一抗原分子可具有多种、多个表位。',
        tags: ['结构基础'],
      },
      {
        title: '完全抗原',
        en: 'Complete antigen',
        body: '同时具有免疫原性与反应原性的抗原，如细菌、病毒等完整病原体。',
        tags: ['课件小结'],
      },
      {
        title: '基因工程抗原',
        en: 'Recombinant antigen',
        body:
          '用基因工程技术克隆特定蛋白基因并在表达系统中批量生产的抗原，可得到纯度高、天然来源难以大量获取的蛋白，并可加标签便于纯化与检测。',
        tags: ['制备技术'],
      },
    ],
    prior: [
      {
        subject: '兽医微生物学',
        text: '细菌的细胞壁、鞭毛、荚膜、菌毛都是“结构”，本节要把它们升级为“具有抗原性的功能分子”（O 抗原、H 抗原、荚膜抗原、菌毛抗原）。',
      },
      {
        subject: '动物传染病学',
        text: '疫苗免疫程序、抗原变异导致免疫失败、快检试纸的检出限——本节为这些现象提供分子层面的解释。',
      },
      {
        subject: '后续章节',
        text: '第三章免疫细胞、第四章抗体、第五至八章应答过程，都要反复用到“表位特异性”。这是全书第一块基石。',
      },
    ],
  },
  outcomes: [
    {
      title: '解释一个临床现象',
      body: '说出为什么抗原变异（如 H1N1/H3N2 关键位点氨基酸替换）会让原有疫苗的中和能力下降。',
    },
    {
      title: '判断一种抗原质量',
      body: '从“免疫原性 + 反应原性 + 表位完整性”三个角度评价一支疫苗或一个诊断抗原。',
    },
    {
      title: '选择一条制备路线',
      body: '在完整病原、结构成分抗原、基因工程抗原之间做出有依据的选择，并说明理由。',
    },
  ],
  positioning: [
    { left: '第一章 抗原', right: '敌方武装力量', current: true },
    { left: '第二章 免疫系统', right: '国家的国防体系' },
    { left: '第三章 免疫细胞', right: '国防体系各兵种士兵' },
    { left: '第四章 抗体', right: '精准制导导弹' },
    { left: '第五章 细胞因子', right: '战斗信号' },
    { left: '第六章 补体系统', right: '智能地雷' },
    { left: '第七章 先天性免疫应答', right: '边防武警部队' },
    { left: '第八章 适应性免疫应答', right: '特种作战部队' },
    { left: '第九章 超敏反应', right: '友军误击 / 过度火力覆盖' },
    { left: '第十章 免疫学技术', right: '敌情侦察与情报分析' },
    { left: '第十一章 疫苗与免疫预防', right: '新兵军事演习与战前推演' },
  ],
}
