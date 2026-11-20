import type { Question } from '../types'

/* ------------------------------- 课前预习（4 题）------------------------------- */

const preClassQuestions: Question[] = [
  {
    id: 'c03-pre1',
    type: 'single',
    stem: '按课件表述，抗体的基本结构是：',
    options: [
      { key: 'A', text: '一条肽链盘曲成的球状分子' },
      { key: 'B', text: '两条相同重链和两条相同轻链通过二硫键连接的 4 肽链分子，呈“Y”字型' },
      { key: 'C', text: '由轻链单独构成的二聚体' },
      { key: 'D', text: '由多糖链构成的分支结构' },
    ],
    answer: 'B',
    explain:
      '选 B。课件原文：抗体由两条相同重链和两条相同轻链通过二硫键连接而成 4 肽链分子，呈“Y”字型。',
    ref: { moduleId: 'm1', label: '模块一 · 基本结构', anchor: 'm1-basic' },
    tags: ['概念'],
  },
  {
    id: 'c03-pre2',
    type: 'judge',
    stem: '抗体的可变区（V 区）位于重链和轻链靠近 N 端约 110 个氨基酸处。',
    answer: true,
    explain:
      '正确。课件原文：重链和轻链靠近 N 端约 110 个氨基酸为可变区（V 区），其他部分氨基酸序列为恒定区（C 区）。',
    ref: { moduleId: 'm1', label: '模块一 · V 区与 C 区', anchor: 'm1-basic' },
    tags: ['结构'],
  },
  {
    id: 'c03-pre3',
    type: 'multi',
    stem: '关于抗体的生物学功能，课件列出的有：',
    options: [
      { key: 'A', text: '中和作用' },
      { key: 'B', text: '调理作用' },
      { key: 'C', text: '激活补体' },
      { key: 'D', text: 'ADCC' },
      { key: 'E', text: '直接吞噬病原体' },
    ],
    answer: ['A', 'B', 'C', 'D'],
    explain:
      '选 A、B、C、D。课件总结页列出的功能包括中和作用、调理作用、激活补体、ADCC、黏膜免疫、免疫损伤。E 错：吞噬是由吞噬细胞完成的，抗体通过调理作用“促进”吞噬，而不是自己吞噬。',
    summary: '抗体负责“标记与招募”，吞与杀由细胞和补体完成。',
    ref: { moduleId: 'm2', label: '模块二 · 生物学功能', anchor: 'm2-opsonin' },
    tags: ['功能'],
  },
  {
    id: 'c03-pre4',
    type: 'open',
    stem: '同一类分子（抗体），既能做治疗用的抗蛇毒血清，也能做检测用的试纸条。请写出你的猜想：是什么结构特点让它“一物多用”？（1—2 句话）',
    scenario: '急诊室里的抗蛇毒血清与实验室里的检测试纸条，核心成分都是抗体。',
    explain:
      '开放题。核心是能指出：抗体兼具“特异性识别（V 区）”与“可被检测/可招募效应（C 区及标记）”两种属性，因此既能结合靶标、也能作为识别元件被读出信号。',
    guidance: [
      'V 区提供高度特异的识别能力——这是“能抓准目标”的基础，治疗与检测都需要。',
      'C 区（Fc）提供效应功能与可被其他分子识别的位点——治疗时可招募补体或细胞。',
      '做检测时，抗体可以被酶、胶体金、量子点等标记，把“结合事件”转成“可读信号”。',
      '因此同一分子在治疗里是“药”，在检测里是“探针”。',
    ],
    minLength: 12,
    ref: { moduleId: 'm1', label: '模块一 · V 区与 C 区', anchor: 'm1-basic' },
    tags: ['应用', '情境'],
  },
]

/* ------------------------- 模块随堂 + 课堂互动题目 ------------------------- */

