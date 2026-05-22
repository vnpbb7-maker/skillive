'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const FEATURES = [
  { num: '01', title: 'ターゲット自動発見', desc: 'GoogleマップやSNSから潜在顧客を自動スキャン。最大1,000件/日。' },
  { num: '02', title: 'AIビジネスメール生成', desc: '企業ごとにカスタマイズされたビジネスメールをClaudeが自動生成。' },
  { num: '03', title: 'フォーム自動送信', desc: 'お問い合わせフォームを自動検出して送信。バックグラウンドで動作。' },
  { num: '04', title: 'アナリティクス', desc: '送信結果・コンバージョン率をリアルタイムで可視化。' },
  { num: '05', title: 'クリック追跡', desc: 'メール内リンクのクリックを検知してコンバージョンを計測。' },
  { num: '06', title: '送信済み除外', desc: '過去に送信した企業を自動除外。重複送信を防止。' },
]

export default function SparkSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="spark-section"
      ref={ref}
      className="bg-sk-black"
      style={{
        borderTop: '0.5px solid rgba(255,255,255,0.08)',
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ padding: '80px 24px', textAlign: 'center' }}
      >

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '20px', padding: '5px 14px',
          fontSize: '11px', color: 'rgba(255,255,255,0.4)',
          marginBottom: '24px', letterSpacing: '1px',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c8956c', flexShrink: 0 }} />
          AI Product &amp; Promotion Tech
        </div>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
          <span style={{ fontSize: '24px', color: '#c8956c' }}>⚡</span>
          <span style={{ fontSize: '20px', fontWeight: 400, color: '#F5F5F0', letterSpacing: '0.5px', fontFamily: 'inherit' }}>
            SPARK AI
          </span>
        </div>

        {/* Headline */}
        <h2
          className="font-serif"
          style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 400, lineHeight: 1.15, color: '#F5F5F0', marginBottom: '20px', letterSpacing: '-0.5px' }}
        >
          最初の100人を、<br />
          <span style={{ color: '#c8956c' }}>AIが連れてくる。</span>
        </h2>

        {/* Subtext */}
        <p
          className="font-sans"
          style={{ fontSize: '16px', color: 'rgba(245,245,240,0.45)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto 56px' }}
        >
          URLを入れるだけ。AIがターゲットを自動発見し、パーソナライズされたビジネスメールをフォーム送信まで自律実行。スキルライブが開発したAI営業支援ツール。
        </p>

        {/* 6-card grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '56px',
          textAlign: 'left',
        }}>
          {FEATURES.map((item) => (
            <div
              key={item.num}
              style={{ background: '#0A0A0A', padding: '32px 28px' }}
            >
              <div
                className="font-sans"
                style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)', letterSpacing: '2px', marginBottom: '16px' }}
              >
                {item.num}
              </div>
              <h3
                className="font-serif"
                style={{ fontSize: '16px', fontWeight: 400, color: '#F5F5F0', marginBottom: '10px' }}
              >
                {item.title}
              </h3>
              <p
                className="font-sans"
                style={{ fontSize: '13px', color: 'rgba(245,245,240,0.4)', lineHeight: 1.7 }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <Link
            href="https://spark-ai.jp"
            target="_blank"
            rel="noopener noreferrer"
            id="spark-section-cta-primary"
            className="font-sans"
            style={{
              background: '#c8956c',
              padding: '12px 28px',
              color: '#fff',
              fontSize: '14px',
              textDecoration: 'none',
              display: 'inline-block',
              letterSpacing: '0.5px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            SPARK AIを始める →
          </Link>
          <Link
            href="https://spark-ai.jp"
            target="_blank"
            rel="noopener noreferrer"
            id="spark-section-cta-secondary"
            className="font-sans"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '12px 28px',
              color: 'rgba(245,245,240,0.6)',
              fontSize: '14px',
              textDecoration: 'none',
              display: 'inline-block',
              letterSpacing: '0.5px',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#F5F5F0'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(245,245,240,0.6)'; }}
          >
            詳細を見る
          </Link>
        </div>

      </div>
    </section>
  )
}
