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
    headline: '把“查到一个词”继续推进到“能主动说出来、写出来”，并让中断后的学习计划仍然可继续。',
    facts: [
      { label: '目标场景', value: '词义确认 → 主动表达 → 持续复习' },
      { label: '我的角色', value: '项目负责人 · 产品设计 + 开发' },
      { label: '技术方向', value: 'Windows 桌面应用 · 本地优先架构' },
      { label: '交付状态', value: 'v0.8.6 · 安装版 + 便携版' },
    ],
    details: [
      { label: '项目背景', value: '针对英语学习者在口语、写作中词汇提取困难的问题，解决查词后难以转化为主动表达、复习计划易中断累积等痛点。' },
      { label: '学习流程重构', value: '将分散的学习与复习入口合并为统一的每日任务流，按到期复习、在学词、新词的优先级排序执行。' },
      { label: '中断恢复', value: '用户中断学习后，系统根据当前进度重排当日计划，避免未完成任务持续堆积导致放弃。' },
      { label: 'AI 交互容错', value: 'AI 仅用于场景具体化和表达修正，不自动覆盖用户输入；调用失败时保留手动编辑、图片上传和跳过选项。' },
      { label: '本地查词策略', value: '基础查词优先使用本地能力，仅在复杂表达解释时调用在线服务，降低网络依赖带来的等待与失败风险。' },
      { label: '问题校验', value: '针对中文反查误选、短语发音截断等问题，以 suit、hair grip 等典型样例建立校验规则并调整匹配逻辑。' },
      { label: '版本交付', value: '把功能改动拆成用户操作路径、页面状态、异常提示与验收条件，借助 Codex 开发后逐项核对。' },
      { label: '项目结果', value: '已从浏览器原型迁移为可安装 Windows 桌面应用，公开发布 v0.8.6，并提供安装版与便携版。' },
    ],
    flow: ['查词 / 选义', '进入每日任务', '记忆与联想', '自主造句', 'AI 辅助修正', '到期复习', '中断后重排'],
    github: 'https://github.com/lineana-lyu/lexiflow',
    release: 'https://github.com/lineana-lyu/lexiflow/releases/tag/v0.8.6',
  },
  {
    id: 'robot-service',
    number: '02',
    title: '扫地机用户服务助手',
    englishTitle: 'Robot Vacuum User Service Assistant',
    status: '2026.04—2026.06 · 已完成可运行 Demo',
    accent: 'coral',
    tags: ['RAG', '知识问答', '个性化使用报告'],
    headline: '把选购、使用、故障与维护资料收进统一问答入口，再把一次性答疑扩展为带上下文的使用建议。',
    facts: [
      { label: '服务范围', value: '选购 / 操作 / 故障 / 环境 / 保养' },
      { label: '知识范围', value: '6 份扫地机与扫拖机器人资料' },
      { label: '核心链路', value: '知识问答 + 个性化使用报告' },
      { label: '交付物', value: 'Demo · 源码 · 知识资料 · 运行日志' },
    ],
    details: [
      { label: '项目定位', value: '面向扫地机用户在选购、首次使用、故障排查和日常保养中反复查资料的问题，验证统一问答入口与个性化使用建议。' },
      { label: '内容边界', value: '首期聚焦选购建议、操作指导、故障处理、环境适配和维护保养，控制 Demo 的服务范围。' },
      { label: '核心功能', value: '将需求拆为通用知识问答与个人使用报告两类：前者按自然语言问题查资料，后者结合户型、地面、清扫表现和耗材状态生成建议。' },
      { label: '服务流程', value: '普通咨询直接进入知识问答；识别到“生成使用报告”后，再依次获取用户、月份与使用记录，补充相关保养建议。' },
      { label: 'AI 方案取舍', value: '用户表达不固定且答案分散在多份资料中，因此采用 RAG 先检索专业资料再组织回答；Agent 主要负责识别任务并调用对应能力。' },
      { label: '体验验证', value: '通过“扫地机器人怎么使用”“生成我的使用报告”等样例跑通两条主路径，并保留运行日志核对能力调用是否正确。' },
      { label: '项目结果', value: '完成可运行 Demo、公开源码、知识资料和运行日志，形成可展示的 AI 产品原型与流程验证记录。' },
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
    headline: '把“浏览—收藏—回看”拆到接口、状态和数据关系，理解产品规则如何落到后端能力。',
    facts: [
      { label: '用户主流程', value: '登录 → 浏览 → 详情 → 收藏 → 历史' },
      { label: '学习目标', value: '把产品流程与业务规则转成后端能力' },
      { label: '技术实现', value: 'FastAPI + SQLAlchemy + MySQL + Redis' },
      { label: '交付状态', value: '后端 Demo · 源码 · 运行说明' },
    ],
    details: [
      { label: '项目定位', value: '以资讯浏览场景学习如何把用户流程、页面状态和业务规则转成可供前端调用的产品能力。' },
      { label: '用户主流程', value: '围绕注册登录、浏览新闻列表、查看详情与相关内容、收藏文章和回看历史记录，拆分主要模块与接口。' },
      { label: '状态规则', value: '收藏功能增加重复检查；同一用户再次查看同一新闻时更新最近浏览时间，保持收藏与历史状态符合用户操作逻辑。' },
      { label: '列表体验', value: '对新闻分类与列表等高频读取内容增加缓存，并统一成功、参数错误与服务异常的返回格式，便于前端展示和问题定位。' },
      { label: '项目结果', value: '完成并公开后端 Demo 源码与运行说明，可结合代码说明用户、内容、收藏和历史之间的数据关系。' },
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
