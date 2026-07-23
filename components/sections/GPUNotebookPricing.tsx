'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, XCircle, Loader2, ShoppingCart, Laptop } from 'lucide-react'
import { notebookVariants, getVariantBySku, NotebookVariant } from '@/lib/gpuNotebookProducts'
import { notebookSpecGroups } from '@/lib/gpuNotebookSpecs'

function formatYen(amount: number) {
  return `¥${amount.toLocaleString('ja-JP')}`
}

const notebookHeroImage = {
  src: '/images/gpu-hardware/notebook-hero.jpg',
  alt: 'Skillive Notebook PC — 14インチ ビジネスノートPC、AIエージェント搭載',
}

export default function GPUNotebookPricing({ locale }: { locale: string }) {
  const searchParams = useSearchParams()
  const checkoutStatus = searchParams.get('checkout')
  const checkoutSku = searchParams.get('sku')
  const purchasedVariant = checkoutSku ? getVariantBySku(checkoutSku) : undefined

  const [loadingSku, setLoadingSku] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handlePurchase(variant: NotebookVariant) {
    setError(null)
    setLoadingSku(variant.sku)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sku: variant.sku, locale }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'チェックアウトの開始に失敗しました')
      }
      window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'チェックアウトの開始に失敗しました')
      setLoadingSku(null)
    }
  }

  return (
    <section
      className="py-24 border-t border-[rgba(201,168,76,0.08)] max-w-7xl mx-auto px-6"
      id="gpu-notebook-pricing"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3">
          <div className="h-px w-8" style={{ background: '#4A9EFF' }} />
          <span className="eyebrow" style={{ color: '#4A9EFF' }}>NOTEBOOK PC</span>
          <div className="h-px w-8" style={{ background: '#4A9EFF' }} />
        </div>
      </div>

      {/* Hero product image */}
      <div className="mb-16 relative aspect-[1492/1054] overflow-hidden rounded-sm" id="gpu-notebook-hero">
        <Image
          src={notebookHeroImage.src}
          alt={notebookHeroImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
          priority
        />
      </div>

      <div className="text-center mb-12">
        <h2 className="section-heading text-[#F5F5F0] mb-2">構成を選択</h2>
        <p className="text-[#6B6A63] font-sans">
          メモリ・ストレージ構成をお選びいただけます。
        </p>
      </div>


      {/* Checkout status banner */}
      {checkoutStatus === 'success' && (
        <div
          className="glass-card p-5 mb-8 flex items-center gap-3 border border-[#6DBF8250]"
          id="checkout-success-banner"
        >
          <CheckCircle2 size={22} style={{ color: '#6DBF82' }} className="flex-shrink-0" />
          <p className="text-sm text-[#F5F5F0] font-sans">
            ご購入ありがとうございます。
            {purchasedVariant && (
              <span className="text-[#6DBF82]">
                {' '}
                （{purchasedVariant.memory} / {purchasedVariant.storage}）
              </span>
            )}
            {' '}お支払いが完了しました。折り返し、担当者よりご連絡いたします。
          </p>
        </div>
      )}
      {checkoutStatus === 'cancelled' && (
        <div
          className="glass-card p-5 mb-8 flex items-center gap-3 border border-[rgba(201,168,76,0.3)]"
          id="checkout-cancelled-banner"
        >
          <XCircle size={22} style={{ color: '#C9A84C' }} className="flex-shrink-0" />
          <p className="text-sm text-[#F5F5F0] font-sans">
            お支払いはキャンセルされました。プランを選び直してご購入いただけます。
          </p>
        </div>
      )}
      {error && (
        <div
          className="glass-card p-5 mb-8 flex items-center gap-3 border border-[#E0524850]"
          id="checkout-error-banner"
        >
          <XCircle size={22} style={{ color: '#E05248' }} className="flex-shrink-0" />
          <p className="text-sm text-[#F5F5F0] font-sans">{error}</p>
        </div>
      )}

      {/* Pricing grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {notebookVariants.map((variant) => {
          const isLoading = loadingSku === variant.sku
          return (
            <div
              key={variant.sku}
              className={`glass-card glass-card-hover p-6 relative overflow-hidden flex flex-col ${
                variant.isBase ? 'border border-[#C9A84C60]' : ''
              }`}
              id={`gpu-notebook-plan-${variant.sku}`}
            >
              {variant.isBase && (
                <span
                  className="absolute top-4 right-4 text-xs font-sans px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: '#C9A84C20', color: '#C9A84C', border: '1px solid #C9A84C40' }}
                >
                  基準プラン
                </span>
              )}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: '#4A9EFF15', border: '1px solid #4A9EFF30' }}
              >
                <Laptop size={18} style={{ color: '#4A9EFF' }} />
              </div>
              <h3 className="font-serif text-xl text-[#F5F5F0] mb-1">
                {variant.memory} / {variant.storage}
              </h3>
              <p className="text-2xl font-serif mb-2" style={{ color: '#4A9EFF' }}>
                {formatYen(variant.price)}
              </p>
              <p className="text-xs text-[#6B6A63] font-sans mb-6">{variant.note}（税込）</p>
              <button
                type="button"
                onClick={() => handlePurchase(variant)}
                disabled={isLoading}
                id={`gpu-notebook-buy-${variant.sku}`}
                className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-widest uppercase transition-all ${
                  variant.isBase ? 'btn-gold-fill' : 'btn-gold'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    処理中...
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    購入する
                  </>
                )}
              </button>
            </div>
          )
        })}
      </div>

      {/* Spec sheet */}
      <div className="text-center mb-10">
        <h3 className="section-heading text-[#F5F5F0] mb-2">製品仕様</h3>
        <p className="text-[#6B6A63] font-sans text-sm">全構成共通の仕様です</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {notebookSpecGroups.map((group) => (
          <div key={group.title} className="glass-card p-6" id={`gpu-notebook-spec-${group.title}`}>
            <h4
              className="font-serif text-lg mb-4 pb-2 border-b border-[rgba(201,168,76,0.15)]"
              style={{ color: '#4A9EFF' }}
            >
              {group.title}
            </h4>
            <dl className="space-y-2">
              {group.rows.map((row) => (
                <div key={row.label} className="flex flex-col sm:flex-row sm:gap-3 text-sm font-sans">
                  <dt className="text-[#6B6A63] sm:w-40 flex-shrink-0">{row.label}</dt>
                  <dd className="text-[#B0AFA8]">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  )
}
