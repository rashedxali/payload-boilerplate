'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { MediaImage, NHButton, Section } from '@/blocks/shared/ui'
import { BlockTitle } from '@/blocks/shared/BlockTitle'
import { getPlainTextFromLexical } from '@/utilities/getPlainTextFromLexical'

type AnyBlock = Record<string, unknown>

export const HomeHeroBlock: React.FC<AnyBlock> = (props) => {
  const description = props.description as string
  const button = props.button as { text?: string; href?: string }
  const bannerVideo = props.bannerVideo as string
  const highlights = (props.highlights as Array<{ title?: unknown }>) || []

  return (
    <Section className="relative overflow-hidden bg-nh-blue-light pt-24 pb-16">
      <FadeIn>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <BlockTitle className="nh-hero-title mb-6" data={props?.title} />
            {description && <p className="mb-8 text-lg text-black/70">{description}</p>}
            {highlights.length > 0 && (
              <ul className="mb-8 flex flex-wrap gap-3">
                {highlights.map((h, i) => (
                  <li
                    key={i}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm"
                  >
                    {getPlainTextFromLexical(h.title)}
                  </li>
                ))}
              </ul>
            )}
            <NHButton href={button?.href}>{button?.text}</NHButton>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-black/5">
            {bannerVideo ? (
              <video
                autoPlay
                className="h-full w-full object-cover"
                loop
                muted
                playsInline
                src={bannerVideo}
              />
            ) : (
              <MediaImage resource={props.bannerImage as number} className="h-full" />
            )}
          </div>
        </div>
      </FadeIn>
    </Section>
  )
}
