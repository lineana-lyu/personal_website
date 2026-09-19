import { useState } from 'react'
import { ExternalLink, FileCheck2, Maximize2 } from 'lucide-react'
import type { Project } from '../data/portfolio'
import { Reveal } from './Reveal'
import { ProjectVisual } from './ProjectVisuals'

type LexiFlowRuntimeStage = {
  id: 'select' | 'memorize' | 'visualize' | 'apply' | 'review'
  number: string
  label: string
  english: string
  image: string
  alt: string
  note: string
  resultImage?: string
  resultAlt?: string
  resultNote?: string
}

const lexiflowRuntimeStages: LexiFlowRuntimeStage[] = [
  {
    id: 'select',
    number: '01',
    label: '选词制卡',
    english: 'SELECT',
    image: 'media/lexiflow-real-lookup-grow.png',
    alt: 'LexiFlow 实机运行的 grow 查词与制卡页面',
    note: '从真实遇词进入学习流程，先确认词义、例句与来源语境。',
  },
  {
    id: 'memorize',
    number: '02',
    label: '记忆',
    english: 'MEMORIZE',
    image: 'media/lexiflow-real-memorize-grow.png',
    alt: 'LexiFlow 实机运行的 Memorize 主动回忆页面',
    note: '用英→中 / 中→英主动回忆验证记忆，不把“看着眼熟”当成记住。',
  },
  {
    id: 'visualize',
    number: '03',
    label: '视觉联想',
    english: 'VISUALIZE',
    image: 'media/lexiflow-real-visualize-grow.png',
    alt: 'LexiFlow 实机运行的 Visualize 用户先写联想页面',
    note: '第一步始终由用户自己形成联想场景，AI 不能替用户完成第一次联想。',
    resultImage: 'media/lexiflow-real-visualize-assisted.png',
    resultAlt: 'LexiFlow Visualize 实机界面中显示 AI 建议仅供参考的结果状态',
    resultNote: 'AI 建议作为独立参考层出现，原始联想仍保留；用户可以采用、重试，也可以完全忽略。',
  },
  {
    id: 'apply',
    number: '04',
    label: '造句应用',
    english: 'APPLY',
    image: 'media/lexiflow-real-apply-grow.png',
    alt: 'LexiFlow 实机运行的 Apply 用户先输入表达页面',
    note: '先写真正想表达的话，再请求检查；AI 不先替用户生成第一句。',
    resultImage: 'media/lexiflow-real-apply-checked.png',
    resultAlt: 'LexiFlow Apply 实机界面中表达检查通过并给出可选建议的结果状态',
    resultNote: '检查通过后，可选建议不会阻止继续学习；用户可以保留原句，而不是被 AI 自动改写。',
  },
  {
    id: 'review',
    number: '05',
    label: '复习巩固',
    english: 'REVIEW',
    image: 'media/lexiflow-real-review-grow.png',
    alt: 'LexiFlow 实机运行的 Review 主动回忆页面',
    note: '系统按 Today Plan 安排到期复习，以主动回忆结果推进长期巩固。',
  },
]

