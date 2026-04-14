'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'

/* ─── SVG icons ──────────────────────────────────── */
function IconGPU() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5" />
      <rect x="7" y="9" width="10" height="6" rx="1" stroke="white" strokeWidth="1.5" />
      <line x1="8"  y1="6" x2="8"  y2="3"  stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="6" x2="12" y2="3"  stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="6" x2="16" y2="3"  stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8"  y1="18" x2="8"  y2="21" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="18" x2="12" y2="21" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="18" x2="16" y2="21" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="10" x2="21" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="14" x2="21" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3"  y1="10" x2="6"  y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3"  y1="14" x2="6"  y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconNetwork() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="6"  r="2.5" stroke="white" strokeWidth="1.5" />
      <circle cx="5"  cy="17" r="2.5" stroke="white" strokeWidth="1.5" />
      <circle cx="19" cy="17" r="2.5" stroke="white" strokeWidth="1.5" />
      <line x1="12" y1="8.5" x2="5"  y2="14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="8.5" x2="19" y2="14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7.5" y1="17" x2="16.5" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconHouse() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Roof */}
      <path d="M2 11L12 3L22 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Eaves overhang */}
      <path d="M4 10L4 13M20 10V13" stroke="white" strokeWidth="1" strokeLinecap="round" />
      {/* Walls */}
      <rect x="5" y="12" width="14" height="9" rx="0.5" stroke="white" strokeWidth="1.5" />
      {/* Door */}
      <rect x="10" y="16" width="4" height="5" rx="0.5" stroke="white" strokeWidth="1.2" />
      {/* Windows */}
      <rect x="6.5" y="14" width="3" height="2.5" rx="0.3" stroke="white" strokeWidth="1" />
      <rect x="14.5" y="14" width="3" height="2.5" rx="0.3" stroke="white" strokeWidth="1" />
    </svg>
  )
}

/* ─── Card data (paths + icons only — text via i18n) ─ */
const CARD_META = [
  { id: 'gpu',      iconBg: 'bg-gpu-blue', Icon: IconGPU,     path: '/gpu-hardware' },
  { id: 'staffing', iconBg: 'bg-st-violet', Icon: IconNetwork, path: '/staffing'     },
  { id: 'kominka',  iconBg: 'bg-km-sage',   Icon: IconHouse,   path: '/kominka'      },
] as const

/* ─── Card component ─────────────────────────────── */
function BusinessCard({
  id,
  iconBg,
  Icon,
  path,
  index,
  locale,
  title,
  description,
  cta,
}: {
  id: string
  iconBg: string
  Icon: () => JSX.Element
  path: string
  index: number
  locale: string
  title: string
  description: string
  cta: string
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.65,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        delay: index * 0.12,
      }}
      className="card-hover bg-sf-1 border border-sk-subtle p-8 flex flex-col"
      id={`business-card-${id}`}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center mb-6 flex-shrink-0`}>
        <Icon />
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl text-sk-text mb-3">{title}</h3>

      {/* Description */}
      <p className="font-sans text-sm text-sk-muted leading-relaxed mb-6 flex-grow">
        {description}
      </p>

      {/* CTA */}
      <Link
        href={`/${locale}${path}`}
        id={`business-link-${id}`}
        className="font-sans text-sk-gold text-sm tracking-widest uppercase inline-flex items-center gap-2 group"
      >
        {cta}
        <span
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </Link>
    </motion.article>
  )
}

/* ─── BusinessGrid section ───────────────────────── */
export default function BusinessGrid() {
  const locale = useLocale()
  const t = useTranslations('business')

  return (
    <section
      id="business"
      className="bg-sk-black py-section"
      aria-label="事業領域"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.p
          className="section-label text-center mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('sectionLabel')}
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="font-serif text-3xl md:text-4xl text-sk-text text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            delay: 0.1,
          }}
        >
          {t('heading')}
        </motion.h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARD_META.map((meta, i) => (
            <BusinessCard
              key={meta.id}
              id={meta.id}
              iconBg={meta.iconBg}
              Icon={meta.Icon}
              path={meta.path}
              index={i}
              locale={locale}
              title={t(`${meta.id}.title`)}
              description={t(`${meta.id}.description`)}
              cta={t(`${meta.id}.cta`)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
