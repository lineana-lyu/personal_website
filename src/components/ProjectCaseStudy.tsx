import { ExternalLink, FileCheck2 } from 'lucide-react'
import type { Project } from '../data/portfolio'
import { Reveal } from './Reveal'
import { ProjectVisual } from './ProjectVisuals'

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
