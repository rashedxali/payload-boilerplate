'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const OurProcessBlock: React.FC<AnyBlock> = (props) => {
  const cards =
    (props.cards as Array<{ title?: string; description?: string }>) ||
    (props.items as Array<{ title?: string; description?: string }>) ||
    []

  return (
    <Section className="bg-nh-gray">
      <FadeIn>
        <h2 className="nh-section-title">{props.title as string}</h2>
        {(props.description as string) && (
          <p className="mb-10 max-w-3xl text-black/70">{props.description as string}</p>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {cards.map((card, i) => (
            <div key={i} className="rounded-2xl bg-white p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-nh-blue text-white">
                {i + 1}
              </div>
              <h3 className="mb-2 text-lg font-medium">{card.title}</h3>
              <p className="text-sm text-black/70">{card.description}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}
