'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { MediaImage, NHButton, Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const BusinessBlock: React.FC<AnyBlock> = (props) => (
  <Section>
    <FadeIn>
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="nh-section-title">{props.title as string}</h2>
          <p className="mb-8 text-black/70">{props.description as string}</p>
          {props.buttonText && (
            <NHButton href="/contact-us">{props.buttonText as string}</NHButton>
          )}
        </div>
        <MediaImage resource={props.image as number} className="overflow-hidden rounded-2xl" />
      </div>
    </FadeIn>
  </Section>
)
