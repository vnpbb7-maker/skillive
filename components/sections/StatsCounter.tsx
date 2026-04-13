'use client'

import { useEffect, useRef, useState } from 'react'

/* ─── Stat data ──────────────────────────────────── */
const STATS = [
  {
    value:    1_200_000_000,
    prefix:   '¥',
    suffix:   '',
    label:    'Annual Order Amount',
    display:  '¥1,200,000,000',
  },
  {
    value:    89_453,
    prefix:   '',
    suffix:   '',
    label:    'Influencer Network',
    display:  '89,453',
  },
  {
    value:    500,
    prefix:   '',
    suffix:   '',
    label:    'Real Estate Deals',
    display:  '500',
  },
  {
    value:    10,
    prefix:   '',
    suffix:   '+',
    label:    'Years in Tokyo',
    display:  '10+',
  },
] as const

/* ─── Easing ─────────────────────────────────────── */
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

/* ─── Single animated counter ───────────────────── */
function Counter({
  value,
  prefix,
  suffix,
  duration = 2000,
  started,
}: {
  value: number
  prefix: string
  suffix: string
  duration?: number
  started: boolean
}) {
  const [current, setCurrent] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!started) return

    startTimeRef.current = null

    const step = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased   = easeOut(progress)

      setCurrent(Math.floor(eased * value))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setCurrent(value)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current) }
  }, [started, value, duration])

  const formatted =
    value === 10
      ? `${prefix}${current}${suffix}`
      : `${prefix}${new Intl.NumberFormat('en-US').format(current)}${suffix}`

  return <span>{formatted}</span>
}

/* ─── StatsCounter section ──────────────────────── */
export default function StatsCounter() {
  const [started, setStarted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-sf-1 py-section"
      aria-label="実績数値"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Top divider */}
        <div className="divider-gold mb-16" />

        {/* Grid */}
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <dt className="font-serif text-4xl md:text-5xl text-sk-gold tabular-nums">
                <Counter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  started={started}
                />
              </dt>
              <dd className="font-sans text-label text-sk-muted mt-3 uppercase tracking-widest">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>

        {/* Bottom divider */}
        <div className="divider-gold mt-16" />
      </div>
    </section>
  )
}
