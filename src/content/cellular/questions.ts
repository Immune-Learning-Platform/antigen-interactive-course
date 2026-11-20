import type { Question } from '../types'

const preClassQuestions: Question[] = [
  {
    id: 'c05-pre1',
    type: 'single',
    stem: '按课件表述，细胞免疫应答的效应方式是：',
    options: [
      { key: 'A', text: '仅通过抗体中和病毒' },
      { key: 'B', text: '对抗原的直接杀伤作用，以及致敏 T 细胞释放的细胞因子的协同杀伤作用' },
      { key: 'C', text: '仅通过补体溶解靶细胞' },
      { key: 'D', text: '通过吞噬细胞单独完成' },
    ],
    answer: 'B',
    explain:
      '选 B。课件原文：细胞免疫应答是 T 细胞受抗原刺激后分化、增殖、转化为致敏 T 细胞，对抗原直接杀伤作用及致敏 T 细胞所释放的细胞因子的协同杀伤作用。',
    ref: { moduleId: 'm1', label: '模块一 · 概念', anchor: 'm1-concept' },
    tags: ['概念'],
  },
  {
    id: 'c05-pre2',
    type: 'multi',
    stem: '课件明确细胞免疫应答针对的对象包括：',
    options: [
      { key: 'A', text: '病毒感染细胞' },
      { key: 'B', text: '肿瘤细胞' },
      { key: 'C', text: '胞内寄生菌' },
      { key: 'D', text: '血液中游离的毒素' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C。课件列出病毒感染细胞、肿瘤细胞、细菌（胞内菌）等。D 错：游离毒素主要由抗体中和，属于体液免疫范畴。',
    summary: '细胞免疫管“细胞内的敌人”，抗体管“细胞外的敌人”。',
    ref: { moduleId: 'm1', label: '模块一 · 概念', anchor: 'm1-concept' },
    tags: ['概念'],
  },
  {
    id: 'c05-pre3',
    type: 'judge',
    stem: 'T 细胞可以直接识别完整的病毒颗粒。',
    answer: false,
    explain:
      '错误。课件明确指出：T 细胞不能直接识别构象型抗原，只能通过 TCR 识别抗原肽-MHC 复合体（p-MHC），因此需要抗原递呈细胞把抗原加工成抗原肽并与 MHC 结合。',
    ref: { moduleId: 'm2', label: '模块二 · 抗原递呈', anchor: 'm2-presentation' },
    tags: ['难点'],
  },
  {
    id: 'c05-pre4',
    type: 'open',
    stem: '某场免疫程序完整、抗体检测合格，却仍出现病毒持续感染。请用“抗体—细胞免疫”解释可能的原因（1—2 句话）。',
    scenario: '技术员困惑：抗体水平不低，为什么还会发病？',
    explain:
      '开放题。核心是能指出：抗体主要作用于细胞外病原；一旦病毒进入细胞，抗体够不到，需要细胞免疫（CTL、Th1 活化巨噬细胞）来清除感染细胞。',
    guidance: [
      '抗体擅长处理细胞外病原，可中和病毒颗粒、阻止其吸附。',
      '病毒进入细胞后，抗体无法识别细胞内的病毒，需要 CTL 识别细胞表面 p-MHC I 并杀伤感染细胞。',
      '若细胞免疫功能不足（或其他原因），就可能出现“抗体正常但感染持续”的情况。',
      '推论：评估免疫保护不能只看抗体，还要看细胞免疫。',
    ],
    minLength: 12,
    ref: { moduleId: 'm1', label: '模块一 · 与体液免疫的分工', anchor: 'm1-concept' },
    tags: ['应用', '情境'],
  },
]

const moduleQuestions: Question[] = [
  {
    id: 'c05-q1',
    type: 'single',
    stem: '下列哪种情形最依赖细胞免疫而非抗体？',
    options: [
      { key: 'A', text: '血液中游离的细菌毒素' },
      { key: 'B', text: '被巨噬细胞吞噬后仍能存活的胞内菌' },
      { key: 'C', text: '呼吸道黏膜表面的病毒颗粒' },
      { key: 'D', text: '细胞外的细菌繁殖体' },
    ],
    answer: 'B',
    explain:
      '选 B。胞内菌藏在细胞内，抗体无法触及，必须依靠 Th1 活化巨噬细胞、CTL 杀伤感染细胞来清除。A、C、D 主要依靠抗体或黏膜免疫处理。',
    ref: { moduleId: 'm1', label: '模块一 · 概念', anchor: 'm1-concept' },
    tags: ['概念'],
  },
  {
    id: 'c05-q2',
    type: 'multi',
    stem: '关于细胞免疫应答，符合课件表述的有：',
    options: [
      { key: 'A', text: 'T 细胞受抗原刺激后分化、增殖、转化为致敏 T 细胞' },
      { key: 'B', text: '包括对抗原的直接杀伤作用' },
      { key: 'C', text: '包括致敏 T 细胞释放细胞因子的协同杀伤作用' },
      { key: 'D', text: '仅靠补体完成杀伤' },
    ],
    answer: ['A', 'B', 'C'],
    explain: '选 A、B、C。D 错：补体属于体液免疫/固有免疫的效应系统，不是细胞免疫的定义性内容。',
    ref: { moduleId: 'm1', label: '模块一 · 概念', anchor: 'm1-concept' },
    tags: ['概念'],
  },
  {
    id: 'c05-q3',
    type: 'single',
    stem: '按课件表述，细胞免疫应答的三个阶段依次是：',
    options: [
      { key: 'A', text: '效应阶段 → 反应阶段 → 致敏阶段' },
      { key: 'B', text: '致敏阶段 → 反应阶段 → 效应阶段' },
      { key: 'C', text: '反应阶段 → 致敏阶段 → 效应阶段' },
      { key: 'D', text: '致敏阶段 → 效应阶段 → 反应阶段' },
    ],
    answer: 'B',
    explain:
      '选 B。课件原文：分为致敏阶段（抗原递呈细胞和 T 细胞）、反应阶段和效应阶段（T 细胞）。括号提示了各阶段的主角。',
    ref: { moduleId: 'm1', label: '模块一 · 三个阶段', anchor: 'm1-stages' },
    tags: ['概念'],
  },
  {
    id: 'c05-q4',
    type: 'single',
    stem: 'T 细胞不能直接识别完整构象抗原，根本原因是：',
    options: [
      { key: 'A', text: 'T 细胞数量太少' },
      { key: 'B', text: 'TCR 只能识别抗原肽-MHC 复合体（p-MHC）' },
      { key: 'C', text: 'T 细胞没有细胞核' },
      { key: 'D', text: '抗原分子太大' },
    ],
    answer: 'B',
    explain:
      '选 B。课件原文：T 细胞不能直接识别构象型抗原，只能通过 TCR 识别抗原肽-MHC 复合体（p-MHC），因此需抗原递呈细胞将抗原降解、加工成抗原肽并与 MHC 结合。',
    ref: { moduleId: 'm2', label: '模块二 · 抗原递呈', anchor: 'm2-presentation' },
    tags: ['难点'],
  },
  {
    id: 'c05-q5',
    type: 'single',
    stem: '内源性抗原经加工后通常与哪类分子结合、递呈给哪类细胞？',
    options: [
      { key: 'A', text: 'MHC I 类分子 → CD8⁺ T 细胞' },
      { key: 'B', text: 'MHC II 类分子 → CD4⁺ T 细胞' },
      { key: 'C', text: 'MHC I 类分子 → CD4⁺ T 细胞' },
      { key: 'D', text: 'MHC II 类分子 → CD8⁺ T 细胞' },
    ],
    answer: 'A',
    explain:
      '选 A。内源性抗原（细胞内感染的病毒蛋白、肿瘤抗原）经加工后与 MHC I 类分子结合，递呈给 CD8⁺ T 细胞，诱导细胞毒性 T 细胞（CTL）。外源性抗原则走 MHC II → CD4⁺ T 细胞。',
    summary: '内源→MHC I→CD8；外源→MHC II→CD4。',
    ref: { moduleId: 'm2', label: '模块二 · 两条路线', anchor: 'm2-routes' },
    tags: ['难点'],
  },
  {
    id: 'c05-q6',
    type: 'judge',
    stem: '外源性抗原经加工后与 MHC II 类分子结合，递呈给 CD4⁺ T 细胞。',
    answer: true,
    explain:
      '正确。外源性抗原（如被吞噬的细菌）经加工后与 MHC II 类分子结合，递呈给 CD4⁺ T 细胞，诱导辅助性 T 细胞，由其协调更大的免疫反应。',
    ref: { moduleId: 'm2', label: '模块二 · 两条路线', anchor: 'm2-routes' },
    tags: ['难点'],
  },
  {
    id: 'c05-q7',
    type: 'single',
    stem: '关于免疫突触的形成，符合课件表述的是：',
    options: [
      { key: 'A', text: 'TCR 识别 p-MHC 后，黏附分子结合增强、结合时间延长，形成稳定接触结构' },
      { key: 'B', text: '免疫突触由抗体与补体结合形成' },
      { key: 'C', text: '免疫突触是两个 T 细胞之间的结构' },
      { key: 'D', text: '免疫突触的形成不需要 TCR 参与' },
    ],
    answer: 'A',
    explain:
      '选 A。课件原文：TCR 识别 pMHC 后，黏附分子结合增强，稳定并延长结合时间，T 细胞与 APC 形成免疫突触。免疫突触是 T 细胞与抗原递呈细胞之间的结构，不是两个 T 细胞之间。',
    ref: { moduleId: 'm2', label: '模块二 · 免疫突触', anchor: 'm2-recognition' },
    tags: ['难点'],
  },
  {
    id: 'c05-q8',
    type: 'multi',
    stem: '按课件表述，T 细胞活化、增殖和分化需要哪些信号共同作用？',
    options: [
      { key: 'A', text: '抗原刺激信号' },
      { key: 'B', text: '共刺激信号' },
      { key: 'C', text: '细胞因子信号' },
      { key: 'D', text: '补体激活信号' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C。课件原文：在抗原刺激信号、共刺激信号和细胞因子信号共同作用下，分化为不同种类的效应性 T 细胞和少量记忆性 T 细胞。D 不是课件所列的 T 细胞活化信号。',
    ref: { moduleId: 'm2', label: '模块二 · 三重信号', anchor: 'm2-proliferation' },
    tags: ['难点'],
  },
  {
    id: 'c05-q9',
    type: 'single',
    stem: '三种信号中，决定 T 细胞“分化为哪一类效应细胞”的主要是：',
    options: [
      { key: 'A', text: '抗原刺激信号' },
      { key: 'B', text: '共刺激信号' },
      { key: 'C', text: '细胞因子信号' },
      { key: 'D', text: '黏附分子信号' },
    ],
    answer: 'C',
    explain:
      '选 C。抗原刺激信号决定特异性（认谁），共刺激信号决定是否真正启动，细胞因子信号决定分化方向（变成哪一类效应细胞）。',
    summary: '第一信号定“认谁”，第二信号定“要不要打”，第三信号定“怎么打”。',
    ref: { moduleId: 'm2', label: '模块二 · 三重信号', anchor: 'm2-proliferation' },
    tags: ['难点'],
  },
  {
    id: 'c05-q10',
    type: 'multi',
    stem: '课件列出的效应细胞作用方式包括：',
    options: [
      { key: 'A', text: '释放淋巴因子' },
      { key: 'B', text: '巨噬细胞活化和释放溶酶体酶' },
      { key: 'C', text: 'CTL 效应' },
      { key: 'D', text: '分泌大量抗体' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C。课件效应阶段页面列出释放淋巴因子、巨噬细胞活化和释放溶酶体酶、CTL 效应。D 错：分泌抗体是浆细胞的功能，属于体液免疫。',
    ref: { moduleId: 'm2', label: '模块二 · 效应阶段', anchor: 'm2-effector' },
    tags: ['难点'],
  },
  {
    id: 'c05-q11',
    type: 'single',
    stem: '对胞内寄生菌（如结核分枝杆菌）最关键的清除机制是：',
    options: [
      { key: 'A', text: '抗体中和' },
      { key: 'B', text: '效应 T 细胞活化巨噬细胞、增强其杀伤能力' },
      { key: 'C', text: '补体直接溶解感染细胞' },
      { key: 'D', text: '红细胞携带氧气' },
    ],
    answer: 'B',
    explain:
      '选 B。胞内菌藏在细胞内，抗体无法触及。效应 T 细胞（尤其 Th1 类）释放细胞因子活化巨噬细胞，增强其吞噬与杀伤能力，这是清除胞内菌的关键。',
    ref: { moduleId: 'm3', label: '模块三 · 抗感染', anchor: 'm3-antiinfection' },
    tags: ['重点'],
  },
  {
    id: 'c05-q12',
    type: 'judge',
    stem: '抗原持续存在时，可致单核/巨噬细胞呈慢性活化状态，局部组织出现纤维化和肉芽肿。',
    answer: true,
    explain:
      '正确，这是课件原文表述。课件指出抗原被清除后 DTH 能自行消退；若抗原持续存在，则出现上述慢性改变——这也是细胞免疫在 IV 型超敏反应中的不利作用。',
    ref: { moduleId: 'm3', label: '模块三 · IV 型超敏', anchor: 'm3-hypersensitivity' },
    tags: ['重点'],
  },
  {
    id: 'c05-q13',
    type: 'single',
    stem: '牛结核检测所依据的免疫学原理主要是：',
    options: [
      { key: 'A', text: '检测血清中的特异性抗体水平' },
      { key: 'B', text: '检测机体对特异抗原的细胞免疫反应' },
      { key: 'C', text: '检测补体总量' },
      { key: 'D', text: '检测红细胞数量' },
    ],
    answer: 'B',
    explain:
      '选 B。结核分枝杆菌是胞内菌，机体对其免疫以细胞免疫为主。因此检测思路是检测细胞免疫反应（如迟发型超敏反应），而不是查抗体——这也解释了“抗体合格≠防住结核”。',
    ref: { moduleId: 'm3', label: '模块三 · 牛结核检测', anchor: 'm3-tb' },
    tags: ['重点'],
  },
  {
    id: 'c05-q14',
    type: 'multi',
    stem: '关于 CAR-T，符合课件表述的有：',
    options: [
      { key: 'A', text: '2017 年 CAR-T 疗法获批' },
      { key: 'B', text: '课件记载 6 岁白血病女孩接受治疗后获得完全缓解' },
      { key: 'C', text: '课件引用公开报道指出我国体内 CAR-T 领域已有百余家企业布局' },
      { key: 'D', text: 'CAR-T 的原理是给 T 细胞装上能识别特定靶点的受体' },
    ],
    answer: ['A', 'B', 'C', 'D'],
    explain:
      '四项均符合课件内容与本章机制。D 是对 CAR-T 原理的准确概括：通过基因工程把识别特定靶点的受体（CAR）装到 T 细胞上，突破天然 TCR 只能识别 p-MHC 的限制。',
    ref: { moduleId: 'm3', label: '模块三 · CAR-T', anchor: 'm3-cart' },
    tags: ['重点'],
  },
]

const classroomQuestions: Question[] = [
  {
    id: 'c05-t2',
    type: 'ordering',
    stem: '把细胞免疫应答的关键事件按发生顺序排列：',
    scenario: '小组把 6 张事件卡按“抗原进入 → 效应执行”的顺序排好，并说出每步属于哪个阶段。',
    items: [
      { id: 's1', text: '抗原递呈细胞摄取并加工抗原', hint: '致敏阶段' },
      { id: 's2', text: '抗原肽与 MHC 结合形成 p-MHC', hint: '致敏阶段' },
      { id: 's3', text: 'TCR 识别 p-MHC，黏附分子结合增强', hint: '致敏阶段' },
      { id: 's4', text: '形成免疫突触，信号开始累积', hint: '致敏阶段' },
      { id: 's5', text: '在抗原刺激、共刺激与细胞因子信号下活化增殖', hint: '反应阶段' },
      { id: 's6', text: '效应 T 细胞执行杀伤或辅助功能', hint: '效应阶段' },
    ],
    explain:
      '正确顺序：摄取加工 → 形成 p-MHC → TCR 识别 → 免疫突触 → 活化增殖 → 效应执行。前四步构成致敏阶段，第五步是反应阶段，第六步是效应阶段。顺序不能颠倒——T 细胞必须“先认出、再扩增、后执行”。',
    ref: { moduleId: 'm1', label: '模块一 · 三个阶段', anchor: 'm1-stages' },
    tags: ['课堂任务'],
  },
  {
    id: 'c05-t3',
    type: 'sorting',
    stem: '把下列描述归入内源性抗原递呈或外源性抗原递呈：',
    scenario: '同一个免疫系统，两条不同的递呈路线。请判断每条描述属于哪一条。',
    buckets: [
      { id: 'endo', label: '内源性抗原递呈', hint: 'MHC I → CD8⁺ → CTL' },
      { id: 'exo', label: '外源性抗原递呈', hint: 'MHC II → CD4⁺ → Th' },
    ],
    items: [
      { id: 'p1', text: '抗原来源于细胞内感染的病毒蛋白', bucket: 'endo' },
      { id: 'p2', text: '抗原来源于被吞噬的细胞外细菌', bucket: 'exo' },
      { id: 'p3', text: '与 MHC I 类分子结合', bucket: 'endo' },
      { id: 'p4', text: '与 MHC II 类分子结合', bucket: 'exo' },
      { id: 'p5', text: '递呈给 CD8⁺ T 细胞，诱导 CTL', bucket: 'endo' },
      { id: 'p6', text: '递呈给 CD4⁺ T 细胞，诱导辅助性 T 细胞', bucket: 'exo' },
    ],
    explain:
      'p1/p3/p5 → 内源性（细胞内出问题 → 需要 CTL 直接清除该细胞）；p2/p4/p6 → 外源性（外面有敌人 → 需要 Th 协调更大反应）。',
    summary: '记一条主线：抗原来自哪里，决定由谁来应战。',
    ref: { moduleId: 'm2', label: '模块二 · 两条路线', anchor: 'm2-routes' },
    tags: ['课堂任务'],
  },
  {
    id: 'c05-t4',
    type: 'sorting',
    stem: '把下列描述归入 T 细胞活化的三种信号：',
    scenario: '三重信号各管一件事。请判断每条描述属于哪一种信号。',
    buckets: [
      { id: 'sig1', label: '抗原刺激信号（第一）', hint: '决定特异性' },
      { id: 'sig2', label: '共刺激信号（第二）', hint: '决定是否启动' },
      { id: 'sig3', label: '细胞因子信号（第三）', hint: '决定分化方向' },
    ],
    items: [
      { id: 'g1', text: 'TCR 识别 p-MHC 复合体', bucket: 'sig1' },
      { id: 'g2', text: 'APC 与 T 细胞表面共刺激分子互作', bucket: 'sig2' },
      { id: 'g3', text: '细胞因子决定 T 细胞分化为 Th1 还是 Th2', bucket: 'sig3' },
      { id: 'g4', text: '决定这次应答针对的是哪一个抗原', bucket: 'sig1' },
      { id: 'g5', text: '避免对无害抗原“误开火”', bucket: 'sig2' },
    ],
    explain:
      'g1/g4 → 第一信号（特异性）；g2/g5 → 第二信号（是否启动，是重要的“安全阀”）；g3 → 第三信号（分化方向）。三者缺一不可。',
    ref: { moduleId: 'm2', label: '模块二 · 三重信号', anchor: 'm2-proliferation' },
    tags: ['课堂任务'],
  },
  {
    id: 'c05-t5',
    type: 'sorting',
    stem: '把下列描述归入对应的效应方式：',
    scenario: '效应阶段有三种方式，请判断每条描述对应哪一种。',
    buckets: [
      { id: 'ctl', label: 'CTL 效应', hint: '直接杀伤靶细胞' },
      { id: 'macro', label: '巨噬细胞活化', hint: '增强吞噬与杀伤' },
      { id: 'lymph', label: '释放淋巴因子', hint: '调动周围免疫细胞' },
    ],
    items: [
      { id: 'e1', text: '识别靶细胞表面 p-MHC I 后直接杀伤', bucket: 'ctl' },
      { id: 'e2', text: '效应 T 细胞释放细胞因子增强巨噬细胞吞噬与杀伤能力', bucket: 'macro' },
      { id: 'e3', text: '分泌多种细胞因子招募并激活周围免疫细胞', bucket: 'lymph' },
      { id: 'e4', text: '杀伤病毒感染细胞与肿瘤细胞', bucket: 'ctl' },
      { id: 'e5', text: '释放溶酶体酶', bucket: 'macro' },
    ],
    explain:
      'e1/e4 → CTL（直接杀手）；e2/e5 → 巨噬细胞活化（增强既有细胞的杀伤能力，含释放溶酶体酶）；e3 → 释放淋巴因子（放大局部反应）。',
    ref: { moduleId: 'm2', label: '模块二 · 效应阶段', anchor: 'm2-effector' },
    tags: ['课堂任务'],
  },
  {
    id: 'c05-t6',
    type: 'multi',
    stem: '下列情形中，哪些属于细胞免疫“不利作用”（IV 型超敏）的表现？',
    scenario: '课件指出细胞免疫在 IV 型超敏反应中发挥不利作用。请判断下列情形。',
    options: [
      { key: 'A', text: '抗原持续存在时，单核/巨噬细胞呈慢性活化状态' },
      { key: 'B', text: '局部组织出现纤维化和肉芽肿' },
      { key: 'C', text: '抗原被清除后，DTH 自行消退' },
      { key: 'D', text: '机体对胞内菌的清除能力增强' },
    ],
    answer: ['A', 'B'],
    explain:
      '选 A、B。课件把“抗原持续存在 → 慢性活化 → 纤维化和肉芽肿”描述为不利的组织学后果。C 是正常消退过程（不是损伤）；D 是有利的保护作用。这道题的关键是分清“保护”与“损伤”。',
    summary: '同一套机制，抗原清除后是保护，抗原持续时是损伤。',
    ref: { moduleId: 'm3', label: '模块三 · IV 型超敏', anchor: 'm3-hypersensitivity' },
    tags: ['课堂任务'],
  },
]

const homeworkQuestions: Question[] = [
  {
    id: 'c05-hb1',
    type: 'single',
    stem: '（基础）细胞免疫应答的三个阶段依次是：',
    options: [
      { key: 'A', text: '致敏阶段、反应阶段、效应阶段' },
      { key: 'B', text: '反应阶段、致敏阶段、效应阶段' },
      { key: 'C', text: '效应阶段、反应阶段、致敏阶段' },
      { key: 'D', text: '致敏阶段、效应阶段、反应阶段' },
    ],
    answer: 'A',
    explain: '课件原文：分为致敏阶段（抗原递呈细胞和 T 细胞）、反应阶段和效应阶段（T 细胞）。',
    ref: { moduleId: 'm1', label: '模块一 · 三个阶段', anchor: 'm1-stages' },
  },
  {
    id: 'c05-hb2',
    type: 'judge',
    stem: '（基础）T 细胞可以直接识别完整构象抗原。',
    answer: false,
    explain: '错误。T 细胞只能通过 TCR 识别抗原肽-MHC 复合体（p-MHC），不能直接识别构象型抗原。',
    ref: { moduleId: 'm2', label: '模块二 · 抗原递呈', anchor: 'm2-presentation' },
  },
  {
    id: 'c05-hb3',
    type: 'multi',
    stem: '（基础）下列属于课件所列效应细胞作用方式的有：',
    options: [
      { key: 'A', text: '释放淋巴因子' },
      { key: 'B', text: '巨噬细胞活化和释放溶酶体酶' },
      { key: 'C', text: 'CTL 效应' },
      { key: 'D', text: '合成补体' },
    ],
    answer: ['A', 'B', 'C'],
    explain: '选 A、B、C。D 错：补体主要由肝细胞等合成，不是效应 T 细胞的作用方式。',
    ref: { moduleId: 'm2', label: '模块二 · 效应阶段', anchor: 'm2-effector' },
  },
  {
    id: 'c05-hb4',
    type: 'ordering',
    stem: '（基础）把 T 细胞识别的过程排序：',
    items: [
      { id: 'r1', text: 'T 细胞表面黏附分子与 APC 配体结合（非特异性、可逆）' },
      { id: 'r2', text: 'TCR 识别 p-MHC（特异性识别）' },
      { id: 'r3', text: '黏附分子结合增强，结合时间延长' },
      { id: 'r4', text: 'T 细胞与 APC 形成免疫突触' },
    ],
    explain: '正确顺序：黏附试探（可逆）→ TCR 认准 → 结合增强 → 形成免疫突触。先“黏上”再“认准”，最后“锁稳”。',
    ref: { moduleId: 'm2', label: '模块二 · 免疫突触', anchor: 'm2-recognition' },
  },
  {
    id: 'c05-ha1',
    type: 'open',
    stem:
      '（提升）某疫苗设计希望诱导强烈的 CTL 应答。请用“抗原来源—MHC 类型—T 细胞亚群”写出你的设计思路（≥ 3 个要点）。',
    explain: '评分要点见参考思路。要求体现：想诱导 CTL 就必须让抗原进入 MHC I 递呈途径，靶向 CD8⁺ T 细胞。',
    guidance: [
      '明确目标：CTL 应答 → 需要激活 CD8⁺ T 细胞。',
      '递呈路线：必须让抗原进入内源性递呈途径，与 MHC I 类分子结合形成 p-MHC。',
      '实现手段举例：使用能在细胞内表达抗原的载体（如核酸疫苗），或让抗原进入胞质。',
      '配套条件：仍需共刺激信号与合适的细胞因子环境（第三信号）来支持 CD8⁺ T 细胞扩增与分化。',
      '评价指标：可用特异性杀伤活性、CD107a 脱颗粒、IFN-γ 表达等检测。',
    ],
    minLength: 60,
    ref: { moduleId: 'm2', label: '模块二 · 两条路线', anchor: 'm2-routes' },
  },
  {
    id: 'c05-ha2',
    type: 'single',
    stem: '（提升）缺失共刺激信号（第二信号）最可能的后果是：',
    options: [
      { key: 'A', text: 'T 细胞无法识别抗原的特异性' },
      { key: 'B', text: 'T 细胞应答无法真正启动，可能形成无反应状态' },
      { key: 'C', text: 'T 细胞会分化为错误的亚群' },
      { key: 'D', text: '抗体无法产生' },
    ],
    answer: 'B',
    explain:
      '选 B。第二信号的功能是“决定是否真正启动应答”，避免对无害抗原误开火；缺乏共刺激时，T 细胞往往不能有效活化。A 是第一信号的功能；C 是第三信号的功能。',
    ref: { moduleId: 'm2', label: '模块二 · 三重信号', anchor: 'm2-proliferation' },
  },
  {
    id: 'c05-ha3',
    type: 'sorting',
    stem: '（提升）把下列疾病/现象归入“细胞免疫起保护作用”或“细胞免疫造成损伤”：',
    buckets: [
      { id: 'protect', label: '保护作用', hint: '清除病原或肿瘤' },
      { id: 'damage', label: '造成损伤', hint: 'IV 型超敏相关' },
    ],
    items: [
      { id: 'd1', text: 'CTL 杀伤病毒感染细胞', bucket: 'protect' },
      { id: 'd2', text: 'Th1 活化巨噬细胞清除胞内菌', bucket: 'protect' },
      { id: 'd3', text: '抗原持续存在导致肉芽肿与纤维化', bucket: 'damage' },
      { id: 'd4', text: 'CTL 识别并杀伤肿瘤细胞', bucket: 'protect' },
    ],
    explain:
      'd1/d2/d4 → 保护作用；d3 → 损伤（IV 型超敏的组织学后果）。关键在于“抗原是否被清除”：清除后反应消退，持续存在则转为损伤。',
    ref: { moduleId: 'm3', label: '模块三 · IV 型超敏', anchor: 'm3-hypersensitivity' },
  },
  {
    id: 'c05-he1',
    type: 'open',
    stem:
      '（拓展）以禽流感病毒为例，请描述病毒与细胞免疫应答之间“博弈”的过程（≥ 4 个要点）。',
    explain: '开放题（对应课件开放作业）。评价重点是能否把三阶段机制用在具体病原上，并指出病毒的可能的逃逸方式。',
    guidance: [
      '感染与递呈：病毒进入细胞，其蛋白在细胞内被加工，经 MHC I 递呈给 CD8⁺ T 细胞。',
      '识别与活化：TCR 识别 p-MHC，配合共刺激与细胞因子信号，T 细胞活化增殖。',
      '效应：CTL 识别并杀伤被感染细胞，减少病毒复制场所；效应 T 细胞释放细胞因子放大反应。',
      '病毒的可能应对：抗原变异改变表位、下调 MHC I 表达以逃避 CTL 识别等。',
      '结论：细胞免疫的有效性取决于“表位匹配 + 递呈正常 + 效应功能完整”。',
    ],
    minLength: 100,
    ref: { moduleId: 'm2', label: '模块二 · 应答机制', anchor: 'm2-effector' },
  },
  {
    id: 'c05-he2',
    type: 'open',
    stem:
      '（拓展）CAR-T 通过工程化受体突破了“T 细胞只能识别 p-MHC”的限制。请说明这一突破带来的两点好处与一点需要警惕的风险（≥ 2 个要点）。',
    explain: '开放题。评价重点是能辩证看待技术突破：好处在于识别范围扩展，风险在于靶点选择与安全性。',
    guidance: [
      '好处一：不再受 MHC 限制，可直接识别细胞表面特定抗原，扩大可靶向的靶点范围。',
      '好处二：对 MHC 表达下调的肿瘤细胞仍可能有效（这是肿瘤逃逸 CTL 的常见方式）。',
      '需警惕的风险：靶点若在正常组织也有表达，会导致“误伤”正常细胞；此外还有细胞因子释放相关风险。',
      '结论：技术突破扩大了能力边界，同时也提高了对靶点选择与安全监测的要求。',
    ],
    minLength: 80,
    ref: { moduleId: 'm3', label: '模块三 · CAR-T', anchor: 'm3-cart' },
  },
]

const postTestQuestions: Question[] = [
  {
    id: 'c05-as1',
    type: 'single',
    stem: '细胞免疫应答主要针对的目标是：',
    options: [
      { key: 'A', text: '血液中游离的细菌毒素' },
      { key: 'B', text: '病毒感染细胞、肿瘤细胞、胞内菌' },
      { key: 'C', text: '体表的寄生虫' },
      { key: 'D', text: '食物中的大分子' },
    ],
    answer: 'B',
    explain: '课件明确细胞免疫针对病毒感染细胞、肿瘤细胞、胞内菌等“细胞内”目标；游离毒素主要由抗体中和。',
    ref: { moduleId: 'm1', label: '模块一 · 概念', anchor: 'm1-concept' },
  },
  {
    id: 'c05-as2',
    type: 'judge',
    stem: '免疫突触是 T 细胞与抗原递呈细胞之间形成的稳定接触结构。',
    answer: true,
    explain: '正确。TCR 识别 p-MHC 后黏附分子结合增强、结合时间延长，T 细胞与 APC 形成免疫突触。',
    ref: { moduleId: 'm2', label: '模块二 · 免疫突触', anchor: 'm2-recognition' },
  },
  {
    id: 'c05-as3',
    type: 'single',
    stem: 'T 细胞活化所需的三种信号是：',
    options: [
      { key: 'A', text: '抗原刺激信号、共刺激信号、细胞因子信号' },
      { key: 'B', text: '补体信号、抗体信号、细胞因子信号' },
      { key: 'C', text: '抗原信号、补体信号、黏附信号' },
      { key: 'D', text: '只有抗原刺激信号' },
    ],
    answer: 'A',
    explain: '课件原文：在抗原刺激信号、共刺激信号和细胞因子信号共同作用下，分化为效应性 T 细胞和少量记忆性 T 细胞。',
    ref: { moduleId: 'm2', label: '模块二 · 三重信号', anchor: 'm2-proliferation' },
  },
  {
    id: 'c05-as4',
    type: 'multi',
    stem: '关于细胞免疫的不利作用，符合课件表述的有：',
    options: [
      { key: 'A', text: '在 IV 型超敏反应发生中发挥不利作用' },
      { key: 'B', text: '抗原持续存在可致单核/巨噬细胞慢性活化' },
      { key: 'C', text: '可导致局部组织纤维化和肉芽肿' },
      { key: 'D', text: '细胞免疫只会有利，不会造成损伤' },
    ],
    answer: ['A', 'B', 'C'],
    explain: '选 A、B、C。D 与课件表述相反：课件明确指出细胞免疫在 IV 型超敏反应中发挥不利作用。',
    ref: { moduleId: 'm3', label: '模块三 · IV 型超敏', anchor: 'm3-hypersensitivity' },
  },
  {
    id: 'c05-as5',
    type: 'single',
    stem: 'CAR-T 的核心思路是：',
    options: [
      { key: 'A', text: '给 T 细胞装上能识别特定靶点的工程化受体' },
      { key: 'B', text: '给患者注射大量抗体' },
      { key: 'C', text: '抑制补体系统' },
      { key: 'D', text: '减少 T 细胞数量' },
    ],
    answer: 'A',
    explain:
      '选 A。CAR-T 通过基因工程把识别特定靶点的受体（CAR）装到 T 细胞上，使 T 细胞能识别并杀伤原本“认不出”的靶细胞，突破了天然 TCR 只能识别 p-MHC 的限制。',
    ref: { moduleId: 'm3', label: '模块三 · CAR-T', anchor: 'm3-cart' },
  },
]

export const cellularQuestionBank: Record<string, Question> = Object.fromEntries(
  [...preClassQuestions, ...moduleQuestions, ...classroomQuestions, ...homeworkQuestions, ...postTestQuestions].map(
    (q) => [q.id, q],
  ),
)

export const cellularGroups = {
  preClass: preClassQuestions,
  module: moduleQuestions,
  classroom: classroomQuestions,
  homework: homeworkQuestions,
  postTest: postTestQuestions,
}
