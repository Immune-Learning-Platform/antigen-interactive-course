import type {
  AssessmentDimension,
  FrontierItem,
  HomeworkTier,
  IdeologyPoint,
  SourceRef,
  TeachingCase,
} from '../types'

const COURSEWARE: SourceRef = { label: '本章课堂教学课件（第九章第一节 · I型超敏反应）', note: '课件原文内容。' }
const JANEWAY: SourceRef = {
  label: "Janeway's Immunobiology · Glossary (NCBI Bookshelf NBK10759)",
  url: 'https://www.ncbi.nlm.nih.gov/books/NBK10759/',
  note: '公开教材，用于术语核对与补充知识。',
}

export const hypersensitivityCases: TeachingCase[] = [
  {
    id: 'c06-case-1',
    title: '注射后数分钟的面部肿胀：识别急性 I 型超敏',
    en: 'Acute type I reaction after injection',
    badge: '急性过敏 · 临床识别',
    background:
      '一例犬注射某药物后数分钟内出现面部肿胀、呕吐与呼吸急促。主人不解：“上次打同样的药没事，这次怎么这么严重？”',
    facts: [
      { label: '课件原文', text: 'I 型超敏反应发生迅速，再次接触过敏原后数分钟内发生。' },
      { label: '课件原文', text: '主要引起生理功能紊乱，严重时可发生组织损伤甚至过敏性休克。' },
      { label: '课件原文', text: '效应阶段：组胺等引起毛细血管扩张、通透性增强、腺体分泌增加。' },
      { label: '课件原文', text: 'IgE 的 Fc 段与效应细胞表面的 FcεRI 受体结合，使机体处于致敏状态。' },
    ],
    analysis: [
      {
        title: '第一步：为什么“上次没事”',
        body:
          '首次给药时，机体可能只是被“致敏”——产生了 IgE 并把它装到肥大细胞上，此时没有症状。这正是“上次没事”的原因。',
      },
      {
        title: '第二步：为什么“这次很快”',
        body:
          '再次接触同一致敏原时，它与细胞上的 IgE 结合、引发交联与脱颗粒，数分钟内即释放大量介质。因为“弹药已经装好”，所以反应极快。',
      },
      {
        title: '第三步：症状如何对应机制',
        body:
          '毛细血管扩张 → 局部红、热；通透性增强 → 面部水肿；腺体分泌增加 → 呕吐、呼吸道分泌物增多。严重时可发展为过敏性休克。',
      },
    ],
    task: '请向主人解释三件事：① 为什么上次没事这次很重；② 为什么发作这么快；③ 后续应该如何避免。',
    feedback: [
      '能说明“首次致敏、再次激发”的两次接触逻辑。',
      '能说明数分钟内发作是因为 IgE 已在细胞上就位。',
      '能提出记录可疑药物、避免再次接触，必要时做变应原检测。',
    ],
    sources: [COURSEWARE, JANEWAY],
    moduleIds: ['m1', 'm2'],
    authenticity: '本案例为教学情境，依据课件“概念、特征、效应阶段”内容构建，不对应具体病例记录，不含虚构检测数值。',
  },
  {
    id: 'c06-case-2',
    title: '反复抓挠的猫：为什么“根治”不现实',
    en: 'Feline atopic dermatitis and realistic goals',
    badge: '长期管理 · 沟通',
    background:
      '一只猫反复发生过敏性皮炎，主人问：“能不能打一针根治？我不想天天操心。”',
    facts: [
      { label: '课件原文', text: '过敏性疾病被世界卫生组织列为 21 世纪重点研究和防治的三大疾病之一。' },
      { label: '课件原文', text: '变应原皮试：查明变应原，避免接触。' },
      { label: '课件原文', text: '脱敏治疗：反复接触逐渐增加剂量的过敏原提取物，调节 IgE 和 IgG 抗体生成，使机体产生耐受性。' },
      { label: '课件原文', text: '特异性脱敏：小剂量、多次、长间隔（5~7 天）皮下注射。' },
    ],
    analysis: [
      {
        title: '第一步：为什么“根治”这个说法不准确',
        body:
          '过敏的基础是“已致敏状态 + 反复接触”。脱敏治疗的目标是建立耐受、减少发作，而不是把免疫系统“改造”成永不再反应。',
      },
      {
        title: '第二步：三层策略各自的定位',
        body:
          '第一层查明并避开变应原（基础）；第二层脱敏治疗（需长期坚持，5~7 天长间隔注射）；第三层靶向治疗（急性期或重症考虑）。',
      },
      {
        title: '第三步：为什么需要长期配合',
        body:
          '脱敏的核心是“反复、逐渐增加剂量”，这决定了它不可能一步到位。主人的依从性直接决定效果。',
      },
    ],
    task: '请写出你对主人的 3 句话回答：① 能不能根治；② 现实目标是什么；③ 需要怎样配合。',
    feedback: [
      '能说明“根治”表述不准确，目标是控制与减少发作。',
      '能说明三层策略与各自的适用场景。',
      '能说明脱敏需要长期坚持，依从性是关键。',
    ],
    sources: [COURSEWARE],
    moduleIds: ['m3'],
    authenticity: '本案例为教学情境，围绕课件“防治”三页内容设计，不对应具体病例记录。',
  },
  {
    id: 'c06-case-3',
    title: '同一套机制，两种角色：抗寄生虫与过敏',
    en: 'One mechanism, two roles',
    badge: '机制双重性 · 科学思维',
    background:
      '一名学生看到课件“研究进展”页后提问：既然 IgE 会让人过敏，为什么进化没有把它淘汰掉？',
    facts: [
      { label: '课件原文', text: 'IgE 和肥大细胞在机体免疫应答中发挥重要的调控作用。' },
      { label: '课件原文', text: 'IgE 抗体在抵抗血吸虫的感染中发挥重要作用。' },
      { label: '课件原文', text: 'IgE 结合可诱导 FcεRI 由二聚体解离为单体并激活下游信号，增强肥大细胞反应。' },
      { label: '课件原文', text: '2025 年底全国 421 个血吸虫流行县达到消除标准。' },
    ],
    analysis: [
      {
        title: '第一步：IgE 的“主要工作”是抗寄生虫',
        body:
          '课件指出 IgE 在抵抗血吸虫感染中发挥重要作用。肥大细胞被 IgE 致敏后，遇到寄生虫可快速释放介质，参与驱逐与炎症反应。',
      },
      {
        title: '第二步：过敏是“错靶”的结果',
        body:
          '同一套机制遇到花粉、尘螨这类无害变应原时，就产生了没有保护意义的反应。机制本身没错，错的是对象。',
      },
      {
        title: '第三步：为什么不能“彻底消灭 IgE”',
        body:
          '因为它在抗寄生虫等防御中仍有作用。这也解释了靶向治疗的设计逻辑：降低或阻断其作用，而不是摧毁整个系统。',
      },
    ],
    task: '请用两句话回答学生的问题：① IgE 为什么没有被进化淘汰；② 这对治疗思路有什么启示。',
    feedback: [
      '能指出 IgE 在抗寄生虫中的保护作用。',
      '能说明过敏是同一机制对无害变应原的“错靶”反应。',
      '能推出治疗应是“调控”而非“消灭”。',
    ],
    sources: [COURSEWARE, JANEWAY],
    moduleIds: ['m2'],
    authenticity: '本案例依据课件“研究进展”页整理；课件数据原样引用，未作外推。',
  },
]

