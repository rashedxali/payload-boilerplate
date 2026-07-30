'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { HtmlContent, Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const AboutUsStrategyBlock: React.FC<AnyBlock> = (props) => {
  const numbers =
    (props.numbers as Array<{ count?: string; prefix?: string; title?: string }>) || []

  return (
    <Section>
      <FadeIn>
        <HtmlContent html={props.description as string} className="mb-12 max-w-4xl" />
        <div className="grid gap-6 md:grid-cols-3">
          {numbers.map((n, i) => (
            <div key={i} className="rounded-2xl bg-nh-blue-light p-8 text-center">
              <div className="text-4xl font-medium text-nh-blue">
                {n.count}
                {n.prefix}
              </div>
              <p className="mt-2">{n.title}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}
