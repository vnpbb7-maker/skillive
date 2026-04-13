'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Server, Users, Home, ArrowRight, Zap, Network, Globe } from 'lucide-react'

const businesses = [
  {
    key: 'gpu' as const,
    href: 'gpu-hardware',
    icon: Server,
    accentColor: '#1E3A5F',
    accentGlow: 'rgba(30,58,95,0.6)',
    lightColor: '#4A9EFF',
    tags: ['NVIDIA H100', 'AI Infrastructure', 'Enterprise'],
    subIcon: Zap,
  },
  {
    key: 'staffing' as const,
    href: 'staffing',
    icon: Users,
    accentColor: '#2D1B69',
    accentGlow: 'rgba(45,27,105,0.6)',
    lightColor: '#9B7FFF',
    tags: ['89,453 Influencers', 'Cross-border PR', 'Recruitment'],
    subIcon: Network,
  },
  {
    key: 'kominka' as const,
    href: 'kominka',
    icon: Home,
    accentColor: '#1C3A2B',
    accentGlow: 'rgba(28,58,43,0.6)',
    lightColor: '#6DBF82',
    tags: ['Renovation', 'Hospitality', 'Japan Culture'],
    subIcon: Globe,
  },
]

function useIntersectionObserver(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, visible }
}

export default function BusinessGrid() {
  const t = useTranslations('businesses')
  const locale = useLocale()
  const { ref, visible } = useIntersectionObserver()

  return (
    <section id="businesses" className="relative py-28 md:py-36" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-gold" />
            <span className="eyebrow">Our Businesses</span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="section-heading text-[#F5F5F0] mb-4">{t('title')}</h2>
          <p className="text-[#B0AFA8] font-sans text-lg max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Business cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {businesses.map((biz, idx) => {
            const Icon = biz.icon
            const SubIcon = biz.subIcon

            return (
              <div
                key={biz.key}
                className={`group relative glass-card glass-card-hover overflow-hidden transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${idx * 0.15 + 0.2}s` }}
              >
                {/* Card gradient background */}
                <div
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${biz.accentColor} 0%, transparent 60%)`,
                  }}
                />

                {/* Glow effect */}
                <div
                  className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse, ${biz.accentGlow} 0%, transparent 70%)`,
                    filter: 'blur(30px)',
                  }}
                />

                <div className="relative p-8 flex flex-col h-full">
                  {/* Icon & Label */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${biz.accentColor}aa`, border: `1px solid ${biz.lightColor}33` }}
                    >
                      <Icon size={24} style={{ color: biz.lightColor }} />
                    </div>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center opacity-40 group-hover:opacity-70 transition-opacity"
                      style={{ backgroundColor: `${biz.accentColor}66` }}
                    >
                      <SubIcon size={14} style={{ color: biz.lightColor }} />
                    </div>
                  </div>

                  {/* Label eyebrow */}
                  <span
                    className="text-xs font-sans font-medium tracking-widest uppercase mb-3"
                    style={{ color: biz.lightColor }}
                  >
                    {t(`${biz.key}.label`)}
                  </span>

                  {/* Title */}
                  <h3 className="section-subheading text-[#F5F5F0] mb-4 leading-tight">
                    {t(`${biz.key}.title`)}
                    <br />
                    <span className="gold-text">{t(`${biz.key}.title2`)}</span>
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#B0AFA8] font-sans leading-relaxed mb-8 flex-1">
                    {t(`${biz.key}.desc`)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {biz.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-sans px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: `${biz.accentColor}55`,
                          color: biz.lightColor,
                          border: `1px solid ${biz.lightColor}33`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/${locale}/${biz.href}`}
                    id={`business-card-${biz.key}-link`}
                    className="inline-flex items-center gap-2 text-sm font-sans font-medium group/link"
                    style={{ color: biz.lightColor }}
                  >
                    <span className="border-b border-current pb-0.5 group-hover/link:border-opacity-100 transition-all">
                      {t(`${biz.key}.cta`)}
                    </span>
                    <ArrowRight
                      size={14}
                      className="group-hover/link:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{
                    background: `linear-gradient(90deg, ${biz.lightColor}, transparent)`,
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
