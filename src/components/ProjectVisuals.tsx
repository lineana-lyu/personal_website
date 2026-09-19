import type { Project } from '../data/portfolio'

const visualByProject: Record<string, { src: string; alt: string; label: string }> = {
  lexiflow: {
    src: 'media/case-lexiflow.svg',
    alt: 'LexiFlow 桌面应用界面、主动词汇学习流程与本地优先产品设计示意',
    label: 'LexiFlow · 产品界面与学习链路',
  },
  'robot-service': {
    src: 'media/case-robot-service.svg',
    alt: '扫地机用户服务助手的问答界面、RAG 与 Agent 服务链路示意',
    label: '扫地机用户服务助手 · 服务链路与验证',
  },
  'news-demo': {
    src: 'media/case-news-demo.svg',
    alt: '资讯产品后端 Demo 的新闻列表、收藏状态与浏览历史流程示意',
    label: '资讯产品功能 Demo · 用户动作与后端状态',
  },
}

export function ProjectVisual({ project }: { project: Project }) {
  const visual = visualByProject[project.id] ?? visualByProject.lexiflow

  return (
    <figure className="project-showcase">
      <img
        src={`${import.meta.env.BASE_URL}${visual.src}`}
        alt={visual.alt}
        loading="lazy"
        decoding="async"
      />
      <figcaption>
        <span>PROJECT VISUAL</span>
        <strong>{visual.label}</strong>
      </figcaption>
    </figure>
  )
}
