'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { MediaImage, Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const AwardsRecognitionBlock: React.FC<AnyBlock> = (props) => {
  const items = (props.items as Array<{ title?: string; description?: string }>) || []

  return (
    <Section>
      <FadeIn>
        <div className="grid gap-10 lg:grid-cols-2">
          <MediaImage resource={props.image as number} className="overflow-hidden rounded-2xl" />
          <div>
            <h2 className="nh-section-title">{props.title as string}</h2>
            <div className="space-y-6">
              {items.map((item, i) => (
                <div key={i}>
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="text-black/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  )
}
