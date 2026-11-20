import type {
  AssessmentDimension,
  FrontierItem,
  HomeworkTier,
  IdeologyPoint,
  SourceRef,
  TeachingCase,
} from '../types'

const COURSEWARE: SourceRef = { label: '本章课堂教学课件（第八章第三节 · 细胞免疫应答）', note: '课件原文内容。' }
const JANEWAY: SourceRef = {
  label: "Janeway's Immunobiology · Glossary (NCBI Bookshelf NBK10759)",
  url: 'https://www.ncbi.nlm.nih.gov/books/NBK10759/',
  note: '公开教材，用于术语核对与补充知识。',
}

export const cellularCases: TeachingCase[] = [
  {
    id: 'c05-case-1',
    title: '抗体合格却查出结核阳性：问题出在“另一条通路”',
    en: 'When antibody tests miss intracellular bacteria',
    badge: '胞内菌 · 细胞免疫',
    background:
      '某牛场按程序完成免疫、抗体监测合格，但在结核检疫中出现阳性个体。场方质疑：“抗体都合格，怎么还会有结核？”',
    facts: [
      { label: '课件原文', text: '细胞免疫应答针对病毒感染细胞、肿瘤细胞、细菌（胞内菌）等目标。' },
      { label: '课件原文', text: '效应细胞的作用阶段：释放淋巴因子、巨噬细胞活化和释放溶酶体酶、CTL 效应。' },
      { label: '课件原文', text: 'T 细胞免疫应答的应用：检测牛结核。' },
      { label: '课件原文', text: '抗原持续存在时，可致单核/巨噬细胞呈慢性活化状态，局部组织出现纤维化和肉芽肿。' },
    ],
    analysis: [
      {
        title: '第一步：结核分枝杆菌是“胞内菌”',
        body:
          '它被巨噬细胞吞噬后仍能在细胞内存活。抗体作用于细胞外，无法触及细胞内的细菌，因此抗体水平不能代表对结核的保护力。',
      },
      {
        title: '第二步：清除靠的是细胞免疫',
        body:
          '效应 T 细胞（尤其 Th1 类）释放细胞因子活化巨噬细胞，增强其杀伤能力；CTL 也可杀伤被感染的细胞。这就是为什么结核检疫检测的是细胞免疫反应而非抗体。',
      },
      {
        title: '第三步：为什么会有肉芽肿',
        body:
          '抗原持续存在时，单核/巨噬细胞呈慢性活化状态，局部组织出现纤维化和肉芽肿——既是隔离病原的防御结构，也是持续炎症的损伤结果。',
      },
    ],
    task: '请向场方解释三件事：① 为什么抗体合格不能代表防住结核；② 检疫为什么检测细胞免疫；③ 肉芽肿说明了什么。',
    feedback: [
      '能指出结核是胞内菌，抗体够不到。',
      '能说明细胞免疫（Th1 活化巨噬细胞、CTL）才是主要清除机制。',
      '能解释肉芽肿是“抗原持续存在 + 慢性活化”的结果。',
    ],
    sources: [COURSEWARE, JANEWAY],
    moduleIds: ['m1', 'm3'],
    authenticity: '本案例为教学情境，依据课件“细胞免疫对象”“效应阶段”“牛结核检测”内容构建，不对应具体养殖场记录，不含虚构检测数值。',
  },
  {
    id: 'c05-case-2',
    title: '疫苗设计：为什么“有抗原”不等于“有 CTL”',
    en: 'Designing for CTL responses',
    badge: '递呈路线 · 疫苗设计',
    background:
      '某团队开发一种病毒病疫苗，免疫后抗体水平很高，但攻毒保护不理想，尤其缺乏细胞免疫指标。团队怀疑问题出在抗原递呈路线上。',
    facts: [
      { label: '课件原文', text: '内源性抗原加工递呈（与 MHC I 结合，递呈给 CD8⁺ T 细胞）。' },
      { label: '课件原文', text: '外源性抗原加工递呈（与 MHC II 结合，递呈给 CD4⁺ T 细胞）。' },
      { label: '课件原文', text: 'T 细胞活化、增殖和分化是在抗原刺激信号、共刺激信号和细胞因子信号共同作用下完成。' },
      { label: '课件原文', text: 'MHC I+MHC II 表位的合成肽疫苗能够刺激 CD4⁺ T 淋巴细胞增殖分化。' },
    ],
    analysis: [
      {
        title: '第一步：抗体高说明走通了哪条路',
        body:
          '抗体高说明抗原被有效识别、B 细胞被活化——这通常对应外源性抗原经 MHC II 递呈、CD4⁺ T 辅助的过程。',
      },
      {
        title: '第二步：CTL 需要另一条路',
        body:
          '要诱导 CTL，抗原必须进入**内源性递呈途径**，与 MHC I 结合并递呈给 CD8⁺ T 细胞。若抗原只在细胞外被处理，CTL 应答就会偏弱。',
      },
      {
        title: '第三步：还缺“第三信号”',
        body:
          '即使递呈路线对了，还需要合适的细胞因子环境（第三信号）支持 CD8⁺ T 细胞扩增与分化。三者缺一，CTL 应答都上不来。',
      },
    ],
    task: '请给出两条改进建议：一条针对递呈路线，一条针对活化信号，并各说明其依据。',
    feedback: [
      '能指出需要让抗原进入 MHC I 递呈途径（如胞内表达策略）。',
      '能指出需要优化共刺激/细胞因子环境以支持 CD8⁺ T 细胞扩增。',
      '能说明评价指标应包含杀伤活性、CD107a、IFN-γ 等细胞免疫指标。',
    ],
    sources: [COURSEWARE],
    moduleIds: ['m2'],
    authenticity: '本案例为教学情境，围绕课件“两条递呈路线”与“三重信号”设计，不引用未经核实的实验数据。',
  },
  {
    id: 'c05-case-3',
    title: '从“发现”到“治疗”：一条七十年的技术链',
    en: 'From discovery to therapy',
    badge: '科学史 · 技术转化',
    background:
      '一名学生看到课件的历史进程页后提问：1961 年发现胸腺功能，和 2017 年 CAR-T 获批，这两件事有什么关系？',
    facts: [
      { label: '课件原文', text: '1961 Miller 揭示胸腺免疫功能。' },
      { label: '课件原文', text: '1974 年 Zinkernagel、Doherty 发表 MHC 限制性研究。' },
      { label: '课件原文', text: '1984 年 Mak、Davis 等克隆 TCR 相关基因。' },
      { label: '课件原文', text: '2017 年 CAR-T 疗法获批；课件记载 6 岁白血病女孩 Emily 接受治疗后获得完全缓解。' },
    ],
    analysis: [
      {
        title: '第一步：先有“细胞”，才有“受体”',
        body:
          '1961 年揭示胸腺功能，确立了 T 细胞这一主角；1984 年克隆 TCR 基因，才有了可操作的“识别装置”。',
      },
      {
        title: '第二步：理解“限制”，才能突破“限制”',
        body:
          '1974 年的 MHC 限制性研究说明：天然 TCR 只能识别 p-MHC。正因为看清了这个限制，才有可能用工程化受体（CAR）去绕开它。',
      },
      {
        title: '第三步：技术转化的时间尺度',
        body:
          '从 1961 到 2017，五十余年间基础发现逐步累积，最终形成细胞治疗产品。这提示：基础研究与应用之间往往隔着数十年。',
      },
    ],
    task: '请用三句话说明：基础发现（如 MHC 限制性）为什么是 CAR-T 这类技术的前提？',
    feedback: [
      '能说明 MHC 限制性定义了天然 TCR 的识别边界。',
      '能说明 CAR-T 正是通过工程化受体绕开这一边界。',
      '能体现“理解限制 → 才能设计突破”的逻辑。',
    ],
    sources: [COURSEWARE],
    moduleIds: ['m1', 'm3'],
    authenticity: '本案例依据课件历史进程页整理，人物、年份均引自课件原文；情境为教学组织，不虚构史实。',
  },
]