const moduleQuestions: Question[] = [
  {
    id: 'c03-q2',
    type: 'single',
    stem: '决定抗体“识别什么抗原”的结构部位是：',
    options: [
      { key: 'A', text: '重链恒定区' },
      { key: 'B', text: '轻链恒定区' },
      { key: 'C', text: '可变区（V 区）' },
      { key: 'D', text: 'Fc 段' },
    ],
    answer: 'C',
    explain:
      '选 C。V 区（重链和轻链靠近 N 端约 110 个氨基酸）序列变化大，与抗原表位互补结合，决定特异性。C 区与 Fc 段承担效应功能，不决定“认谁”。',
    summary: 'V 区管识别，C 区管效应。',
    ref: { moduleId: 'm1', label: '模块一 · V 区与 C 区', anchor: 'm1-basic' },
    tags: ['结构'],
  },
  {
    id: 'c03-q3',
    type: 'multi',
    stem: '关于 J 链与分泌片，说法正确的有：',
    options: [
      { key: 'A', text: 'J 链由浆细胞合成，能把 Ig 单体连接为二聚体或多聚体' },
      { key: 'B', text: 'J 链与抗体的体内运转有关' },
      { key: 'C', text: '分泌片由黏膜上皮细胞合成和分泌' },
      { key: 'D', text: '分泌片以非共价形式结合到二聚体上，形成 sIgA，能抵抗蛋白水解酶消化' },
      { key: 'E', text: '分泌片是抗体的重链组成部分' },
    ],
    answer: ['A', 'B', 'C', 'D'],
    explain:
      '选 A、B、C、D。E 错：分泌片是独立的辅助成分（由黏膜上皮细胞产生），不是抗体重链的一部分；它以非共价形式结合在二聚体上。',
    ref: { moduleId: 'm1', label: '模块一 · 辅助结构', anchor: 'm1-aux' },
    tags: ['结构'],
  },
  {
    id: 'c03-q4',
    type: 'single',
    stem: 'IgG 经木瓜蛋白酶水解，产物是：',
    options: [
      { key: 'A', text: '1 个 F(ab′)₂ + Fc 降解' },
      { key: 'B', text: '2 个 Fab + 1 个 Fc' },
      { key: 'C', text: '2 个 Fc + 1 个 Fab' },
      { key: 'D', text: '4 条游离单链' },
    ],
    answer: 'B',
    explain:
      '选 B。课件原文：IgG 经木瓜蛋白酶水解，产生两个单独结合抗原的 Fab 片段和一个 Fc 片段。胃蛋白酶才产生 1 个 F(ab′)₂ 并使 Fc 降解（A 是胃蛋白酶的结果）。',
    ref: { moduleId: 'm1', label: '模块一 · 水解片段', anchor: 'm1-hydrolysis' },
    tags: ['难点'],
  },
  {
    id: 'c03-q5',
    type: 'single',
    stem: '抗蛇毒血清主要含 F(ab′)₂ 片段，其优势在于：',
    options: [
      { key: 'A', text: '保留了 2 个抗原结合位点，同时去掉了大部分 Fc' },
      { key: 'B', text: '完全不含抗体结构，只是解毒药物' },
      { key: 'C', text: '含有完整的 Fc 段，因此效应功能更强' },
      { key: 'D', text: '只保留 1 个抗原结合位点，因此更安全' },
    ],
    answer: 'A',
    explain:
      '选 A。胃蛋白酶水解产生保留两个抗原结合位点的 F(ab′)₂，Fc 区降解——既保留双价结合能力，又减少异种 Fc 可能带来的反应。C 与课件“Fc 区降解”矛盾；D 描述的是 Fab 的特点。',
    ref: { moduleId: 'm1', label: '模块一 · 水解片段', anchor: 'm1-hydrolysis' },
    tags: ['难点'],
  },
  {
    id: 'c03-q6',
    type: 'single',
    stem: '抗体的中和作用主要通过哪个部位实现？',
    options: [
      { key: 'A', text: 'Fc 段' },
      { key: 'B', text: '可变区' },
      { key: 'C', text: '恒定区' },
      { key: 'D', text: 'J 链' },
    ],
    answer: 'B',
    explain:
      '选 B。课件原文：抗体通过可变区特异性结合病毒或毒素，阻断其与宿主靶标的相互作用。Fc 与恒定区主要参与调理、ADCC、CDC 等效应功能。',
    ref: { moduleId: 'm2', label: '模块二 · 中和作用', anchor: 'm2-neutral' },
    tags: ['功能'],
  },
  {
    id: 'c03-q7',
    type: 'single',
    stem: '抗体调理作用的关键机制是：',
    options: [
      { key: 'A', text: '抗体直接裂解细菌细胞壁' },
      { key: 'B', text: '抗体 Fc 段与吞噬细胞表面受体结合，活化吞噬细胞促进吞噬' },
      { key: 'C', text: '抗体激活 NK 细胞释放穿孔素' },
      { key: 'D', text: '抗体与补体 C1q 结合形成 MAC' },
    ],
    answer: 'B',
    explain:
      '选 B。课件原文：抗体与抗原形成复合物后，通过抗体 Fc 功能区与吞噬细胞表面受体结合，活化吞噬细胞并促进其吞噬。A 不是抗体的作用；C 是 ADCC；D 是 CDC。',
    summary: '调理：Fab 抓病原、Fc 抓吞噬细胞——抗体是“桥梁”。',
    ref: { moduleId: 'm2', label: '模块二 · 调理作用', anchor: 'm2-opsonin' },
    tags: ['功能'],
  },
  {
    id: 'c03-q8',
    type: 'single',
    stem: 'ADCC 中发挥细胞毒作用的执行细胞是：',
    options: [
      { key: 'A', text: '中性粒细胞' },
      { key: 'B', text: 'NK 细胞' },
      { key: 'C', text: '红细胞' },
      { key: 'D', text: '血小板' },
    ],
    answer: 'B',
    explain:
      '选 B。课件原文：NK 细胞表面具有抗体分子 Fc 片段的受体，借助 Fc 受体与抗体 Fc 片段结合，发挥细胞毒作用杀伤靶细胞。',
    ref: { moduleId: 'm2', label: '模块二 · ADCC', anchor: 'm2-adcc' },
    tags: ['难点'],
  },
  {
    id: 'c03-q9',
    type: 'multi',
    stem: '关于 CDC（补体依赖细胞毒性作用），符合课件表述的有：',
    options: [
      { key: 'A', text: '抗原抗体复合物结合补体 C1q 成分' },
      { key: 'B', text: '级联激活补体经典途径' },
      { key: 'C', text: '形成膜攻击复合物（MAC）杀伤靶细胞或细菌' },
      { key: 'D', text: 'CDC 可与 ADCC 联合杀伤靶细胞' },
      { key: 'E', text: '抗体本身即可直接杀死细菌，无需补体' },
    ],
    answer: ['A', 'B', 'C', 'D'],
    explain:
      '选 A、B、C、D。E 与课件要点相反：课件明确“抗体不能直接杀死细菌，MAC 可以”。这正是理解 CDC 的关键。',
    ref: { moduleId: 'm2', label: '模块二 · 激活补体', anchor: 'm2-cdc' },
    tags: ['难点'],
  },
  {
    id: 'c03-q10',
    type: 'judge',
    stem: 'IgE 介导 I 型超敏反应；IgG、IgM 介导 II 型或 III 型超敏反应。',
    answer: true,
    explain:
      '正确，这是课件关于“免疫损伤作用”的原文表述。抗体不只保护机体，也可能造成损伤——这一面将在第九章超敏反应中展开。',
    ref: { moduleId: 'm2', label: '模块二 · 免疫损伤', anchor: 'm2-damage' },
    tags: ['功能'],
  },
  {
    id: 'c03-q11',
    type: 'ordering',
    stem: '把抗蛇毒血清的制备路线排成正确顺序：',
    items: [
      { id: 'a1', text: '用蛇毒素免疫马匹' },
      { id: 'a2', text: '采集高效价血浆' },
      { id: 'a3', text: '酶解（如胃蛋白酶水解）' },
      { id: 'a4', text: '提取和纯化' },
      { id: 'a5', text: '得到主要含 F(ab′)₂ 片段的抗体制品' },
    ],
    explain:
      '正确顺序：免疫马匹 → 采血浆 → 酶解 → 提取纯化 → 得到 F(ab′)₂ 制品。酶解这一步使用胃蛋白酶，正是为了保留双价结合的 F(ab′)₂ 并降解除去 Fc。',
    ref: { moduleId: 'm3', label: '模块三 · 抗体制备', anchor: 'm3-antiserum' },
    tags: ['重点'],
  },
  {
    id: 'c03-q12',
    type: 'multi',
    stem: '关于卵黄抗体 IgY，符合课件表述的有：',
    options: [
      { key: 'A', text: '用目标病原抗原多次免疫产蛋母鸡，IgY 会富集到蛋黄中' },
      { key: 'B', text: '蛋黄中 IgY 浓度高、提取简单' },
      { key: 'C', text: '可经稀释、盐析、超滤与喷雾干燥制成粉剂' },
      { key: 'D', text: '可拌料口服用于仔猪腹泻与水产弧菌病，减少抗生素使用' },
      { key: 'E', text: 'IgY 必须注射使用，口服无效' },
    ],
    answer: ['A', 'B', 'C', 'D'],
    explain:
      '选 A、B、C、D。E 错：课件明确其应用方式是“拌料口服”，这正是 IgY 作为抗生素替代方案的优势所在。',
    ref: { moduleId: 'm3', label: '模块三 · 创新应用', anchor: 'm3-apps' },
    tags: ['重点'],
  },
]

