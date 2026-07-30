'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { MediaImage, NHButton, Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const PageBannerBlock: React.FC<AnyBlock> = (props) => (
  <Section className="bg-nh-blue-light pt-28 pb-12">
    <FadeIn>
      <div className="max-w-3xl">
        {props.pageTitle && (
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-nh-blue">
            {props.pageTitle as string}
          </p>
        )}
        <h1 className="mb-4">{props.title as string}</h1>
        <p className="text-lg text-black/70">{props.subtitle as string}</p>
        {props.buttonUrl && (
          <div className="mt-8">
            <NHButton href={props.buttonUrl as string}>{props.buttonTitle as string}</NHButton>
          </div>
        )}
      </div>
      <MediaImage resource={props.image as number} className="mt-10 overflow-hidden rounded-2xl" />
    </FadeIn>
  </Section>
)
