'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { InlineWidget } from 'react-calendly'

import { FadeIn } from '@/components/FadeIn'
import { getDocumentPath } from '@/utilities/getDocumentURL'
import { BracketHighlight, HtmlContent, MediaImage, NHButton, Section } from './shared'

type AnyBlock = Record<string, any>

export const HomeHeroBlock: React.FC<AnyBlock> = (props) => {
  const title = props.title as string
  const description = props.description as string
  const button = props.button as { text?: string; url?: string }
  const bannerVideo = props.bannerVideo as string
  const highlights = (props.highlights as Array<{ title?: string }>) || []

  return (
    <Section className="relative overflow-hidden bg-nh-blue-light pt-24 pb-16">
      <FadeIn>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="mb-6 text-5xl font-medium tracking-tight max-sm:text-4xl">
              <BracketHighlight text={title} />
            </h1>
            {description && <p className="mb-8 text-lg text-black/70">{description}</p>}
            {highlights.length > 0 && (
              <ul className="mb-8 flex flex-wrap gap-3">
                {highlights.map((h, i) => (
                  <li
                    key={i}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm"
                  >
                    {h.title}
                  </li>
                ))}
              </ul>
            )}
            <NHButton href={button?.url}>{button?.text}</NHButton>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-black/5">
            {bannerVideo ? (
              <video
                autoPlay
                className="h-full w-full object-cover"
                loop
                muted
                playsInline
                src={bannerVideo}
              />
            ) : (
              <MediaImage resource={props.bannerImage as number} className="h-full" />
            )}
          </div>
        </div>
      </FadeIn>
    </Section>
  )
}

