'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

/* ─── Animation variants ─────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:  { opacity: 0, y: 28 },
  animate:  { opacity: 1, y: 0 },
  transition: {
    duration: 0.7,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    delay,
  },
})

const fadeIn = (delay = 0) => ({
  initial:  { opacity: 0 },
  animate:  { opacity: 1 },
  transition: {
    duration: 0.5,
    ease: 'easeOut' as const,
    delay,
  },
})

export default function HeroSection() {
  const [imgError, setImgError] = useState(false)
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-sk-black"
    >
      {/* ── Background Image ─────────────────────── */}
      <div className="absolute inset-0 z-0">
        {!imgError && (
          <Image
            src="/images/hero.jpg"
            alt="Skillive Inc. hero background"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="100vw"
            onError={() => setImgError(true)}
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Bottom fade to black */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-sk-black to-transparent" />
      </div>

      {/* ── Content ──────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full">

        {/* Section label */}
        <motion.p
          className="section-label mb-8 tracking-[0.2em]"
          {...fadeIn(0.1)}
        >
          located in tokyo · since 2014
        </motion.p>

        {/* Hero headline — line 1 */}
        <motion.h1
          className="font-serif text-hero-en text-sk-text leading-none mb-1"
          {...fadeUp(0.2)}
        >
          influence / staffing
        </motion.h1>

        {/* Hero headline — line 2 */}
        <motion.p
          className="font-serif text-hero-en text-sk-text leading-none mb-10"
          {...fadeUp(0.3)}
        >
          heritage for share
        </motion.p>

        {/* Company name */}
        <motion.p
          className="font-sans text-base text-sk-muted tracking-widest uppercase mb-12"
          {...fadeIn(0.4)}
        >
          スキルライブ株式会社 — Skillive Inc.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          {...fadeUp(0.5)}
        >
          <Link href="/contact" id="hero-cta-contact" className="btn-gold">
            お問い合わせ
          </Link>
          <Link href="/#business" id="hero-cta-business" className="btn-gold-fill">
            事業を見る
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        {...fadeIn(1.0)}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 opacity-60"
        >
          {/* Vertical line */}
          <div className="w-px h-10 bg-sk-gold" />
          {/* Downward triangle */}
          <svg
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0L5 7L10 0H0Z" fill="#C9A84C" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
