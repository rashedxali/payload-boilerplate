'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const IndustryExperienceBlock: React.FC<AnyBlock> = (props) => {
  const items = (props.items as Array<{ title?: string; description?: string }>) || []

  return (
    <Section className="bg-nh-gray">
      <FadeIn>
        <h2 className="nh-section-title">{props.title as string}</h2>
        <p className="mb-10 text-black/70">{props.description as string}</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl bg-white p-6">
              <h3 className="mb-3 text-lg">{item.title}</h3>
              <p className="text-black/70">{item.description}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}
