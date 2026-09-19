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

      {project.id === 'lexiflow' && (
        <Reveal className="case-real-ui" delay={80}>
          <div className="case-real-ui__head">
            <div>
              <span>REAL PRODUCT UI</span>
              <h4>实机运行页面</h4>
              <p>由 LexiFlow v0.8.7 Web Runtime 实际运行后自动截取，不是生成式界面图。</p>
            </div>
            <small>2026.09 · Chromium runtime capture</small>
          </div>

          <div className="case-real-ui__grid">
            <a
              className="case-real-ui__shot case-real-ui__shot--hero"
              href={`${import.meta.env.BASE_URL}media/lexiflow-real-lookup-grow.png`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`${import.meta.env.BASE_URL}media/lexiflow-real-lookup-grow.png`}
                alt="LexiFlow 实机运行的 grow 查词与制卡页面"
                loading="lazy"
              />
              <span><b>01</b> 查词与制卡 · grow</span>
            </a>

            <div className="case-real-ui__stack">
              <a
                className="case-real-ui__shot"
                href={`${import.meta.env.BASE_URL}media/lexiflow-real-today-grow.png`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={`${import.meta.env.BASE_URL}media/lexiflow-real-today-grow.png`}
                  alt="LexiFlow 实机运行的今日学习页面"
                  loading="lazy"
                />
                <span><b>02</b> Today · 新词进入学习计划</span>
              </a>

              <a
                className="case-real-ui__shot"
                href={`${import.meta.env.BASE_URL}media/lexiflow-real-library-grow.png`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={`${import.meta.env.BASE_URL}media/lexiflow-real-library-grow.png`}
                  alt="LexiFlow 实机运行的单词库页面"
                  loading="lazy"
                />
                <span><b>03</b> 单词库 · 状态与后续操作</span>
              </a>
            </div>
          </div>
        </Reveal>
      )}

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
