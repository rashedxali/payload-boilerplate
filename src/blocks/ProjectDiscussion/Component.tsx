'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { NHButton, Section } from '@/blocks/shared/ui'
import { BlockTitle } from '@/blocks/shared/BlockTitle'

type AnyBlock = Record<string, any>

export const ProjectDiscussionBlock: React.FC<AnyBlock> = (props) => (
  <Section className="bg-nh-blue-light">
    <FadeIn>
      <div className="flex flex-wrap items-center justify-between gap-6">
        <BlockTitle className="nh-section-title mb-0" data={props.title} />
        <NHButton href={props.buttonUrl as string}>{props.buttonTitle as string}</NHButton>
      </div>
    </FadeIn>
  </Section>
)
