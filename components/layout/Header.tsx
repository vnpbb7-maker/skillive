'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'

const locales = [
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'zh', label: '繁體中文', flag: '🇹🇼' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
]

export default function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    { href: `/${locale}/gpu-hardware`, label: t('gpu') },
    { href: `/${locale}/staffing`, label: t('staffing') },
    { href: `/${locale}/kominka`, label: t('kominka') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  const currentLocale = locales.find((l) => l.code === locale) || locales[0]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-[rgba(201,168,76,0.15)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group" id="header-logo">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-sm bg-gold-gradient opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-[2px] rounded-sm bg-[#0A0A0A] flex items-center justify-center">
                <span className="text-[#C9A84C] font-serif font-bold text-sm">S</span>
              </div>
            </div>
            <div>
              <span className="text-[#F5F5F0] font-serif font-medium text-lg leading-none tracking-wide">
                Skillive
              </span>
              <span className="block text-[10px] text-[#B0AFA8] tracking-widest uppercase font-sans leading-none mt-0.5">
                Inc.
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" id="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#B0AFA8] hover:text-[#C9A84C] transition-colors duration-200 font-sans tracking-wide relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A84C] group-hover:w-full transition-all duration-300 origin-left" />
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div ref={langRef} className="relative hidden md:block">
              <button
                id="lang-switcher-btn"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-sm text-[#B0AFA8] hover:text-[#C9A84C] transition-colors py-1 px-2"
              >
                <Globe size={14} />
                <span className="font-sans">{currentLocale.flag} {currentLocale.label}</span>
                <ChevronDown size={12} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 glass-card py-2 shadow-card-hover">
                  {locales.map((loc) => (
                    <Link
                      key={loc.code}
                      href={`/${loc.code}`}
                      onClick={() => setLangOpen(false)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-sans transition-colors ${
                        locale === loc.code
                          ? 'text-[#C9A84C] bg-[rgba(201,168,76,0.08)]'
                          : 'text-[#B0AFA8] hover:text-[#F5F5F0] hover:bg-[rgba(255,255,255,0.03)]'
                      }`}
                    >
                      <span>{loc.flag}</span>
                      <span>{loc.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <Link
              href={`/${locale}/contact`}
              id="header-cta-btn"
              className="hidden md:flex btn-gold text-xs py-2 px-4"
            >
              {t('contact')}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-[#F5F5F0] hover:text-[#C9A84C] transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        id="mobile-menu"
      >
        <div
          className="absolute inset-0 bg-[rgba(0,0,0,0.9)] backdrop-blur-xl"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-72 bg-[#0F0F0F] border-l border-[rgba(201,168,76,0.15)] p-8 flex flex-col gap-6 transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between pt-4">
            <span className="eyebrow">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-[#B0AFA8] hover:text-[#C9A84C]"
            >
              <X size={20} />
            </button>
          </div>

          <div className="divider-gold" />

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-xl font-serif text-[#F5F5F0] hover:text-[#C9A84C] transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="divider-gold" />

          <div className="flex flex-col gap-2">
            <p className="eyebrow text-xs mb-2">Language</p>
            {locales.map((loc) => (
              <Link
                key={loc.code}
                href={`/${loc.code}`}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 py-2 text-sm font-sans ${
                  locale === loc.code ? 'text-[#C9A84C]' : 'text-[#B0AFA8]'
                }`}
              >
                <span>{loc.flag}</span>
                <span>{loc.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-auto">
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMobileOpen(false)}
              className="btn-gold w-full justify-center text-xs"
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
