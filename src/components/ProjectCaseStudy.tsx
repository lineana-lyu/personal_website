import { ExternalLink, FileCheck2 } from 'lucide-react'
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
          {(project.github || project.release) && (
            <div className="case-links">
              {project.github && (
                <a className="text-link" href={project.github} target="_blank" rel="noreferrer">
                  查看 GitHub 项目 <ExternalLink aria-hidden="true" />
                </a>
              )}
              {project.release && (
                <a className="text-link" href={project.release} target="_blank" rel="noreferrer">
                  查看 v0.8.6 Release <ExternalLink aria-hidden="true" />
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
      {project.evidence && project.evidence.length > 0 && (
        <Reveal className="case-proof" delay={60}>
          <div className="case-proof__brand">
            {project.id === 'lexiflow' && (
              <img src={`${import.meta.env.BASE_URL}media/lexiflow-icon.png`} alt="LexiFlow 应用图标" />
            )}
            <div>
              <span>REAL PRODUCT EVIDENCE</span>
              <h4>不是概念稿，关键产品规则与公开交付都有仓库证据</h4>
              <p>案例内容以项目主仓库、产品学习契约、运行时职责文档和公开 Release 为依据。</p>
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
