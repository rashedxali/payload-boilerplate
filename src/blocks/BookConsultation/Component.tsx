'use client'

import React from 'react'
import { InlineWidget } from 'react-calendly'
import { FadeIn } from '@/components/FadeIn'
import { Section } from '@/blocks/shared/ui'
import { BlockTitle } from '@/blocks/shared/BlockTitle'

type AnyBlock = Record<string, any>

export const BookConsultationBlock: React.FC<AnyBlock> = (props) => (
  <Section>
    <FadeIn>
      <BlockTitle className="nh-section-title" data={props.title} />
      <p className="mb-8 max-w-2xl text-black/70">{props.description as string}</p>
      <div className="overflow-hidden rounded-2xl border border-black/10">
        <InlineWidget url={(props.iframe as string) || 'https://calendly.com/hellonotionhive/30min'} />
      </div>
    </FadeIn>
  </Section>
)
