'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { MediaImage, NHButton, Section } from '@/blocks/shared/ui'
import { BlockTitle } from '@/blocks/shared/BlockTitle'

type AnyBlock = Record<string, any>

export const JoinOurTeamBlock: React.FC<AnyBlock> = (props) => {
  const button = props.button as { text?: string; href?: string }

  return (
    <Section>
      <FadeIn>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <BlockTitle className="nh-section-title" data={props.title} />
            <p className="mb-8 text-black/70">{props.description as string}</p>
            <NHButton href={button?.href}>{button?.text}</NHButton>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <MediaImage resource={props.imageOne as number} className="overflow-hidden rounded-2xl" />
            <MediaImage resource={props.imageTwo as number} className="mt-8 overflow-hidden rounded-2xl" />
          </div>
        </div>
      </FadeIn>
    </Section>
  )
}
