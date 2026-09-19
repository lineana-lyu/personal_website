export type Accent = 'cyan' | 'coral' | 'orange' | 'sage' | 'violet'

export type Project = {
  id: string
  number: string
  title: string
  englishTitle: string
  status: string
  accent: Accent
  tags: string[]
  headline: string
  facts: { label: string; value: string }[]
  details: { label: string; value: string }[]
  flow: string[]
  github?: string
  release?: string
  docs?: { label: string; href: string }[]
  evidence?: { label: string; value: string; note?: string }[]
}

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Contact', href: '#contact' },
]

export const profileMetrics = [
  { value: '3', label: '个核心产品项目', accent: 'cyan' },
  { value: '1', label: '个 Windows 桌面应用', accent: 'coral' },
  { value: '1', label: '段 AI 产品实习', accent: 'orange' },
  { value: '6', label: '份扫地机知识资料', accent: 'sage' },
  { value: '2', label: '种 LexiFlow 分发形式', accent: 'violet' },
]

export const aboutPoints = [
  '电子信息硕士，预计 2027 年 6 月毕业；本科为数据科学与大数据技术专业。',
  '能够从具体用户场景判断哪些问题适合知识问答、哪些任务需要固定流程，并明确 AI 应出现的位置。',
  '可在给定需求下梳理用户任务、功能流程与页面信息，并使用 Coze 或代码完成可运行原型。',
  '能够理解模型、接口、日志和数据字段在产品方案中的作用，便于与研发确认需求范围和实现边界。',
]

export const experience = {
  company: '成都世纪超星信息有限公司',
  role: 'AI提效产品助理',
  period: '2026.05-2026.08',
  eyebrow: 'EDUCATION × AI',
  summary:
    '参与数学建模课程的 AI 训练原型制作。团队提供主体需求，个人承担训练流程整理与 Coze 演示实现。',
  responsibilities: [
    '以学生完成一次数学建模训练为主线，整理选题、分步训练、AI 指导、报告、批注和复盘等环节，明确原型需要覆盖的主要任务。',
    '根据给定需求配置各阶段的输入内容、任务提示和 AI 反馈，使学生能够按照步骤完成训练，而不是只进行开放式问答。',
    '在 Coze 中串联主要任务节点，完成可运行的内部演示，用于核对训练流程能否连续执行以及 AI 反馈应出现在哪些环节。',
  ],
}

export const projects: Project[] = [
  {
    id: 'lexiflow',
    number: '01',
    title: 'LexiFlow 英语学习应用',
    englishTitle: 'Local-first English Learning Desktop App',
    status: '2026.09—至今 · 已发布 v0.8.6',
    accent: 'cyan',
    tags: ['Windows 桌面端', '本地优先', 'AI 容错'],
    headline: '把“认识一个词”，推进到“真的能说出来、写出来”。',
    facts: [
      { label: '目标结果', value: 'Encounter → Apply → Review → Stable' },
      { label: '我的角色', value: '项目负责人 · 产品设计 + 开发' },
      { label: '产品原则', value: '本地优先 · AI 辅助而非学习权威' },
      { label: '交付状态', value: 'v0.8.6 · 安装版 + 便携版' },
    ],
    details: [
      { label: '核心问题', value: '查词之后容易“认识但不会用”；一旦漏学，任务堆积又会进一步降低继续学习的意愿。' },
      { label: '关键机制', value: '用 Select → Memorize → Visualize → Apply → Review 串起学习，并用冻结的 Today 计划避免形成“词汇债务”。' },
      { label: 'AI 边界', value: '用户先联想、先表达，AI 再辅助具体化和修正；AI 不决定阶段、复习时间和 Today 成员。' },
      { label: '工程取舍', value: '词典与学习数据本地优先；AI 失败时仍可查词、编辑、上传图片或跳过，不让在线能力阻塞学习。' },
      { label: '交付结果', value: '已公开发布 Windows v0.8.6，提供安装版与便携版；仓库用 33 个 check 脚本和 GitHub Actions 做自动验收。' },
    ],
    flow: ['Encounter / 查词', 'Understand / 选义', 'Select', 'Memorize', 'Visualize', 'Apply', 'Review', 'Stable'],
    github: 'https://github.com/lineana-lyu/lexiflow',
    release: 'https://github.com/lineana-lyu/lexiflow/releases/tag/v0.8.6',
    docs: [
      { label: '产品学习契约', href: 'https://github.com/lineana-lyu/lexiflow/blob/main/docs/PRODUCT_LEARNING_CONTRACT_V3.md' },
      { label: '运行时职责边界', href: 'https://github.com/lineana-lyu/lexiflow/blob/main/docs/RUNTIME_AUTHORITY_V3.md' },
      { label: '自动化检查', href: 'https://github.com/lineana-lyu/lexiflow/actions/workflows/learning-check.yml' },
    ],
    evidence: [
      { label: '公开交付', value: 'Windows v0.8.6', note: '安装版 + 便携版' },
      { label: '学习规则', value: '5 个持久化阶段', note: 'Select → Review' },
      { label: '质量保障', value: '33 个 check 脚本', note: '学习引擎 / UI / 构建' },
      { label: 'AI 边界', value: 'Coach, not authority', note: '不决定阶段、复习与 Today' },
    ],
  },
  {
    id: 'robot-service',
    number: '02',
    title: '扫地机用户服务助手',
    englishTitle: 'Robot Vacuum User Service Assistant',
    status: '2026.04—2026.06 · 已完成可运行 Demo',
    accent: 'coral',
    tags: ['RAG', '知识问答', '个性化使用报告'],
    headline: '让用户不用翻说明书，也能快速得到有依据的回答和使用建议。',
    facts: [
      { label: '服务范围', value: '选购 / 操作 / 故障 / 环境 / 保养' },
      { label: '知识范围', value: '6 份扫地机与扫拖机器人资料' },
      { label: '核心链路', value: '知识问答 + 个性化使用报告' },
      { label: '交付物', value: 'Demo · 源码 · 知识资料 · 运行日志' },
    ],
    details: [
      { label: '用户问题', value: '选购、操作、故障和保养信息分散在多份资料里，用户需要反复翻说明书。' },
      { label: '产品拆分', value: '统一入口下分成两条链路：通用知识问答，以及需要补充用户与使用记录的个性化报告。' },
      { label: 'AI 取舍', value: 'RAG 负责“有依据地回答”，Agent 只负责识别任务和调用能力，避免把所有问题都交给模型自由生成。' },
      { label: '验证结果', value: '跑通知识问答与使用报告两条主路径，并通过运行日志核对实际调用链路。' },
    ],
    flow: ['问题输入', '任务识别', '知识检索 / 记录获取', '补全必要上下文', '回答 / 报告生成', '运行日志核对'],
    github: 'https://github.com/lineana-lyu/Intelligent-Customer-Service',
  },
  {
    id: 'news-demo',
    number: '03',
    title: '仿今日头条资讯产品功能 Demo',
    englishTitle: 'News Product Function Demo',
    status: '2026.04—2026.07 · 已完成并公开源码',
    accent: 'orange',
    tags: ['内容产品', '业务规则', '接口与数据状态'],
    headline: '把一个“收藏新闻”的用户动作，拆成接口、状态和数据规则。',
    facts: [
      { label: '用户主流程', value: '登录 → 浏览 → 详情 → 收藏 → 历史' },
      { label: '学习目标', value: '把产品流程与业务规则转成后端能力' },
      { label: '技术实现', value: 'FastAPI + SQLAlchemy + MySQL + Redis' },
      { label: '交付状态', value: '后端 Demo · 源码 · 运行说明' },
    ],
    details: [
      { label: '学习目标', value: '用资讯场景练习把用户动作翻译成后端能力，而不是只实现接口。' },
      { label: '关键规则', value: '收藏要防重复；再次浏览要更新最近时间；页面状态需要和服务端数据保持一致。' },
      { label: '体验支撑', value: '高频列表增加缓存，并统一成功、参数错误和服务异常的返回格式。' },
      { label: '交付结果', value: '完成并公开后端 Demo，可直接说明 User、News、Favorite、History 之间的数据关系。' },
    ],
    flow: ['注册 / 登录', '新闻列表', '新闻详情', '收藏状态检查', '收藏 / 取消收藏', '浏览历史更新', '历史回看'],
    github: 'https://github.com/lineana-lyu/toutiao_backend',
  },
]

