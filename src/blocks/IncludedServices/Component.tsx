'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { HtmlContent, MediaImage, Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const IncludedServicesBlock: React.FC<AnyBlock> = (props) => {
  const services =
    (props.services as Array<{
      title?: string
      subtitle?: string
      description?: string
      image?: number
    }>) || []

  return (
    <Section>
      <FadeIn>
        <h2 className="nh-section-title">{props.title as string}</h2>
        <p className="mb-10 max-w-3xl text-black/70">{props.description as string}</p>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((svc, i) => (
            <div key={i} className="rounded-2xl border border-black/10 p-6">
              <MediaImage resource={svc.image} className="mb-4 h-40 overflow-hidden rounded-xl" />
              <h3 className="mb-1 text-xl">{svc.title}</h3>
              <p className="mb-4 text-sm text-black/60">{svc.subtitle}</p>
              <HtmlContent html={svc.description} />
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}
