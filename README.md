# Developer Guide

This repo is a **Next.js + Payload CMS 3** website boilerplate. Content is managed in the admin panel; the frontend is built from collections, layout blocks, globals, and forms.

AI agents: start at [`AGENTS.md`](AGENTS.md). It requires asking the user before building ([`.agents/ASKING.md`](.agents/ASKING.md)), reading the brand ([`brand/`](brand/)) and following the project patterns ([`.agents/README.md`](.agents/README.md)).

---

## Start a new project from this boilerplate

Not a developer? Follow [`GETTING_STARTED.md`](GETTING_STARTED.md): a step-by-step guide covering the tools, the Neon database, Resend, reCAPTCHA and the first login.

With an AI agent: open the repo and say **"get started"**. The agent follows [`.agents/GETTING_STARTED.md`](.agents/GETTING_STARTED.md): it replaces the git remote, applies your brand to the global styles, checks `.env`, seeds the admin user and tells you how to run the project.

By hand:

1. `cp .env.example .env` and fill in the required variables (see [Setup](#setup)).
2. `bun install`
3. `bun run payload migrate` — creates the database schema on a new, empty database.
4. `bun run seed` — creates the admin user from `ADMIN_DEFAULT_USER_*`.
5. `bun run dev` — starts the site.
6. Set up the brand in [`brand/`](brand/):
   - fill in [`brand/about.md`](brand/about.md) and remove its `Status: TEMPLATE` line;
   - adjust [`brand/colors.md`](brand/colors.md) and the matching `--color-brand-*` tokens in `src/app/(frontend)/globals.css`;
   - adjust [`brand/fonts.md`](brand/fonts.md) and the font import in `src/app/(frontend)/layout.tsx`.
7. In the admin panel, open **Settings** and set the site name, logo, favicon and default SEO values.
8. Optional: add Resend and reCAPTCHA keys under **Settings → Integrations**.

From here, ask the agent for sections and post types. It will ask how the data should be modelled before it writes code.

---

## Quick start

### Requirements

- Node.js `^18.20.2` or `>=20.9.0`
- [Bun](https://bun.sh) `>=1.2`
- PostgreSQL

### Setup

1. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

2. Set these in `.env`:

   | Variable | Purpose |
   | --- | --- |
   | `DATABASE_URL` | **Postgres** connection string (this project uses `@payloadcms/db-postgres`) |
   | `PAYLOAD_SECRET` | JWT encryption secret |
   | `NEXT_PUBLIC_SERVER_URL` | Public site URL, no trailing slash (e.g. `http://localhost:3000`) |
   | `PREVIEW_SECRET` | Draft/preview auth |
   | `CRON_SECRET` | Scheduled publish jobs |
   | `ADMIN_DEFAULT_USER_EMAIL` | Email of the admin user created by `bun run seed` |
   | `ADMIN_DEFAULT_USER_PASSWORD` | Password of the admin user created by `bun run seed` |

   Optional integrations are configured in the admin panel under **Settings → Integrations**, with env variables as a fallback (see `.env.example`):

   - **Resend email** (`RESEND_API_KEY`, `EMAIL_FROM_ADDRESS`, `EMAIL_FROM_NAME`): without an API key and a from address no email is sent; form submissions and newsletter subscribers are still recorded in the CMS.
   - **Invisible reCAPTCHA v2** (`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`): disabled unless both keys are set; forms work normally without it.

3. Install dependencies and create the database schema:

   ```bash
   bun install
   bun run payload migrate
   ```

   `src/migrations/` holds a single baseline migration that creates every table, so this works on a new, empty database. Run it before the first `bun run dev`: in development Payload pushes the schema on startup, and a later `migrate` then fails with "already exists".

   If the database already has tables and you want to start over, use `bun run migrate:fresh` instead. It **drops every table** in the database `DATABASE_URL` points at and re-runs all migrations, so all data is lost. Check `DATABASE_URL` first.

4. Seed the admin user (optional). The database schema must exist first:

   ```bash
   bun run seed
   ```

   This creates a user from `ADMIN_DEFAULT_USER_EMAIL` / `ADMIN_DEFAULT_USER_PASSWORD`. It is safe to re-run: an existing user with that email is left untouched.

5. Start the site:

   ```bash
   bun run dev
   ```

6. Open:
   - Frontend: `http://localhost:3000`
   - Admin: `http://localhost:3000/admin` — log in with the seeded user, or create your first user on first visit

### Common commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start Next.js + Payload in development |
| `bun run build` | Production build |
| `bun run start` | Run production server |
| `bun run generate:types` | Regenerate `src/payload-types.ts` after schema changes |
| `bun run generate:importmap` | Regenerate admin import map after custom admin components change |
| `bun run payload migrate:create` | Create a DB migration (Postgres) |
| `bun run payload migrate` | Run pending migrations |
| `bun run payload migrate:status` | Show which migrations have run |
| `bun run migrate:fresh` | **Drop all tables** and re-run every migration (destroys all data) |
| `bun run seed` | Create the default admin user from `ADMIN_DEFAULT_USER_*` |
| `bun run lint` | ESLint |

---

## Repo map

```
AGENTS.md                      # Entry point for AI agents (CLAUDE.md imports it)
.agents/
├── GETTING_STARTED.md         # Setup flow an agent runs when asked to "get started"
├── ASKING.md                  # Questions an agent must ask before building
├── README.md                  # How to create blocks and post types in this repo
└── skills/                    # Payload and frontend design skills
brand/
├── about.md                   # Who the brand is, audience, voice
├── colors.md                  # Color tokens and usage rules
└── fonts.md                   # Typefaces and type scale
src/
├── payload.config.ts          # App entry: collections, globals, plugins, DB
├── payload-types.ts           # Auto-generated TypeScript types (do not edit by hand)
├── collections/               # Content types (Pages, Blogs, Media, …)
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

Render titles with [`BlockTitle`](src/blocks/shared/BlockTitle.tsx). Use [`Section`](src/blocks/shared/ui.tsx), `ButtonLink`, `MediaImage`, etc. for consistent layout.

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
  testimonialsBlock: TestimonialsBlock,
  // slug must match config.ts exactly
}
```

**Common pitfall:** if `slug` in `config.ts` does not match the key in `blockComponents`, the block appears in admin but renders nothing on the frontend.

### Where blocks are used

Collections with a `layout` field of type `blocks` use `layoutBlocks`:

| Collection | Config | Notes |
| --- | --- | --- |
| Pages | [`src/collections/Pages/index.ts`](src/collections/Pages/index.ts) | `contentMode: 'layout'` (default) or `'text'` for rich-text-only pages |

Frontend routes render layouts via `<RenderBlocks blocks={layout} />`:

- [`src/app/(frontend)/[slug]/page.tsx`](src/app/(frontend)/[slug]/page.tsx) — pages

### Blocks in this project

| Block | Demonstrates |
| --- | --- |
| `TestimonialsBlock` | `select` variant, `array` of items with uploads, button group |
| `ContactUsSection` | `relationship` to `forms`, `array` list |
| `FeaturedBlogPost` | single `relationship` to `blogs` |

### Edit an existing block

1. Change fields in `src/blocks/<Name>/config.ts`
2. Change UI in `src/blocks/<Name>/Component.tsx`
3. Run `bun run generate:types`
4. Test in admin (add block to a page layout) and on the frontend

### Add a new block

1. Create `src/blocks/MyBlock/config.ts` and `Component.tsx`
2. Import and append the config to `layoutBlocks` in [`src/blocks/layoutBlocks.ts`](src/blocks/layoutBlocks.ts)
3. Import the component and add `myBlock: MyBlockBlock` to `blockComponents` in [`src/blocks/RenderBlocks.tsx`](src/blocks/RenderBlocks.tsx)
4. Run `bun run generate:types`
5. In admin, open a Page → add **My Block** to the layout

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
| Media | `media` | `src/collections/Media.ts` | Uploads (images, files) |
| Categories | `categories` | `src/collections/Categories.ts` | Taxonomy (nested docs) |
| Newsletter Subscribers | `newsletter-subscribers` | `src/collections/NewsletterSubscribers.ts` | Emails collected by the footer newsletter form |
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

| | Pages | Blogs |
| --- | --- | --- |
| Primary content | Block `layout` array | Rich text `content` |
| Layout builder | Yes | No |
| SEO plugin fields | Yes | Yes |
| Drafts / preview | Yes | Yes |

### Add a post type

Blogs is the reference post type. The full step-by-step (config, revalidation hook, URL registry, sitemap, routes) is in [`.agents/README.md`](.agents/README.md#2-creating-a-post-type).

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
5. Run `bun run generate:types`
6. Use the new field in the frontend (page component or block)

For fields shared across many blocks, add helpers to `src/blocks/shared/fields.ts` instead of duplicating definitions.

### Remove a field

1. Delete the field from the collection `fields` array
2. Remove any frontend usage
3. Run `bun run generate:types`
4. For production Postgres, create and run a migration if the column must be dropped cleanly

### After schema changes

```bash
bun run generate:types          # Always after field/collection changes
bun run generate:importmap      # If you changed custom admin components
bun run payload migrate:create  # Production: create migration
bun run payload migrate         # Production: apply migrations
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
| Integrations | Resend email and invisible reCAPTCHA keys (env variables as fallback) |
| Custom code | Head/body HTML snippets |

Header and Footer globals define navigation via shared link fields (`src/fields/link`).

### Frontend usage

- [`src/app/(frontend)/layout.tsx`](src/app/(frontend)/layout.tsx) loads settings for maintenance mode, analytics, custom HTML, and org schema
- SEO routes under `src/app/(frontend)/(seo)/` use settings for robots, sitemap, etc.
- Globals and settings are cached with `unstable_cache` and revalidated via `afterChange` hooks

### Add or remove a Settings field

1. Edit `fields` in [`src/Settings/config.ts`](src/Settings/config.ts) (or Header/Footer config)
2. Run `bun run generate:types`
3. Read the new value in the appropriate utility or layout component
4. Add a revalidation hook if you introduce new cache tags

---

## Developer checklist

When working on this repo, use this quick reference:

1. **Schema change** → `bun run generate:types`
2. **Custom admin component** → `bun run generate:importmap`
3. **New layout block** → register in **both** `layoutBlocks.ts` and `RenderBlocks.tsx`; slug must match
4. **Block titles** → use `optionalTitle()` and `<BlockTitle />` for consistent Lexical headings
5. **Shared block fields** → extend `src/blocks/shared/fields.ts` instead of one-off copies
6. **Production DB** → create and run Payload migrations
7. **Secrets** → keep in `.env`; never commit credentials

---

## Related features

This project also includes:

- **Drafts and live preview** — Pages and Blogs support draft mode and preview URLs
- **On-demand revalidation** — collection/global hooks revalidate Next.js cache on publish
- **SEO plugin** — meta fields on Pages and Blogs; defaults from Settings
- **Redirects plugin** — manage redirects in admin
- **Search plugin** — indexes searchable collections

See [Payload docs](https://payloadcms.com/docs) and [`.agents/skills/payload/reference/`](.agents/skills/payload/reference/) for API details beyond this repo’s conventions.
