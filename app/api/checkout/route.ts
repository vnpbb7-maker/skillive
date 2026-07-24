import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getVariantBySku, NOTEBOOK_PRODUCT_NAME } from '@/lib/gpuNotebookProducts'

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Missing STRIPE_SECRET_KEY environment variable')
      return NextResponse.json({ error: 'Server configuration error: missing Stripe key' }, { status: 500 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const body = await req.json()
    const { sku, locale } = body as { sku?: string; locale?: string }

    if (!sku) {
      return NextResponse.json({ error: 'Missing sku' }, { status: 400 })
    }

    // 価格はサーバー側の定義（lib/gpuNotebookProducts.ts）のみを信頼する。
    // クライアントから金額を受け取ることは絶対にしない。
    const variant = getVariantBySku(sku)
    if (!variant) {
      return NextResponse.json({ error: 'Unknown sku' }, { status: 400 })
    }

    const safeLocale = (locale || 'ja').replace(/[^a-z-]/gi, '') || 'ja'
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.skillive.com'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      locale: 'ja',
      customer_creation: 'always',
      phone_number_collection: { enabled: true },
      shipping_address_collection: { allowed_countries: ['JP'] },
      billing_address_collection: 'auto',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'jpy',
            unit_amount: variant.price, // JPYはゼロデシマル通貨のため円をそのまま指定
            product_data: {
              name: `${NOTEBOOK_PRODUCT_NAME} — ${variant.memory} / ${variant.storage}`,
              description: variant.note,
              metadata: { sku: variant.sku },
            },
          },
        },
      ],
      metadata: {
        sku: variant.sku,
        memory: variant.memory,
        storage: variant.storage,
      },
      success_url: `${siteUrl}/${safeLocale}/gpu-hardware?checkout=success&sku=${variant.sku}`,
      cancel_url: `${siteUrl}/${safeLocale}/gpu-hardware?checkout=cancelled`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    console.error('Checkout API error:', errMsg)
    return NextResponse.json({ error: errMsg }, { status: 500 })
  }
}
