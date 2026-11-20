import type { Question } from '../types'

const JANEWAY = {
  label: "Janeway's Immunobiology · Glossary (NCBI Bookshelf NBK10759)",
  url: 'https://www.ncbi.nlm.nih.gov/books/NBK10759/',
  note: '补充知识点，非课件原文。',
}

/** 课前预习（4 题）：只对应“知识目标”，难度低、反馈快 */
const preClassQuestions: Question[] = [
  {
    id: 'pre-1',
    type: 'single',
    stem: '下列对“抗原”的表述，与本课件定义最接近的是：',
    options: [
      { key: 'A', text: '抗原就是病原微生物' },
      { key: 'B', text: '抗原一定是蛋白质' },
      { key: 'C', text: '能刺激机体启动特异性免疫应答、能与相应免疫应答产物特异性结合，并产生一系列生物学效应的物质' },
      { key: 'D', text: '凡是能与抗体结合的物质都是强免疫原' },
    ],
    answer: 'C',
    explain:
      '选 C。课件定义包含三个要点：启动特异性免疫应答、与应答产物特异性结合、产生生物学效应。抗原不限于病原微生物，也不限于蛋白质；能与抗体结合只说明具备反应原性，不代表免疫原性强（D 错）。',
    summary: '记住三个动作：点火 → 命中 → 产生效应。',
    ref: { moduleId: 'm1', label: '模块一 · 抗原的定义', anchor: 'm1-def' },
    tags: ['概念'],
  },
  {
    id: 'pre-2',
    type: 'multi',
    stem: '关于“抗原表位”，下列说法正确的有：',
    options: [
      { key: 'A', text: '是抗原分子上被特异性识别的局部结构' },
      { key: 'B', text: '是抗原特异性的结构基础' },
      { key: 'C', text: '同一个抗原分子上只能有一个表位' },
      { key: 'D', text: '表位可由氨基酸、糖基等组成' },
    ],
    answer: ['A', 'B', 'D'],
    explain:
      '选 A、B、D。课件明确：表位是抗原分子上被特异性识别的局部结构，是抗原特异性的结构基础，可由氨基酸、糖基等组成；同一抗原分子可具有多种、多个表位，因此 C 错。',
    summary: '一个抗原 = 很多个表位，这是多克隆抗体产生的基础。',
    ref: { moduleId: 'm2', label: '模块二 · 抗原表位', anchor: 'm2-epitope' },
    tags: ['表位'],
  },
  {
    id: 'pre-3',
    type: 'judge',
    stem: '只要给动物打了一种疫苗，就能预防所有传染病。',
    answer: false,
    explain:
      '错误。疫苗诱导的是针对特定表位的特异性免疫应答；不同病原（甚至同一病原的不同变异株）表位不同，抗体就“认不出”。这正是课件中抗原变异导致中和能力下降的原因。',
    summary: '“专病专防”的分子基础就是表位特异性。',
    ref: { moduleId: 'm2', label: '模块二 · 抗原变异', anchor: 'm2-variation' },
    tags: ['特异性'],
  },
  {
    id: 'pre-4',
    type: 'open',
    stem: '禽流感抗原快速检测试纸为什么能“测出”病毒？请用“抗原—抗体—表位”三个词写出你的猜想（1—2 句话）。',
    scenario: '某蛋鸡场现场用抗原快检试纸检测气管拭子，10 分钟读取结果。',
    explain:
      '开放题，不需与参考思路完全一致。核心是能说出：试纸上的抗体识别病毒表面的特定表位，形成“抗体—抗原—抗体”的夹心结构并显色，因此测的是病毒的抗原成分（多为核蛋白或表面糖蛋白），而不是病毒的致病性。',
    guidance: [
      '试纸上固定了针对病毒某一表位的抗体（捕获抗体）。',
      '样品中的病毒颗粒带有该表位，被捕获抗体抓住（抗原—抗体特异性结合 = 反应原性）。',
      '再用带显色标记的第二抗体结合同一病毒颗粒的另一表位，形成“夹心”，出现条带。',
      '推论：表位变了（抗原变异），试纸可能测不出——这就是快检的“脱靶”风险。',
    ],
    minLength: 12,
    ref: { moduleId: 'm1', label: '模块一 · 两大特性', anchor: 'm1-props' },
    tags: ['应用', '情境'],
  },
]

