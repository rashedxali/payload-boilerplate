# Agent Guide: creating blocks and post types

This guide is for AI agents working in this repo. It describes **how we build blocks and post types here**. Follow these patterns exactly; do not import patterns from other Payload templates.

## Step 0, for every task: ask, then read the brand

1. **Ask before you build.** Follow [`ASKING.md`](ASKING.md): ask the user where the data comes from and what editors can change, in one message, and wait for the answers. Never infer the data model from a screenshot.
2. **Read the brand.** [`../brand/about.md`](../brand/about.md), [`../brand/colors.md`](../brand/colors.md), [`../brand/fonts.md`](../brand/fonts.md). Use only the colors and fonts defined there.

Also read:

- [`skills/payload/SKILL.md`](skills/payload/SKILL.md) for Payload API reference.
- [`skills/frontend-design/SKILL.md`](skills/frontend-design/SKILL.md) before designing any new UI. Where it conflicts with `brand/`, `brand/` wins.

Ground rules:

- Package manager is **Bun** (`bun install`, `bun run <script>`).
- Database is **Postgres** with `blocksAsJSON: true`. Block fields never create tables, but collection fields do.
- Never edit `src/payload-types.ts` by hand. Run `bun run generate:types` after every schema change.
- Copy an existing file and adapt it. The reference implementations listed below are the source of truth for style.

---

## 1. Creating a block

A block is one folder with two files, registered in two places.

```
src/blocks/<BlockName>/
├── config.ts       # Payload Block: what editors fill in
└── Component.tsx   # React component: how it renders
```

### Reference blocks

Pick the one closest to what you are building and copy it.

| Block | Shows how to |
| --- | --- |
| [`TestimonialsBlock`](../src/blocks/TestimonialsBlock/) | `select` variant, `array` of items, upload inside an array, button group |
| [`ContactUsSection`](../src/blocks/ContactUsSection/) | `relationship` to a plugin collection (`forms`), simple `array`, typed props |
| [`FeaturedBlogPost`](../src/blocks/FeaturedBlogPost/) | single `relationship` to a post type and rendering the populated doc |

### Decide the data source first

Settle this with the user (see [`ASKING.md`](ASKING.md)) before writing `config.ts`. It decides the field types.

| Repeated items in the design are... | Field | Reference |
| --- | --- | --- |
| Documents of an existing post type, picked by the editor | `relationship` (`hasMany: true` for several) | `FeaturedBlogPost`; `relatedPosts` in [`Blogs`](../src/collections/Blogs/index.ts) for `hasMany` |
| Documents of an existing post type, chosen automatically (latest, by category) | No item field; a `limit` / filter field, and query in a server component | [`blogs/page.tsx`](../src/app/(frontend)/blogs/page.tsx) for the query |
| Things that need their own page or are reused across the site | New post type (section 2), then a `relationship` | `Blogs` |
| Content that lives only in this section | `array` | `TestimonialsBlock` |

### Naming

For a block called "Team Grid":

| Thing | Value | Rule |
| --- | --- | --- |
| Folder | `src/blocks/TeamGrid/` | PascalCase |
| Config export | `TeamGrid` | Same as folder |
| `slug` | `teamGrid` | camelCase of the folder name |
| `interfaceName` | `TeamGridBlock` | Config export + `Block` |
| Component export | `TeamGridBlock` | Config export + `Block` |
| `labels` | `{ singular: 'Team Grid', plural: 'Team Grids' }` | Human readable |

### Step 1: `config.ts`

```ts
import type { Block } from 'payload'

import { buttonGroup, optionalText, optionalTitle, optionalUpload } from '@/blocks/shared/fields'

export const TeamGrid: Block = {
  slug: 'teamGrid',
  interfaceName: 'TeamGridBlock',
  labels: { singular: 'Team Grid', plural: 'Team Grids' },
  admin: {
    disableBlockName: true,
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Slider', value: 'slider' },
      ],
    },
    optionalTitle('title', 'Title'),
    optionalText('description', 'Description', true),
    buttonGroup('button'),
    {
      name: 'members',
      type: 'array',
      fields: [
        optionalText('name', 'Name'),
        optionalText('role', 'Role'),
        optionalUpload('photo', 'Photo'),
      ],
    },
    {
      name: 'relatedPost',
      type: 'relationship',
      relationTo: 'blogs',
    },
  ],
}
```

