'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { X, Send, MessageCircle, Minimize2, Loader2, User } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatWidget() {
  const t = useTranslations('chat')
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showPulse, setShowPulse] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: t('welcome'),
        timestamp: new Date(),
      },
    ])
  }, [t])

  // Listen for open-chat event from hero/CTA buttons
  useEffect(() => {
    const handler = () => {
      setOpen(true)
      setMinimized(false)
      setShowPulse(false)
    }
    window.addEventListener('open-chat', handler)
    return () => window.removeEventListener('open-chat', handler)
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    if (open && !minimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open, minimized])

  // Focus input when opened
  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open, minimized])

  // Stop pulse after 5s
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 8000)
    return () => clearTimeout(timer)
  }, [])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setHasInteracted(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const allMessages = [...messages, userMessage].filter((m) => m.id !== 'welcome')
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: allMessages.map((m) => ({ role: m.role, content: m.content })),
          locale,
        }),
        signal: controller.signal,
      })

      if (!res.ok) throw new Error('API error')
      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + '-ai',
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        },
      ])
    } catch (err: unknown) {
      if ((err as Error).name !== 'AbortError') {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + '-err',
            role: 'assistant',
            content: locale === 'ja'
              ? '申し訳ありません、エラーが発生しました。しばらくしてからもう一度お試しください。'
              : 'Sorry, something went wrong. Please try again.',
            timestamp: new Date(),
          },
        ])
      }
    } finally {
      setLoading(false)
      abortRef.current = null
    }
  }, [input, loading, messages, locale])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          id="chat-widget-open-btn"
          onClick={() => { setOpen(true); setMinimized(false); setShowPulse(false) }}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Open chat"
        >
          <div className="relative">
            {showPulse && (
              <>
                <div className="absolute inset-0 rounded-full bg-[#C9A84C] animate-ping opacity-30" />
                <div className="absolute inset-0 rounded-full bg-[#C9A84C] animate-ping opacity-20 delay-75" style={{ animationDelay: '0.3s' }} />
              </>
            )}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-gold-lg group-hover:shadow-gold transition-all duration-300 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
                backgroundSize: '200% auto',
              }}
            >
              <MessageCircle size={22} className="text-[#0A0A0A]" />
            </div>
            {/* Notification dot */}
            {!hasInteracted && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">1</span>
              </div>
            )}
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="glass-card px-3 py-2 text-xs font-sans text-[#F5F5F0] whitespace-nowrap">
              {t('title')}
            </div>
          </div>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          id="chat-widget-window"
          className={`fixed bottom-6 right-6 z-50 flex flex-col transition-all duration-300 ${
            minimized ? 'h-auto w-80' : 'w-[380px] h-[560px]'
          }`}
          style={{
            background: 'rgba(14,14,14,0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: '20px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 40px rgba(201,168,76,0.1)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 border-b border-[rgba(201,168,76,0.15)] flex-shrink-0"
            style={{ borderRadius: '20px 20px 0 0' }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-serif"
                  style={{
                    background: 'linear-gradient(135deg, #1E3A5F 0%, #2D1B69 100%)',
                    border: '1px solid rgba(201,168,76,0.3)',
                  }}
                >
                  VP
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0E0E0E]" />
              </div>
              <div>
                <div className="text-sm font-sans font-semibold text-[#F5F5F0]">{t('title')}</div>
                <div className="text-xs text-[#6B6A63] font-sans">{t('subtitle')}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                id="chat-minimize-btn"
                onClick={() => setMinimized(!minimized)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#6B6A63] hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,0.08)] transition-all"
              >
                <Minimize2 size={14} />
              </button>
              <button
                id="chat-close-btn"
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#6B6A63] hover:text-[#F5F5F0] hover:bg-[rgba(255,255,255,0.06)] transition-all"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Messages area */}
          {!minimized && (
            <>
              <div
                className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4"
                style={{ minHeight: 0 }}
                id="chat-messages-area"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0 mt-1">
                      {msg.role === 'assistant' ? (
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-serif"
                          style={{
                            background: 'linear-gradient(135deg, #1E3A5F 0%, #2D1B69 100%)',
                            border: '1px solid rgba(201,168,76,0.2)',
                          }}
                        >
                          VP
                        </div>
                      ) : (
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.25)' }}
                        >
                          <User size={13} className="text-[#C9A84C]" />
                        </div>
                      )}
                    </div>

                    {/* Bubble */}
                    <div className={`flex flex-col gap-1 max-w-[75%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm font-sans leading-relaxed ${
                          msg.role === 'user'
                            ? 'rounded-tr-sm text-[#0A0A0A]'
                            : 'rounded-tl-sm text-[#F5F5F0]'
                        }`}
                        style={
                          msg.role === 'user'
                            ? { background: 'linear-gradient(135deg, #C9A84C, #E8C97A)' }
                            : { backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }
                        }
                      >
                        {msg.content}
                      </div>
                      <span className="text-[10px] text-[#3D3D37] font-sans px-1">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {loading && (
                  <div className="flex gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-serif flex-shrink-0 mt-1"
                      style={{
                        background: 'linear-gradient(135deg, #1E3A5F 0%, #2D1B69 100%)',
                        border: '1px solid rgba(201,168,76,0.2)',
                      }}
                    >
                      VP
                    </div>
                    <div
                      className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2"
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div
                className="px-4 pb-4 flex-shrink-0"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div
                  className="flex items-end gap-2 mt-3 rounded-xl p-2"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}
                >
                  <textarea
                    ref={inputRef}
                    id="chat-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t('placeholder')}
                    rows={1}
                    className="flex-1 bg-transparent text-sm text-[#F5F5F0] font-sans outline-none resize-none placeholder-[#3D3D37] max-h-24 py-1 px-1"
                    style={{ lineHeight: '1.5' }}
                  />
                  <button
                    id="chat-send-btn"
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40"
                    style={{
                      background: input.trim() && !loading
                        ? 'linear-gradient(135deg, #C9A84C, #E8C97A)'
                        : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    {loading ? (
                      <Loader2 size={14} className="text-[#6B6A63] animate-spin" />
                    ) : (
                      <Send size={14} className={input.trim() ? 'text-[#0A0A0A]' : 'text-[#6B6A63]'} />
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-[#3D3D37] font-sans text-center mt-2">
                  Powered by Claude AI · Skillive Inc.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
