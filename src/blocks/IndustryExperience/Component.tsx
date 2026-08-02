'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { Section } from '@/blocks/shared/ui'
import { BlockTitle } from '@/blocks/shared/BlockTitle'

type AnyBlock = Record<string, any>

export const IndustryExperienceBlock: React.FC<AnyBlock> = (props) => {
  const items = (props.items as Array<{ title?: string; description?: string }>) || []

  return (
    <Section className="bg-nh-gray">
      <FadeIn>
        <BlockTitle className="nh-section-title" data={props.title} />
        <p className="mb-10 text-black/70">{props.description as string}</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl bg-white p-6">
              <BlockTitle className="mb-3 text-lg" data={item.title} />
              <p className="text-black/70">{item.description}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}
