'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { HtmlContent, NHButton, Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const CaseSummaryBlock: React.FC<AnyBlock> = (props) => {
  const button = props.button as { text?: string; url?: string }

  return (
    <Section>
      <FadeIn>
        <div className="grid gap-8 rounded-2xl border border-black/10 p-8 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-black/50">Year</span><p className="font-medium">{props.year as string}</p></div>
            <div><span className="text-black/50">Industry</span><p className="font-medium">{props.industry as string}</p></div>
            <div><span className="text-black/50">Team</span><p className="font-medium">{props.teamInvolvement as string}</p></div>
            <div><span className="text-black/50">Services</span><p className="font-medium">{props.servicesWeProvided as string}</p></div>
          </div>
          <div>
            <HtmlContent html={props.description as string} />
            {button?.href && <div className="mt-6"><NHButton href={button.href}>{button.text}</NHButton></div>}
          </div>
        </div>
      </FadeIn>
    </Section>
  )
}
