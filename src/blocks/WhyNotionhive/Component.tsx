'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { MediaImage, Section } from '@/blocks/shared/ui'
import { BlockTitle } from '@/blocks/shared/BlockTitle'

type AnyBlock = Record<string, any>

export const WhyNotionhiveBlock: React.FC<AnyBlock> = (props) => {
  const cards =
    (props.cards as Array<{ title?: string; description?: string; icon?: number }>) || []

  return (
    <Section>
      <FadeIn>
        <BlockTitle className="nh-section-title text-center" data={props.title} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <div key={i} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <MediaImage resource={card.icon} className="mb-4 h-12 w-12" />
              <BlockTitle className="mb-3 text-xl" data={card.title} />
              <p className="text-black/70">{card.description}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}