/* ---------------------------- 课堂互动专项题 ---------------------------- */

const classroomQuestions: Question[] = [
  {
    id: 'c03-t2',
    type: 'sorting',
    stem: '把左侧的片段产物归入对应的蛋白酶作用：',
    scenario: '同一个 IgG，两种酶切出不同片段。请判断每种片段来自哪种酶。',
    buckets: [
      { id: 'papain', label: '木瓜蛋白酶水解产物', hint: '2 Fab + 1 Fc' },
      { id: 'pepsin', label: '胃蛋白酶水解产物', hint: '1 个 F(ab′)₂，Fc 降解' },
    ],
    items: [
      { id: 'h1', text: '两个 Fab 片段（各含 1 个抗原结合位点）', bucket: 'papain' },
      { id: 'h2', text: '一个 Fc 片段', bucket: 'papain' },
      { id: 'h3', text: '一个 F(ab′)₂ 片段（保留 2 个抗原结合位点）', bucket: 'pepsin' },
      { id: 'h4', text: 'Fc 区被降解', bucket: 'pepsin' },
    ],
    explain:
      'h1/h2 → 木瓜蛋白酶（2 Fab + 1 Fc）；h3/h4 → 胃蛋白酶（1 个 F(ab′)₂，Fc 降解）。抗蛇毒血清选择胃蛋白酶水解路线，正是为了得到保留双价结合的 F(ab′)₂。',
    ref: { moduleId: 'm1', label: '模块一 · 水解片段', anchor: 'm1-hydrolysis' },
    tags: ['课堂任务'],
  },
  {
    id: 'c03-t3',
    type: 'sorting',
    stem: '把下列描述归入抗体的对应生物学功能：',
    scenario: '6 张描述卡，判断各自对应哪一项功能。',
    buckets: [
      { id: 'neutral', label: '中和作用', hint: 'V 区阻断靶标结合' },
      { id: 'opsonin', label: '调理作用', hint: 'Fc 桥接吞噬细胞' },
      { id: 'adcc', label: 'ADCC', hint: 'NK 细胞执行' },
      { id: 'cdc', label: '激活补体 CDC', hint: 'C1q → MAC' },
    ],
    items: [
      { id: 'n1', text: '可变区结合病毒，阻断其与宿主受体结合', bucket: 'neutral' },
      { id: 'n2', text: 'Fc 与吞噬细胞表面受体结合，促进吞噬', bucket: 'opsonin' },
      { id: 'n3', text: 'NK 细胞借 Fc 受体结合抗体后杀伤靶细胞', bucket: 'adcc' },
      { id: 'n4', text: '复合物结合 C1q，级联激活经典途径', bucket: 'cdc' },
      { id: 'n5', text: '形成膜攻击复合物杀伤靶细胞或细菌', bucket: 'cdc' },
      { id: 'n6', text: '结合细菌毒素，减轻毒性损伤', bucket: 'neutral' },
    ],
    explain:
      'n1/n6 → 中和（阻断结合）；n2 → 调理（Fc 桥接吞噬细胞）；n3 → ADCC（执行者 NK 细胞）；n4/n5 → CDC（C1q 与 MAC）。归类时可以问一句：这套机制的“执行者”是抗体本身、吞噬细胞、NK 细胞，还是补体？',
    ref: { moduleId: 'm2', label: '模块二 · 六大功能', anchor: 'm2-adcc' },
    tags: ['课堂任务'],
  },
  {
    id: 'c03-t4',
    type: 'single',
    stem: '下列哪一项正确区分了 ADCC 与 CDC？',
    options: [
      { key: 'A', text: 'ADCC 由补体执行，CDC 由 NK 细胞执行' },
      { key: 'B', text: 'ADCC 由 NK 细胞执行，CDC 由补体（MAC）执行' },
      { key: 'C', text: '两者都由抗体直接执行，不需要其他成分' },
      { key: 'D', text: '两者都不需要抗体参与' },
    ],
    answer: 'B',
    explain:
      '选 B。ADCC：NK 细胞借 Fc 受体结合抗体 Fc 段后杀伤靶细胞；CDC：复合物结合 C1q，激活经典途径形成 MAC 杀伤靶细胞。二者都需要抗体作为“桥”，但执行者不同，且可联合作用。',
    summary: 'ADCC 靠细胞，CDC 靠补体；都需要抗体的 Fc 段。',
    ref: { moduleId: 'm2', label: '模块二 · ADCC 与 CDC', anchor: 'm2-cdc' },
    tags: ['课堂任务'],
  },
  {
    id: 'c03-t5',
    type: 'sorting',
    stem: '把四种抗体相关产品的“主要用途”归类：',
    scenario: '抗蛇毒血清、卵黄抗体 IgY、犬细小单抗、量子点试纸条——它们各自主要解决什么问题？',
    buckets: [
      { id: 'treat', label: '治疗用', hint: '直接中和病原或毒素' },
      { id: 'replace', label: '替代/减抗用', hint: '替代抗生素' },
      { id: 'diag', label: '诊断用', hint: '作为探针检测' },
    ],
    items: [
      { id: 'p1', text: '抗蛇毒血清（主要含 F(ab′)₂）', bucket: 'treat' },
      { id: 'p2', text: '犬细小单抗（静脉注射快速中和病毒）', bucket: 'treat' },
      { id: 'p3', text: '卵黄抗体 IgY（拌料口服，用于仔猪腹泻）', bucket: 'replace' },
      { id: 'p4', text: '量子点标记试纸条（无需仪器、无需冷链）', bucket: 'diag' },
    ],
    explain:
      'p1/p2 → 治疗（直接中和毒素或病毒）；p3 → 替代/减抗（IgY 口服减少抗生素使用）；p4 → 诊断（抗体作为探针被标记后读出信号）。同一类分子，三种角色。',
    ref: { moduleId: 'm3', label: '模块三 · 创新应用', anchor: 'm3-apps' },
    tags: ['课堂任务'],
  },
  {
    id: 'c03-t6',
    type: 'multi',
    stem: '一例幼犬确诊犬细小病毒感染（发病第 2 天），主人希望“用最好的药”。下列处置思路有依据的有：',
    scenario: '作为主治兽医，请先判断哪些思路有科学依据，再考虑如何与主人沟通。',
    options: [
      { key: 'A', text: '考虑使用犬细小单抗静脉注射中和病毒' },
      { key: 'B', text: '联合支持疗法（补液、纠正电解质紊乱等）' },
      { key: 'C', text: '强调“发病早期”是抗体治疗的关键时机' },
      { key: 'D', text: '向主人承诺“用了最好的药就一定能治愈”' },
      { key: 'E', text: '说明疗效受发病阶段、病毒载量与个体状态影响' },
    ],
    answer: ['A', 'B', 'C', 'E'],
    explain:
      '选 A、B、C、E。课件指出犬细小单抗“静脉注射快速中和病毒，发病早期联合支持疗法显著降低死亡率”。D 是过度承诺：抗体中和病毒不等于必然治愈，专业沟通应说明不确定性。',
    summary: '抗体治疗靠“早期 + 联合支持”，不靠“最贵”。',
    ref: { moduleId: 'm3', label: '模块三 · 宠物临床单抗', anchor: 'm3-apps' },
    tags: ['课堂任务'],
  },
  {
    id: 'c03-q1',
    type: 'single',
    stem: '“抗体不能直接杀死细菌，MAC 可以”——这句话说明的是：',
    options: [
      { key: 'A', text: '抗体在免疫防御中毫无作用' },
      { key: 'B', text: '抗体的多数功能是标记目标、招募效应系统来完成最终杀伤' },
      { key: 'C', text: '补体可以完全替代抗体' },
      { key: 'D', text: 'MAC 是由抗体直接构成的' },
    ],
    answer: 'B',
    explain:
      '选 B。这句话强调的是分工：抗体负责特异识别与标记，最后的“处决”由补体（MAC）或细胞（如 NK 细胞）完成。A 与事实相反；C 错在补体的激活往往依赖抗体；D 错，MAC 由补体成分聚合形成。',
    ref: { moduleId: 'm2', label: '模块二 · 激活补体', anchor: 'm2-cdc' },
    tags: ['课堂任务'],
  },
]

