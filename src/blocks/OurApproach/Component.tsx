'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { NHButton, Section } from '@/blocks/shared/ui'
import { BlockTitle } from '@/blocks/shared/BlockTitle'

type AnyBlock = Record<string, any>

export const OurApproachBlock: React.FC<AnyBlock> = (props) => {
  const items =
    (props.items as Array<{ title?: string; itemDescription?: string }>) || []

  return (
    <Section>
      <FadeIn>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <BlockTitle className="nh-section-title mb-0" data={props.title} />
          <NHButton href={props.viewMoreUrl as string}>{props.viewMoreText as string}</NHButton>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl border border-black/10 p-6">
              <BlockTitle className="mb-3 text-xl" data={item.title} />
              <p className="text-black/70">{item.itemDescription}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}
