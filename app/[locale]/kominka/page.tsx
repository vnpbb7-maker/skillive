import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { routing } from '@/i18n/routing'
import { Home, Wrench, Globe, BarChart3, ArrowRight, Leaf } from 'lucide-react'

type Locale = (typeof routing.locales)[number]

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const properties = [
  { name: '京都 祇園の町家', region: 'Kyoto', guests: '2名', rating: '4.9', tag: '人気No.1' },
  { name: '奈良 古民家ステイ', region: 'Nara', guests: '4名', rating: '4.8', tag: 'New' },
  { name: '長野 合掌造り', region: 'Nagano', guests: '6名', rating: '4.9', tag: null },
  { name: '岐阜 白川郷', region: 'Gifu', guests: '8名', rating: '5.0', tag: 'Top Rated' },
]

export default async function KominkaPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('kominka_page')

  const features = [
    { icon: Wrench, title: t('feature1_title'), desc: t('feature1_desc'), color: '#6DBF82' },
    { icon: Home, title: t('feature2_title'), desc: t('feature2_desc'), color: '#C9A84C' },
    { icon: Globe, title: t('feature3_title'), desc: t('feature3_desc'), color: '#4A9EFF' },
    { icon: BarChart3, title: t('feature4_title'), desc: t('feature4_desc'), color: '#9B7FFF' },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-20">
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #0A1109 0%, #0A0A0A 60%)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-2/3 h-full pointer-events-none"
            style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(28,58,43,0.3) 100%)' }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(28,58,43,0.5) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Japanese pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236DBF82' fill-opacity='1'%3E%3Cpath d='M30 0L60 30L30 60L0 30z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: '#6DBF82' }} />
              <span className="eyebrow" style={{ color: '#6DBF82' }}>{t('hero_eyebrow')}</span>
              <div className="h-px w-8" style={{ background: '#6DBF82' }} />
            </div>
            <h1 className="hero-heading text-[#F5F5F0] mb-3">
              {t('hero_title')}
              <span className="gold-text block">世界へ届ける。</span>
            </h1>
            <p className="text-[#B0AFA8] font-sans text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              {t('hero_subtitle')}
            </p>
            <Link
              href={`/${locale}/contact`}
              id="kominka-hero-cta"
              className="btn-gold"
              style={{ background: 'linear-gradient(135deg, #1C3A2B, #264D3A)', color: '#6DBF82' }}
            >
              {t('cta_button')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Property Showcase */}
        <section className="py-24 max-w-7xl mx-auto px-6" id="kominka-properties">
          <div className="text-center mb-12">
            <h2 className="section-heading text-[#F5F5F0] mb-2">運営物件一例</h2>
            <p className="text-[#6B6A63] font-sans">日本各地の厳選古民家</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {properties.map((prop) => (
              <div
                key={prop.name}
                className="glass-card glass-card-hover overflow-hidden group"
                id={`property-${prop.region.toLowerCase()}`}
              >
                {/* Property image placeholder */}
                <div
                  className="h-48 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #1C3A2B 0%, #0F2018 100%)',
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-30">🏯</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                  {prop.tag && (
                    <div
                      className="absolute top-3 left-3 text-xs font-sans px-2 py-1 rounded"
                      style={{ backgroundColor: 'rgba(109,191,130,0.2)', color: '#6DBF82', border: '1px solid rgba(109,191,130,0.3)' }}
                    >
                      {prop.tag}
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1">
                    <span className="text-[#C9A84C] text-sm">★</span>
                    <span className="text-white text-sm font-sans font-medium">{prop.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-[#6DBF82] font-sans tracking-wider mb-1">{prop.region}</div>
                  <h3 className="font-serif text-lg text-[#F5F5F0] mb-2">{prop.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-[#6B6A63] font-sans">
                    <span>定員: {prop.guests}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-24 border-t border-[rgba(201,168,76,0.08)] max-w-7xl mx-auto px-6" id="kominka-features">
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
                  id={`kominka-feature-${feat.title.replace(/\s/g, '-').toLowerCase()}`}
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
          style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0A1109 100%)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(28,58,43,0.4) 0%, transparent 70%)',
            }}
          />
          <div className="relative max-w-2xl mx-auto px-6">
            <Leaf size={24} className="text-[#6DBF82] mx-auto mb-6" />
            <h2 className="section-heading text-[#F5F5F0] mb-4">{t('cta_title')}</h2>
            <p className="text-[#B0AFA8] font-sans mb-8 leading-relaxed">{t('cta_desc')}</p>
            <Link href={`/${locale}/contact`} id="kominka-bottom-cta" className="btn-gold">
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
