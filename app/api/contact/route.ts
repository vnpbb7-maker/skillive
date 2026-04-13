import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // In production, integrate with email service (Resend, SendGrid, etc.)
    // For now, log and return success
    console.log('Contact form submission:', { name, email, company, subject, message })

    // TODO: Send email via API
    // await sendEmail({ to: 'info@skillive.jp', name, email, company, subject, message })

    return NextResponse.json({ success: true, message: 'Message received successfully' })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
