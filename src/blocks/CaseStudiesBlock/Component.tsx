'use client'

import React from 'react'
import Link from 'next/link'
import { FadeIn } from '@/components/FadeIn'
import { getDocumentPath } from '@/utilities/getDocumentURL'
import { getPlainTextFromLexical } from '@/utilities/getPlainTextFromLexical'
import { MediaImage, NHButton, Section } from '@/blocks/shared/ui'
import { BlockTitle } from '@/blocks/shared/BlockTitle'

type AnyBlock = Record<string, any>

export const CaseStudiesBlock: React.FC<AnyBlock> = (props) => {
  const items =
    (props.items as Array<{ caseStudy?: { title?: string; slug?: string; featuredImage?: number } }>) ||
    []

  return (
    <Section>
      <FadeIn>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <BlockTitle className="nh-section-title mb-2" data={props.title} />
            <p className="text-black/70">{props.description as string}</p>
          </div>
          {props.viewMoreUrl && (
            <NHButton href={props.viewMoreUrl as string}>{props.viewMoreText as string}</NHButton>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, i) => {
            const cs = item.caseStudy
            if (!cs || typeof cs !== 'object') return null
            return (
              <Link
                key={i}
                href={getDocumentPath(cs.slug, 'our-work')}
                className="group overflow-hidden rounded-2xl border border-black/10 bg-white"
              >
                <MediaImage resource={cs.featuredImage as number} className="aspect-[16/10]" />
                <div className="p-6">
                  <h3 className="text-xl group-hover:text-nh-blue">
                    {getPlainTextFromLexical(cs.title)}
                  </h3>
                </div>
              </Link>
            )
          })}
        </div>
      </FadeIn>
    </Section>
  )
}
