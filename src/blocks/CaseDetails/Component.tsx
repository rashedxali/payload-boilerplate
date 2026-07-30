'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { HtmlContent, MediaImage, Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const CaseDetailsBlock: React.FC<AnyBlock> = (props) => {
  const gallery = (props.gallery as Array<{ image?: number }>) || []
  const galleryTwo =
    (props.galleryTwo as Array<{ image?: number; description?: string }>) || []

  return (
    <Section>
      <FadeIn>
        <MediaImage resource={props.bannerImage as number} className="mb-10 overflow-hidden rounded-2xl" />
        {props.subtitle && <p className="mb-4 text-nh-blue">{props.subtitle as string}</p>}
        <HtmlContent html={props.description as string} className="mb-10" />
        <div className="grid gap-4 md:grid-cols-2">
          {gallery.map((g, i) => (
            <MediaImage key={i} resource={g.image} className="overflow-hidden rounded-xl" />
          ))}
        </div>
        {props.youtubeVideoLink && (
          <div className="mt-10 aspect-video overflow-hidden rounded-2xl">
            <iframe
              allowFullScreen
              className="h-full w-full"
              src={(props.youtubeVideoLink as string).replace('watch?v=', 'embed/')}
              title="Case study video"
            />
          </div>
        )}
        {galleryTwo.length > 0 && (
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {galleryTwo.map((g, i) => (
              <div key={i}>
                <MediaImage resource={g.image} className="mb-4 overflow-hidden rounded-xl" />
                <HtmlContent html={g.description} />
              </div>
            ))}
          </div>
        )}
      </FadeIn>
    </Section>
  )
}
