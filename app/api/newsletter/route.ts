import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  const apiKey    = process.env.MAILJET_API_KEY
  const secretKey = process.env.MAILJET_SECRET_KEY

  if (!apiKey || !secretKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const credentials = Buffer.from(`${apiKey}:${secretKey}`).toString('base64')

  try {
    const response = await fetch(
      'https://api.mailjet.com/v3/REST/contactslist/602121/managecontact',
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Action: 'addnoforce', Email: email }),
      }
    )

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      console.error('MailJet error:', err)
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter handler error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
