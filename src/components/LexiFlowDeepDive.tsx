import { useState } from 'react'
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2,
  ClipboardCheck, Code2, ExternalLink, FileCheck2, FileText,
  GitBranch, Layers3, ShieldCheck, Sparkles,
} from 'lucide-react'
import './LexiFlowDeepDive.css'

type DecisionId = 'select' | 'apply' | 'studyday'
type DocumentId = 'prd' | 'functional' | 'ux' | 'ai' | 'verification'

const repo = 'https://github.com/lineana-lyu/lexiflow'
const home = import.meta.env.BASE_URL + '#projects'
const asset = (name: string) => import.meta.env.BASE_URL + 'media/' + name

const stages = [
  { name: 'Select', cn: '选定目标词义', why: '确认正在学习哪一个义项' },
  { name: 'Memorize', cn: '主动回忆', why: '从看得懂转为主动提取' },
  { name: 'Visualize', cn: '个人联想', why: '建立属于自己的记忆线索' },
  { name: 'Apply', cn: '真实表达', why: '用目标词表达原本想说的话' },
  { name: 'Review', cn: '延迟巩固', why: '根据真实回忆结果继续练习' },
]

const decisions: Record<DecisionId, {
  number: string; name: string; sub: string; question: string; thesis: string;
  before: string[]; after: string[]; rationale: string[];
  note: string; code: { label: string; href: string }[]
}> = {
  select: {
    number: '01', name: 'Select', sub: '把重复确认变为一次明确决策',
    question: '为什么用户添加一个生词，却要反复确认它？',
    thesis: '把“确认这个词是什么意思”和“决定什么时候学”拆成两个不同的动作。',
    before: ['选词 / 制卡', '回单词库再次确认', '回今日学习再次确认'],
    after: ['制卡时确认词义、发音和例句', '今日学习直接加入，或从 Pending 批量选入', '下一学习日进入 Memorize'],
    rationale: [
      '学习对象是词义而不只是拼写，制卡时必须明确目标义项。',
      '已确认的卡片再加入计划，不应该重新要求用户确认语义。',
      '阶段推进仍然由确定性规则控制，不能因为减少操作就同日连学。',
    ],
    note: '这是流程与规则改造，不宣称未经测量的转化率或耗时提升。',
    code: [
      { label: 'Select Intake V3', href: repo + '/blob/main/public/select-intake-v3.js' },
      { label: '防重复确认回归检查', href: repo + '/blob/main/scripts/check-select-stage-v3.js' },
      { label: '删除旧确认页面的提交', href: repo + '/commit/6b7e0899ccd865c6dedd7b2abb4aca61b43ba568' },
    ],
  },
  apply: {
    number: '02', name: 'Apply', sub: 'AI 纠错不能替用户做决定',
    question: '同一句话被反复检查却得到不一致的建议，用户还会信任它吗？',
    thesis: '拆开诊断、修改动作和学习通过条件，而不是只使用模型的一个“对 / 错”结论。',
    before: ['用户提交句子', 'AI 给出文本建议', '反馈不稳定或局部替换存在风险'],
    after: ['用户先写自己的表达', '规范化诊断，再单独验证候选修改', '由产品规则判断能否推进，用户决定是否采纳建议'],
    rationale: [
      '词汇运用优先于润色，不把风格偏好误判为必须修改的错误。',
      '定位具体字符区间；不能因局部替换而破坏原本正确的结构。',
      '同一学习项的身份、历史诊断、检查失败和保存状态必须保持明确。',
    ],
    note: '源码包含反馈契约、持久化复检与回归断言；不代表所有模型输出都已达到量化准确率。',
    code: [
      { label: 'Apply 质量规则与检查', href: repo + '/blob/main/scripts/check-apply-quality-v3.js' },
      { label: '结构化诊断契约', href: repo + '/blob/main/lib/sentence-feedback-contract.js' },
      { label: 'Apply 阶段实现', href: repo + '/blob/main/public/apply-stage-v3.js' },
    ],
  },
  studyday: {
    number: '03', name: 'StudyDay', sub: '让每天的学习量可控',
    question: '几天没学习，系统还应该把每天欠下的新词全部堆给用户吗？',
    thesis: '当天计划冻结、到期复习优先；漏学不累积强制新增词债。',
    before: ['固定每日配额', '漏学可能造成任务堆积', '用户难以判断今天先做什么'],
    after: ['按当前学习状态生成当日计划', '先保护应复习内容，再分配新词容量', '当天计划固定，次日重新计算'],
    rationale: [
      '复习与新词不是同一种负担，必须优先保护已有学习成果。',
      'AI 不负责决定复习日期、Review Again 或 Stable 状态。',
      '失败复习允许有限当天修复，但不能用一次补救直接跳回长间隔。',
    ],
    note: '已能审查调度代码和相关回归脚本；实际长期学习效果仍需用户研究验证。',
    code: [
      { label: '产品学习契约', href: repo + '/blob/main/docs/PRODUCT_LEARNING_CONTRACT_V3.md' },
      { label: '学习核心', href: repo + '/blob/main/public/learning-core-v3.js' },
      { label: 'Today Plan', href: repo + '/blob/main/public/today-plan-v3.js' },
    ],
  },
}

