import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { routing } from '@/i18n/routing'
import { Target, Eye } from 'lucide-react'

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

        {/* ── 代表プロフィールセクション ── */}
        <section className="py-20" style={{ background: '#0F0F0F' }}>
          <div className="max-w-5xl mx-auto px-6">

            <p className="section-label mb-12 text-center">
              {t('founderTitle')}
            </p>

            {/* 横並びカード: 写真(左) + テキスト(右) */}
            <div
              className="flex flex-col md:flex-row gap-12 items-start"
              style={{
                background: '#161616',
                border: '0.5px solid rgba(201,168,76,0.15)',
                borderRadius: '16px',
                padding: '40px',
              }}
            >
              {/* 左: 写真 */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: '240px',
                    height: '300px',
                    borderRadius: '12px',
                    border: '1px solid rgba(201,168,76,0.2)',
                  }}
                >
                  <Image
                    src="/images/team/vanessa.jpg"
                    alt="Vanessa Pan — Founder & CEO"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>

              {/* 右: テキスト */}
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-3xl text-sk-text mb-1">
                  Vanessa Pan
                </h2>
                <p className="text-sm font-medium tracking-widest uppercase mb-6"
                   style={{ color: '#C9A84C' }}>
                  {t('founderRole')}
                </p>

                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-sk-muted">
                    <span>📍</span><span>{t('founderLocation')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-sk-muted">
                    <span>🎓</span><span>{t('founderEducation')}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    t('founderBadge1'), t('founderBadge2'), t('founderBadge3'),
                    t('founderBadge4'), t('founderBadge5'), t('founderBadge6'),
                  ].map((badge, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: i < 2
                          ? 'rgba(201,168,76,0.1)'
                          : i < 3
                          ? 'rgba(28,58,43,0.6)'
                          : 'rgba(30,50,90,0.6)',
                        border: i < 2
                          ? '1px solid rgba(201,168,76,0.3)'
                          : i < 3
                          ? '1px solid rgba(74,140,106,0.4)'
                          : '1px solid rgba(74,120,200,0.4)',
                        color: i < 2 ? '#C9A84C' : i < 3 ? '#4A8C6A' : '#6A9EE0',
                      }}>
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="divider-gold mb-6" />

                <p className="text-sm text-sk-muted leading-relaxed">
                  {t('founderBio')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
