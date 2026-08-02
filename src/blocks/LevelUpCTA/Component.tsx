'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { MediaImage, NHButton, Section } from '@/blocks/shared/ui'
import { BlockTitle } from '@/blocks/shared/BlockTitle'

type AnyBlock = Record<string, any>

export const LevelUpCTABlock: React.FC<AnyBlock> = (props) => {
  const button = props.button as { text?: string; url?: string }

  return (
    <Section>
      <FadeIn>
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-nh-blue-light lg:grid-cols-2">
          <div className="p-10">
            <BlockTitle className="nh-section-title" data={props.title} />
            <p className="mb-8 text-black/70">{props.description as string}</p>
            <NHButton href={button?.href}>{button?.text}</NHButton>
          </div>
          <MediaImage resource={props.image as number} className="h-full min-h-[320px]" />
        </div>
      </FadeIn>
    </Section>
  )
}
