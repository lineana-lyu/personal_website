import { ExternalLink } from 'lucide-react'
import type { Project } from '../data/portfolio'
import { Reveal } from './Reveal'
import { ProjectVisual } from './ProjectVisuals'

export function ProjectCaseStudy({ project }: { project: Project }) {
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
          {project.github && (
            <a className="text-link" href={project.github} target="_blank" rel="noreferrer">
              查看 GitHub 项目 <ExternalLink aria-hidden="true" />
            </a>
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
      <Reveal className="case-visual-wrap" delay={80}>
        <ProjectVisual project={project} />
      </Reveal>
      <Reveal className="case-details" delay={100}>
        <div className="case-details-title">
          <span>DECISIONS &amp; LEARNINGS</span>
          <h4>方案决策与项目边界</h4>
        </div>
        <dl>
          {project.details.map((detail) => (
            <div key={detail.label}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </article>
  )
}
