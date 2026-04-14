'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight, MapPin, GraduationCap } from 'lucide-react'

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
              <div className="relative glass-card overflow-hidden">
                {/* Gold accent top */}
                <div className="w-16 h-1 bg-gold-gradient rounded-full absolute top-0 left-8 z-10" />

                {/* Portrait image */}
                <div className="relative w-full" style={{ height: '320px' }}>
                  <Image
                    src="/images/team/vanessa.jpg"
                    alt="Vanessa Pan — Founder & CEO, Skillive Inc."
                    fill
                    priority
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Bottom gradient fade into card */}
                  <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[rgba(17,17,17,0.95)] to-transparent" />
                </div>

                {/* Name & role below image — mt-8 で写真バッジと完全分離 */}
                <div className="px-8 pt-8 pb-8">
                  <h3 className="text-2xl font-serif font-semibold text-[#F5F5F0] mb-0.5">
                    Vanessa Pan
                  </h3>
                  <p className="text-[#C9A84C] text-sm font-sans tracking-wide mb-5">
                    Founder &amp; CEO
                  </p>

                  {/* アイコンバッジ（台湾・明治大学のみ） */}
                  <div className="flex flex-col gap-3 mb-4">
                    {[
                      { icon: MapPin,        text: '台湾 → 東京', color: '#C9A84C' },
                      { icon: GraduationCap, text: '明治大学卒',  color: '#9B7FFF' },
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

                  {/* 実績テキスト行 — 写真内バッジとは完全に別レイヤー */}
                  <div className="flex items-center gap-2 text-sm font-sans flex-wrap">
                    <span
                      className="px-2 py-0.5 rounded"
                      style={{ backgroundColor: 'rgba(109,191,130,0.15)', color: '#6DBF82' }}
                    >
                      21歳起業
                    </span>
                    <span className="text-[#6B6A63]">/</span>
                    <span
                      className="px-2 py-0.5 rounded"
                      style={{ backgroundColor: 'rgba(109,191,130,0.15)', color: '#6DBF82' }}
                    >
                      2社イグジット
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating stat cards — positioned relative to outer .relative wrapper */}
              <div
                className="absolute top-3 right-3 glass-card px-4 py-3 shadow-gold hidden md:block z-20"
                style={{ animation: 'float 6s ease-in-out infinite', whiteSpace: 'nowrap' }}
              >
                <div className="text-xl font-serif text-[#C9A84C] font-semibold">5言語対応</div>
              </div>
              <div
                className="absolute bottom-3 left-3 glass-card px-4 py-3 hidden md:block z-20"
                style={{ animation: 'float 8s ease-in-out infinite 2s', whiteSpace: 'nowrap' }}
              >
                <div className="text-xl font-serif text-[#6DBF82] font-semibold">3事業展開中</div>
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
            <p className="text-[#6B6A63] font-sans text-sm mb-6">
              台湾出身 / 明治大学卒 / 21歳起業
            </p>

            <div className="divider-gold mb-8" />

            <p className="text-[#B0AFA8] font-sans text-lg leading-relaxed mb-10">
              台湾出身、明治大学卒。21歳で起業し、台湾・中国・日本にまたがる飲食・IT・半導体事業を経営。2度のイグジットを経験。
            </p>

            {/* Highlight quote */}
            <div className="glass-card p-6 mb-10 border-l-2 border-[#C9A84C]">
              <p className="font-serif text-xl text-[#F5F5F0] italic leading-relaxed">
                &ldquo;テクノロジー、エンターテインメント、文化 — この3つが交わるところに、私たちの仕事がある。&rdquo;
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
