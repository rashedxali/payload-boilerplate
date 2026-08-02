'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { HtmlContent, MediaImage, Section } from '@/blocks/shared/ui'
import { BlockTitle } from '@/blocks/shared/BlockTitle'

type AnyBlock = Record<string, any>

export const OfficeAddressBlock: React.FC<AnyBlock> = (props) => {
  const addresses =
    (props.addresses as Array<{ title?: string; address?: string; googleMapUrl?: string }>) || []

  return (
    <Section>
      <FadeIn>
        <BlockTitle className="nh-section-title" data={props.title} />
        <MediaImage resource={props.image as number} className="mb-10 overflow-hidden rounded-2xl" />
        <div className="grid gap-6 md:grid-cols-2">
          {addresses.map((addr, i) => (
            <div key={i} className="rounded-2xl border border-black/10 p-6">
              <BlockTitle className="mb-3 text-xl" data={addr.title} />
              <HtmlContent html={addr.address} className="mb-4" />
              {addr.googleMapUrl && (
                <a className="text-nh-blue hover:underline" href={addr.googleMapUrl} rel="noreferrer" target="_blank">
                  View on map
                </a>
              )}
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}
