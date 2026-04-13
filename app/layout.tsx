import type { Metadata } from 'next'
import './globals.css'

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
    url: 'https://www.skillive.com',
    siteName: 'Skillive Inc.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      {/* Google Fonts loaded via <link> to avoid build-time fetch errors in restricted networks */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Inter:wght@400;500;600&family=Noto+Serif+JP:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