export const ProjectAccordionBlock: React.FC<AnyBlock> = (props) => {
  const accordions =
    (props.accordions as Array<{
      title?: string
      description?: string
      projectImage?: number
      button?: { text?: string; url?: string }
    }>) || []
  const [active, setActive] = useState(0)

  return (
    <Section>
      <FadeIn>
        <h2 className="nh-section-title">{props.title as string}</h2>
        <p className="mb-10 max-w-3xl text-black/70">{props.description as string}</p>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            {accordions.map((item, i) => (
              <button
                key={i}
                type="button"
                className={`w-full rounded-xl border p-5 text-left transition ${
                  active === i ? 'border-nh-blue bg-nh-blue-light' : 'border-black/10 bg-white'
                }`}
                onClick={() => setActive(i)}
              >
                <h3 className="text-xl font-medium">{item.title}</h3>
                {active === i && (
                  <p className="mt-3 text-black/70">{item.description}</p>
                )}
              </button>
            ))}
          </div>
          <div>
            <MediaImage
              resource={accordions[active]?.projectImage}
              className="overflow-hidden rounded-2xl"
            />
            {accordions[active]?.button?.url && (
              <div className="mt-6">
                <NHButton href={accordions[active]?.button?.url}>
                  {accordions[active]?.button?.text}
                </NHButton>
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    </Section>
  )
}

export const WhyNotionhiveBlock: React.FC<AnyBlock> = (props) => {
  const cards =
    (props.cards as Array<{ title?: string; description?: string; icon?: number }>) || []

  return (
    <Section>
      <FadeIn>
        <h2 className="nh-section-title text-center">{props.title as string}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <div key={i} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <MediaImage resource={card.icon} className="mb-4 h-12 w-12" />
              <h3 className="mb-3 text-xl">{card.title}</h3>
              <p className="text-black/70">{card.description}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}

export const ServiceGridBlock: React.FC<AnyBlock> = (props) => {
  const items =
    (props.items as Array<{
      title?: string
      subtitle?: string
      description?: string
      buttonTitle?: string
      url?: string
    }>) || []
  const button = props.button as { text?: string; url?: string }

  return (
    <Section>
      <FadeIn>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="nh-section-title mb-2">{props.title as string}</h2>
            <p className="text-black/70">{props.subtitle as string}</p>
          </div>
          <NHButton href={button?.url}>{button?.text}</NHButton>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <Link
              key={i}
              href={item.url || '#'}
              className="group rounded-2xl border border-black/10 bg-white p-8 transition hover:border-nh-blue hover:shadow-lg"
            >
              <h3 className="mb-2 text-2xl group-hover:text-nh-blue">{item.title}</h3>
              <p className="mb-4 text-sm text-black/60">{item.subtitle}</p>
              <p className="mb-6 text-black/70">{item.description}</p>
              <span className="text-sm font-medium text-nh-blue">{item.buttonTitle}</span>
            </Link>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}

export const OurProcessBlockBlock: React.FC<AnyBlock> = (props) => {
  const cards =
    (props.cards as Array<{ title?: string; description?: string }>) ||
    (props.items as Array<{ title?: string; description?: string }>) ||
    []

  return (
    <Section className="bg-nh-gray">
      <FadeIn>
        <h2 className="nh-section-title">{props.title as string}</h2>
        {(props.description as string) && (
          <p className="mb-10 max-w-3xl text-black/70">{props.description as string}</p>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {cards.map((card, i) => (
            <div key={i} className="rounded-2xl bg-white p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-nh-blue text-white">
                {i + 1}
              </div>
              <h3 className="mb-2 text-lg font-medium">{card.title}</h3>
              <p className="text-sm text-black/70">{card.description}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}

export const UspTableBlock: React.FC<AnyBlock> = (props) => {
  const columns = (props.columns as Array<{ label?: string }>) || []
  const rows =
    (props.rows as Array<{
      feature?: string
      notionhive?: string
      inhouse?: string
      freelancers?: string
    }>) || []

  return (
    <Section>
      <FadeIn>
        <h2 className="nh-section-title mb-8">{props.tableTitle as string}</h2>
        <div className="overflow-x-auto rounded-2xl border border-black/10">
          <table className="w-full min-w-[640px] text-left">
            <thead className="bg-nh-blue-light">
              <tr>
                {columns.map((col, i) => (
                  <th key={i} className="px-6 py-4 font-medium">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-t border-black/10">
                  <td className="px-6 py-4 font-medium">{row.feature}</td>
                  <td className="px-6 py-4">{row.notionhive}</td>
                  <td className="px-6 py-4">{row.inhouse}</td>
                  <td className="px-6 py-4">{row.freelancers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>
    </Section>
  )
}

export const NumbersSectionBlock: React.FC<AnyBlock> = (props) => {
  const cards =
    (props.cards as Array<{ count?: string; prefix?: string; description?: string }>) || []

  return (
    <Section>
      <FadeIn>
        <h2 className="nh-section-title">{props.title as string}</h2>
        <p className="mb-10 max-w-3xl text-black/70">{props.description as string}</p>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <div key={i} className="rounded-2xl bg-nh-blue-light p-8 text-center">
              <div className="text-5xl font-medium text-nh-blue">
                {card.count}
                {card.prefix}
              </div>
              <p className="mt-3 text-black/70">{card.description}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}

export const TestimonialsBlockBlock: React.FC<AnyBlock> = (props) => {
  const items =
    (props.items as Array<{
      description?: string
      name?: string
      position?: string
      image?: number
    }>) || []
  const button = props.button as { text?: string; url?: string }

  return (
    <Section className="bg-nh-gray">
      <FadeIn>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="nh-section-title mb-0">{props.title as string}</h2>
          <NHButton href={button?.url}>{button?.text}</NHButton>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl bg-white p-6 shadow-sm">
              <HtmlContent html={item.description} className="mb-6 text-black/70" />
              <div className="flex items-center gap-4">
                <MediaImage resource={item.image} className="h-12 w-12 overflow-hidden rounded-full" />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-black/60">{item.position}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}

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

export const LevelUpCTABlock: React.FC<AnyBlock> = (props) => {
  const button = props.button as { text?: string; url?: string }

  return (
    <Section>
      <FadeIn>
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-nh-blue-light lg:grid-cols-2">
          <div className="p-10">
            <h2 className="nh-section-title">{props.title as string}</h2>
            <p className="mb-8 text-black/70">{props.description as string}</p>
            <NHButton href={button?.url}>{button?.text}</NHButton>
          </div>
          <MediaImage resource={props.image as number} className="h-full min-h-[320px]" />
        </div>
      </FadeIn>
    </Section>
  )
}

export const CaseStudiesBlockBlock: React.FC<AnyBlock> = (props) => {
  const items =
    (props.items as Array<{ caseStudy?: { title?: string; slug?: string; featuredImage?: number } }>) ||
    []

  return (
    <Section>
      <FadeIn>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="nh-section-title mb-2">{props.title as string}</h2>
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
                  <h3 className="text-xl group-hover:text-nh-blue">{cs.title}</h3>
                </div>
              </Link>
            )
          })}
        </div>
      </FadeIn>
    </Section>
  )
}

export const OurApproachBlock: React.FC<AnyBlock> = (props) => {
  const items =
    (props.items as Array<{ title?: string; itemDescription?: string }>) || []

  return (
    <Section>
      <FadeIn>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="nh-section-title mb-0">{props.title as string}</h2>
          <NHButton href={props.viewMoreUrl as string}>{props.viewMoreText as string}</NHButton>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl border border-black/10 p-6">
              <h3 className="mb-3 text-xl">{item.title}</h3>
              <p className="text-black/70">{item.itemDescription}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}

export const BrandsBlockBlock: React.FC<AnyBlock> = (props) => {
  const items = (props.items as Array<{ image?: number }>) || []
  const button = props.button as { text?: string; url?: string }

  return (
    <Section>
      <FadeIn>
        <h2 className="nh-section-title">{props.title as string}</h2>
        <p className="mb-8 text-black/70">{props.subtitle as string}</p>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-center rounded-xl bg-nh-gray p-6">
              <MediaImage resource={item.image} className="max-h-12" />
            </div>
          ))}
        </div>
        {button?.url && (
          <div className="mt-8">
            <NHButton href={button.url}>{button.text}</NHButton>
          </div>
        )}
      </FadeIn>
    </Section>
  )
}

export const ServiceDetailsBannerBlock: React.FC<AnyBlock> = (props) => (
  <Section className="bg-nh-blue-light pt-28">
    <FadeIn>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="mb-6">{props.title as string}</h1>
          <HtmlContent html={props.description as string} className="text-black/70" />
        </div>
        <MediaImage resource={props.image as number} className="overflow-hidden rounded-2xl" />
      </div>
    </FadeIn>
  </Section>
)

export const BusinessBlockBlock: React.FC<AnyBlock> = (props) => (
  <Section>
    <FadeIn>
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="nh-section-title">{props.title as string}</h2>
          <p className="mb-8 text-black/70">{props.description as string}</p>
          {props.buttonText && (
            <NHButton href="/contact-us">{props.buttonText as string}</NHButton>
          )}
        </div>
        <MediaImage resource={props.image as number} className="overflow-hidden rounded-2xl" />
      </div>
    </FadeIn>
  </Section>
)

export const PageBannerBlock: React.FC<AnyBlock> = (props) => (
  <Section className="bg-nh-blue-light pt-28 pb-12">
    <FadeIn>
      <div className="max-w-3xl">
        {props.pageTitle && (
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-nh-blue">
            {props.pageTitle as string}
          </p>
        )}
        <h1 className="mb-4">{props.title as string}</h1>
        <p className="text-lg text-black/70">{props.subtitle as string}</p>
        {props.buttonUrl && (
          <div className="mt-8">
            <NHButton href={props.buttonUrl as string}>{props.buttonTitle as string}</NHButton>
          </div>
        )}
      </div>
      <MediaImage resource={props.image as number} className="mt-10 overflow-hidden rounded-2xl" />
    </FadeIn>
  </Section>
)

export const TitleWithTabsBlock: React.FC<AnyBlock> = (props) => {
  const tabs = (props.tabs as Array<{ title?: string; description?: string }>) || []
  const [active, setActive] = useState(0)

  return (
    <Section>
      <FadeIn>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="nh-section-title mb-0">{props.title as string}</h2>
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
                {tab.title}
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-black/10 p-8">
            <h3 className="mb-4 text-2xl">{tabs[active]?.title}</h3>
            <p className="text-black/70">{tabs[active]?.description}</p>
          </div>
        </div>
      </FadeIn>
    </Section>
  )
}

export const BookConsultationBlock: React.FC<AnyBlock> = (props) => (
  <Section>
    <FadeIn>
      <h2 className="nh-section-title">{props.title as string}</h2>
      <p className="mb-8 max-w-2xl text-black/70">{props.description as string}</p>
      <div className="overflow-hidden rounded-2xl border border-black/10">
        <InlineWidget url={(props.iframe as string) || 'https://calendly.com/hellonotionhive/30min'} />
      </div>
    </FadeIn>
  </Section>
)

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

export const OurStoryBlock: React.FC<AnyBlock> = (props) => {
  const yearItems =
    (props.yearItems as Array<{
      year?: string
      title?: string
      description?: string
      image?: number
    }>) || []

  return (
    <Section className="bg-nh-gray">
      <FadeIn>
        <h2 className="nh-section-title">{props.title as string}</h2>
        <p className="mb-10 text-black/70">{props.subtitle as string}</p>
        <div className="space-y-8">
          {yearItems.map((item, i) => (
            <div key={i} className="grid gap-8 rounded-2xl bg-white p-8 lg:grid-cols-[120px_1fr_300px]">
              <div className="text-3xl font-medium text-nh-blue">{item.year}</div>
              <div>
                <h3 className="mb-3 text-xl">{item.title}</h3>
                <p className="text-black/70">{item.description}</p>
              </div>
              <MediaImage resource={item.image} className="overflow-hidden rounded-xl" />
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}

export const AwardsRecognitionBlock: React.FC<AnyBlock> = (props) => {
  const items = (props.items as Array<{ title?: string; description?: string }>) || []

  return (
    <Section>
      <FadeIn>
        <div className="grid gap-10 lg:grid-cols-2">
          <MediaImage resource={props.image as number} className="overflow-hidden rounded-2xl" />
          <div>
            <h2 className="nh-section-title">{props.title as string}</h2>
            <div className="space-y-6">
              {items.map((item, i) => (
                <div key={i}>
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="text-black/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  )
}

export const JoinOurTeamBlock: React.FC<AnyBlock> = (props) => {
  const button = props.button as { text?: string; url?: string }

  return (
    <Section>
      <FadeIn>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="nh-section-title">{props.title as string}</h2>
            <p className="mb-8 text-black/70">{props.description as string}</p>
            <NHButton href={button?.url}>{button?.text}</NHButton>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <MediaImage resource={props.imageOne as number} className="overflow-hidden rounded-2xl" />
            <MediaImage resource={props.imageTwo as number} className="mt-8 overflow-hidden rounded-2xl" />
          </div>
        </div>
      </FadeIn>
    </Section>
  )
}

export const CaseStudiesBannerBlock: React.FC<AnyBlock> = (props) => (
  <Section className="bg-nh-blue-light pt-28 pb-12">
    <FadeIn>
      <h1>{props.title as string}</h1>
    </FadeIn>
  </Section>
)

export const AllCaseStudiesBlock: React.FC<AnyBlock> = () => (
  <Section>
    <FadeIn>
      <p className="text-black/60">Case studies are loaded dynamically from the CMS.</p>
    </FadeIn>
  </Section>
)

export const WorkTogetherBlock: React.FC<AnyBlock> = (props) => (
  <Section className="bg-nh-blue text-white">
    <FadeIn>
      <div className="max-w-3xl">
        <h2 className="nh-section-title text-white">{props.title as string}</h2>
        <p className="mb-8 text-white/80">{props.description as string}</p>
        <div className="flex flex-wrap gap-4">
          <NHButton href={props.primaryButtonUrl as string} className="bg-white text-nh-blue">
            {props.primaryButtonTitle as string}
          </NHButton>
          <Link
            href={(props.secondaryButtonUrl as string) || '#'}
            className="nh-btn-outline border-white text-white hover:bg-white/10"
          >
            {props.secondaryButtonTitle as string}
          </Link>
        </div>
      </div>
    </FadeIn>
  </Section>
)

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
            {button?.url && <div className="mt-6"><NHButton href={button.url}>{button.text}</NHButton></div>}
          </div>
        </div>
      </FadeIn>
    </Section>
  )
}

export const CaseDetailsBlock: React.FC<AnyBlock> = (props) => {
  const gallery = (props.gallery as Array<{ image?: number }>) || []
  const galleryTwo =
    (props.galleryTwo as Array<{ image?: number; description?: string }>) || []

  return (
    <Section>
      <FadeIn>
        <MediaImage resource={props.bannerImage as number} className="mb-10 overflow-hidden rounded-2xl" />
        {props.subtitle && <p className="mb-4 text-nh-blue">{props.subtitle as string}</p>}
        <HtmlContent html={props.description as string} className="mb-10" />
        <div className="grid gap-4 md:grid-cols-2">
          {gallery.map((g, i) => (
            <MediaImage key={i} resource={g.image} className="overflow-hidden rounded-xl" />
          ))}
        </div>
        {props.youtubeVideoLink && (
          <div className="mt-10 aspect-video overflow-hidden rounded-2xl">
            <iframe
              allowFullScreen
              className="h-full w-full"
              src={(props.youtubeVideoLink as string).replace('watch?v=', 'embed/')}
              title="Case study video"
            />
          </div>
        )}
        {galleryTwo.length > 0 && (
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {galleryTwo.map((g, i) => (
              <div key={i}>
                <MediaImage resource={g.image} className="mb-4 overflow-hidden rounded-xl" />
                <HtmlContent html={g.description} />
              </div>
            ))}
          </div>
        )}
      </FadeIn>
    </Section>
  )
}

export const IncludedServicesBlock: React.FC<AnyBlock> = (props) => {
  const services =
    (props.services as Array<{
      title?: string
      subtitle?: string
      description?: string
      image?: number
    }>) || []

  return (
    <Section>
      <FadeIn>
        <h2 className="nh-section-title">{props.title as string}</h2>
        <p className="mb-10 max-w-3xl text-black/70">{props.description as string}</p>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((svc, i) => (
            <div key={i} className="rounded-2xl border border-black/10 p-6">
              <MediaImage resource={svc.image} className="mb-4 h-40 overflow-hidden rounded-xl" />
              <h3 className="mb-1 text-xl">{svc.title}</h3>
              <p className="mb-4 text-sm text-black/60">{svc.subtitle}</p>
              <HtmlContent html={svc.description} />
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}

export const IndustryExperienceBlock: React.FC<AnyBlock> = (props) => {
  const items = (props.items as Array<{ title?: string; description?: string }>) || []

  return (
    <Section className="bg-nh-gray">
      <FadeIn>
        <h2 className="nh-section-title">{props.title as string}</h2>
        <p className="mb-10 text-black/70">{props.description as string}</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl bg-white p-6">
              <h3 className="mb-3 text-lg">{item.title}</h3>
              <p className="text-black/70">{item.description}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}

export const OurProcessBlock: React.FC<AnyBlock> = OurProcessBlockBlock

export const OfficeAddressBlock: React.FC<AnyBlock> = (props) => {
  const addresses =
    (props.addresses as Array<{ title?: string; address?: string; googleMapUrl?: string }>) || []

  return (
    <Section>
      <FadeIn>
        <h2 className="nh-section-title">{props.title as string}</h2>
        <MediaImage resource={props.image as number} className="mb-10 overflow-hidden rounded-2xl" />
        <div className="grid gap-6 md:grid-cols-2">
          {addresses.map((addr, i) => (
            <div key={i} className="rounded-2xl border border-black/10 p-6">
              <h3 className="mb-3 text-xl">{addr.title}</h3>
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

export const AwardsBlockBlock: React.FC<AnyBlock> = (props) => {
  const items = (props.items as Array<{ image?: number; title?: string }>) || []

  return (
    <Section>
      <FadeIn>
        <h2 className="nh-section-title">{props.title as string}</h2>
        <p className="mb-10 text-black/70">{props.description as string}</p>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3 rounded-xl bg-nh-gray p-6">
              <MediaImage resource={item.image} className="max-h-16" />
              {item.title && <span className="text-sm text-center">{item.title}</span>}
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}

export const VideoTestimonialBlock: React.FC<AnyBlock> = (props) => {
  const videos = (props.videos as Array<{ videoUrl?: string; title?: string }>) || []

  return (
    <Section>
      <FadeIn>
        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((video, i) => (
            <div key={i} className="overflow-hidden rounded-2xl">
              <div className="aspect-video">
                <iframe
                  allowFullScreen
                  className="h-full w-full"
                  src={(video.videoUrl || '').replace('watch?v=', 'embed/')}
                  title={video.title || 'Video testimonial'}
                />
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  )
}

export const ProjectDiscussionBlock: React.FC<AnyBlock> = (props) => (
  <Section className="bg-nh-blue-light">
    <FadeIn>
      <div className="flex flex-wrap items-center justify-between gap-6">
        <h2 className="nh-section-title mb-0">{props.title as string}</h2>
        <NHButton href={props.buttonUrl as string}>{props.buttonTitle as string}</NHButton>
      </div>
    </FadeIn>
  </Section>
)

export const FeaturedBlogPostBlock: React.FC<AnyBlock> = (props) => {
  const post = props.post as { title?: string; slug?: string; heroImage?: number } | number
  if (!post || typeof post !== 'object') return null

  return (
    <Section>
      <FadeIn>
        <Link href={getDocumentPath(post.slug, 'blogs')} className="group grid gap-8 overflow-hidden rounded-2xl border border-black/10 lg:grid-cols-2">
          <MediaImage resource={post.heroImage as number} className="aspect-[16/10]" />
          <div className="flex flex-col justify-center p-8">
            <p className="mb-2 text-sm font-medium text-nh-blue">Featured</p>
            <h2 className="text-3xl group-hover:text-nh-blue">{post.title}</h2>
          </div>
        </Link>
      </FadeIn>
    </Section>
  )
}

export const BlogPostsBlock: React.FC<AnyBlock> = () => (
  <Section>
    <FadeIn>
      <p className="text-black/60">Blog posts are loaded on the blog listing page.</p>
    </FadeIn>
  </Section>
)

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
