# Developer Guide

This repo is a **Next.js + Payload CMS 3** website. Content is managed in the admin panel; the frontend is built from collections, layout blocks, globals, and forms.

For deeper Payload API reference, see [`AGENTS.md`](AGENTS.md) and [`.agents/skills/payload/`](.agents/skills/payload/).

---

## Quick start

### Requirements

- Node.js `^18.20.2` or `>=20.9.0`
- pnpm `^9`–`^11`
- PostgreSQL

### Setup

1. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

2. Set these in `.env`:

   | Variable | Purpose |
   | --- | --- |
   | `DATABASE_URL` | **Postgres** connection string (this project uses `@payloadcms/db-postgres`, not Mongo) |
   | `PAYLOAD_SECRET` | JWT encryption secret |
   | `NEXT_PUBLIC_SERVER_URL` | Public site URL, no trailing slash (e.g. `http://localhost:3000`) |
   | `PREVIEW_SECRET` | Draft/preview auth |
   | `CRON_SECRET` | Scheduled publish jobs |

   Optional: `RESEND_API_KEY`, `EMAIL_FROM_*`, Mailchimp, reCAPTCHA keys (see `.env.example`).

3. Install and run:

   ```bash
   pnpm install
   pnpm dev
   ```

4. Open:
   - Frontend: `http://localhost:3000`
   - Admin: `http://localhost:3000/admin` — create your first user on first visit

### Common commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start Next.js + Payload in development |
| `pnpm build` | Production build |
| `pnpm start` | Run production server |
| `pnpm generate:types` | Regenerate `src/payload-types.ts` after schema changes |
| `pnpm generate:importmap` | Regenerate admin import map after custom admin components change |
| `pnpm payload migrate:create` | Create a DB migration (Postgres) |
| `pnpm payload migrate` | Run pending migrations |
| `pnpm lint` | ESLint |

---

## Repo map

```
src/
├── payload.config.ts          # App entry: collections, globals, plugins, DB
├── payload-types.ts           # Auto-generated TypeScript types (do not edit by hand)
├── collections/               # Content types (Pages, Blogs, Services, …)
├── blocks/                    # Layout builder blocks (admin schema + frontend UI)
│   ├── layoutBlocks.ts        # Admin registry of all layout blocks
│   ├── RenderBlocks.tsx       # Frontend blockType → React component map
│   └── shared/                # Reusable block fields and UI helpers
├── Header/ Footer/ Settings/  # Globals (nav + site-wide settings)
├── components/Form/           # Frontend form renderer
├── plugins/index.ts           # Form builder, SEO, redirects, search, nested docs
├── fields/                    # Shared field configs (Lexical, SEO, links)
├── hooks/                     # Collection/global hooks (revalidation, normalization)
├── utilities/                 # Helpers (getSettings, getGlobals, URLs, …)
└── app/
    ├── (frontend)/            # Public website routes
    └── (payload)/             # Payload admin + API routes
```

---

## Blocks

A **block** is a reusable page section. Each block has:

1. **Admin schema** — what editors configure in Payload
2. **Frontend component** — how it renders on the site

### Folder structure

Every layout block lives under `src/blocks/<BlockName>/`:

```
src/blocks/ContactUsSection/
├── config.ts       # Payload Block definition (fields, slug, labels)
└── Component.tsx   # React component rendered on the frontend
```

### Config (`config.ts`)

Export a Payload `Block` object. Key properties:

| Property | Purpose |
| --- | --- |
| `slug` | Stable ID stored as `blockType` in the DB (e.g. `contactUsSection`) |
| `interfaceName` | Generated TypeScript type name (e.g. `ContactUsSectionBlock`) |
| `labels` | Admin UI display names |
| `fields` | Block fields (text, richText, upload, relationship, arrays, …) |

Example — [`src/blocks/ContactUsSection/config.ts`](src/blocks/ContactUsSection/config.ts):

```ts
export const ContactUsSection: Block = {
  slug: 'contactUsSection',
  interfaceName: 'ContactUsSectionBlock',
  labels: { singular: 'Contact Us Section', plural: 'Contact Us Sections' },
  fields: [
    optionalTitle('title', 'Title'),
    optionalText('description', 'Description', true),
    { name: 'listItems', type: 'array', fields: [...] },
    { name: 'form', type: 'relationship', relationTo: 'forms' },
  ],
}
```

