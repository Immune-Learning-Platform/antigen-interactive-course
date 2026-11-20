import type { Question } from '../types'

const preClassQuestions: Question[] = [
  {
    id: 'c06-pre1',
    type: 'single',
    stem: '按课件定义，I 型超敏反应的主要效应细胞是：',
    options: [
      { key: 'A', text: '细胞毒性 T 细胞' },
      { key: 'B', text: '肥大细胞和嗜碱性粒细胞' },
      { key: 'C', text: '中性粒细胞' },
      { key: 'D', text: '红细胞' },
    ],
    answer: 'B',
    explain: '课件原文：I 型超敏反应是由 IgE 抗体介导、以肥大细胞和嗜碱性粒细胞为主要效应细胞的超敏反应。',
    ref: { moduleId: 'm1', label: '模块一 · 概念', anchor: 'm1-concept' },
    tags: ['概念'],
  },
  {
    id: 'c06-pre2',
    type: 'single',
    stem: 'I 型超敏反应由哪一类抗体介导？',
    options: [
      { key: 'A', text: 'IgG' },
      { key: 'B', text: 'IgM' },
      { key: 'C', text: 'IgE' },
      { key: 'D', text: 'IgA' },
    ],
    answer: 'C',
    explain: '选 C。课件明确 I 型超敏反应由 IgE 抗体介导。IgG、IgM 主要与 II、III 型超敏相关。',
    ref: { moduleId: 'm1', label: '模块一 · 概念', anchor: 'm1-concept' },
    tags: ['概念'],
  },
  {
    id: 'c06-pre3',
    type: 'judge',
    stem: 'I 型超敏反应在机体首次接触过敏原时即可发生。',
    answer: false,
    explain:
      '错误。概念强调“**已致敏的机体**再次接触相同抗原后”才发生。首次接触的作用是诱导 IgE 产生并使机体致敏，此时尚无症状；再次接触才触发脱颗粒与效应。',
    ref: { moduleId: 'm2', label: '模块二 · 两次接触', anchor: 'm2-overview' },
    tags: ['难点'],
  },
  {
    id: 'c06-pre4',
    type: 'open',
    stem: '一只猫每年同一季节出现皮肤瘙痒与红斑。请用“致敏—激发”两个词解释为什么“每年都犯”（1—2 句话）。',
    scenario: '主人说：“每年这个时候就这样。”',
    explain:
      '开放题。核心是能指出：机体已经处于致敏状态（IgE 已结合在效应细胞上），每到该季节再次接触同一致敏原即可触发激发阶段，数分钟内释放介质产生症状。',
    guidance: [
      '首次接触过敏原 → 产生 IgE → IgE 结合到肥大细胞表面 → 机体致敏（此时无症状）。',
      '再次接触同一过敏原 → 与 IgE 结合 → 交联 → 脱颗粒 → 释放组胺等 → 出现症状。',
      '季节性复发说明：致敏状态是持续的，只要再次遇到同一致敏原就会发作。',
      '推论：管理的核心是“查明并避开”该变应原。',
    ],
    minLength: 12,
    ref: { moduleId: 'm2', label: '模块二 · 两次接触', anchor: 'm2-overview' },
    tags: ['应用', '情境'],
  },
]