export const cellularHomework: HomeworkTier[] = [
  { id: 'basic', title: '基础层：概念与阶段', level: '基础', minutes: 10, intro: '覆盖概念、三阶段、递呈路线与效应方式。', questionIds: ['c05-hb1', 'c05-hb2', 'c05-hb3', 'c05-hb4'], deliverable: '客观题自动判分，无需提交。' },
  { id: 'advanced', title: '提升层：机制推断', level: '提升', minutes: 15, intro: '练习从“想要什么应答”反推“该走哪条路”。', questionIds: ['c05-ha1', 'c05-ha2', 'c05-ha3'], deliverable: '开放题可保存草稿（本机浏览器）。' },
  { id: 'extended', title: '拓展层：机制应用与思辨', level: '拓展', minutes: 25, intro: '以禽流感为例描述博弈过程，并辩证分析 CAR-T 的突破与风险。', questionIds: ['c05-he1', 'c05-he2'], deliverable: '建议整理成 300 字以内摘要，课堂分享。' },
]

export const cellularAssessment: AssessmentDimension[] = [
  { id: 'knowledge', title: '知识掌握', weight: '40%', basis: '模块随堂小测 + 课后测验正确率', indicators: ['能说出三阶段', '能区分两条递呈路线', '能说明三重信号', '能列举三种效应方式'], source: '本地记录' },
  { id: 'task', title: '任务完成', weight: '20%', basis: '课前预习、模块阅读、清单打卡', indicators: ['课前 4 题全部作答', '三模块均完成阅读', '完成课堂互动 6 项'], source: '本地记录' },
  { id: 'interaction', title: '互动练习', weight: '20%', basis: '课堂互动完成度与首次正确率', indicators: ['免疫突触识别完成', '三阶段排序一次通过', '三重信号归类正确'], source: '本地记录' },
  { id: 'growth', title: '前后测对照', weight: '20%', basis: '课前 vs 课后正确率提升幅度', indicators: ['课后正确率 ≥ 80%', '较课前有提升', '错题已回看'], source: '本地记录' },
]

