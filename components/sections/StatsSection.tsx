'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { TrendingUp, Users, Building2, Clock } from 'lucide-react'

const stats = [
  {
    key: 'revenue' as const,
    valueKey: 'revenue_value' as const,
    icon: TrendingUp,
    raw: 12,
    suffix: '億円+',
    prefix: '¥',
    color: '#C9A84C',
    delay: 0,
  },
  {
    key: 'influencers' as const,
    valueKey: 'influencers_value' as const,
    icon: Users,
    raw: 89453,
    suffix: '+',
    prefix: '',
    color: '#9B7FFF',
    delay: 0.15,
  },
  {
    key: 'properties' as const,
    valueKey: 'properties_value' as const,
    icon: Building2,
    raw: 500,
    suffix: '件+',
    prefix: '',
    color: '#6DBF82',
    delay: 0.3,
  },
  {
    key: 'years' as const,
    valueKey: 'years_value' as const,
    icon: Clock,
    raw: 10,
    suffix: '年以上',
    prefix: '',
    color: '#4A9EFF',
    delay: 0.45,
  },
]

function AnimatedNumber({ target, prefix = '', suffix = '', color }: {
  target: number; prefix?: string; suffix?: string; color: string
}) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const duration = 2000
    const start = performance.now()

    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(target * ease))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [started, target])

  return (
    <div ref={ref} className="stat-number" style={{ color }}>
      {prefix}{count >= 10000 ? count.toLocaleString() : count}{suffix}
    </div>
  )
}

export default function StatsSection() {
  const t = useTranslations('stats')

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="stats">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0A0A0A 0%, #0D0D0D 50%, #0A0A0A 100%)',
        }}
      />
      <div className="divider-gold absolute top-0 left-0 right-0" />
      <div className="divider-gold absolute bottom-0 left-0 right-0" />

      {/* Large decorative number */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] font-serif font-bold pointer-events-none select-none leading-none"
        style={{ color: 'rgba(201,168,76,0.02)', right: '-2rem' }}
      >
        S
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="eyebrow">実績</span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="section-heading text-[#F5F5F0]">
            数字で見る<span className="gold-text">スキルライブ</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.key}
                className="glass-card p-8 text-center relative group hover:border-[rgba(201,168,76,0.25)] transition-all duration-300"
                id={`stat-${stat.key}`}
                style={{ animationDelay: `${stat.delay}s` }}
              >
                {/* Glow background */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at top, ${stat.color}08 0%, transparent 70%)`,
                  }}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-lg mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15`, border: `1px solid ${stat.color}30` }}
                  >
                    <Icon size={18} style={{ color: stat.color }} />
                  </div>

                  {/* Number */}
                  <AnimatedNumber
                    target={stat.raw}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    color={stat.color}
                  />

                  {/* Label */}
                  <p className="text-sm text-[#6B6A63] font-sans mt-3 tracking-wide">
                    {t(stat.key)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
