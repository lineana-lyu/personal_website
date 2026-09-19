import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  GitFork,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { ProjectCaseStudy } from './components/ProjectCaseStudy'
import { MotionDirector } from './components/MotionDirector'
import { Reveal } from './components/Reveal'
import { TargetCursor } from './components/TargetCursor'
import { StaggeredMenu } from './components/StaggeredMenu'
import {
  aboutPoints,
  capabilities,
  contact,
  education,
  experience,
  methodSteps,
  navItems,
  profileMetrics,
  projects,
} from './data/portfolio'

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

function SectionHeading({ number, eyebrow, title, lead, className = '' }: { number: string; eyebrow: string; title: string; lead?: string; className?: string }) {
  return (
    <Reveal className={`section-heading ${className}`.trim()}>
      <span className="section-number">{number}</span>
      <div className="section-heading__content">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {lead && <p className="section-heading__lead">{lead}</p>}
      </div>
    </Reveal>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24)
    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1101px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    desktop.addEventListener('change', closeOnDesktop)
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      desktop.removeEventListener('change', closeOnDesktop)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="site-header" data-menu-open={menuOpen} data-scrolled={scrolled}>
        <a className="brand" href="#top" aria-label="返回首页" onClick={closeMenu}>
          <span>LLH</span>
          <span>AI PRODUCT</span>
        </a>
        <nav className="desktop-nav" aria-label="主导航">
          {navItems.map((item) => (
            <a className="roll-link" href={item.href} key={item.href} aria-label={item.label}>
              <span className="nav-roll" aria-hidden="true">
                <span className="nav-roll__base">{item.label}</span>
                <span className="nav-roll__accent">{item.label}</span>
              </span>
            </a>
          ))}
        </nav>
        <a className="header-resume roll-link" href={publicAsset('documents/resume.html')} target="_blank" rel="noreferrer" aria-label="查看最新版简历">
          <span className="nav-roll" aria-hidden="true">
            <span className="nav-roll__base">Resume</span>
            <span className="nav-roll__accent">Resume</span>
          </span>
          <Download aria-hidden="true" />
        </a>
        <StaggeredMenu
          open={menuOpen}
          items={navItems}
          email={contact.email}
          github={contact.github}
          onOpenChange={setMenuOpen}
        />
      </header>
    </>
  )
}