Prefer shared field helpers from [`src/blocks/shared/fields.ts`](src/blocks/shared/fields.ts):

- `optionalTitle()` — Lexical heading field with normalization
- `optionalText()` — text or textarea
- `optionalUpload()` — media upload
- `buttonGroup()` — CTA text + URL + target

Render titles with [`BlockTitle`](src/blocks/shared/BlockTitle.tsx). Use [`Section`](src/blocks/shared/ui.tsx), `NHButton`, `MediaImage`, etc. for consistent layout.

### Frontend (`Component.tsx`)

- Type props from `@/payload-types` (e.g. `ContactUsSectionBlock`)
- Export a named component (e.g. `ContactUsSectionBlock`)
- Accept optional `disableInnerContainer` (passed by `RenderBlocks`)
- Use `'use client'` when the block needs interactivity (forms, tabs, etc.)

Example — [`src/blocks/ContactUsSection/Component.tsx`](src/blocks/ContactUsSection/Component.tsx) renders a title, list, and `<PayloadForm form={formDoc} />`.

### Registration (both steps required)

Blocks are **not** registered in `payload.config.ts`. You register them in two places:

1. **Admin** — add the block config to [`src/blocks/layoutBlocks.ts`](src/blocks/layoutBlocks.ts)
2. **Frontend** — map `slug` → component in [`src/blocks/RenderBlocks.tsx`](src/blocks/RenderBlocks.tsx)

```ts
// RenderBlocks.tsx
const blockComponents = {
  contactUsSection: ContactUsSectionBlock,
  homeHero: HomeHeroBlock,
  // slug must match config.ts exactly
}
```

**Common pitfall:** if `slug` in `config.ts` does not match the key in `blockComponents`, the block appears in admin but renders nothing on the frontend.

### Where blocks are used

Collections with a `layout` field of type `blocks` use `layoutBlocks`:

| Collection | Config | Notes |
| --- | --- | --- |
| Pages | [`src/collections/Pages/index.ts`](src/collections/Pages/index.ts) | `contentMode: 'layout'` (default) or `'text'` for rich-text-only pages |
| Services | [`src/collections/Services/index.ts`](src/collections/Services/index.ts) | Layout required |
| Our Work | [`src/collections/OurWork/index.ts`](src/collections/OurWork/index.ts) | Layout required |

Frontend routes render layouts via `<RenderBlocks blocks={layout} />`:

- [`src/app/(frontend)/[slug]/page.tsx`](src/app/(frontend)/[slug]/page.tsx) — pages
- [`src/app/(frontend)/services/[slug]/page.tsx`](src/app/(frontend)/services/[slug]/page.tsx) — services
- [`src/app/(frontend)/our-work/[slug]/page.tsx`](src/app/(frontend)/our-work/[slug]/page.tsx) — case studies

### Edit an existing block

1. Change fields in `src/blocks/<Name>/config.ts`
2. Change UI in `src/blocks/<Name>/Component.tsx`
3. Run `pnpm generate:types`
4. Test in admin (add block to a page layout) and on the frontend

### Add a new block

1. Create `src/blocks/MyBlock/config.ts` and `Component.tsx`
2. Import and append the config to `layoutBlocks` in [`src/blocks/layoutBlocks.ts`](src/blocks/layoutBlocks.ts)
3. Import the component and add `myBlock: MyBlockBlock` to `blockComponents` in [`src/blocks/RenderBlocks.tsx`](src/blocks/RenderBlocks.tsx)
4. Run `pnpm generate:types`
5. In admin, open a Page / Service / Our Work doc → add **My Block** to the layout

### Rename or remove a block

- **Rename:** update `slug` in config **and** the key in `RenderBlocks.tsx`. Existing content may need a migration.
- **Remove:** delete from `layoutBlocks.ts` and `RenderBlocks.tsx`. Existing page data referencing that block type will need cleanup.

---

## Collections

A **collection** is a content type stored in the database and edited in the admin sidebar.

### Collections in this project

Registered in [`src/payload.config.ts`](src/payload.config.ts):

