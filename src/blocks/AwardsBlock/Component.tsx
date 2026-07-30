'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { MediaImage, Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const AwardsBlock: React.FC<AnyBlock> = (props) => {
  const items = (props.items as Array<{ image?: number; title?: string }>) || []

  return (
    <Section>
      <FadeIn>
        <h2 className="nh-section-title">{props.title as string}</h2>
        <p className="mb-10 text-black/70">{props.description as string}</p>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3 rounded-xl bg-nh-gray p-6">
              <MediaImage resource={item.image} className="max-h-16" />
              {item.title && <span className="text-sm text-center">{item.title}</span>}
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}