function Hero() {
  const [playVideo, setPlayVideo] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 769px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPlayVideo(desktop.matches && !reduced.matches)
    update()
    desktop.addEventListener('change', update)
    reduced.addEventListener('change', update)
    return () => {
      desktop.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        {playVideo && (
          <video autoPlay muted loop playsInline preload="metadata" poster={publicAsset('media/hero-abstract-relief-v1.png')}>
            <source src={publicAsset('media/hero2.mp4')} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="hero-contrast" aria-hidden="true" />
      <div className="hero-copy">
        <div className="hero-topline">
          <span className="hero-edition">PORTFOLIO / 2027</span>
          <div className="status-pill"><span />可实习 / 校招</div>
        </div>
        <p className="hero-name"><strong>吕灵慧</strong><span>2027 届硕士 · AI 产品经理 / 助理</span></p>
        <p className="hero-kicker">AI PRODUCT MANAGER · FROM PROBLEM TO PROTOTYPE</p>
        <h1 id="hero-title">
          <span className="hero-title-line"><span>把 AI 能力</span></span>
          <span className="hero-title-line"><span>变成可用的产品</span></span>
        </h1>
        <div className="hero-relief-word" aria-hidden="true">
          <span className="relief-letter relief-letter--inset">AI</span>
          <span className="relief-letter relief-letter--raised">PRODUCT</span>
        </div>
        <div className="hero-bottomline">
          <p className="hero-description">
            从真实用户任务出发，在知识问答、固定流程与 AI 辅助之间做取舍，并把异常、兜底和验收条件一起设计进可运行的产品体验。
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#projects">查看项目 <ArrowDownRight aria-hidden="true" /></a>
            <a className="button button--paper" href="#about">了解我</a>
            <a className="button button--text" href="#contact">联系我 <ArrowRight aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <a className="scroll-cue roll-link" href="#about" aria-label="继续浏览">
        <span className="nav-roll" aria-hidden="true">
          <span className="nav-roll__base">SCROLL TO EXPLORE</span>
          <span className="nav-roll__accent">SCROLL TO EXPLORE</span>
        </span>
        <ArrowDown aria-hidden="true" />
      </a>
      <div className="hero-index" aria-hidden="true"><span>PORTFOLIO</span><b>2027</b></div>
    </section>
  )
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="page-shell">
        <SectionHeading
          number="01"
          eyebrow="ABOUT / POSITIONING"
          title="从用户任务到可运行原型，再到研发协作"
          lead="当前作品集只保留简历中有实际经历支撑的内容：场景判断、流程设计、AI 能力取舍、原型交付与基础技术协作。"
        />
        <div className="about-grid">
          <Reveal className="about-statement">
            <p className="big-quote">“先把问题说清楚，再判断 AI 应该出现在哪里。”</p>
            <div className="about-points">
              {aboutPoints.map((point, index) => (
                <div key={point}><span>{String(index + 1).padStart(2, '0')}</span><p>{point}</p></div>
              ))}
            </div>
          </Reveal>
          <div className="metric-grid" aria-label="项目事实数据">
            {profileMetrics.map((metric, index) => (
              <Reveal className={`metric-card metric-${metric.accent} cursor-target`} delay={index * 60} key={metric.label}>
                <strong>{metric.value}</strong><span>{metric.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section experience" id="experience">
      <div className="page-shell">
        <SectionHeading number="02" eyebrow="EXPERIENCE / PRACTICE" title="在真实教育场景里，把训练需求变成可运行 Demo" />
        <Reveal className="experience-layout">
          <aside className="experience-aside">
            <span className="experience-year">2026</span>
            <div className="timeline-line"><span /></div>
            <p><MapPin aria-hidden="true" /> 成都</p>
          </aside>
          <article className="experience-card">
            <div className="experience-topline">
              <span>{experience.eyebrow}</span>
              <time>{experience.period}</time>
            </div>
            <div className="experience-title">
              <div><h3>{experience.company}</h3><p>{experience.role}</p></div>
              <span>实习经历</span>
            </div>
            <p className="experience-summary">{experience.summary}</p>
            <ol className="responsibility-list">
              {experience.responsibilities.map((item, index) => (
                <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>
              ))}
            </ol>
          </article>
        </Reveal>
      </div>
    </section>
  )
}

function Projects() {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id)
  const activeProject = projects.find((project) => project.id === activeProjectId) ?? projects[0]

  return (
    <section className="section projects" id="projects">
      <div className="page-shell page-shell--projects">
        <SectionHeading
          number="03"
          eyebrow="SELECTED PROJECTS"
          title="项目案例"
          lead="围绕三个实际项目，展示我如何从问题定义走到产品决策、原型验证与交付。"
          className="section-heading--projects"
        />

        <Reveal className="project-picker">
          {projects.map((project) => {
            const isActive = project.id === activeProjectId
            return (
              <button
                className={`project-picker__item accent-${project.accent} ${isActive ? 'is-active' : ''}`}
                type="button"
                key={project.id}
                onClick={() => setActiveProjectId(project.id)}
                aria-pressed={isActive}
              >
                <span className="project-picker__number">{project.number}</span>
                <div className="project-picker__copy">
                  <div className="project-picker__topline">
                    <strong>{project.title}</strong>
                    <span>{project.status.split('·').at(-1)?.trim()}</span>
                  </div>
                  <p>{project.headline}</p>
                  <div className="project-picker__tags">
                    {project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
                <ArrowRight className="project-picker__arrow" aria-hidden="true" />
              </button>
            )
          })}
        </Reveal>

        <div className="project-list project-list--single" key={activeProject.id}>
          <ProjectCaseStudy project={activeProject} />
        </div>
      </div>
    </section>
  )
}

function Method() {
  return (
    <section className="section method" id="method">
      <div className="page-shell">
        <SectionHeading
          number="04"
          eyebrow="AI PRODUCT METHOD"
          title="我的 AI 产品工作方法"
          lead="把模型能力纳入产品闭环：从是否需要 AI 开始，到用错误类型指导下一轮迭代。"
        />
        <Reveal className="method-track">
          <div className="method-line" aria-hidden="true" />
          {methodSteps.map(([number, title, description], index) => (
            <article className="method-step" key={number} style={{ '--method-delay': `${120 + index * 45}ms` } as React.CSSProperties}>
              <span className="method-node">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </Reveal>
        <Reveal className="method-principle cursor-target">
          <Sparkles aria-hidden="true" />
          <div><span>CORE PRINCIPLE</span><p>AI 方案不是“接入一个模型”，而是同时设计输入、边界、兜底和验证方式。</p></div>
        </Reveal>
      </div>
    </section>
  )
}

function Capabilities() {
  return (
    <section className="section capabilities" id="capabilities">
      <div className="page-shell">
        <SectionHeading
          number="05"
          eyebrow="CAPABILITIES / TOOLKIT"
          title="以完成任务为单位描述能力"
          lead="不堆砌工具名，只保留在最新简历和项目中有实际任务支撑的能力，说明当前可独立完成的范围与协作边界。"
        />
        <div className="capability-list">
          {capabilities.map((capability, index) => (
            <Reveal className={`capability-row accent-${capability.accent}`} delay={index * 50} key={capability.title}>
              <span className="capability-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="capability-title"><h3>{capability.title}</h3><span>{capability.level}</span></div>
              <div className="capability-tags">{capability.items.map((item) => <span key={item}>{item}</span>)}</div>
            </Reveal>
          ))}
        </div>
        <Reveal className="education-wrap">
          <div className="education-heading"><span>EDUCATION &amp; CREDENTIALS</span><h3>教育经历与证书</h3></div>
          <div className="education-grid">
            {education.map((item) => (
              <article className="cursor-target" key={item.school}>
                <time>{item.period}</time><h4>{item.school}</h4><p>{item.degree}</p><span>{item.note}</span>
              </article>
            ))}
            <article className="credentials cursor-target">
              <time>LANGUAGE &amp; AWARDS</time><h4>证书与奖励</h4>
              <div><span>CET-4</span><span>CET-6</span><span>多次校级奖学金</span></div>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(contact.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-art contact-art--one" aria-hidden="true" />
      <div className="contact-art contact-art--two" aria-hidden="true" />
      <div className="page-shell contact-shell">
        <Reveal className="contact-copy">
          <span className="eyebrow">CONTACT / NEXT CHAPTER</span>
          <h2>期待一起，<br />把 AI 从能力变成产品。</h2>
          <p>如果你正在寻找 AI 产品经理 / 产品助理，希望候选人既能梳理用户任务，也能把 AI 能力、异常兜底和实现边界一起落到原型中，欢迎联系我。</p>
        </Reveal>
        <Reveal className="contact-links" delay={80}>
          <a className="contact-link contact-link--primary" href={`mailto:${contact.email}`}>
            <span><Mail aria-hidden="true" />Email</span><strong>{contact.email}</strong><ArrowDownRight aria-hidden="true" />
          </a>
          <a className="contact-link" href={contact.github} target="_blank" rel="noreferrer">
            <span><GitFork aria-hidden="true" />GitHub</span><strong>@{contact.githubHandle}</strong><ExternalLink aria-hidden="true" />
          </a>
          <a className="contact-link" href={publicAsset('documents/resume.html')} target="_blank" rel="noreferrer">
            <span><Download aria-hidden="true" />Resume</span><strong>查看最新版简历</strong><ArrowDownRight aria-hidden="true" />
          </a>
          <div className="contact-link contact-link--muted">
            <span>Phone / WeChat</span><strong>{contact.phoneMasked}</strong><small>完整联系方式可在沟通后提供</small>
          </div>
          <button className="copy-email" type="button" onClick={copyEmail} aria-live="polite">
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{copied ? '已复制邮箱' : '复制邮箱'}
          </button>
        </Reveal>
        <footer className="site-footer">
          <span>吕灵慧 · AI PRODUCT MANAGER</span>
          <span>2027 届硕士 · 求职作品集</span>
          <a className="roll-link" href="#top" aria-label="返回顶部">
            <span className="nav-roll" aria-hidden="true">
              <span className="nav-roll__base">BACK TO TOP ↑</span>
              <span className="nav-roll__accent">BACK TO TOP ↑</span>
            </span>
          </a>
        </footer>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <TargetCursor
        spinDuration={4.8}
        hoverDuration={0.22}
        cursorColor="#252522"
        cursorColorOnDark="#f5f4f0"
        cursorColorOnTarget="#d56d63"
        parallaxOn
        hideDefaultCursor
      />
      <MotionDirector />
      <div className="page-entry" aria-hidden="true">
        <div className="page-entry__panel page-entry__panel--left" />
        <div className="page-entry__panel page-entry__panel--right" />
        <span className="page-entry__label">LLH / AI PRODUCT</span>
        <i className="page-entry__rule" />
      </div>
      <a className="skip-link" href="#main">跳到主要内容</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Method />
        <Capabilities />
        <Contact />
      </main>
    </>
  )
}