| Collection | Slug | Config path | Purpose |
| --- | --- | --- | --- |
| Pages | `pages` | `src/collections/Pages/` | Marketing / static pages (blocks or text mode) |
| Blogs | `blogs` | `src/collections/Blogs/` | Blog posts (rich text content) |
| Services | `services` | `src/collections/Services/` | Service detail pages (block layout) |
| Our Work | `our-work` | `src/collections/OurWork/` | Case studies (block layout) |
| Guides | `guides` | `src/collections/Guides/` | Guides |
| Media | `media` | `src/collections/Media.ts` | Uploads (images, files) |
| Categories | `categories` | `src/collections/Categories.ts` | Taxonomy (nested docs) |
| Users | `users` | `src/collections/Users/` | Admin authentication |

**Plugin collections** (from [`src/plugins/index.ts`](src/plugins/index.ts)):

| Collection | Purpose |
| --- | --- |
| Forms | Form definitions (fields, confirmation, redirect) |
| Form Submissions | Stored submissions from the frontend |
| Redirects | URL redirects |
| Search | Search index |

### Config pattern

Each collection exports a `CollectionConfig` with:

- `slug` — API/admin identifier
- `fields` — schema (tabs, sidebar, conditions)
- `access` — who can read/write (see `src/access/`)
- `admin` — columns, preview URLs, live preview
- `hooks` — revalidation, populate dates, normalization
- `versions` — drafts and scheduled publish (where enabled)

Example — Pages ([`src/collections/Pages/index.ts`](src/collections/Pages/index.ts)):

- **Content tab:** `contentMode` select → `layout` (blocks) or `body` (richText)
- **SEO tab:** meta title, description, extended SEO fields
- **Sidebar:** `publishedAt`, `slug`
- **Hooks:** revalidate Next.js cache on publish; normalize layout block titles

### Pages vs Blogs content model

| | Pages / Services / Our Work | Blogs |
| --- | --- | --- |
| Primary content | Block `layout` array | Rich text `content` |
| Layout builder | Yes | No |
| SEO plugin fields | Yes | Yes |
| Drafts / preview | Yes | Yes |

### Add a field

1. Open the collection config (e.g. `src/collections/Pages/index.ts`)
2. Add a field object to the `fields` array:

   ```ts
   {
     name: 'subtitle',
     type: 'text',
     label: 'Subtitle',
   }
   ```

   Common types: `text`, `textarea`, `richText`, `upload`, `relationship`, `select`, `array`, `group`, `blocks`, `tabs`.

3. Use `admin: { position: 'sidebar' }` for sidebar fields
4. Use `admin: { condition: ... }` for conditional visibility
5. Run `pnpm generate:types`
6. Use the new field in the frontend (page component or block)

For fields shared across many blocks, add helpers to `src/blocks/shared/fields.ts` instead of duplicating definitions.

### Remove a field

1. Delete the field from the collection `fields` array
2. Remove any frontend usage
3. Run `pnpm generate:types`
4. For production Postgres, create and run a migration if the column must be dropped cleanly

### After schema changes

```bash
pnpm generate:types          # Always after field/collection changes
pnpm generate:importmap      # If you changed custom admin components
pnpm payload migrate:create  # Production: create migration
pnpm payload migrate         # Production: apply migrations
```

In local dev, Payload can push schema changes to Postgres automatically; use migrations before deploying.

---

## Forms

Forms have two layers: **admin configuration** and **frontend rendering**.

### Admin — Form Builder plugin

Configured in [`src/plugins/index.ts`](src/plugins/index.ts) via `@payloadcms/plugin-form-builder`:

- Creates **Forms** and **Form Submissions** collections
- Payment fields are disabled
- Form redirect can target **Pages**
- Confirmation message uses the default Lexical editor

**Editor workflow:**

1. Admin → **Forms** → create or edit a form
2. Add field blocks (text, email, select, checkbox, etc.) and set labels/required/options
3. Configure submit button label, confirmation message, and optional redirect
4. Submissions appear under **Form Submissions**

### Frontend — `PayloadForm`

[`src/components/Form/index.tsx`](src/components/Form/index.tsx) renders a form with `react-hook-form` and POSTs to `/api/form-submissions`.

Field UI is mapped in [`src/components/Form/fields/index.ts`](src/components/Form/fields/index.ts):

| Form field type | Component |
| --- | --- |
| `text`, `country`, `state` | `TextField` |
| `textarea` | `TextareaField` |
| `email` | `EmailField` |
| `number` | `NumberField` |
| `checkbox` | `CheckboxField` |
| `select`, `radio` | `SelectField` |
| `message` | `MessageField` (display-only) |