export const cellularIdeology: IdeologyPoint[] = [
  {
    id: 'c05-ideo-1',
    title: 'MHC 限制性：一个“反直觉”的发现',
    en: 'MHC restriction',
    hook: 'T 细胞识别的不是“外来物”，而是“在自身分子背景下呈现的外来肽”。',
    body: [
      '1974 年 Zinkernagel 与 Doherty 发表 MHC 限制性研究。这个结论在当时并不直观：免疫识别的对象为何要“绑定自身分子”？',
      '正确答案恰恰解释了免疫学的核心难题：如何既识别外来的危险，又不误伤自身。',
    ],
    link: '对应知识点：抗原递呈与 p-MHC（模块二 2.1）。',
    reflection: '如果 T 细胞能直接识别任何外来分子（不需要 MHC），可能带来什么风险？',
  },
  {
    id: 'c05-ideo-2',
    title: '基础研究的“长周期”价值',
    en: 'Long horizon of basic research',
    hook: '1961 到 2017，五十余年间基础发现才走成一种疗法。',
    body: [
      '从胸腺功能（1961）、树突状细胞（1973）、MHC 限制性（1974）、TCR 基因（1984），到 CAR-T 获批（2017），每一步当时都看不到“产品”。',
      '理解这一点，有助于学生建立对基础研究的耐心与尊重。',
    ],
    link: '对应知识点：细胞免疫应答的历史进程（模块一 1.3）。',
    reflection: '如果一项研究短期内看不到应用前景，应该以什么标准判断它值不值得做？',
  },
  {
    id: 'c05-ideo-3',
    title: '双刃剑：保护与损伤同源',
    en: 'Protection and pathology',
    hook: '肉芽肿既是“围墙”，也是“疤痕”。',
    body: [
      '课件指出细胞免疫在 IV 型超敏反应中发挥不利作用：抗原持续存在时，巨噬细胞慢性活化，局部出现纤维化和肉芽肿。',
      '认识这一点，才能理解为什么有些慢性感染的治疗必须在“控制病原”与“控制炎症”之间找平衡。',
    ],
    link: '对应知识点：IV 型超敏反应（模块三 3.2）。',
    reflection: '为什么“免疫反应越强越好”是错误的？请结合肉芽肿的形成说明。',
  },
  {
    id: 'c05-ideo-4',
    title: 'CAR-T：看清限制，才能突破限制',
    en: 'Engineering around a limitation',
    hook: '正因为天然 TCR 只能识别 p-MHC，才有人想到给它换一个“识别器”。',
    body: [
      'CAR-T 的思路不是“让 TCR 更努力”，而是“换一套识别装置”——这是工程思维与基础认知结合的典型。',
      '截至目前，我国体内 CAR-T 领域已有百余家企业布局（课件所引公开报道），说明这条技术路线正在被大量投入。',
    ],
    link: '对应知识点：CAR-T 与细胞治疗（模块三 3.4）。',
    reflection: '在你的专业领域里，有哪个“天然限制”可能通过工程化手段绕开？',
  },
]

