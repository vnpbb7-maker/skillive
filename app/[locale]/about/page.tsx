import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { routing } from '@/i18n/routing'
import { MapPin, GraduationCap, Lightbulb, Globe, Target, Eye } from 'lucide-react'

type Locale = (typeof routing.locales)[number]

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('about_page')

  const companyInfo = [
    { label: t('company_name'), value: `${t('company_name_value')} / ${t('company_name_en')}` },
    { label: t('founded'), value: t('founded_value') },
    { label: t('ceo'), value: t('ceo_value') },
    { label: t('address_label'), value: t('address_value') },
    { label: t('business'), value: t('business_value') },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)',
            }}
          />
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold" />
              <span className="eyebrow">{t('hero_eyebrow')}</span>
              <div className="h-px w-8 bg-gold" />
            </div>
            <h1 className="hero-heading text-[#F5F5F0]">{t('hero_title')}</h1>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 max-w-7xl mx-auto px-6" id="mission-vision">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-10 relative overflow-hidden group" id="mission-card">
              <div
                className="absolute top-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }}
              />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
                <Target size={22} className="text-[#C9A84C]" />
              </div>
              <h2 className="section-subheading text-[#F5F5F0] mb-4">{t('mission_title')}</h2>
              <p className="text-[#B0AFA8] font-sans leading-relaxed text-lg">{t('mission_text')}</p>
            </div>

            <div className="glass-card p-10 relative overflow-hidden group" id="vision-card">
              <div
                className="absolute top-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: 'linear-gradient(90deg, #9B7FFF, transparent)' }}
              />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: 'rgba(155,127,255,0.1)', border: '1px solid rgba(155,127,255,0.2)' }}>
                <Eye size={22} style={{ color: '#9B7FFF' }} />
              </div>
              <h2 className="section-subheading text-[#F5F5F0] mb-4">{t('vision_title')}</h2>
              <p className="text-[#B0AFA8] font-sans leading-relaxed text-lg">{t('vision_text')}</p>
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-20 border-t border-[rgba(201,168,76,0.08)] max-w-7xl mx-auto px-6" id="company-info">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading text-[#F5F5F0] mb-12 text-center">{t('company_title')}</h2>
            <div className="glass-card divide-y divide-[rgba(255,255,255,0.05)]">
              {companyInfo.map((info, idx) => (
                <div
                  key={idx}
                  className="flex gap-8 p-6 hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                  id={`company-info-${idx}`}
                >
                  <div className="w-32 flex-shrink-0">
                    <span className="eyebrow text-[10px]">{info.label}</span>
                  </div>
                  <div className="text-[#F5F5F0] font-sans text-sm leading-relaxed">{info.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CEO Profile */}
        <section className="py-20 max-w-7xl mx-auto px-6" id="ceo-profile">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading text-[#F5F5F0] mb-12 text-center">代表プロフィール</h2>
            <div className="glass-card p-10 md:p-14">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="flex-shrink-0">
                  <div
                    className="w-36 h-36 rounded-2xl flex items-center justify-center text-4xl font-serif"
                    style={{
                      background: 'linear-gradient(135deg, #1E3A5F 0%, #2D1B69 100%)',
                      border: '1px solid rgba(201,168,76,0.25)',
                    }}
                  >
                    VP
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-3xl text-[#F5F5F0] mb-1">Vanessa Pan</h3>
                  <p className="text-[#C9A84C] font-sans text-sm tracking-wide mb-6">代表取締役 CEO</p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {[
                      { icon: MapPin, text: '台湾出身', color: '#C9A84C' },
                      { icon: GraduationCap, text: '明治大学卒', color: '#9B7FFF' },
                      { icon: Lightbulb, text: '21歳起業', color: '#6DBF82' },
                      { icon: Globe, text: '5ヶ国語対応', color: '#4A9EFF' },
                    ].map((badge) => {
                      const BadgeIcon = badge.icon
                      return (
                        <div
                          key={badge.text}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-sans"
                          style={{
                            backgroundColor: `${badge.color}10`,
                            border: `1px solid ${badge.color}30`,
                            color: badge.color,
                          }}
                        >
                          <BadgeIcon size={13} />
                          {badge.text}
                        </div>
                      )
                    })}
                  </div>

                  <p className="text-[#B0AFA8] font-sans leading-relaxed mb-6">
                    台湾で生まれ、明治大学で経営学を学び、21歳でスキルライブ株式会社を設立。GPUインフラ・インフルエンサーマーケティング・古民家民泊という異なる3事業を融合させ、アジアと日本をつなぐ独自のビジネスモデルを構築。日本語・英語・繁體中文・韓国語・ロシア語の5言語に対応し、多文化・多国籍なチームを率いる。
                  </p>

                  <blockquote className="border-l-2 border-[#C9A84C] pl-6 italic font-serif text-xl text-[#F5F5F0]">
                    &ldquo;違いこそが強さ。多様な文化と技術の交差点に、私たちの未来がある。&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
