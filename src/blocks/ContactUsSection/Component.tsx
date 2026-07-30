'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { NHButton, Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const ContactUsSectionBlock: React.FC<AnyBlock> = (props) => {
  const listItems = (props.listItems as Array<{ listText?: string }>) || []

  return (
    <Section className="bg-nh-blue text-white">
      <FadeIn>
        <div className="max-w-3xl">
          <h2 className="nh-section-title text-white">{props.title as string}</h2>
          <p className="mb-8 text-white/80">{props.description as string}</p>
          <ul className="space-y-3">
            {listItems.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white" />
                {item.listText}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <NHButton href="/contact-us" className="bg-white text-nh-blue hover:bg-white/90">
              Contact Us
            </NHButton>
          </div>
        </div>
      </FadeIn>
    </Section>
  )
}