Rules:

- Always set `slug`, `interfaceName`, `labels` and `admin.disableBlockName: true`.
- Use the helpers in [`src/blocks/shared/fields.ts`](../src/blocks/shared/fields.ts) instead of writing raw fields:
  - `optionalTitle(name, label)`: heading rich text (h1 to h4). Use for every block or item title.
  - `optionalText(name, label, multiline?)`: text, or textarea when `multiline` is `true`.
  - `optionalUpload(name, label)`: upload to `media`.
  - `buttonGroup(name)`: group with `text`, `href`, `target`.
  - `htmlField(name, label)`: textarea holding HTML.
- Write raw field objects only for `select`, `array`, `relationship` and anything the helpers do not cover.
- Fields are optional by default. Add `required: true` only when the block cannot render without the value.
- If a field is needed by several blocks, add a helper to `shared/fields.ts` rather than duplicating it.

### Step 2: `Component.tsx`

```tsx
'use client'

import React from 'react'

import { BlockTitle } from '@/blocks/shared/BlockTitle'
import { MediaImage, ButtonLink, Section } from '@/blocks/shared/ui'
import { FadeIn } from '@/components/FadeIn'
import type { TeamGridBlock as TeamGridBlockProps } from '@/payload-types'

type Props = TeamGridBlockProps & { disableInnerContainer?: boolean }

export const TeamGridBlock: React.FC<Record<string, unknown>> = (props) => {
  const { button, description, members, title } = props as unknown as Props

  return (
    <Section>
      <FadeIn>
        <BlockTitle className="section-title" data={title} />
        {description && <p className="mb-8 text-black/70">{description}</p>}
        {members && members.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member, i) => (
              <div key={member.id ?? i} className="rounded-2xl bg-white p-6 shadow-sm">
                <MediaImage resource={member.photo} className="mb-4 overflow-hidden rounded-xl" />
                <div className="font-medium">{member.name}</div>
                <div className="text-sm text-black/60">{member.role}</div>
              </div>
            ))}
          </div>
        )}
        <ButtonLink href={button?.href ?? undefined}>{button?.text}</ButtonLink>
      </FadeIn>
    </Section>
  )
}
```

Rules:

- Type props from `@/payload-types` as in [`ContactUsSection/Component.tsx`](../src/blocks/ContactUsSection/Component.tsx). Some older blocks use `Record<string, any>`; do not copy that.
- Named export only, no default export.
- Wrap the block in `<Section>` and `<FadeIn>`. `Section` provides the vertical spacing and the container.
- Building blocks from [`src/blocks/shared/ui.tsx`](../src/blocks/shared/ui.tsx):
  - `Section`: outer `<section>` + container. Pass background classes through `className`.
  - `ButtonLink`: link button. Renders nothing without `href`, so no guard is needed.
  - `MediaImage`: renders a media ID or populated media doc. Renders nothing when empty.
  - `HtmlContent`: renders an HTML string from `htmlField`.
- Render every `optionalTitle` field with [`BlockTitle`](../src/blocks/shared/BlockTitle.tsx), never as a plain string.
- Guard every optional value. An empty block must render without errors.
- Relationship values are either an ID or a populated document. Check `typeof value === 'object'` before reading fields (see `FeaturedBlogPost`).
- Arrays: use `item.id ?? index` as the key.
- Styling is Tailwind. Brand tokens and the shared utility classes (`section`, `section-title`, `hero-title`, `btn-primary`, `btn-outline`) live in [`src/app/(frontend)/globals.css`](../src/app/(frontend)/globals.css).
- Add `'use client'` only when the block uses hooks or browser APIs. `FadeIn` is already a client component and can be used from either.

### Step 3: register in both places

Blocks are **not** registered in `payload.config.ts`.

1. Admin: add the config to [`src/blocks/layoutBlocks.ts`](../src/blocks/layoutBlocks.ts).

   ```ts
   import { TeamGrid } from '@/blocks/TeamGrid/config'

   export const layoutBlocks: Block[] = [/* ... */ TeamGrid]
   ```

2. Frontend: map the slug to the component in [`src/blocks/RenderBlocks.tsx`](../src/blocks/RenderBlocks.tsx).

   ```ts
   import { TeamGridBlock } from '@/blocks/TeamGrid/Component'

   const blockComponents = {
     // ...
     teamGrid: TeamGridBlock,
   }
   ```