const moduleQuestions: Question[] = [
  {
    id: 'c06-q2',
    type: 'multi',
    stem: 'I 型超敏反应概念的三个限定包括：',
    options: [
      { key: 'A', text: '已致敏的机体再次接触相同抗原' },
      { key: 'B', text: '由 IgE 抗体介导' },
      { key: 'C', text: '以肥大细胞和嗜碱性粒细胞为主要效应细胞' },
      { key: 'D', text: '由 T 细胞直接杀伤靶细胞' },
    ],
    answer: ['A', 'B', 'C'],
    explain: '选 A、B、C。D 描述的是细胞免疫（IV 型超敏相关机制），与 I 型超敏无关。',
    ref: { moduleId: 'm1', label: '模块一 · 概念', anchor: 'm1-concept' },
    tags: ['概念'],
  },
  {
    id: 'c06-q3',
    type: 'multi',
    stem: '关于变应素（IgE 抗体），符合课件表述的有：',
    options: [
      { key: 'A', text: '由 B 细胞产生' },
      { key: 'B', text: '产生依赖 IL-4' },
      { key: 'C', text: '具有同种组织细胞亲嗜性' },
      { key: 'D', text: '主要存在于血清中且不结合细胞' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C。D 错：IgE 具有同种组织细胞亲嗜性，其 Fc 段会结合到效应细胞表面受体上——这正是“致敏”的物质基础。',
    ref: { moduleId: 'm1', label: '模块一 · 三要素', anchor: 'm1-elements' },
    tags: ['概念'],
  },
  {
    id: 'c06-q4',
    type: 'multi',
    stem: '课件对效应细胞的描述包括：',
    options: [
      { key: 'A', text: '包括肥大细胞和嗜碱性粒细胞' },
      { key: 'B', text: '具有高亲和性 IgE Fc 受体' },
      { key: 'C', text: '可释放出生物活性介质' },
      { key: 'D', text: '能够分泌特异性抗体' },
    ],
    answer: ['A', 'B', 'C'],
    explain: '选 A、B、C。D 错：效应细胞不是抗体产生细胞；抗体（IgE）由 B 细胞产生。效应细胞负责“储存并释放介质”。',
    ref: { moduleId: 'm1', label: '模块一 · 三要素', anchor: 'm1-elements' },
    tags: ['概念'],
  },
  {
    id: 'c06-q5',
    type: 'single',
    stem: '下列哪一项不是课件所列的 I 型超敏反应特征？',
    options: [
      { key: 'A', text: '发生迅速，再次接触过敏原后数分钟内发生' },
      { key: 'B', text: '明显个体差异和遗传倾向' },
      { key: 'C', text: '主要引起生理功能紊乱' },
      { key: 'D', text: '潜伏期长达数周后才发作' },
    ],
    answer: 'D',
    explain:
      '选 D。课件强调“发生迅速，数分钟内发生”，不存在“潜伏数周”这一特征。A、B、C 均为课件原文所列特征。',
    ref: { moduleId: 'm1', label: '模块一 · 特征', anchor: 'm1-features' },
    tags: ['概念'],
  },
  {
    id: 'c06-q6',
    type: 'judge',
    stem: '变应原再次进入机体时，与已经结合在致敏靶细胞上的 IgE 特异性结合，引发细胞脱颗粒反应。',
    answer: true,
    explain: '正确，这是课件机制总述的原文表述。注意顺序：先“已结合在细胞上”，再“再次进入的变应原与其结合”。',
    ref: { moduleId: 'm2', label: '模块二 · 机制总述', anchor: 'm2-overview' },
    tags: ['难点'],
  },
  {
    id: 'c06-q7',
    type: 'single',
    stem: '按课件表述，促使 B 细胞产生 IgE 抗体的关键细胞因子是：',
    options: [
      { key: 'A', text: 'IL-2' },
      { key: 'B', text: 'IL-4' },
      { key: 'C', text: 'IL-5' },
      { key: 'D', text: 'IFN-γ' },
    ],
    answer: 'B',
    explain:
      '选 B。课件原文：Th2 细胞分泌 IL-4，并为 B 细胞活化提供第二信号，促使 B 细胞产生 IgE 抗体。IL-5 主要与嗜酸性粒细胞相关（见模块三）。',
    ref: { moduleId: 'm2', label: '模块二 · IgE 产生', anchor: 'm2-igeproduction' },
    tags: ['难点'],
  },
  {
    id: 'c06-q8',
    type: 'single',
    stem: '在致敏阶段，IgE 与效应细胞结合依靠的是：',
    options: [
      { key: 'A', text: 'IgE 的 Fab 段与 FcεRI 结合' },
      { key: 'B', text: 'IgE 的 Fc 段与 FcεRI 结合' },
      { key: 'C', text: 'IgE 的 Fc 段与抗原结合' },
      { key: 'D', text: 'IgE 的 Fab 段与补体结合' },
    ],
    answer: 'B',
    explain:
      '选 B。课件原文：IgE 的 Fc 段与效应细胞表面的 FcεRI 受体结合，使机体处于致敏状态。Fab 段负责结合抗原（激发阶段），分工不能颠倒。',
    summary: 'Fc 段装弹（结合细胞），Fab 段开火（结合抗原）。',
    ref: { moduleId: 'm2', label: '模块二 · 致敏阶段', anchor: 'm2-sensitization' },
    tags: ['难点'],
  },
  {
    id: 'c06-q9',
    type: 'multi',
    stem: '在激发阶段，变应原再次进入后发生的事件包括：',
    options: [
      { key: 'A', text: '抗原与 IgE Fab 片段结合' },
      { key: 'B', text: 'IgE 交联引起 Fc 段变构' },
      { key: 'C', text: '激活细胞产生刺激信号' },
      { key: 'D', text: 'B 细胞立即大量产生新的 IgE' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C。课件原文：抗原与 IgE Fab 片段结合，IgE 交联引起 Fc 段变构，激活细胞产生刺激信号。D 错：激发阶段是“用已有的 IgE 快速反应”，不是重新生产抗体。',
    ref: { moduleId: 'm2', label: '模块二 · 激发阶段', anchor: 'm2-sensitization' },
    tags: ['难点'],
  },
  {
    id: 'c06-q10',
    type: 'multi',
    stem: '组胺等介质引起的效应包括：',
    options: [
      { key: 'A', text: '毛细血管扩张' },
      { key: 'B', text: '通透性增强' },
      { key: 'C', text: '腺体分泌增加' },
      { key: 'D', text: 'IgE 抗体合成增加' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C，均为课件原文所列。D 错：介质释放是效应阶段的结果，不会反过来在数分钟内增加抗体合成。',
    ref: { moduleId: 'm2', label: '模块二 · 效应阶段', anchor: 'm2-effector' },
    tags: ['难点'],
  },
  {
    id: 'c06-q11',
    type: 'single',
    stem: '变应原皮试的主要目的是：',
    options: [
      { key: 'A', text: '直接治愈过敏性疾病' },
      { key: 'B', text: '查明变应原，以便避免接触' },
      { key: 'C', text: '增加 IgE 抗体水平' },
      { key: 'D', text: '替代脱敏治疗' },
    ],
    answer: 'B',
    explain: '课件原文：（一）变应原皮试——查明变应原，避免接触。它是确定病因的手段，本身不是治疗。',
    ref: { moduleId: 'm3', label: '模块三 · 变应原皮试', anchor: 'm3-avoid' },
    tags: ['重点'],
  },
  {
    id: 'c06-q12',
    type: 'multi',
    stem: '关于脱敏治疗，符合课件表述的有：',
    options: [
      { key: 'A', text: '针对由 IgE 介导的过敏性疾病' },
      { key: 'B', text: '通过反复接触逐渐增加剂量的过敏原提取物' },
      { key: 'C', text: '调节 IgE 和 IgG 抗体生成，影响免疫效应细胞' },
      { key: 'D', text: '一次大剂量注射即可完成' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C。D 与课件表述相反：脱敏治疗强调“**小剂量、多次**”（异种血清脱敏为短期小剂量多次；特异性脱敏为小剂量多次、5~7 天长间隔）。',
    ref: { moduleId: 'm3', label: '模块三 · 脱敏治疗', anchor: 'm3-desensitization' },
    tags: ['重点'],
  },
  {
    id: 'c06-q13',
    type: 'single',
    stem: '奥马珠单抗的作用机制是：',
    options: [
      { key: 'A', text: '特异性结合血清中的 IgE，阻止后续过敏反应' },
      { key: 'B', text: '直接杀死肥大细胞' },
      { key: 'C', text: '阻断 IL-5 与受体结合' },
      { key: 'D', text: '抑制 IL-4 和 IL-13' },
    ],
    answer: 'A',
    explain:
      '选 A。课件原文：奥马珠单抗是一种人源化单克隆抗体，可特异性结合血清中的 IgE，从而阻止后续的过敏反应。C 是美泊利珠单抗、D 是杜普利尤单抗的机制。',
    ref: { moduleId: 'm3', label: '模块三 · 靶向治疗', anchor: 'm3-targeted' },
    tags: ['重点'],
  },
  {
    id: 'c06-q14',
    type: 'sorting',
    stem: '把下列生物制剂与其作用靶点配对：',
    buckets: [
      { id: 'ige', label: '靶向 IgE' },
      { id: 'il5', label: '靶向 IL-5' },
      { id: 'il4', label: '靶向 IL-4 与 IL-13' },
    ],
    items: [
      { id: 'b1', text: '奥马珠单抗（人源化单克隆抗体）', bucket: 'ige' },
      { id: 'b2', text: '美泊利珠单抗（“断粮战术”减少嗜酸性粒细胞）', bucket: 'il5' },
      { id: 'b3', text: '杜普利尤单抗（抑制 Th2 相关细胞因子）', bucket: 'il4' },
    ],
    explain:
      'b1 → 奥马珠单抗靶向 IgE；b2 → 美泊利珠单抗靶向 IL-5（阻碍其与 IL-5Rα 连接）；b3 → 杜普利尤单抗抑制 IL-4 与 IL-13。三个靶点对应机制链条上的不同环节。',
    ref: { moduleId: 'm3', label: '模块三 · 靶向治疗', anchor: 'm3-targeted' },
    tags: ['重点'],
  },
  {
    id: 'c06-q15',
    type: 'single',
    stem: '下列关于三类防治策略的层次，表述最准确的是：',
    options: [
      { key: 'A', text: '避开变应原 → 脱敏建立耐受 → 靶向拦截关键分子' },
      { key: 'B', text: '靶向拦截 → 避开变应原 → 脱敏建立耐受' },
      { key: 'C', text: '脱敏建立耐受 → 靶向拦截 → 避开变应原' },
      { key: 'D', text: '三者完全相同，可任意替换' },
    ],
    answer: 'A',
    explain:
      '选 A。三者作用层次逐渐深入：避开（不改变机体，只改接触）→ 脱敏（改变免疫应答方式，建立耐受）→ 靶向拦截（直接阻断 IgE 或关键细胞因子）。',
    ref: { moduleId: 'm3', label: '模块三 · 策略对比', anchor: 'm3-summary' },
    tags: ['重点'],
  },
]

const classroomQuestions: Question[] = [
  {
    id: 'c06-t2',
    type: 'ordering',
    stem: '把 I 型超敏反应的关键事件按发生顺序排列：',
    scenario: '小组把 6 张事件卡按“初次接触 → 出现症状”的顺序排好，并标出各自属于哪个阶段。',
    items: [
      { id: 's1', text: '抗原递呈细胞摄取变应原并经 MHC II 递呈给 Th2 细胞', hint: 'IgE 产生' },
      { id: 's2', text: 'Th2 细胞分泌 IL-4，促使 B 细胞产生 IgE 抗体', hint: 'IgE 产生' },
      { id: 's3', text: 'IgE 的 Fc 段与效应细胞表面 FcεRI 结合', hint: '致敏阶段' },
      { id: 's4', text: '变应原再次进入，与 IgE 的 Fab 段结合', hint: '激发阶段' },
      { id: 's5', text: 'IgE 交联引起 Fc 段变构，激活细胞', hint: '激发阶段' },
      { id: 's6', text: '脱颗粒释放组胺等，毛细血管扩张、腺体分泌增加', hint: '效应阶段' },
    ],
    explain:
      '正确顺序：摄取递呈 → 产生 IgE → 结合 FcεRI（致敏）→ 变应原结合 Fab（激发）→ 交联变构 → 脱颗粒释放介质（效应）。注意 s3 与 s4 的先后：必须先“装到细胞上”，才可能“在细胞上被抗原交联”。',
    ref: { moduleId: 'm2', label: '模块二 · 三步机制', anchor: 'm2-sensitization' },
    tags: ['课堂任务'],
  },
  {
    id: 'c06-t3',
    type: 'sorting',
    stem: '把下列描述归入 I 型超敏反应的三个要素：',
    scenario: '三要素各司其职，请判断每条描述说的是哪一个。',
    buckets: [
      { id: 'allergen', label: '过敏原（变应原）', hint: '进来的东西' },
      { id: 'ige', label: '变应素（IgE）', hint: '认它的抗体' },
      { id: 'cell', label: '效应细胞', hint: '执行它的细胞' },
    ],
    items: [
      { id: 'e1', text: '吸入性变应原、食物变应原、药物或酶类物质', bucket: 'allergen' },
      { id: 'e2', text: '由 B 细胞产生，产生依赖 IL-4', bucket: 'ige' },
      { id: 'e3', text: '肥大细胞和嗜碱性粒细胞', bucket: 'cell' },
      { id: 'e4', text: '具有高亲和性 IgE Fc 受体', bucket: 'cell' },
      { id: 'e5', text: '具有同种组织细胞亲嗜性', bucket: 'ige' },
    ],
    explain:
      'e1 → 过敏原；e2/e5 → 变应素（IgE 的产生依赖 IL-4、具有同种细胞亲嗜性）；e3/e4 → 效应细胞（种类与受体特征）。',
    ref: { moduleId: 'm1', label: '模块一 · 三要素', anchor: 'm1-elements' },
    tags: ['课堂任务'],
  },
  {
    id: 'c06-t4',
    type: 'sorting',
    stem: '把下列描述归入致敏阶段或激发阶段：',
    scenario: '同样涉及 IgE，但一个用 Fc 段、一个用 Fab 段。请判断。',
    buckets: [
      { id: 'sens', label: '致敏阶段', hint: 'IgE 装到细胞上（用 Fc 段）' },
      { id: 'trig', label: '激发阶段', hint: '变应原交联 IgE（用 Fab 段）' },
    ],
    items: [
      { id: 't1', text: 'IgE 的 Fc 段与效应细胞表面 FcεRI 结合', bucket: 'sens' },
      { id: 't2', text: '变应原与 IgE 的 Fab 片段结合', bucket: 'trig' },
      { id: 't3', text: '此阶段变应原尚未参与', bucket: 'sens' },
      { id: 't4', text: 'IgE 交联引起 Fc 段变构', bucket: 'trig' },
      { id: 't5', text: '机体进入“已致敏”状态，但尚无症状', bucket: 'sens' },
    ],
    explain:
      't1/t3/t5 → 致敏（装弹，无症状）；t2/t4 → 激发（开火）。记忆锚点：**Fc 段装弹、Fab 段开火**。',
    ref: { moduleId: 'm2', label: '模块二 · 致敏与激发', anchor: 'm2-sensitization' },
    tags: ['课堂任务'],
  },
  {
    id: 'c06-t5',
    type: 'sorting',
    stem: '把下列措施归入对应的防治策略：',
    scenario: '三类防治思路的层次不同，请判断每项措施属于哪一类。',
    buckets: [
      { id: 'avoid', label: '查明并避免变应原', hint: '不改变机体' },
      { id: 'desens', label: '脱敏治疗', hint: '建立耐受' },
      { id: 'target', label: '特异性免疫治疗（靶向）', hint: '拦截关键分子' },
    ],
    items: [
      { id: 'm1', text: '变应原皮试，查明后避免接触', bucket: 'avoid' },
      { id: 'm2', text: '小剂量、多次、5~7 天长间隔皮下注射过敏原提取物', bucket: 'desens' },
      { id: 'm3', text: '猫粮中掺入抗 Fel d 1 IgY 抗体', bucket: 'target' },
      { id: 'm4', text: '使用奥马珠单抗结合血清中的 IgE', bucket: 'target' },
      { id: 'm5', text: '异种血清脱敏疗法（短期、小剂量、多次注射）', bucket: 'desens' },
    ],
    explain:
      'm1 → 避免（基础）；m2/m5 → 脱敏（调节 IgE 与 IgG、建立耐受）；m3/m4 → 靶向（中和变应原或中和 IgE）。',
    ref: { moduleId: 'm3', label: '模块三 · 三类策略', anchor: 'm3-summary' },
    tags: ['课堂任务'],
  },
  {
    id: 'c06-t6',
    type: 'multi',
    stem: '一例犬注射某药物后数分钟内出现面部肿胀、呕吐、呼吸急促。下列处置思路有依据的有：',
    scenario: '作为主治兽医，请先判断哪些思路有科学依据，再考虑如何与主人沟通。',
    options: [
      { key: 'A', text: '认识这符合 I 型超敏反应“数分钟内发生”的特征' },
      { key: 'B', text: '把它理解为组胺等介质引起的毛细血管扩张、通透性增强与腺体分泌增加' },
      { key: 'C', text: '立即停用可疑药物并按急症处理' },
      { key: 'D', text: '判断为“免疫力太强”，建议长期使用免疫增强剂' },
      { key: 'E', text: '病情稳定后通过变应原皮试等手段查明原因并避免再次接触' },
    ],
    answer: ['A', 'B', 'C', 'E'],
    explain:
      '选 A、B、C、E。课件指出 I 型超敏反应发生迅速（数分钟内），严重时可发生组织损伤甚至过敏性休克；组胺引起毛细血管扩张、通透性增强、腺体分泌增加。D 错：过敏不是“免疫力弱”，用免疫增强剂没有依据，反而可能有害。',
    summary: '急性过敏：识别要快（数分钟内）、处置要快、查因要准。',
    ref: { moduleId: 'm2', label: '模块二 · 效应阶段', anchor: 'm2-effector' },
    tags: ['课堂任务'],
  },
]

const homeworkQuestions: Question[] = [
  {
    id: 'c06-hb1',
    type: 'single',
    stem: '（基础）I 型超敏反应由哪类抗体介导、以哪类细胞为主要效应细胞？',
    options: [
      { key: 'A', text: 'IgG 介导，中性粒细胞为主要效应细胞' },
      { key: 'B', text: 'IgE 介导，肥大细胞和嗜碱性粒细胞为主要效应细胞' },
      { key: 'C', text: 'IgM 介导，T 细胞为主要效应细胞' },
      { key: 'D', text: 'IgA 介导，巨噬细胞为主要效应细胞' },
    ],
    answer: 'B',
    explain: '课件原文：由 IgE 抗体介导、以肥大细胞和嗜碱性粒细胞为主要效应细胞的超敏反应。',
    ref: { moduleId: 'm1', label: '模块一 · 概念', anchor: 'm1-concept' },
  },
  {
    id: 'c06-hb2',
    type: 'judge',
    stem: '（基础）I 型超敏反应只在首次接触过敏原时发生。',
    answer: false,
    explain: '错误。概念强调“已致敏的机体**再次**接触相同抗原后”发生；首次接触的作用是诱导致敏。',
    ref: { moduleId: 'm2', label: '模块二 · 两次接触', anchor: 'm2-overview' },
  },
  {
    id: 'c06-hb3',
    type: 'multi',
    stem: '（基础）按课件表述，脱敏治疗的作用包括：',
    options: [
      { key: 'A', text: '调节 IgE 和 IgG 抗体生成' },
      { key: 'B', text: '影响免疫效应细胞' },
      { key: 'C', text: '使机体对过敏原产生耐受性' },
      { key: 'D', text: '一次性彻底清除体内所有 IgE' },
    ],
    answer: ['A', 'B', 'C'],
    explain: '选 A、B、C。D 不符合课件表述：脱敏是通过反复、逐渐增加剂量建立耐受，不是一次性清除 IgE。',
    ref: { moduleId: 'm3', label: '模块三 · 脱敏治疗', anchor: 'm3-desensitization' },
  },
  {
    id: 'c06-hb4',
    type: 'ordering',
    stem: '（基础）把 I 型超敏反应的三个阶段排序：',
    items: [
      { id: 'o1', text: 'IgE 产生' },
      { id: 'o2', text: '致敏阶段（IgE 结合 FcεRI）' },
      { id: 'o3', text: '激发阶段（变应原交联 IgE、Fc 段变构）' },
      { id: 'o4', text: '效应阶段（脱颗粒、介质释放）' },
    ],
    explain: '正确顺序：IgE 产生 → 致敏 → 激发 → 效应。前三步都可能在“无症状”状态下完成，只有最后一步产生症状。',
    ref: { moduleId: 'm2', label: '模块二 · 三步机制', anchor: 'm2-sensitization' },
  },
  {
    id: 'c06-ha1',
    type: 'open',
    stem:
      '（提升）一只犬反复发生过敏性皮炎，主人希望“打一针就根治”。请用“致敏—激发—防治层次”写出你的解释与建议（≥ 3 个要点）。',
    explain: '评分要点见参考思路。要求体现：过敏是致敏状态 + 反复接触的结果，无法“一针根治”；三类策略各有定位。',
    guidance: [
      '机制层面：机体已处于致敏状态，IgE 已结合在效应细胞上；只要再次接触变应原就会激发。',
      '因此“根治”的表述不准确：可行目标是“控制症状、减少发作”。',
      '第一层：通过变应原皮试查明诱因并尽量避开（环境管理、食物调整）。',
      '第二层：脱敏治疗需要小剂量、多次、长间隔（5~7 天）坚持，不能一步到位。',
      '第三层：急性期或重症可考虑靶向治疗（如抗 IgE、抗 IL-5、抑制 IL-4/IL-13），但通常需持续给药。',
    ],
    minLength: 60,
    ref: { moduleId: 'm3', label: '模块三 · 策略对比', anchor: 'm3-summary' },
  },
  {
    id: 'c06-ha2',
    type: 'single',
    stem: '（提升）为什么“免疫增强剂”不适合用于治疗 I 型超敏反应？',
    options: [
      { key: 'A', text: '因为过敏是免疫反应过强/失调，而非免疫功能低下' },
      { key: 'B', text: '因为免疫增强剂太贵' },
      { key: 'C', text: '因为过敏与免疫系统无关' },
      { key: 'D', text: '因为免疫增强剂只能用于人' },
    ],
    answer: 'A',
    explain:
      '选 A。I 型超敏反应的本质是针对无害变应原的过度 IgE 应答，治疗方向是“调低/阻断”而非“增强”。用免疫增强剂可能加重反应——这也是“免疫有度”这一主题的临床意义。',
    ref: { moduleId: 'm2', label: '模块二 · 机制', anchor: 'm2-overview' },
  },
  {
    id: 'c06-ha3',
    type: 'sorting',
    stem: '（提升）把下列临床体征归入对应的介质效应：',
    buckets: [
      { id: 'dilate', label: '毛细血管扩张', hint: '局部红、热' },
      { id: 'perme', label: '通透性增强', hint: '水肿、渗出' },
      { id: 'secrete', label: '腺体分泌增加', hint: '流涕、流泪' },
    ],
    items: [
      { id: 'd1', text: '皮肤红斑、局部发热', bucket: 'dilate' },
      { id: 'd2', text: '面部水肿、皮下肿胀', bucket: 'perme' },
      { id: 'd3', text: '流涕、流泪、呼吸道分泌物增多', bucket: 'secrete' },
    ],
    explain:
      'd1 → 毛细血管扩张；d2 → 通透性增强（血浆渗出导致水肿）；d3 → 腺体分泌增加。课件原文正是这三条，把分子事件与临床体征一一对应起来。',
    ref: { moduleId: 'm2', label: '模块二 · 效应阶段', anchor: 'm2-effector' },
  },
  {
    id: 'c06-he1',
    type: 'open',
    stem:
      '（拓展）某猫舍希望通过“喂含抗 Fel d 1 IgY 的猫粮”降低主人过敏。请说明这一思路的原理、优势与局限（≥ 4 个要点）。',
    explain: '开放题。评价重点是把本章机制用到具体方案上，并指出边界。',
    guidance: [
      '原理：抗 Fel d 1 抗体（IgY）在猫口腔/唾液等环境中中和主要变应原 Fel d 1，减少环境中变应原量。',
      '优势：从源头减少变应原暴露，属于“避免接触”这一层思路的产品化实现。',
      '局限一：只针对 Fel d 1，对其他变应原无效。',
      '局限二：效果依赖持续使用与依从性；个体差异明显。',
      '局限三：不能替代急性期治疗；已致敏个体的 IgE 仍然存在。',
    ],
    minLength: 100,
    ref: { moduleId: 'm3', label: '模块三 · 靶向治疗', anchor: 'm3-targeted' },
  },
  {
    id: 'c06-he2',
    type: 'open',
    stem:
      '（拓展）课件指出 IgE 在抵抗血吸虫感染中发挥重要作用，但它同时也介导 I 型超敏反应。请谈谈你对“免疫有度，平衡为要”的理解（≥ 2 个要点）。',
    explain: '开放题。评价重点是能辩证看待同一机制的双重作用，而不是简单否定过敏反应。',
    guidance: [
      '同一机制两种结果：抗寄生虫时是有益的防御，遇到无害变应原时成为烦恼。',
      '“有度”的含义：反应强度与对象要匹配；过强或错靶都会造成损伤。',
      '临床启示：治疗目标是“调控”而非“消灭”——例如靶向 IgE 是降低其水平或阻断其作用，而不是彻底摧毁整个系统。',
      '可补充：这也解释了为什么过敏有明显的个体与遗传倾向（免疫调控的个体差异）。',
    ],
    minLength: 80,
    ref: { moduleId: 'm2', label: '模块二 · IgE 的双重角色', anchor: 'm2-research' },
  },
]

const postTestQuestions: Question[] = [
  {
    id: 'c06-as1',
    type: 'single',
    stem: 'I 型超敏反应的特征性发生时间是：',
    options: [
      { key: 'A', text: '再次接触过敏原后数分钟内' },
      { key: 'B', text: '初次接触后 24—72 小时' },
      { key: 'C', text: '接触后一周左右' },
      { key: 'D', text: '与接触时间无关' },
    ],
    answer: 'A',
    explain: '课件原文：发生迅速，再次接触过敏原后数分钟内发生。24—72 小时是 IV 型（迟发型）超敏的特点，不要混淆。',
    ref: { moduleId: 'm1', label: '模块一 · 特征', anchor: 'm1-features' },
  },
  {
    id: 'c06-as2',
    type: 'judge',
    stem: 'IgE 的 Fc 段与效应细胞表面 FcεRI 结合，使机体处于致敏状态。',
    answer: true,
    explain: '正确。课件原文：IgE 通过其 Fc 段与效应细胞表面受体结合，使机体处于致敏状态。',
    ref: { moduleId: 'm2', label: '模块二 · 致敏阶段', anchor: 'm2-sensitization' },
  },
  {
    id: 'c06-as3',
    type: 'single',
    stem: '美泊利珠单抗的作用靶点是：',
    options: [
      { key: 'A', text: 'IgE' },
      { key: 'B', text: 'IL-5' },
      { key: 'C', text: 'IL-4 与 IL-13' },
      { key: 'D', text: '组胺受体' },
    ],
    answer: 'B',
    explain:
      '选 B。课件指出 IL-5 指挥骨髓生产更多嗜酸性粒细胞；美泊利珠单抗以高亲和力特异性结合 IL-5，阻碍其与 IL-5Rα 连接，通过“断粮战术”减少嗜酸性粒细胞增援。',
    ref: { moduleId: 'm3', label: '模块三 · 靶向治疗', anchor: 'm3-targeted' },
  },
  {
    id: 'c06-as4',
    type: 'multi',
    stem: '关于 I 型超敏反应的防治，符合课件表述的有：',
    options: [
      { key: 'A', text: '变应原皮试可查明变应原以便避免接触' },
      { key: 'B', text: '脱敏治疗通过反复接触逐渐增加剂量的过敏原提取物建立耐受' },
      { key: 'C', text: '特异性免疫治疗包括中和变应原与中和 IgE 等思路' },
      { key: 'D', text: '只要用过一次脱敏治疗就永久不再过敏' },
    ],
    answer: ['A', 'B', 'C'],
    explain: '选 A、B、C。D 不符合课件表述：脱敏需要“小剂量、多次、长间隔”长期坚持，不存在“一次永久有效”。',
    ref: { moduleId: 'm3', label: '模块三 · 预防与治疗', anchor: 'm3-summary' },
  },
  {
    id: 'c06-as5',
    type: 'single',
    stem: '下列哪一项正确描述了组胺等介质的主要效应？',
    options: [
      { key: 'A', text: '引起毛细血管扩张、通透性增强、腺体分泌增加' },
      { key: 'B', text: '直接裂解细菌细胞壁' },
      { key: 'C', text: '促进 IgE 抗体大量合成' },
      { key: 'D', text: '抑制所有免疫细胞活性' },
    ],
    answer: 'A',
    explain: '课件原文：效应阶段——组胺等引起毛细血管扩张、通透性增强、腺体分泌增加。这三条正好对应临床上的红、肿、分泌物增多。',
    ref: { moduleId: 'm2', label: '模块二 · 效应阶段', anchor: 'm2-effector' },
  },
]

export const hypersensitivityQuestionBank: Record<string, Question> = Object.fromEntries(
  [...preClassQuestions, ...moduleQuestions, ...classroomQuestions, ...homeworkQuestions, ...postTestQuestions].map(
    (q) => [q.id, q],
  ),
)

export const hypersensitivityGroups = {
  preClass: preClassQuestions,
  module: moduleQuestions,
  classroom: classroomQuestions,
  homework: homeworkQuestions,
  postTest: postTestQuestions,
}
