import { useLayoutEffect, useRef } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { gsap } from 'gsap'
import './StaggeredMenu.css'

type MenuItem = {
  label: string
  href: string
}

type StaggeredMenuProps = {
  open: boolean
  items: MenuItem[]
  email: string
  github: string
  onOpenChange: (open: boolean) => void
}

export function StaggeredMenu({ open, items, email, github, onOpenChange }: StaggeredMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const backdropRef = useRef<HTMLButtonElement>(null)
  const textInnerRef = useRef<HTMLSpanElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const previousOpenRef = useRef(open)

  useLayoutEffect(() => {
    const root = rootRef.current
    const panel = panelRef.current
    if (!root || !panel) return

    const layers = root.querySelectorAll<HTMLElement>('.staggered-menu__layer')
    const labels = root.querySelectorAll<HTMLElement>('.staggered-menu__label')
    const indexes = root.querySelectorAll<HTMLElement>('.staggered-menu__index')
    const meta = root.querySelectorAll<HTMLElement>('.staggered-menu__meta > *')

    gsap.set([panel, ...layers], { xPercent: 104, visibility: 'hidden' })
    gsap.set(labels, { yPercent: 125, rotate: 5, transformOrigin: 'left bottom' })
    gsap.set(indexes, { autoAlpha: 0, y: 14 })
    gsap.set(meta, { autoAlpha: 0, y: 20 })
    gsap.set(backdropRef.current, { autoAlpha: 0 })

    return () => {
      timelineRef.current?.kill()
    }
  }, [])

  useLayoutEffect(() => {
    if (previousOpenRef.current === open) return
    previousOpenRef.current = open

    const root = rootRef.current
    const panel = panelRef.current
    if (!root || !panel) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const layers = [...root.querySelectorAll<HTMLElement>('.staggered-menu__layer')]
    const labels = [...root.querySelectorAll<HTMLElement>('.staggered-menu__label')]
    const indexes = [...root.querySelectorAll<HTMLElement>('.staggered-menu__index')]
    const meta = [...root.querySelectorAll<HTMLElement>('.staggered-menu__meta > *')]
    const textInner = textInnerRef.current
    const icon = iconRef.current
    const lineHeight = root.querySelector<HTMLElement>('.staggered-menu__toggle-text')?.offsetHeight || 12

    timelineRef.current?.kill()

    if (reducedMotion) {
      gsap.set([panel, ...layers], { xPercent: open ? 0 : 104, visibility: open ? 'visible' : 'hidden' })
      gsap.set(backdropRef.current, { autoAlpha: open ? 1 : 0 })
      gsap.set(labels, { yPercent: 0, rotate: 0 })
      gsap.set(indexes, { autoAlpha: 1, y: 0 })
      gsap.set(meta, { autoAlpha: 1, y: 0 })
      gsap.set(textInner, { y: open ? -lineHeight * 3 : 0 })
      gsap.set(icon, { rotate: open ? 225 : 0 })
      return
    }

    if (open) {
      gsap.set([panel, ...layers], { visibility: 'visible' })
      gsap.set(labels, { yPercent: 125, rotate: 5 })
      gsap.set(indexes, { autoAlpha: 0, y: 14 })
      gsap.set(meta, { autoAlpha: 0, y: 20 })

      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } })
      timeline
        .to(backdropRef.current, { autoAlpha: 1, duration: 0.36 }, 0)
        .to(layers[0], { xPercent: 0, duration: 0.56 }, 0)
        .to(layers[1], { xPercent: 0, duration: 0.58 }, 0.07)
        .to(panel, { xPercent: 0, duration: 0.72 }, 0.14)
        .to(textInner, { y: -lineHeight * 3, duration: 0.76 }, 0)
        .to(icon, { rotate: 225, duration: 0.78 }, 0)
        .to(labels, { yPercent: 0, rotate: 0, duration: 0.84, stagger: 0.075 }, 0.34)
        .to(indexes, { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.06, ease: 'power2.out' }, 0.44)
        .to(meta, { autoAlpha: 1, y: 0, duration: 0.58, stagger: 0.06, ease: 'power3.out' }, 0.7)

      timelineRef.current = timeline
      return
    }

    const timeline = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        gsap.set([panel, ...layers], { visibility: 'hidden' })
        gsap.set(labels, { yPercent: 125, rotate: 5 })
      },
    })
    timeline
      .to(labels, { yPercent: -118, rotate: -3, duration: 0.28, stagger: 0.025 }, 0)
      .to(meta, { autoAlpha: 0, y: 12, duration: 0.2 }, 0)
      .to(indexes, { autoAlpha: 0, y: -8, duration: 0.2 }, 0)
      .to(panel, { xPercent: 104, duration: 0.46 }, 0.08)
      .to(layers[1], { xPercent: 104, duration: 0.42 }, 0.14)
      .to(layers[0], { xPercent: 104, duration: 0.4 }, 0.19)
      .to(backdropRef.current, { autoAlpha: 0, duration: 0.32 }, 0.1)
      .to(textInner, { y: 0, duration: 0.44 }, 0)
      .to(icon, { rotate: 0, duration: 0.44 }, 0)

    timelineRef.current = timeline
  }, [open])

  return (
    <div ref={rootRef} className="staggered-menu" data-open={open || undefined}>
      <button
        className="staggered-menu__toggle"
        type="button"
        aria-label={open ? '关闭导航菜单' : '打开导航菜单'}
        aria-expanded={open}
        aria-controls="staggered-navigation"
        onClick={() => onOpenChange(!open)}
      >
        <span className="staggered-menu__toggle-text" aria-hidden="true">
          <span ref={textInnerRef} className="staggered-menu__toggle-text-inner">
            <span>Menu</span><span>Close</span><span>Menu</span><span>Close</span>
          </span>
        </span>
        <span ref={iconRef} className="staggered-menu__icon" aria-hidden="true"><i /><i /></span>
      </button>

      <button
        ref={backdropRef}
        className="staggered-menu__backdrop"
        type="button"
        aria-label="关闭导航菜单"
        tabIndex={open ? 0 : -1}
        onClick={() => onOpenChange(false)}
      />
      <div className="staggered-menu__layers" aria-hidden="true">
        <div className="staggered-menu__layer staggered-menu__layer--stone" />
        <div className="staggered-menu__layer staggered-menu__layer--coral" />
      </div>

      <aside id="staggered-navigation" ref={panelRef} className="staggered-menu__panel" aria-hidden={!open}>
        <div className="staggered-menu__panel-mark" aria-hidden="true">LLH / 2027</div>
        <nav aria-label="移动端主导航">
          <ol className="staggered-menu__list">
            {items.map((item, index) => (
              <li key={item.href}>
                <a href={item.href} tabIndex={open ? 0 : -1} onClick={() => onOpenChange(false)}>
                  <span className="staggered-menu__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="staggered-menu__label-wrap"><span className="staggered-menu__label">{item.label}</span></span>
                  <ArrowDownRight aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="staggered-menu__meta">
          <p><span />Open to AI Product Manager Internships</p>
          <a href={`mailto:${email}`} tabIndex={open ? 0 : -1}>{email}</a>
          <a href={github} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>GitHub ↗</a>
          <small>PORTFOLIO / 2027</small>
        </div>
      </aside>
    </div>
  )
}
