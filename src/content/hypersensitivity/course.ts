import type { CourseConfig } from '../types'

/**
 * 第9章 超敏反应 · 第1节 I型超敏反应
 * 依据：`6.I型超敏反应.pptx` 的 **p1–p19**（该文件含两套版本，按确认只用前一套）。
 * 匿名化处置：课件“参赛教师自建信息化平台”未引入；课件所列生物制剂仅作原理说明。
 */
export const hypersensitivityCourse: CourseConfig = {
  id: 'hypersensitivity',
  chapter: '第九章第一节',
  title: 'I 型超敏反应',
  en: 'Type I Hypersensitivity',
  tagline: '免疫有度 · 平衡为要',
  lead:
    '过敏是免疫系统“用力过猛”的结果：同一套 IgE—肥大细胞机制，在抗寄生虫时是保护，在遇到花粉、尘螨时却成了烦恼。本节按“概念—机制—防治”讲清这条通路，以及如何把它调回平衡。',
  stats: [
    { value: '3', label: '知识模块' },
    { value: '6', label: '课堂互动任务' },
    { value: '2', label: '可交互三维模型' },
    { value: '15′', label: '课前建议用时' },
  ],
  keywords: ['IgE', 'FcεRI', '肥大细胞', '嗜碱性粒细胞', '组胺', '脱颗粒', 'Th2', 'IL-4', '奥马珠单抗'],
  pageCopy: {
    preClass: {
      eyebrow: '课前学习 · 学习任务驱动型预习',
      title: '为什么免疫系统会“误伤”自己',
      en: 'Pre-class',
      lead: '先看过敏这个“常见的烦恼”，再读 6 张知识卡。答完立刻能看到解析——把没想通的问题带进课堂。',
    },
    modules: {
      eyebrow: '模块学习 · 三个知识模块',
      title: '概念 → 机制 → 防治',
      en: 'Modules',
      lead: '模块一是概念与特征（谁是主角、有什么特点），模块二是难点（三步机制），模块三是重点（三类防治策略）。',
    },
    classroom: {
      eyebrow: '课堂互动 · 现场可操作',
      title: '六个任务，把“致敏—激发—效应”走一遍',
      en: 'Classroom interaction',
      lead: '每个任务都按“任务情境 → 学生操作 → 结果反馈 → 机制解释 → 知识总结”组织。建议课堂分组完成。',
    },
    cases: {
      eyebrow: '案例教学 · 真实问题驱动',
      title: '三个问题，三种“用得上”的过敏知识',
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
      title: '四个融入点：从“过度防御”到“平衡为要”',
      en: 'Value education',
      lead: '思政从知识点本身长出来：过敏连着动物福利与主人生活质量，脱敏治疗连着耐心与规范，靶向药物连着理性用药。',
    },
    frontier: {
      eyebrow: '学科前沿 · 研究进展',
      title: '从抗组胺到靶向单抗',
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
      title: '致敏靶细胞结构识别（三维）',
      scenario:
        '实验室给你一个致敏状态的肥大细胞模型。请上台操作，指出 IgE、FcεRI 受体、胞内颗粒与膜，并说明“致敏”是什么意思。',
      mechanism: [
        '**致敏阶段**：IgE 的 **Fc 段**与效应细胞表面的 **FcεRI 受体**结合，机体处于致敏状态。',
        '效应细胞主要是**肥大细胞和嗜碱性粒细胞**，它们具有**高亲和性 IgE Fc 受体**，并可释放生物活性介质。',
        '注意：此时还没有症状——致敏只是“装好了弹药”，还没有“开火”。',
      ],
      summary: '致敏 = IgE 已就位、细胞已装弹，但尚未触发。',
      interaction: {
        kind: 'structure-lab',
        goals: [
          { id: 'ige', label: '找到 IgE 抗体' },
          { id: 'fceri', label: '找到 FcεRI 受体' },
          { id: 'granule', label: '找到胞内颗粒（介质来源）' },
          { id: 'membrane', label: '找到细胞膜' },
        ],
        doneHint: '找到全部 4 项目标后，本任务自动记为完成。若三维不可用，可直接在右侧结构清单中点击查看。',
      },
    },
    {
      id: 't2',
      title: '三步机制排序',
      scenario:
        '课件把过程拆成“IgE 产生—致敏阶段—激发与效应阶段”。请把 6 个事件按发生顺序排好。',
      mechanism: [
        '**IgE 产生**：抗原递呈细胞摄取变应原，加工后经 **MHC II** 递呈给 **Th2 细胞**；Th2 分泌 **IL-4**，并为 B 细胞活化提供第二信号，促使 B 细胞产生 IgE。',
        '**致敏阶段**：IgE Fc 段与效应细胞表面 **FcεRI** 结合，机体进入致敏状态。',
        '**激发与效应**：变应原再次进入，与已结合在致敏靶细胞上的 IgE 特异性结合 → **IgE 交联** → Fc 段变构 → 激活细胞 → 脱颗粒释放生物活性物质 → 引起病理改变。',
      ],
      summary: '产生 IgE → 装到细胞上（致敏）→ 再次遇到变应原（激发）→ 释放介质（效应）。',
      interaction: { kind: 'question', questionId: 'c06-t2', missingLabel: 'c06-t2（三步机制排序题）' },
    },
    {
      id: 't3',
      title: '三要素辨识',
      scenario:
        '课件把 I 型超敏反应拆成三个要素：过敏原、变应素（抗体）、效应细胞。请把下列描述归入对应要素。',
      mechanism: [
        '**过敏原（变应原）**：药物或酶类物质、吸入性变应原、食物变应原等。',
        '**变应素（抗体）**：即 IgE 抗体，由 B 细胞产生，产生依赖 **IL-4**，具有**同种组织细胞亲嗜性**。',
        '**效应细胞**：肥大细胞和嗜碱性粒细胞，具有高亲和性 IgE Fc 受体，可释放出生物活性介质。',
      ],
      summary: '三要素：进来的（过敏原）、认它的（IgE）、执行它的（肥大细胞/嗜碱性粒细胞）。',
      interaction: { kind: 'question', questionId: 'c06-t3', missingLabel: 'c06-t3（三要素归类题）' },
    },
    {
      id: 't4',
      title: '致敏 vs 激发：分清“装弹”与“开火”',
      scenario:
        '同样涉及 IgE 与变应原结合，但致敏阶段与激发阶段发生的部位和后果完全不同。请判断下列描述属于哪个阶段。',
      mechanism: [
        '**致敏阶段**：IgE 的 Fc 段与效应细胞表面的 FcεRI 结合——此时**变应原尚未参与**，机体只是被“装弹”。',
        '**激发阶段**：变应原**再次进入**，与已结合在细胞上的 IgE 的 **Fab 段**结合，导致 **IgE 交联**、Fc 段变构，激活细胞产生刺激信号。',
        '关键区别：致敏用的是 Fc 段（结合细胞），激发用的是 Fab 段（结合抗原）。',
      ],
      summary: 'Fc 段负责“装到细胞上”，Fab 段负责“认出抗原”——同一抗体、两个部位、两种作用。',
      interaction: { kind: 'question', questionId: 'c06-t4', missingLabel: 'c06-t4（致敏/激发判断图）' },
    },
    {
      id: 't5',
      title: '三类防治策略匹配',
      scenario:
        '课件给出三类防治思路：查明并避免变应原、脱敏治疗、特异性免疫治疗（靶向变应原或靶向 IgE/细胞因子）。请把具体措施归入对应策略。',
      mechanism: [
        '**查明与避免**：变应原皮试——查明变应原，避免接触。这是最基础也最有效的一步。',
        '**脱敏治疗**：通过反复接触逐渐增加剂量的过敏原提取物，调节 IgE 和 IgG 抗体生成，影响免疫效应细胞，使机体对过敏原产生耐受性。',
        '**特异性免疫治疗**：中和变应原（如抗 Fel d 1）、中和 IgE（奥马珠单抗）、阻断 IL-5（美泊利珠单抗）、抑制 IL-4 与 IL-13（杜普利尤单抗）。',
      ],
      summary: '避开 → 让它习惯（脱敏）→ 精准拦截（靶向单抗）：三条路线的强度依次上升。',
      interaction: { kind: 'question', questionId: 'c06-t5', missingLabel: 'c06-t5（防治策略归类题）' },
    },
    {
      id: 't6',
      title: '临床情境决策：急性过敏',
      scenario:
        '一例犬注射某药物后数分钟内出现面部肿胀、呕吐、呼吸急促。作为主治兽医，请判断下列处置思路中哪些有依据。',
      mechanism: [
        '**识别特征**：课件指出 I 型超敏反应**发生迅速，再次接触过敏原后数分钟内发生**；主要引起生理功能紊乱，**严重时可发生组织损伤甚至过敏性休克**。',
        '**机制解释**：变应原与致敏靶细胞上的 IgE 结合 → 脱颗粒 → 释放组胺等 → **毛细血管扩张、通透性增强、腺体分泌增加**——正好解释肿胀、分泌物增多与循环不稳定。',
        '**处置逻辑**：立即停用可疑药物、按急症处理；事后通过变应原皮试等手段查明原因并避免再次接触。',
      ],
      summary: '急性过敏的关键词是“数分钟内”与“组胺效应”；处置要快，查因要准。',
      interaction: { kind: 'question', questionId: 'c06-t6', missingLabel: 'c06-t6（急性过敏决策题）' },
    },
  ],
  objectives: {
    knowledge: [
      '能准确复述 I 型超敏反应的概念',
      '能说出 I 型超敏反应的三个要素',
      '能说明其三个特征（迅速、个体差异、生理功能紊乱/休克）',
      '能按三步讲清发生机制',
      '能列举三类防治策略并各举一例',
    ],
    ability: [
      '能借助模型讲清“Fc 段装弹、Fab 段开火”的区别',
      '能把一组临床体征对应到组胺等介质的作用',
      '能针对具体病例判断应优先采用哪类防治策略',
    ],
    value: [
      '体会“免疫有度”的平衡观',
      '关注过敏对动物福利与主人生活质量的影响',
      '建立规范、耐心的长期管理意识',
    ],
    standard: '随堂小测与课堂互动正确率 ≥ 80%，并完成 1 次急性过敏处置表述',
  },
  keyPoints: ['I 型超敏反应的概念与三个要素', '三类防治策略（避免、脱敏、靶向治疗）'],
  hardPoints: [
    'IgE 致敏与激发的区别（Fc 段 vs Fab 段）',
    'IgE 交联 → FcεRI 变构 → 脱颗粒的因果链',
    '脱敏治疗与靶向单抗在作用层次上的差异',
  ],
  nav: [
    { id: 'home', label: '首页', to: '/course-06', desc: '本章主题、学习路径与全部入口' },
    { id: 'pre', label: '课前学习', to: '/course-06/pre-class', desc: '情境导入 · 三维目标 · 预习任务' },
    {
      id: 'modules',
      label: '模块学习',
      to: '/course-06/modules',
      desc: '三个知识模块的正文与可视化',
      children: [
        { label: '模块一 概念与特征', to: '/course-06/modules/m1' },
        { label: '模块二 发生机制', to: '/course-06/modules/m2' },
        { label: '模块三 临床防治', to: '/course-06/modules/m3' },
      ],
    },
    { id: 'classroom', label: '课堂互动', to: '/course-06/classroom', desc: '六个互动任务的现场操作' },
    { id: 'cases', label: '案例教学', to: '/course-06/cases', desc: '真实问题驱动的三个案例' },
    { id: 'homework', label: '课后作业', to: '/course-06/homework', desc: '基础 / 提升 / 拓展三层任务' },
    { id: 'assessment', label: '学习评价', to: '/course-06/assessment', desc: '形成性评价与前后测对照' },
    { id: 'ideology', label: '课程思政', to: '/course-06/ideology', desc: '四个价值融入点' },
    { id: 'frontier', label: '学科前沿', to: '/course-06/frontier', desc: 'IgE—FcεRI 与靶向治疗' },
    { id: 'qr', label: '扫码学习', to: '/course-06/qr', desc: '本章固定网址二维码' },
  ],
  pathway: [
    { id: 'p0', stage: '课前', title: '带问题进课堂', detail: '看过敏这个“常见的烦恼”、读 6 张知识卡、做 4 道预习任务。', to: '/course-06/pre-class', minutes: 15 },
    { id: 'p1', stage: '课中', title: '模块一：概念与特征', detail: '概念、三要素、三个特征。', to: '/course-06/modules/m1', minutes: 15 },
    { id: 'p2', stage: '课中', title: '模块二：发生机制（难点）', detail: 'IgE 产生 → 致敏 → 激发 → 效应。', to: '/course-06/modules/m2', minutes: 25 },
    { id: 'p3', stage: '课中', title: '模块三：临床防治（重点）', detail: '避免变应原、脱敏治疗、特异性免疫治疗。', to: '/course-06/modules/m3', minutes: 20 },
    { id: 'p4', stage: '课中', title: '课堂互动', detail: '致敏细胞识别、三步排序、三要素、致敏/激发、防治匹配、急性处置。', to: '/course-06/classroom', minutes: 15 },
    { id: 'p5', stage: '课后', title: '作业与评价', detail: '三层作业 + 学习评价，对照课前—课后测验结果。', to: '/course-06/homework', minutes: 25 },
  ],
  graph: {
    nodes: [
      { id: 'root', label: 'I 型超敏', en: 'Type I hypersensitivity', level: 1, to: '/course-06' },
      { id: 'm1', label: '概念与特征', en: 'Concept', level: 2, to: '/course-06/modules/m1' },
      { id: 'm2', label: '发生机制', en: 'Mechanism', level: 2, to: '/course-06/modules/m2', flag: '难点' },
      { id: 'm3', label: '临床防治', en: 'Management', level: 2, to: '/course-06/modules/m3', flag: '重点' },
      { id: 'g1', label: '过敏原', level: 3, to: '/course-06/modules/m1' },
      { id: 'g2', label: '变应素 IgE', level: 3, to: '/course-06/modules/m1' },
      { id: 'g3', label: '效应细胞', level: 3, to: '/course-06/modules/m1' },
      { id: 'g4', label: 'IgE 产生（Th2/IL-4）', level: 3, to: '/course-06/modules/m2' },
      { id: 'g5', label: '致敏阶段', level: 3, to: '/course-06/modules/m2' },
      { id: 'g6', label: '激发阶段', level: 3, to: '/course-06/modules/m2' },
      { id: 'g7', label: '效应阶段（组胺）', level: 3, to: '/course-06/modules/m2' },
      { id: 'g8', label: '变应原皮试', level: 3, to: '/course-06/modules/m3' },
      { id: 'g9', label: '脱敏治疗', level: 3, to: '/course-06/modules/m3' },
      { id: 'g10', label: '靶向单抗', level: 3, to: '/course-06/modules/m3' },
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
      title: '一只反复抓挠的猫：过敏的三个问题',
      en: 'Field scenario',
      body: [
        '一只猫反复抓挠头颈与耳部，皮肤出现红斑与脱毛。主人说：“每年这个时候就这样。”兽医怀疑过敏性皮炎。',
        '课件指出：**过敏性疾病被世界卫生组织列为 21 世纪重点研究和防治的三大疾病之一；宠物变应原及相关过敏性疾病日渐增多，宠物过敏亦逐渐引起重视**。',
        '课件还提出一个值得思考的问题：**为什么免疫系统会进化出让机体烦恼的过敏反应？**',
      ],
      questions: [
        '过敏反应涉及哪三个“角色”？各是什么？',
        '为什么第一次接触过敏原没事，第二次却很快发作？',
        '如果无法完全避开过敏原，还有什么办法？',
      ],
      visual: 'concept-timeline',
    },
    taskIds: ['c06-pre1', 'c06-pre2', 'c06-pre3', 'c06-pre4'],
    cards: [
      { title: 'I 型超敏反应', en: 'Type I hypersensitivity', body: '已致敏的机体再次接触相同抗原（过敏原）后，由 IgE 抗体介导、以肥大细胞和嗜碱性粒细胞为主要效应细胞的超敏反应。', tags: ['课件定义', '核心概念'] },
      { title: '过敏原（变应原）', en: 'Allergen', body: '包括药物或酶类物质、吸入性变应原、食物变应原等。', tags: ['三要素之一'] },
      { title: '变应素（IgE 抗体）', en: 'Reagin / IgE', body: '由 B 细胞产生，产生依赖 IL-4，具有同种组织细胞亲嗜性。', tags: ['三要素之二'] },
      { title: '效应细胞', en: 'Effector cells', body: '肥大细胞和嗜碱性粒细胞，具有高亲和性 IgE Fc 受体，可释放生物活性介质。', tags: ['三要素之三'] },
      { title: 'FcεRI', en: 'High-affinity IgE receptor', body: '效应细胞表面的高亲和性 IgE Fc 受体。IgE 的 Fc 段与其结合，使机体处于致敏状态。', tags: ['关键分子'] },
      { title: '脱颗粒', en: 'Degranulation', body: '变应原再次接触后，IgE 交联引起 Fc 段变构，激活细胞释放组胺等生物活性介质。', tags: ['关键过程'] },
    ],
    prior: [
      { subject: '第四章 抗体', text: '本章的主角 IgE 也是一种抗体——Fc 段结合细胞、Fab 段结合抗原的分工在这里表现得最典型。' },
      { subject: '第五章 细胞因子', text: 'IL-4 决定 B 细胞产生 IgE，IL-5 调控嗜酸性粒细胞；本章的靶向药物正是针对这些因子。' },
      { subject: '第八章 细胞免疫', text: '上一章讲 IV 型超敏（细胞免疫介导）；本章的 I 型超敏由 IgE 介导，两者机制完全不同。' },
    ],
  },
  outcomes: [
    { title: '说得准', body: '能一句话说清 I 型超敏反应的三要素，不把 IgE 和 IgG 混淆。' },
    { title: '讲得透', body: '能解释为什么第一次接触不发作、第二次数分钟内就发作。' },
    { title: '用得对', body: '能根据病例情况判断是“避开”“脱敏”还是“靶向治疗”。' },
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
    { left: '第九章 超敏反应', right: '友军误击 / 过度火力覆盖', current: true },
    { left: '第十章 免疫学技术', right: '敌情侦察与情报分析' },
    { left: '第十一章 疫苗与免疫预防', right: '新兵军事演习与战前推演' },
  ],
}
