import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, organisation, area, message } = await req.json()

  if (!firstName || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const subject = `New Enquiry — ${area || 'General'} | ${firstName} ${lastName}`

  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
      <div style="background:#0C1B33;padding:24px 32px;">
        <p style="margin:0;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#C8A96E;">Stark Legal · Contact Form</p>
      </div>
      <div style="padding:32px;background:#fff;border:1px solid #e8e0d4;">
        <table style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.7;">
          <tr><td style="padding:8px 0;color:#888;width:140px;vertical-align:top;">Name</td>
              <td style="padding:8px 0;font-weight:600;">${firstName} ${lastName}</td></tr>
          <tr><td style="padding:8px 0;color:#888;vertical-align:top;">Email</td>
              <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#0C1B33;">${email}</a></td></tr>
          ${organisation ? `<tr><td style="padding:8px 0;color:#888;vertical-align:top;">Organisation</td>
              <td style="padding:8px 0;">${organisation}</td></tr>` : ''}
          ${area ? `<tr><td style="padding:8px 0;color:#888;vertical-align:top;">Practice Area</td>
              <td style="padding:8px 0;">${area}</td></tr>` : ''}
          <tr><td style="padding:8px 0;color:#888;vertical-align:top;">Message</td>
              <td style="padding:8px 0;">${message.replace(/\n/g, '<br>')}</td></tr>
        </table>
      </div>
      <div style="padding:16px 32px;background:#f8f5f0;border:1px solid #e8e0d4;border-top:none;">
        <p style="margin:0;font-size:11px;color:#aaa;">Sent via starklegalng.com contact form</p>
      </div>
    </div>
  `

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender:      { name: 'Stark Legal Website', email: 'admin@starklegalng.com' },
        to:          [{ email: 'admin@starklegalng.com', name: 'Stark Legal' }],
        replyTo:     { email, name: `${firstName} ${lastName}` },
        subject,
        htmlContent: html,
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      console.error('Brevo error:', err)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact handler error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
