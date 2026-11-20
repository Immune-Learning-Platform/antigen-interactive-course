import type { Question } from '../types'

/* ------------------------------- 课前预习（4 题）------------------------------- */

const preClassQuestions: Question[] = [
  {
    id: 'c02-pre1',
    type: 'single',
    stem: '按课件定义，骨髓位于：',
    options: [
      { key: 'A', text: '骨膜与皮质骨之间' },
      { key: 'B', text: '骨髓腔和松质骨骨小梁间隙内' },
      { key: 'C', text: '关节腔内' },
      { key: 'D', text: '仅存在于长骨两端' },
    ],
    answer: 'B',
    explain:
      '选 B。课件定义：骨髓是骨髓腔和松质骨骨小梁间隙内的软组织，包括黄骨髓和红骨髓。两个关键词是“骨髓腔”与“骨小梁间隙”。',
    summary: '位置记两个：骨髓腔 + 松质骨骨小梁间隙。',
    ref: { moduleId: 'm1', label: '模块一 · 骨髓的定义', anchor: 'm1-def' },
    tags: ['概念'],
  },
  {
    id: 'c02-pre2',
    type: 'multi',
    stem: '骨髓的组成包括：',
    options: [
      { key: 'A', text: '红骨髓' },
      { key: 'B', text: '黄骨髓' },
      { key: 'C', text: '胸腺组织' },
      { key: 'D', text: '造血干细胞' },
      { key: 'E', text: '间充质干细胞' },
    ],
    answer: ['A', 'B', 'D', 'E'],
    explain:
      '选 A、B、D、E。课件定义骨髓“包括黄骨髓和红骨髓”，并指出红骨髓是血细胞生产的重要场所、含造血干细胞与间充质干细胞。胸腺是独立的免疫器官，不在骨髓内（C 错）。',
    summary: '红骨髓 + 黄骨髓是组成；HSC 与 MSC 存在于红骨髓中。',
    ref: { moduleId: 'm1', label: '模块一 · 定义与组成', anchor: 'm1-def' },
    tags: ['概念'],
  },
  {
    id: 'c02-pre3',
    type: 'judge',
    stem: '骨髓是 B 细胞分化、成熟的场所。',
    answer: true,
    explain:
      '正确。课件明确指出：骨髓是 B 细胞和 NK 细胞分化、成熟的场所，并给出两条完整发育路径。注意 T 细胞不在此列——T 细胞离开骨髓后前往胸腺成熟。',
    summary: '骨髓：B 细胞与 NK 细胞成熟；胸腺：T 细胞成熟。',
    ref: { moduleId: 'm2', label: '模块二 · B/NK 细胞成熟', anchor: 'm2-bnk' },
    tags: ['功能'],
  },
  {
    id: 'c02-pre4',
    type: 'open',
    stem: '一匹赛马骨折后，兽医为什么要同时评估它的造血与免疫状态？请用“骨髓—血细胞—免疫细胞”三个词写出你的猜想（1—2 句话）。',
    scenario: '赛马后肢骨折送来救治，主治兽医除影像学检查外还安排了血常规与免疫相关评估。',
    explain:
      '开放题，不需与参考思路完全一致。核心是能串起：骨髓是造血与免疫细胞发生的源头 → 骨折/创伤/应激会影响造血 → 血常规反映造血状态，免疫评估反映防御能力。',
    guidance: [
      '骨髓是各类血细胞和免疫细胞发生、发育的场所。',
      '创伤与应激状态下，机体对携氧（红细胞）、抗感染（粒细胞、淋巴细胞）、凝血（血小板）的需求都会上升。',
      '因此评估造血与免疫状态，实际上是在评估“供应端”能否跟上“需求端”。',
      '推论：若骨髓功能受损，骨折愈合与抗感染能力都可能同时受影响。',
    ],
    minLength: 12,
    ref: { moduleId: 'm2', label: '模块二 · 造血发生', anchor: 'm2-hemato' },
    tags: ['应用', '情境'],
  },
]

/* ------------------------- 模块随堂 + 课堂互动题目 ------------------------- */

