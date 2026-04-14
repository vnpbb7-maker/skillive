'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight } from 'lucide-react'

export default function TeamSection() {
  const tAbout = useTranslations('about')
  const t      = useTranslations('team')
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
            {/* Portrait card — バッジはすべてコンテナ外フロー配置 */}
            <div className="glass-card overflow-hidden">
              {/* Gold accent top */}
              <div className="w-16 h-1 bg-gold-gradient rounded-full absolute top-0 left-8 z-10" />

              {/* ── 写真（バッジなし・シンプル） ── */}
              <div className="relative w-full" style={{ height: '320px' }}>
                <Image
                  src="/images/team/vanessa.jpg"
                  alt="Vanessa Pan — Founder & CEO, Skillive Inc."
                  fill
                  priority
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[rgba(17,17,17,0.95)] to-transparent" />
              </div>

              <div className="px-8 pt-6 pb-8">
                {/* ── 名前（英語のみ） ── */}
                <h3 className="text-2xl font-serif font-semibold text-[#F5F5F0] mb-0.5">
                  Vanessa Pan
                </h3>

                {/* ── 役職 ── */}
                <p className="text-[#C9A84C] text-sm font-sans tracking-wide mb-5">
                  {t('vanessa.role')}
                </p>

                {/* ── プロフィール情報（アイコン付き） ── */}
                <div className="flex flex-col gap-2 mb-5">
                  <div className="flex items-center gap-2 text-sm text-[#B0AFA8] font-sans">
                    <span>📍</span>
                    <span>{t('vanessa.location')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#B0AFA8] font-sans">
                    <span>🎓</span>
                    <span>{t('vanessa.education')}</span>
                  </div>
                </div>

                {/* ── 実績バッジ（写真の外・フロー配置） ── */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className="px-2 py-0.5 rounded text-xs font-sans"
                    style={{ backgroundColor: 'rgba(109,191,130,0.15)', color: '#6DBF82' }}
                  >
                    {t('vanessa.badge1')}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-xs font-sans"
                    style={{ backgroundColor: 'rgba(109,191,130,0.15)', color: '#6DBF82' }}
                  >
                    {t('vanessa.badge2')}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-xs font-sans"
                    style={{ backgroundColor: 'rgba(109,191,130,0.15)', color: '#6DBF82' }}
                  >
                    {t('vanessa.badge3')}
                  </span>
                </div>

                {/* ── プロフィール文 ── */}
                <p className="text-sm text-[#6B6A63] font-sans leading-relaxed">
                  {t('vanessa.bio')}
                </p>
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
              {tAbout('title')}
            </h2>
            <p className="text-[#6B6A63] font-sans text-sm mb-6">
              {t('vanessa.location')} / {t('vanessa.education')} / {t('vanessa.badge1')}
            </p>

            <div className="divider-gold mb-8" />

            <p className="text-[#B0AFA8] font-sans text-lg leading-relaxed mb-10">
              {tAbout('bio')}
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
              {tAbout('cta')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