const documents: Record<DocumentId, {
  tag: string; title: string; kind: string; summary: string;
  chapters: { title: string; body: string }[];
  link: string; linkLabel: string;
}> = {
  prd: {
    tag: '01 / REQUIREMENTS', title: '产品需求文档 PRD', kind: '当前需求基线',
    summary: '定义目标用户、任务与业务约束，说明 LexiFlow 为什么不只是一款查词或背词工具。',
    chapters: [
      { title: '问题与目标', body: '用户遇词时可以查到意思，但这不等于几天后仍能主动回忆、造句或开口表达。本产品以用户想学的具体词义为学习对象，建立从理解到应用再到长期巩固的路径。' },
      { title: 'MVP 范围', body: 'Windows 本地优先单用户应用；词典查询、词卡、今日学习、五阶段学习、复习与本地数据优先保障可用。AI 是可选辅助，不作为基础学习的强依赖。' },
      { title: '关键约束', body: 'Today 是有限且同日冻结的计划；Select 不重复确认义项；常规跨阶段学习需要跨 StudyDay；AI 不能决定调度、阶段推进或学习者是否真的输入了句子。' },
      { title: '明确的非目标', body: '不把 AI 自由对话代替主动练习；不以词条数量代表掌握；不宣称未经验证的学习效果、留存和模型准确率。' },
    ],
    link: repo + '/blob/main/docs/PRODUCT_LEARNING_CONTRACT_V3.md',
    linkLabel: '查看完整学习契约',
  },
  functional: {
    tag: '02 / BUSINESS RULES', title: '功能规格与业务规则', kind: '研发 / 测试共用',
    summary: '从页面操作下沉到可审查的状态机、跨日规则和异常处理。',
    chapters: [
      { title: '制卡与选词', body: '今日学习内新建词卡：保存并完成 Select，下一学习日才允许 Memorize；侧栏创建先到 Pending，由用户在 Today 显式选入，不再重复确认同一词义。' },
      { title: 'Visualize 与 Apply', body: '用户先形成联想再请求 AI；联想图片先持久保存，明确完成后才迁移阶段。Apply 先由用户输入表达，AI 建议由用户主动采纳，复制词典例句不能作为通关依据。' },
      { title: 'Review', body: 'Review 遵循 1、3、7、16、21 的主动复习梯度；Stable 维护采用 30、45、68、90 的目标间隔，并允许受限的平滑窗口。失败进入 Review Again，重新确认后才继续长期推进。' },
    ],
    link: repo + '/blob/main/docs/RUNTIME_AUTHORITY_V3.md',
    linkLabel: '查看运行时职责与规则',
  },
  ux: {
    tag: '03 / EXPERIENCE', title: '用户旅程与交互设计', kind: '流程与界面',
    summary: '解释从真实遇词到今日学习的两种入口，处理重复动作、反馈与失败兜底。',
    chapters: [
      { title: '直接学习', body: 'Today → 查词 → 选定目标义项并制卡 → 明天进入 Memorize。用户不用在单词库和今日学习之间反复跳转。' },
      { title: '稍后安排', body: '侧栏添加 → 单词库 Pending → Today 批量选词 → 下一学习日 Memorize。将“词义是什么”和“哪天学习”分离。' },
      { title: '状态可解释', body: '选词上限、当日复习压力、AI 服务异常和跳过等状态必须明确提示。截图为真实 Runtime；AI 辅助画面标注固定演示响应时，不冒充线上实时评测。' },
    ],
    link: repo + '/blob/main/public/select-intake-v3.js',
    linkLabel: '查看实际选词交互',
  },
  ai: {
    tag: '04 / AI EVALUATION', title: 'AI 能力与评测设计', kind: '评测方案 / 部分回归证据',
    summary: '把模型是否可信拆成意图、反馈、编辑安全、一致性和失败降级等可验证问题。',
    chapters: [
      { title: '准确性', body: '中英反查需区分目标义项、词性和词形变化；Apply 反馈需要标注具体错误 span、严重程度及修复建议。量化指标需人工标注黄金集后才能报告。' },
      { title: '一致性与安全性', body: '相同输入的反馈需要稳定；可执行修改必须经过额外检查，不能误删已正确的词汇与结构；同句复检也不能改变用户原有意图。' },
      { title: '成本与兜底', body: '本地词典优先；联想只有用户主动请求才触发 AI；AI 失败保留用户草稿，展示具体错误并提供重试或合理跳过。' },
    ],
    link: repo + '/blob/main/scripts/check-apply-quality-v3.js',
    linkLabel: '查看 Apply 回归约束',
  },
  verification: {
    tag: '05 / VALIDATION', title: '测试验收与交付证据', kind: '可追溯检查',
    summary: '区分已经编码的断言、实际运行的自动化检查，以及尚待完成的用户研究。',
    chapters: [
      { title: '源码与自动化', body: '项目以 npm run check 组织运行、词典、学习引擎、UI 等校验，并在 GitHub Actions 持续执行。具体一次检查是否成功，应以该次 Run 的状态为准。' },
      { title: '重点用例', body: '重复确认不可回归；已选词不能当天串联完成五阶段；Apply 复制参考例句不可通关；AI 调用失败不得覆盖输入；学习数据持久化失败不得提前推进状态。' },
      { title: '尚待验证', body: '用户访谈、连续学习留存、学习效果提升、AI 诊断准确率、完整词源覆盖率都不应仅凭代码测试当作已有成果。' },
    ],
    link: repo + '/actions/workflows/learning-check.yml',
    linkLabel: '查看 CI 验收记录',
  },
}

