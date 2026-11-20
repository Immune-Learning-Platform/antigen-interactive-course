import type { CourseConfig } from '../types'

/**
 * 第10章 免疫学实验技术 · 第3节 免疫层析试纸条技术
 * 依据：`7.检测方法.pptx`（17 页）逐页重构。
 * 匿名化处置：
 *  · “参赛教师自建信息化平台”未引入；
 *  · 市场数据来源中的“团队实践统计”改为中性的行业研究与公开调研；
 *  · “实验室成果”页改为技术表述，不指代具体单位。
 */
export const lateralFlowCourse: CourseConfig = {
  id: 'lateral-flow',
  chapter: '第十章第三节',
  title: '免疫层析试纸条技术',
  en: 'Lateral Flow Immunoassay',
  tagline: '精准检测 · 科学诊断',
  lead:
    '一张试纸条，10 分钟出结果，无需仪器、无需冷链。它把“抗原—抗体特异性结合”这一分子事件，转成了肉眼可见的一条线。本节讲清三个环节：液体怎么流、为什么只认目标、信号怎么看得见。',
  stats: [
    { value: '3', label: '知识模块' },
    { value: '6', label: '课堂互动任务' },
    { value: '2', label: '可交互三维模型' },
    { value: '15′', label: '课前建议用时' },
  ],
  keywords: ['免疫层析', '胶体金', '量子点', '毛细作用', 'T 线', 'C 线', '双抗体夹心法', '间接法', '钩状效应'],
  pageCopy: {
    preClass: {
      eyebrow: '课前学习 · 学习任务驱动型预习',
      title: '一条红线的判读逻辑',
      en: 'Pre-class',
      lead: '先看现场快检为什么要“快而准”，再读 6 张知识卡。答完立刻能看到解析——把没想通的问题带进课堂。',
    },
    modules: {
      eyebrow: '模块学习 · 三个知识模块',
      title: '概念 → 原理 → 应用',
      en: 'Modules',
      lead: '模块一是概念与分类，模块二是难点（三个环节与两种检测模式），模块三是重点（结果判读、常见问题与量子点应用）。',
    },
    classroom: {
      eyebrow: '课堂互动 · 现场可操作',
      title: '六个任务，亲手“推”一次层析',
      en: 'Classroom interaction',
      lead: '每个任务都按“任务情境 → 学生操作 → 结果反馈 → 机制解释 → 知识总结”组织。建议课堂分组完成。',
    },
    cases: {
      eyebrow: '案例教学 · 真实问题驱动',
      title: '三个问题，三种“用得上”的判读能力',
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
      title: '四个融入点：从一条线到一份责任',
      en: 'Value education',
      lead: '思政从知识点本身长出来：快检连着“早发现、早处置”，判读连着“不让假阴性放过疫情”，国产化连着产业自主。',
    },
    frontier: {
      eyebrow: '学科前沿 · 研究进展',
      title: '从定性到定量：试纸条的升级路径',
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
      title: '试纸条结构识别（三维）',
      scenario:
        '实验室给你一张试纸条的剖面模型。请上台操作，指出样品垫、结合垫（金垫）、NC 膜、T 线、C 线与吸水垫，并说明液体流动方向。',
      mechanism: [
        '试纸条以**硝酸纤维素膜（NC 膜）为载体**，利用**微孔膜毛细管作用**驱动液体流动。',
        '结构顺序：**样品垫 → 结合垫（金垫）→ NC 膜（T 线、C 线）→ 吸水垫**。液体始终朝吸水垫方向移动。',
        '**T 线（检测线）**负责拦截目标复合物，**C 线（质控线）**负责验证试纸条是否有效——两者分工不同。',
      ],
      summary: '先看清“路”：样品从样品垫进来，经金垫、NC 膜，最后被吸水垫吸走。',
      interaction: {
        kind: 'structure-lab',
        goals: [
          { id: 'pad', label: '找到样品垫' },
          { id: 'conjugate', label: '找到结合垫（金垫）' },
          { id: 'tline', label: '找到检测线（T 线）' },
          { id: 'cline', label: '找到质控线（C 线）' },
        ],
        doneHint: '找到全部 4 项目标后，本任务自动记为完成。若三维不可用，可直接在右侧结构清单中点击查看。',
      },
    },
    {
      id: 't2',
      title: '三环节原理匹配',
      scenario:
        '课件把原理拆成三个环节：毛细管作用驱动层析、抗原抗体特异性结合、标记物富集显色。请把“它解决什么问题”与环节对上号。',
      mechanism: [
        '**环节一：毛细管作用驱动层析** → 解决“样品怎样向前移动”。',
        '**环节二：抗原抗体特异性结合** → 解决“为什么能检测目标物”。',
        '**环节三：标记物富集，形成可见信号** → 解决“为什么能用肉眼看到”。',
        '三个环节缺一不可：不流动就接触不到，不特异就认错，不显色就看不到。',
      ],
      summary: '流动 → 识别 → 显色：把分子事件转成肉眼可见的结果。',
      interaction: { kind: 'question', questionId: 'c07-t2', missingLabel: 'c07-t2（三环节匹配题）' },
    },
    {
      id: 't3',
      title: '抗原检测 vs 抗体检测',
      scenario:
        '双抗体夹心法测抗原，间接法测抗体——两者的 T 线上固定的东西完全不同。请判断下列描述各属于哪一种模式。',
      mechanism: [
        '**检测抗原（双抗体夹心法）**：金垫上干燥**金标抗体**；样品中的抗原与之形成“金标抗体—抗原”复合物；T 线固定**抗该抗原的抗体**，拦截复合物显色。',
        '**检测抗体（间接法）**：金垫上干燥**金标抗原**；T 线固定**抗待检抗体的抗体**（如检测人 IgM 则固定抗人 IgM 抗体）；待检抗体先被 T 线捕获，再被金标抗原结合。',
        '记忆要点：**测抗原时，金标的是抗体；测抗体时，金标的是抗原**——两端的角色正好互换。',
      ],
      summary: '夹心法：抗体—抗原—抗体；间接法：抗抗体—待检抗体—金标抗原。',
      interaction: { kind: 'question', questionId: 'c07-t3', missingLabel: 'c07-t3（两种模式归类题）' },
    },
    {
      id: 't4',
      title: '层析流动模拟',
      scenario:
        '拖动滑杆控制液体沿试纸条向前推进，观察 T 线与 C 线分别在什么时刻显色，并解释为什么“只有 C 线显色”判为阴性。',
      mechanism: [
        '**加样与迁移**：样品滴到样品垫后，在毛细管作用下向吸水垫方向移动。',
        '**结合金标抗体**：流经金垫时，预先干燥的金标抗体被重新润湿、释放；若样品含目标抗原，形成“金标抗体—抗原”复合物继续前移。',
        '**T 线拦截**：复合物泳动到检测线时，被 T 线固定的抗体拦截并聚集显色。',
        '**C 线拦截**：未被 T 线拦截的金标抗体及部分复合物被质控线拦截并聚集显色。',
        '因此“只有 C 线显色”说明**液体正常流过、金标物有活性，但没有目标物被 T 线捕获**——判为阴性；若 C 线不显色，则试纸条无效。',
      ],
      summary: 'C 线是“试纸有没有效”，T 线是“有没有目标物”。',
      interaction: { kind: 'question', questionId: 'c07-t4', missingLabel: 'c07-t4（结果判读题）' },
    },
    {
      id: 't5',
      title: '结果判读与无效判定',
      scenario:
        '给出四种条带图案：① 仅 C 线；② C 线 + T 线；③ 仅 T 线；④ 两条都不显色。请判断各自含义。',
      mechanism: [
        '课件原文：**抗原/抗体阳性样品检测结果为检测线和质控线同时显色，而阴性样品的检测结果只有质控线显色。若 C 线不显色，则说明试纸条无效**。',
        '所以：① 仅 C 线 = **阴性**；② C + T = **阳性**；③ 仅 T 线 = **无效**（C 线不出，无法判断）；④ 无条带 = **无效**。',
        '③ 和 ④ 都属于“试纸条无效”，必须重测——不能因为 T 线出现就判阳性。',
      ],
      summary: '判读顺序：先看 C 线有效，再看 T 线有无。C 不出，一切作废。',
      interaction: { kind: 'question-set', questionIds: ['c07-t5', 'c07-q1'] },
    },
    {
      id: 't6',
      title: '假阴性情境决策',
      scenario:
        '某猪场出现疑似疫情，现场抗原快检结果为阴性，但临床症状典型。作为技术负责人，请判断哪些处置思路有依据。',
      mechanism: [
        '**阴性 ≠ 未感染**：课件指出阴性样品“只有质控线显色”，这只说明本次样品未检出目标物。',
        '**可能原因**：取样部位与时机（病毒载量低）、试剂检出限、以及目标物结构变化导致抗体识别下降。',
        '**下一步**：重新取样（深部拭子、多份混合）、结合核酸检测或病毒分离、结合流行病学与临床表现综合判断。',
        '**不能因为一条 C 线就放松处置**——尤其在场内已有典型症状时，防控措施应先执行。',
      ],
      summary: '快检阴性是“本次未检出”，不是“排除感染”。',
      interaction: { kind: 'question', questionId: 'c07-t6', missingLabel: 'c07-t6（假阴性决策题）' },
    },
  ],
  objectives: {
    knowledge: [
      '能说出免疫层析试纸条的概念与常用标记物',
      '能说出试纸条的基本结构与液体流动方向',
      '能解释原理的三个环节及各自解决的问题',
      '能区分检测抗原与检测抗体的两种模式',
      '能按 T/C 线判读结果并识别无效',
    ],
    ability: [
      '能借助模型讲清“流动—识别—显色”这条链条',
      '能为一个具体检测需求选择合适的模式（夹心法或间接法）',
      '能分析快检假阴性的可能原因并提出验证方案',
    ],
    value: [
      '体会快检在“早发现、早处置”中的公共卫生价值',
      '树立“不让假阴性放过疫情”的责任意识',
      '了解检测产品国产化的意义',
    ],
    standard: '随堂小测与课堂互动正确率 ≥ 80%，并完成 1 次结果判读表述',
  },
  keyPoints: ['免疫层析试纸条的概念与结构', '双抗体夹心法与间接法的区别', 'T/C 线结果判读'],
  hardPoints: [
    '两种检测模式中“谁被金标记、谁被固定在 T 线”的角色互换',
    '为什么只有 C 线显色判为阴性，而 C 线不显色判为无效',
    '金标抗体为何能与质控线抗体结合（抗体的同种异型差异）',
  ],
  nav: [
    { id: 'home', label: '首页', to: '/course-07', desc: '本章主题、学习路径与全部入口' },
    { id: 'pre', label: '课前学习', to: '/course-07/pre-class', desc: '情境导入 · 三维目标 · 预习任务' },
    {
      id: 'modules',
      label: '模块学习',
      to: '/course-07/modules',
      desc: '三个知识模块的正文与可视化',
      children: [
        { label: '模块一 概念与结构', to: '/course-07/modules/m1' },
        { label: '模块二 检测原理', to: '/course-07/modules/m2' },
        { label: '模块三 应用与判读', to: '/course-07/modules/m3' },
      ],
    },
    { id: 'classroom', label: '课堂互动', to: '/course-07/classroom', desc: '六个互动任务的现场操作' },
    { id: 'cases', label: '案例教学', to: '/course-07/cases', desc: '真实问题驱动的三个案例' },
    { id: 'homework', label: '课后作业', to: '/course-07/homework', desc: '基础 / 提升 / 拓展三层任务' },
    { id: 'assessment', label: '学习评价', to: '/course-07/assessment', desc: '形成性评价与前后测对照' },
    { id: 'ideology', label: '课程思政', to: '/course-07/ideology', desc: '四个价值融入点' },
    { id: 'frontier', label: '学科前沿', to: '/course-07/frontier', desc: '量子点与定量化' },
    { id: 'qr', label: '扫码学习', to: '/course-07/qr', desc: '本章固定网址二维码' },
  ],
  pathway: [
    { id: 'p0', stage: '课前', title: '带问题进课堂', detail: '看现场快检的需求、读 6 张知识卡、做 4 道预习任务。', to: '/course-07/pre-class', minutes: 15 },
    { id: 'p1', stage: '课中', title: '模块一：概念与结构', detail: '概念、标记物、试纸条结构与液体流向。', to: '/course-07/modules/m1', minutes: 15 },
    { id: 'p2', stage: '课中', title: '模块二：检测原理（难点）', detail: '三环节原理、双抗体夹心法、间接法。', to: '/course-07/modules/m2', minutes: 25 },
    { id: 'p3', stage: '课中', title: '模块三：应用与判读（重点）', detail: 'T/C 线判读、常见问题、量子点定量应用。', to: '/course-07/modules/m3', minutes: 20 },
    { id: 'p4', stage: '课中', title: '课堂互动', detail: '结构识别、三环节匹配、两模式归类、层析模拟、结果判读、假阴性决策。', to: '/course-07/classroom', minutes: 15 },
    { id: 'p5', stage: '课后', title: '作业与评价', detail: '三层作业 + 学习评价，对照课前—课后测验结果。', to: '/course-07/homework', minutes: 25 },
  ],
  graph: {
    nodes: [
      { id: 'root', label: '免疫层析', en: 'Lateral flow', level: 1, to: '/course-07' },
      { id: 'm1', label: '概念与结构', en: 'Concept', level: 2, to: '/course-07/modules/m1' },
      { id: 'm2', label: '检测原理', en: 'Principles', level: 2, to: '/course-07/modules/m2', flag: '难点' },
      { id: 'm3', label: '应用与判读', en: 'Reading results', level: 2, to: '/course-07/modules/m3', flag: '重点' },
      { id: 'g1', label: '标记物', level: 3, to: '/course-07/modules/m1' },
      { id: 'g2', label: '试纸条结构', level: 3, to: '/course-07/modules/m1' },
      { id: 'g3', label: '毛细管作用', level: 3, to: '/course-07/modules/m2' },
      { id: 'g4', label: '特异识别', level: 3, to: '/course-07/modules/m2' },
      { id: 'g5', label: '信号显现', level: 3, to: '/course-07/modules/m2' },
      { id: 'g6', label: '双抗体夹心法', level: 3, to: '/course-07/modules/m2' },
      { id: 'g7', label: '间接法', level: 3, to: '/course-07/modules/m2' },
      { id: 'g8', label: 'T/C 线判读', level: 3, to: '/course-07/modules/m3' },
      { id: 'g9', label: '量子点定量', level: 3, to: '/course-07/modules/m3' },
    ],
    links: [
      ['root', 'm1'], ['root', 'm2'], ['root', 'm3'],
      ['m1', 'g1'], ['m1', 'g2'],
      ['m2', 'g3'], ['m2', 'g4'], ['m2', 'g5'], ['m2', 'g6'], ['m2', 'g7'],
      ['m3', 'g8'], ['m3', 'g9'],
    ],
  },
  preClass: {
    scenario: {
      title: '猪场里的 10 分钟：为什么“快”这么重要',
      en: 'Field scenario',
      body: [
        '某猪场出现急性死亡病例。课件指出：畜禽养殖转型升级，动物疫病防控面临新挑战——**传播快、发病急、死亡多**，而**精准快速检测是动物疫病防控和净化的核心**。',
        '技术员取来一张抗原快检试纸条，滴样后等待 10 分钟读取结果：只有一条红线（C 线）。场方问：“是不是就没事了？”',
        '课件也给出了产业背景：国家政策高度支持新型诊断方法开发，推动检测装备向**智能、高效、精准、多功能集成**方向升级。',
      ],
      questions: [
        '试纸条里的液体是怎么自己“走”起来的？',
        '为什么只有目标物存在时，检测线才会显色？',
        '只出现一条线，到底说明什么？',
      ],
      visual: 'concept-timeline',
    },
    taskIds: ['c07-pre1', 'c07-pre2', 'c07-pre3', 'c07-pre4'],
    cards: [
      { title: '免疫层析试纸条', en: 'Lateral flow strip', body: '以胶体金、量子点、荧光微球等作为标记物，利用毛细作用使样品沿试纸条迁移，通过检测区域产生的颜色或荧光信号，实现对待测抗原或抗体的快速检测。', tags: ['课件定义', '核心概念'] },
      { title: '胶体金试纸条', en: 'Colloidal gold strip', body: '以胶体金作为示踪标记物，以硝酸纤维素膜为载体，利用微孔膜毛细管作用，检测抗原抗体反应的新型免疫标记快检技术。', tags: ['课件定义'] },
      { title: '毛细管作用', en: 'Capillary action', body: '驱动液体沿试纸条向吸水垫方向移动的作用力，是“不用仪器也能跑”的物理基础。', tags: ['三环节之一'] },
      { title: 'T 线（检测线）', en: 'Test line', body: '固定抗体，负责拦截目标复合物（或待检抗体），是“有没有目标物”的判据。', tags: ['关键结构'] },
      { title: 'C 线（质控线）', en: 'Control line', body: '负责验证试纸条是否有效。C 线不显色则说明试纸条无效。', tags: ['关键结构'] },
      { title: '量子点', en: 'Quantum dot', body: '一类荧光标记物。相比胶体金的“有/无”，量子点可实现荧光信号读取，向定量方向延伸。', tags: ['标记物'] },
    ],
    prior: [
      { subject: '第一章 抗原 / 第四章 抗体', text: '快检的分子基础就是抗原—抗体特异性结合。表位识别与抗体特异性在这里变成了“一条线”。' },
      { subject: '实验诊断基础', text: '灵敏性、特异性、符合率是评价任何检测方法的三把尺子，本章的量子点案例会逐个用到。' },
      { subject: '后续实践', text: '现场快检的判读能力是兽医临床与防控岗位的基本功，也是本章最直接的职业价值。' },
    ],
  },
  outcomes: [
    { title: '拆得开', body: '能对着一条试纸条说清每一段的名称与作用，以及液体往哪个方向流。' },
    { title: '判得准', body: '能按“先看 C 线、再看 T 线”的顺序判读四种条带组合，并识别无效结果。' },
    { title: '想得深', body: '能解释快检阴性不等于排除感染，并说出至少两条验证思路。' },
  ],
  positioning: [
    { left: '第一章 抗原', right: '敌方武装力量' },
    { left: '第二章 免疫系统', right: '国家的国防体系' },
    { left: '第三章 免疫细胞', right: '国防体系各兵种士兵' },
    { left: '第四章 抗体', right: '精准制导导弹' },
    { left: '第五章 细胞因子', right: '战斗信号' },
    { left: '第六章 补体系统', right: '智能地雷' },
    { left: '第七章 先天性免疫应答', right: '边防武警部队' },
    { left: '第八章 适应性免疫应答', right: '特种作战部队' },
    { left: '第九章 超敏反应', right: '友军误击 / 过度火力覆盖' },
    { left: '第十章 免疫学技术', right: '敌情侦察与情报分析', current: true },
    { left: '第十一章 疫苗与免疫预防', right: '新兵军事演习与战前推演' },
  ],
}
