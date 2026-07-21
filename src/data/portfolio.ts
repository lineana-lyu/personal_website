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
  { value: '3', label: '类角色权限设计', accent: 'coral' },
  { value: '8', label: '张业务数据表', accent: 'orange' },
  { value: '10', label: '类场景测试', accent: 'sage' },
  { value: '1', label: '个 0-1 教育 AI MVP', accent: 'violet' },
]

export const aboutPoints = [
  '电子信息专业研二，预计 2027 年 6 月毕业；本科为数据科学与大数据技术专业。',
  '能够把用户问题拆成产品流程、页面、数据、接口、权限与测试任务。',
  '理解大模型能力边界、RAG 链路与 Agent 工作流，并能设计知识库、上下文和兜底策略。',
  '通过 Vibe Coding 推进可运行原型，用实际交互和场景测试验证产品假设。',
]

export const experience = {
  company: '成都世纪超星信息有限公司',
  role: '课程经理',
  period: '2026.05.20 — 至今',
  eyebrow: 'EDUCATION × AI',
  summary:
    '参与高校课程数字化与 AI 教学产品方案，将教师需求转译为产品功能、交付路径与可验证原型。',
  responsibilities: [
    '围绕课程建设、AI 助教、知识图谱和学习任务等场景，参与教师需求沟通与业务梳理。',
    '将业务需求拆解为产品功能、业务流程和交付优先级，参与 AI 教学产品方案设计。',
    '设计 Prompt、知识库、对话流程、能力边界和核心页面原型，协同推进功能验证。',
    '使用 Vibe Coding 辅助原型与功能验证，并根据用户反馈迭代交互流程和 AI 能力配置。',
  ],
}

export const projects: Project[] = [
  {
    id: 'modeling-ai',
    number: '01',
    title: '数学建模 AI 训练系统',
    englishTitle: 'Mathematical Modeling AI Training',
    status: '可运行 MVP 推进中',
    accent: 'cyan',
    tags: ['教育 AI', 'Agent', '0-1 MVP'],
    headline: '不是直接给答案，而是把拆题、训练、反馈与复盘连成可学习的过程。',
    facts: [
      { label: '目标用户', value: '学生 / 教师 / 管理员' },
      { label: '我的角色', value: '产品规划、流程、原型与 PRD' },
      { label: '技术实现', value: 'React + Supabase' },
      { label: '验证状态', value: '8 表 · 3 权限 · 10 类场景测试' },
    ],
    details: [
      { label: '项目背景', value: '学生面对建模题时拆题困难、过程反馈不足；教师逐份点评成本高。' },
      { label: '用户问题', value: '学生不知道下一步如何推进，教师难以在训练过程中提供及时、结构化反馈。' },
      { label: '产品目标', value: '以十步训练为主线，建立选题、AI 辅导、报告、点评和复盘闭环。' },
      { label: '功能架构', value: '学生训练台、教师任务与点评、管理员题库与权限，加上贯穿流程的 AI 辅导。' },
      { label: 'AI 能力设计', value: '将辅导拆为通用/题目模式，组合题目、当前步骤、学生草稿与知识库上下文。' },
      { label: '异常与兜底', value: '设计追问、拒答、公式处理、上下文缺失提示和服务异常后的恢复入口。' },
      { label: '验证方法', value: '按正常、异常和边界场景检查流程、权限、数据状态与 Agent 任务。' },
      { label: '项目结果', value: '已完成核心流程、原型与 PRD，推进可运行 MVP；未将其表述为已上线商业产品。' },
      { label: '复盘与下一步', value: '继续补全真实原型与任务评测集，验证十步训练节奏和教师点评效率。' },
    ],
    flow: ['选题', '理解题意', '问题重述', '变量定义', '假设建立', '模型选择', '求解设计', '结果分析', '报告生成', '点评复盘'],
  },
  {
    id: 'rag-service',
    number: '02',
    title: '扫地机智能客服系统',
    englishTitle: 'RAG Customer Service Assistant',
    status: '已完成可运行原型',
    accent: 'coral',
    tags: ['RAG', '知识库', 'AI 客服'],
    headline: '让答案来自可追溯知识，而不是让模型在不确定时继续猜。',
    facts: [
      { label: '目标场景', value: '使用咨询 / 故障排查 / 维护保养' },
      { label: '我的角色', value: '知识库、检索、Prompt 与评测设计' },
      { label: '技术实现', value: 'LangChain + Chroma + 通义千问' },
      { label: '交互原型', value: 'Streamlit · 历史消息 · 流式输出' },
    ],
    details: [
      { label: '项目背景', value: '扫地机说明书与 FAQ 信息分散，用户在产品使用和故障场景中需要快速定位答案。' },
      { label: '用户问题', value: '关键词不准确时难以查找对应说明；传统检索无法组合多段信息回答具体问题。' },
      { label: '产品目标', value: '搭建问题输入、知识召回、答案生成和无法回答兜底的完整链路。' },
      { label: '功能架构', value: '文档处理、向量检索、Prompt 组装、模型回答、会话历史和兜底提示。' },
      { label: 'AI 能力设计', value: '设计文档切分、Top-k 召回、上下文注入和基于资料作答的 Prompt 约束。' },
      { label: '异常与兜底', value: '召回不足或资料冲突时明确提示无法确认，引导补充型号、现象或转人工/查阅说明。' },
      { label: '验证方法', value: '从召回相关性、回答准确性、幻觉、可执行性和兜底效果五类维度检查。' },
      { label: '项目结果', value: '完成具备历史消息和流式输出的可运行原型，并形成基于错误类型的优化方法。' },
      { label: '复盘与下一步', value: '扩充覆盖不同型号与故障组合的测试集，持续比较切分、Top-k 和 Prompt 策略。' },
    ],
    flow: ['问题输入', '意图与型号信息', 'Top-k 知识召回', 'Prompt 组装', '答案生成', '依据与约束检查', '回答 / 兜底'],
    github: 'https://github.com/lineana-lyu/Intelligent-Customer-Service',
  },
  {
    id: 'news-mvp',
    number: '03',
    title: '仿今日头条新闻系统',
    englishTitle: 'News Product Backend MVP',
    status: '已完成后端核心模块',
    accent: 'orange',
    tags: ['内容产品', '后端实现', '产品技术协作'],
    headline: '把“用户想收藏新闻”继续拆到接口、状态、数据关系和边界规则。',
    facts: [
      { label: '核心用户路径', value: '浏览 → 阅读 → 收藏 → 回看' },
      { label: '我的角色', value: 'MVP 规划与后端模块实现' },
      { label: '技术实现', value: 'FastAPI + MySQL + SQLAlchemy' },
      { label: '验证范围', value: '正常 / 异常 / 边界场景' },
    ],
    details: [
      { label: '项目背景', value: '围绕资讯浏览、内容收藏和历史回看等需求，规划内容产品的基础 MVP。' },
      { label: '用户问题', value: '用户需要稳定完成登录、阅读、收藏与回看；系统需要正确维护各类业务状态。' },
      { label: '产品目标', value: '打通注册登录、新闻列表/详情、收藏和浏览记录的关键用户路径。' },
      { label: '功能架构', value: '用户、认证、新闻、收藏、历史记录模块，以接口和数据模型承接业务规则。' },
      { label: 'AI 能力设计', value: '当前版本未强行加入 AI；为推荐、摘要和语义搜索预留数据与接口基础。' },
      { label: '异常与兜底', value: '覆盖重复收藏、取消收藏、历史记录更新、无效参数和资源不存在等场景。' },
      { label: '验证方法', value: '按正常、异常、边界三层测试接口响应、状态变化与数据一致性。' },
      { label: '项目结果', value: '完成用户、新闻、收藏与历史记录等核心后端模块及接口验证。' },
      { label: '复盘与下一步', value: '先保证内容产品主路径可靠，再按数据条件逐步验证推荐、摘要与语义搜索。' },
    ],
    flow: ['注册 / 登录', '新闻列表', '新闻详情', '收藏 / 取消收藏', '浏览记录更新', '历史回看'],
    github: 'https://github.com/lineana-lyu/toutiao_backend',
  },
]

