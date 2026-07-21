import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './TargetCursor.css'

type TargetCursorProps = {
  targetSelector?: string
  darkSurfaceSelector?: string
  spinDuration?: number
  hoverDuration?: number
  hideDefaultCursor?: boolean
  parallaxOn?: boolean
  cursorColor?: string
  cursorColorOnDark?: string
  cursorColorOnTarget?: string
}

const CORNER_SIZE = 11
const REST_RADIUS = 15
const TARGET_PADDING = 6

const restPositions = [
  { x: -REST_RADIUS, y: -REST_RADIUS },
  { x: REST_RADIUS - CORNER_SIZE, y: -REST_RADIUS },
  { x: REST_RADIUS - CORNER_SIZE, y: REST_RADIUS - CORNER_SIZE },
  { x: -REST_RADIUS, y: REST_RADIUS - CORNER_SIZE },
]

export function TargetCursor({
  targetSelector = 'a[href]:not(.skip-link), button:not(:disabled), .cursor-target',
  darkSurfaceSelector = '.contact, .project-visual, .mobile-navigation',
  spinDuration = 4.8,
  hoverDuration = 0.22,
  hideDefaultCursor = true,
  parallaxOn = true,
  cursorColor = '#252522',
  cursorColorOnDark = '#f5f4f0',
  cursorColorOnTarget = '#d56d63',
}: TargetCursorProps) {
  const [enabled, setEnabled] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const activeTargetRef = useRef<HTMLElement | null>(null)
  const pointerRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const overDarkRef = useRef(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const desktop = window.matchMedia('(min-width: 769px)')
    const update = () => setEnabled(finePointer.matches && desktop.matches)
    update()
    finePointer.addEventListener('change', update)
    desktop.addEventListener('change', update)
    return () => {
      finePointer.removeEventListener('change', update)
      desktop.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!enabled || !cursor || !dot) return

    const corners = Array.from(cursor.querySelectorAll<HTMLElement>('.target-cursor-corner'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let spinTimeline: gsap.core.Timeline | null = null
    let currentLeaveHandler: (() => void) | null = null
    let resumeTimer: number | null = null
    let visible = false

    const restColor = () => (overDarkRef.current ? cursorColorOnDark : cursorColor)
    const colorCursor = (color: string, duration = 0.16) => {
      gsap.to(corners, { borderColor: color, duration, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(dot, { backgroundColor: color, duration, ease: 'power2.out', overwrite: 'auto' })
    }

    const startSpin = () => {
      spinTimeline?.kill()
      if (reducedMotion) {
        gsap.set(cursor, { rotation: 0 })
        return
      }
      spinTimeline = gsap.timeline({ repeat: -1 }).to(cursor, {
        rotation: '+=360',
        duration: spinDuration,
        ease: 'none',
      })
    }

    const targetPositions = (target: HTMLElement) => {
      const rect = target.getBoundingClientRect()
      const cursorX = Number(gsap.getProperty(cursor, 'x'))
      const cursorY = Number(gsap.getProperty(cursor, 'y'))
      return [
        { x: rect.left - TARGET_PADDING - cursorX, y: rect.top - TARGET_PADDING - cursorY },
        { x: rect.right + TARGET_PADDING - CORNER_SIZE - cursorX, y: rect.top - TARGET_PADDING - cursorY },
        { x: rect.right + TARGET_PADDING - CORNER_SIZE - cursorX, y: rect.bottom + TARGET_PADDING - CORNER_SIZE - cursorY },
        { x: rect.left - TARGET_PADDING - cursorX, y: rect.bottom + TARGET_PADDING - CORNER_SIZE - cursorY },
      ]
    }

    const trackTarget = () => {
      const target = activeTargetRef.current
      if (!target || !document.body.contains(target)) return
      const positions = targetPositions(target)
      corners.forEach((corner, index) => {
        gsap.to(corner, {
          ...positions[index],
          duration: parallaxOn && !reducedMotion ? 0.14 : 0,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
    }

    const releaseTarget = () => {
      const target = activeTargetRef.current
      if (!target) return
      target.classList.remove('is-cursor-targeted')
      if (currentLeaveHandler) target.removeEventListener('mouseleave', currentLeaveHandler)
      currentLeaveHandler = null
      activeTargetRef.current = null
      cursor.classList.remove('is-targeting')
      gsap.ticker.remove(trackTarget)
      colorCursor(restColor())
      gsap.to(cursor, { scale: 1, duration: reducedMotion ? 0 : 0.18, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(dot, { scale: 1, duration: reducedMotion ? 0 : 0.18, ease: 'power2.out', overwrite: 'auto' })
      corners.forEach((corner, index) => {
        gsap.to(corner, { ...restPositions[index], duration: reducedMotion ? 0 : 0.28, ease: 'power3.out', overwrite: 'auto' })
      })
      if (resumeTimer) window.clearTimeout(resumeTimer)
      resumeTimer = window.setTimeout(() => startSpin(), reducedMotion ? 0 : 80)
    }

    const activateTarget = (target: HTMLElement) => {
      if (activeTargetRef.current === target) return
      if (activeTargetRef.current) releaseTarget()
      if (resumeTimer) window.clearTimeout(resumeTimer)

      activeTargetRef.current = target
      target.classList.add('is-cursor-targeted')
      cursor.classList.add('is-targeting')
      spinTimeline?.pause()
      gsap.to(cursor, { rotation: 0, duration: reducedMotion ? 0 : 0.18, ease: 'power2.out' })
      colorCursor(cursorColorOnTarget)

      const positions = targetPositions(target)
      corners.forEach((corner, index) => {
        gsap.to(corner, { ...positions[index], duration: reducedMotion ? 0 : hoverDuration, ease: 'power3.out', overwrite: 'auto' })
      })
      gsap.ticker.add(trackTarget)

      currentLeaveHandler = releaseTarget
      target.addEventListener('mouseleave', currentLeaveHandler)
    }

    const syncSurface = (element: Element | null) => {
      const nextDark = Boolean(element?.closest(darkSurfaceSelector))
      if (nextDark === overDarkRef.current) return
      overDarkRef.current = nextDark
      cursor.dataset.surface = nextDark ? 'dark' : 'light'
      if (!activeTargetRef.current) colorCursor(restColor())
    }

    const moveX = gsap.quickTo(cursor, 'x', { duration: reducedMotion ? 0 : 0.11, ease: 'power3.out' })
    const moveY = gsap.quickTo(cursor, 'y', { duration: reducedMotion ? 0 : 0.11, ease: 'power3.out' })
    const moveHandler = (event: MouseEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY }
      moveX(event.clientX)
      moveY(event.clientY)
      syncSurface(document.elementFromPoint(event.clientX, event.clientY))
      if (!visible) {
        visible = true
        cursor.classList.add('is-visible')
      }
    }

    const overHandler = (event: MouseEvent) => {
      const origin = event.target
      if (!(origin instanceof Element)) return
      const target = origin.closest<HTMLElement>(targetSelector)
      if (target) activateTarget(target)
    }

    const scrollHandler = () => {
      const target = activeTargetRef.current
      if (!target) return
      const { x, y } = pointerRef.current
      const element = document.elementFromPoint(x, y)
      if (!element || element.closest(targetSelector) !== target) releaseTarget()
    }

    const downHandler = () => {
      gsap.to(cursor, { scale: 0.88, duration: reducedMotion ? 0 : 0.12, ease: 'power2.out' })
      gsap.to(dot, { scale: 0.55, duration: reducedMotion ? 0 : 0.12 })
    }
    const upHandler = () => {
      gsap.to(cursor, { scale: 1, duration: reducedMotion ? 0 : 0.2, ease: 'back.out(2)' })
      gsap.to(dot, { scale: 1, duration: reducedMotion ? 0 : 0.2, ease: 'back.out(2)' })
    }
    const leaveWindowHandler = () => cursor.classList.remove('is-visible')
    const enterWindowHandler = () => cursor.classList.add('is-visible')

    gsap.set(cursor, { x: pointerRef.current.x, y: pointerRef.current.y, rotation: 0 })
    corners.forEach((corner, index) => gsap.set(corner, { ...restPositions[index], borderColor: cursorColor }))
    gsap.set(dot, { backgroundColor: cursorColor })
    if (hideDefaultCursor) document.documentElement.classList.add('target-cursor-enabled')
    startSpin()

    window.addEventListener('mousemove', moveHandler, { passive: true })
    window.addEventListener('mouseover', overHandler, { passive: true })
    window.addEventListener('scroll', scrollHandler, { passive: true })
    window.addEventListener('mousedown', downHandler)
    window.addEventListener('mouseup', upHandler)
    window.addEventListener('blur', upHandler)
    document.documentElement.addEventListener('mouseleave', leaveWindowHandler)
    document.documentElement.addEventListener('mouseenter', enterWindowHandler)

    return () => {
      if (resumeTimer) window.clearTimeout(resumeTimer)
      if (activeTargetRef.current && currentLeaveHandler) {
        activeTargetRef.current.removeEventListener('mouseleave', currentLeaveHandler)
        activeTargetRef.current.classList.remove('is-cursor-targeted')
      }
      gsap.ticker.remove(trackTarget)
      spinTimeline?.kill()
      gsap.killTweensOf([cursor, dot, ...corners])
      window.removeEventListener('mousemove', moveHandler)
      window.removeEventListener('mouseover', overHandler)
      window.removeEventListener('scroll', scrollHandler)
      window.removeEventListener('mousedown', downHandler)
      window.removeEventListener('mouseup', upHandler)
      window.removeEventListener('blur', upHandler)
      document.documentElement.removeEventListener('mouseleave', leaveWindowHandler)
      document.documentElement.removeEventListener('mouseenter', enterWindowHandler)
      document.documentElement.classList.remove('target-cursor-enabled')
      activeTargetRef.current = null
    }
  }, [
    cursorColor,
    cursorColorOnDark,
    cursorColorOnTarget,
    darkSurfaceSelector,
    enabled,
    hideDefaultCursor,
    hoverDuration,
    parallaxOn,
    spinDuration,
    targetSelector,
  ])

  if (!enabled) return null

  return (
    <div ref={cursorRef} className="target-cursor-wrapper" aria-hidden="true">
      <span ref={dotRef} className="target-cursor-dot" />
      <span className="target-cursor-corner target-cursor-corner--tl" />
      <span className="target-cursor-corner target-cursor-corner--tr" />
      <span className="target-cursor-corner target-cursor-corner--br" />
      <span className="target-cursor-corner target-cursor-corner--bl" />
    </div>
  )
}
