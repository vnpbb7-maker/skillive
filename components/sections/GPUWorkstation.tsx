import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { workstationTiers } from '@/lib/gpuWorkstation'

export default function GPUWorkstation({ locale }: { locale: string }) {
  return (
    <section
      className="py-24 border-t border-[rgba(201,168,76,0.08)] max-w-7xl mx-auto px-6 scroll-mt-24"
      id="gpu-workstation"
    >
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-px w-8" style={{ background: '#9B7FFF' }} />
          <span className="eyebrow" style={{ color: '#9B7FFF' }}>WORKSTATION</span>
          <div className="h-px w-8" style={{ background: '#9B7FFF' }} />
        </div>
        <h2 className="section-heading text-[#F5F5F0] mb-2">Work Station シリーズ</h2>
        <p className="text-[#6B6A63] font-sans">
          RTX PRO Blackwell搭載。デスクトップ機から全社AI基盤まで、規模に応じた3ラインナップ
        </p>
      </div>

      <div className="space-y-6">
        {workstationTiers.map((tier) => (
          <div
            key={tier.key}
            className="glass-card overflow-hidden grid grid-cols-1 lg:grid-cols-[320px_1fr] scroll-mt-24"
            id={`gpu-workstation-${tier.key}`}
          >
            {/* Summary panel */}
            <div
              className="p-6 flex flex-col"
              style={{
                background: `linear-gradient(160deg, ${tier.accent}14 0%, transparent 100%)`,
                borderRight: '1px solid rgba(255,255,255,0.06)',
                borderLeft: `2px solid ${tier.accent}`,
              }}
            >
              <span
                className="text-xs font-sans tracking-widest uppercase mb-3"
                style={{ color: tier.accent }}
              >
                {tier.tierLabel}
              </span>
              <h3 className="font-serif text-2xl text-[#F5F5F0] mb-1">{tier.name}</h3>
              <p className="text-sm text-[#B0AFA8] font-sans italic mb-5">{tier.subtitle}</p>

              <p className="text-xs text-[#6B6A63] font-sans mb-1">予価</p>
              <p className="font-serif text-3xl mb-5" style={{ color: tier.accent }}>
                {tier.price}
              </p>

              <p className="text-xs text-[#6B6A63] font-sans mb-1">対象顧客</p>
              <p className="text-sm text-[#B0AFA8] font-sans leading-relaxed mb-6">{tier.audience}</p>

              <Link
                href={`/${locale}/contact`}
                id={`gpu-workstation-cta-${tier.key}`}
                className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-widest uppercase transition-all btn-gold w-fit"
              >
                相談する
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Spec table */}
            <div className="p-6">
              <p className="text-xs text-[#6B6A63] font-sans uppercase tracking-widest mb-4">
                仕様詳細
              </p>
              <dl className="space-y-3">
                {tier.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 text-sm font-sans pb-3 border-b border-[rgba(255,255,255,0.04)] last:border-b-0 last:pb-0"
                  >
                    <dt className="text-[#6B6A63] sm:w-32 flex-shrink-0">{spec.label}</dt>
                    <dd className="text-[#F5F5F0]">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