/** 模块随堂小测（10 题） */
const moduleQuestions: Question[] = [
  {
    id: 'm1-q1',
    type: 'single',
    stem: '课件对抗原的定义中，最能体现“特异性”这一限定的是：',
    options: [
      { key: 'A', text: '能刺激机体免疫系统启动特异性免疫应答' },
      { key: 'B', text: '能产生一系列生物学效应' },
      { key: 'C', text: '是一种物质' },
      { key: 'D', text: '能在体外保存' },
    ],
    answer: 'A',
    explain:
      '选 A。定义中的“特异性”强调的是针对该分子的、有针对性的应答，而不是笼统的炎症或异物反应。B 是结果，C 是属性，D 与定义无关。',
    ref: { moduleId: 'm1', label: '模块一 · 抗原的定义', anchor: 'm1-def' },
    tags: ['概念'],
  },
  {
    id: 'm1-q2',
    type: 'single',
    stem: '某疫苗免疫鸡群后，鸡群产生了针对 H9 亚型禽流感病毒的血凝抑制抗体。这一现象主要体现抗原的：',
    options: [
      { key: 'A', text: '反应原性' },
      { key: 'B', text: '免疫原性' },
      { key: 'C', text: '毒性' },
      { key: 'D', text: '变应原性' },
    ],
    answer: 'B',
    explain:
      '选 B。疫苗诱导机体“产生”抗体与效应细胞，考的是免疫原性（把免疫系统叫醒）。若描述的是“已知抗体与抗原结合出现凝集/沉淀/显色”，才是反应原性。',
    summary: '产生应答 = 免疫原性；被已产生的抗体抓住 = 反应原性。',
    ref: { moduleId: 'm1', label: '模块一 · 两大特性', anchor: 'm1-props' },
    tags: ['特性'],
  },
  {
    id: 'm1-q3',
    type: 'multi',
    stem: '（补充知识）下列因素中，通常会影响一种物质免疫原性强弱的有：',
    options: [
      { key: 'A', text: '异物性：与机体自身成分的差异程度' },
      { key: 'B', text: '分子大小与结构复杂度' },
      { key: 'C', text: '是否含有金属离子' },
      { key: 'D', text: '宿主的遗传背景与免疫状态' },
      { key: 'E', text: '进入途径与是否使用佐剂' },
    ],
    answer: ['A', 'B', 'D', 'E'],
    explain:
      '选 A、B、D、E。异物性、分子量与结构复杂度、宿主状态、进入途径与佐剂都是通用影响因素；“是否含金属离子”不是普遍因素，因此 C 不选。本题为标注的补充知识，不属于课件原文。',
    supplement: JANEWAY,
    ref: { moduleId: 'm1', label: '模块一 · 影响免疫原性的因素', anchor: 'm1-props' },
    tags: ['补充'],
  },
  {
    id: 'm2-q1',
    type: 'single',
    stem: '抗体与抗原结合时，真正被“认出来”的是：',
    options: [
      { key: 'A', text: '整个抗原分子的全部表面' },
      { key: 'B', text: '抗原分子上的表位（抗原决定簇）' },
      { key: 'C', text: '抗原分子内部的核酸序列' },
      { key: 'D', text: '抗原分子的分子量大小' },
    ],
    answer: 'B',
    explain:
      '选 B。课件明确：抗原通过其表位（抗原决定簇）发挥免疫原性和反应原性；表位是抗原特异性的结构基础。抗体结合的是抗原表面一小片具有特定构象/化学性质的结构。',
    ref: { moduleId: 'm2', label: '模块二 · 抗原表位', anchor: 'm2-epitope' },
    tags: ['表位'],
  },
  {
    id: 'm2-q2',
    type: 'single',
    stem: '课件提到，H3N2 关键抗原位点出现多个氨基酸替换后，疫苗接种者血清对该变异株的中和能力下降。其直接机制是：',
    options: [
      { key: 'A', text: '病毒基因组变小，复制变慢' },
      { key: 'B', text: '表位结构改变，原有抗体不能再有效识别与结合' },
      { key: 'C', text: '疫苗中的抗原含量在保存过程中自然升高' },
      { key: 'D', text: '机体突然失去了所有 B 细胞' },
    ],
    answer: 'B',
    explain:
      '选 B。氨基酸替换改变了表位的空间构象或化学性质，原有抗体“扣不上”原来的表位，中和能力随之下降。这同时说明抗原的两条特性都可以被改变：表位变了，与新抗体的结合也可能变了。',
    summary: '抗原变异 = 表位改变 = 旧抗体失效。',
    ref: { moduleId: 'm2', label: '模块二 · 抗原变异', anchor: 'm2-variation' },
    tags: ['变异'],
  },
  {
    id: 'm2-q3',
    type: 'single',
    stem: '关于 T 细胞受体（TCR）识别表位，符合课件表述的是：',
    options: [
      { key: 'A', text: '直接识别天然蛋白表面的构象表位' },
      { key: 'B', text: '识别由 MHC 分子递呈的线性表位（肽段）' },
      { key: 'C', text: '与 BCR 的识别范围完全相同' },
      { key: 'D', text: '不需要抗原递呈细胞参与' },
    ],
    answer: 'B',
    explain:
      '选 B。课件指出：TCR 识别由 MHC 分子递呈的线性表位；而 BCR 可识别抗原的构象性和线性表位。因此 T 细胞依赖抗原递呈与加工，B 细胞可直接结合天然抗原。',
    ref: { moduleId: 'm2', label: '模块二 · 表位类型', anchor: 'm2-types' },
    tags: ['难点'],
  },
  {
    id: 'm2-q4',
    type: 'judge',
    stem: '把抗原加热变性后，其线性表位通常仍可被识别，而构象表位往往消失。',
    answer: true,
    explain:
      '正确。线性表位由连续排列的氨基酸残基组成，变性后肽链展开仍保留；构象表位依赖空间折叠，变性后构象被破坏而丢失。这也是 Western blot（变性）常丢失构象表位、而免疫沉淀（非变性）可能保留的原因。',
    ref: { moduleId: 'm2', label: '模块二 · 表位类型', anchor: 'm2-types' },
    tags: ['难点'],
  },
  {
    id: 'm3-q1',
    type: 'single',
    stem: '课件将细菌与病毒称为“完整抗原”，含义是：',
    options: [
      { key: 'A', text: '它们同时具有免疫原性与反应原性' },
      { key: 'B', text: '它们只具有反应原性' },
      { key: 'C', text: '它们的抗原成分单一' },
      { key: 'D', text: '它们不能诱导免疫记忆' },
    ],
    answer: 'A',
    explain:
      '选 A。完全抗原同时具备免疫原性与反应原性，细菌、病毒属于此类。它们的抗原成分并不单一，恰恰相反，是成百上千种表位的复合体。',
    ref: { moduleId: 'm3', label: '模块三 · 病原微生物抗原', anchor: 'm3-pathogen' },
    tags: ['重点'],
  },
  {
    id: 'm3-q2',
    type: 'multi',
    stem: '关于细菌与病毒的结构成分抗原，下列对应正确的有：',
    options: [
      { key: 'A', text: 'H 抗原 —— 鞭毛抗原' },
      { key: 'B', text: 'O 抗原 —— 菌体抗原' },
      { key: 'C', text: '革兰阳性菌磷壁酸 —— 细胞壁抗原成分' },
      { key: 'D', text: '包膜糖蛋白 —— 有囊膜病毒的表面抗原，常为中和抗体靶点' },
      { key: 'E', text: '核酸抗原 —— 只存在于细菌，病毒没有' },
    ],
    answer: ['A', 'B', 'C', 'D'],
    explain:
      '选 A、B、C、D。H = 鞭毛、O = 菌体、荚膜与菌毛各自成组，革兰阳性菌磷壁酸也是抗原成分；病毒方面衣壳蛋白、包膜糖蛋白、核酸抗原均可作为抗原成分。因此 E 错——病毒同样存在核酸抗原。',
    ref: { moduleId: 'm3', label: '模块三 · 结构成分抗原', anchor: 'm3-structure' },
    tags: ['重点'],
  },
  {
    id: 'm3-q3',
    type: 'ordering',
    stem: '按课件示例，把“流感病毒 HA 蛋白基因工程抗原”的制备流程排成正确顺序：',
    items: [
      { id: 's1', text: 'HA 蛋白抗原基因设计与克隆', hint: '先有基因' },
      { id: 's2', text: '构建重组表达载体', hint: '把基因装进载体' },
      { id: 's3', text: '导入 CHO 细胞', hint: '真核表达系统' },
      { id: 's4', text: '抗原蛋白表达与纯化', hint: '收获并纯化蛋白' },
      { id: 's5', text: '质量检测 + 佐剂', hint: '检定抗原，配伍佐剂' },
    ],
    explain:
      '正确顺序：基因设计与克隆 → 构建重组表达载体 → 导入 CHO 细胞 → 抗原蛋白表达与纯化 → 质量检测 + 佐剂。最后一步的“质检”检的是抗原本身的含量、纯度与完整性；加佐剂是为了增强纯化抗原的免疫原性。',
    summary: '基因 → 载体 → 细胞 → 蛋白 → 质检/佐剂。',
    ref: { moduleId: 'm3', label: '模块三 · 基因工程抗原', anchor: 'm3-recombinant' },
    tags: ['重点'],
  },
]

