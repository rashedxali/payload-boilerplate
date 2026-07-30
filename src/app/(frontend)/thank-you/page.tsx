import type { Metadata } from 'next'

import { FadeIn } from '@/components/FadeIn'
import { NHButton } from '@/blocks/notionhive/components/shared'

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for contacting Notionhive Canada.',
}

export default function ThankYouPage() {
  return (
    <div className="container py-28 text-center">
      <FadeIn>
        <h1 className="mb-4">Thank you!</h1>
        <p className="mb-8 text-lg text-black/70">
          We&apos;ve received your message and will get back to you shortly.
        </p>
        <NHButton href="/">Back to Home</NHButton>
      </FadeIn>
    </div>
  )
}