const cases: { id: DecisionId; short: string }[] = [
  { id: 'select', short: '流程重构' }, { id: 'apply', short: 'AI 纠错' }, { id: 'studyday', short: '复习调度' },
]
const docTabs: { id: DocumentId; short: string }[] = [
  { id: 'prd', short: 'PRD' }, { id: 'functional', short: '功能规则' },
  { id: 'ux', short: 'UX 旅程' }, { id: 'ai', short: 'AI 评测' },
  { id: 'verification', short: '测试验收' },
]

function SectionHeader({ number, eyebrow, title, lead }: { number: string; eyebrow: string; title: string; lead: string }) {
  return <div className="lf-section-heading">
    <div className="lf-section-number">{number}</div>
    <div><span className="lf-eyebrow">{eyebrow}</span><h2>{title}</h2><p>{lead}</p></div>
  </div>
}

function ProofLinks({ links }: { links: { label: string; href: string }[] }) {
  return <div className="lf-proof-links">
    {links.map(item => <a href={item.href} key={item.href} target="_blank" rel="noreferrer">
      <GitBranch aria-hidden="true" /><span>{item.label}</span><ArrowUpRight aria-hidden="true" />
    </a>)}
  </div>
}

function DecisionExplorer() {
  const [selected, setSelected] = useState<DecisionId>('select')
  const current = decisions[selected]
  return <div className="lf-decision-explorer">
    <div className="lf-tabs" role="tablist" aria-label="产品决策案例">
      {cases.map(item => <button type="button" key={item.id} role="tab" id={'lf-tab-' + item.id}
        aria-selected={selected === item.id} aria-controls="lf-decision-panel"
        className={selected === item.id ? 'is-selected' : ''}
        onClick={() => setSelected(item.id)}>
        <span>{decisions[item.id].number} / {decisions[item.id].name}</span><strong>{item.short}</strong>
      </button>)}
    </div>
    <div role="tabpanel" id="lf-decision-panel" aria-labelledby={'lf-tab-' + selected} className="lf-decision-body">
      <div className="lf-decision-lead">
        <div><span className="lf-eyebrow">THE QUESTION</span><h3>{current.question}</h3>
          <p>{current.thesis}</p></div>
        <span className="lf-decision-serial">{current.number}</span>
      </div>
      <div className="lf-before-after">
        <div className="lf-before"><div className="lf-flow-head"><span>BEFORE · 原有问题</span><span>历史流程</span></div>
          {current.before.map((step, i) => <div className="lf-flow-step" key={step}><span>{String(i + 1).padStart(2, '0')}</span>{step}</div>)}
        </div>
        <div className="lf-after"><div className="lf-flow-head"><span>AFTER · 当前设计</span><CheckCircle2 aria-hidden="true" /></div>
          {current.after.map((step, i) => <div className="lf-flow-step" key={step}><span>{String(i + 1).padStart(2, '0')}</span>{step}</div>)}
        </div>
      </div>
      <div className="lf-decision-bottom">
        <div><span className="lf-eyebrow">WHY THIS WAY</span><h4>设计判断</h4>
          {current.rationale.map(point => <p key={point}><CheckCircle2 aria-hidden="true" />{point}</p>)}
          <small>{current.note}</small></div>
        <aside><span className="lf-eyebrow">REAL EVIDENCE</span><h4>不是事后编造的故事</h4><ProofLinks links={current.code} /></aside>
      </div>
    </div>
  </div>
}

