import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { routing } from '@/i18n/routing'
import { Server, ShieldCheck, Package, Database, ArrowRight } from 'lucide-react'
import GPUNotebookPricing from '@/components/sections/GPUNotebookPricing'
import GPUWorkstation from '@/components/sections/GPUWorkstation'

type Locale = (typeof routing.locales)[number]

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const gpuProducts = [
  {
    name: 'NVIDIA H200',
    spec: '141GB HBM3e',
    use: 'LLM Training / 大規模推論',
    badge: 'New',
    color: '#4A9EFF',
    anchor: null,
  },
  {
    name: 'NVIDIA B200',
    spec: '192GB HBM3e',
    use: '次世代AIトレーニング / FP4推論',
    badge: 'Blackwell',
    color: '#C9A84C',
    anchor: null,
  },
  {
    name: 'NVIDIA RTX 6000',
    spec: '48GB GDDR6',
    use: 'ワークステーション / 推論',
    badge: null,
    color: '#6DBF82',
    anchor: null,
  },
  {
    name: 'H200 Cluster',
    spec: '8× H200 / NVLink',
    use: '大規模AIトレーニング',
    badge: 'Premium',
    color: '#9B7FFF',
    anchor: null,
  },
  {
    name: 'Work Station',
    spec: 'RTX PRO 4000〜6000 Blackwell',
    use: 'デスクトップ〜全社AI基盤',
    badge: null,
    color: '#9B7FFF',
    anchor: 'gpu-workstation',
  },
  {
    name: 'NPU Note PC',
    spec: 'Core Ultra 5 115U / 11 TOPS',
    use: 'ビジネス向けAIノートPC',
    badge: null,
    color: '#4A9EFF',
    anchor: 'gpu-notebook-pricing',
  },
]

export default async function GPUPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('gpu_page')

  const features = [
    {
      icon: Server,
      title: t('feature1_title'),
      desc: t('feature1_desc'),
      color: '#4A9EFF',
    },
    {
      icon: Package,
      title: t('feature2_title'),
      desc: t('feature2_desc'),
      color: '#C9A84C',
    },
    {
      icon: ShieldCheck,
      title: t('feature3_title'),
      desc: t('feature3_desc'),
      color: '#6DBF82',
    },
    {
      icon: Database,
      title: t('feature4_title'),
      desc: t('feature4_desc'),
      color: '#9B7FFF',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-20">
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #080E18 0%, #0A0A0A 60%)',
            }}
          />
          <div
            className="absolute top-0 right-0 w-2/3 h-full pointer-events-none"
            style={{
              background: 'linear-gradient(225deg, rgba(30,58,95,0.3) 0%, transparent 60%)',
            }}
          />
          {/* Circuit-like decorative grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(74,158,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div
            className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(30,58,95,0.4) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: '#4A9EFF' }} />
              <span className="eyebrow" style={{ color: '#4A9EFF' }}>{t('hero_eyebrow')}</span>
              <div className="h-px w-8" style={{ background: '#4A9EFF' }} />
            </div>
            <h1 className="hero-heading text-[#F5F5F0] mb-6">
              {t('hero_title')}
            </h1>
            <p className="text-[#B0AFA8] font-sans text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              {t('hero_subtitle')}
            </p>
            <Link
              href={`/${locale}/contact`}
              id="gpu-hero-cta"
              className="btn-gold"
              style={{ background: 'linear-gradient(135deg, #1E3A5F, #2A5080)', color: '#4A9EFF' }}
            >
              {t('cta_button')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Products */}
        <section className="py-24 max-w-7xl mx-auto px-6" id="gpu-products">
          <div className="text-center mb-12">
            <h2 className="section-heading text-[#F5F5F0] mb-2">取り扱い製品</h2>
            <p className="text-[#6B6A63] font-sans">エンタープライズグレードのGPUを安定供給</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gpuProducts.map((gpu) => {
              const CardTag = gpu.anchor ? 'a' : 'div'
              return (
                <CardTag
                  key={gpu.name}
                  {...(gpu.anchor ? { href: `#${gpu.anchor}` } : {})}
                  className={`glass-card glass-card-hover p-6 relative overflow-hidden group block ${
                    gpu.anchor ? 'cursor-pointer' : ''
                  }`}
                  id={`gpu-product-${gpu.name.replace(/\s/g, '-').toLowerCase()}`}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: `linear-gradient(90deg, ${gpu.color}, transparent)` }}
                  />
                  {gpu.badge && (
                    <span
                      className="absolute top-4 right-4 text-xs font-sans px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${gpu.color}20`, color: gpu.color, border: `1px solid ${gpu.color}40` }}
                    >
                      {gpu.badge}
                    </span>
                  )}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${gpu.color}15`, border: `1px solid ${gpu.color}30` }}
                  >
                    <Server size={18} style={{ color: gpu.color }} />
                  </div>
                  <h3 className="font-serif text-xl text-[#F5F5F0] mb-1">{gpu.name}</h3>
                  <p className="text-sm font-sans font-medium mb-2" style={{ color: gpu.color }}>{gpu.spec}</p>
                  <p className="text-xs text-[#6B6A63] font-sans">{gpu.use}</p>
                  {gpu.anchor && (
                    <span className="inline-flex items-center gap-1 text-xs font-sans mt-3" style={{ color: gpu.color }}>
                      詳細を見る <ArrowRight size={12} />
                    </span>
                  )}
                </CardTag>
              )
            })}
          </div>
        </section>

        {/* Notebook PC pricing + Stripe checkout */}
        <Suspense fallback={null}>
          <GPUNotebookPricing locale={locale} />
        </Suspense>

        {/* Work Station series */}
        <GPUWorkstation locale={locale} />

        {/* Features */}
        <section className="py-24 border-t border-[rgba(201,168,76,0.08)] max-w-7xl mx-auto px-6" id="gpu-features">
          <div className="text-center mb-16">
            <h2 className="section-heading text-[#F5F5F0]">{t('features_title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon
              return (
                <div
                  key={feat.title}
                  className="glass-card glass-card-hover p-8 flex gap-5"
                  id={`gpu-feature-${feat.title.replace(/\s/g, '-').toLowerCase()}`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: `${feat.color}15`, border: `1px solid ${feat.color}30` }}
                  >
                    <Icon size={22} style={{ color: feat.color }} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#F5F5F0] mb-2">{feat.title}</h3>
                    <p className="text-sm text-[#B0AFA8] font-sans leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          className="py-24 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #080E18 100%)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(30,58,95,0.3) 0%, transparent 70%)',
            }}
          />
          <div className="relative max-w-2xl mx-auto px-6">
            <h2 className="section-heading text-[#F5F5F0] mb-4">{t('cta_title')}</h2>
            <p className="text-[#B0AFA8] font-sans mb-8 leading-relaxed">{t('cta_desc')}</p>
            <Link
              href={`/${locale}/contact`}
              id="gpu-bottom-cta"
              className="btn-gold"
            >
              {t('cta_button')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
