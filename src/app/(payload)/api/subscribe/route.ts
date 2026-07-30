import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const apiKey = process.env.MAILCHIMP_API_KEY
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID
    const server = process.env.MAILCHIMP_API_SERVER

    if (!apiKey || !audienceId || !server) {
      return NextResponse.json(
        { error: 'Newsletter service is not configured' },
        { status: 503 },
      )
    }

    const response = await fetch(
      `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `apikey ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
        }),
      },
    )

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.title || 'Subscription failed' },
        { status: response.status },
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