export const hypersensitivityHomework: HomeworkTier[] = [
  { id: 'basic', title: '基础层：概念与机制', level: '基础', minutes: 10, intro: '覆盖概念、三要素、三特征与三步机制。', questionIds: ['c06-hb1', 'c06-hb2', 'c06-hb3', 'c06-hb4'], deliverable: '客观题自动判分，无需提交。' },
  { id: 'advanced', title: '提升层：机制推断与体征对应', level: '提升', minutes: 15, intro: '练习解释“为什么不能一针根治”，并把体征对应到介质效应。', questionIds: ['c06-ha1', 'c06-ha2', 'c06-ha3'], deliverable: '开放题可保存草稿（本机浏览器）。' },
  { id: 'extended', title: '拓展层：方案评估与思辨', level: '拓展', minutes: 25, intro: '评估 IgY 方案的原理与局限，并思考 IgE 的双重角色。', questionIds: ['c06-he1', 'c06-he2'], deliverable: '建议整理成 300 字以内摘要，课堂分享。' },
]

export const hypersensitivityAssessment: AssessmentDimension[] = [
  { id: 'knowledge', title: '知识掌握', weight: '40%', basis: '模块随堂小测 + 课后测验正确率', indicators: ['能复述概念三限定', '能说出三要素与三特征', '能按三步讲清机制', '能列举三类防治'], source: '本地记录' },
  { id: 'task', title: '任务完成', weight: '20%', basis: '课前预习、模块阅读、清单打卡', indicators: ['课前 4 题全部作答', '三模块均完成阅读', '完成课堂互动 6 项'], source: '本地记录' },
  { id: 'interaction', title: '互动练习', weight: '20%', basis: '课堂互动完成度与首次正确率', indicators: ['致敏细胞识别完成', '三步排序一次通过', '致敏/激发分类正确'], source: '本地记录' },
  { id: 'growth', title: '前后测对照', weight: '20%', basis: '课前 vs 课后正确率提升幅度', indicators: ['课后正确率 ≥ 80%', '较课前有提升', '错题已回看'], source: '本地记录' },
]

