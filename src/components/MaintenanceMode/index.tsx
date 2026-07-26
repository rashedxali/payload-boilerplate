import { Wrench } from 'lucide-react'
import React from 'react'

import { Media as MediaComponent } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
  contactEmail?: string | null
  headline?: string | null
  logo?: MediaType | number | null
  message?: string | null
  siteName?: string | null
}

export const MaintenanceMode: React.FC<Props> = ({
  className,
  contactEmail,
  headline = 'We’ll be back soon',
  logo,
  message,
  siteName,
}) => {
  const hasLogo = logo && typeof logo === 'object'

  return (
    <main
      className={cn(
        'flex flex-1 items-center justify-center px-6 py-24',
        'bg-[radial-gradient(circle_at_top,var(--color-muted)_0%,var(--color-background)_55%)]',
        className,
      )}
    >
      <div className="w-full max-w-xl">
        <div className="rounded-xl border border-border bg-card/80 p-8 shadow-sm backdrop-blur-sm md:p-12">
          <div className="mb-8 flex flex-col items-center gap-6 text-center">
            {hasLogo ? (
              <MediaComponent
                htmlElement={null}
                imgClassName="h-10 w-auto object-contain"
                priority
                resource={logo}
              />
            ) : siteName ? (
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {siteName}
              </p>
            ) : null}

            <div className="flex size-16 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-xs">
              <Wrench aria-hidden className="size-7" strokeWidth={1.75} />
            </div>

            <div className="space-y-2">
              <span className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Maintenance
              </span>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {headline}
              </h1>
            </div>
          </div>

          {message && (
            <p className="mx-auto max-w-md text-center text-base leading-7 text-muted-foreground">
              {message}
            </p>
          )}

          {contactEmail && (
            <div className="mt-8 border-t border-border pt-8 text-center">
              <p className="mb-2 text-sm text-muted-foreground">Need help?</p>
              <a
                className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:underline"
                href={`mailto:${contactEmail}`}
              >
                {contactEmail}
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
