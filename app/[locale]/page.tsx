import { setRequestLocale } from 'next-intl/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import BusinessGrid from '@/components/sections/BusinessGrid'
import StatsCounter from '@/components/sections/StatsCounter'
import TeamSection from '@/components/sections/TeamSection'
import SparkSection from '@/components/sections/SparkSection'
import CTASection from '@/components/sections/CTASection'
import { routing } from '@/i18n/routing'

type Locale = (typeof routing.locales)[number]

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  setRequestLocale(locale)

  return (
    <div className="min-h-screen bg-sk-black">
      <Header />
      <main>
        <HeroSection />
        <BusinessGrid />
        <StatsCounter />
        <TeamSection />
        <SparkSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
