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
  { value: '4', label: '个真实产品项目', accent: 'cyan' },
  { value: '1', label: '个 Windows 桌面应用', accent: 'coral' },
  { value: '1', label: '段 AI 产品实习', accent: 'orange' },
  { value: '8', label: '项 VersionFlow 实机验收', accent: 'sage' },
  { value: '2', label: '种 LexiFlow 分发形式', accent: 'violet' },
]

export const aboutPoints = [
  '电子信息硕士，专业前 10%、国家奖学金；本科为数据科学与大数据技术专业，2027 届。',
  '从实际任务出发拆解需求与 MVP 边界：LexiFlow 关注英语主动表达，VersionFlow 聚焦 PCB 修改后的位移追溯。',
  '能将产品设计落实为可验证的成果：已发布 LexiFlow Windows 应用，并完成 VersionFlow v0.0.5 嘉立创 EDA 实机 MVP。',
  '熟悉 Codex、Coze 和基础研发工具，注重用复现案例、运行日志、自动化测试与验收记录驱动问题迭代。',
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
    status: '2026.08—2026.09 · 已发布 Windows v0.8.7',
    accent: 'cyan',
    tags: ['Windows 桌面端', '本地优先', 'AI 容错'],
    headline: '把“认识一个词”，推进到“真的能说出来、写出来”。',
    facts: [
      { label: '目标结果', value: 'Encounter → Apply → Review → Stable' },
      { label: '我的角色', value: '项目负责人 · 产品设计 + 开发' },
      { label: '产品原则', value: '本地优先 · AI 辅助而非学习权威' },
      { label: '交付状态', value: 'v0.8.7 · 安装版 + 便携版' },
    ],
    details: [
      { label: '核心问题', value: '查词之后容易“认识但不会用”；一旦漏学，任务堆积又会进一步降低继续学习的意愿。' },
      { label: '关键机制', value: '用 Select → Memorize → Visualize → Apply → Review 串起学习，并用冻结的 Today 计划避免形成“词汇债务”。' },
      { label: 'AI 边界', value: '用户先联想、先表达，AI 再辅助具体化和修正；AI 不决定阶段、复习时间和 Today 成员。' },
      { label: '工程取舍', value: '词典与学习数据本地优先；AI 失败时仍可查词、编辑、上传图片或跳过，不让在线能力阻塞学习。' },
      { label: '交付结果', value: '已公开发布 Windows v0.8.7，提供安装版与便携版；仓库使用 npm run check 与 GitHub Actions 对学习引擎、词典和界面交互进行自动化验收。' },
    ],
    flow: ['Encounter / 查词', 'Understand / 选义', 'Select', 'Memorize', 'Visualize', 'Apply', 'Review', 'Stable'],
    github: 'https://github.com/lineana-lyu/lexiflow',
    release: 'https://github.com/lineana-lyu/lexiflow/releases/tag/v0.8.7',
    docs: [
      { label: '产品学习契约', href: 'https://github.com/lineana-lyu/lexiflow/blob/main/docs/PRODUCT_LEARNING_CONTRACT_V3.md' },
      { label: '运行时职责边界', href: 'https://github.com/lineana-lyu/lexiflow/blob/main/docs/RUNTIME_AUTHORITY_V3.md' },
      { label: '自动化检查', href: 'https://github.com/lineana-lyu/lexiflow/actions/workflows/learning-check.yml' },
    ],
    evidence: [
      { label: '公开交付', value: 'Windows v0.8.7', note: '安装版 + 便携版' },
      { label: '学习规则', value: '5 个持久化阶段', note: 'Select → Review' },
      { label: '质量保障', value: '13 组专项回归', note: '另有 5 类真实词典验收' },
      { label: 'AI 边界', value: 'Coach, not authority', note: '不决定阶段、复习与 Today' },
    ],
  },
  {
    id: 'versionflow',
    number: '02',
    title: 'VersionFlow · PCB 器件位移追溯',
    englishTitle: 'JLCEDA / EasyEDA Pro · Experimental Extension MVP',
    status: '2026.09—至今 · v0.0.5 实验性 MVP',
    accent: 'sage',
    tags: ['EDA 插件', 'MVP 技术验证', 'SDD / 验收闭环'],
    headline: '让多次 PCB 修改后的器件位置变化，有迹可循。',
    facts: [
      { label: '目标用户任务', value: '查明同一器件跨 Checkpoint 的两段位移' },
      { label: '我的角色', value: '项目负责人 · 产品设计 + 开发' },
      { label: '测试环境', value: '嘉立创 EDA 专业版 3.2.203 / Windows' },
      { label: '当前范围', value: 'v0.0.5 · 单窗口 / 手动 Checkpoint / 位移查询' },
    ],
    details: [
      { label: '问题与优先级', value: 'PCB 多次修改后，用户难以迅速解释某个器件从原始位置移动到了哪里。先验证位移追溯，而非一次性承诺完整的版本管理与生产影响判断。' },
      { label: '方案与链路', value: '通过 EDA 扩展 API 读取当前 PCB，手动创建 Initial Baseline 与 Checkpoint；使用内部器件 ID 关联三次快照，按位号查询两段 x/y 位移。' },
      { label: '技术 Spike 与验证', value: '先用 EDA Bridge 检验真实文档读取和对象解析，再实现可导入扩展。v0.0.5 在测试 PCB 中通过 A1–A8 实机验收，其中 A8 是“重复 Baseline 被拒绝且历史不推进”。' },
      { label: '已实现与局限', value: '实测 1 个 R1 器件，Initial Baseline + 2 次 Checkpoint 形成 3 个历史节点；完成查询与 EDA 重启恢复。真实存储写入失败仅通过离线模拟验证。' },
      { label: '未实现与下一步', value: '自动实时差异、全对象语义 Diff、采购/生产影响提示、跨窗口并发提交及用户价值验证仍未完成；后续应先开展用户访谈和效率对照。' },
    ],
    flow: ['打开测试 PCB', '读入组件坐标', 'Initial Baseline', 'Checkpoint 1', 'Checkpoint 2', '按位号检索', '位移追溯', '重启恢复'],
    docs: [
      { label: '实验 MVP 验收记录', href: 'https://github.com/lineana-lyu/personal_website/blob/main/docs/versionflow/acceptance.md' },
      { label: '产品边界与后续验证', href: 'https://github.com/lineana-lyu/personal_website/blob/main/docs/versionflow/product-brief.md' },
    ],
    evidence: [
      { label: '实机检查', value: 'A1–A8', note: '单窗口测试链路；A8 为重复 Baseline 拒绝' },
      { label: '历史节点', value: '3', note: 'Baseline + 2 Checkpoints' },
      { label: '已验证位移', value: '2 段', note: '同一 R1 内部 ID 连续追踪' },
      { label: '恢复验证', value: '重启一致', note: '嘉立创 EDA 3.2.203 实测' },
    ],
  },
  {
    id: 'robot-service',
    number: '03',
    title: '扫地机用户服务助手',
    englishTitle: 'Robot Vacuum User Service Assistant',
    status: '2026.04—2026.05 · 已完成可运行 Demo',
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
    number: '04',
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
    title: '产品需求与原型',
    level: '从任务拆解到实验性 MVP',
    accent: 'cyan',
    items: ['用户任务', 'MVP 范围', '业务流程', 'PRD / SDD', '验收条件', 'Coze 原型'],
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
    title: '应用交付与技术验证',
    level: 'Windows 应用交付 + EDA 实验性插件',
    accent: 'sage',
    items: ['Windows / Electron', 'EDA 扩展 API', '技术 Spike', '本地优先架构', '自动化验收', 'Codex'],
  },
]

export const education = [
  {
    school: '佳木斯大学',
    degree: '电子信息 · 硕士',
    period: '2024.09 — 2027.06',
    note: '专业前 10% · 国家奖学金 · 预计 2027.06 毕业',
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
