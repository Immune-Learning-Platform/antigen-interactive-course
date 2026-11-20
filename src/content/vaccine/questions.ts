import type { Question } from '../types'

const preClassQuestions: Question[] = [
  {
    id: 'c08-pre1',
    type: 'single',
    stem: '按课件定义，疫苗的作用方式是：',
    options: [
      { key: 'A', text: '直接向机体输入抗体，提供即时保护' },
      { key: 'B', text: '制备抗原，进行人工主动免疫以预防动物传染病' },
      { key: 'C', text: '直接杀灭体内所有病原微生物' },
      { key: 'D', text: '抑制机体免疫系统以避免过强反应' },
    ],
    answer: 'B',
    explain:
      '选 B。课件原文：疫苗是以病原微生物、或它们的代谢产物、或基因工程产品等制备抗原，人工主动免疫预防动物传染病的生物制品。注意“人工主动免疫”——是让机体自己产生免疫力，不是直接输入抗体（那是被动免疫）。',
    ref: { moduleId: 'm1', label: '模块一 · 疫苗概念', anchor: 'm1-concept' },
    tags: ['概念'],
  },
  {
    id: 'c08-pre2',
    type: 'multi',
    stem: '按课件分类，下列属于“新型疫苗”的有：',
    options: [
      { key: 'A', text: '亚单位疫苗' },
      { key: 'B', text: '载体疫苗' },
      { key: 'C', text: '核酸疫苗' },
      { key: 'D', text: '灭活疫苗' },
      { key: 'E', text: '弱毒疫苗' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C。课件把疫苗分为传统疫苗（灭活疫苗、弱毒疫苗）与新型疫苗（亚单位疫苗、载体疫苗、核酸疫苗）两大类。D、E 属于传统疫苗。',
    ref: { moduleId: 'm1', label: '模块一 · 疫苗种类', anchor: 'm1-types' },
    tags: ['概念'],
  },
  {
    id: 'c08-pre3',
    type: 'judge',
    stem: '疫苗是通过直接与入侵的病原微生物结合来发挥保护作用的。',
    answer: false,
    explain:
      '错误。课件明确指出：**疫苗作为抗原，不直接与入侵的病原微生物发生结合**，而是通过诱导机体产生特异性适应性免疫应答、形成免疫记忆，其保护效应依赖于宿主免疫系统后续的识别与清除功能。',
    ref: { moduleId: 'm2', label: '模块二 · 作用原理', anchor: 'm2-principle' },
    tags: ['难点'],
  },
  {
    id: 'c08-pre4',
    type: 'open',
    stem: '有些疫苗需要基础免疫后再加强免疫。请用“免疫记忆”解释为什么第二次接种效果更好（1—2 句话）。',
    scenario: '某场的免疫程序里，同一疫苗安排了基础免疫与两次加强。',
    explain:
      '开放题。核心是能指出：初次应答产生少量记忆 T/B 细胞；再次接触抗原时由记忆细胞迅速启动再次应答，因此更快、更强、更持久。',
    guidance: [
      '初次应答在增殖分化阶段会有“少数分化”为记忆 T/B 细胞。',
      '记忆细胞在体内长期存在，使机体对同种抗原保持“记得”。',
      '再次接触抗原时，记忆细胞被迅速动员，产生快速、高效且持久的再次应答。',
      '因此加强免疫可扩大记忆池、提高抗体水平，获得更可靠的保护。',
    ],
    minLength: 12,
    ref: { moduleId: 'm2', label: '模块二 · 再次应答', anchor: 'm2-secondary' },
    tags: ['应用', '情境'],
  },
]

const moduleQuestions: Question[] = [
  {
    id: 'c08-q1',
    type: 'single',
    stem: 'CTL 杀伤靶细胞的机制包括：',
    options: [
      { key: 'A', text: '释放穿孔素和颗粒酶破坏靶细胞膜' },
      { key: 'B', text: '分泌大量抗体结合靶细胞' },
      { key: 'C', text: '激活补体形成 MAC' },
      { key: 'D', text: '释放组胺引起血管扩张' },
    ],
    answer: 'A',
    explain:
      '选 A。课件原文：CTL 识别并杀伤靶细胞，释放穿孔素和颗粒酶破坏靶细胞膜，或启动 Fas/FasL 途径诱导靶细胞发生凋亡。B 是浆细胞的功能；C 是补体的作用；D 是 I 型超敏反应中介质的效应。',
    ref: { moduleId: 'm2', label: '模块二 · 效应功能', anchor: 'm2-effectors' },
    tags: ['重点'],
  },
  {
    id: 'c08-q2',
    type: 'multi',
    stem: '按课件表述，疫苗制备抗原的来源可包括：',
    options: [
      { key: 'A', text: '病原微生物' },
      { key: 'B', text: '病原微生物的代谢产物' },
      { key: 'C', text: '基因工程产品' },
      { key: 'D', text: '健康动物的血清抗体' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C，均为课件概念原文所列的抗原来源。D 错：输入现成抗体属于“被动免疫”，不是疫苗（人工主动免疫）的制备方式。',
    ref: { moduleId: 'm1', label: '模块一 · 疫苗概念', anchor: 'm1-concept' },
    tags: ['概念'],
  },
  {
    id: 'c08-q3',
    type: 'single',
    stem: '按课件分类，灭活疫苗与弱毒疫苗的抗原成分是：',
    options: [
      { key: 'A', text: '病毒蛋白' },
      { key: 'B', text: '病毒核酸' },
      { key: 'C', text: '全病毒' },
      { key: 'D', text: '人工合成的多肽' },
    ],
    answer: 'C',
    explain:
      '选 C。课件把传统疫苗（灭活疫苗、弱毒疫苗）的抗原成分标为“全病毒”；亚单位疫苗为“病毒蛋白”，核酸疫苗为“病毒核酸”。',
    ref: { moduleId: 'm1', label: '模块一 · 疫苗种类', anchor: 'm1-types' },
    tags: ['概念'],
  },
  {
    id: 'c08-q4',
    type: 'sorting',
    stem: '把下列疫苗类型归入对应的抗原成分：',
    buckets: [
      { id: 'whole', label: '全病毒', hint: '传统疫苗' },
      { id: 'protein', label: '病毒蛋白', hint: '亚单位疫苗' },
      { id: 'nucleic', label: '病毒核酸', hint: '核酸疫苗' },
    ],
    items: [
      { id: 'v1', text: '灭活疫苗', bucket: 'whole' },
      { id: 'v2', text: '弱毒疫苗', bucket: 'whole' },
      { id: 'v3', text: '亚单位疫苗', bucket: 'protein' },
      { id: 'v4', text: '核酸疫苗', bucket: 'nucleic' },
    ],
    explain:
      'v1/v2 → 全病毒；v3 → 病毒蛋白；v4 → 病毒核酸。这条对应关系解释了为什么不同疫苗诱导的免疫应答类型不同（如课件指出灭活苗诱导的细胞免疫较弱）。',
    ref: { moduleId: 'm1', label: '模块一 · 疫苗种类', anchor: 'm1-types' },
    tags: ['概念'],
  },
  {
    id: 'c08-q5',
    type: 'single',
    stem: '“疫苗不直接与入侵的病原结合”，这句话的正确理解是：',
    options: [
      { key: 'A', text: '疫苗没有实际保护作用' },
      { key: 'B', text: '疫苗通过诱导免疫应答与形成免疫记忆，使机体在真正感染时能迅速识别与清除' },
      { key: 'C', text: '疫苗只在体外有效' },
      { key: 'D', text: '疫苗的作用与免疫系统无关' },
    ],
    answer: 'B',
    explain:
      '选 B。疫苗的角色是“训练”而非“作战”：它诱导特异性适应性免疫应答、形成免疫记忆，保护效应依赖宿主免疫系统后续的识别与清除功能。A、C、D 都误解了这句话。',
    summary: '疫苗是教练，不是士兵——真正的作战发生在感染时。',
    ref: { moduleId: 'm2', label: '模块二 · 作用原理', anchor: 'm2-principle' },
    tags: ['难点'],
  },
  {
    id: 'c08-q6',
    type: 'multi',
    stem: '按课件表述，初次免疫应答的致敏阶段包括：',
    options: [
      { key: 'A', text: '抗原递呈细胞对疫苗中的抗原进行捕获' },
      { key: 'B', text: '对捕获的抗原进行加工处理和递呈' },
      { key: 'C', text: '特异性淋巴细胞（T 细胞和 B 细胞）对递呈抗原的识别' },
      { key: 'D', text: '浆细胞大量分泌抗体' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C，均为课件致敏阶段原文。D 错：浆细胞分泌抗体发生在**效应阶段**，不是致敏阶段。',
    ref: { moduleId: 'm2', label: '模块二 · 初次应答', anchor: 'm2-primary' },
    tags: ['难点'],
  },
  {
    id: 'c08-q7',
    type: 'single',
    stem: '在增殖分化阶段，免疫活性细胞受疫苗抗原刺激后会：',
    options: [
      { key: 'A', text: '全部死亡' },
      { key: 'B', text: '母细胞化而大量增殖，分化为效应细胞及少量记忆 T/B 细胞' },
      { key: 'C', text: '直接转化为浆细胞并停止增殖' },
      { key: 'D', text: '只分化为记忆细胞，不产生效应细胞' },
    ],
    answer: 'B',
    explain:
      '选 B。课件原文：免疫活性细胞受疫苗抗原刺激后，即可母细胞化而大量增殖，分化为效应细胞及少量记忆 T/B 细胞。注意“多数分化为效应细胞、少数分化为记忆细胞”——正是这少数记忆细胞带来了长期保护。',
    ref: { moduleId: 'm2', label: '模块二 · 初次应答', anchor: 'm2-primary' },
    tags: ['难点'],
  },
  {
    id: 'c08-q8',
    type: 'multi',
    stem: '按课件表述，辅助性 T 细胞（Th）分泌细胞因子的作用包括：',
    options: [
      { key: 'A', text: '促进 B 细胞产生抗体及类别转换' },
      { key: 'B', text: '促进细胞毒性 T 细胞活化增殖' },
      { key: 'C', text: '增强巨噬细胞杀伤作用' },
      { key: 'D', text: '直接释放穿孔素杀伤靶细胞' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C，均为课件 Th 功能页原文。D 错：释放穿孔素和颗粒酶是 **CTL** 的杀伤机制，不是 Th 的作用方式。',
    ref: { moduleId: 'm2', label: '模块二 · 效应功能', anchor: 'm2-effectors' },
    tags: ['重点'],
  },
  {
    id: 'c08-q9',
    type: 'multi',
    stem: '再次免疫应答的特点包括：',
    options: [
      { key: 'A', text: '快速' },
      { key: 'B', text: '高效' },
      { key: 'C', text: '持久' },
      { key: 'D', text: '潜伏期更长' },
      { key: 'E', text: '有效抗体含量更高' },
    ],
    answer: ['A', 'B', 'C', 'E'],
    explain:
      '选 A、B、C、E。课件原文：再次免疫应答是快速、高效且持久的应答反应，T 细胞比率和有效抗体含量更高，**潜伏期更短**——所以 D 错（潜伏期更短而非更长）。',
    ref: { moduleId: 'm2', label: '模块二 · 再次应答', anchor: 'm2-secondary' },
    tags: ['难点'],
  },
  {
    id: 'c08-q10',
    type: 'judge',
    stem: '再次免疫应答的潜伏期比初次免疫应答更短。',
    answer: true,
    explain:
      '正确。课件明确指出再次应答“潜伏期更短”。原因是记忆细胞已经存在，无需从头识别与扩增，可迅速进入效应阶段。',
    ref: { moduleId: 'm2', label: '模块二 · 再次应答', anchor: 'm2-secondary' },
    tags: ['难点'],
  },
  {
    id: 'c08-q11',
    type: 'multi',
    stem: '关于“为什么有些传染病需要免疫两次”，下列解释有依据的有：',
    options: [
      { key: 'A', text: '初次应答产生的记忆细胞数量有限' },
      { key: 'B', text: '加强免疫可扩大记忆池、提高抗体水平' },
      { key: 'C', text: '加强免疫后的应答更快、更强、更持久' },
      { key: 'D', text: '因为疫苗第一次接种时完全无效' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C。D 错：初次接种并非无效，它建立了初始的效应与记忆细胞——否则加强免疫也无从“唤醒”记忆。加强免疫的价值在于扩大与巩固这份记忆。',
    ref: { moduleId: 'm2', label: '模块二 · 思考题', anchor: 'm2-thinking' },
    tags: ['难点'],
  },
  {
    id: 'c08-q12',
    type: 'multi',
    stem: '疫苗研制的核心步骤通常包括：',
    options: [
      { key: 'A', text: '抗原的确定与制备' },
      { key: 'B', text: '纯化' },
      { key: 'C', text: '配制（含佐剂）' },
      { key: 'D', text: '质量检验与免疫效力、安全性评价' },
      { key: 'E', text: '无需任何评价即可直接上市' },
    ],
    answer: ['A', 'B', 'C', 'D'],
    explain:
      '选 A、B、C、D。课件指出疫苗研制包括比较多的复杂流程，核心步骤涵盖抗原制备、纯化、配制、质检与效力安全评价。E 明显错误：任何生物制品都必须经过严格的质量与效力评价。',
    ref: { moduleId: 'm3', label: '模块三 · 研制流程', anchor: 'm3-flow' },
    tags: ['重点'],
  },
  {
    id: 'c08-q13',
    type: 'single',
    stem: '课件指出虚拟仿真实验室在疫苗教学中的价值在于：',
    options: [
      { key: 'A', text: '可以完全替代真实生产' },
      { key: 'B', text: '帮助解决疫苗生产周期长、生物安全风险高、设备昂贵导致的实操困难' },
      { key: 'C', text: '可以跳过质量检验环节' },
      { key: 'D', text: '可以让学生直接获得生产资质' },
    ],
    answer: 'B',
    explain:
      '选 B。课件原文：疫苗生产周期长、生物安全风险高且设备昂贵，课堂难以开展完整实操，虚拟仿真实验室可较好解决这一难点。它解决的是“教学可及性”，不能替代真实生产与监管（A、C、D 都不成立）。',
    ref: { moduleId: 'm3', label: '模块三 · 虚拟仿真', anchor: 'm3-simulation' },
    tags: ['重点'],
  },
  {
    id: 'c08-q14',
    type: 'single',
    stem: '关于 AI 在疫苗研发中的作用，表述最准确的是：',
    options: [
      { key: 'A', text: 'AI 可以完全替代实验验证' },
      { key: 'B', text: 'AI 可整合抗原数据加速研发，但预测结果仍需实验验证' },
      { key: 'C', text: 'AI 只用于市场销售预测' },
      { key: 'D', text: 'AI 的作用仅限于文字排版' },
    ],
    answer: 'B',
    explain:
      '选 B。课件指出 AI 在疫苗智慧研发中展现显著优势，可整合抗原数据、加速从“经验研发”向“智能设计”转变。但预测结果仍须通过表达、纯化、质检与免疫效力评价来验证——这也是前面几章反复强调的原则。',
    ref: { moduleId: 'm3', label: '模块三 · AI 辅助', anchor: 'm3-ai' },
    tags: ['重点'],
  },
  {
    id: 'c08-q15',
    type: 'single',
    stem: '课件总结指出疫苗“通过诱导机体产生适应性免疫应答而发挥保护作用”，这说明疫苗的保护：',
    options: [
      { key: 'A', text: '来自疫苗本身的杀菌作用' },
      { key: 'B', text: '依赖宿主免疫系统后续的识别与清除功能' },
      { key: 'C', text: '与免疫记忆无关' },
      { key: 'D', text: '只依赖体液免疫' },
    ],
    answer: 'B',
    explain:
      '选 B。课件原文明示“其保护效应依赖于宿主免疫系统后续的识别与清除功能”。疫苗提供的是“训练与记忆”，执行保护的是机体自身的免疫系统——体液免疫与细胞免疫共同参与。',
    ref: { moduleId: 'm2', label: '模块二 · 作用原理', anchor: 'm2-principle' },
    tags: ['重点'],
  },
]

const classroomQuestions: Question[] = [
  {
    id: 'c08-t2',
    type: 'ordering',
    stem: '把疫苗刺激的初次免疫应答关键事件按顺序排列：',
    scenario: '小组把 6 张事件卡按“接种 → 清除抗原”的顺序排好，并标出各自属于哪个阶段。',
    items: [
      { id: 's1', text: '抗原递呈细胞捕获疫苗中的抗原', hint: '致敏阶段' },
      { id: 's2', text: '抗原被加工处理并递呈', hint: '致敏阶段' },
      { id: 's3', text: '特异性 T/B 淋巴细胞识别递呈的抗原', hint: '致敏阶段' },
      { id: 's4', text: '免疫活性细胞母细胞化并大量增殖', hint: '增殖分化阶段' },
      { id: 's5', text: '分化为效应细胞及少量记忆 T/B 细胞', hint: '增殖分化阶段' },
      { id: 's6', text: '浆细胞分泌抗体、Th 释放细胞因子、CTL 杀伤靶细胞', hint: '效应阶段' },
    ],
    explain:
      '正确顺序：捕获 → 加工递呈 → 识别 → 增殖 → 分化（效应细胞 + 少量记忆）→ 效应清除。前 3 步是致敏阶段，第 4—5 步是增殖分化阶段，第 6 步是效应阶段。特别注意“少数分化为记忆细胞”——这是加强免疫与长期保护的基础。',
    ref: { moduleId: 'm2', label: '模块二 · 初次应答', anchor: 'm2-primary' },
    tags: ['课堂任务'],
  },
  {
    id: 'c08-t3',
    type: 'sorting',
    stem: '把下列特征归入初次免疫应答或再次免疫应答：',
    scenario: '同样的抗原第二次进入，反应明显不同。请判断每条特征属于哪一种应答。',
    buckets: [
      { id: 'primary', label: '初次免疫应答', hint: '首次接触该抗原' },
      { id: 'secondary', label: '再次免疫应答', hint: '再次接触相同/相似抗原' },
    ],
    items: [
      { id: 'p1', text: '潜伏期较长，抗体出现较慢', bucket: 'primary' },
      { id: 'p2', text: '潜伏期更短，反应迅速', bucket: 'secondary' },
      { id: 'p3', text: '产生少量记忆 T/B 细胞', bucket: 'primary' },
      { id: 'p4', text: '有效抗体含量更高，T 细胞比率更高', bucket: 'secondary' },
      { id: 'p5', text: '持久性更强', bucket: 'secondary' },
    ],
    explain:
      'p1/p3 → 初次应答（慢、弱，但留下记忆）；p2/p4/p5 → 再次应答（快、强、持久）。初次应答留下的记忆细胞，正是再次应答“更快更强”的前提。',
    ref: { moduleId: 'm2', label: '模块二 · 再次应答', anchor: 'm2-secondary' },
    tags: ['课堂任务'],
  },
  {
    id: 'c08-t4',
    type: 'sorting',
    stem: '把下列描述归入疫苗保护的三种效应功能：',
    scenario: '疫苗的保护依赖三条路径，请判断每条描述属于哪一条。',
    buckets: [
      { id: 'ab', label: '抗体（体液免疫）', hint: '多种功能发挥保护' },
      { id: 'th', label: '辅助性 T 细胞', hint: '分泌细胞因子' },
      { id: 'ctl', label: '细胞毒性 T 细胞', hint: '杀伤靶细胞' },
    ],
    items: [
      { id: 'e1', text: '疫苗刺激机体产生体液免疫应答，通过其多种功能发挥保护作用', bucket: 'ab' },
      { id: 'e2', text: '分泌细胞因子促进 B 细胞产生抗体及类别转换', bucket: 'th' },
      { id: 'e3', text: '释放穿孔素和颗粒酶破坏靶细胞膜', bucket: 'ctl' },
      { id: 'e4', text: '启动 Fas/FasL 途径诱导靶细胞凋亡', bucket: 'ctl' },
      { id: 'e5', text: '增强巨噬细胞杀伤作用', bucket: 'th' },
    ],
    explain:
      'e1 → 抗体；e2/e5 → Th（分泌细胞因子，促 B 细胞类别转换、增强巨噬细胞）；e3/e4 → CTL（穿孔素/颗粒酶、Fas/FasL）。注意课件特别标注“灭活苗”诱导的细胞免疫较弱。',
    ref: { moduleId: 'm2', label: '模块二 · 效应功能', anchor: 'm2-effectors' },
    tags: ['课堂任务'],
  },
  {
    id: 'c08-t5',
    type: 'sorting',
    stem: '把疫苗类型归入“传统疫苗”或“新型疫苗”：',
    scenario: '五种疫苗类型，请按课件的分类标准归类。',
    buckets: [
      { id: 'conv', label: '传统疫苗', hint: '全病毒' },
      { id: 'novel', label: '新型疫苗', hint: '蛋白 / 核酸 / 载体' },
    ],
    items: [
      { id: 't1', text: '灭活疫苗', bucket: 'conv' },
      { id: 't2', text: '弱毒疫苗', bucket: 'conv' },
      { id: 't3', text: '亚单位疫苗', bucket: 'novel' },
      { id: 't4', text: '载体疫苗', bucket: 'novel' },
      { id: 't5', text: '核酸疫苗', bucket: 'novel' },
    ],
    explain:
      't1/t2 → 传统（抗原为全病毒）；t3/t4/t5 → 新型（抗原为病毒蛋白、或经载体/核酸递送）。分类依据是课件所说的“制备工艺和所含成分”。',
    ref: { moduleId: 'm1', label: '模块一 · 疫苗种类', anchor: 'm1-types' },
    tags: ['课堂任务'],
  },
  {
    id: 'c08-t6',
    type: 'multi',
    stem: '某场讨论是否需要加强免疫。下列理由有科学依据的有：',
    scenario: '作为技术顾问，请先判断哪些理由成立，再考虑如何制定程序。',
    options: [
      { key: 'A', text: '初次应答只产生少量记忆细胞，加强免疫可扩大记忆池' },
      { key: 'B', text: '再次应答更快、更强、更持久' },
      { key: 'C', text: '野毒入侵时，已接种机体会启动再次应答，加快清除' },
      { key: 'D', text: '打越多越好，不必考虑成本与应激' },
      { key: 'E', text: '应结合疫苗类型、动物日龄与流行情况综合确定程序' },
    ],
    answer: ['A', 'B', 'C', 'E'],
    explain:
      '选 A、B、C、E。D 忽略了成本、动物应激与实际收益——免疫程序应基于科学依据与流行病学情况综合制订，而不是“越多越好”。',
    summary: '加强免疫有明确机制依据，但程序需科学制订而非盲目加量。',
    ref: { moduleId: 'm2', label: '模块二 · 再次应答', anchor: 'm2-thinking' },
    tags: ['课堂任务'],
  },
]

const homeworkQuestions: Question[] = [
  {
    id: 'c08-hb1',
    type: 'single',
    stem: '（基础）按课件分类，弱毒疫苗属于：',
    options: [
      { key: 'A', text: '新型疫苗' },
      { key: 'B', text: '传统疫苗' },
      { key: 'C', text: '核酸疫苗' },
      { key: 'D', text: '亚单位疫苗' },
    ],
    answer: 'B',
    explain: '课件把灭活疫苗与弱毒疫苗归为传统疫苗，抗原成分为全病毒。',
    ref: { moduleId: 'm1', label: '模块一 · 疫苗种类', anchor: 'm1-types' },
  },
  {
    id: 'c08-hb2',
    type: 'judge',
    stem: '（基础）疫苗直接与入侵的病原结合并将其清除。',
    answer: false,
    explain:
      '错误。课件明确指出疫苗作为抗原不直接与入侵病原结合，而是诱导特异性适应性免疫应答并形成免疫记忆，保护效应依赖宿主免疫系统后续的识别与清除。',
    ref: { moduleId: 'm2', label: '模块二 · 作用原理', anchor: 'm2-principle' },
  },
  {
    id: 'c08-hb3',
    type: 'multi',
    stem: '（基础）课件指出的疫苗研制核心步骤包括：',
    options: [
      { key: 'A', text: '抗原的确定与制备' },
      { key: 'B', text: '纯化' },
      { key: 'C', text: '配制（含佐剂）' },
      { key: 'D', text: '质量检验与效力、安全性评价' },
    ],
    answer: ['A', 'B', 'C', 'D'],
    explain: '四项均为疫苗研制的核心环节，构成从抗原到成品的完整链条。',
    ref: { moduleId: 'm3', label: '模块三 · 研制流程', anchor: 'm3-flow' },
  },
  {
    id: 'c08-hb4',
    type: 'ordering',
    stem: '（基础）把经典免疫学在疫苗领域的应用链条排序：',
    items: [
      { id: 'o1', text: '选定抗原（疫苗的有效成分）' },
      { id: 'o2', text: '制备与纯化抗原' },
      { id: 'o3', text: '配制（必要时加佐剂）' },
      { id: 'o4', text: '质量检验' },
      { id: 'o5', text: '免疫效力与安全性评价' },
    ],
    explain: '正确顺序：选抗原 → 制备纯化 → 配制 → 质检 → 效力与安全评价。最后两步是“能否上市”的关键关口。',
    ref: { moduleId: 'm3', label: '模块三 · 研制流程', anchor: 'm3-flow' },
  },
  {
    id: 'c08-ha1',
    type: 'open',
    stem:
      '（提升）某场要在灭活苗与弱毒苗之间做选择。请从“免疫应答类型、安全性、适用场景”三个角度给出分析（≥ 3 个要点）。',
    explain: '评分要点见参考思路。要求体现两类疫苗在抗原成分与免疫应答上的差异，而不是简单罗列。',
    guidance: [
      '抗原成分：两者都是全病毒，但弱毒苗保留低毒力活病原，可模拟自然感染；灭活苗已失去感染性。',
      '免疫应答类型：弱毒苗通常能更全面地诱导体液与细胞免疫；课件明确指出灭活苗诱导的细胞免疫较弱。',
      '安全性：灭活苗不存在毒力返强风险；弱毒苗需关注毒力返强与免疫抑制动物使用的风险。',
      '适用场景：需快速建立全面免疫且动物健康时倾向弱毒苗；孕畜、免疫抑制或需紧急免疫时倾向灭活苗。',
      '结论：没有绝对优劣，需结合流行情况、动物状态与生产条件综合选择。',
    ],
    minLength: 60,
    ref: { moduleId: 'm1', label: '模块一 · 疫苗种类', anchor: 'm1-types' },
  },
  {
    id: 'c08-ha2',
    type: 'single',
    stem: '（提升）课件指出“灭活苗”的一个局限是：',
    options: [
      { key: 'A', text: '诱导的细胞免疫较弱' },
      { key: 'B', text: '完全不能产生抗体' },
      { key: 'C', text: '不存在任何安全性风险' },
      { key: 'D', text: '不能用于任何动物' },
    ],
    answer: 'A',
    explain:
      '选 A。课件在 Th 功能页特别标注“疫苗诱导机体细胞免疫应答（灭活苗较弱）”。B 错：灭活苗仍能诱导体液免疫产生抗体；C、D 都不符合事实。',
    ref: { moduleId: 'm2', label: '模块二 · 效应功能', anchor: 'm2-effectors' },
  },
  {
    id: 'c08-ha3',
    type: 'sorting',
    stem: '（提升）把下列表述归入“初次应答”或“再次应答”：',
    buckets: [
      { id: 'p', label: '初次应答', hint: '首次接触' },
      { id: 's', label: '再次应答', hint: '记忆细胞参与' },
    ],
    items: [
      { id: 'd1', text: '需要较长时间才能产生有效抗体', bucket: 'p' },
      { id: 'd2', text: '记忆细胞迅速动员，潜伏期短', bucket: 's' },
      { id: 'd3', text: '是加强免疫想要强化的对象', bucket: 's' },
      { id: 'd4', text: '为后续保护留下记忆细胞', bucket: 'p' },
    ],
    explain:
      'd1/d4 → 初次应答（慢，但留下记忆）；d2/d3 → 再次应答（快，且正是加强免疫要强化的）。两者是因果相接的两个环节。',
    ref: { moduleId: 'm2', label: '模块二 · 再次应答', anchor: 'm2-secondary' },
  },
  {
    id: 'c08-he1',
    type: 'open',
    stem:
      '（拓展）以某一动物病毒为对象，请设计一款疫苗的研制思路（≥ 4 个要点），并说明你会如何评价它的保护效果。',
    explain: '开放题（对应课件开放作业）。评价重点是路线合理、能落到具体环节、并给出可测的评价指标。',
    guidance: [
      '确定抗原：依据病毒的表面糖蛋白或关键结构蛋白，明确目标表位（可借助 AI 预测，但需实验验证）。',
      '选择疫苗类型：按安全性、免疫原性与生产可行性在灭活/弱毒/亚单位/载体/核酸之间取舍。',
      '制备与配制：选择表达系统、纯化工艺；若为纯化蛋白需配伍佐剂。',
      '质量检验：抗原含量、纯度、完整性；批间一致性。',
      '效力评价：动物免疫后测抗体水平（中和抗体、HI 等）、细胞免疫指标（如 IFN-γ、CTL 活性），并进行攻毒保护试验。',
      '安全性：局部与全身反应观察、异常反应监测。',
    ],
    minLength: 100,
    ref: { moduleId: 'm3', label: '模块三 · 研制流程', anchor: 'm3-flow' },
  },
  {
    id: 'c08-he2',
    type: 'open',
    stem:
      '（拓展）课件指出 AI 可助力疫苗从“经验研发”向“智能设计”转变。请谈谈这一转变的价值与需要警惕的问题（≥ 2 个要点）。',
    explain: '开放题。评价重点是辩证：既看到效率提升，也看到验证与数据质量的约束。',
    guidance: [
      '价值一：从海量序列与结构中快速筛选候选抗原、预测表位，缩短前期探索时间。',
      '价值二：把“靠经验试”变成“按数据选”，提高研发的可重复性与系统性。',
      '警惕一：预测不等于结论，仍需表达、纯化、质检与效力评价验证。',
      '警惕二：模型质量依赖训练数据的代表性与质量；对新型病原可能外推能力有限。',
      '警惕三：不能因为“AI 说可以”而压缩必要的安全性与效力评价环节。',
    ],
    minLength: 80,
    ref: { moduleId: 'm3', label: '模块三 · AI 辅助', anchor: 'm3-ai' },
  },
]

const postTestQuestions: Question[] = [
  {
    id: 'c08-as1',
    type: 'single',
    stem: '疫苗发挥保护作用的根本方式是：',
    options: [
      { key: 'A', text: '直接杀灭入侵的病原微生物' },
      { key: 'B', text: '诱导特异性适应性免疫应答并形成免疫记忆' },
      { key: 'C', text: '向机体输入现成抗体' },
      { key: 'D', text: '抑制病原的复制酶' },
    ],
    answer: 'B',
    explain:
      '课件原文：疫苗通过诱导机体产生特异性适应性免疫应答，触发免疫级联反应，形成免疫记忆；其保护效应依赖于宿主免疫系统后续的识别与清除功能。',
    ref: { moduleId: 'm2', label: '模块二 · 作用原理', anchor: 'm2-principle' },
  },
  {
    id: 'c08-as2',
    type: 'judge',
    stem: '新型疫苗包括亚单位疫苗、载体疫苗和核酸疫苗。',
    answer: true,
    explain: '正确。课件把亚单位疫苗、载体疫苗、核酸疫苗归为新型疫苗；灭活疫苗与弱毒疫苗归为传统疫苗。',
    ref: { moduleId: 'm1', label: '模块一 · 疫苗种类', anchor: 'm1-types' },
  },
  {
    id: 'c08-as3',
    type: 'single',
    stem: '在初次免疫应答的增殖分化阶段，分化为记忆细胞的比例是：',
    options: [
      { key: 'A', text: '多数' },
      { key: 'B', text: '少数' },
      { key: 'C', text: '全部' },
      { key: 'D', text: '没有记忆细胞产生' },
    ],
    answer: 'B',
    explain:
      '选 B。课件图示标注“多数分化”为效应细胞、“少数分化”为记忆 T/B 细胞。虽是少数，却决定了长期保护——这也是加强免疫的价值所在。',
    ref: { moduleId: 'm2', label: '模块二 · 初次应答', anchor: 'm2-primary' },
  },
  {
    id: 'c08-as4',
    type: 'multi',
    stem: '关于再次免疫应答，符合课件表述的有：',
    options: [
      { key: 'A', text: '快速、高效且持久' },
      { key: 'B', text: 'T 细胞比率和有效抗体含量更高' },
      { key: 'C', text: '潜伏期更短' },
      { key: 'D', text: '不产生记忆细胞' },
    ],
    answer: ['A', 'B', 'C'],
    explain: '选 A、B、C，均为课件原文。D 错：再次应答本身也依赖并进一步巩固记忆细胞。',
    ref: { moduleId: 'm2', label: '模块二 · 再次应答', anchor: 'm2-secondary' },
  },
  {
    id: 'c08-as5',
    type: 'single',
    stem: '课件指出 AI 在疫苗研发中的定位是：',
    options: [
      { key: 'A', text: '可整合抗原数据、加速向“智能设计”转变，但结果仍需验证' },
      { key: 'B', text: '可以取代全部动物试验与质量检验' },
      { key: 'C', text: '只能用于市场营销' },
      { key: 'D', text: '与疫苗研发无关' },
    ],
    answer: 'A',
    explain:
      '选 A。课件指出 AI 在疫苗智慧研发中展现显著优势，可整合抗原数据、加速从“经验研发”向“智能设计”转变；但预测结果仍需通过实验与评价验证。',
    ref: { moduleId: 'm3', label: '模块三 · AI 辅助', anchor: 'm3-ai' },
  },
]

export const vaccineQuestionBank: Record<string, Question> = Object.fromEntries(
  [...preClassQuestions, ...moduleQuestions, ...classroomQuestions, ...homeworkQuestions, ...postTestQuestions].map(
    (q) => [q.id, q],
  ),
)

export const vaccineGroups = {
  preClass: preClassQuestions,
  module: moduleQuestions,
  classroom: classroomQuestions,
  homework: homeworkQuestions,
  postTest: postTestQuestions,
}
