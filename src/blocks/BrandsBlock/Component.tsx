'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { MediaImage, NHButton, Section } from '@/blocks/shared/ui'
import { BlockTitle } from '@/blocks/shared/BlockTitle'

type AnyBlock = Record<string, any>

export const BrandsBlock: React.FC<AnyBlock> = (props) => {
  const items = (props.items as Array<{ image?: number }>) || []
  const button = props.button as { text?: string; href?: string }

  return (
    <Section>
      <FadeIn>
        <BlockTitle className="nh-section-title" data={props.title} />
        <p className="mb-8 text-black/70">{props.subtitle as string}</p>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-center rounded-xl bg-nh-gray p-6">
              <MediaImage resource={item.image} className="max-h-12" />
            </div>
          ))}
        </div>
        {button?.href && (
          <div className="mt-8">
            <NHButton href={button.href}>{button.text}</NHButton>
          </div>
        )}
      </FadeIn>
    </Section>
  )
}
