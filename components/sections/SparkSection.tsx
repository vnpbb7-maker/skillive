'use client'

import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const FEATURES = [
  {
    icon: '📍',
    title: 'ターゲット自動発見',
    desc: 'GoogleマップやSNSから潜在顧客を自動スキャン。最大1,000件/日。',
  },
  {
    icon: '✉️',
    title: 'AIビジネスメール生成',
    desc: '企業ごとにカスタマイズされたビジネスメールをClaudeが自動生成。',
  },
  {
    icon: '🚀',
    title: 'フォーム自動送信',
    desc: 'お問い合わせフォームを自動検出して送信。バックグラウンドで動作。',
  },
  {
    icon: '📊',
    title: 'アナリティクス',
    desc: '送信結果・コンバージョン率をリアルタイムで可視化。',
  },
  {
    icon: '🔗',
    title: 'クリック追跡',
    desc: 'メール内リンクのクリックを検知してコンバージョンを計測。',
  },
  {
    icon: '🔄',
    title: '送信済み除外',
    desc: '過去に送信した企業を自動除外。重複送信を防止。',
  },
]

export default function SparkSection() {
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
    <section
      className="relative bg-sk-black py-section overflow-hidden"
      id="spark-section"
      ref={ref}
      style={{ borderTop: '0.5px solid rgba(255,255,255,0.08)' }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,107,53,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '0.5px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '4px 14px',
            fontSize: '11px',
            color: 'rgba(245,245,240,0.45)',
            letterSpacing: '0.5px',
          }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff6b35', flexShrink: 0 }} />
          AI Product &amp; Promotion Tech
        </div>

        {/* Logo */}
        <div
          className={`flex items-center gap-2 mb-5 transition-all duration-700 delay-75 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span style={{ fontSize: '20px', color: '#ff6b35' }}>⚡</span>
          <span className="font-sans text-lg font-medium text-sk-text">SPARK AI</span>
        </div>

        {/* Headline */}
        <h2
          className={`section-heading text-sk-text mb-4 transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          最初の100人を、<br />
          <span style={{ color: '#ff6b35' }}>AIが連れてくる。</span>
        </h2>

        {/* Subtext */}
        <p
          className={`text-[#B0AFA8] font-sans text-base md:text-lg leading-relaxed max-w-xl mb-14 transition-all duration-700 delay-150 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          URLを入れるだけ。AIがターゲットを自動発見し、パーソナライズされたビジネスメールをフォーム送信まで自律実行。スキルライブが開発したAI営業支援ツール。
        </p>

        {/* Feature Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-14 transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {FEATURES.map((item) => (
            <div
              key={item.title}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '0.5px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '24px 20px',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              className="hover:border-[rgba(255,107,53,0.2)] hover:bg-[rgba(255,107,53,0.03)]"
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="font-sans text-sm font-medium text-sk-text mb-2">{item.title}</h3>
              <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(245,245,240,0.45)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Link
            href="https://spark-ai.jp"
            target="_blank"
            rel="noopener noreferrer"
            id="spark-section-cta-primary"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-white"
            style={{
              background: '#ff6b35',
              borderRadius: '8px',
              padding: '10px 24px',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            SPARK AIを始める
            <ArrowRight size={15} />
          </Link>
          <Link
            href="https://spark-ai.jp"
            target="_blank"
            rel="noopener noreferrer"
            id="spark-section-cta-secondary"
            className="inline-flex items-center gap-2 font-sans text-sm btn-outline py-2.5 px-6"
          >
            <ExternalLink size={14} />
            詳細を見る
          </Link>
        </div>

      </div>
    </section>
  )
}
