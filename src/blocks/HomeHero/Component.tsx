'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { BracketHighlight, MediaImage, NHButton, Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const HomeHeroBlock: React.FC<AnyBlock> = (props) => {
  const title = props.title as string
  const description = props.description as string
  const button = props.button as { text?: string; url?: string }
  const bannerVideo = props.bannerVideo as string
  const highlights = (props.highlights as Array<{ title?: string }>) || []

  return (
    <Section className="relative overflow-hidden bg-nh-blue-light pt-24 pb-16">
      <FadeIn>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="mb-6 text-5xl font-medium tracking-tight max-sm:text-4xl">
              <BracketHighlight text={title} />
            </h1>
            {description && <p className="mb-8 text-lg text-black/70">{description}</p>}
            {highlights.length > 0 && (
              <ul className="mb-8 flex flex-wrap gap-3">
                {highlights.map((h, i) => (
                  <li
                    key={i}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm"
                  >
                    {h.title}
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