const conceptQuestions: Question[] = [
  {
    id: 'c02-q1',
    type: 'single',
    stem: '下列对应关系正确的是：',
    options: [
      { key: 'A', text: 'HIM —— 造血干细胞' },
      { key: 'B', text: 'HSC —— 造血诱导微环境' },
      { key: 'C', text: 'MSC —— 间充质干细胞' },
      { key: 'D', text: 'HIM —— 主要组织相容性复合体' },
    ],
    answer: 'C',
    explain:
      '选 C。MSC = 间充质干细胞（Mesenchymal stem cell）。A、B 把 HIM（造血诱导微环境）与 HSC（造血干细胞）互换了；D 把 HIM 与 MHC 混淆。',
    summary: 'HIM 是环境，HSC 是造血干细胞，MSC 是间充质干细胞。',
    ref: { moduleId: 'm1', label: '模块一 · 三个概念', anchor: 'm1-niche' },
    tags: ['概念'],
  },
  {
    id: 'c02-q2',
    type: 'single',
    stem: '关于红骨髓，符合课件表述的是：',
    options: [
      { key: 'A', text: '以脂肪组织为主，不参与造血' },
      { key: 'B', text: '是血细胞生产的重要场所，含造血干细胞、间充质干细胞等' },
      { key: 'C', text: '只存在于幼年动物体内' },
      { key: 'D', text: '不含任何干细胞' },
    ],
    answer: 'B',
    explain:
      '选 B。课件指出红骨髓是血细胞生产的重要场所，含造血干细胞、间充质干细胞等。A 描述的是黄骨髓的特点，C、D 与课件表述不符。',
    ref: { moduleId: 'm1', label: '模块一 · 红骨髓', anchor: 'm1-def' },
    tags: ['概念'],
  },
  {
    id: 'c02-q3',
    type: 'single',
    stem: '“体内所有血细胞的共同祖先”指的是：',
    options: [
      { key: 'A', text: '间充质干细胞（MSC）' },
      { key: 'B', text: '造血干细胞（HSC）' },
      { key: 'C', text: '成熟 B 细胞' },
      { key: 'D', text: '基质细胞' },
    ],
    answer: 'B',
    explain:
      '选 B。课件对 HSC 的表述：具有高度自我更新能力和分化潜能，是体内所有血细胞的共同祖先。MSC 虽也有自我更新与多向分化潜能，但主要向成骨、成软骨及成脂肪细胞分化，不是“所有血细胞的共同祖先”。',
    summary: 'HSC 输血细胞，MSC 输骨/软骨/脂肪。',
    ref: { moduleId: 'm1', label: '模块一 · HSC', anchor: 'm1-niche' },
    tags: ['难点'],
  },
  {
    id: 'c02-q4',
    type: 'multi',
    stem: '关于 MSC（间充质干细胞），符合课件表述的有：',
    options: [
      { key: 'A', text: '具有自我更新能力' },
      { key: 'B', text: '具有多向分化潜能' },
      { key: 'C', text: '可向成骨、成软骨及成脂肪细胞分化' },
      { key: 'D', text: '是体内所有血细胞的共同祖先' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C。D 是造血干细胞（HSC）的表述，不是 MSC。两者都有“自我更新 + 分化潜能”，但分化方向不同：HSC 走向各类血细胞，MSC 走向成骨/成软骨/成脂肪。',
    ref: { moduleId: 'm1', label: '模块一 · MSC', anchor: 'm1-niche' },
    tags: ['难点'],
  },
  {
    id: 'c02-q5',
    type: 'single',
    stem: '骨髓作为“各类血细胞和免疫细胞发生、发育的场所”，其重要性主要体现在：',
    options: [
      { key: 'A', text: '只产生红细胞' },
      { key: 'B', text: '红细胞、粒细胞、单核细胞、淋巴细胞、血小板都源自同一群造血干细胞' },
      { key: 'C', text: '只产生淋巴细胞' },
      { key: 'D', text: '只储存成熟血细胞，不产生新细胞' },
    ],
    answer: 'B',
    explain:
      '选 B。课件用“各类”强调骨髓造血的广泛性：多条血细胞谱系同源于造血干细胞。这也是骨髓功能受损会同时影响携氧、抗感染与凝血的原因。',
    ref: { moduleId: 'm2', label: '模块二 · 造血发生', anchor: 'm2-hemato' },
    tags: ['功能'],
  },
  {
    id: 'c02-q6',
    type: 'single',
    stem: '下列哪一项不属于 B 细胞的发育路径？',
    options: [
      { key: 'A', text: '祖B细胞' },
      { key: 'B', text: '前B细胞' },
      { key: 'C', text: 'NK细胞祖细胞' },
      { key: 'D', text: '未成熟B细胞' },
    ],
    answer: 'C',
    explain:
      '选 C。课件中 B 细胞路径为：造血干细胞 → 淋巴样前体细胞 → 祖B细胞 → 前B细胞 → 未成熟B细胞 → 成熟B细胞；NK 细胞路径才是造血干细胞 → 共同淋巴祖细胞 → NK细胞祖细胞 → 未成熟NK细胞 → 成熟NK细胞。',
    summary: '两条路径同源但分叉：B 走“淋巴样前体→祖B→前B”，NK 走“共同淋巴祖→NK祖”。',
    ref: { moduleId: 'm2', label: '模块二 · 淋巴细胞成熟', anchor: 'm2-bnk' },
    tags: ['难点'],
  },
  {
    id: 'c02-q7',
    type: 'single',
    stem: '血清抗体的主要来源是：',
    options: [
      { key: 'A', text: '骨髓中的成熟浆细胞' },
      { key: 'B', text: '胸腺中的 T 细胞' },
      { key: 'C', text: '脾脏中的红细胞' },
      { key: 'D', text: '淋巴结中的巨噬细胞' },
    ],
    answer: 'A',
    explain:
      '选 A。课件指出：骨髓是血清抗体的主要来源——记忆性B细胞再次活化后迁移至骨髓，分化为成熟浆细胞，持续分泌抗体。T 细胞、红细胞、巨噬细胞都不分泌抗体。',
    ref: { moduleId: 'm2', label: '模块二 · 抗体来源', anchor: 'm2-antibody' },
    tags: ['功能'],
  },
  {
    id: 'c02-q8',
    type: 'judge',
    stem: '骨髓既是中枢免疫器官，又是外周免疫器官。',
    answer: true,
    explain:
      '正确，这是课件明确给出的结论。依据是长寿命浆细胞在骨髓定居并持续分泌抗体——这一效应环节使骨髓同时具备外周免疫器官的功能。',
    ref: { moduleId: 'm2', label: '模块二 · 双重身份', anchor: 'm2-antibody' },
    tags: ['难点'],
  },
  {
    id: 'c02-q9',
    type: 'multi',
    stem: '课件指出干细胞通过哪些方式为疾病治疗提供新途径？',
    options: [
      { key: 'A', text: '组织修复' },
      { key: 'B', text: '功能重建' },
      { key: 'C', text: '免疫调节' },
      { key: 'D', text: '直接杀灭所有病原体' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C。课件原文：干细胞通过组织修复、功能重建与免疫调节，为多种疾病治疗提供新途径。D 是把干细胞当作广谱杀菌剂，不符合课件表述，也不是干细胞的已知作用方式。',
    ref: { moduleId: 'm3', label: '模块三 · 骨髓干细胞临床价值', anchor: 'm3-overview' },
    tags: ['重点'],
  },
  {
    id: 'c02-q10',
    type: 'single',
    stem: '造血干细胞移植之所以能重建造血与免疫功能，根本原因是：',
    options: [
      { key: 'A', text: '移植的是成熟血细胞，可立即替代受体血液' },
      { key: 'B', text: '移植的造血干细胞能在受体内重建全部血细胞谱系' },
      { key: 'C', text: '移植能直接杀死肿瘤细胞' },
      { key: 'D', text: '移植能提高受体的红细胞计数' },
    ],
    answer: 'B',
    explain:
      '选 B。造血干细胞是体内所有血细胞的共同祖先，移植后可在受体内重建造血与免疫细胞谱系，因此同时恢复造血与免疫功能。移植成熟血细胞只能短期补充，无法长期重建（A 错）。',
    ref: { moduleId: 'm3', label: '模块三 · 造血干细胞移植', anchor: 'm3-hsct' },
    tags: ['重点'],
  },
  {
    id: 'c02-q11',
    type: 'single',
    stem: '关于骨类器官，符合课件表述的是：',
    options: [
      { key: 'A', text: '是直接植入动物体内的金属假体' },
      { key: 'B', text: '可体外模拟骨组织功能，具备骨修复潜力' },
      { key: 'C', text: '只能用于人类医学，与兽医无关' },
      { key: 'D', text: '其来源与 MSC 无关' },
    ],
    answer: 'B',
    explain:
      '选 B。课件指出：大段骨缺损修复供体不足，骨类器官可体外模拟骨组织功能，具备骨修复潜力；并提到农业动物类器官亦充满机遇（C 错）。它源自骨髓 MSC 的成骨/成软骨分化潜能（D 错）。',
    ref: { moduleId: 'm3', label: '模块三 · 骨类器官', anchor: 'm3-organoid' },
    tags: ['前沿'],
  },
]

/* ---------------------------- 课堂互动的专项题 ---------------------------- */

const classroomQuestions: Question[] = [
  {
    id: 'c02-t2',
    type: 'ordering',
    stem: '把 B 细胞的发育路径按正确顺序排列：',
    scenario: '小组把 6 张阶段卡按“造血干细胞 → 成熟 B 细胞”的顺序排好，并说明每一步发生在哪里。',
    items: [
      { id: 'b1', text: '造血干细胞', hint: '共同祖先' },
      { id: 'b2', text: '淋巴样前体细胞', hint: '谱系定向' },
      { id: 'b3', text: '祖B细胞', hint: 'Pro-B' },
      { id: 'b4', text: '前B细胞', hint: 'Pre-B' },
      { id: 'b5', text: '未成熟B细胞', hint: '表达膜 IgM' },
      { id: 'b6', text: '成熟B细胞', hint: '可接受抗原刺激' },
    ],
    explain:
      '正确顺序：造血干细胞 → 淋巴样前体细胞 → 祖B细胞 → 前B细胞 → 未成熟B细胞 → 成熟B细胞。这条路径全程在骨髓内完成，是“骨髓是 B 细胞成熟场所”的具体体现。NK 细胞走的是另一条：造血干细胞 → 共同淋巴祖细胞 → NK细胞祖细胞 → 未成熟NK细胞 → 成熟NK细胞。',
    summary: 'B 走“淋巴样前体→祖B→前B”，NK 走“共同淋巴祖→NK祖”，两条路不要混。',
    ref: { moduleId: 'm2', label: '模块二 · 淋巴细胞成熟', anchor: 'm2-bnk' },
    tags: ['课堂任务'],
  },
  {
    id: 'c02-t3',
    type: 'sorting',
    stem: '把下列 6 条描述归入骨髓的三项功能：',
    scenario: '给出 6 张描述卡，判断各自对应“造血发生”“淋巴细胞成熟”还是“抗体来源”。',
    buckets: [
      { id: 'hemato', label: '功能一：血细胞发生、发育', hint: '各类血细胞的源头' },
      { id: 'mature', label: '功能二：B / NK 细胞成熟', hint: '谱系分叉与成熟阶段' },
      { id: 'ab', label: '功能三：血清抗体主要来源', hint: '浆细胞持续分泌' },
    ],
    items: [
      { id: 'f1', text: '红细胞、粒细胞、血小板同源于造血干细胞', bucket: 'hemato' },
      { id: 'f2', text: '祖B细胞 → 前B细胞 → 未成熟B细胞', bucket: 'mature' },
      { id: 'f3', text: '记忆性B细胞迁移至骨髓分化为浆细胞', bucket: 'ab' },
      { id: 'f4', text: 'NK细胞祖细胞 → 未成熟NK细胞', bucket: 'mature' },
      { id: 'f5', text: '各类免疫细胞在骨髓内发生、发育', bucket: 'hemato' },
      { id: 'f6', text: '成熟浆细胞持续分泌抗体维持血清抗体水平', bucket: 'ab' },
    ],
    explain:
      'f1/f5 → 造血发生（强调“各类细胞同源”）；f2/f4 → 淋巴细胞成熟（强调具体阶段）；f3/f6 → 抗体来源（强调浆细胞与持续分泌）。三项功能构成一条链，不是彼此孤立的三句话。',
    summary: '造血 → 成熟 → 抗体供应：一条链，三个环节。',
    ref: { moduleId: 'm2', label: '模块二 · 三项功能', anchor: 'm2-antibody' },
    tags: ['课堂任务'],
  },
  {
    id: 'c02-t4',
    type: 'single',
    stem: '若把 HIM 比作“土壤”，把 HSC 比作“种子”，那么 MSC 更接近下列哪种角色？',
    options: [
      { key: 'A', text: '另一颗种子，只负责长成血细胞' },
      { key: 'B', text: '既能自我更新、又能分化成骨/软骨/脂肪的“多面手”' },
      { key: 'C', text: '土壤中的水分，只起运输作用' },
      { key: 'D', text: '已经成熟的血细胞' },
    ],
    answer: 'B',
    explain:
      '选 B。MSC 具有自我更新和多向分化潜能，可向成骨、成软骨及成脂肪细胞分化——它既不是“只长血细胞的种子”（A 描述的是 HSC），也不是单纯运输介质（C），更不是终末成熟细胞（D）。',
    summary: 'HIM 环境、HSC 源头、MSC 多面手：三者分工不同。',
    ref: { moduleId: 'm1', label: '模块一 · 三个概念', anchor: 'm1-niche' },
    tags: ['课堂任务'],
  },
  {
    id: 'c02-t5',
    type: 'judge',
    stem: '有人说“骨髓只是中枢免疫器官”。这句话是准确的。',
    answer: false,
    explain:
      '错误。课件明确结论是：骨髓既是中枢免疫器官又是外周免疫器官。判断依据是长寿命浆细胞在骨髓定居并持续分泌抗体——这一效应环节属于外周免疫器官的功能范畴。',
    summary: '“只是中枢”这个说法漏掉了抗体持续产生这一外周功能。',
    ref: { moduleId: 'm2', label: '模块二 · 双重身份', anchor: 'm2-antibody' },
    tags: ['课堂任务'],
  },
  {
    id: 'c02-t6',
    type: 'multi',
    stem: '一例犬 B 细胞淋巴瘤经化疗获得缓解，主人询问进一步治疗。下列思路中有依据的有：',
    scenario:
      '作为兽医，请先判断哪些思路有科学依据，再考虑优先顺序。注意：技术可行不等于该病例适用。',
    options: [
      { key: 'A', text: '评估造血干细胞移植的适应证与供体来源' },
      { key: 'B', text: '向主人说明移植需要移植前处理与移植后长期监测' },
      { key: 'C', text: '考虑 MSC 在炎症调节与组织修复方面的作用' },
      { key: 'D', text: '只要做移植就一定能治愈，无需评估风险' },
      { key: 'E', text: '结合主人意愿与费用承受能力共同决策' },
    ],
    answer: ['A', 'B', 'C', 'E'],
    explain:
      '选 A、B、C、E。课件指出造血干细胞移植已应用于犬淋巴瘤治疗，为重建造血与免疫功能提供临床实践依据；MSC 参与炎症调节与组织修复。D 把“技术可行”等同于“必然治愈”，忽略了适应证、供体匹配与风险，是典型的过度承诺。',
    summary: '先分适应证 → 再看供体 → 评估风险收益 → 尊重主人意愿。',
    ref: { moduleId: 'm3', label: '模块三 · 造血干细胞移植', anchor: 'm3-hsct' },
    tags: ['课堂任务'],
  },
]

/* -------------------------------- 课后作业 -------------------------------- */

const homeworkQuestions: Question[] = [
  {
    id: 'c02-hb1',
    type: 'single',
    stem: '（基础）骨髓的功能不包括：',
    options: [
      { key: 'A', text: '各类血细胞和免疫细胞发生、发育的场所' },
      { key: 'B', text: 'B 细胞和 NK 细胞分化、成熟的场所' },
      { key: 'C', text: '血清抗体的主要来源' },
      { key: 'D', text: 'T 细胞分化、成熟的场所' },
    ],
    answer: 'D',
    explain:
      '选 D。T 细胞在胸腺分化、成熟，不在骨髓。A、B、C 是课件明确列出的骨髓三项功能。',
    ref: { moduleId: 'm2', label: '模块二 · 三项功能', anchor: 'm2-bnk' },
  },
  {
    id: 'c02-hb2',
    type: 'judge',
    stem: '（基础）黄骨髓是血细胞生产的重要场所。',
    answer: false,
    explain:
      '错误。课件指出是**红骨髓**为血细胞生产的重要场所，含造血干细胞、间充质干细胞等；黄骨髓在课件中作为骨髓的组成之一被并列提出，未表述为造血场所。',
    ref: { moduleId: 'm1', label: '模块一 · 定义与组成', anchor: 'm1-def' },
  },
  {
    id: 'c02-hb3',
    type: 'multi',
    stem: '（基础）关于 HIM、HSC、MSC，说法正确的有：',
    options: [
      { key: 'A', text: 'HIM 是支持和调控造血细胞生存、增殖与分化的局部环境' },
      { key: 'B', text: 'HSC 是体内所有血细胞的共同祖先' },
      { key: 'C', text: 'MSC 可向成骨、成软骨及成脂肪细胞分化' },
      { key: 'D', text: '三者是同一种细胞的不同名称' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C。D 错：HIM 是环境概念（不是细胞），HSC 与 MSC 是两类不同的干细胞，分化方向也不同。',
    ref: { moduleId: 'm1', label: '模块一 · 三个概念', anchor: 'm1-niche' },
  },
  {
    id: 'c02-hb4',
    type: 'ordering',
    stem: '（基础）把 NK 细胞的发育路径按正确顺序排列：',
    items: [
      { id: 'n1', text: '造血干细胞' },
      { id: 'n2', text: '共同淋巴祖细胞' },
      { id: 'n3', text: 'NK细胞祖细胞' },
      { id: 'n4', text: '未成熟NK细胞' },
      { id: 'n5', text: '成熟NK细胞' },
    ],
    explain:
      '正确顺序：造血干细胞 → 共同淋巴祖细胞 → NK细胞祖细胞 → 未成熟NK细胞 → 成熟NK细胞。与 B 细胞路径相比，分叉点在“共同淋巴祖细胞”之后，且没有“前NK细胞”这一命名。',
    ref: { moduleId: 'm2', label: '模块二 · 淋巴细胞成熟', anchor: 'm2-bnk' },
  },
  {
    id: 'c02-ha1',
    type: 'open',
    stem:
      '（提升）某犬贫血且反复感染，血常规显示多系血细胞减少。请用“骨髓—HIM—HSC”写一段分析思路（≥ 3 个要点），说明为什么可能同时出现贫血与感染。',
    explain:
      '评分要点见参考思路。要求体现：骨髓是各类血细胞共同来源 → 造血微环境或干细胞受损会同时影响多条谱系 → 红细胞减少致贫血、粒细胞/淋巴细胞减少致抗感染能力下降。',
    guidance: [
      '骨髓是各类血细胞和免疫细胞发生、发育的场所，多条谱系同源于造血干细胞。',
      'HIM（造血诱导微环境）支持与调控造血；微环境受损会波及整群造血，而非单一谱系。',
      'HSC 受损或数量减少时，红细胞系与粒细胞/淋巴系同时受影响 → 贫血 + 感染风险升高。',
      '进一步应结合骨髓细胞学检查判断是“造血原料不足”“微环境问题”还是“干细胞本身异常”。',
    ],
    minLength: 60,
    ref: { moduleId: 'm2', label: '模块二 · 造血发生', anchor: 'm2-hemato' },
  },
  {
    id: 'c02-ha2',
    type: 'sorting',
    stem: '（提升）判断下列描述各属于“中枢免疫器官功能”还是“外周免疫器官功能”：',
    buckets: [
      { id: 'central', label: '中枢免疫器官功能', hint: '发生、发育、成熟' },
      { id: 'periph', label: '外周免疫器官功能', hint: '免疫应答实际发生' },
    ],
    items: [
      { id: 'i1', text: '各类血细胞与免疫细胞在骨髓内发生、发育', bucket: 'central' },
      { id: 'i2', text: 'B 细胞在骨髓内完成分化、成熟', bucket: 'central' },
      { id: 'i3', text: '长寿命浆细胞在骨髓定居并持续分泌抗体', bucket: 'periph' },
      { id: 'i4', text: '记忆性B细胞再次活化后迁移至骨髓分化为浆细胞', bucket: 'periph' },
    ],
    explain:
      'i1/i2 → 中枢（发生与成熟）；i3/i4 → 外周（效应环节实际发生）。正因为两类功能都出现在同一个器官上，课件才得出“骨髓既是中枢免疫器官又是外周免疫器官”的结论。',
    ref: { moduleId: 'm2', label: '模块二 · 双重身份', anchor: 'm2-antibody' },
  },
  {
    id: 'c02-ha3',
    type: 'single',
    stem: '（提升）下列关于 MSC 与造血干细胞移植的关系，表述正确的是：',
    options: [
      { key: 'A', text: '移植主要依靠 MSC 重建全部血细胞谱系' },
      { key: 'B', text: '移植重建谱系依靠造血干细胞；MSC 更多参与炎症调节与组织修复' },
      { key: 'C', text: 'MSC 与移植完全无关，二者不能在同一病例中考虑' },
      { key: 'D', text: 'MSC 可以直接分化为成熟红细胞' },
    ],
    answer: 'B',
    explain:
      '选 B。重建全部血细胞谱系是造血干细胞的功能（因其为所有血细胞共同祖先）；MSC 的分化方向是成骨、成软骨、成脂肪，作用偏向支持、调节与修复。二者在临床上可能同时被考虑，但机制不同。',
    ref: { moduleId: 'm3', label: '模块三 · MSC 与移植', anchor: 'm3-msc' },
  },
  {
    id: 'c02-he1',
    type: 'open',
    stem:
      '（拓展）大段骨缺损修复常面临供体不足。请结合“MSC—成骨分化—类器官”设计一条研究或应用思路，并说明你将如何验证效果（≥ 4 个要点）。',
    explain: '开放题，按“思路合理性 + 机制依据 + 验证设计”三方面评价，参考思路见下。',
    guidance: [
      '起点：骨髓 MSC 具有自我更新和多向分化潜能，可向成骨、成软骨分化。',
      '制备：体外定向诱导 MSC 成骨分化，或构建含 MSC 的骨类器官模拟骨组织功能。',
      '应用：作为大段骨缺损修复的替代材料，缓解供体不足。',
      '验证：体外检测成骨标志物与矿化程度；体内在动物骨缺损模型中评估新生骨体积、力学强度与组织学整合。',
      '安全性：评估免疫排斥、异位成骨与致瘤风险，并做批间一致性控制。',
    ],
    minLength: 100,
    ref: { moduleId: 'm3', label: '模块三 · 骨类器官', anchor: 'm3-organoid' },
  },
  {
    id: 'c02-he2',
    type: 'open',
    stem:
      '（拓展）课件引用了一例犬 B 细胞淋巴瘤接受异基因造血干细胞移植的临床报道。请说明：在向宠物主人解释这项技术时，你会强调哪三个要点？为什么？（≥ 2 个要点）',
    explain: '开放题。评价重点是能否兼顾“希望”与“边界”，避免过度承诺。',
    guidance: [
      '要点一：这是有临床实践依据的技术，已用于犬淋巴瘤治疗，可重建造血与免疫功能。',
      '要点二：需要供体匹配与移植前处理，移植后需长期监测，过程有风险。',
      '要点三：适应证、个体状态与主人意愿共同决定是否实施；不能承诺“必然治愈”。',
      '表达原则：给希望但不给保证；把不确定性说清楚，是专业沟通的一部分。',
    ],
    minLength: 80,
    ref: { moduleId: 'm3', label: '模块三 · 造血干细胞移植', anchor: 'm3-hsct' },
  },
]

/* ------------------------------- 课后测验 ------------------------------- */

const postTestQuestions: Question[] = [
  {
    id: 'c02-as1',
    type: 'single',
    stem: '骨髓的组成是：',
    options: [
      { key: 'A', text: '只有红骨髓' },
      { key: 'B', text: '红骨髓和黄骨髓' },
      { key: 'C', text: '造血组织与胸腺' },
      { key: 'D', text: '血窦与脾脏' },
    ],
    answer: 'B',
    explain: '课件定义：骨髓包括黄骨髓和红骨髓。血窦与造血组织是骨髓内部的结构成分，不是“红/黄骨髓”这一层分类。',
    ref: { moduleId: 'm1', label: '模块一 · 定义与组成', anchor: 'm1-def' },
  },
  {
    id: 'c02-as2',
    type: 'judge',
    stem: '造血干细胞（HSC）具有高度自我更新能力和分化潜能，是体内所有血细胞的共同祖先。',
    answer: true,
    explain: '正确，这是课件对 HSC 的原文表述。',
    ref: { moduleId: 'm1', label: '模块一 · HSC', anchor: 'm1-niche' },
  },
  {
    id: 'c02-as3',
    type: 'single',
    stem: '骨髓被称为“外周免疫器官”的功能依据是：',
    options: [
      { key: 'A', text: '骨髓能产生造血干细胞' },
      { key: 'B', text: '记忆性B细胞在骨髓分化为浆细胞并持续分泌抗体' },
      { key: 'C', text: '骨髓内含有脂肪组织' },
      { key: 'D', text: '骨髓位于骨小梁间隙' },
    ],
    answer: 'B',
    explain:
      '选 B。产生造血干细胞属于中枢免疫器官范畴（A）；C、D 是结构描述，与免疫功能定位无关。正是浆细胞在骨髓持续分泌抗体这一效应环节，使骨髓兼具外周免疫器官功能。',
    ref: { moduleId: 'm2', label: '模块二 · 双重身份', anchor: 'm2-antibody' },
  },
  {
    id: 'c02-as4',
    type: 'multi',
    stem: '课件列出的骨髓干细胞临床应用方向包括：',
    options: [
      { key: 'A', text: '造血干细胞移植' },
      { key: 'B', text: 'MSC 参与炎症修复' },
      { key: 'C', text: 'MSC 与骨类器官' },
      { key: 'D', text: '直接替代抗生素治疗细菌感染' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C。D 不符合课件表述：干细胞的作用方式是组织修复、功能重建与免疫调节，不是直接杀菌。',
    ref: { moduleId: 'm3', label: '模块三 · 临床应用', anchor: 'm3-overview' },
  },
  {
    id: 'c02-as5',
    type: 'single',
    stem: 'T 细胞分化、成熟的场所是：',
    options: [
      { key: 'A', text: '骨髓' },
      { key: 'B', text: '胸腺' },
      { key: 'C', text: '脾脏' },
      { key: 'D', text: '淋巴结' },
    ],
    answer: 'B',
    explain:
      '选 B。骨髓负责 B 细胞与 NK 细胞的成熟，T 细胞则前往胸腺成熟。这也是为什么课件在讲骨髓功能时，特别限定为“B 细胞和 NK 细胞”。',
    ref: { moduleId: 'm2', label: '模块二 · 淋巴细胞成熟', anchor: 'm2-bnk' },
  },
]

export const boneQuestionBank: Record<string, Question> = Object.fromEntries(
  [
    ...preClassQuestions,
    ...conceptQuestions,
    ...classroomQuestions,
    ...homeworkQuestions,
    ...postTestQuestions,
  ].map((q) => [q.id, q]),
)

export const boneGroups = {
  preClass: preClassQuestions,
  module: conceptQuestions,
  classroom: classroomQuestions,
  homework: homeworkQuestions,
  postTest: postTestQuestions,
}
