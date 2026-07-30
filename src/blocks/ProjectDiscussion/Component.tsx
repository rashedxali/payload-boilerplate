'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { NHButton, Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const ProjectDiscussionBlock: React.FC<AnyBlock> = (props) => (
  <Section className="bg-nh-blue-light">
    <FadeIn>
      <div className="flex flex-wrap items-center justify-between gap-6">
        <h2 className="nh-section-title mb-0">{props.title as string}</h2>
        <NHButton href={props.buttonUrl as string}>{props.buttonTitle as string}</NHButton>
      </div>
    </FadeIn>
  </Section>
)
