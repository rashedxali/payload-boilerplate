'use client'

import React from 'react'

import { BlockTitle } from '@/blocks/shared/BlockTitle'
import { Section } from '@/blocks/shared/ui'
import { FadeIn } from '@/components/FadeIn'
import { PayloadForm } from '@/components/Form'
import type { ContactUsSectionBlock as ContactUsSectionBlockProps, Form } from '@/payload-types'

type Props = ContactUsSectionBlockProps & { disableInnerContainer?: boolean }

export const ContactUsSectionBlock: React.FC<Record<string, unknown>> = (props) => {
  const { description, form, listItems, title } = props as unknown as Props
  const formDoc = typeof form === 'object' && form !== null ? (form as Form) : null

  return (
    <Section className="bg-brand-primary text-white">
      <FadeIn>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <BlockTitle className="section-title text-white" data={title} />
            {description && <p className="mb-8 text-white/80">{description}</p>}
            {listItems && listItems.length > 0 && (
              <ul className="space-y-3">
                {listItems.map((item, i) => (
                  <li key={item.id ?? i} className="flex items-center gap-3">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-white" />
                    {item.listText}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {formDoc && (
            <div>
              <PayloadForm form={formDoc} />
            </div>
          )}
        </div>
      </FadeIn>
    </Section>
  )
}
