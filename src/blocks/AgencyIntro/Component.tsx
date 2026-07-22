import React from 'react'

import type { AgencyIntroBlock as AgencyIntroBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import Link from 'next/link'

export const AgencyIntroBlock: React.FC<AgencyIntroBlockProps> = ({
  button,
  content,
  heading,
  tagline,
}) => {
  return (
    <section className="bg-black py-16 text-white md:py-24 lg:py-28">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-28">
          <h2 className="whitespace-pre-line text-3xl font-normal leading-[1.15] tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            {heading}
          </h2>

          <div className="flex flex-col gap-8">
            {content && (
              <div className="text-base leading-relaxed text-white/90 md:text-lg md:leading-[1.7] [&_p+p]:mt-6">
                <RichText data={content} enableGutter={false} enableProse={false} />
              </div>
            )}

            {tagline && <p className="text-base text-white/45 md:text-lg">{tagline}</p>}

            {button?.label && button?.link && (
              <Link
                className="inline-flex w-fit items-center justify-center rounded-full bg-[#2563eb] px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#1d4ed8]"
                href={button.link}
              >
                {button.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