function LexiFlowRuntimeGallery() {
  const [activeStageId, setActiveStageId] = useState<LexiFlowRuntimeStage['id']>('visualize')
  const [viewMode, setViewMode] = useState<'input' | 'result'>('result')
  const activeStage = lexiflowRuntimeStages.find((stage) => stage.id === activeStageId) ?? lexiflowRuntimeStages[0]
  const hasResult = Boolean(activeStage.resultImage)
  const showingResult = hasResult && viewMode === 'result'
  const activeImage = showingResult ? activeStage.resultImage! : activeStage.image
  const activeAlt = showingResult ? activeStage.resultAlt! : activeStage.alt
  const activeNote = showingResult ? activeStage.resultNote! : activeStage.note
  const imageUrl = `${import.meta.env.BASE_URL}${activeImage}`

  const switchStage = (stage: LexiFlowRuntimeStage) => {
    setActiveStageId(stage.id)
    setViewMode(stage.resultImage ? 'result' : 'input')
  }

  return (
    <Reveal className="case-real-ui" delay={80}>
      <div className="case-real-ui__head">
        <div>
          <span>REAL PRODUCT UI</span>
          <h4>核心学习闭环 · 实机运行</h4>
          <p>5 个阶段都来自真实 Runtime；Visualize 与 Apply 额外展示“用户先做 → AI 辅助后”的结果状态。AI 结果使用固定演示响应复现真实交互，不把生成图冒充产品页面。</p>
        </div>
        <small>v0.8.7 runtime · 2026.09</small>
      </div>

      <div className="runtime-stage-tabs" role="tablist" aria-label="LexiFlow 核心学习阶段">
        {lexiflowRuntimeStages.map((stage) => {
          const active = stage.id === activeStage.id
          return (
            <button
              type="button"
              role="tab"
              aria-selected={active}
              className={`runtime-stage-tab ${active ? 'is-active' : ''}`}
              key={stage.id}
              onClick={() => switchStage(stage)}
            >
              <span>{stage.number}</span>
              <strong>{stage.label}</strong>
              <small>{stage.english}</small>
            </button>
          )
        })}
      </div>

      {hasResult && (
        <div className="runtime-state-toggle" aria-label={`${activeStage.label} 页面状态`}>
          <span>看交互变化</span>
          <div>
            <button
              type="button"
              className={viewMode === 'input' ? 'is-active' : ''}
              onClick={() => setViewMode('input')}
            >
              用户先做
            </button>
            <button
              type="button"
              className={viewMode === 'result' ? 'is-active' : ''}
              onClick={() => setViewMode('result')}
            >
              AI 辅助后
            </button>
          </div>
        </div>
      )}

      <figure className="runtime-stage-view" key={`${activeStage.id}-${viewMode}`}>
        <a href={imageUrl} target="_blank" rel="noreferrer" className="runtime-stage-view__image">
          <img src={imageUrl} alt={activeAlt} loading="lazy" />
          <span className="runtime-stage-view__zoom"><Maximize2 aria-hidden="true" /> 查看完整实机截图</span>
          {showingResult && <span className="runtime-stage-view__fixture">固定演示响应 · 真实 UI 状态</span>}
        </a>
        <figcaption>
          <div>
            <span>{activeStage.number} / 05</span>
            <strong>{activeStage.label}{showingResult ? ' · AI 辅助后' : ''}</strong>
          </div>
          <p>{activeNote}</p>
        </figcaption>
      </figure>
    </Reveal>
  )
}

export function ProjectCaseStudy({ project }: { project: Project }) {
  const highlights = project.details.slice(0, 3)
  const moreDetails = project.details.slice(3)

  return (
    <article className={`case-study accent-${project.accent}`} id={project.id}>
      <Reveal className="case-intro">
        <div className="case-heading">
          <div className="case-meta">
            <span>CASE STUDY</span>
            <span className="case-status">{project.status}</span>
          </div>
          <h3>{project.title}</h3>
          <p className="case-english">{project.englishTitle}</p>
          <p className="case-headline">{project.headline}</p>
          <div className="tag-row">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          {(project.github || project.release) && (
            <div className="case-links">
              {project.github && (
                <a className="text-link" href={project.github} target="_blank" rel="noreferrer">
                  GitHub <ExternalLink aria-hidden="true" />
                </a>
              )}
              {project.release && (
                <a className="text-link" href={project.release} target="_blank" rel="noreferrer">
                  v0.8.6 Release <ExternalLink aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
        <dl className="case-facts">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal className="case-visual-wrap" delay={60}>
        <ProjectVisual project={project} />
      </Reveal>

      {project.id === 'lexiflow' && <LexiFlowRuntimeGallery />}

      <Reveal className="case-details case-details--compact" delay={90}>
        <div className="case-details-title">
          <span>30-SECOND READ</span>
          <h4>先看这 3 点</h4>
          <p>问题、决策、结果先讲清楚；想深入再展开细节。</p>
        </div>
        <div className="case-highlight-grid">
          {highlights.map((detail, index) => (
            <article key={detail.label}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h5>{detail.label}</h5>
              <p>{detail.value}</p>
            </article>
          ))}
        </div>
        {moreDetails.length > 0 && (
          <details className="case-more">
            <summary>
              <span>继续看项目细节</span>
              <small>+{moreDetails.length}</small>
            </summary>
            <dl>
              {moreDetails.map((detail) => (
                <div key={detail.label}>
                  <dt>{detail.label}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>
          </details>
        )}
      </Reveal>

      {project.evidence && project.evidence.length > 0 && (
        <Reveal className="case-proof" delay={110}>
          <div className="case-proof__brand">
            {project.id === 'lexiflow' && (
              <img src={`${import.meta.env.BASE_URL}media/lexiflow-icon.png`} alt="LexiFlow 应用图标" />
            )}
            <div>
              <span>REAL PRODUCT EVIDENCE</span>
              <h4>可验证的真实交付</h4>
            </div>
          </div>
          <div className="case-proof__metrics">
            {project.evidence.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                {item.note && <small>{item.note}</small>}
              </div>
            ))}
          </div>
          {project.docs && project.docs.length > 0 && (
            <div className="case-proof__links">
              {project.docs.map((doc) => (
                <a href={doc.href} target="_blank" rel="noreferrer" key={doc.href}>
                  <FileCheck2 aria-hidden="true" />
                  <span>{doc.label}</span>
                  <ExternalLink aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </Reveal>
      )}
    </article>
  )
}
