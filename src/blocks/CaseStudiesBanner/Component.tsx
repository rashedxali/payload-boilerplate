'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { Section } from '@/blocks/shared/ui'
import { BlockTitle } from '@/blocks/shared/BlockTitle'

type AnyBlock = Record<string, any>

export const CaseStudiesBannerBlock: React.FC<AnyBlock> = (props) => (
  <Section className="bg-nh-blue-light pt-28 pb-12">
    <FadeIn>
      <BlockTitle data={props.title} />
    </FadeIn>
  </Section>
)
