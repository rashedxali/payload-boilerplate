'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const CaseStudiesBannerBlock: React.FC<AnyBlock> = (props) => (
  <Section className="bg-nh-blue-light pt-28 pb-12">
    <FadeIn>
      <h1>{props.title as string}</h1>
    </FadeIn>
  </Section>
)