function DocumentExplorer() {
  const [selected, setSelected] = useState<DocumentId>('prd')
  const current = documents[selected]
  return <div className="lf-docs">
    <div className="lf-doc-nav" role="tablist" aria-label="产品文档目录">
      {docTabs.map(item => <button key={item.id} type="button" role="tab" id={'lf-doc-tab-' + item.id}
        aria-selected={selected === item.id} aria-controls="lf-document-panel"
        className={selected === item.id ? 'is-selected' : ''} onClick={() => setSelected(item.id)}>
        <FileText aria-hidden="true" /><span>{item.short}</span><ArrowRight aria-hidden="true" />
      </button>)}
    </div>
    <div id="lf-document-panel" role="tabpanel" aria-labelledby={'lf-doc-tab-' + selected} className="lf-doc-page">
      <div className="lf-doc-page-heading"><span className="lf-eyebrow">{current.tag}</span><h3>{current.title}</h3>
        <span className="lf-doc-kind">{current.kind}</span><p>{current.summary}</p></div>
      <div className="lf-doc-chapters">
        {current.chapters.map((section, i) => <section key={section.title}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          <div><h4>{section.title}</h4><p>{section.body}</p></div>
        </section>)}
      </div>
      <div className="lf-doc-footer"><div><FileCheck2 aria-hidden="true" /><span>本页为作品集阅读摘要，完整规则以对应源码和正式文档为准。</span></div>
        <a href={current.link} target="_blank" rel="noreferrer">{current.linkLabel}<ArrowUpRight aria-hidden="true" /></a></div>
    </div>
  </div>
}

function VerificationLab() {
  const items = [
    { id: 'select', name: '避免重复确认', kind: '回归断言',
      input: '先在单词库创建并确认某个词义，再从 Today 选择该卡片。',
      expectation: '批量确认只决定学习安排，不再弹出第二个词义确认页面；下一学习日才进入记忆。',
      scope: '源码中有对应自动化断言；不能据此宣称真实用户平均节省的时间。',
      evidence: repo + '/blob/main/scripts/check-select-stage-v3.js' },
    { id: 'apply', name: '防止例句复制通关', kind: '学习质量约束',
      input: '在 Apply 直接复制系统给出的参考例句。',
      expectation: '拒绝将原样复制作为独立表达的学习完成条件，并提示学习者自己表达。',
      scope: '验收依据和检查脚本已存在；本页面只展示规则，不调用实时 AI。',
      evidence: repo + '/blob/main/scripts/check-apply-quality-v3.js' },
    { id: 'review', name: '未完成新词不形成欠债', kind: '调度规则',
      input: '学习者连续多天未完成新词配额后重新进入 Today。',
      expectation: '当天新词容量按当前任务压力计算；到期 Review 受保护，不累积历史新词配额。',
      scope: '学习核心与 StudyDay 回归脚本可查；长期留存效果仍需用户实验。',
      evidence: repo + '/blob/main/scripts/check-studyday-due-v3.js' },
  ]
  const [id, setId] = useState(items[0].id)
  const item = items.find(x => x.id === id) ?? items[0]
  return <div className="lf-verification">
    <div className="lf-verification-tabs" role="tablist" aria-label="评测案例">
      {items.map(x => <button key={x.id} type="button" role="tab" aria-selected={x.id === id} onClick={() => setId(x.id)}
        className={x.id === id ? 'is-selected' : ''}>{x.name}</button>)}
    </div>
    <div className="lf-verification-body">
      <div className="lf-verification-title"><span className="lf-eyebrow">{item.kind}</span><h3>{item.name}</h3>
        <span>检查规则 / 非实时执行</span></div>
      <div className="lf-verification-grid">
        <div><span>01 / TEST INPUT</span><p>{item.input}</p></div>
        <div><span>02 / ACCEPTANCE</span><p>{item.expectation}</p></div>
      </div>
      <div className="lf-verification-foot"><div><ShieldCheck aria-hidden="true" /><p>{item.scope}</p></div>
        <a href={item.evidence} target="_blank" rel="noreferrer">核对原始证据 <ArrowUpRight aria-hidden="true" /></a></div>
    </div>
  </div>
}

