'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight, Sparkles, Mail } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function CTASection() {
  const t = useTranslations('cta')
  const locale = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="relative py-28 md:py-36 overflow-hidden" id="cta-section" ref={ref}>
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0A0A0A 0%, #0C0C0C 50%, #0A0A0A 100%)',
        }}
      />

      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Sparkle icon */}
        <div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-8 transition-all duration-700 ${
            visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))',
            border: '1px solid rgba(201,168,76,0.3)',
          }}
        >
          <Sparkles size={20} className="text-[#C9A84C]" />
        </div>

        {/* Heading */}
        <h2
          className={`section-heading text-[#F5F5F0] mb-4 transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {t('title')}
          <br />
          <span className="gold-text">{t('title2')}</span>
        </h2>

        {/* Subtext */}
        <p
          className={`text-[#B0AFA8] font-sans text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {t('subtitle')}
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link
            href={`/${locale}/contact`}
            id="cta-section-contact-btn"
            className="btn-gold text-sm py-3.5 px-8"
          >
            {t('primary')}
            <ArrowRight size={16} />
          </Link>
          <Link
            href={`/${locale}/contact`}
            id="cta-section-email-btn"
            className="btn-outline text-sm py-3.5 px-8"
          >
            <Mail size={16} />
            メールで相談する
          </Link>
        </div>

        {/* Bottom decorative line */}
        <div
          className={`mt-20 transition-all duration-1000 delay-500 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="divider-gold max-w-xs mx-auto" />
          <p className="text-xs text-[#3D3D37] font-sans mt-6 tracking-widest uppercase">
            スキルライブ株式会社 · Skillive Inc. · 東京 / 新宿
          </p>
        </div>
      </div>
    </section>
  )
}
