'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { MediaImage, Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const WhyNotionhiveBlock: React.FC<AnyBlock> = (props) => {
  const cards =
    (props.cards as Array<{ title?: string; description?: string; icon?: number }>) || []

  return (
    <Section>
      <FadeIn>
        <h2 className="nh-section-title text-center">{props.title as string}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <div key={i} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <MediaImage resource={card.icon} className="mb-4 h-12 w-12" />
              <h3 className="mb-3 text-xl">{card.title}</h3>
              <p className="text-black/70">{card.description}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}