/* -------------------------------- 课后作业 -------------------------------- */

const homeworkQuestions: Question[] = [
  {
    id: 'c03-hb1',
    type: 'single',
    stem: '（基础）抗体的基本结构由几条肽链组成？',
    options: [
      { key: 'A', text: '2 条' },
      { key: 'B', text: '4 条（2 条重链 + 2 条轻链）' },
      { key: 'C', text: '6 条' },
      { key: 'D', text: '1 条' },
    ],
    answer: 'B',
    explain: '课件原文：两条相同重链和两条相同轻链通过二硫键连接而成 4 肽链分子，呈“Y”字型。',
    ref: { moduleId: 'm1', label: '模块一 · 基本结构', anchor: 'm1-basic' },
  },
  {
    id: 'c03-hb2',
    type: 'judge',
    stem: '（基础）分泌片是抗体重链的一部分。',
    answer: false,
    explain:
      '错误。分泌片由黏膜上皮细胞合成和分泌，以非共价形式结合到二聚体上形成 sIgA，能抵抗蛋白水解酶消化——它不是抗体重链的组成部分。',
    ref: { moduleId: 'm1', label: '模块一 · 辅助结构', anchor: 'm1-aux' },
  },
  {
    id: 'c03-hb3',
    type: 'multi',
    stem: '（基础）下列属于抗体生物学功能的有：',
    options: [
      { key: 'A', text: '中和作用' },
      { key: 'B', text: '调理作用' },
      { key: 'C', text: 'ADCC' },
      { key: 'D', text: '黏膜免疫' },
      { key: 'E', text: '直接裂解细菌细胞壁' },
    ],
    answer: ['A', 'B', 'C', 'D'],
    explain: '选 A、B、C、D。E 错：裂解细菌细胞壁不是抗体的作用，抗体的杀伤依赖补体（MAC）或效应细胞。',
    ref: { moduleId: 'm2', label: '模块二 · 六大功能', anchor: 'm2-neutral' },
  },
  {
    id: 'c03-hb4',
    type: 'sorting',
    stem: '（基础）把两种蛋白酶与对应的水解产物配对：',
    buckets: [
      { id: 'papain', label: '木瓜蛋白酶' },
      { id: 'pepsin', label: '胃蛋白酶' },
    ],
    items: [
      { id: 'x1', text: '产生 2 个 Fab 片段', bucket: 'papain' },
      { id: 'x2', text: '产生 1 个 Fc 片段', bucket: 'papain' },
      { id: 'x3', text: '产生 1 个保留双价结合的 F(ab′)₂', bucket: 'pepsin' },
      { id: 'x4', text: 'Fc 区被降解', bucket: 'pepsin' },
    ],
    explain: '木瓜蛋白酶 → 2 Fab + 1 Fc；胃蛋白酶 → 1 个 F(ab′)₂，Fc 降解。记住“木瓜两刀（Fab 成双）、胃蛋白一刀（保留双价）”。',
    ref: { moduleId: 'm1', label: '模块一 · 水解片段', anchor: 'm1-hydrolysis' },
  },
  {
    id: 'c03-ha1',
    type: 'open',
    stem:
      '（提升）某抗体药物在体外能结合病毒，但体内保护效果不如预期。请用“V 区—C 区—效应功能”写一段分析思路（≥ 3 个要点）。',
    explain: '评分要点见参考思路。要求体现：结合能力（V 区）与效应功能（C 区）是两件事，体外结合不等于体内保护。',
    guidance: [
      'V 区决定能否结合——体外结合阳性只说明“认得出”，不代表“能保护”。',
      '体内保护往往依赖效应功能：调理（促进吞噬）、ADCC（招募 NK）、CDC（激活补体）都需要完整的 Fc 与相应受体/补体系统。',
      '若抗体被酶解为 Fab 或 F(ab′)₂，Fc 缺失会使效应功能大幅减弱。',
      '还需考虑：抗体能否到达靶部位、半衰期、抗原变异导致 V 区脱靶等。',
    ],
    minLength: 60,
    ref: { moduleId: 'm2', label: '模块二 · 功能与结构的关系', anchor: 'm2-opsonin' },
  },
  {
    id: 'c03-ha2',
    type: 'single',
    stem: '（提升）下列关于抗蛇毒血清的表述，正确的是：',
    options: [
      { key: 'A', text: '其有效成分是完整的 IgG，含完整 Fc 段' },
      { key: 'B', text: '其有效成分主要含 F(ab′)₂，保留双价抗原结合能力' },
      { key: 'C', text: '它是通过给犬直接注射蛇毒制备的' },
      { key: 'D', text: '它通过激活补体直接溶解蛇毒蛋白' },
    ],
    answer: 'B',
    explain:
      '选 B。课件：用蛇毒素免疫马匹后采血浆，经酶解、提取和纯化，主要含 F(ab′)₂ 片段。A 与课件不符；C 错在免疫动物是马匹；D 错，其作用是与毒素结合中和，而非通过补体溶解毒素。',
    ref: { moduleId: 'm3', label: '模块三 · 抗体制备', anchor: 'm3-antiserum' },
  },
  {
    id: 'c03-ha3',
    type: 'ordering',
    stem: '（提升）把卵黄抗体 IgY 的生产与应用流程排序：',
    items: [
      { id: 'y1', text: '用目标病原抗原多次免疫产蛋母鸡' },
      { id: 'y2', text: 'IgY 富集到蛋黄中' },
      { id: 'y3', text: '从蛋黄中提取 IgY' },
      { id: 'y4', text: '经稀释、盐析、超滤与喷雾干燥制成粉剂' },
      { id: 'y5', text: '拌料口服给仔猪或水产动物' },
    ],
    explain:
      '正确顺序：免疫母鸡 → IgY 富集到蛋黄 → 提取 → 制成粉剂 → 拌料口服。IgY 的核心优势是“可口服 + 提取简单 + 减少抗生素使用”。',
    ref: { moduleId: 'm3', label: '模块三 · IgY', anchor: 'm3-apps' },
  },
  {
    id: 'c03-he1',
    type: 'open',
    stem:
      '（拓展）某规模化猪场面临仔猪腹泻与抗生素减量双重压力。请设计一条基于抗体的替代方案，并说明如何评价效果（≥ 4 个要点）。',
    explain: '开放题，按“方案合理性 + 机制依据 + 评价设计”三方面评价，参考思路见下。',
    guidance: [
      '选定目标病原：明确主要致腹泻病原，作为免疫原与靶标。',
      '制备路线：用目标抗原免疫产蛋母鸡获得 IgY，提取后制成粉剂拌料口服（可口服是 IgY 的关键优势）。',
      '作用机制：IgY 在肠道内与病原结合，阻断其黏附/定植，属于“局部中和”。',
      '效果评价：记录腹泻发生率、死淘率、日增重、用药量（抗生素使用强度）；设置对照组。',
      '风险与边界：批次一致性、抗原变异导致效果下降、与现有免疫程序的配合。',
    ],
    minLength: 100,
    ref: { moduleId: 'm3', label: '模块三 · IgY 替代', anchor: 'm3-apps' },
  },
  {
    id: 'c03-he2',
    type: 'open',
    stem:
      '（拓展）课件指出“近 5 年全球销售 Top10 药品中单抗居多，尚未有一家中国药企上榜”。请谈谈这一现状对兽医抗体研发的启示（≥ 2 个要点）。',
    explain: '开放题。评价重点是能否从“差距—路径—兽医特色”三个角度展开，且不作空泛结论。',
    guidance: [
      '差距的实质：抗体药物是技术高地，差距集中在靶点发现、工程化改造、规模化生产与质量体系。',
      '可行路径：从“跟跑”到局部突破，需要在某一细分领域（如特定动物病原）做深，而不是全面铺开。',
      '兽医特色：动物专用抗体需求与人类不同（物种多、成本敏感、可接受口服/拌料方案），这正是差异化空间。',
      '配套能力：诊断与治疗“双轮驱动”，诊断能力可反哺靶点发现与效果评价。',
    ],
    minLength: 80,
    ref: { moduleId: 'm3', label: '模块三 · 产业现状', anchor: 'm3-industry' },
  },
]

