'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { HtmlContent, MediaImage, ButtonLink, Section } from '@/blocks/shared/ui'
import { BlockTitle } from '@/blocks/shared/BlockTitle'

type AnyBlock = Record<string, any>

export const TestimonialsBlock: React.FC<AnyBlock> = (props) => {
  const items =
    (props.items as Array<{
      description?: string
      name?: string
      position?: string
      image?: number
    }>) || []
  const button = props.button as { text?: string; href?: string }

  return (
    <Section className="bg-brand-gray">
      <FadeIn>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <BlockTitle className="section-title mb-0" data={props.title} />
          <ButtonLink href={button?.href}>{button?.text}</ButtonLink>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl bg-white p-6 shadow-sm">
              <HtmlContent html={item.description} className="mb-6 text-black/70" />
              <div className="flex items-center gap-4">
                <MediaImage resource={item.image} className="h-12 w-12 overflow-hidden rounded-full" />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-black/60">{item.position}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}
