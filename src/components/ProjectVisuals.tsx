import { ArrowRight, Check, Database, FileText, Search, ShieldCheck, Sparkles, UserRound } from 'lucide-react'
import type { Project } from '../data/portfolio'

function VisualHeader({ title, note }: { title: string; note: string }) {
  return (
    <header className="visual-header">
      <div>
        <span className="visual-kicker">PRODUCT DESIGN SCHEMATIC</span>
        <h4>{title}</h4>
      </div>
      <span className="visual-note">{note}</span>
    </header>
  )
}

function FlowRail({ items, compact = false }: { items: string[]; compact?: boolean }) {
  return (
    <div className={`flow-rail ${compact ? 'flow-rail--compact' : ''}`} role="list">
      {items.map((item, index) => (
        <div className="flow-item" role="listitem" key={item} style={{ '--flow-delay': `${150 + index * 55}ms` } as React.CSSProperties}>
          <span className="flow-index">{String(index + 1).padStart(2, '0')}</span>
          <span>{item}</span>
          {index < items.length - 1 && <ArrowRight className="flow-arrow" aria-hidden="true" />}
        </div>
      ))}
    </div>
  )
}

function LexiFlowVisual({ project }: { project: Project }) {
  const releaseChecks = [
    ['阶段模型', 'Select → Memorize → Visualize → Apply → Review', '通过'],
    ['Today 计划', '冻结成员 + No Vocabulary Debt', '通过'],
    ['AI 边界', '不决定阶段 / 复习 / Today', '通过'],
    ['公开交付', 'Windows 安装版 + 便携版', 'v0.8.6'],
  ]

  const architecture = [
    [Search, '本地词典', 'LexiFlow Core / ECDICT / 短语词典'],
    [FileText, 'Learning Core', '确定性阶段、Today 与复习规则'],
    [Sparkles, 'AI Coach', '联想具体化、表达检查与修正'],
    [Check, 'Active Vocabulary', '原创表达 → Review → Stable'],
  ] as const

  return (
    <div className="project-visual project-visual--lexiflow">
      <VisualHeader title="从查到一个词，到真正能主动用出来" note="Windows 桌面应用 · v0.8.6" />

      <section className="visual-block visual-block--wide">
        <div className="visual-block-title"><span>产品学习旅程</span><small>从真实遇词，到可主动使用并长期保持</small></div>
        <FlowRail items={project.flow} compact />
      </section>

      <section className="visual-block visual-block--wide">
        <div className="visual-block-title"><span>能力分工</span><small>规则由确定性引擎负责，AI 只做学习辅助</small></div>
        <div className="architecture-rail">
          {architecture.map(([Icon, title, note], index) => (
            <div className="architecture-node" key={title}>
              <Icon aria-hidden="true" />
              <strong>{title}</strong>
              <small>{note}</small>
              {index < architecture.length - 1 && <ArrowRight aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>

      <div className="visual-split">
        <section className="visual-block feature-map">
          <div className="visual-block-title"><span>Today / StudyDay 设计</span><small>保护复习，不制造“词汇债务”</small></div>
          {[
            ['优先级', 'Review → Memorize → Visualize → Apply → Select'],
            ['冻结计划', '同一 StudyDay 的 DailyPlan 创建后保持有限且幂等'],
            ['漏学处理', '不把错过的新词额度滚成强制积压'],
            ['高压复习', '先减少或暂停新词，而不是丢掉到期复习'],
          ].map(([title, items]) => <div key={title}><b>{title}</b><span>{items}</span></div>)}
        </section>

        <section className="visual-block">
          <div className="visual-block-title"><span>AI 产品边界</span><small>AI 是 Coach，不是学习权威</small></div>
          <div className="guard-list">
            {[
              'Visualize：用户先形成联想，AI 再帮助具体化',
              'Apply：用户先表达，AI 不能静默替写',
              'AI 不决定阶段迁移、Today 成员与复习间隔',
              'AI 不可用时仍保留查词、编辑、上传与跳过',
            ].map((item) => (
              <span key={item}><ShieldCheck aria-hidden="true" />{item}</span>
            ))}
          </div>
          <div className="data-summary">
            <Database aria-hidden="true" />
            <div>
              <strong>确定性学习核心 + 本地优先</strong>
              <small>阶段、StudyDay 与 Review 由规则引擎管理；基础查词和学习数据不依赖在线模型</small>
            </div>
            <span>AI 可降级</span>
          </div>
        </section>
      </div>

      <section className="visual-block visual-block--wide">
        <div className="visual-block-title"><span>产品约束与自动化验收</span><small>33 个 check 脚本 + GitHub Actions</small></div>
        <div className="test-table" role="table" aria-label="LexiFlow 版本验收节选">
          {releaseChecks.map((row) => row.map((cell, index) => (
            <span role="cell" className={index === 2 ? 'test-result' : ''} key={`${row[0]}-${cell}`}>
              {index === 2 && <Check aria-hidden="true" />}{cell}
            </span>
          )))}
        </div>
      </section>
    </div>
  )
}

function RobotServiceVisual({ project }: { project: Project }) {
  const architecture = [
    [UserRound, '用户请求', '自然语言问题 / 报告请求'],
    [Sparkles, 'Agent 识别', '判断任务与所需能力'],
    [Search, 'RAG 检索', '从 6 份资料中找依据'],
    [FileText, '回答 / 报告', '基于资料与使用记录生成'],
  ] as const

  const validationRows = [
    ['知识问答', '“扫地机器人怎么使用”', '走资料检索'],
    ['报告请求', '“生成我的使用报告”', '补全上下文'],
    ['上下文缺失', '用户 / 月份 / 记录不完整', '继续询问'],
    ['运行核对', '能力调用与任务不一致', '查日志定位'],
  ]

  return (
    <div className="project-visual project-visual--rag">
      <VisualHeader title="统一入口下的两条服务链路" note="RAG + Agent · 可运行 Demo" />

      <section className="visual-block visual-block--wide">
        <div className="visual-block-title"><span>产品主流程</span><small>先判断任务，再选择回答方式</small></div>
        <FlowRail items={project.flow} compact />
      </section>

      <section className="visual-block visual-block--wide">
        <div className="visual-block-title"><span>系统分工</span><small>Agent 负责任务识别，RAG 负责知识依据</small></div>
        <div className="architecture-rail">
          {architecture.map(([Icon, title, note], index) => (
            <div className="architecture-node" key={title}>
              <Icon aria-hidden="true" />
              <strong>{title}</strong>
              <small>{note}</small>
              {index < architecture.length - 1 && <ArrowRight aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>

      <div className="visual-split">
        <section className="visual-block feature-map">
          <div className="visual-block-title"><span>知识问答</span><small>高频咨询直接走资料检索</small></div>
          {[
            ['范围', '选购 / 操作 / 故障 / 环境 / 保养'],
            ['输入', '用户自然语言问题'],
            ['依据', '6 份扫地机与扫拖机器人资料'],
            ['输出', '基于知识内容组织的回答'],
          ].map(([title, items]) => <div key={title}><b>{title}</b><span>{items}</span></div>)}
        </section>

        <section className="visual-block requirement-stack">
          <div className="visual-block-title"><span>个性化使用报告</span><small>固定流程补足关键上下文</small></div>
          {[
            ['01', '识别', '确认用户要生成使用报告'],
            ['02', '用户', '获取用户身份'],
            ['03', '月份', '确认报告时间范围'],
            ['04', '记录', '读取清扫表现与耗材状态'],
            ['05', '建议', '补充环境与保养建议'],
          ].map(([index, type, value]) => (
            <div key={index}><span>{index}</span><b>{type}</b><small>{value}</small></div>
          ))}
        </section>
      </div>

      <section className="visual-block visual-block--wide">
        <div className="visual-block-title"><span>体验与验证</span><small>用典型样例与运行日志核对能力调用</small></div>
        <div className="test-table" role="table" aria-label="扫地机用户服务助手验证节选">
          {validationRows.map((row) => row.map((cell, index) => (
            <span role="cell" className={index === 2 ? 'test-result' : ''} key={`${row[0]}-${cell}`}>
              {index === 2 && <Check aria-hidden="true" />}{cell}
            </span>
          )))}
        </div>
      </section>
    </div>
  )
}

function NewsVisual({ project }: { project: Project }) {
  return (
    <div className="project-visual project-visual--news">
      <VisualHeader title="从用户流程到后端产品能力" note="个人学习项目 · 已公开源码" />
      <section className="visual-block visual-block--wide">
        <div className="visual-block-title"><span>用户核心路径</span><small>先打通内容消费闭环</small></div>
        <FlowRail items={project.flow} compact />
      </section>
      <div className="visual-split">
        <section className="visual-block feature-map">
          <div className="visual-block-title"><span>MVP 功能地图</span><small>围绕主路径拆模块</small></div>
          {[
            ['账号', '注册 / 登录 / 身份校验'],
            ['内容', '分类 / 列表 / 详情'],
            ['行为', '收藏 / 取消 / 历史'],
            ['体验', '缓存 / 统一响应 / 异常处理'],
          ].map(([title, items]) => <div key={title}><b>{title}</b><span>{items}</span></div>)}
        </section>
        <section className="visual-block requirement-stack">
          <div className="visual-block-title"><span>业务规则落地</span><small>页面状态 → 接口与数据关系</small></div>
          {[
            ['01', '收藏', '再次收藏先做重复检查'],
            ['02', '历史', '再次浏览更新最近浏览时间'],
            ['03', '缓存', '分类与列表高频读取使用缓存'],
            ['04', '返回', '统一成功 / 参数错误 / 服务异常格式'],
          ].map(([index, type, value]) => (
            <div key={index}><span>{index}</span><b>{type}</b><small>{value}</small></div>
          ))}
        </section>
      </div>
      <section className="visual-block visual-block--wide data-model">
        <div className="visual-block-title"><span>数据模型关系</span><small>支撑用户、内容、收藏与历史状态</small></div>
        <div className="entity-row">
          {[
            ['User', 'id · account'],
            ['Favorite', 'user_id · news_id'],
            ['News', 'id · category · content'],
            ['History', 'user_id · news_id · viewed_at'],
          ].map(([entity, fields], index) => (
            <div className="entity-card" key={entity}>
              <Database aria-hidden="true" /><strong>{entity}</strong><small>{fields}</small>
              {index < 3 && <span className="entity-link" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export function ProjectVisual({ project }: { project: Project }) {
  if (project.id === 'lexiflow') return <LexiFlowVisual project={project} />
  if (project.id === 'robot-service') return <RobotServiceVisual project={project} />
  return <NewsVisual project={project} />
}
