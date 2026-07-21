import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const OPENING_KEY = 'llh-opening-played'
const EASE_OUT = 'power4.out'
const EASE_IN_OUT = 'power4.inOut'

function clearEntranceTransform(element: HTMLElement) {
  gsap.set(element, { clearProps: 'transform,opacity,visibility' })
}

export function MotionDirector() {
  useLayoutEffect(() => {
    const root = document.getElementById('root')
    if (!root) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const compactViewport = window.matchMedia('(max-width: 768px)').matches
    const context = gsap.context(() => {
      const pageEntry = root.querySelector<HTMLElement>('.page-entry')
      const animatedContent = root.querySelectorAll<HTMLElement>('.reveal')

      if (reducedMotion) {
        if (pageEntry) gsap.set(pageEntry, { display: 'none' })
        gsap.set(animatedContent, { clearProps: 'all' })
        return
      }

      document.body.classList.add('motion-ready')

      const heroMedia = root.querySelector<HTMLElement>('.hero-media')
      const header = root.querySelector<HTMLElement>('.site-header')
      const heroTitleLines = root.querySelectorAll<HTMLElement>('.hero-title-line > span')
      const heroPrelude = root.querySelectorAll<HTMLElement>('.hero-topline, .hero-name, .hero-kicker')
      const heroRelief = root.querySelector<HTMLElement>('.hero-relief-word')
      const heroBottom = root.querySelector<HTMLElement>('.hero-bottomline')
      const heroAnchors = root.querySelectorAll<HTMLElement>('.scroll-cue, .hero-index')
      const entryPanels = root.querySelectorAll<HTMLElement>('.page-entry__panel')
      const entryLabel = root.querySelector<HTMLElement>('.page-entry__label')
      const entryRule = root.querySelector<HTMLElement>('.page-entry__rule')
      const hasPlayed = window.sessionStorage.getItem(OPENING_KEY) === '1'
      if (!hasPlayed) document.body.classList.add('opening-active')

      gsap.set(header, { yPercent: -115 })
      gsap.set(heroMedia, {
        clipPath: compactViewport ? 'inset(0 0 12% 0)' : 'inset(0 18% 0 0)',
        scale: compactViewport ? 1.02 : 1.055,
        transformOrigin: 'center center',
      })
      gsap.set(heroPrelude, { autoAlpha: 0, y: compactViewport ? 24 : 38 })
      gsap.set(heroTitleLines, { yPercent: 118, scaleY: 0.68, transformOrigin: 'center bottom' })
      gsap.set(heroRelief, { autoAlpha: 0, y: compactViewport ? 28 : 50, scaleY: 0.64, transformOrigin: 'center bottom' })
      gsap.set(heroBottom, { autoAlpha: 0, y: 34 })
      gsap.set(heroAnchors, { autoAlpha: 0, y: 18 })

      const opening = gsap.timeline({
        defaults: { ease: EASE_OUT },
        onComplete: () => {
          if (pageEntry) gsap.set(pageEntry, { display: 'none' })
          document.body.classList.remove('opening-active')
          window.sessionStorage.setItem(OPENING_KEY, '1')
          ScrollTrigger.refresh()
        },
      })

      if (hasPlayed) {
        opening
          .set(pageEntry, { display: 'none' })
          .to(header, { yPercent: 0, duration: 0.48 }, 0)
          .to(heroMedia, { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 0.72 }, 0)
          .to(heroPrelude, { autoAlpha: 1, y: 0, duration: 0.58, stagger: 0.05 }, 0.08)
          .to(heroTitleLines, { yPercent: 0, scaleY: 1, duration: 0.78, stagger: 0.07 }, 0.12)
          .to(heroRelief, { autoAlpha: 1, y: 0, scaleY: 1, duration: 0.72 }, 0.22)
          .to(heroBottom, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.3)
          .to(heroAnchors, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.38)
      } else {
        gsap.set(entryRule, { scaleY: 0, transformOrigin: 'center center' })
        gsap.set(entryLabel, { autoAlpha: 0, y: 18, letterSpacing: '0.32em' })
        opening
          .to(entryLabel, { autoAlpha: 1, y: 0, letterSpacing: '0.2em', duration: 0.62 }, 0.08)
          .to(entryRule, { scaleY: 1, duration: 0.72, ease: EASE_IN_OUT }, 0.12)
          .to(entryLabel, { autoAlpha: 0, y: -16, duration: 0.34, ease: 'power2.in' }, 0.72)
          .to(entryPanels[0], { xPercent: -102, duration: 1.08, ease: EASE_IN_OUT }, 0.78)
          .to(entryPanels[1], { xPercent: 102, duration: 1.08, ease: EASE_IN_OUT }, 0.78)
          .to(entryRule, { scaleY: 0, duration: 0.42, ease: 'power3.in' }, 0.78)
          .to(header, { yPercent: 0, duration: 0.9 }, 1.02)
          .to(heroMedia, { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 1.42 }, 0.92)
          .to(heroPrelude, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09 }, 1.16)
          .to(heroTitleLines, { yPercent: 0, scaleY: 1, duration: 1.18, stagger: 0.12 }, 1.32)
          .to(heroRelief, { autoAlpha: 1, y: 0, scaleY: 1, duration: 1.08 }, 1.58)
          .to(heroBottom, { autoAlpha: 1, y: 0, duration: 0.82 }, 1.74)
          .to(heroAnchors, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }, 1.9)
      }

      const chapters = root.querySelectorAll<HTMLElement>('.section, .contact')
      chapters.forEach((chapter) => {
        const heading = chapter.querySelector<HTMLElement>('.section-heading, .contact-copy')
        if (!heading) return
        const eyebrow = heading.querySelector<HTMLElement>('.eyebrow')
        const number = heading.querySelector<HTMLElement>('.section-number')
        const title = heading.querySelector<HTMLElement>('h2')
        const lead = heading.querySelector<HTMLElement>('.section-heading__lead, .contact-copy > p')
        if (!title) return

        const isContact = chapter.classList.contains('contact')
        const titleStyle = getComputedStyle(title)
        const finalColor = titleStyle.color
        const finalShadow = titleStyle.textShadow === 'none' ? '0 0 0 rgba(0, 0, 0, 0)' : titleStyle.textShadow
        const reliefColor = isContact ? '#30302d' : '#e7e6e1'
        const reliefShadow = isContact
          ? '-3px -3px 6px rgba(255,255,255,.025), 9px 11px 18px rgba(0,0,0,.46)'
          : '-3px -3px 5px rgba(255,255,255,.96), 8px 10px 16px rgba(49,50,47,.22)'

        gsap.set([number, eyebrow].filter(Boolean), { autoAlpha: 0, y: compactViewport ? 18 : 28 })
        gsap.set(title, {
          autoAlpha: 0,
          x: compactViewport ? 28 : 72,
          y: compactViewport ? 20 : 38,
          scaleX: compactViewport ? 1.025 : 1.06,
          scaleY: compactViewport ? 0.82 : 0.68,
          color: reliefColor,
          textShadow: reliefShadow,
          transformOrigin: 'left bottom',
        })
        if (lead) gsap.set(lead, { autoAlpha: 0, y: compactViewport ? 22 : 34 })

        const headingTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: compactViewport ? 'top 84%' : 'top 72%',
            once: true,
          },
          defaults: { ease: EASE_OUT },
        })
        headingTimeline
          .to([number, eyebrow].filter(Boolean), {
            autoAlpha: 1,
            y: 0,
            duration: compactViewport ? 0.48 : 0.68,
            stagger: 0.08,
          })
          .to(title, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            duration: compactViewport ? 0.86 : 1.2,
          }, compactViewport ? 0.12 : 0.16)
          .to(title, {
            color: finalColor,
            textShadow: finalShadow,
            duration: compactViewport ? 0.54 : 0.7,
            ease: 'power2.out',
          }, compactViewport ? 0.48 : 0.64)
          .set(title, { clearProps: 'transform,color,textShadow,opacity,visibility' }, compactViewport ? 1.04 : 1.38)

        if (lead) {
          headingTimeline.to(lead, {
            autoAlpha: 1,
            y: 0,
            duration: compactViewport ? 0.58 : 0.78,
          }, compactViewport ? 0.52 : 0.72)
        }
      })

      const reveals = root.querySelectorAll<HTMLElement>('.reveal:not(.section-heading):not(.contact-copy)')
      reveals.forEach((element) => {
        const itemDelay = Math.min(Number(element.dataset.revealDelay || 0) / 1000, 0.28)
        const chapterDelay = element.closest('.section, .contact') ? (compactViewport ? 0.48 : 0.78) : 0
        const delay = itemDelay + chapterDelay
        const triggerStart = compactViewport ? 'top 91%' : 'top 84%'

        if (element.classList.contains('case-visual-wrap')) {
          const visual = element.querySelector<HTMLElement>('.project-visual')
          gsap.set(element, { clipPath: 'inset(0 0 100% 0)' })
          if (visual) gsap.set(visual, { scale: 1.055, y: compactViewport ? 28 : 54, transformOrigin: 'center center' })
          const timeline = gsap.timeline({ scrollTrigger: { trigger: element, start: triggerStart, once: true }, delay })
          timeline.to(element, { clipPath: 'inset(0 0 0% 0)', duration: compactViewport ? 0.9 : 1.28, ease: EASE_IN_OUT })
          if (visual) timeline.to(visual, { scale: 1, y: 0, duration: compactViewport ? 0.9 : 1.35, ease: EASE_OUT }, 0.08)
          return
        }

        if (element.classList.contains('method-track')) {
          const steps = element.querySelectorAll<HTMLElement>('.method-step')
          gsap.set(steps, { autoAlpha: 0, x: compactViewport ? 28 : 62 })
          gsap.to(steps, {
            autoAlpha: 1,
            x: 0,
            duration: compactViewport ? 0.58 : 0.86,
            stagger: compactViewport ? 0.045 : 0.075,
            ease: EASE_OUT,
            scrollTrigger: { trigger: element, start: triggerStart, once: true },
          })
          return
        }

        const children = element.classList.contains('contact-links')
          ? element.querySelectorAll<HTMLElement>('.contact-link, .copy-email')
          : element.classList.contains('case-details')
            ? element.querySelectorAll<HTMLElement>('.case-details-title, dl > div')
            : null

        if (children?.length) {
          gsap.set(children, { autoAlpha: 0, y: compactViewport ? 28 : 52 })
          gsap.to(children, {
            autoAlpha: 1,
            y: 0,
            duration: compactViewport ? 0.62 : 0.88,
            stagger: compactViewport ? 0.055 : 0.09,
            delay,
            ease: EASE_OUT,
            scrollTrigger: { trigger: element, start: triggerStart, once: true },
          })
          return
        }

        const x = element.classList.contains('capability-row') ? (compactViewport ? 36 : 92) : 0
        gsap.fromTo(
          element,
          { autoAlpha: 0, x, y: x ? 0 : compactViewport ? 34 : 68, scaleY: x ? 1 : 0.96, transformOrigin: 'center top' },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scaleY: 1,
            duration: compactViewport ? 0.7 : 1,
            delay,
            ease: EASE_OUT,
            onComplete: () => clearEntranceTransform(element),
            scrollTrigger: { trigger: element, start: triggerStart, once: true },
          },
        )
      })

      if (!compactViewport) {
        root.querySelectorAll<HTMLElement>('.case-visual-wrap').forEach((wrapper) => {
          const visual = wrapper.querySelector<HTMLElement>('.project-visual')
          if (!visual) return
          gsap.fromTo(
            visual,
            { yPercent: -2.5 },
            {
              yPercent: 2.5,
              ease: 'none',
              scrollTrigger: {
                trigger: wrapper,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7,
              },
            },
          )
        })
      }

      window.requestAnimationFrame(() => ScrollTrigger.refresh())
    }, root)

    return () => {
      document.body.classList.remove('motion-ready')
      document.body.classList.remove('opening-active')
      context.revert()
    }
  }, [])

  return null
}
