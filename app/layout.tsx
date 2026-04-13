import type { Metadata } from 'next'
import { Cormorant_Garamond, Noto_Serif_JP, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Skillive Inc. | スキルライブ株式会社',
  description: 'GPU Hardware Sales, Staffing & Influencer PR, Kominka Stay — Skillive Inc. bridges Japan and Asia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${cormorant.variable} ${notoSerifJP.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  )
}
