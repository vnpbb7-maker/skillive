'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useState, useRef, useEffect } from 'react'

const languages = [
  { code: 'ja', label: '日本語',   flag: '🇯🇵' },
  { code: 'en', label: 'English',  flag: '🇺🇸' },
  { code: 'zh', label: '繁體中文', flag: '🇹🇼' },
  { code: 'ko', label: '한국어',   flag: '🇰🇷' },
  { code: 'ru', label: 'Русский',  flag: '🇷🇺' },
]

export default function LanguageSelector() {
  const locale   = useLocale()
  const router   = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = languages.find((l) => l.code === locale) ?? languages[0]

  // ロケール切替: /ja/about → /en/about
  const switchLocale = (code: string) => {
    const segments = pathname.split('/')
    segments[1] = code
    router.push(segments.join('/'))
    setOpen(false)
  }

  // 外側クリックで閉じる
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative" id="language-selector">
      {/* トリガーボタン */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-sk-muted hover:text-sk-text transition-colors"
        style={{
          border: '0.5px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.04)',
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="言語を選択"
      >
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ドロップダウン */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-44 rounded-xl overflow-hidden z-50"
          style={{
            background: 'rgba(18,18,18,0.97)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(12px)',
          }}
          role="listbox"
          aria-label="言語一覧"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={lang.code === locale}
              onClick={() => switchLocale(lang.code)}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors"
              id={`lang-option-${lang.code}`}
              style={{
                color:      lang.code === locale ? '#C9A84C' : '#8A8A80',
                background: lang.code === locale ? 'rgba(201,168,76,0.08)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (lang.code !== locale)
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
              }}
              onMouseLeave={(e) => {
                if (lang.code !== locale)
                  (e.currentTarget as HTMLElement).style.background = 'transparent'
              }}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
