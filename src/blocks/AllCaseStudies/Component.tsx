'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const AllCaseStudiesBlock: React.FC<AnyBlock> = () => (
  <Section>
    <FadeIn>
      <p className="text-black/60">Case studies are loaded dynamically from the CMS.</p>
    </FadeIn>
  </Section>
)