export const methodSteps = [
  ['01', '先定义用户任务', '先明确用户在什么场景下要完成什么，而不是从功能或模型出发。'],
  ['02', '判断 AI 是否必要', '知识问答、生成与固定流程分别使用合适的实现方式，不为了 AI 而 AI。'],
  ['03', '确定产品边界', '明确首期覆盖的问题范围、必要输入和不处理的场景。'],
  ['04', '拆解主流程', '把任务拆成连续步骤，并定义每一步需要的输入、状态和反馈。'],
  ['05', '设计异常与兜底', '把调用失败、信息不足、误判和用户跳过等情况写进正常体验。'],
  ['06', '做可运行原型', '用 Coze 或代码让关键链路真实跑起来，而不是只停留在流程图。'],
  ['07', '写成验收条件', '把操作路径、页面状态、异常提示与预期结果转成可逐项核对的条件。'],
  ['08', '看日志与结果', '通过运行日志、接口结果和典型样例核对任务是否调用了正确能力。'],
  ['09', '按问题类型迭代', '区分流程、规则、检索、模型或接口问题，再针对性调整。'],
]

export const capabilities = [
  {
    title: '产品与原型',
    level: '可独立完成需求到 Demo',
    accent: 'cyan',
    items: ['用户任务梳理', '功能范围', '主要流程', '页面信息', '验收条件', 'Coze 原型'],
  },
  {
    title: 'AI 产品理解',
    level: '有知识问答与 AI 交互实践',
    accent: 'coral',
    items: ['RAG 知识问答', 'Agent 任务调用', 'Prompt 约束', '能力边界', '运行日志', 'AI 调用兜底'],
  },
  {
    title: '产品技术协作',
    level: '可沟通实现边界并定位基础问题',
    accent: 'violet',
    items: ['模型能力理解', '接口', '日志', '数据字段', '异常状态', '需求范围确认'],
  },
  {
    title: '研发与数据基础',
    level: '可用于 Demo 制作与问题定位',
    accent: 'orange',
    items: ['Python', 'SQL', 'FastAPI', 'SQLAlchemy', 'MySQL', 'Redis', '基础前后端工具'],
  },
  {
    title: '桌面应用与工程实践',
    level: '已有公开 Windows 应用交付',
    accent: 'sage',
    items: ['Windows 桌面应用', '本地优先架构', 'AI 接口容错', '自动化验收', 'Codex', 'GitHub 开源发布'],
  },
]

export const education = [
  {
    school: '佳木斯大学',
    degree: '电子信息 · 硕士',
    period: '2024.09 — 2027.06',
    note: '预计 2027.06 毕业',
  },
  {
    school: '辽宁工程技术大学',
    degree: '数据科学与大数据技术 · 本科',
    period: '2020.09 — 2024.06',
    note: 'GPA 3.012 · 专业前 30%',
  },
]

export const contact = {
  email: 'lineana_lyu@163.com',
  github: 'https://github.com/lineana-lyu',
  githubHandle: 'lineana-lyu',
  phoneMasked: '175 **** 5940',
}