export const cellularFrontier: FrontierItem[] = [
  {
    id: 'c05-f-1',
    title: '细胞免疫应答的关键发现链',
    en: 'Milestones in T cell immunology',
    tag: '课件原文',
    body: '课件列出：1961 Miller 揭示胸腺免疫功能；1973 Steinman、Cohn 发现树突状细胞激活 T 细胞；1974 Zinkernagel、Doherty 发表 MHC 限制性研究；1984 Mak、Davis 等克隆 TCR 相关基因；1986 Mosmann、Coffman 提出 Th1/Th2 分类。',
    link: '承接模块一 1.3：这些发现共同构成了本章所有机制的实验基础。',
    source: COURSEWARE,
    level: '课件原文',
  },
  {
    id: 'c05-f-2',
    title: 'CAR-T：从个案到获批',
    en: 'CAR-T from case to approval',
    tag: '课件原文',
    body: '课件记载：CAR-T 治疗取得突破（6 岁白血病女孩 Emily 接受治疗后获得完全缓解）；2017 年 CAR-T 疗法获批；截至 2025 年底，我国体内 CAR-T 领域已有百余家企业布局（课件所引公开报道）。',
    link: '承接模块三 3.4：CAR-T 通过工程化受体突破“只能识别 p-MHC”的限制。',
    source: COURSEWARE,
    level: '课件原文',
  },
  {
    id: 'c05-f-3',
    title: '合成肽疫苗与 T 细胞表位预测',
    en: 'Peptide vaccines and epitope prediction',
    tag: '课件原文',
    body: '课件提到：MHC I+MHC II 表位的合成肽疫苗能够刺激 CD4⁺ T 淋巴细胞增殖分化；利用在线生物信息软件预测筛选的 T 细胞表位研制的抗原肽疫苗均能诱导良好的细胞免疫应答。',
    link: '承接模块二 2.2 与模块三：表位预测的价值在于“选对递呈路线所需的那一段”。',
    source: COURSEWARE,
    level: '课件原文',
  },
  {
    id: 'c05-f-4',
    title: 'CTL 功能的检测指标',
    en: 'Measuring CTL function',
    tag: '课件原文',
    body: '课件给出技术路线：分离 PBMC → 抗原/多肽刺激 → CD8⁺ T 细胞活化扩增；靶细胞感染或抗原负载并荧光标记；流式细胞术检测特异性杀伤活性，并检测 CD107a 脱颗粒、IFN-γ 表达、Granzyme B / Perforin。',
    link: '承接模块三 3.5：这些指标分别反映脱颗粒、细胞因子分泌与杀伤分子释放。',
    source: COURSEWARE,
    level: '课件原文',
  },
  {
    id: 'c05-f-5',
    title: '补充阅读：T 细胞活化的信号细节',
    en: 'Further reading',
    tag: '补充阅读',
    body: '若要系统补齐共刺激分子家族、T 细胞受体信号级联、Th 亚群分化的转录调控等细节，可参阅免疫学通用教材的 T 细胞活化相关章节。本站补充内容均与课件原文分开标注。',
    link: '用于拓展阅读，不作为考核内容。',
    source: JANEWAY,
    level: '补充阅读',
  },
]

