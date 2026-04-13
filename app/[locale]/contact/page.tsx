import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'
import { routing } from '@/i18n/routing'

type Locale = (typeof routing.locales)[number]

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('contact_page')

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)',
            }}
          />
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold" />
              <span className="eyebrow">{t('hero_eyebrow')}</span>
              <div className="h-px w-8 bg-gold" />
            </div>
            <h1 className="hero-heading text-[#F5F5F0] mb-4">{t('hero_title')}</h1>
            <p className="text-[#B0AFA8] font-sans text-lg max-w-xl mx-auto">{t('hero_subtitle')}</p>
          </div>
        </section>

        {/* Form + Info */}
        <section className="py-16 max-w-6xl mx-auto px-6" id="contact-section">
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  )
}
