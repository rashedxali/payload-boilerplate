'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { MediaImage, Section } from '@/blocks/shared/ui'
import { BlockTitle } from '@/blocks/shared/BlockTitle'

type AnyBlock = Record<string, any>

export const OurStoryBlock: React.FC<AnyBlock> = (props) => {
  const yearItems =
    (props.yearItems as Array<{
      year?: string
      title?: string
      description?: string
      image?: number
    }>) || []

  return (
    <Section className="bg-nh-gray">
      <FadeIn>
        <BlockTitle className="nh-section-title" data={props.title} />
        <p className="mb-10 text-black/70">{props.subtitle as string}</p>
        <div className="space-y-8">
          {yearItems.map((item, i) => (
            <div key={i} className="grid gap-8 rounded-2xl bg-white p-8 lg:grid-cols-[120px_1fr_300px]">
              <div className="text-3xl font-medium text-nh-blue">{item.year}</div>
              <div>
                <BlockTitle className="mb-3 text-xl" data={item.title} />
                <p className="text-black/70">{item.description}</p>
              </div>
              <MediaImage resource={item.image} className="overflow-hidden rounded-xl" />
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}