export function LexiFlowDeepDive() {
  return <main className="lf-case" id="lf-top">
    <div className="lf-case-hero">
      <div className="lf-hero-inner">
        <div className="lf-hero-meta"><span>INDEPENDENT PRODUCT CASE STUDY</span><span>LEXIFLOW / 2026</span></div>
        <div className="lf-hero-layout">
          <div className="lf-hero-copy">
            <p className="lf-project-no">SELECTED WORK / 01</p>
            <h1>让学过的单词，<br />真正进入表达。</h1>
            <p className="lf-hero-desc">LexiFlow 是一款 Windows 本地优先英语学习应用。从一次真实遇词出发，经过主动回忆、个人联想、原创表达与延迟复习，把「看得懂」推进到「会使用」。</p>
            <div className="lf-hero-tags"><span>产品设计 / 独立开发</span><span>真实 Windows 应用</span><span>AI 能力边界与评测</span></div>
            <div className="lf-hero-actions">
              <a className="lf-button lf-button-primary" href="#lf-decisions">看关键产品决策 <ArrowDown aria-hidden="true" /></a>
              <a className="lf-button lf-button-subtle" href={repo} target="_blank" rel="noreferrer">查看源码 <ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
          <figure className="lf-hero-screen">
            <div className="lf-screen-top"><span /><span /><span /><b>LEXIFLOW · RUNTIME</b></div>
            <img src={asset('lexiflow-real-visualize-grow.png')} alt="LexiFlow 的 Visualize 阶段真实软件界面" />
            <figcaption>真实软件界面 · Visualize 用户先建立联想</figcaption>
          </figure>
        </div>
        <div className="lf-hero-index"><span>WINDOWS / LOCAL FIRST</span><span>2026 · v0.8.7</span><span>SCROLL TO EXPLORE ↓</span></div>
      </div>
    </div>

    <nav className="lf-chapter-nav" aria-label="LexiFlow 案例章节">
      <div>
        <a href="#lf-overview">01 · 产品全貌</a>
        <a href="#lf-decisions">02 · 产品决策</a>
        <a href="#lf-runtime">03 · 真实界面</a>
        <a href="#lf-validation">04 · 评测验收</a>
        <a href="#lf-documents">05 · 产品文档</a>
        <a href="#lf-reflection">06 · 项目复盘</a>
      </div>
    </nav>

    <div className="lf-main-content">
      <section className="lf-section" id="lf-overview">
        <SectionHeader number="01" eyebrow="PRODUCT OVERVIEW" title="一个不是从 AI 开始的产品" lead="先定义用户最终要完成什么，再决定应该由确定性规则、词典或 AI 承担哪部分能力。" />
        <div className="lf-overview">
          <blockquote>用户在查词时「认识」一个词，不意味着隔天还能回忆，更不意味着能把它放进自己真正想说的话里。</blockquote>
          <div className="lf-overview-facts">
            <div><span>FORM</span><strong>Windows App</strong><small>安装版与便携版</small></div>
            <div><span>METHOD</span><strong>5 stages</strong><small>选择 · 记忆 · 联想 · 表达 · 复习</small></div>
            <div><span>PRINCIPLE</span><strong>AI ≠ Authority</strong><small>辅助表达，不决定学习进度</small></div>
          </div>
        </div>
        <div className="lf-journey">
          <div className="lf-journey-title"><span className="lf-eyebrow">LEARNING JOURNEY</span><p>从真实遇词到长期巩固</p></div>
          <div className="lf-stage-track">
            {stages.map((stage, i) => <div key={stage.name} className="lf-stage">
              <span>{String(i + 1).padStart(2, '0')}</span><strong>{stage.name}</strong><small>{stage.cn}</small><p>{stage.why}</p>
            </div>)}
          </div>
          <p className="lf-journey-note">常规学习阶段跨 StudyDay 推进；Stable 是通过 Review 达到的记忆状态，不是第六个学习关卡。</p>
        </div>
      </section>

      <section className="lf-section" id="lf-decisions">
        <SectionHeader number="02" eyebrow="PRODUCT DECISIONS" title="展示取舍，而不仅是功能清单" lead="每个案例都从真实用户问题开始，呈现原有流程、当前设计和可以交叉核对的源码证据。" />
        <DecisionExplorer />
      </section>

      <section className="lf-section" id="lf-runtime">
        <SectionHeader number="03" eyebrow="REAL PRODUCT" title="真实界面，让规则落在体验上" lead="保留产品实际运行画面；下面两幅截图分别用于说明用户先操作，以及 AI 反馈后的界面状态。" />
        <div className="lf-runtime-pair">
          <figure><div className="lf-runtime-img"><img src={asset('lexiflow-real-visualize-grow.png')} alt="Visualize 原始交互的真实截图" loading="lazy" /></div>
            <figcaption><span>01 / LEARNER FIRST</span><strong>先建立自己的记忆联想</strong><p>不在用户打开页面时自动生成 AI 联想。</p></figcaption></figure>
          <figure><div className="lf-runtime-img"><img src={asset('lexiflow-real-apply-checked.png')} alt="Apply AI 辅助后真实页面状态截图" loading="lazy" /></div>
            <figcaption><span>02 / AI ASSISTED</span><strong>表达检查后，用户决定是否采纳</strong><p>此截图对应固定演示响应的真实 UI 状态，不代表实时模型评测。</p></figcaption></figure>
        </div>
        <a className="lf-inline-link" href={home}>返回主站查看五阶段可切换实机图库 <ArrowUpRight aria-hidden="true" /></a>
      </section>

      <section className="lf-section" id="lf-validation">
        <SectionHeader number="04" eyebrow="VALIDATION & EVALUATION" title="把「应该好用」变成可验收的条件" lead="交互案例可切换，但不是模拟生成的测试成绩；将实现断言、自动化运行证据和未完成的用户实验明确分层。" />
        <VerificationLab />
        <div className="lf-caveat"><ClipboardCheck aria-hidden="true" /><p><strong>证据说明：</strong>项目有结构化的自动化测试与 GitHub Actions 工作流。它们可以验证约束、接口和状态一致性，但不能等同于真实用户转化率、长期记忆改善或 AI 质量的统计结论。</p></div>
      </section>

      <section className="lf-section" id="lf-documents">
        <SectionHeader number="05" eyebrow="PRODUCT DOCUMENTS" title="需求、设计、验收，可以继续追溯" lead="把厚重文档变成带目录的阅读体验：先看每份文档的核心规则，需要核实时再进入对应正式文件和代码。" />
        <DocumentExplorer />
      </section>

      <section className="lf-section lf-final" id="lf-reflection">
        <SectionHeader number="06" eyebrow="RETROSPECTIVE" title="项目最重要的收获，是知道边界在哪里" lead="真正的产品能力不仅是上线功能，也包括识别不该让模型承担的业务规则，以及知道证据还缺什么。" />
        <div className="lf-reflection-grid">
          <div><Layers3 aria-hidden="true" /><h3>从功能堆叠转为用户任务</h3><p>Select 改造体现的是用户决策是否必要，而不是把旧弹窗做得更漂亮。</p></div>
          <div><Code2 aria-hidden="true" /><h3>用规则限制不确定性</h3><p>把阶段推进、Review 时间与学习身份交给确定性逻辑，把语言建议交给 AI。</p></div>
          <div><Sparkles aria-hidden="true" /><h3>清楚区分完成与待验证</h3><p>已有软件、源码、自动化检查；还需要独立的用户访谈、学习效果研究和 AI 黄金集测评。</p></div>
        </div>
        <div className="lf-end-links">
          <div><span className="lf-eyebrow">NEXT</span><h3>继续探索项目</h3><p>可以回到作品集查看其他项目，也可以直接检查 LexiFlow 的公开交付。</p></div>
          <div><a className="lf-button lf-button-primary" href={home}><ArrowLeft aria-hidden="true" />返回项目列表</a>
            <a className="lf-button lf-button-subtle" href={repo + '/releases'} target="_blank" rel="noreferrer">Windows 发布版本 <ExternalLink aria-hidden="true" /></a></div>
        </div>
      </section>
    </div>
  </main>
}
