import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import ChatWidget from '@/components/ai-chat/ChatWidget'

type Locale = (typeof routing.locales)[number]

export const metadata: Metadata = {
  title: 'Skillive Inc. | スキルライブ株式会社',
  description: 'GPU Hardware Sales, Staffing & Influencer PR, and Kominka Stay. Skillive Inc. — bridging Japan and Asia.',
  keywords: 'GPU hardware, staffing, influencer PR, kominka, 古民家, スキルライブ, Skillive',
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
      <ChatWidget />
    </NextIntlClientProvider>
  )
}

