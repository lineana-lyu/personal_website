import { ArrowDown, ArrowRight, Check, Database, FileText, Search, ShieldCheck, Sparkles, UserRound } from 'lucide-react'
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

function MathVisual({ project }: { project: Project }) {
  const tests = [
    ['常规推进', '步骤保存', '通过'],
    ['权限边界', '跨角色访问', '拦截'],
    ['上下文缺失', '草稿为空', '提示'],
    ['AI 异常', '服务不可用', '兜底'],
  ]

  return (
    <div className="project-visual project-visual--math">
      <VisualHeader title="训练闭环与 Agent 上下文" note="结构示意 · 非线上截图" />
      <section className="visual-block">
        <div className="visual-block-title"><span>三类角色</span><small>同一任务，不同责任</small></div>
        <div className="role-map">
          {[
            ['学生', '训练 · 草稿 · 追问'],
            ['教师', '发布 · 点评 · 复盘'],
            ['管理员', '题库 · 权限 · 配置'],
          ].map(([role, action]) => (
            <div className="role-node" key={role}>
              <UserRound aria-hidden="true" />
              <strong>{role}</strong>
              <small>{action}</small>
            </div>
          ))}
          <div className="role-junction" aria-hidden="true" />
          <div className="role-center"><Sparkles aria-hidden="true" /><span>训练任务</span></div>
        </div>
      </section>
      <section className="visual-block visual-block--wide">
        <div className="visual-block-title"><span>十步训练主线</span><small>每一步都保留过程数据</small></div>
        <FlowRail items={project.flow} compact />
      </section>
      <div className="visual-split">
        <section className="visual-block">
          <div className="visual-block-title"><span>AI 辅导上下文</span><small>按任务动态组装</small></div>
          <div className="context-stack">
            {['题目与目标', '当前训练步骤', '学生草稿', '课程知识库'].map((item, index) => (
              <div key={item} style={{ '--stack-index': index } as React.CSSProperties}>
                <FileText aria-hidden="true" />{item}
              </div>
            ))}
            <ArrowDown aria-hidden="true" />
            <strong>Agent：识别状态 → 选择策略 → 生成引导 → 写回任务</strong>
          </div>
        </section>
        <section className="visual-block">
          <div className="visual-block-title"><span>异常与兜底</span><small>把“不确定”设计进流程</small></div>
          <div className="guard-list">
            {['信息不足 → 追问', '超出范围 → 拒答', '公式异常 → 原文保留', '服务失败 → 保存草稿'].map((item) => (
              <span key={item}><ShieldCheck aria-hidden="true" />{item}</span>
            ))}
          </div>
          <div className="data-summary">
            <Database aria-hidden="true" />
            <div><strong>8 张业务表</strong><small>用户 / 题目 / 任务 / 步骤 / 草稿 / 对话 / 报告 / 点评</small></div>
            <span>3 类权限</span>
          </div>
        </section>
      </div>
      <section className="visual-block visual-block--wide">
        <div className="visual-block-title"><span>场景测试矩阵（节选）</span><small>共完成 10 类场景测试</small></div>
        <div className="test-table" role="table" aria-label="数学建模训练系统场景测试矩阵节选">
          {tests.map((row) => row.map((cell, index) => (
            <span role="cell" className={index === 2 ? 'test-result' : ''} key={`${row[0]}-${cell}`}>
              {index === 2 && <Check aria-hidden="true" />}{cell}
            </span>
          )))}
        </div>
      </section>
    </div>
  )
}

