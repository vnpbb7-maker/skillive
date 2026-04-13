import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { routing } from '@/i18n/routing'
import { Users, Network, Globe, TrendingUp, ArrowRight, Star } from 'lucide-react'

type Locale = (typeof routing.locales)[number]

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const influencerStats = [
  { region: '🇯🇵 Japan', count: '32,000+', color: '#C9A84C' },
  { region: '🇰🇷 Korea', count: '18,500+', color: '#9B7FFF' },
  { region: '🇹🇼 Taiwan', count: '15,200+', color: '#4A9EFF' },
  { region: '🌏 SEA', count: '23,700+', color: '#6DBF82' },
]

export default async function StaffingPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('staffing_page')

  const features = [
    { icon: Users, title: t('feature1_title'), desc: t('feature1_desc'), color: '#9B7FFF' },
    { icon: Globe, title: t('feature2_title'), desc: t('feature2_desc'), color: '#C9A84C' },
    { icon: Network, title: t('feature3_title'), desc: t('feature3_desc'), color: '#4A9EFF' },
    { icon: TrendingUp, title: t('feature4_title'), desc: t('feature4_desc'), color: '#6DBF82' },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-20">
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #0D0910 0%, #0A0A0A 60%)' }}
          />
          <div
            className="absolute top-0 left-0 w-2/3 h-full pointer-events-none"
            style={{ background: 'linear-gradient(315deg, transparent 0%, rgba(45,27,105,0.25) 100%)' }}
          />
          <div
            className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(45,27,105,0.5) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: '#9B7FFF' }} />
              <span className="eyebrow" style={{ color: '#9B7FFF' }}>{t('hero_eyebrow')}</span>
              <div className="h-px w-8" style={{ background: '#9B7FFF' }} />
            </div>
            <h1 className="hero-heading text-[#F5F5F0] mb-3">
              {t('hero_title')}
            </h1>
            <p className="text-[#B0AFA8] font-sans text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              {t('hero_subtitle')}
            </p>
            <Link
              href={`/${locale}/contact`}
              id="staffing-hero-cta"
              className="btn-gold"
              style={{ background: 'linear-gradient(135deg, #2D1B69, #3D2585)', color: '#9B7FFF' }}
            >
              {t('cta_button')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Influencer Network Breakdown */}
        <section className="py-24 max-w-7xl mx-auto px-6" id="influencer-network">
          <div className="text-center mb-12">
            <h2 className="section-heading text-[#F5F5F0] mb-2">
              <span className="gold-text">89,453名</span>のインフルエンサーネットワーク
            </h2>
            <p className="text-[#6B6A63] font-sans">アジア全域に広がる圧倒的なリーチ</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {influencerStats.map((stat) => (
              <div
                key={stat.region}
                className="glass-card glass-card-hover p-6 text-center"
                id={`influencer-region-${stat.region}`}
              >
                <div className="text-3xl mb-2">{stat.region.split(' ')[0]}</div>
                <div
                  className="text-2xl font-serif font-semibold mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.count}
                </div>
                <div className="text-sm text-[#6B6A63] font-sans">{stat.region.split(' ').slice(1).join(' ')}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-24 border-t border-[rgba(201,168,76,0.08)] max-w-7xl mx-auto px-6" id="staffing-features">
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
                  id={`staffing-feature-${feat.title.replace(/\s/g, '-').toLowerCase()}`}
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
          style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0D0910 100%)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(45,27,105,0.3) 0%, transparent 70%)',
            }}
          />
          <div className="relative max-w-2xl mx-auto px-6">
            <Star size={24} className="text-[#9B7FFF] mx-auto mb-6" />
            <h2 className="section-heading text-[#F5F5F0] mb-4">{t('cta_title')}</h2>
            <p className="text-[#B0AFA8] font-sans mb-8 leading-relaxed">{t('cta_desc')}</p>
            <Link href={`/${locale}/contact`} id="staffing-bottom-cta" className="btn-gold">
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
