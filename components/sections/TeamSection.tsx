'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight, MapPin, GraduationCap, Lightbulb } from 'lucide-react'

export default function TeamSection() {
  const t = useTranslations('about')
  const locale = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="relative py-28 md:py-36 overflow-hidden" id="about-preview" ref={ref}>
      {/* Background */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
        style={{
          background: 'linear-gradient(270deg, rgba(201,168,76,0.03) 0%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Visual side */}
          <div
            className={`relative transition-all duration-1000 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            {/* Portrait frame */}
            <div className="relative">
              {/* Decorative rings */}
              <div
                className="absolute -inset-6 rounded-3xl border border-[rgba(201,168,76,0.08)]"
                style={{ animation: 'rotateSlow 20s linear infinite' }}
              />
              <div
                className="absolute -inset-12 rounded-3xl border border-[rgba(201,168,76,0.04)]"
                style={{ animation: 'rotateSlow 30s linear infinite reverse' }}
              />

              {/* Main card */}
              <div className="relative glass-card p-8 md:p-10">
                {/* Gold accent top */}
                <div className="w-16 h-1 bg-gold-gradient rounded-full mb-6" />

                {/* Avatar placeholder with initials */}
                <div className="relative w-32 h-32 mb-6">
                  <div
                    className="w-32 h-32 rounded-2xl flex items-center justify-center text-5xl font-serif font-light"
                    style={{
                      background: 'linear-gradient(135deg, #1E3A5F 0%, #2D1B69 100%)',
                      border: '1px solid rgba(201,168,76,0.2)',
                    }}
                  >
                    VP
                  </div>
                  <div
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)' }}
                  >
                    <span className="text-[#0A0A0A] text-xs font-bold">CEO</span>
                  </div>
                </div>

                {/* Name & role */}
                <h3 className="text-3xl font-serif font-semibold text-[#F5F5F0] mb-1">
                  {t('name')}
                </h3>
                <p className="text-[#C9A84C] text-sm font-sans tracking-wide mb-6">{t('role')}</p>

                {/* Badges */}
                <div className="flex flex-col gap-3">
                  {[
                    { icon: MapPin, text: '台湾 → 東京', color: '#C9A84C' },
                    { icon: GraduationCap, text: '明治大学', color: '#9B7FFF' },
                    { icon: Lightbulb, text: '21歳起業', color: '#6DBF82' },
                  ].map((badge) => {
                    const BadgeIcon = badge.icon
                    return (
                      <div key={badge.text} className="flex items-center gap-2.5">
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center"
                          style={{ backgroundColor: `${badge.color}20` }}
                        >
                          <BadgeIcon size={13} style={{ color: badge.color }} />
                        </div>
                        <span className="text-sm text-[#B0AFA8] font-sans">{badge.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Floating stat cards */}
              <div
                className="absolute -top-4 -right-4 glass-card px-4 py-3 shadow-gold hidden md:block"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              >
                <div className="text-xl font-serif text-[#C9A84C] font-semibold">5言語</div>
                <div className="text-xs text-[#6B6A63] font-sans">対応言語</div>
              </div>
              <div
                className="absolute -bottom-4 -left-4 glass-card px-4 py-3 hidden md:block"
                style={{ animation: 'float 8s ease-in-out infinite 2s' }}
              >
                <div className="text-xl font-serif text-[#6DBF82] font-semibold">3事業</div>
                <div className="text-xs text-[#6B6A63] font-sans">展開中</div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold" />
              <span className="eyebrow">Founder</span>
            </div>

            <h2 className="section-heading text-[#F5F5F0] mb-3">
              {t('title')}
            </h2>
            <p className="text-[#6B6A63] font-sans text-sm mb-6">{t('origin')}</p>

            <div className="divider-gold mb-8" />

            <p className="text-[#B0AFA8] font-sans text-lg leading-relaxed mb-10">
              {t('bio')}
            </p>

            {/* Highlight quote */}
            <div className="glass-card p-6 mb-10 border-l-2 border-[#C9A84C]">
              <p className="font-serif text-xl text-[#F5F5F0] italic leading-relaxed">
                &ldquo;テクノロジー、エンターテイン 、文化 — この3つが交わるところに、私たちの仕事がある。&rdquo;
              </p>
              <p className="text-sm text-[#6B6A63] font-sans mt-3">— Vanessa Pan</p>
            </div>

            <Link
              href={`/${locale}/about`}
              id="about-preview-cta"
              className="btn-outline inline-flex"
            >
              {t('cta')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
