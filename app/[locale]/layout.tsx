import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

type Locale = (typeof routing.locales)[number]

export const metadata: Metadata = {
  title: {
    default: 'スキルライブ株式会社 | Skillive Inc.',
    template: '%s | Skillive Inc.',
  },
  description:
    'GPU Hardware Sales · Staffing & Influencer PR · 古民家民泊運営 — Located in Tokyo since 2014.',
  keywords: ['GPU販売', '人材派遣', 'インフルエンサー', '古民家', '民泊', 'Tokyo', 'Skillive'],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Skillive Inc.',
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
