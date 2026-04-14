'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'

/* ─── Footer ─────────────────────────────────────── */
export default function Footer() {
  const locale = useLocale()

  const NAV_LINKS = [
    { label: 'Top',          path: '/'            },
    { label: 'GPU Hardware', path: '/gpu-hardware' },
    { label: 'Staffing',     path: '/staffing'     },
    { label: '古民家',       path: '/kominka'       },
    { label: 'About',        path: '/about'         },
    { label: 'お問い合わせ', path: '/contact'       },
  ] as const

  return (
    <footer className="bg-sf-1 border-t border-sk-subtle" aria-label="サイトフッター">

      {/* ── 3-column grid ──────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* ── Col 1: Company info ─────────────────── */}
        <div>
          <Link
            href={`/${locale}`}
            id="footer-logo"
            className="font-serif text-2xl text-sk-gold hover:text-sk-gold-light transition-colors"
          >
            Skillive
          </Link>

          <p className="font-sans text-sm text-sk-muted mt-4">
            GPU Hardware · Staffing · 古民家民泊
          </p>

          <address className="not-italic font-sans text-xs text-sk-muted mt-4 leading-loose">
            〒160-0022<br />
            東京都新宿区新宿1−26−12<br />
            四谷御苑ビル4階
          </address>

          <a
            href="mailto:support@skillive.com"
            id="footer-email"
            className="block font-sans text-xs text-sk-gold mt-2 hover:text-sk-gold-light transition-colors"
          >
            support@skillive.com
          </a>
        </div>

        {/* ── Col 2: Sitemap ──────────────────────── */}
        <div>
          <p className="section-label mb-4">Navigation</p>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    href={`/${locale}${path === '/' ? '' : path}`}
                    id={`footer-nav-${label}`}
                    className="font-sans text-sm text-sk-muted hover:text-sk-text transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ── Col 3: Contact CTA ──────────────────── */}
        <div>
          <p className="section-label mb-4">Contact</p>

          <p className="font-sans text-sm text-sk-muted mb-6 leading-relaxed">
            ご相談・お見積りはお気軽にどうぞ
          </p>

          <Link
            href={`/${locale}/contact`}
            id="footer-contact-cta"
            className="btn-gold px-6 py-3 text-xs"
          >
            お問い合わせ →
          </Link>
        </div>
      </div>

      {/* ── Copyright ──────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="divider-gold" />
        <p className="font-sans text-xs text-sk-subtle text-center py-6">
          © 2020 スキルライブ株式会社 / Skillive Inc. All rights reserved.
        </p>
      </div>

    </footer>
  )
}