/** 课堂互动 · 快速判断（3 题） */
const classroomQuickQuestions: Question[] = [
  {
    id: 'cl-q1',
    type: 'single',
    stem: '某分离菌株的“O 抗原”指的是：',
    options: [
      { key: 'A', text: '鞭毛抗原' },
      { key: 'B', text: '菌体抗原' },
      { key: 'C', text: '荚膜抗原' },
      { key: 'D', text: '菌毛抗原' },
    ],
    answer: 'B',
    explain: 'O 抗原为菌体抗原（主要与细胞壁成分相关）；H 抗原才是鞭毛抗原。',
    ref: { moduleId: 'm3', label: '模块三 · 结构成分抗原', anchor: 'm3-structure' },
    tags: ['课堂抢答'],
  },
  {
    id: 'cl-q2',
    type: 'multi',
    stem: '下列属于病毒抗原成分的有：',
    options: [
      { key: 'A', text: '衣壳蛋白' },
      { key: 'B', text: '包膜糖蛋白' },
      { key: 'C', text: '核酸抗原' },
      { key: 'D', text: '鞭毛抗原' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C。病毒抗原包括衣壳蛋白、包膜糖蛋白、核酸抗原等；鞭毛抗原是细菌（有鞭毛者）的结构成分，病毒没有鞭毛。',
    ref: { moduleId: 'm3', label: '模块三 · 结构成分抗原', anchor: 'm3-structure' },
    tags: ['课堂抢答'],
  },
  {
    id: 'cl-t2',
    type: 'sorting',
    stem: '把下列 6 条描述分别归入“线性表位 / 构象表位”两栏：',
    scenario: '课堂上给你 6 张描述卡，请判断它们各自描述的是哪一类表位。',
    buckets: [
      { id: 'lin', label: '线性表位', hint: '连续氨基酸 · 耐变性' },
      { id: 'con', label: '构象表位', hint: '空间折叠 · 怕变性' },
    ],
    items: [
      { id: 'c1', text: '由连续排列的氨基酸残基组成的短肽', bucket: 'lin' },
      { id: 'c2', text: '序列上不连续、靠空间折叠彼此靠近', bucket: 'con' },
      { id: 'c3', text: '加热变性后仍能被抗体识别', bucket: 'lin' },
      { id: 'c4', text: '蛋白折叠被破坏后随之消失', bucket: 'con' },
      { id: 'c5', text: 'TCR 通过 MHC 递呈识别到的就是这一类', bucket: 'lin' },
      { id: 'c6', text: '抗体识别天然病毒表面时主要针对这一类', bucket: 'con' },
    ],
    explain:
      'c1/c3/c5 → 线性表位（连续、耐变性、T 细胞看到的形式）；c2/c4/c6 → 构象表位（依赖空间折叠、变性即消失、抗体识别天然抗原时的主要目标）。把这两栏分清，就理解了“为什么灭活/变性可能让疫苗失效”。',
    summary: '线性表位讲“序列”，构象表位讲“形状”。',
    ref: { moduleId: 'm2', label: '模块二 · 表位类型', anchor: 'm2-types' },
    tags: ['课堂任务'],
  },
  {
    id: 'cl-t3',
    type: 'ordering',
    stem: '把“抗原 → T 细胞活化”的过程排成正确顺序（6 步）：',
    scenario: '小组讨论后派代表上台，把 6 张步骤卡按顺序排好。',
    items: [
      { id: 'k1', text: '抗原进入机体，被 APC 接触' },
      { id: 'k2', text: 'APC 摄取抗原' },
      { id: 'k3', text: '抗原在细胞内被加工为肽段' },
      { id: 'k4', text: '肽段与 MHC 结合并递呈到细胞表面' },
      { id: 'k5', text: 'TCR 识别 MHC—肽段复合物' },
      { id: 'k6', text: 'T 细胞活化、分化为效应 T 细胞' },
    ],
    explain:
      '正确顺序：接触 → 摄取 → 加工 → MHC 递呈 → TCR 识别 → 活化。最容易错的是把“TCR 识别”放在“MHC 递呈”之前——T 细胞必须等抗原被加工并递呈后才能“看到”它。',
    summary: 'T 细胞看到的是“加工后的肽段 + MHC”，不是完整抗原。',
    ref: { moduleId: 'm2', label: '模块二 · 表位类型', anchor: 'm2-types' },
    tags: ['课堂任务'],
  },
  {
    id: 'cl-t6',
    type: 'multi',
    stem: '某场 H9 亚型禽流感免疫后抗体水平偏低，下列处置思路中合理的有：',
    scenario:
      '你是场里的技术顾问。场方希望“马上换一种更贵的疫苗”。请先判断哪些思路有依据，再决定怎么做。',
    options: [
      { key: 'A', text: '核查疫苗抗原含量检定记录与冷链运输、保存条件' },
      { key: 'B', text: '比较流行株与疫苗株关键抗原位点是否出现氨基酸替换' },
      { key: 'C', text: '用交叉血凝抑制试验评估抗体与当前流行株的匹配度' },
      { key: 'D', text: '只要换成“更贵”的疫苗就一定能解决问题' },
      { key: 'E', text: '复核免疫程序（日龄、剂量、接种途径、是否使用佐剂）' },
    ],
    answer: ['A', 'B', 'C', 'E'],
    explain:
      '选 A、B、C、E。抗体水平偏低的原因至少有三类：抗原本身（含量/完整性）、抗原匹配性（表位变异）、免疫实施（程序/途径/佐剂）。D 把“价格”当作“有效性”的依据，不符合科学判断。',
    summary: '先分因，再决策：抗原质量 → 抗原匹配 → 免疫实施。',
    ref: { moduleId: 'm2', label: '模块二 · 抗原变异', anchor: 'm2-variation' },
    tags: ['课堂任务'],
  },
  {
    id: 'cl-q3',
    type: 'judge',
    stem: '人工智能可以整合抗原的结构与序列信息，用于抗原的立体化展示和部分区域（如表位）预测。',
    answer: true,
    explain:
      '正确。这正是课件第 17 页的表述。需要注意：预测结果仍需实验验证（如中和试验、表位定位实验），不能直接等同于结论。',
    ref: { moduleId: 'm3', label: '模块三 · AI 结构解析', anchor: 'm3-ai' },
    tags: ['课堂抢答'],
  },
]

/** 课后作业：基础 / 提升 / 拓展 */
const homeworkQuestions: Question[] = [
  {
    id: 'hw-b1',
    type: 'single',
    stem: '（基础）下列关于抗原两大特性的表述，正确的是：',
    options: [
      { key: 'A', text: '免疫原性指与抗体结合的能力' },
      { key: 'B', text: '反应原性指刺激机体产生免疫应答的能力' },
      { key: 'C', text: '免疫原性指刺激机体产生免疫应答，反应原性指与免疫应答产物特异性结合' },
      { key: 'D', text: '两大特性在任何物质上都必须同时存在，否则不能称为抗原' },
    ],
    answer: 'C',
    explain:
      '选 C。A、B 两项把两个概念互换了。D 错：半抗原只有反应原性、单独没有免疫原性，但它依然被称为（不完全）抗原。',
    ref: { moduleId: 'm1', label: '模块一 · 两大特性', anchor: 'm1-props' },
  },
  {
    id: 'hw-b2',
    type: 'judge',
    stem: '（基础）病毒的核酸不能作为抗原成分，只有蛋白才能。',
    answer: false,
    explain:
      '错误。课件将病毒抗原分为衣壳蛋白、包膜糖蛋白、核酸抗原等，核酸抗原同样是抗原成分之一，可作为检测靶标（如核酸相关抗原检测思路）。',
    ref: { moduleId: 'm3', label: '模块三 · 结构成分抗原', anchor: 'm3-structure' },
  },
  {
    id: 'hw-b3',
    type: 'multi',
    stem: '（基础）下列关于表位与识别的说法，正确的有：',
    options: [
      { key: 'A', text: '同一抗原分子可具有多种、多个表位' },
      { key: 'B', text: '线性表位由连续排列的氨基酸残基组成' },
      { key: 'C', text: '构象表位在变性后通常消失' },
      { key: 'D', text: 'BCR 只能识别线性表位' },
    ],
    answer: ['A', 'B', 'C'],
    explain: '选 A、B、C。D 错：BCR 既可直接识别构象表位，也可识别线性表位。',
    ref: { moduleId: 'm2', label: '模块二 · 表位类型', anchor: 'm2-types' },
  },
  {
    id: 'hw-b4',
    type: 'sorting',
    stem: '（基础）把下列结构归入对应的病原类型：',
    buckets: [
      { id: 'b', label: '细菌结构成分抗原', hint: '鞭毛、菌体、荚膜、菌毛、磷壁酸' },
      { id: 'v', label: '病毒抗原成分', hint: '衣壳、包膜糖蛋白、核酸' },
    ],
    items: [
      { id: 'i1', text: 'H 抗原（鞭毛）', bucket: 'b' },
      { id: 'i2', text: 'O 抗原（菌体）', bucket: 'b' },
      { id: 'i3', text: '革兰阳性菌磷壁酸', bucket: 'b' },
      { id: 'i4', text: '衣壳蛋白', bucket: 'v' },
      { id: 'i5', text: '包膜糖蛋白', bucket: 'v' },
      { id: 'i6', text: '核酸抗原', bucket: 'v' },
    ],
    explain:
      '细菌侧重“零件”（H/O/荚膜/菌毛/磷壁酸），病毒侧重“外壳与核酸”（衣壳蛋白/包膜糖蛋白/核酸抗原）。归类错误的同学请回看模块三 3.2 的结构解剖图。',
    ref: { moduleId: 'm3', label: '模块三 · 结构成分抗原', anchor: 'm3-structure' },
  },
  {
    id: 'hw-a1',
    type: 'open',
    stem:
      '（提升）某鸡场按原免疫程序接种 H9 亚型禽流感疫苗，但新分离株的 HI 抗体效价明显偏低。请用“表位—抗原变异”写出你的分析思路（≥ 3 个要点）。',
    explain:
      '评分要点见参考思路。要求体现：表位改变 → 抗体识别下降 → 中和/抑制能力下降；并区分“疫苗质量问题（抗原含量不足）”与“抗原匹配问题（表位变异）”两种可能，提出对应验证手段。',
    guidance: [
      '先确认不是疫苗本身的问题：核查抗原含量检定记录、保存与运输冷链。',
      '再从抗原匹配性分析：新分离株关键位点是否出现氨基酸替换，导致原有表位改变。',
      '用交叉 HI 试验比较同源株与异源株的抗体效价差异，量化“匹配度”。',
      '结论层面：若为抗原变异，考虑更新疫苗株或采用覆盖更广表位的抗原设计。',
    ],
    minLength: 60,
    ref: { moduleId: 'm2', label: '模块二 · 抗原变异', anchor: 'm2-variation' },
  },
  {
    id: 'hw-a2',
    type: 'sorting',
    stem: '（提升）判断下列描述各自属于哪种识别/表位类型：',
    buckets: [
      { id: 'lin', label: '线性表位', hint: '连续氨基酸，耐变性' },
      { id: 'con', label: '构象表位', hint: '空间折叠形成，怕变性' },
      { id: 'tcr', label: 'TCR（需 MHC 递呈）', hint: '看到的是“加工后的肽段”' },
    ],
    items: [
      { id: 'j1', text: '由连续排列的氨基酸残基组成的短肽', bucket: 'lin' },
      { id: 'j2', text: '序列上不连续、空间上靠近的残基形成的结构', bucket: 'con' },
      { id: 'j3', text: '抗原经 APC 摄取加工后，与 MHC 分子一起被识别', bucket: 'tcr' },
      { id: 'j4', text: '加热变性后仍可被抗体识别', bucket: 'lin' },
      { id: 'j5', text: '蛋白正确折叠被破坏后随之消失', bucket: 'con' },
    ],
    explain:
      'j1/j4 → 线性表位；j2/j5 → 构象表位；j3 → TCR 的识别方式。理解这三栏的差别，就理解了“为什么 T 细胞必须先经过抗原递呈”。',
    ref: { moduleId: 'm2', label: '模块二 · 表位类型', anchor: 'm2-types' },
  },
  {
    id: 'hw-a3',
    type: 'ordering',
    stem: '（提升）把“抗原被 T 细胞识别并启动应答”的过程排成正确顺序：',
    items: [
      { id: 't1', text: '抗原被抗原递呈细胞（APC）摄取' },
      { id: 't2', text: '在细胞内被加工处理为肽段' },
      { id: 't3', text: '肽段与 MHC 分子结合并递呈到细胞表面' },
      { id: 't4', text: 'TCR 识别“MHC—肽段”复合物' },
      { id: 't5', text: 'T 细胞活化，分化为效应细胞' },
    ],
    explain:
      '正确顺序：摄取 → 加工 → MHC 递呈 → TCR 识别 → 活化。关键在“T 细胞看不到完整抗原，只能看到被 MHC 递呈的肽段”，这正是线性表位对 T 细胞尤为重要的原因。',
    ref: { moduleId: 'm2', label: '模块二 · 表位类型', anchor: 'm2-types' },
  },
  {
    id: 'hw-e1',
    type: 'open',
    stem:
      '（拓展）某新型动物病毒已完成基因组测序，但难以体外培养。请设计一条抗原制备路线用于诊断试剂开发，并说明你如何保证“表位完整性”（≥ 4 个要点）。',
    explain:
      '开放题，按“路线合理性 + 表位意识 + 质控意识”三方面评价，参考思路见下。',
    guidance: [
      '选靶：从序列中筛选表面暴露、保守性好的区域（可借助 AI 结构预测与表位预测）。',
      '表达系统：若表位依赖糖基化或正确折叠，优先真核系统（如 CHO/杆状病毒系统）；否则可用原核系统降低成本。',
      '构建设计：加标签便于纯化与检测，注意标签不应遮挡关键表位。',
      '表位完整性验证：用已知阳性血清做 ELISA/Western blot，比较变性与非变性条件下的反应性，间接判断构象表位是否保留。',
      '质控：纯度、含量、批间一致性；诊断试剂还需评估与近缘病原的交叉反应。',
    ],
    minLength: 100,
    ref: { moduleId: 'm3', label: '模块三 · 基因工程抗原', anchor: 'm3-recombinant' },
  },
  {
    id: 'hw-e2',
    type: 'open',
    stem:
      '（拓展）结合“翻译后修饰改变 MHC 呈递肽库”这一进展，谈谈它对重组抗原疫苗设计的一点启示（≥ 2 个要点，注明你的依据来源）。',
    explain:
      '开放题。评价重点是能否把“修饰—加工—呈递—识别”这条链条用上，并自觉区分“课件结论”与“自己的推断”。',
    guidance: [
      '启示一：表达系统选择会影响修饰谱，进而影响能被呈递的肽库，不能只看“蛋白表达量”。',
      '启示二：同一抗原在不同宿主系统表达，可能诱导不同质量的 T 细胞应答，需在设计中评估。',
      '依据来源需注明（课件研究进展页 / 你查阅的综述），并说明哪部分是推断。',
    ],
    minLength: 80,
    ref: { moduleId: 'm2', label: '模块二 · 翻译后修饰', anchor: 'm2-ptm' },
  },
]

/** 学习评价 · 课后测验（与前测对照） */
const postTestQuestions: Question[] = [
  {
    id: 'as-1',
    type: 'single',
    stem: '抗原定义中的“与相应免疫应答产物发生特异性结合”，对应的特性是：',
    options: [
      { key: 'A', text: '免疫原性' },
      { key: 'B', text: '反应原性' },
      { key: 'C', text: '异物性' },
      { key: 'D', text: '佐剂性' },
    ],
    answer: 'B',
    explain: '反应原性 = 与抗体/致敏淋巴细胞等应答产物特异性结合的能力。',
    ref: { moduleId: 'm1', label: '模块一 · 两大特性', anchor: 'm1-props' },
  },
  {
    id: 'as-2',
    type: 'judge',
    stem: '同一抗原分子上可以有多种、多个表位，因此可诱导产生多种不同特异性的抗体。',
    answer: true,
    explain: '正确。这是多克隆抗血清的产生基础，也是“抗原成分复杂”的含义之一。',
    ref: { moduleId: 'm2', label: '模块二 · 抗原表位', anchor: 'm2-epitope' },
  },
  {
    id: 'as-3',
    type: 'single',
    stem: '下列哪一项最可能使原有疫苗的中和能力下降？',
    options: [
      { key: 'A', text: '病毒关键抗原位点发生多个氨基酸替换' },
      { key: 'B', text: '疫苗瓶贴签颜色改变' },
      { key: 'C', text: '免疫动物日龄增加 1 天' },
      { key: 'D', text: '检测实验室更换了移液器' },
    ],
    answer: 'A',
    explain: '表位改变 → 旧抗体识别下降 → 中和能力下降，对应课件中的抗原变异案例。',
    ref: { moduleId: 'm2', label: '模块二 · 抗原变异', anchor: 'm2-variation' },
  },
  {
    id: 'as-4',
    type: 'multi',
    stem: '关于基因工程抗原，符合课件表述的有：',
    options: [
      { key: 'A', text: '可克隆特定蛋白基因并批量生产纯度较高的蛋白' },
      { key: 'B', text: '可生产天然来源难以大量获取的蛋白' },
      { key: 'C', text: '可给特定蛋白添加标签' },
      { key: 'D', text: '表达完成后不再需要质量检测' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C。课件明确基因工程抗原可克隆、批量生产、纯度高、可加标签；而流程最后一步恰恰是“质量检测 + 佐剂”，因此 D 错。',
    ref: { moduleId: 'm3', label: '模块三 · 基因工程抗原', anchor: 'm3-recombinant' },
  },
  {
    id: 'as-5',
    type: 'single',
    stem: '感染病毒后，T 细胞能够识别的抗原形式是：',
    options: [
      { key: 'A', text: '完整的天然病毒颗粒表面' },
      { key: 'B', text: '由 MHC 分子递呈的线性表位肽段' },
      { key: 'C', text: '游离的病毒核酸' },
      { key: 'D', text: '病毒包膜上的完整糖蛋白' },
    ],
    answer: 'B',
    explain:
      'TCR 识别由 MHC 递呈的线性表位；完整颗粒与天然构象表位主要由 BCR/抗体识别。',
    ref: { moduleId: 'm2', label: '模块二 · 表位类型', anchor: 'm2-types' },
  },
]

export const questionBank: Record<string, Question> = Object.fromEntries(
  [
    ...preClassQuestions,
    ...moduleQuestions,
    ...classroomQuickQuestions,
    ...homeworkQuestions,
    ...postTestQuestions,
  ].map((q) => [q.id, q]),
)

export const questionGroups = {
  preClass: preClassQuestions,
  module: moduleQuestions,
  classroom: classroomQuickQuestions,
  homework: homeworkQuestions,
  postTest: postTestQuestions,
}