function RagVisual({ project }: { project: Project }) {
  const architecture = [
    [FileText, '说明书 / FAQ', '原始知识'],
    [Database, 'Chroma', '向量知识库'],
    [Search, 'Top-k 召回', '相关片段'],
    [Sparkles, '通义千问', '受约束生成'],
  ] as const

  return (
    <div className="project-visual project-visual--rag">
      <VisualHeader title="RAG 回答链路与评测闭环" note="系统架构示意 · 非产品截图" />
      <section className="visual-block visual-block--wide">
        <div className="visual-block-title"><span>系统架构</span><small>知识先于生成</small></div>
        <div className="architecture-rail">
          {architecture.map(([Icon, title, note], index) => (
            <div className="architecture-node" key={title}>
              <Icon aria-hidden="true" />
              <strong>{title}</strong><small>{note}</small>
              {index < architecture.length - 1 && <ArrowRight aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>
      <div className="visual-split">
        <section className="visual-block">
          <div className="visual-block-title"><span>文档处理与召回</span><small>可调参数点</small></div>
          <FlowRail items={['清洗', '分段', '向量化', '检索', '重排 / 筛选']} compact />
          <div className="parameter-row"><span>chunk size</span><span>overlap</span><span>Top-k</span><span>threshold</span></div>
        </section>
        <section className="visual-block prompt-blueprint">
          <div className="visual-block-title"><span>Prompt 结构</span><small>控制回答边界</small></div>
          <div><b>ROLE</b><span>扫地机产品支持助手</span></div>
          <div><b>CONTEXT</b><span>仅使用召回资料</span></div>
          <div><b>RULES</b><span>不猜测型号与故障原因</span></div>
          <div><b>OUTPUT</b><span>结论 + 操作步骤 + 风险提示</span></div>
        </section>
      </div>
      <section className="visual-block visual-block--wide answer-path">
        <div className="visual-block-title"><span>回答约束与兜底</span><small>资料不足时停止生成</small></div>
        <FlowRail items={project.flow} compact />
        <div className="decision-row">
          <div><Check aria-hidden="true" /><span><strong>可回答</strong>提供依据明确的操作步骤</span></div>
          <div><ShieldCheck aria-hidden="true" /><span><strong>不可回答</strong>说明缺失信息并引导补充或转人工</span></div>
        </div>
      </section>
      <section className="visual-block visual-block--wide evaluation-grid">
        <div className="visual-block-title"><span>AI 产品评测框架</span><small>错误类型决定优化位置</small></div>
        {[
          ['召回相关性', '无关片段', '调整切分 / 检索'],
          ['回答准确性', '事实偏差', '收紧上下文 / 规则'],
          ['幻觉控制', '资料外扩写', '拒答与引用约束'],
          ['可执行性', '步骤不完整', '优化输出结构'],
          ['兜底效果', '无法回答仍生成', '阈值与分支策略'],
        ].map(([dimension, error, action]) => (
          <div key={dimension}><strong>{dimension}</strong><span>{error}</span><small>{action}</small></div>
        ))}
      </section>
    </div>
  )
}

function NewsVisual({ project }: { project: Project }) {
  return (
    <div className="project-visual project-visual--news">
      <VisualHeader title="从产品需求到后端任务" note="MVP 结构示意 · 非线上界面" />
      <section className="visual-block visual-block--wide">
        <div className="visual-block-title"><span>用户核心路径</span><small>先打通内容消费闭环</small></div>
        <FlowRail items={project.flow} compact />
      </section>
      <div className="visual-split">
        <section className="visual-block feature-map">
          <div className="visual-block-title"><span>MVP 功能地图</span><small>控制首版范围</small></div>
          {[
            ['账号', '注册 / 登录 / 身份校验'],
            ['内容', '列表 / 详情 / 分页'],
            ['行为', '收藏 / 取消 / 历史'],
            ['规则', '重复处理 / 状态更新'],
          ].map(([title, items]) => <div key={title}><b>{title}</b><span>{items}</span></div>)}
        </section>
        <section className="visual-block requirement-stack">
          <div className="visual-block-title"><span>需求拆解</span><small>产品语言 → 研发任务</small></div>
          {[
            ['用户故事', '“我想稍后继续阅读”'],
            ['业务规则', '同一新闻不能重复收藏'],
            ['接口', 'POST /favorites'],
            ['数据', 'user_id + news_id 唯一关系'],
            ['测试', '重复 / 取消 / 无效 ID'],
          ].map(([type, value], index) => (
            <div key={type}><span>{String(index + 1).padStart(2, '0')}</span><b>{type}</b><small>{value}</small></div>
          ))}
        </section>
      </div>
      <section className="visual-block visual-block--wide data-model">
        <div className="visual-block-title"><span>数据模型关系</span><small>行为数据为后续 AI 能力留出基础</small></div>
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
      <div className="visual-split visual-split--bottom">
        <section className="visual-block scenario-lanes">
          <div className="visual-block-title"><span>场景验证</span><small>接口与状态一致性</small></div>
          <div><b>正常</b><span>首次收藏 · 取消收藏 · 历史写入</span></div>
          <div><b>异常</b><span>资源不存在 · 身份失效 · 参数错误</span></div>
          <div><b>边界</b><span>重复收藏 · 反复取消 · 历史更新</span></div>
        </section>
        <section className="visual-block ai-roadmap">
          <div className="visual-block-title"><span>AI 能力演进</span><small>后续设想，不等同已完成</small></div>
          <FlowRail items={['行为数据基础', '新闻摘要', '语义搜索', '个性化推荐']} compact />
        </section>
      </div>
    </div>
  )
}

export function ProjectVisual({ project }: { project: Project }) {
  if (project.id === 'modeling-ai') return <MathVisual project={project} />
  if (project.id === 'rag-service') return <RagVisual project={project} />
  return <NewsVisual project={project} />
}