The key in `blockComponents` must equal the `slug` in `config.ts`. If they differ, the block shows in admin and renders nothing.

### Step 4: finish

```bash
bun run generate:types
bunx tsc --noEmit
```

No migration is needed for a new block (`blocksAsJSON`).

### Block checklist

- [ ] Questions from `ASKING.md` asked and answered; data source decided
- [ ] `brand/` read; only brand colors and fonts used
- [ ] `src/blocks/<Name>/config.ts` with `slug`, `interfaceName`, `labels`, `disableBlockName`
- [ ] `src/blocks/<Name>/Component.tsx` typed from `@/payload-types`
- [ ] Added to `layoutBlocks.ts`
- [ ] Added to `blockComponents` in `RenderBlocks.tsx` with the same slug
- [ ] `bun run generate:types` and `bunx tsc --noEmit` pass

---

## 2. Creating a post type

A post type is a collection with public detail pages, drafts, SEO and a sitemap. **Blogs is the reference**: copy it.

- Config: [`src/collections/Blogs/index.ts`](../src/collections/Blogs/index.ts)
- Revalidation hook: [`src/collections/Blogs/hooks/revalidateBlog.ts`](../src/collections/Blogs/hooks/revalidateBlog.ts)
- Detail route: [`src/app/(frontend)/blogs/[slug]/page.tsx`](../src/app/(frontend)/blogs/[slug]/page.tsx)
- Archive route: [`src/app/(frontend)/blogs/page.tsx`](../src/app/(frontend)/blogs/page.tsx)

The collection `slug` is also the URL segment: slug `events` is served at `/events/<doc-slug>`. Use a kebab-case plural.

The example below adds an `events` post type.

### Step 1: collection config

Create `src/collections/Events/index.ts`.

```ts
import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { revalidateDelete, revalidateEvent } from './hooks/revalidateEvent'

import {
  MetaDescriptionField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { extendedSeoFields } from '@/fields/seo'
import { slugField } from 'payload'

export const Events: CollectionConfig<'events'> = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => generatePreviewPath({ slug: data?.slug, collection: 'events', req }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({ slug: data?.slug as string, collection: 'events', req }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              label: false,
              required: true,
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaDescriptionField({}),
            ...extendedSeoFields(),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateEvent],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
```

Rules:

- Pass the slug generic: `CollectionConfig<'events'>`. It makes `defaultPopulate` type safe.
- Access is always `authenticated` for writes and `authenticatedOrPublished` for read (from `src/access/`).
- Layout of the edit screen: `title` first, then `tabs` (Content, optional Meta, SEO), then sidebar fields (`publishedAt`, relationships), then `slugField()` last.
- The SEO tab is always the named tab `meta` with exactly the four entries shown.
- Categories: add a `categories` relationship (`hasMany: true`, `relationTo: 'categories'`, sidebar) and include `categories: true` in `defaultPopulate`, as Blogs does.
- Block layout instead of rich text: use a `layout` field (`type: 'blocks'`, `blocks: layoutBlocks`) and add `normalizeLayoutTitlesAfterRead` / `normalizeLayoutTitlesBeforeChange` from `@/hooks/normalizeLayoutTitles` to the hooks, as [`Pages`](../src/collections/Pages/index.ts) does. Render it with `<RenderBlocks blocks={doc.layout || []} />`.

### Step 2: revalidation hook

Create `src/collections/Events/hooks/revalidateEvent.ts` by copying [`revalidateBlog.ts`](../src/collections/Blogs/hooks/revalidateBlog.ts) and replacing `Blog` / `'blogs'` with `Event` / `'events'`. It must:

- revalidate the document path and the archive path on publish, unpublish and delete;
- call `revalidateTag(getSitemapCacheTag('events'), 'max')` each time;
- skip everything when `context.disableRevalidate` is set.

### Step 3: register the collection

[`src/payload.config.ts`](../src/payload.config.ts):

```ts
import { Events } from './collections/Events'

collections: [Pages, Blogs, Events, Media, Categories, NewsletterSubscribers, Users],
```

### Step 4: make it addressable

