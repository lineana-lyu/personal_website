import { type PropsWithChildren } from 'react'

type RevealProps = PropsWithChildren<{
  className?: string
  delay?: number
}>

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  return (
    <div
      className={`reveal ${className}`}
      data-reveal-delay={delay}
    >
      {children}
    </div>
  )
}
