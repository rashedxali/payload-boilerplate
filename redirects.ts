import type { NextConfig } from 'next'

/** Renamed top-level sections, e.g. `{ from: 'news', to: 'blogs' }` redirects /news and /news/:slug. */
export const renamedSectionRedirects: { from: string; to: string }[] = []

/** Page slugs that 301 elsewhere — exclude from the pages sitemap. */
export const redirectedPageSlugs = renamedSectionRedirects.map(({ from }) => from)

export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const renamedSectionRedirectRules = renamedSectionRedirects.flatMap(({ from, to }) => [
    {
      source: `/${from}`,
      destination: `/${to}`,
      permanent: true,
    },
    {
      source: `/${from}/:slug`,
      destination: `/${to}/:slug`,
      permanent: true,
    },
  ])

  return [internetExplorerRedirect, ...renamedSectionRedirectRules]
}