Supporting files:

- `src/components/Form/buildInitialFormState.ts` — default values
- `src/components/Form/shared.tsx` — `FieldWrapper`, `FieldError`
- `src/components/Form/fields/*.tsx` — individual field components

### Wiring a form into a page

The **Contact Us Section** block connects forms to the layout builder:

1. Block config ([`src/blocks/ContactUsSection/config.ts`](src/blocks/ContactUsSection/config.ts)) has a `form` relationship → `forms`
2. Block component ([`src/blocks/ContactUsSection/Component.tsx`](src/blocks/ContactUsSection/Component.tsx)) renders `<PayloadForm form={formDoc} />`
3. In admin: add a Contact Us Section block to a page layout → select a form

To use forms elsewhere, add a `relationship` to `forms` in your block/collection and render `<PayloadForm />` in the component.

### Add a new form field type

1. Create `src/components/Form/fields/MyField.tsx`
2. Register it in `formFieldComponents` in [`src/components/Form/fields/index.ts`](src/components/Form/fields/index.ts)
3. Ensure the Form Builder plugin exposes that field type (or extend the plugin config in `src/plugins/index.ts`)

---

## Settings and globals

**Globals** are singleton documents — one row per site, not a list of entries like collections.

Registered in [`src/payload.config.ts`](src/payload.config.ts):

| Global | Config | Frontend |
| --- | --- | --- |
| **Settings** | [`src/Settings/config.ts`](src/Settings/config.ts) | [`src/utilities/getSettings.ts`](src/utilities/getSettings.ts) |
| **Header** | [`src/Header/config.ts`](src/Header/config.ts) | [`src/Header/Component.tsx`](src/Header/Component.tsx) via `getCachedGlobal('header')` |
| **Footer** | [`src/Footer/config.ts`](src/Footer/config.ts) | [`src/Footer/Component.tsx`](src/Footer/Component.tsx) via `getCachedGlobal('footer')` |

### Settings tabs

Edit under **Admin → Configuration → Settings**:

| Tab | Contents |
| --- | --- |
| General | Site name, tagline, logo, favicon, contact info, social links |
| SEO | Default meta, robots.txt / llms.txt, sitemap toggle |
| Analytics | GTM, GA4, Meta Pixel, Clarity |
| Maintenance | Maintenance mode message |
| Custom code | Head/body HTML snippets |

Header and Footer globals define navigation via shared link fields (`src/fields/link`).

### Frontend usage

- [`src/app/(frontend)/layout.tsx`](src/app/(frontend)/layout.tsx) loads settings for maintenance mode, analytics, custom HTML, and org schema
- SEO routes under `src/app/(frontend)/(seo)/` use settings for robots, sitemap, etc.
- Globals and settings are cached with `unstable_cache` and revalidated via `afterChange` hooks

### Add or remove a Settings field

1. Edit `fields` in [`src/Settings/config.ts`](src/Settings/config.ts) (or Header/Footer config)
2. Run `pnpm generate:types`
3. Read the new value in the appropriate utility or layout component
4. Add a revalidation hook if you introduce new cache tags

---

## Developer checklist

When working on this repo, use this quick reference:

1. **Schema change** → `pnpm generate:types`
2. **Custom admin component** → `pnpm generate:importmap`
3. **New layout block** → register in **both** `layoutBlocks.ts` and `RenderBlocks.tsx`; slug must match
4. **Block titles** → use `optionalTitle()` and `<BlockTitle />` for consistent Lexical headings
5. **Shared block fields** → extend `src/blocks/shared/fields.ts` instead of one-off copies
6. **Production DB** → create and run Payload migrations
7. **Secrets** → keep in `.env`; never commit credentials

---

## Related features

This project also includes:

- **Drafts and live preview** — Pages, Blogs, Services, Our Work support draft mode and preview URLs
- **On-demand revalidation** — collection/global hooks revalidate Next.js cache on publish
- **SEO plugin** — meta fields on Pages and Blogs; defaults from Settings
- **Redirects plugin** — manage redirects in admin
- **Search plugin** — indexes searchable collections

See [Payload docs](https://payloadcms.com/docs) and [`.agents/skills/payload/reference/`](.agents/skills/payload/reference/) for API details beyond this repo’s conventions.
