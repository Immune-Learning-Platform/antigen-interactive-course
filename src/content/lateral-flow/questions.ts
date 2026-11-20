import type { Question } from '../types'

const preClassQuestions: Question[] = [
  {
    id: 'c07-pre1',
    type: 'single',
    stem: '按课件定义，免疫层析试纸条实现快速检测的关键物理基础是：',
    options: [
      { key: 'A', text: '高压泵驱动液体流动' },
      { key: 'B', text: '毛细作用使样品沿试纸条迁移' },
      { key: 'C', text: '离心力分离' },
      { key: 'D', text: '电场驱动电泳' },
    ],
    answer: 'B',
    explain:
      '选 B。课件原文：利用毛细作用使样品沿试纸条迁移。正因如此，试纸条不需要泵与电源，这是它“便携、现场可用”的物理基础。',
    ref: { moduleId: 'm1', label: '模块一 · 技术概念', anchor: 'm1-concept' },
    tags: ['概念'],
  },
  {
    id: 'c07-pre2',
    type: 'multi',
    stem: '课件列举的免疫层析试纸条常用标记物包括：',
    options: [
      { key: 'A', text: '胶体金' },
      { key: 'B', text: '量子点' },
      { key: 'C', text: '荧光微球' },
      { key: 'D', text: '琼脂糖凝胶' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C。课件原文：以胶体金、量子点、荧光微球等作为标记物。D 错：琼脂糖凝胶常用于电泳与凝胶扩散试验，不是层析试纸条的标记物。',
    ref: { moduleId: 'm1', label: '模块一 · 技术概念', anchor: 'm1-concept' },
    tags: ['概念'],
  },
  {
    id: 'c07-pre3',
    type: 'judge',
    stem: '试纸条上 C 线不显色时，仍可根据 T 线是否显色判断阳性。',
    answer: false,
    explain:
      '错误。课件明确：若 C 线不显色，则说明试纸条无效。C 线是质控线，它不出就说明整个检测过程失败，此时 T 线是否显色都不能作为判据，必须重测。',
    ref: { moduleId: 'm3', label: '模块三 · 结果判定', anchor: 'm3-reading' },
    tags: ['重点'],
  },
  {
    id: 'c07-pre4',
    type: 'open',
    stem: '现场抗原快检只有 C 线显色，但动物症状典型。请写出你会怎样向场方解释，以及下一步做什么（1—2 句话）。',
    scenario: '猪场出现急性死亡病例，快检结果为阴性，场方希望“既然阴性就没事了”。',
    explain:
      '开放题。核心是能指出：阴性只说明本次样品未检出目标物，不能排除感染；需结合取样时机与部位、试剂检出限，并进一步用核酸或病毒分离等手段验证。',
    guidance: [
      '“只有 C 线”代表阴性结果，说明检测过程有效但没有目标物被检出。',
      '阴性 ≠ 未感染：取样时机（病毒载量低）、取样部位、试剂检出限都可能导致假阴性。',
      '下一步：重新取样（深部拭子/多份混合）、核酸检测、病毒分离，并结合临床症状与流行病学。',
      '处置原则：在症状典型的情况下，防控措施应先执行，不能因为一条阴性结果放松。',
    ],
    minLength: 12,
    ref: { moduleId: 'm3', label: '模块三 · 结果判定', anchor: 'm3-reading' },
    tags: ['应用', '情境'],
  },
]

const moduleQuestions: Question[] = [
  {
    id: 'c07-q1',
    type: 'multi',
    stem: '下列关于试纸条结果的说法，符合课件表述的有：',
    options: [
      { key: 'A', text: '阳性样品检测线和质控线同时显色' },
      { key: 'B', text: '阴性样品只有质控线显色' },
      { key: 'C', text: 'C 线不显色说明试纸条无效' },
      { key: 'D', text: '只要 T 线显色就可以判为阳性' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C。D 错：判读必须先看 C 线是否有效——若 C 线不显色，即使 T 线显色也属于无效结果。',
    summary: '判读顺序：先看 C 线有效性，再看 T 线有无目标。',
    ref: { moduleId: 'm3', label: '模块三 · 结果判定', anchor: 'm3-reading' },
    tags: ['重点'],
  },
  {
    id: 'c07-q2',
    type: 'single',
    stem: '免疫层析试纸条检测结果的“可视化”，依赖于：',
    options: [
      { key: 'A', text: '标记物在检测区域富集，形成可见的颜色或荧光信号' },
      { key: 'B', text: '样品本身的颜色' },
      { key: 'C', text: '仪器测定的吸光度曲线' },
      { key: 'D', text: '温度变化' },
    ],
    answer: 'A',
    explain:
      '选 A。课件指出“利用标记物的富集显色实现结果可视化”——标记物在 T/C 线聚集，才形成肉眼可见的信号。这也是“无需仪器”的前提。',
    ref: { moduleId: 'm1', label: '模块一 · 技术概念', anchor: 'm1-concept' },
    tags: ['概念'],
  },
  {
    id: 'c07-q3',
    type: 'single',
    stem: '当试纸条采用“金标抗体”时，该试纸条用于检测：',
    options: [
      { key: 'A', text: '样品中的抗原' },
      { key: 'B', text: '样品中的抗体' },
      { key: 'C', text: '样品中的核酸' },
      { key: 'D', text: '样品中的补体' },
    ],
    answer: 'A',
    explain:
      '选 A。课件把试纸条分为两类：与抗体结合 → 金标抗体 → 检测抗原；与抗原结合 → 金标抗原 → 检测抗体。记忆：测抗原时金标的是抗体。',
    ref: { moduleId: 'm1', label: '模块一 · 胶体金试纸条', anchor: 'm1-gold' },
    tags: ['难点'],
  },
  {
    id: 'c07-q4',
    type: 'ordering',
    stem: '把试纸条的结构按液体流经的先后顺序排列：',
    items: [
      { id: 's1', text: '样品垫（滴样处）' },
      { id: 's2', text: '结合垫（金垫，干燥金标物）' },
      { id: 's3', text: 'NC 膜上的检测线（T 线）' },
      { id: 's4', text: 'NC 膜上的质控线（C 线）' },
      { id: 's5', text: '吸水垫（末端抽水）' },
    ],
    explain:
      '正确顺序：样品垫 → 金垫 → T 线 → C 线 → 吸水垫。注意 T 线在 C 线之前（靠近加样端），这解释了为什么“被 T 线拦截后剩下的才到 C 线”。实际产品中 T 线与 C 线的相对位置可能因设计而异，本顺序对应课件图示。',
    ref: { moduleId: 'm1', label: '模块一 · 试纸条结构', anchor: 'm1-structure' },
    tags: ['重点'],
  },
  {
    id: 'c07-q5',
    type: 'multi',
    stem: '课件把原理拆成的三个环节包括：',
    options: [
      { key: 'A', text: '毛细管作用驱动层析' },
      { key: 'B', text: '抗原抗体特异性结合' },
      { key: 'C', text: '标记物富集，形成可见信号' },
      { key: 'D', text: '高温加热显色' },
    ],
    answer: ['A', 'B', 'C'],
    explain:
      '选 A、B、C。课件明确三环节及各自解决的问题：流动（怎么向前）、特异识别（为什么能检测）、信号显现（为什么肉眼可见）。D 不是课件所列环节。',
    ref: { moduleId: 'm2', label: '模块二 · 三环节', anchor: 'm2-three' },
    tags: ['难点'],
  },
  {
    id: 'c07-q6',
    type: 'single',
    stem: '在双抗体夹心法（检测抗原）中，检测线（T 线）固定的是：',
    options: [
      { key: 'A', text: '金标抗体' },
      { key: 'B', text: '抗该抗原的抗体' },
      { key: 'C', text: '抗待检抗体的抗体' },
      { key: 'D', text: '待检抗原本身' },
    ],
    answer: 'B',
    explain:
      '选 B。课件原文：当抗原-金标抗体复合物泳动到检测线时，被 T 线固定的抗体拦截并聚集。夹心法中 T 线固定的是“抗该抗原的抗体”，与金标抗体从两侧“夹住”同一个抗原。',
    ref: { moduleId: 'm2', label: '模块二 · 双抗体夹心法', anchor: 'm2-sandwich' },
    tags: ['难点'],
  },
  {
    id: 'c07-q7',
    type: 'single',
    stem: '在间接法（检测抗体）中，检测线（T 线）固定的是：',
    options: [
      { key: 'A', text: '金标抗原' },
      { key: 'B', text: '抗待检抗体的抗体' },
      { key: 'C', text: '目标抗原' },
      { key: 'D', text: '补体 C1q' },
    ],
    answer: 'B',
    explain:
      '选 B。课件原文：检测线固定抗待检抗体的抗体（如检测人血清 IgM，则固定抗人 IgM 抗体），而质控线则固定抗 NP 抗原的单抗或多抗。此时金垫上放的是金标抗原。',
    ref: { moduleId: 'm2', label: '模块二 · 间接法', anchor: 'm2-indirect' },
    tags: ['难点'],
  },
  {
    id: 'c07-q8',
    type: 'sorting',
    stem: '把下列描述归入双抗体夹心法或间接法：',
    buckets: [
      { id: 'sand', label: '双抗体夹心法（测抗原）', hint: '金标抗体' },
      { id: 'ind', label: '间接法（测抗体）', hint: '金标抗原' },
    ],
    items: [
      { id: 'i1', text: '金垫上干燥固定的是金标抗体', bucket: 'sand' },
      { id: 'i2', text: '金垫上干燥固定的是金标抗原', bucket: 'ind' },
      { id: 'i3', text: 'T 线固定抗目标抗原的抗体', bucket: 'sand' },
      { id: 'i4', text: 'T 线固定抗待检抗体的抗体', bucket: 'ind' },
      { id: 'i5', text: '形成“金标抗体—抗原—T 线抗体”复合物', bucket: 'sand' },
      { id: 'i6', text: '待检抗体先被 T 线捕获，再被金标抗原结合', bucket: 'ind' },
    ],
    explain:
      'i1/i3/i5 → 夹心法；i2/i4/i6 → 间接法。核心区别：**测抗原时金标的是抗体，测抗体时金标的是抗原**——两端角色互换。',
    ref: { moduleId: 'm2', label: '模块二 · 模式对比', anchor: 'm2-compare' },
    tags: ['难点'],
  },
  {
    id: 'c07-q9',
    type: 'sorting',
    stem: '把四种条带图案归入对应的判读结果：',
    buckets: [
      { id: 'neg', label: '阴性', hint: '仅 C 线显色' },
      { id: 'pos', label: '阳性', hint: 'C 线与 T 线同时显色' },
      { id: 'invalid', label: '无效（须重测）', hint: 'C 线不显色' },
    ],
    items: [
      { id: 'r1', text: '只有质控线（C 线）显色', bucket: 'neg' },
      { id: 'r2', text: '检测线（T 线）与质控线（C 线）同时显色', bucket: 'pos' },
      { id: 'r3', text: '只有检测线（T 线）显色', bucket: 'invalid' },
      { id: 'r4', text: '两条线都不显色', bucket: 'invalid' },
    ],
    explain:
      'r1 → 阴性；r2 → 阳性；r3/r4 → 无效。关键是 r3：虽然 T 线出现了，但 C 线不出就说明质控失败，**不能判为阳性**——这是现场最容易出错的一种情形。',
    ref: { moduleId: 'm3', label: '模块三 · 结果判定', anchor: 'm3-reading' },
    tags: ['重点'],
  },
  {
    id: 'c07-q10',
    type: 'judge',
    stem: '试纸条只有 T 线显色、C 线不显色时，应判为阳性并报告结果。',
    answer: false,
    explain:
      '错误。课件明确：若 C 线不显色，则说明试纸条无效。此时即使 T 线显色也不能采信，必须重测。判读顺序永远是“先看 C 线，再看 T 线”。',
    ref: { moduleId: 'm3', label: '模块三 · 结果判定', anchor: 'm3-reading' },
    tags: ['重点'],
  },
  {
    id: 'c07-q11',
    type: 'single',
    stem: '质控线（C 线）抗体之所以能结合金标抗体，是因为它识别的是：',
    options: [
      { key: 'A', text: '目标抗原的特定表位' },
      { key: 'B', text: '抗体恒定区的物种标志（同种异型差异区域）' },
      { key: 'C', text: '核酸序列' },
      { key: 'D', text: '胶体金颗粒本身' },
    ],
    answer: 'B',
    explain:
      '选 B。课件用抗体遗传标志区域（同种异型差异区域）解释：如鼠源 IgG 的 CH1-CL 基本相同，山羊抗鼠抗体可识别并结合该一抗。因此 C 线抓的是“物种标志”，与目标物是否存在无关——这正是它能作为质控的原因。',
    ref: { moduleId: 'm3', label: '模块三 · 常见问题', anchor: 'm3-why-c' },
    tags: ['难点'],
  },
  {
    id: 'c07-q12',
    type: 'multi',
    stem: '关于课件所引 ASFV 量子点 IgG 抗体试纸条的性能数据，正确的有：',
    options: [
      { key: 'A', text: '敏感性检测最低检测限为 1:250 稀释度' },
      { key: 'B', text: '78 份样品中量子点试纸条阳性检出率为 95%' },
      { key: 'C', text: '商品化试剂盒阳性检出率为 91%' },
      { key: 'D', text: '二者符合率为 95.79%' },
      { key: 'E', text: '该试纸条完全不需要质控线' },
    ],
    answer: ['A', 'B', 'C', 'D'],
    explain:
      '选 A、B、C、D，均为课件原文所列数据。E 错：任何免疫层析试纸条都依赖质控线判断有效性，量子点方案同样如此。',
    ref: { moduleId: 'm3', label: '模块三 · 量子点应用', anchor: 'm3-qd' },
    tags: ['重点'],
  },
  {
    id: 'c07-q13',
    type: 'single',
    stem: '课件指出量子点方案的一个重要价值是：',
    options: [
      { key: 'A', text: '让试纸条不再需要抗原抗体反应' },
      { key: 'B', text: '解决试纸条无法定量的难题' },
      { key: 'C', text: '使检测完全脱离毛细作用' },
      { key: 'D', text: '可以替代所有实验室检测方法' },
    ],
    answer: 'B',
    explain:
      '选 B。课件明确：量子点方案通过检测荧光值（对照 OD 值）“解决试纸条无法定量难题”。A、C 与基本原理矛盾；D 夸大其词——快检与实验室方法各有定位，不能相互替代。',
    ref: { moduleId: 'm3', label: '模块三 · 从定性到定量', anchor: 'm3-quant' },
    tags: ['重点'],
  },
]

const classroomQuestions: Question[] = [
  {
    id: 'c07-t2',
    type: 'sorting',
    stem: '把“解决的三个问题”归入对应的原理环节：',
    scenario: '三个环节各解决一个问题，请判断配对关系。',
    buckets: [
      { id: 'flow', label: '毛细管作用驱动层析', hint: '液体流动' },
      { id: 'recog', label: '抗原抗体特异性结合', hint: '特异识别' },
      { id: 'signal', label: '标记物富集显色', hint: '信号显现' },
    ],
    items: [
      { id: 'q1', text: '样品怎样向前移动？', bucket: 'flow' },
      { id: 'q2', text: '为什么能检测目标物？', bucket: 'recog' },
      { id: 'q3', text: '为什么能用肉眼看到？', bucket: 'signal' },
      { id: 'q4', text: '标记物在检测线聚集形成可见条带', bucket: 'signal' },
      { id: 'q5', text: '微孔膜把液体从样品垫拉向吸水垫', bucket: 'flow' },
    ],
    explain:
      'q1/q5 → 流动（毛细管作用）；q2 → 特异识别（抗原抗体结合）；q3/q4 → 信号显现（标记物富集）。三者缺一不可：不流动就接触不到，不特异就认错，不显色就看不到。',
    ref: { moduleId: 'm2', label: '模块二 · 三环节', anchor: 'm2-three' },
    tags: ['课堂任务'],
  },
  {
    id: 'c07-t3',
    type: 'sorting',
    stem: '把下列描述归入两种检测模式：',
    scenario: '同样一张试纸条，因“谁被金标记”不同而用于检测不同目标。',
    buckets: [
      { id: 'ag', label: '检测抗原（夹心法）', hint: '金标抗体' },
      { id: 'ab', label: '检测抗体（间接法）', hint: '金标抗原' },
    ],
    items: [
      { id: 'm1', text: '金垫上固定金标抗体', bucket: 'ag' },
      { id: 'm2', text: '金垫上固定金标抗原', bucket: 'ab' },
      { id: 'm3', text: '样品中的目标物与金标物形成复合物后被 T 线拦截', bucket: 'ag' },
      { id: 'm4', text: 'T 线先抓住待检抗体，再由金标抗原结合上去', bucket: 'ab' },
      { id: 'm5', text: '适用场景：直接检测病原本身', bucket: 'ag' },
      { id: 'm6', text: '适用场景：检测机体是否产生过相应抗体', bucket: 'ab' },
    ],
    explain:
      'm1/m3/m5 → 夹心法测抗原；m2/m4/m6 → 间接法测抗体。抓住角色互换：测抗原时金标的是抗体，测抗体时金标的是抗原。',
    ref: { moduleId: 'm2', label: '模块二 · 模式对比', anchor: 'm2-compare' },
    tags: ['课堂任务'],
  },
  {
    id: 'c07-t4',
    type: 'single',
    stem: '液体沿试纸条推进时，若样品中不含目标物，仍然会出现显色的是：',
    options: [
      { key: 'A', text: '只有 T 线' },
      { key: 'B', text: '只有 C 线' },
      { key: 'C', text: 'T 线和 C 线都出现' },
      { key: 'D', text: '都不出现' },
    ],
    answer: 'B',
    explain:
      '选 B。未被 T 线拦截的金标抗体继续前移，被 C 线拦截显色——所以阴性样品仍然是“只有 C 线显色”。这正是 C 线作为质控的意义：它证明金标物确实流动到了这里且有活性。',
    ref: { moduleId: 'm3', label: '模块三 · 结果判定', anchor: 'm3-reading' },
    tags: ['课堂任务'],
  },
  {
    id: 'c07-t5',
    type: 'sorting',
    stem: '把四种情形归入“阴性 / 阳性 / 无效”：',
    scenario: '现场判读最容易出错的是“只有 T 线”。请先想清楚再作答。',
    buckets: [
      { id: 'neg', label: '阴性' },
      { id: 'pos', label: '阳性' },
      { id: 'invalid', label: '无效（须重测）' },
    ],
    items: [
      { id: 'p1', text: '仅 C 线显色', bucket: 'neg' },
      { id: 'p2', text: 'C 线与 T 线同时显色', bucket: 'pos' },
      { id: 'p3', text: '仅 T 线显色', bucket: 'invalid' },
      { id: 'p4', text: '无任何条带', bucket: 'invalid' },
    ],
    explain:
      'p1 → 阴性；p2 → 阳性；p3/p4 → 无效。p3 是最容易误判的：T 线出现给人一种“阳性”的错觉，但 C 线不出意味着质控失败，结果不可采信。',
    ref: { moduleId: 'm3', label: '模块三 · 结果判定', anchor: 'm3-reading' },
    tags: ['课堂任务'],
  },
  {
    id: 'c07-t6',
    type: 'multi',
    stem: '某猪场出现疑似疫情，现场抗原快检阴性但症状典型。下列处置思路有依据的有：',
    scenario: '作为技术负责人，请先判断哪些思路有科学依据，再考虑如何向场方说明。',
    options: [
      { key: 'A', text: '认识到阴性只表示本次样品未检出目标物，不等同于排除感染' },
      { key: 'B', text: '考虑取样部位与时机导致病毒载量偏低的可能性' },
      { key: 'C', text: '重新取样（深部拭子、多份混合）并送核酸检测或病毒分离' },
      { key: 'D', text: '既然阴性，立即解除隔离并恢复正常生产' },
      { key: 'E', text: '结合临床症状与流行病学综合判断，必要时先执行防控措施' },
    ],
    answer: ['A', 'B', 'C', 'E'],
    explain:
      '选 A、B、C、E。快检的阴极结果受取样时机、部位与试剂检出限影响，需用更敏感的方法验证。D 把“本次未检出”当作“确定未感染”，在现场防控中是高风险判断。',
    summary: '快检阴性是“本次未检出”，不是“排除感染”。',
    ref: { moduleId: 'm3', label: '模块三 · 结果判定', anchor: 'm3-reading' },
    tags: ['课堂任务'],
  },
]

const homeworkQuestions: Question[] = [
  {
    id: 'c07-hb1',
    type: 'single',
    stem: '（基础）免疫层析试纸条的载体通常是：',
    options: [
      { key: 'A', text: '硝酸纤维素膜（NC 膜）' },
      { key: 'B', text: '玻璃纤维板' },
      { key: 'C', text: '琼脂糖凝胶' },
      { key: 'D', text: '聚丙烯酰胺凝胶' },
    ],
    answer: 'A',
    explain: '课件原文：以胶体金作为示踪标记物，以硝酸纤维素膜为载体，利用微孔膜毛细管作用。',
    ref: { moduleId: 'm1', label: '模块一 · 胶体金试纸条', anchor: 'm1-gold' },
  },
  {
    id: 'c07-hb2',
    type: 'judge',
    stem: '（基础）试纸条的 C 线不显色，说明试纸条无效。',
    answer: true,
    explain: '正确。课件明确：若 C 线不显色，则说明试纸条无效。此时无论 T 线是否显色都不能采信。',
    ref: { moduleId: 'm3', label: '模块三 · 结果判定', anchor: 'm3-reading' },
  },
  {
    id: 'c07-hb3',
    type: 'multi',
    stem: '（基础）课件对原理三环节的表述包括：',
    options: [
      { key: 'A', text: '毛细管作用驱动层析，解决样品怎样向前移动' },
      { key: 'B', text: '抗原抗体特异性结合，解决为什么能检测目标物' },
      { key: 'C', text: '标记物富集形成可见信号，解决为什么肉眼能看到' },
      { key: 'D', text: '高温显色，解决信号放大问题' },
    ],
    answer: ['A', 'B', 'C'],
    explain: '选 A、B、C。D 不是课件所列环节——层析试纸条是常温、无需加热的。',
    ref: { moduleId: 'm2', label: '模块二 · 三环节', anchor: 'm2-three' },
  },
  {
    id: 'c07-hb4',
    type: 'ordering',
    stem: '（基础）把双抗体夹心法检测抗原的过程排序：',
    items: [
      { id: 'o1', text: '样品滴到样品垫，在毛细管作用下前移' },
      { id: 'o2', text: '流经金垫，金标抗体被重新润湿释放' },
      { id: 'o3', text: '样品中若含目标抗原，形成“金标抗体—抗原”复合物' },
      { id: 'o4', text: '复合物被 T 线固定抗体拦截并聚集显色' },
      { id: 'o5', text: '未拦截的金标物被 C 线拦截显色' },
    ],
    explain: '正确顺序：加样 → 释放金标抗体 → 形成复合物 → T 线拦截显色 → C 线拦截显色。',
    ref: { moduleId: 'm2', label: '模块二 · 双抗体夹心法', anchor: 'm2-sandwich' },
  },
  {
    id: 'c07-ha1',
    type: 'open',
    stem:
      '（提升）某养殖场希望用试纸条监测猪群是否感染某病毒。请判断应选夹心法还是间接法，并说明理由与局限（≥ 3 个要点）。',
    explain: '评分要点见参考思路。要求体现：检测目标（抗原 or 抗体）决定模式选择，且各有时间窗局限。',
    guidance: [
      '若目标是“是否正在感染”→ 检测抗原 → 选双抗体夹心法（金标抗体）。',
      '若目标是“是否感染过/免疫效果”→ 检测抗体 → 选间接法（金标抗原）。',
      '局限一：抗原检测受病毒载量与取样时机影响，感染早期或后期可能假阴性。',
      '局限二：抗体检测存在窗口期——感染初期尚未产生抗体，可能假阴性。',
      '建议：两种模式或与核酸检测配合使用，形成互补。',
    ],
    minLength: 60,
    ref: { moduleId: 'm2', label: '模块二 · 模式对比', anchor: 'm2-compare' },
  },
  {
    id: 'c07-ha2',
    type: 'single',
    stem: '（提升）为什么质控线（C 线）的显色不依赖于样品中是否存在目标物？',
    options: [
      { key: 'A', text: '因为 C 线抗体识别的是金标抗体的物种标志，而非目标抗原' },
      { key: 'B', text: '因为 C 线本身含有底物' },
      { key: 'C', text: '因为 C 线由仪器控制显色' },
      { key: 'D', text: '因为 C 线只在阳性时激活' },
    ],
    answer: 'A',
    explain:
      '选 A。C 线抗体识别金标抗体的恒定区（如鼠源 IgG 的 CH1-CL），因此只要金标抗体流过就能被抓住显色，与目标物无关——这正是它作为独立质控的原因。',
    ref: { moduleId: 'm3', label: '模块三 · 常见问题', anchor: 'm3-why-c' },
  },
  {
    id: 'c07-ha3',
    type: 'sorting',
    stem: '（提升）把量子点方案的研制环节归入“试剂制备 / 试纸条优化 / 性能评价”：',
    buckets: [
      { id: 'prep', label: '试剂制备', hint: '抗原表达纯化与偶联' },
      { id: 'opt', label: '试纸条优化', hint: '包被浓度与检测条件' },
      { id: 'eval', label: '性能评价', hint: '特异性/敏感性/重复性' },
    ],
    items: [
      { id: 'd1', text: '质粒构建、诱导表达、蛋白纯化与浓缩', bucket: 'prep' },
      { id: 'd2', text: '量子点与抗体偶联', bucket: 'prep' },
      { id: 'd3', text: 'NC 膜抗原包被浓度的确定', bucket: 'opt' },
      { id: 'd4', text: '阴阳性诊断标准确定', bucket: 'eval' },
      { id: 'd5', text: '特异性、敏感性、重复性评价', bucket: 'eval' },
    ],
    explain:
      'd1/d2 → 试剂制备；d3 → 试纸条优化；d4/d5 → 性能评价。课件给出的评价指标还包括最低检测限（1:250）与与商品化试剂盒的符合率（95.79%）。',
    ref: { moduleId: 'm3', label: '模块三 · 量子点应用', anchor: 'm3-qd' },
  },
  {
    id: 'c07-he1',
    type: 'open',
    stem:
      '（拓展）某养殖集团希望建立“场内快速筛查 + 实验室确证”的检测体系。请设计一个方案框架（≥ 4 个要点），并说明为什么不能只用快检。',
    explain: '开放题，按“分层设计合理 + 意图清楚 + 局限意识”三方面评价。',
    guidance: [
      '第一层（场内）：免疫层析快检，用于日常筛查与疑似病例快速初判，优势是快、便携、无需仪器。',
      '第二层（实验室）：核酸或病毒分离等确证方法，用于验证快检结果与病原分型。',
      '分流规则：快检阳性 → 送检确证并先执行隔离；快检阴性但症状典型 → 也应送检。',
      '为什么不能只用快检：灵敏度受载量与取样时机限制，存在假阴性；无法分型与定量；对早期感染可能窗口期不敏感。',
      '配套：记录与可追溯、人员培训（尤其“先看 C 线”的判读规范）、试剂批间一致性监测。',
    ],
    minLength: 100,
    ref: { moduleId: 'm3', label: '模块三 · 结果判定', anchor: 'm3-reading' },
  },
  {
    id: 'c07-he2',
    type: 'open',
    stem:
      '（拓展）课件指出国家政策支持新型诊断方法开发，推动检测装备向“智能、高效、精准、多功能集成”方向升级。请谈谈这对兽医检测工作者的能力要求（≥ 2 个要点）。',
    explain: '开放题。评价重点是能把技术趋势转化成个人能力项，而不是空谈产业。',
    guidance: [
      '判读与质控能力：理解 T/C 线逻辑、识别无效结果、知道假阴性与假阳性的来源。',
      '方法选择与组合能力：知道快检与方法学确证各自定位，能设计分层检测方案。',
      '数据与设备能力：定量化、智能化设备意味着要会读数据、会做趋势判断，而不只是看“有没有”。',
      '规范与责任意识：检测结果直接影响防控决策，记录、复核、报告都必须规范。',
    ],
    minLength: 80,
    ref: { moduleId: 'm3', label: '模块三 · 从定性到定量', anchor: 'm3-quant' },
  },
]

const postTestQuestions: Question[] = [
  {
    id: 'c07-as1',
    type: 'single',
    stem: '免疫层析试纸条的液体流动依靠：',
    options: [
      { key: 'A', text: '毛细管作用' },
      { key: 'B', text: '外加压力泵' },
      { key: 'C', text: '离心力' },
      { key: 'D', text: '电磁驱动' },
    ],
    answer: 'A',
    explain: '课件原文：利用毛细作用使样品沿试纸条迁移；胶体金试纸条利用微孔膜毛细管作用。',
    ref: { moduleId: 'm1', label: '模块一 · 技术概念', anchor: 'm1-concept' },
  },
  {
    id: 'c07-as2',
    type: 'judge',
    stem: '阴性样品的检测结果只有质控线显色。',
    answer: true,
    explain: '正确。课件原文：阴性样品的检测结果只有质控线显色；阳性则为检测线与质控线同时显色。',
    ref: { moduleId: 'm3', label: '模块三 · 结果判定', anchor: 'm3-reading' },
  },
  {
    id: 'c07-as3',
    type: 'single',
    stem: '下列哪一项最可能造成抗原快检的假阴性？',
    options: [
      { key: 'A', text: '取样部位不当或病毒载量低于检出限' },
      { key: 'B', text: '试纸条 C 线正常显色' },
      { key: 'C', text: '操作时严格按说明书加样' },
      { key: 'D', text: '试剂在有效期内使用' },
    ],
    answer: 'A',
    explain:
      '选 A。假阴性常见于取样时机与部位不当、样品中目标物浓度低于检出限，或目标物结构变化导致抗体识别下降。B、C、D 都是规范操作的表现，不会导致假阴性。',
    ref: { moduleId: 'm3', label: '模块三 · 结果判定', anchor: 'm3-reading' },
  },
  {
    id: 'c07-as4',
    type: 'multi',
    stem: '关于免疫层析试纸条，符合课件表述的有：',
    options: [
      { key: 'A', text: '可用胶体金、量子点、荧光微球等作为标记物' },
      { key: 'B', text: '可用于抗原或抗体的快速检测' },
      { key: 'C', text: '通过检测线和质控线进行结果判定' },
      { key: 'D', text: '必须连接电脑才能判读结果' },
    ],
    answer: ['A', 'B', 'C'],
    explain: '选 A、B、C。D 错：胶体金试纸条仅凭肉眼观察条带即可判读，这正是其“现场可用”的优势。',
    ref: { moduleId: 'm1', label: '模块一 · 技术概念', anchor: 'm1-concept' },
  },
  {
    id: 'c07-as5',
    type: 'single',
    stem: '量子点标记方案相对胶体金方案的主要提升在于：',
    options: [
      { key: 'A', text: '可以读取荧光信号，向定量方向延伸' },
      { key: 'B', text: '不再需要抗原抗体反应' },
      { key: 'C', text: '不再需要质控线' },
      { key: 'D', text: '不再需要毛细作用' },
    ],
    answer: 'A',
    explain:
      '选 A。课件指出量子点方案通过检测荧光值（对照 OD 值）“解决试纸条无法定量难题”。B、C、D 都与基本原理矛盾：它仍依赖抗原抗体反应、质控线与毛细作用。',
    ref: { moduleId: 'm3', label: '模块三 · 从定性到定量', anchor: 'm3-quant' },
  },
]

export const lateralFlowQuestionBank: Record<string, Question> = Object.fromEntries(
  [...preClassQuestions, ...moduleQuestions, ...classroomQuestions, ...homeworkQuestions, ...postTestQuestions].map(
    (q) => [q.id, q],
  ),
)

export const lateralFlowGroups = {
  preClass: preClassQuestions,
  module: moduleQuestions,
  classroom: classroomQuestions,
  homework: homeworkQuestions,
  postTest: postTestQuestions,
}