/* ------------------------------- 课后测验 ------------------------------- */

const postTestQuestions: Question[] = [
  {
    id: 'c03-as1',
    type: 'single',
    stem: '抗体的抗原结合特异性主要由什么决定？',
    options: [
      { key: 'A', text: 'Fc 段的糖基' },
      { key: 'B', text: '可变区的氨基酸序列' },
      { key: 'C', text: 'J 链的长度' },
      { key: 'D', text: '分泌片的结构' },
    ],
    answer: 'B',
    explain: 'V 区（靠近 N 端约 110 个氨基酸）序列变化大，与抗原表位互补结合，决定特异性。',
    ref: { moduleId: 'm1', label: '模块一 · V 区', anchor: 'm1-basic' },
  },
  {
    id: 'c03-as2',
    type: 'judge',
    stem: '胃蛋白酶水解 IgG 可得到保留两个抗原结合位点的 F(ab′)₂ 片段，Fc 区被降解。',
    answer: true,
    explain: '正确，这是课件原文表述。这也解释了抗蛇毒血清为何主要以 F(ab′)₂ 为有效成分。',
    ref: { moduleId: 'm1', label: '模块一 · 水解片段', anchor: 'm1-hydrolysis' },
  },
  {
    id: 'c03-as3',
    type: 'single',
    stem: '下列哪一项是 ADCC 的核心特征？',
    options: [
      { key: 'A', text: '补体 C1q 结合抗体后形成 MAC' },
      { key: 'B', text: 'NK 细胞通过 Fc 受体结合抗体 Fc 段后杀伤靶细胞' },
      { key: 'C', text: '抗体直接裂解靶细胞膜' },
      { key: 'D', text: '抗体促进吞噬细胞吞噬病原' },
    ],
    answer: 'B',
    explain: 'A 是 CDC；D 是调理作用；C 不是抗体的作用方式。ADCC 的关键是 NK 细胞与抗体 Fc 段的结合。',
    ref: { moduleId: 'm2', label: '模块二 · ADCC', anchor: 'm2-adcc' },
  },
  {
    id: 'c03-as4',
    type: 'multi',
    stem: '下列属于课件所列抗体功能的有：',
    options: [
      { key: 'A', text: '中和作用' },
      { key: 'B', text: '激活补体' },
      { key: 'C', text: '免疫损伤作用' },
      { key: 'D', text: '黏膜免疫' },
      { key: 'E', text: '合成补体成分' },
    ],
    answer: ['A', 'B', 'C', 'D'],
    explain: '选 A、B、C、D。E 错：补体由肝细胞等合成，抗体负责激活补体，不合成补体。',
    ref: { moduleId: 'm2', label: '模块二 · 六大功能', anchor: 'm2-damage' },
  },
  {
    id: 'c03-as5',
    type: 'single',
    stem: '关于卵黄抗体 IgY，说法正确的是：',
    options: [
      { key: 'A', text: '通过给仔猪直接注射抗原获得' },
      { key: 'B', text: '通过免疫产蛋母鸡、从蛋黄中提取获得，可拌料口服' },
      { key: 'C', text: '只能静脉注射，不能口服' },
      { key: 'D', text: '其本质是抗生素' },
    ],
    answer: 'B',
    explain: 'IgY 通过免疫产蛋母鸡、从蛋黄提取获得，可制成粉剂拌料口服，用于减少抗生素使用。C 与其口服应用方式矛盾；D 错在本质：IgY 是抗体（免疫球蛋白），不是抗生素。',
    ref: { moduleId: 'm3', label: '模块三 · IgY', anchor: 'm3-apps' },
  },
]

export const antibodyQuestionBank: Record<string, Question> = Object.fromEntries(
  [
    ...preClassQuestions,
    ...moduleQuestions,
    ...classroomQuestions,
    ...homeworkQuestions,
    ...postTestQuestions,
  ].map((q) => [q.id, q]),
)

export const antibodyGroups = {
  preClass: preClassQuestions,
  module: moduleQuestions,
  classroom: classroomQuestions,
  homework: homeworkQuestions,
  postTest: postTestQuestions,
}
