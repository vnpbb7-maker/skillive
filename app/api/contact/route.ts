import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 環境変数の存在チェック
    if (!process.env.ZOHO_MAIL_USER || !process.env.ZOHO_MAIL_PASS || !process.env.ZOHO_MAIL_TO) {
      console.error('Missing environment variables:', {
        ZOHO_MAIL_USER: !!process.env.ZOHO_MAIL_USER,
        ZOHO_MAIL_PASS: !!process.env.ZOHO_MAIL_PASS,
        ZOHO_MAIL_TO: !!process.env.ZOHO_MAIL_TO,
      })
      return NextResponse.json({ error: 'Server configuration error: missing env vars' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.jp',
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.ZOHO_MAIL_USER,
        pass: process.env.ZOHO_MAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Skillive Contact Form" <${process.env.ZOHO_MAIL_USER}>`,
      to: process.env.ZOHO_MAIL_TO,
      replyTo: email,
      subject: `[お問い合わせ] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a2e; border-bottom: 2px solid #6c63ff; padding-bottom: 8px;">
            お問い合わせが届きました
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 10px; background: #f5f5f5; font-weight: bold; width: 30%;">お名前</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">メールアドレス</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">会社名</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${company || '未入力'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">件名</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f5f5f5; font-weight: bold; vertical-align: top;">メッセージ</td>
              <td style="padding: 10px; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; color: #888; font-size: 12px;">
            このメールは Skillive.com のお問い合わせフォームより自動送信されました。
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, message: 'Message received successfully' })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    console.error('Contact API error:', errMsg)
    // デバッグ用: 実際のエラーを返す（本番稼働後は削除）
    return NextResponse.json({ error: errMsg }, { status: 500 })
  }
}

