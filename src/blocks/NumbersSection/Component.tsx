'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const NumbersSectionBlock: React.FC<AnyBlock> = (props) => {
  const cards =
    (props.cards as Array<{ count?: string; prefix?: string; description?: string }>) || []

  return (
    <Section>
      <FadeIn>
        <h2 className="nh-section-title">{props.title as string}</h2>
        <p className="mb-10 max-w-3xl text-black/70">{props.description as string}</p>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <div key={i} className="rounded-2xl bg-nh-blue-light p-8 text-center">
              <div className="text-5xl font-medium text-nh-blue">
                {card.count}
                {card.prefix}
              </div>
              <p className="mt-3 text-black/70">{card.description}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}
