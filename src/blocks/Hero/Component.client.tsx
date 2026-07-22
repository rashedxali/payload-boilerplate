'use client'

import type { HeroBlock as HeroBlockProps, Media } from '@/payload-types'

import { Media as MediaComponent } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { Linkedin } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

type Testimonial = NonNullable<HeroBlockProps['testimonials']>[number]

function TestimonialTooltip({ testimonial }: { testimonial: Testimonial }) {
  if (!testimonial.name && !testimonial.title) return null

  return (
    <div className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-50 w-56 -translate-x-1/2 rounded-2xl border border-black/5 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
      <div className="mb-3 flex items-start justify-between gap-3">
        {testimonial.avatar && typeof testimonial.avatar === 'object' && (
          <div className="relative size-10 overflow-hidden rounded-full">
            <MediaComponent fill imgClassName="object-cover" resource={testimonial.avatar} />
          </div>
        )}

        {testimonial.socialLink && (
          <Link
            aria-label={`${testimonial.name ?? 'Profile'} on LinkedIn`}
            className="pointer-events-auto text-muted-foreground transition-colors hover:text-[#0a66c2]"
            href={testimonial.socialLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Linkedin className="size-4" />
          </Link>
        )}
      </div>

      {testimonial.name && <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>}
      {testimonial.title && <p className="mt-1 text-xs text-muted-foreground">{testimonial.title}</p>}
    </div>
  )
}

function TestimonialAvatar({
  index,
  testimonial,
}: {
  index: number
  testimonial: Testimonial
}) {
  const [isHovered, setIsHovered] = useState(false)
  const avatar = testimonial.avatar && typeof testimonial.avatar === 'object' ? testimonial.avatar : null
  const hasTooltip = Boolean(testimonial.name || testimonial.title)

  if (!avatar) return null

  return (
    <div
      className="relative"
      onBlur={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ zIndex: isHovered ? 50 : 10 - index }}
    >
      <button
        aria-label={testimonial.name ?? `Team member ${index + 1}`}
        className={cn(
          'relative size-9 overflow-hidden rounded-full border-2 border-[#f4f4f5] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20',
          { 'cursor-default': !hasTooltip },
        )}
        type="button"
      >
        <MediaComponent fill imgClassName="object-cover" resource={avatar} />
      </button>

      {isHovered && hasTooltip && <TestimonialTooltip testimonial={testimonial} />}
    </div>
  )
}

export const HeroBlockClient: React.FC<HeroBlockProps> = ({
  cta,
  headline,
  rating,
  subheadline,
  testimonials,
}) => {
  const visibleTestimonials =
    testimonials?.filter(
      (item) =>
        (item.avatar && typeof item.avatar === 'object') || item.name || item.title,
    ) ?? []

  return (
    <section className="relative bg-[#f4f4f5]">
      <div className="container relative overflow-visible pb-10 pt-16 md:pb-14 md:pt-24">
        <div className="max-w-4xl">
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-[4.25rem] lg:leading-[1.02]">
            {headline}
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {subheadline}
          </p>

          <div className="relative mt-10 flex flex-col gap-6 overflow-visible sm:flex-row sm:flex-wrap sm:items-center md:mt-12 lg:gap-8">
            {cta?.label && cta?.link && (
              <Link
                className="inline-flex w-fit items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                href={cta.link}
              >
                {cta.label}
              </Link>
            )}

            {rating?.logo && typeof rating.logo === 'object' && (
              <div className="relative h-10 w-auto min-w-[120px]">
                <MediaComponent
                  imgClassName="h-10 w-auto object-contain object-left"
                  resource={rating.logo}
                />
              </div>
            )}

            {(visibleTestimonials.length > 0) && (
              <div className="relative flex items-center gap-3 overflow-visible pt-4">
                {visibleTestimonials.length > 0 && (
                  <div className="flex -space-x-2 overflow-visible">
                    {visibleTestimonials.map((testimonial, index) => (
                      <TestimonialAvatar
                        index={index}
                        key={testimonial.id ?? `${testimonial.name}-${index}`}
                        testimonial={testimonial}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
