'use client'

import React, { useState } from 'react'
import { FadeIn } from '@/components/FadeIn'
import { MediaImage, NHButton, Section } from '@/blocks/shared/ui'
import { BlockTitle } from '@/blocks/shared/BlockTitle'

type AnyBlock = Record<string, any>

export const ProjectAccordionBlock: React.FC<AnyBlock> = (props) => {
  const accordions =
    (props.accordions as Array<{
      title?: string
      description?: string
      projectImage?: number
      button?: { text?: string; href?: string }
    }>) || []
  const [active, setActive] = useState(0)

  return (
    <Section>
      <FadeIn>
        <BlockTitle className="nh-section-title" data={props.title} />
        <p className="mb-10 max-w-3xl text-black/70">{props.description as string}</p>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            {accordions.map((item, i) => (
              <button
                key={i}
                type="button"
                className={`w-full rounded-xl border p-5 text-left transition ${
                  active === i ? 'border-nh-blue bg-nh-blue-light' : 'border-black/10 bg-white'
                }`}
                onClick={() => setActive(i)}
              >
                <BlockTitle className="text-xl font-medium" data={item.title} />
                {active === i && (
                  <p className="mt-3 text-black/70">{item.description}</p>
                )}
              </button>
            ))}
          </div>
          <div>
            <MediaImage
              resource={accordions[active]?.projectImage}
              className="overflow-hidden rounded-2xl"
            />
            {accordions[active]?.button?.href && (
              <div className="mt-6">
                <NHButton href={accordions[active]?.button?.href}>
                  {accordions[active]?.button?.text}
                </NHButton>
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    </Section>
  )
}
