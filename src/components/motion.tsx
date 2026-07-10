import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  return (
    <m.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay }}
    >
      {children}
    </m.div>
  )
}

export function Typed({ text, speed = 45 }: { text: string; speed?: number }) {
  const reduced = useReducedMotion()
  const [count, setCount] = useState(0)
  const done = reduced ? text.length : count

  useEffect(() => {
    if (reduced || count >= text.length) return
    const t = setTimeout(() => setCount((c) => c + 1), speed)
    return () => clearTimeout(t)
  }, [count, reduced, speed, text.length])

  return <span aria-label={text}>{text.slice(0, done)}</span>
}

export function SectionHeading({
  index,
  title,
}: {
  index: number
  title: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced || n >= index) {
      setN(index)
      return
    }
    const t = setTimeout(() => setN((v) => v + 1), 120)
    return () => clearTimeout(t)
  }, [inView, n, index, reduced])

  return (
    <div ref={ref} className="mb-8 font-mono text-xs text-faint">
      {String(n).padStart(2, '0')} ·{' '}
      <span className="font-semibold text-fg">{title}</span>
    </div>
  )
}