export const hypersensitivityIdeology: IdeologyPoint[] = [
  {
    id: 'c06-ideo-1',
    title: '免疫有度：过强也是病',
    en: 'Balance, not strength',
    hook: '过敏不是“免疫力差”，而是免疫反应用错了对象、用大了力气。',
    body: [
      'I 型超敏反应针对的是花粉、尘螨这类无害物质，反应虽快却毫无保护意义，反而造成生理功能紊乱。',
      '这提示我们纠正一个常见误解：免疫不是“越强越好”，而是要“有度”——强度与对象都要匹配。',
    ],
    link: '对应知识点：I 型超敏反应的概念与特征（模块一）。',
    reflection: '为什么“增强免疫力”这类宣传语在科学上是不严谨的？请结合本章说明。',
  },
  {
    id: 'c06-ideo-2',
    title: '动物福利与主人生活质量',
    en: 'Welfare and quality of life',
    hook: '一只反复抓挠的猫，痛苦的不只是它。',
    body: [
      '课件指出宠物变应原及相关过敏性疾病日渐增多，宠物过敏亦逐渐引起重视。过敏既影响动物的舒适与皮肤健康，也影响主人的生活质量（甚至影响是否继续饲养）。',
      '把过敏管理好，是兽医职业责任的一部分，而不只是“开个止痒药”。',
    ],
    link: '对应知识点：过敏的流行病学背景（课件第 2 页）与三类防治策略。',
    reflection: '如果一个家庭因为孩子过敏而考虑弃养宠物，作为兽医你能提供哪些专业帮助？',
  },
  {
    id: 'c06-ideo-3',
    title: '耐心：脱敏治疗教给我们的事',
    en: 'Patience in treatment',
    hook: '“小剂量、多次、长间隔”——医学有时需要的是时间，而不是更猛的药。',
    body: [
      '课件描述的脱敏治疗需要 5~7 天长间隔、小剂量、多次注射，通过逐渐增加剂量建立耐受。这个过程没有捷径。',
      '在一个追求“立竿见影”的时代，这种治疗方式本身就是一种专业态度的示范。',
    ],
    link: '对应知识点：脱敏治疗的原理与两种方式（模块三 3.2）。',
    reflection: '为什么脱敏治疗不能“加大剂量加速”？请从机制角度解释风险。',
  },
  {
    id: 'c06-ideo-4',
    title: '理性看待新药：靶点清楚了，边界也要清楚',
    en: 'Rational use of biologics',
    hook: '知道了奥马珠单抗结合 IgE，就更容易理解它“能做什么、不能做什么”。',
    body: [
      '课件介绍了奥马珠单抗（抗 IgE）、美泊利珠单抗（抗 IL-5）、杜普利尤单抗（抑制 IL-4/IL-13）的作用机制。理解靶点，才能判断适应证与局限。',
      '靶向药不是“万能药”：它们作用于特定环节，通常需要持续给药，也不能替代查明并避开变应原这一基础工作。',
    ],
    link: '对应知识点：特异性免疫治疗（模块三 3.3）。',
    reflection: '如果一位主人要求“直接上最贵的单抗”，你会怎样用机制知识与他沟通？',
  },
]

export const hypersensitivityFrontier: FrontierItem[] = [
  {
    id: 'c06-f-1',
    title: 'IgE—FcεRI 的结构与信号',
    en: 'IgE and FcεRI signalling',
    tag: '课件原文',
    body: '课件指出：IgE 结合可诱导 FcεRI 由二聚体解离为单体并激活下游信号，从而增强肥大细胞反应，促进 I 型超敏反应发生。',
    link: '承接模块二 2.5：从分子层面解释“为什么致敏后的细胞反应更强”。',
    source: COURSEWARE,
    level: '课件原文',
  },
  {
    id: 'c06-f-2',
    title: 'IgE 在抗寄生虫中的作用',
    en: 'IgE in helminth defence',
    tag: '课件原文',
    body: '课件指出 IgE 抗体在抵抗血吸虫的感染中发挥重要作用，并提到 2025 年底全国 421 个血吸虫流行县达到消除标准。',
    link: '承接模块二 2.5：说明 IgE 不只是“过敏的元凶”，也是防御系统的一部分。',
    source: COURSEWARE,
    level: '课件原文',
  },
  {
    id: 'c06-f-3',
    title: '靶向治疗：从抗组胺到单抗',
    en: 'From antihistamines to biologics',
    tag: '课件原文',
    body: '课件介绍了三类靶向思路：抗 IgE（奥马珠单抗）、抗 IL-5（美泊利珠单抗，“断粮战术”减少嗜酸性粒细胞增援）、抑制 IL-4 与 IL-13（杜普利尤单抗）。',
    link: '承接模块三 3.3：靶点对应机制链上的不同环节。',
    source: COURSEWARE,
    level: '课件原文',
  },
  {
    id: 'c06-f-4',
    title: '变应原中和：从环境控制到产品化',
    en: 'Allergen neutralization',
    tag: '课件原文',
    body: '课件举例：猫粮中掺入抗 Fel d 1 IgY 抗体，可有效降低猫主人的过敏频率；另一种思路是通过注射疫苗诱导产生抗 Fel d 1 抗体。',
    link: '承接模块三 3.3：把“避免接触”这一层思路做成可执行的产品方案。',
    source: COURSEWARE,
    level: '课件原文',
  },
  {
    id: 'c06-f-5',
    title: '补充阅读：IgE 与肥大细胞生物学',
    en: 'Further reading',
    tag: '补充阅读',
    body: '若要系统补齐 FcεRI 信号级联、肥大细胞介质种类（预存介质与新合成介质）、Th2 型免疫的诱导条件等细节，可参阅免疫学通用教材的 IgE 与肥大细胞相关章节。本站补充内容均与课件原文分开标注。',
    link: '用于拓展阅读，不作为考核内容。',
    source: JANEWAY,
    level: '补充阅读',
  },
]

