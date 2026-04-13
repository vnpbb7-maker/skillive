'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

/* ─── Nav links ──────────────────────────────────── */
const NAV_LINKS = [
  { label: 'GPU Hardware', href: '/gpu-hardware' },
  { label: 'Staffing',     href: '/staffing'     },
  { label: '古民家',       href: '/kominka'       },
  { label: 'About',        href: '/about'         },
] as const

/* ─── Hamburger icon ─────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line
        x1="3" y1="6"  x2="19" y2="6"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={`transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[5px]' : ''}`}
        style={{ transformOrigin: 'center', transform: open ? 'rotate(45deg) translateY(5px)' : undefined }}
      />
      <line
        x1="3" y1="11" x2="19" y2="11"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ opacity: open ? 0 : 1, transition: 'opacity 0.2s' }}
      />
      <line
        x1="3" y1="16" x2="19" y2="16"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ transformOrigin: 'center', transform: open ? 'rotate(-45deg) translateY(-5px)' : undefined }}
      />
    </svg>
  )
}

/* ─── Header ─────────────────────────────────────── */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header className="sticky top-0 z-50 h-16 bg-sk-black/90 backdrop-blur-sm border-b border-sk-subtle">
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">

          {/* ── Logo ────────────────────────────── */}
          <Link
            href="/"
            id="header-logo"
            className="font-serif text-xl text-sk-gold hover:text-sk-gold-light transition-colors"
          >
            Skillive
          </Link>

          {/* ── Desktop nav ─────────────────────── */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                id={`nav-${href.replace('/', '')}`}
                className="font-sans text-sm text-sk-muted hover:text-sk-text tracking-wide transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Right: CTA + Hamburger ───────────── */}
          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            <Link
              href="/contact"
              id="header-cta"
              className="hidden md:inline-flex btn-gold px-5 py-2 text-xs"
            >
              お問い合わせ
            </Link>

            {/* Hamburger (mobile only) */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden flex items-center justify-center w-10 h-10"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'メニューを閉じる' : 'メニューを開く'}
              aria-expanded={mobileOpen}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ────────────── */}
      <div
        id="mobile-menu"
        className={`
          fixed inset-0 z-40 bg-sk-black flex flex-col items-center justify-center gap-8
          transition-all duration-300 md:hidden
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col items-center gap-6" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-serif text-2xl text-sk-text hover:text-sk-gold transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="btn-gold px-8 py-3 text-sm mt-4"
          onClick={() => setMobileOpen(false)}
        >
          お問い合わせ
        </Link>
      </div>
    </>
  )
}
