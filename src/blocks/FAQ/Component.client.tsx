'use client'

import type { FAQBlock as FAQBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

type FAQItem = NonNullable<FAQBlockProps['faqs']>[number]

function splitIntoColumns(items: FAQItem[]) {
  const midpoint = Math.ceil(items.length / 2)
  return [items.slice(0, midpoint), items.slice(midpoint)] as const
}

function FAQItemRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-border">
      <button
        className="flex w-full items-start justify-between gap-6 py-6 text-left"
        onClick={onToggle}
        type="button"
      >
        <span
          className={cn('text-lg font-semibold leading-snug transition-colors md:text-xl', {
            'text-[#2563eb]': isOpen,
            'text-foreground': !isOpen,
          })}
        >
          {item.question}
        </span>

        <ChevronDown
          className={cn('mt-1 size-5 shrink-0 transition-transform duration-200', {
            'rotate-180 text-[#2563eb]': isOpen,
            'text-foreground': !isOpen,
          })}
        />
      </button>

      <div
        className={cn('grid transition-[grid-template-rows,opacity] duration-200 ease-out', {
          'grid-rows-[0fr] opacity-0': !isOpen,
          'grid-rows-[1fr] opacity-100': isOpen,
        })}
      >
        <div className="overflow-hidden">
          <div className="pb-6 pr-8 text-base leading-relaxed text-muted-foreground">
            <RichText data={item.answer} enableGutter={false} enableProse={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

function FAQColumn({
  items,
  openId,
  setOpenId,
}: {
  items: FAQItem[]
  openId: string | null
  setOpenId: (id: string | null) => void
}) {
  return (
    <div>
      {items.map((item) => {
        const itemId = item.id ?? item.question

        return (
          <FAQItemRow
            isOpen={openId === itemId}
            item={item}
            key={itemId}
            onToggle={() => setOpenId(openId === itemId ? null : itemId)}
          />
        )
      })}
    </div>
  )
}

export const FAQBlockClient: React.FC<FAQBlockProps> = ({ button, faqs, heading }) => {
  const [openId, setOpenId] = useState<string | null>(faqs?.[0]?.id ?? faqs?.[0]?.question ?? null)

  if (!faqs?.length) return null

  const [leftColumn, rightColumn] = splitIntoColumns(faqs)

  return (
    <section className="bg-secondary py-16 md:py-20">
      <div className="container">
        <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-start md:justify-between">
          <h2 className="max-w-md text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
            {heading}
          </h2>

          {button?.label && button?.link && (
            <Link
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              href={button.link}
            >
              {button.label}
            </Link>
          )}
        </div>

        <div className="grid gap-x-16 lg:grid-cols-2">
          <FAQColumn items={leftColumn} openId={openId} setOpenId={setOpenId} />
          {rightColumn.length > 0 && (
            <FAQColumn items={rightColumn} openId={openId} setOpenId={setOpenId} />
          )}
        </div>
      </div>
    </section>
  )
}
