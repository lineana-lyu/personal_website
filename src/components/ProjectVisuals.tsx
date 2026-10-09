import {
  ArrowRight,
  BookOpen,
  Bot,
  Bookmark,
  CheckCircle2,
  Database,
  FileText,
  History,
  Image as ImageIcon,
  PenLine,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react'
import type { Project } from '../data/portfolio'

function StepRail({ items }: { items: { icon: React.ElementType; label: string; note?: string }[] }) {
  return (
    <div className="mechanism-steps" role="list">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <div className="mechanism-step" role="listitem" key={item.label}>
            <div className="mechanism-step__icon"><Icon aria-hidden="true" /></div>
            <div className="mechanism-step__copy">
              <strong>{item.label}</strong>
              {item.note && <small>{item.note}</small>}
            </div>
            {index < items.length - 1 && <ArrowRight className="mechanism-step__arrow" aria-hidden="true" />}
          </div>
        )
      })}
    </div>
  )
}

function VisualShell({
  kicker,
  title,
  note,
  children,
}: {
  kicker: string
  title: string
  note: string
  children: React.ReactNode
}) {
  return (
    <div className="project-mechanism">
      <header className="project-mechanism__head">
        <div>
          <span>{kicker}</span>
          <h4>{title}</h4>
        </div>
        <small>{note}</small>
      </header>
      {children}
    </div>
  )
}

function LexiFlowVisual() {
  const steps = [
    { icon: Search, label: 'Select', note: '选义' },
    { icon: BookOpen, label: 'Memorize', note: '记忆' },
    { icon: ImageIcon, label: 'Visualize', note: '联想' },
    { icon: PenLine, label: 'Apply', note: '表达' },
    { icon: History, label: 'Review', note: '复习' },
  ]

  return (
    <VisualShell
      kicker="PRODUCT MECHANISM"
      title="LexiFlow 的核心不是“背词”，而是把词推进到主动表达"
      note="结构示意 · 非实机截图"
    >
      <section className="mechanism-panel">
        <div className="mechanism-panel__label">
          <span>学习主链路</span>
          <small>从遇词到可用</small>
        </div>
        <StepRail items={steps} />
      </section>

      <div className="mechanism-decisions">
        <article>
          <span>01</span>
          <strong>Today / StudyDay</strong>
          <p>复习优先；漏学不滚成“词汇债务”。</p>
        </article>
        <article>
          <span>02</span>
          <strong>AI 边界</strong>
          <p>用户先联想、先表达，AI 只做辅助。</p>
        </article>
        <article>
          <span>03</span>
          <strong>本地优先</strong>
          <p>基础查词与学习数据不依赖在线模型。</p>
        </article>
      </div>

      <footer className="mechanism-evidence">
        <span><CheckCircle2 aria-hidden="true" /> Windows v0.8.7</span>
        <span><ShieldCheck aria-hidden="true" /> 自动化回归检查</span>
        <span><Sparkles aria-hidden="true" /> AI 可降级</span>
      </footer>
    </VisualShell>
  )
}

function VersionFlowVisual() {
  const steps = [
    { icon: Database, label: '真实 PCB', note: '读取当前文档' },
    { icon: BookOpen, label: 'Baseline', note: '手动建立起点' },
    { icon: History, label: 'Checkpoint ×2', note: '记录移动后的坐标' },
    { icon: Search, label: '查询 R1', note: '同一内部 ID' },
    { icon: CheckCircle2, label: '位移轨迹', note: 'EDA 重启后可恢复' },
  ]

  return (
    <VisualShell
      kicker="MVP MECHANISM / REAL EDA"
      title="不是重造版本控制，而是先证明一个器件的移动可以追溯"
      note="产品机制示意 · 非插件实机截图"
    >
      <section className="mechanism-panel">
        <div className="mechanism-panel__label">
          <span>当前 v0.0.5 的真实验证链路</span>
          <small>单窗口 · 手动提交</small>
        </div>
        <StepRail items={steps} />
      </section>
      <div className="mechanism-decisions">
        <article><span>01</span><strong>先做位移追溯</strong><p>把首期能力收敛为 Baseline、Checkpoint 和坐标变化查询。</p></article>
        <article><span>02</span><strong>真实 EDA 验收</strong><p>同一 R1 在 3 个历史节点留下 2 段可查询的位移记录。</p></article>
        <article><span>03</span><strong>边界明确</strong><p>采购/生产影响、完整语义 Diff 与跨窗口协同不属于当前 MVP。</p></article>
      </div>
      <footer className="mechanism-evidence">
        <span><CheckCircle2 aria-hidden="true" /> A1–A8 实机验收</span>
        <span><ShieldCheck aria-hidden="true" /> 0.0.5 实验性插件</span>
        <span><History aria-hidden="true" /> 重启历史恢复</span>
      </footer>
    </VisualShell>
  )
}