export const cellularGlossary = [
  { term: '细胞免疫应答', en: 'Cellular immune response', def: 'T 细胞受抗原刺激后分化、增殖、转化为致敏 T 细胞，通过直接杀伤及所释放细胞因子的协同杀伤作用清除抗原。' },
  { term: '致敏阶段', en: 'Sensitization phase', def: '抗原递呈细胞加工递呈抗原、T 细胞识别 p-MHC 的阶段。' },
  { term: '反应阶段', en: 'Activation/proliferation phase', def: 'T 细胞在抗原刺激信号、共刺激信号与细胞因子信号共同作用下活化、增殖、分化。' },
  { term: '效应阶段', en: 'Effector phase', def: '效应性 T 细胞执行杀伤或辅助功能的阶段。' },
  { term: 'p-MHC', en: 'Peptide-MHC complex', def: '抗原肽与 MHC 分子结合形成的复合物，是 TCR 识别的对象。' },
  { term: 'TCR', en: 'T cell receptor', def: 'T 细胞受体，特异性识别 p-MHC。' },
  { term: 'MHC 限制性', en: 'MHC restriction', def: 'T 细胞只能识别与自身 MHC 分子结合的抗原肽。1974 年由 Zinkernagel 与 Doherty 发表。' },
  { term: '免疫突触', en: 'Immunological synapse', def: 'TCR 识别 p-MHC 后，黏附分子结合增强、结合时间延长，T 细胞与 APC 形成的稳定接触结构。' },
  { term: '内源性抗原递呈', en: 'Endogenous presentation', def: '细胞内来源抗原经加工与 MHC I 类分子结合，递呈给 CD8⁺ T 细胞。' },
  { term: '外源性抗原递呈', en: 'Exogenous presentation', def: '细胞外来源抗原经加工与 MHC II 类分子结合，递呈给 CD4⁺ T 细胞。' },
  { term: '共刺激信号', en: 'Costimulatory signal', def: 'T 细胞活化的第二信号，来自 APC 与 T 细胞表面共刺激分子的互作，决定应答是否真正启动。' },
  { term: 'CTL', en: 'Cytotoxic T lymphocyte', def: '细胞毒性 T 细胞，识别靶细胞表面 p-MHC I 后直接杀伤之。' },
  { term: 'DTH', en: 'Delayed-type hypersensitivity', def: '迟发型超敏反应，由细胞免疫介导；抗原清除后可自行消退，抗原持续时转为慢性损伤。' },
  { term: 'CAR-T', en: 'Chimeric antigen receptor T cell', def: '通过基因工程给 T 细胞装上识别特定靶点的受体，使其能杀伤原本认不出的靶细胞。' },
]

export const cellularChecklist: string[] = [
  '完成课前学习页的 4 道预习任务（含 1 道开放题）',
  '读完模块一，能说出细胞免疫应答的概念与三个阶段',
  '在三维模型中认出 TCR、p-MHC、共刺激分子与细胞因子',
  '能说清“为什么 T 细胞看不到完整抗原”',
  '能区分内源性与外源性抗原递呈路线',
  '能说出三重信号各自决定什么',
  '能列举三种效应方式并各举一例',
  '完成课堂互动 6 项任务',
  '提交课后作业：基础层 + 提升层必做，拓展层选做',
  '在学习评价页查看前后测对照，并回看错题解析',
]
