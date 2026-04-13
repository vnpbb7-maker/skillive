'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Send, CheckCircle, Mail, Building, MessageSquare, User, ChevronDown } from 'lucide-react'

export default function ContactForm() {
  const t = useTranslations('contact_page')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'gpu',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      {/* Info sidebar */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="glass-card p-8">
          <h3 className="font-serif text-xl text-[#F5F5F0] mb-6">スキルライブ株式会社</h3>
          <div className="flex flex-col gap-5">
            <div className="flex gap-3">
              <Mail size={16} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
              <div>
                <div className="eyebrow text-[10px] mb-1">Email</div>
                <a href="mailto:support@skillive.com" className="text-sm text-[#B0AFA8] font-sans hover:text-[#C9A84C] transition-colors">
                  support@skillive.com
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <Building size={16} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
              <div>
                <div className="eyebrow text-[10px] mb-1">住所</div>
                <address className="text-sm text-[#B0AFA8] font-sans not-italic leading-relaxed">
                  〒160-0022<br />
                  東京都新宿区新宿1−26−12<br />
                  四谷御苑ビル4階
                </address>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8">
          <h3 className="eyebrow mb-4">事業別お問い合わせ</h3>
          <div className="flex flex-col gap-3">
            {[
              { label: 'GPU Hardware', color: '#4A9EFF', key: 'gpu' },
              { label: 'Staffing & PR', color: '#9B7FFF', key: 'staffing' },
              { label: '古民家民泊', color: '#6DBF82', key: 'kominka' },
            ].map((biz) => (
              <button
                key={biz.key}
                id={`contact-shortcut-${biz.key}`}
                onClick={() => setForm((p) => ({ ...p, subject: biz.key }))}
                className="flex items-center gap-3 p-3 rounded-lg transition-all text-left"
                style={{
                  backgroundColor: form.subject === biz.key ? `${biz.color}15` : 'transparent',
                  border: `1px solid ${form.subject === biz.key ? biz.color + '40' : 'transparent'}`,
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: biz.color }} />
                <span className="text-sm font-sans" style={{ color: form.subject === biz.key ? biz.color : '#B0AFA8' }}>
                  {biz.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="lg:col-span-3">
        {submitted ? (
          <div className="glass-card p-12 text-center h-full flex flex-col items-center justify-center" id="contact-success">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: 'rgba(109,191,130,0.15)', border: '1px solid rgba(109,191,130,0.3)' }}
            >
              <CheckCircle size={32} className="text-[#6DBF82]" />
            </div>
            <h3 className="font-serif text-2xl text-[#F5F5F0] mb-3">送信完了</h3>
            <p className="text-[#B0AFA8] font-sans leading-relaxed max-w-sm">{t('form_success')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10" id="contact-form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div className="relative">
                <label className="eyebrow text-[10px] block mb-2" htmlFor="contact-name">
                  {t('form_name')} <span className="text-[#C9A84C]">*</span>
                </label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6A63]" />
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(201,168,76,0.15)] text-[#F5F5F0] font-sans text-sm rounded-lg pl-10 pr-4 py-3 outline-none focus:border-[rgba(201,168,76,0.4)] focus:bg-[rgba(255,255,255,0.05)] transition-all placeholder-[#3D3D37]"
                    placeholder="山田 太郎"
                  />
                </div>
              </div>

              <div>
                <label className="eyebrow text-[10px] block mb-2" htmlFor="contact-email">
                  {t('form_email')} <span className="text-[#C9A84C]">*</span>
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6A63]" />
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(201,168,76,0.15)] text-[#F5F5F0] font-sans text-sm rounded-lg pl-10 pr-4 py-3 outline-none focus:border-[rgba(201,168,76,0.4)] focus:bg-[rgba(255,255,255,0.05)] transition-all placeholder-[#3D3D37]"
                    placeholder="info@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="eyebrow text-[10px] block mb-2" htmlFor="contact-company">
                {t('form_company')}
              </label>
              <div className="relative">
                <Building size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6A63]" />
                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(201,168,76,0.15)] text-[#F5F5F0] font-sans text-sm rounded-lg pl-10 pr-4 py-3 outline-none focus:border-[rgba(201,168,76,0.4)] focus:bg-[rgba(255,255,255,0.05)] transition-all placeholder-[#3D3D37]"
                  placeholder="株式会社〇〇"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="eyebrow text-[10px] block mb-2" htmlFor="contact-subject">
                {t('form_subject')} <span className="text-[#C9A84C]">*</span>
              </label>
              <div className="relative">
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6A63] pointer-events-none" />
                <select
                  id="contact-subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(201,168,76,0.15)] text-[#F5F5F0] font-sans text-sm rounded-lg px-4 py-3 outline-none focus:border-[rgba(201,168,76,0.4)] focus:bg-[rgba(255,255,255,0.05)] transition-all appearance-none cursor-pointer"
                >
                  <option value="gpu" className="bg-[#1A1A1A]">{t('subjects.gpu')}</option>
                  <option value="staffing" className="bg-[#1A1A1A]">{t('subjects.staffing')}</option>
                  <option value="kominka" className="bg-[#1A1A1A]">{t('subjects.kominka')}</option>
                  <option value="other" className="bg-[#1A1A1A]">{t('subjects.other')}</option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label className="eyebrow text-[10px] block mb-2" htmlFor="contact-message">
                {t('form_message')} <span className="text-[#C9A84C]">*</span>
              </label>
              <div className="relative">
                <MessageSquare size={14} className="absolute left-3 top-3.5 text-[#6B6A63]" />
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(201,168,76,0.15)] text-[#F5F5F0] font-sans text-sm rounded-lg pl-10 pr-4 py-3 outline-none focus:border-[rgba(201,168,76,0.4)] focus:bg-[rgba(255,255,255,0.05)] transition-all resize-none placeholder-[#3D3D37]"
                  placeholder="ご要件をご記入ください..."
                />
              </div>
            </div>

            <button
              type="submit"
              id="contact-submit-btn"
              disabled={loading}
              className="btn-gold w-full justify-center py-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
                  送信中...
                </span>
              ) : (
                <>
                  {t('form_submit')}
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