function RobotServiceVisual() {
  return (
    <VisualShell
      kicker="SERVICE LOGIC"
      title="统一入口，但知识问答与使用报告走不同链路"
      note="服务流程示意 · 非实机截图"
    >
      <section className="mechanism-panel mechanism-panel--route">
        <div className="route-origin">
          <UserRound aria-hidden="true" />
          <strong>用户提问</strong>
        </div>
        <ArrowRight aria-hidden="true" />
        <div className="route-origin">
          <Bot aria-hidden="true" />
          <strong>Agent 识别任务</strong>
        </div>
        <ArrowRight aria-hidden="true" />
        <div className="route-branches">
          <div>
            <Database aria-hidden="true" />
            <strong>知识问答</strong>
            <small>RAG 检索资料 → 组织回答</small>
          </div>
          <div>
            <FileText aria-hidden="true" />
            <strong>使用报告</strong>
            <small>用户 / 月份 / 使用记录 → 建议</small>
          </div>
        </div>
      </section>

      <div className="mechanism-decisions">
        <article>
          <span>01</span>
          <strong>RAG 负责依据</strong>
          <p>答案先检索产品资料，再组织输出。</p>
        </article>
        <article>
          <span>02</span>
          <strong>Agent 负责路由</strong>
          <p>识别任务、调用能力，不自由发挥业务规则。</p>
        </article>
        <article>
          <span>03</span>
          <strong>日志负责验证</strong>
          <p>用真实运行链路确认能力调用是否正确。</p>
        </article>
      </div>

      <footer className="mechanism-evidence">
        <span><BookOpen aria-hidden="true" /> 6 份知识资料</span>
        <span><CheckCircle2 aria-hidden="true" /> 两条主路径跑通</span>
        <span><FileText aria-hidden="true" /> 运行日志留存</span>
      </footer>
    </VisualShell>
  )
}

function NewsDemoVisual() {
  const steps = [
    { icon: UserRound, label: '登录' },
    { icon: FileText, label: '列表' },
    { icon: BookOpen, label: '详情' },
    { icon: Bookmark, label: '收藏 / 取消' },
    { icon: History, label: '历史更新' },
  ]

  return (
    <VisualShell
      kicker="PRODUCT → BACKEND"
      title="把用户动作翻译成接口、状态和数据规则"
      note="产品逻辑示意 · 非实机截图"
    >
      <section className="mechanism-panel">
        <div className="mechanism-panel__label">
          <span>用户核心路径</span>
          <small>先保证闭环，再补工程支撑</small>
        </div>
        <StepRail items={steps} />
      </section>

      <div className="mechanism-decisions">
        <article>
          <span>01</span>
          <strong>收藏防重复</strong>
          <p>数据库约束 + 业务校验，避免重复收藏。</p>
        </article>
        <article>
          <span>02</span>
          <strong>历史更新时间</strong>
          <p>再次浏览同一新闻时更新最近访问时间。</p>
        </article>
        <article>
          <span>03</span>
          <strong>统一响应</strong>
          <p>成功、参数错误和服务异常统一返回格式。</p>
        </article>
      </div>

      <footer className="mechanism-evidence">
        <span><Database aria-hidden="true" /> User / News / Favorite / History</span>
        <span><ShieldCheck aria-hidden="true" /> 缓存与状态规则</span>
        <span><CheckCircle2 aria-hidden="true" /> 公开后端 Demo</span>
      </footer>
    </VisualShell>
  )
}

export function ProjectVisual({ project }: { project: Project }) {
  if (project.id === 'lexiflow') return <LexiFlowVisual />
  if (project.id === 'versionflow') return <VersionFlowVisual />
  if (project.id === 'robot-service') return <RobotServiceVisual />
  return <NewsDemoVisual />
}