export const methodSteps = [
  ['01', '识别问题', '先分清用户阻力与业务约束。'],
  ['02', '判断 AI 必要性', '规则能解决的问题不强行使用模型。'],
  ['03', '定义场景与目标', '明确谁在何时完成什么任务。'],
  ['04', '规划 MVP', '用最短闭环验证核心假设。'],
  ['05', '设计输入与知识', '组织模型输入、上下文和知识库。'],
  ['06', '定义能力边界', '把拒答、异常和兜底写进方案。'],
  ['07', '原型与运行验证', '让流程真实走起来，而非停在文档。'],
  ['08', '建立评测', '按任务建立维度、样本与通过条件。'],
  ['09', '按错误类型迭代', '定位问题属于数据、检索、Prompt 还是流程。'],
]

export const capabilities = [
  {
    title: 'AI 产品能力',
    level: '有完整项目实践',
    accent: 'cyan',
    items: ['RAG', 'Agent 工作流', 'Prompt Engineering', '知识库设计', '上下文管理', 'AI 能力边界', '幻觉控制', '基础评测'],
  },
  {
    title: '产品能力',
    level: '能够独立完成方案',
    accent: 'coral',
    items: ['用户场景分析', '需求拆解', 'MVP 规划', '业务流程', '功能架构', 'PRD', '墨刀原型', '测试验收', '指标与版本规划'],
  },
  {
    title: 'AI 应用工具',
    level: '可用于方案与原型验证',
    accent: 'violet',
    items: ['Coze', 'Codex', 'Cursor', 'LangChain', 'Chroma', '大模型 API', 'Hermes（基础了解）'],
  },
  {
    title: '技术基础',
    level: '可用于原型与基础实现',
    accent: 'orange',
    items: ['Python', 'FastAPI', 'MySQL', 'SQLAlchemy', 'React', 'Tailwind CSS', 'Supabase'],
  },
  {
    title: '工程协作',
    level: '能够完成日常协作与排查',
    accent: 'sage',
    items: ['Git', 'Linux', '接口与数据库理解', 'Vibe Coding', '环境配置与基础问题排查'],
  },
  {
    title: '原型与表达工具',
    level: '熟练使用',
    accent: 'cyan',
    items: ['墨刀', 'XMind', 'Excel', 'Visio', 'PowerPoint', 'Word', 'Typora'],
  },
]

export const education = [
  {
    school: '佳木斯大学',
    degree: '电子信息 · 硕士',
    period: '2024.09 — 至今',
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
