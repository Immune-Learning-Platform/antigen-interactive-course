import type { CourseConfig } from '../types'

/**
 * 第4章 抗体 · 第2节 抗体生物学功能
 * 依据：`3.抗体.pptx`（21 页）逐页重构。
 * 匿名化处置：课件原文中的“本校…”表述已改为不指代具体单位的表述；
 *             课件中的第三方资讯链接（news.qq.com）未引入。
 */
export const antibodyCourse: CourseConfig = {
  id: 'antibody',
  chapter: '第四章第二节',
  title: '抗体生物学功能',
  en: 'Antibody Functions',
  tagline: '精准识别 · 协同御敌',
  lead:
    '抗体是机体免疫保护的重要工具，在疫病防控、诊断和治疗中发挥关键作用。本节先看它“长什么样”（结构），再讲它“能做什么”（六大生物学功能），最后落到“怎么用”（制备与创新应用）。',
  stats: [
    { value: '3', label: '知识模块' },
    { value: '6', label: '课堂互动任务' },
    { value: '2', label: '可交互三维模型' },
    { value: '15′', label: '课前建议用时' },
  ],
  keywords: ['重链', '轻链', '可变区', '恒定区', 'Fab', 'Fc', 'ADCC', 'CDC', 'IgY'],
  pageCopy: {
    preClass: {
      eyebrow: '课前学习 · 学习任务驱动型预习',
      title: '抗体是“精准制导导弹”',
      en: 'Pre-class',
      lead: '在全书的“国防体系”类比里，抗体是精准制导导弹。先看一个真实应用场景，再读 6 张知识卡，答完立刻能看到解析。',
    },
    modules: {
      eyebrow: '模块学习 · 三个知识模块',
      title: '结构 → 功能 → 应用',
      en: 'Modules',
      lead: '模块一是结构（Y 字型、V 区与 C 区、水解片段），模块二是重难点（六大生物学功能），模块三是重点（制备与创新应用）。',
    },
    classroom: {
      eyebrow: '课堂互动 · 现场可操作',
      title: '六个任务，把抗体“拆开揉碎”再看懂',
      en: 'Classroom interaction',
      lead: '每个任务都按“任务情境 → 学生操作 → 结果反馈 → 机制解释 → 知识总结”组织。建议课堂分组完成。',
    },
    cases: {
      eyebrow: '案例教学 · 真实问题驱动',
      title: '三个问题，三种“用得上”的抗体',
      en: 'Case studies',
      lead: '案例统一按“真实问题 → 科学分析 → 知识应用 → 结果反馈”四段呈现，并标注依据来源与真实性声明——不虚构病例。',
    },
    homework: {
      eyebrow: '课后作业 · 分层任务',
      title: '基础 / 提升 / 拓展：按需完成任务',
      en: 'Homework',
      lead: '客观题即时判分并给出解析，可反复练习；开放题请先写再看参考思路，草稿保存在本机浏览器。',
    },
    assessment: {
      eyebrow: '学习评价 · 形成性评价',
      title: '看清自己学到了哪一步',
      en: 'Assessment',
      lead: '评价由四部分组成：知识掌握、任务完成、互动练习、前后测对照。本页数据均来自本机浏览器，教师端不可见。',
    },
    ideology: {
      eyebrow: '课程思政 · 价值引领',
      title: '四个融入点：从一支抗体到一个产业',
      en: 'Value education',
      lead: '思政从知识点本身长出来：抗血清连着动物福利，“跟跑”连着自主创新，IgY 替代连着减抗，诊断+治疗连着复合能力。',
    },
    frontier: {
      eyebrow: '学科前沿 · 研究进展',
      title: '从血清制品到工程化抗体',
      en: 'Frontiers',
      lead: '本页区分课件原文、课件延伸与补充阅读三类内容；凡非课件原文，均给出可核验来源。',
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
      title: 'IgG 结构识别（三维）',
      scenario:
        '实验室给你一个抗体分子模型。请上台操作，指出重链、轻链、可变区、恒定区、Fab 与 Fc，并说明各自负责什么。',
      mechanism: [
        '抗体由**两条相同重链和两条相同轻链**通过二硫键连接而成，呈 **“Y”字型**。',
        '重链含 450~550 个氨基酸，轻链约 214 个；靠近 N 端约 **110 个氨基酸为可变区（V区）**，其余为**恒定区（C区）**。',
        '**V 区决定“认谁”**（特异性识别抗原），**C 区决定“做什么”**（与补体、Fc 受体等相互作用）。',
      ],
      summary: 'V 区管识别，C 区管效应——结构分工决定功能分工。',
      interaction: {
        kind: 'structure-lab',
        goals: [
          { id: 'heavy', label: '找到重链' },
          { id: 'light', label: '找到轻链' },
          { id: 'vregion', label: '找到可变区（V 区）' },
          { id: 'fc', label: '找到 Fc 段' },
        ],
        doneHint: '找到全部 4 项目标后，本任务自动记为完成。若三维不可用，可直接在右侧结构清单中点击查看（内容一致）。',
      },
    },
    {
      id: 't2',
      title: '水解片段判断：哪种酶切出什么？',
      scenario:
        '同一个 IgG，用木瓜蛋白酶和胃蛋白酶分别水解，产物完全不同。请判断：两种酶各自产生什么片段，各保留几个抗原结合位点。',
      mechanism: [
        '**木瓜蛋白酶**：产生**两个 Fab 片段**（各含 1 个抗原结合位点）和**一个 Fc 片段**。',
        '**胃蛋白酶**：产生**一个 F(ab′)₂ 片段**（保留 2 个抗原结合位点），**Fc 区被降解**。',
        '这个差别解释了抗蛇毒血清为何主要含 F(ab′)₂——保留双价结合能力，同时去掉大部分 Fc 以减少异种蛋白反应。',
      ],
      summary: '木瓜酶切“2 Fab + 1 Fc”；胃蛋白酶切“1 F(ab′)₂ + Fc 降解”。',
      interaction: { kind: 'question', questionId: 'c03-t2', missingLabel: 'c03-t2（水解片段判断题）' },
    },
    {
      id: 't3',
      title: '六大功能归类',
      scenario: '给你 6 条描述，判断它属于抗体的哪一项生物学功能：中和、调理、ADCC、激活补体、黏膜免疫，还是免疫损伤。',
      mechanism: [
        '**中和**：可变区结合病毒/毒素，阻断其与宿主靶标相互作用。',
        '**调理**：抗原抗体复合物经 Fc 与吞噬细胞受体结合，促进吞噬。',
        '**ADCC**：NK 细胞借 Fc 受体结合抗体 Fc，杀伤靶细胞。',
        '**激活补体（CDC）**：复合物结合 C1q，经经典途径形成 MAC 杀伤靶细胞。',
        '**黏膜免疫**：分泌型 IgA（sIgA）在黏膜表面发挥作用。',
        '**免疫损伤**：IgE 介导 I 型超敏；IgG/IgM 介导 II、III 型超敏。',
      ],
      summary: '六大功能可归为三类：阻断（中和）、招募效应（调理/ADCC/CDC）、以及双刃剑（黏膜保护 vs 免疫损伤）。',
      interaction: { kind: 'question', questionId: 'c03-t3', missingLabel: 'c03-t3（六大功能归类题）' },
    },
    {
      id: 't4',
      title: 'ADCC 与 CDC 辨析',
      scenario:
        '两种机制都能杀伤靶细胞，但“执行者”完全不同。请判断下列描述各属于 ADCC 还是 CDC。',
      mechanism: [
        '**ADCC（抗体依赖性细胞介导的细胞毒作用）**：NK 细胞表面有 Fc 受体，结合抗体 Fc 段后发挥细胞毒作用——**执行者是 NK 细胞**。',
        '**CDC（补体依赖细胞毒性作用）**：抗原抗体复合物结合补体 **C1q**，级联激活经典途径，形成 **MAC（膜攻击复合物）**——**执行者是补体系统**。',
        '课件要点：**抗体不能直接杀死细菌，MAC 可以**；且 **CDC 可与 ADCC 联合杀伤靶细胞**。',
      ],
      summary: 'ADCC 靠细胞（NK），CDC 靠补体（MAC）；两者都需要抗体的 Fc 段作为“桥”。',
      interaction: { kind: 'question', questionId: 'c03-t4', missingLabel: 'c03-t4（ADCC/CDC 分类题）' },
    },
    {
      id: 't5',
      title: '抗体应用匹配',
      scenario:
        '四种抗体相关产品摆在面前：抗蛇毒血清、卵黄抗体 IgY、犬细小单抗、量子点试纸条。请把“用途—原理—关键特点”对上号。',
      mechanism: [
        '**抗蛇毒血清**：用蛇毒素免疫马匹 → 采血浆 → 酶解提纯 → 主要含 **F(ab′)₂**，用于蛇伤治疗与预防。',
        '**卵黄抗体 IgY**：目标抗原多次免疫产蛋母鸡 → IgY 富集到蛋黄 → 提取制粉 → 拌料口服，用于仔猪腹泻、水产弧菌病等。',
        '**宠物临床单抗**：如犬细小单抗静脉注射快速中和病毒，发病早期联合支持疗法可降低死亡率。',
        '**量子点试纸条**：抗体作为“探针”标记后用于快速检测，无需仪器、无需冷链。',
      ],
      summary: '同一类分子、四种用法：治疗（血清/单抗）、替代（IgY）、诊断（试纸条）。',
      interaction: { kind: 'question-set', questionIds: ['c03-t5', 'c03-q1'] },
    },
    {
      id: 't6',
      title: '临床情境决策',
      scenario:
        '一例幼犬确诊犬细小病毒感染，发病第 2 天，主人希望“用最好的药”。作为兽医，请判断下列处置思路中哪些有依据。',
      mechanism: [
        '**抗体治疗的时机**：课件指出犬细小单抗“静脉注射快速中和病毒，**发病早期**联合支持疗法显著降低死亡率”——时机是关键。',
        '**支持疗法不可省**：抗体中和病毒不等于纠正脱水与电解质紊乱，两者需联合。',
        '**不能承诺“最好/一定”**：疗效受发病阶段、病毒载量、个体状态影响，专业沟通要说明不确定性。',
      ],
      summary: '抗体治疗的有效性依赖“早期 + 联合支持”，而不是“越贵越好”。',
      interaction: { kind: 'question', questionId: 'c03-t6', missingLabel: 'c03-t6（临床情境决策题）' },
    },
  ],
  objectives: {
    knowledge: [
      '能描述抗体的基本结构（4 条肽链、Y 字型、V 区与 C 区）。',
      '能说明 J 链与分泌片的作用。',
      '能区分木瓜蛋白酶与胃蛋白酶的水解产物。',
      '能列举抗体的六大生物学功能并各举一例。',
      '能辨析 ADCC 与 CDC 的执行机制差异。',
    ],
    ability: [
      '能借助三维模型讲清“V 区管识别、C 区管效应”。',
      '能比较不同抗体产品的制备路线与适用场景。',
      '能判断某一临床情境下抗体治疗的时机与边界。',
    ],
    value: [
      '体会抗体药物从“跟跑”到自主创新的产业意义。',
      '认同减抗替代（IgY）与动物健康的双重价值。',
      '建立规范、诚实的专业沟通意识。',
    ],
    standard: '随堂小测与课堂互动正确率 ≥ 80%，并完成 1 次临床情境表述',
  },
  keyPoints: ['抗体的六大生物学功能', '抗体结构与功能的关系', '抗体制备与创新应用'],
  hardPoints: [
    'ADCC 与 CDC 的执行机制差异（细胞 vs 补体）',
    '两种蛋白酶水解产物的区别与临床意义',
    'V 区与 C 区的功能分工如何决定“识别 + 效应”',
  ],
  nav: [
    { id: 'home', label: '首页', to: '/course-03', desc: '本章主题、学习路径与全部入口' },
    { id: 'pre', label: '课前学习', to: '/course-03/pre-class', desc: '情境导入 · 三维目标 · 预习任务' },
    {
      id: 'modules',
      label: '模块学习',
      to: '/course-03/modules',
      desc: '三个知识模块的正文与可视化',
      children: [
        { label: '模块一 抗体结构', to: '/course-03/modules/m1' },
        { label: '模块二 生物学功能', to: '/course-03/modules/m2' },
        { label: '模块三 制备与应用', to: '/course-03/modules/m3' },
      ],
    },
    { id: 'classroom', label: '课堂互动', to: '/course-03/classroom', desc: '六个互动任务的现场操作' },
    { id: 'cases', label: '案例教学', to: '/course-03/cases', desc: '真实问题驱动的三个案例' },
    { id: 'homework', label: '课后作业', to: '/course-03/homework', desc: '基础 / 提升 / 拓展三层任务' },
    { id: 'assessment', label: '学习评价', to: '/course-03/assessment', desc: '形成性评价与前后测对照' },
    { id: 'ideology', label: '课程思政', to: '/course-03/ideology', desc: '四个价值融入点' },
    { id: 'frontier', label: '学科前沿', to: '/course-03/frontier', desc: '工程化抗体与替代技术' },
    { id: 'qr', label: '扫码学习', to: '/course-03/qr', desc: '本章固定网址二维码' },
  ],
  pathway: [
    { id: 'p0', stage: '课前', title: '带问题进课堂', detail: '看 1 个抗体应用情境、读 6 张知识卡、做 4 道预习任务。', to: '/course-03/pre-class', minutes: 15 },
    { id: 'p1', stage: '课中', title: '模块一：抗体结构', detail: '4 条肽链与 Y 字型、V 区/C 区、J 链与分泌片、水解片段。', to: '/course-03/modules/m1', minutes: 15 },
    { id: 'p2', stage: '课中', title: '模块二：生物学功能（重/难点）', detail: '中和、调理、ADCC、激活补体、黏膜免疫、免疫损伤。', to: '/course-03/modules/m2', minutes: 25 },
    { id: 'p3', stage: '课中', title: '模块三：制备与应用', detail: '抗血清制备、抗体药物产业、四类创新应用。', to: '/course-03/modules/m3', minutes: 20 },
    { id: 'p4', stage: '课中', title: '课堂互动', detail: '结构识别、水解判断、功能归类、ADCC/CDC 辨析、应用匹配、临床决策。', to: '/course-03/classroom', minutes: 15 },
    { id: 'p5', stage: '课后', title: '作业与评价', detail: '三层作业 + 学习评价，对照课前—课后测验结果。', to: '/course-03/homework', minutes: 25 },
  ],
  graph: {
    nodes: [
      { id: 'root', label: '抗体', en: 'Antibody', level: 1, to: '/course-03' },
      { id: 'm1', label: '抗体结构', en: 'Structure', level: 2, to: '/course-03/modules/m1' },
      { id: 'm2', label: '生物学功能', en: 'Functions', level: 2, to: '/course-03/modules/m2', flag: '难点' },
      { id: 'm3', label: '制备与应用', en: 'Production', level: 2, to: '/course-03/modules/m3', flag: '重点' },
      { id: 'g1', label: '重链 / 轻链', level: 3, to: '/course-03/modules/m1' },
      { id: 'g2', label: 'V 区 / C 区', level: 3, to: '/course-03/modules/m1' },
      { id: 'g3', label: 'J 链 / 分泌片', level: 3, to: '/course-03/modules/m1' },
      { id: 'g4', label: '水解片段', level: 3, to: '/course-03/modules/m1' },
      { id: 'g5', label: '中和作用', level: 3, to: '/course-03/modules/m2' },
      { id: 'g6', label: '调理作用', level: 3, to: '/course-03/modules/m2' },
      { id: 'g7', label: 'ADCC', level: 3, to: '/course-03/modules/m2' },
      { id: 'g8', label: '激活补体 CDC', level: 3, to: '/course-03/modules/m2' },
      { id: 'g9', label: '黏膜免疫', level: 3, to: '/course-03/modules/m2' },
      { id: 'g10', label: '免疫损伤', level: 3, to: '/course-03/modules/m2' },
      { id: 'g11', label: '抗血清制备', level: 3, to: '/course-03/modules/m3' },
      { id: 'g12', label: '单抗与 IgY', level: 3, to: '/course-03/modules/m3' },
      { id: 'g13', label: '诊断 + 治疗', level: 3, to: '/course-03/modules/m3' },
    ],
    links: [
      ['root', 'm1'], ['root', 'm2'], ['root', 'm3'],
      ['m1', 'g1'], ['m1', 'g2'], ['m1', 'g3'], ['m1', 'g4'],
      ['m2', 'g5'], ['m2', 'g6'], ['m2', 'g7'], ['m2', 'g8'], ['m2', 'g9'], ['m2', 'g10'],
      ['m3', 'g11'], ['m3', 'g12'], ['m3', 'g13'],
    ],
  },
  preClass: {
    scenario: {
      title: '一支抗蛇毒血清，从马身上来到病床边',
      en: 'Field scenario',
      body: [
        '一条犬被毒蛇咬伤送来急诊。医生取出一支抗蛇毒血清——它的原料来自经过蛇毒素免疫的马匹血浆。',
        '同一类分子（抗体），在这里是“解药”，在检测卡上是“探针”，在母鸡的蛋黄里又变成了替代抗生素的方案。为什么一种分子能有这么多用法？',
      ],
      questions: [
        '抗体长什么样？为什么呈 Y 字型？',
        '抗体的 V 区和 C 区分别负责什么？',
        '为什么抗体既能中和病毒，又能“指挥”其他细胞杀伤靶细胞？',
      ],
      visual: 'concept-timeline',
    },
    taskIds: ['c03-pre1', 'c03-pre2', 'c03-pre3', 'c03-pre4'],
    cards: [
      { title: '抗体', en: 'Antibody, Ab', body: '由两条相同重链和两条相同轻链通过二硫键连接而成的 4 肽链分子，呈“Y”字型。', tags: ['课件定义', '核心概念'] },
      { title: '可变区（V 区）', en: 'Variable region', body: '重链和轻链靠近 N 端约 110 个氨基酸为可变区，决定抗体识别什么抗原。', tags: ['结构'] },
      { title: '恒定区（C 区）', en: 'Constant region', body: '除 V 区以外的部分，氨基酸序列相对恒定，与效应功能相关。', tags: ['结构'] },
      { title: 'Fab / Fc', en: 'Fragment', body: 'IgG 经木瓜蛋白酶水解产生 2 个 Fab（各含 1 个抗原结合位点）和 1 个 Fc 片段。', tags: ['水解片段'] },
      { title: 'ADCC', en: 'Antibody-dependent cellular cytotoxicity', body: 'NK 细胞通过 Fc 受体结合抗体 Fc 段，发挥细胞毒作用杀伤靶细胞。', tags: ['功能'] },
      { title: 'CDC', en: 'Complement-dependent cytotoxicity', body: '抗原抗体复合物结合补体 C1q，级联激活经典途径，形成 MAC 杀伤靶细胞。', tags: ['功能'] },
    ],
    prior: [
      { subject: '第一章 抗原', text: '上一章讲“抗原是敌方武装力量”，本章的抗体就是针对它的“精准制导导弹”——表位特异性在这里再次出现。' },
      { subject: '动物免疫学基础', text: '抗体属于免疫球蛋白，理解其结构是理解血清学试验（凝集、沉淀、ELISA）的前提。' },
      { subject: '后续章节', text: '第八章适应性免疫应答、第十章免疫学技术都会用到本章的功能分类与水解片段知识。' },
    ],
  },
  outcomes: [
    { title: '拆得开', body: '能对着一个 Y 字型分子说清 V 区、C 区、Fab、Fc 各在哪里、各管什么。' },
    { title: '分得清', body: '能一眼分清 ADCC 与 CDC 的执行者，不再把“补体”和“NK 细胞”混为一谈。' },
    { title: '用得上', body: '能给一支抗体产品说清它是“药”还是“探针”，以及为什么这样设计。' },
  ],
  positioning: [
    { left: '第一章 抗原', right: '敌方武装力量' },
    { left: '第二章 免疫系统', right: '国家的国防体系' },
    { left: '第三章 免疫细胞', right: '国防体系各兵种士兵' },
    { left: '第四章 抗体', right: '精准制导导弹', current: true },
    { left: '第五章 细胞因子', right: '战斗信号' },
    { left: '第六章 补体系统', right: '智能地雷' },
    { left: '第七章 先天性免疫应答', right: '边防武警部队' },
    { left: '第八章 适应性免疫应答', right: '特种作战部队' },
    { left: '第九章 超敏反应', right: '友军误击 / 过度火力覆盖' },
    { left: '第十章 免疫学技术', right: '敌情侦察与情报分析' },
    { left: '第十一章 疫苗与免疫预防', right: '新兵军事演习与战前推演' },
  ],
}
