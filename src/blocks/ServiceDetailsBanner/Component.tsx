'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { HtmlContent, MediaImage, Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const ServiceDetailsBannerBlock: React.FC<AnyBlock> = (props) => (
  <Section className="bg-nh-blue-light pt-28">
    <FadeIn>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="mb-6">{props.title as string}</h1>
          <HtmlContent html={props.description as string} className="text-black/70" />
        </div>
        <MediaImage resource={props.image as number} className="overflow-hidden rounded-2xl" />
      </div>
    </FadeIn>
  </Section>
)
