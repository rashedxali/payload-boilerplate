'use client'

import React from 'react'
import Link from 'next/link'
import { FadeIn } from '@/components/FadeIn'
import { NHButton, Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const WorkTogetherBlock: React.FC<AnyBlock> = (props) => (
  <Section className="bg-nh-blue text-white">
    <FadeIn>
      <div className="max-w-3xl">
        <h2 className="nh-section-title text-white">{props.title as string}</h2>
        <p className="mb-8 text-white/80">{props.description as string}</p>
        <div className="flex flex-wrap gap-4">
          <NHButton href={props.primaryButtonUrl as string} className="bg-white text-nh-blue">
            {props.primaryButtonTitle as string}
          </NHButton>
          <Link
            href={(props.secondaryButtonUrl as string) || '#'}
            className="nh-btn-outline border-white text-white hover:bg-white/10"
          >
            {props.secondaryButtonTitle as string}
          </Link>
        </div>
      </div>
    </FadeIn>
  </Section>
)
