import type { NextConfig } from 'next'

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

  // Route segments are named after their collection slug, so these cover the URLs
  // that predate that convention. Each points at the final destination rather than
  // chaining through the intermediate one.
  const legacyCollectionRedirects = ['posts', 'blog'].flatMap((prefix) => [
    {
      source: `/${prefix}`,
      destination: '/blogs',
      permanent: true,
    },
    {
      source: `/${prefix}/page/:pageNumber`,
      destination: '/blogs/page/:pageNumber',
      permanent: true,
    },
    {
      source: `/${prefix}/category/:slug`,
      destination: '/blogs/category/:slug',
      permanent: true,
    },
    {
      source: `/${prefix}/:slug`,
      destination: '/blogs/:slug',
      permanent: true,
    },
  ])

  const renamedSectionRedirects = [
    { from: 'our-services', to: 'services' },
    { from: 'download', to: 'guides' },
  ].flatMap(({ from, to }) => [
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

  return [internetExplorerRedirect, ...legacyCollectionRedirects, ...renamedSectionRedirects]
}
