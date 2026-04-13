'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight, MessageCircle, ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; fadeSpeed: number
    }> = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        fadeSpeed: Math.random() * 0.005 + 0.002,
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`
        ctx.fill()
        p.x += p.vx
        p.y += p.vy
        p.opacity -= p.fadeSpeed
        if (p.opacity <= 0 || p.y < -10) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height + 10
          p.opacity = Math.random() * 0.5 + 0.1
          p.vy = -Math.random() * 0.5 - 0.1
        }
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" id="hero">
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        id="hero-canvas"
      />

      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'glowPulse 4s ease-in-out infinite',
        }}
      />

      {/* Decorative lines */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.08)] to-transparent pointer-events-none" />
      <div
        className="absolute left-1/2 top-0 bottom-0 w-px pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.08) 50%, transparent 100%)' }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-3 mb-8"
          style={{ animation: 'fadeUp 0.6s ease forwards' }}
        >
          <div className="h-px w-12 bg-gold" />
          <span className="eyebrow">{t('eyebrow')}</span>
          <div className="h-px w-12 bg-gold" />
        </div>

        {/* Main heading */}
        <h1
          className="hero-heading text-[#F5F5F0] mb-6"
          style={{ animation: 'fadeUp 0.7s ease 0.1s both forwards' }}
        >
          <span className="block">{t('headline')}</span>
          <span className="gold-text block">{t('headline2')}</span>
          <span className="block">{t('headline3')}</span>
        </h1>

        {/* Subtext */}
        <p
          className="text-[#B0AFA8] font-sans text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ animation: 'fadeUp 0.7s ease 0.2s both forwards' }}
        >
          {t('subtext')}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animation: 'fadeUp 0.7s ease 0.3s both forwards' }}
        >
          <Link
            href={`/${locale}#businesses`}
            id="hero-cta-primary"
            className="btn-gold"
          >
            {t('cta_primary')}
            <ArrowRight size={16} />
          </Link>
          <button
            id="hero-cta-ai"
            onClick={() => {
              const event = new CustomEvent('open-chat')
              window.dispatchEvent(event)
            }}
            className="btn-outline"
          >
            <MessageCircle size={16} />
            {t('cta_secondary')}
          </button>
        </div>

        {/* Stats preview */}
        <div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          style={{ animation: 'fadeUp 0.7s ease 0.5s both forwards' }}
        >
          {[
            { value: '¥12B+', label: locale === 'ja' ? '年間受注額' : 'Annual Revenue' },
            { value: '89K+', label: locale === 'ja' ? 'インフルエンサー' : 'Influencers' },
            { value: '500+', label: locale === 'ja' ? '不動産取引' : 'Properties' },
            { value: '10Y+', label: locale === 'ja' ? '東京拠点' : 'Tokyo Base' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card p-4 text-center"
            >
              <div className="stat-number gold-text">{stat.value}</div>
              <div className="text-xs text-[#6B6A63] font-sans mt-1 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animation: 'fadeUp 0.7s ease 0.8s both forwards' }}
      >
        <span className="eyebrow text-[10px] text-[#3D3D37]">SCROLL</span>
        <ChevronDown
          size={16}
          className="text-[#C9A84C] animate-bounce"
        />
      </div>
    </section>
  )
}
