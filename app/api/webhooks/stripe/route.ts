import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import nodemailer from 'nodemailer'
import { getVariantBySku, NOTEBOOK_PRODUCT_NAME } from '@/lib/gpuNotebookProducts'

// StripeのWebhookは生のリクエストボディで署名検証する必要があるため、
// Next.jsのbody parserを使わない（App Routerではデフォルトで生ボディを扱える）。

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const sig = req.headers.get('stripe-signature')
  const rawBody = await req.text()

  let event: Stripe.Event
  try {
    if (!sig) throw new Error('Missing stripe-signature header')
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Webhook signature verification failed:', msg)
    return NextResponse.json({ error: `Webhook Error: ${msg}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      // 配送先住所・金額など、セッション作成時点では確定していない情報を取得するため取得し直す
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['customer_details'],
      })

      const sku = fullSession.metadata?.sku
      const variant = sku ? getVariantBySku(sku) : undefined
      const productLabel = variant
        ? `${NOTEBOOK_PRODUCT_NAME} — ${variant.memory} / ${variant.storage}`
        : (fullSession.metadata?.memory && fullSession.metadata?.storage
            ? `${fullSession.metadata.memory} / ${fullSession.metadata.storage}`
            : '(SKU不明)')

      const amount = fullSession.amount_total
        ? `¥${fullSession.amount_total.toLocaleString('ja-JP')}`
        : '不明'

      const customerName = fullSession.customer_details?.name || '(未入力)'
      const customerEmail = fullSession.customer_details?.email || '(未入力)'
      const customerPhone = fullSession.customer_details?.phone || '(未入力)'

      const shipping = fullSession.collected_information?.shipping_details
      const addr = shipping?.address
      const shippingBlock = addr
        ? `${shipping?.name || ''}<br>〒${addr.postal_code || ''} ${addr.state || ''}${addr.city || ''}${addr.line1 || ''} ${addr.line2 || ''}`
        : '(配送先住所が未取得です。Stripeダッシュボードでご確認ください)'

      await sendOrderNotification({
        productLabel,
        amount,
        sku: sku || '(不明)',
        customerName,
        customerEmail,
        customerPhone,
        shippingBlock,
        sessionId: fullSession.id,
      })
    } catch (err) {
      // メール送信に失敗しても、Stripe側には200を返して再送ループを防ぐ。
      // 注文自体はStripeダッシュボードに残るため、実害を避けるための設計。
      console.error('Failed to process checkout.session.completed:', err)
    }
  }

  return NextResponse.json({ received: true })
}

async function sendOrderNotification(order: {
  productLabel: string
  amount: string
  sku: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingBlock: string
  sessionId: string
}) {
  if (!process.env.ZOHO_MAIL_USER || !process.env.ZOHO_MAIL_PASS || !process.env.ZOHO_MAIL_TO) {
    console.error('Missing Zoho mail environment variables; skipping order notification email')
    return
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.jp',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_MAIL_USER,
      pass: process.env.ZOHO_MAIL_PASS,
    },
  })

  await transporter.sendMail({
    from: `"Skillive 注文通知" <${process.env.ZOHO_MAIL_USER}>`,
    to: process.env.ZOHO_MAIL_TO,
    replyTo: order.customerEmail !== '(未入力)' ? order.customerEmail : undefined,
    subject: `[新規注文] ${order.productLabel} — ${order.amount}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e; border-bottom: 2px solid #C9A84C; padding-bottom: 8px;">
          新しい注文が入りました
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 10px; background: #f5f5f5; font-weight: bold; width: 30%;">商品</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${order.productLabel}（SKU: ${order.sku}）</td>
          </tr>
          <tr>
            <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">金額</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${order.amount}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">購入者名</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${order.customerName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">メール</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${order.customerEmail}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">電話番号</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${order.customerPhone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background: #f5f5f5; font-weight: bold; vertical-align: top;">配送先</td>
            <td style="padding: 10px;">${order.shippingBlock}</td>
          </tr>
        </table>
        <p style="margin-top: 24px; color: #888; font-size: 12px;">
          Stripeセッション ID: ${order.sessionId}<br>
          詳細はStripeダッシュボードの「支払い」からもご確認いただけます。
        </p>
      </div>
    `,
  })
}
