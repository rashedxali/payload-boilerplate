'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const RichContentBlock: React.FC<AnyBlock> = (props) => {
  const content = props.content as { root?: unknown }
  if (!content) return null
  return (
    <Section>
      <FadeIn>
        <div className="prose prose-neutral max-w-4xl">
          {/* Rich text rendered via serialized content - simplified fallback */}
          <p>Rich content block</p>
        </div>
      </FadeIn>
    </Section>
  )
}
