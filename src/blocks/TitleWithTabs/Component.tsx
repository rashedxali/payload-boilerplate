'use client'

import React, { useState } from 'react'
import { FadeIn } from '@/components/FadeIn'
import { NHButton, Section } from '@/blocks/shared/ui'
import { BlockTitle } from '@/blocks/shared/BlockTitle'
import { getPlainTextFromLexical } from '@/utilities/getPlainTextFromLexical'

type AnyBlock = Record<string, any>

export const TitleWithTabsBlock: React.FC<AnyBlock> = (props) => {
  const tabs = (props.tabs as Array<{ title?: any; description?: string }>) || []
  const [active, setActive] = useState(0)

  return (
    <Section>
      <FadeIn>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <BlockTitle className="nh-section-title mb-0" data={props.title} />
          <NHButton href={props.buttonUrl as string}>{props.buttonTitle as string}</NHButton>
        </div>
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="space-y-2">
            {tabs.map((tab, i) => (
              <button
                key={i}
                type="button"
                className={`w-full rounded-lg px-4 py-3 text-left ${
                  active === i ? 'bg-nh-blue text-white' : 'bg-nh-gray'
                }`}
                onClick={() => setActive(i)}
              >
                {getPlainTextFromLexical(tab.title)}
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-black/10 p-8">
            <BlockTitle className="mb-4 text-2xl" data={tabs[active]?.title} />
            <p className="text-black/70">{tabs[active]?.description}</p>
          </div>
        </div>
      </FadeIn>
    </Section>
  )
}
