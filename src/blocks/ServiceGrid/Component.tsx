'use client'

import React from 'react'
import Link from 'next/link'
import { FadeIn } from '@/components/FadeIn'
import { NHButton, Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const ServiceGridBlock: React.FC<AnyBlock> = (props) => {
  const items =
    (props.items as Array<{
      title?: string
      subtitle?: string
      description?: string
      buttonTitle?: string
      url?: string
    }>) || []
  const button = props.button as { text?: string; url?: string }

  return (
    <Section>
      <FadeIn>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="nh-section-title mb-2">{props.title as string}</h2>
            <p className="text-black/70">{props.subtitle as string}</p>
          </div>
          <NHButton href={button?.href}>{button?.text}</NHButton>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <Link
              key={i}
              href={item.url || '#'}
              className="group rounded-2xl border border-black/10 bg-white p-8 transition hover:border-nh-blue hover:shadow-lg"
            >
              <h3 className="mb-2 text-2xl group-hover:text-nh-blue">{item.title}</h3>
              <p className="mb-4 text-sm text-black/60">{item.subtitle}</p>
              <p className="mb-6 text-black/70">{item.description}</p>
              <span className="text-sm font-medium text-nh-blue">{item.buttonTitle}</span>
            </Link>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}