Add the slug to `documentCollections` in [`src/utilities/getDocumentURL.ts`](../src/utilities/getDocumentURL.ts):

```ts
export const documentCollections = ['pages', 'blogs', 'events'] as const
```

This single list drives document URLs, preview paths, the `/events-sitemap.xml` rewrite in `next.config.ts` and the sitemap index. Then satisfy the two places that depend on it:

- [`src/sitemap/registry.ts`](../src/sitemap/registry.ts): add `events: 'Events'` to `collectionTitles` (TypeScript fails until you do).
- [`src/sitemap/shared.ts`](../src/sitemap/shared.ts): add `'events'` to `sitemapSeoCollections` when the collection has the SEO tab, so `noindex` documents are left out of the sitemap.

### Step 5: frontend routes

Detail page, `src/app/(frontend)/events/[slug]/page.tsx`. Always use the `createDocumentPage` factory from [`_lib/createDocumentPage.tsx`](../src/app/(frontend)/_lib/createDocumentPage.tsx); it handles static params, metadata, redirects, live preview and JSON-LD.

```tsx
import RichText from '@/components/RichText'

import { createDocumentPage } from '../../_lib/createDocumentPage'

const eventPage = createDocumentPage({
  collection: 'events',
  render: (event) => (
    <article className="pt-16 pb-16">
      <div className="container">
        <RichText className="max-w-[48rem] mx-auto" data={event.content} enableGutter={false} />
      </div>
    </article>
  ),
})

export const generateStaticParams = eventPage.generateStaticParams
export const generateMetadata = eventPage.generateMetadata
export default eventPage.Page
```

Archive page, `src/app/(frontend)/events/page.tsx`: copy [`blogs/page.tsx`](../src/app/(frontend)/blogs/page.tsx). The sitemap lists `/events` automatically, so the archive route must exist.

### Step 6: optional integrations

Add the slug only where the post type should take part:

| Feature | File | Change |
| --- | --- | --- |
| Internal links in nav and buttons | [`src/fields/link.ts`](../src/fields/link.ts), [`src/components/Link/index.tsx`](../src/components/Link/index.tsx) | Add to `relationTo` in both |
| Internal links in rich text | [`src/fields/defaultLexical.ts`](../src/fields/defaultLexical.ts) | Add to `enabledCollections` |
| Site search | [`src/plugins/index.ts`](../src/plugins/index.ts) | Add to `searchPlugin` `collections` |
| Redirects from admin | [`src/plugins/index.ts`](../src/plugins/index.ts) | Add to `redirectsPlugin` `collections` |
| SEO preview URL | [`src/plugins/index.ts`](../src/plugins/index.ts) | Extend `generateURL`, which currently maps only `blogs` and `pages` |

### Step 7: types and migration

```bash
bun run generate:types
bunx tsc --noEmit
bun run payload migrate:create add_events
```

Review the generated SQL in `src/migrations/` before committing. Do not run `bun run payload migrate` against a shared database without the user's approval.

### Post type checklist

- [ ] Post type questions from `ASKING.md` asked and answered
- [ ] `src/collections/<Name>/index.ts` copied from Blogs
- [ ] `src/collections/<Name>/hooks/revalidate<Name>.ts`
- [ ] Registered in `payload.config.ts`
- [ ] Slug added to `documentCollections`
- [ ] Title added to `collectionTitles`; slug added to `sitemapSeoCollections` if it has SEO fields
- [ ] `src/app/(frontend)/<slug>/[slug]/page.tsx` using `createDocumentPage`
- [ ] `src/app/(frontend)/<slug>/page.tsx` archive
- [ ] Optional integrations from Step 6 decided
- [ ] `generate:types`, `tsc --noEmit` and `migrate:create` done

---

## 3. Do not

- Do not start coding a new section, block or post type before the user has answered the questions in `ASKING.md`.
- Do not use colors, fonts or sizes that are not in `brand/`.
- Do not register blocks in `payload.config.ts`.
- Do not hand-write document URLs. Use `getDocumentPath` / `getDocumentURL` from `src/utilities/getDocumentURL.ts`.
- Do not write a detail route from scratch. Use `createDocumentPage`.
- Do not rename a block `slug` or a collection `slug` without a data migration; stored content references them.
- Do not put secrets in publicly readable globals without field-level `access` (see the Integrations tab in `src/Settings/config.ts`).
