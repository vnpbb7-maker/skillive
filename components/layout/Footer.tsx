import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import { MapPin, Mail, ArrowUpRight } from 'lucide-react'

export default async function Footer() {
  const t = await getTranslations('footer')
  const tNav = await getTranslations('nav')
  const locale = await getLocale()

  const navLinks = [
    { href: `/${locale}/gpu-hardware`, label: tNav('gpu') },
    { href: `/${locale}/staffing`, label: tNav('staffing') },
    { href: `/${locale}/kominka`, label: tNav('kominka') },
    { href: `/${locale}/about`, label: tNav('about') },
    { href: `/${locale}/contact`, label: tNav('contact') },
  ]

  return (
    <footer className="relative bg-[#080808] border-t border-[rgba(201,168,76,0.1)]">
      {/* Gold line top */}
      <div className="divider-gold" />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-6 group w-fit">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-sm bg-gold-gradient opacity-90" />
                <div className="absolute inset-[2px] rounded-sm bg-[#080808] flex items-center justify-center">
                  <span className="text-[#C9A84C] font-serif font-bold">S</span>
                </div>
              </div>
              <div>
                <span className="text-[#F5F5F0] font-serif font-medium text-xl leading-none">Skillive</span>
                <span className="block text-[10px] text-[#B0AFA8] tracking-widest uppercase font-sans leading-none mt-1">
                  スキルライブ株式会社
                </span>
              </div>
            </Link>

            <p className="text-[#6B6A63] text-sm font-sans leading-relaxed mb-6 max-w-xs">
              {t('tagline')}
            </p>

            <div className="flex items-start gap-3 text-sm text-[#6B6A63]">
              <MapPin size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
              <address className="not-italic font-sans leading-relaxed whitespace-pre-line">
                {t('address')}
              </address>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="eyebrow text-xs mb-6">Navigation</h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1 text-sm text-[#6B6A63] hover:text-[#C9A84C] transition-colors font-sans group"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-px" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Business */}
          <div>
            <h3 className="eyebrow text-xs mb-6">Business</h3>
            <div className="flex flex-col gap-3">
              {[
                { color: '#1E3A5F', label: 'GPU Hardware' },
                { color: '#2D1B69', label: 'Staffing & PR' },
                { color: '#1C3A2B', label: '古民家民泊' },
              ].map((biz) => (
                <div key={biz.label} className="flex items-center gap-2.5">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: biz.color }}
                  />
                  <span className="text-sm text-[#6B6A63] font-sans">{biz.label}</span>
                </div>
              ))}

              <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <a
                  href={`mailto:info@skillive.jp`}
                  className="flex items-center gap-2 text-sm text-[#6B6A63] hover:text-[#C9A84C] transition-colors font-sans"
                  id="footer-email-link"
                >
                  <Mail size={13} className="text-[#C9A84C]" />
                  <span>info@skillive.jp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#3D3D37] font-sans">{t('rights')}</p>
          <div className="flex items-center gap-6">
            <Link
              href={`/${locale}/privacy`}
              className="text-xs text-[#3D3D37] hover:text-[#6B6A63] transition-colors font-sans"
            >
              {t('links.privacy')}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-xs text-[#3D3D37] hover:text-[#6B6A63] transition-colors font-sans"
            >
              {t('links.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