export const hypersensitivityGlossary = [
  { term: 'I 型超敏反应', en: 'Type I hypersensitivity', def: '已致敏的机体再次接触相同抗原（过敏原）后，由 IgE 抗体介导、以肥大细胞和嗜碱性粒细胞为主要效应细胞的超敏反应。' },
  { term: '过敏原（变应原）', en: 'Allergen', def: '能诱导 IgE 产生并引发 I 型超敏反应的抗原，如吸入性、食物性、药物或酶类物质。' },
  { term: '变应素', en: 'Reagin', def: '即 IgE 抗体，由 B 细胞产生，产生依赖 IL-4，具有同种组织细胞亲嗜性。' },
  { term: 'IgE', en: 'Immunoglobulin E', def: '介导 I 型超敏反应的抗体，Fc 段结合效应细胞表面 FcεRI，Fab 段结合变应原。' },
  { term: 'FcεRI', en: 'High-affinity IgE receptor', def: '效应细胞表面的高亲和性 IgE Fc 受体，与 IgE 的 Fc 段结合。' },
  { term: '致敏阶段', en: 'Sensitization', def: 'IgE 的 Fc 段与效应细胞表面 FcεRI 结合，使机体处于致敏状态（此时无症状）。' },
  { term: '激发阶段', en: 'Triggering', def: '变应原再次进入，与 IgE 的 Fab 段结合，IgE 交联引起 Fc 段变构，激活细胞产生刺激信号。' },
  { term: '脱颗粒', en: 'Degranulation', def: '效应细胞释放生物活性介质（如组胺）的过程。' },
  { term: 'Th2 细胞', en: 'T helper 2 cell', def: '分泌 IL-4 等细胞因子的 CD4⁺ T 细胞亚群，为 B 细胞产生 IgE 提供帮助。' },
  { term: '变应原皮试', en: 'Allergen skin test', def: '用于查明变应原，以便避免接触。' },
  { term: '脱敏治疗', en: 'Desensitization / immunotherapy', def: '通过反复接触逐渐增加剂量的过敏原提取物，调节 IgE 与 IgG 生成，使机体产生耐受性。' },
  { term: '奥马珠单抗', en: 'Omalizumab', def: '人源化单克隆抗体，可特异性结合血清中的 IgE，从而阻止后续过敏反应。' },
  { term: '美泊利珠单抗', en: 'Mepolizumab', def: '特异性结合 IL-5 的单克隆抗体，阻碍其与 IL-5Rα 连接，减少嗜酸性粒细胞增援。' },
  { term: '杜普利尤单抗', en: 'Dupilumab', def: '通过抑制 IL-4 与 IL-13 发挥作用的单克隆抗体，用于缓解过敏症状。' },
  { term: 'IgY', en: 'Immunoglobulin Y', def: '卵黄抗体，可用于中和变应原（如抗 Fel d 1 IgY）。' },
]

export const hypersensitivityChecklist: string[] = [
  '完成课前学习页的 4 道预习任务（含 1 道开放题）',
  '读完模块一，能复述概念并说出三要素与三特征',
  '在三维模型中认出 IgE、FcεRI、胞内颗粒与细胞膜',
  '能说清“Fc 段装弹、Fab 段开火”的分工',
  '能按三步讲清发生机制（IgE 产生 → 致敏 → 激发与效应）',
  '能把一组临床体征对应到组胺的三种效应',
  '能列举三类防治策略并说明各自层次',
  '完成课堂互动 6 项任务',
  '提交课后作业：基础层 + 提升层必做，拓展层选做',
  '在学习评价页查看前后测对照，并回看错题解析',
]
