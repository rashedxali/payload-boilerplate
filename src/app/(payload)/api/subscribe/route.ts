import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import isEmail from 'validator/lib/isEmail'

import { verifyRecaptcha } from '@/utilities/getIntegrationsConfig'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
    const token = typeof body?.token === 'string' ? body.token : null

    if (!email || !isEmail(email)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    if (!(await verifyRecaptcha(payload, token))) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 },
      )
    }

    const existing = await payload.find({
      collection: 'newsletter-subscribers',
      depth: 0,
      limit: 1,
      where: { email: { equals: email } },
    })

    // Already subscribed is treated as success so the endpoint does not reveal subscribers.
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'newsletter-subscribers',
        data: { email },
      })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
