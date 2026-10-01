# Getting started

Follow this when the user asks to **get started**, **set up the project**, or **start a new project from this boilerplate**.

This repo is a boilerplate. A fresh clone still points at the boilerplate's git remote and carries its default brand. The steps below turn the clone into the user's own project.

Rules for the whole flow:

- Do the steps **in order**. Finish or explicitly skip one before starting the next.
- Where a step says **ask**, stop and wait for the user's answer.
- Never print the contents of `.env`. When checking it, report only which variable names are set or empty.
- Never push, and never run migrations or the seed against a database, without the user confirming it.
- At the end, give the summary described in [Finish](#finish).

---

## Step 1: Replace the git remote

The clone must not push to the boilerplate repository.

1. Show the current remotes:

   ```bash
   git remote -v
   ```

2. Remove the boilerplate remote:

   ```bash
   git remote remove origin
   ```

   If there is no `origin`, continue.

3. **Ask** the user for the URL of their new repository, for example `git@github.com:<owner>/<repo>.git`. Also offer "skip for now".

4. If they gave a URL, add it and confirm:

   ```bash
   git remote add origin <url>
   git remote -v
   ```

5. Do not push. Tell the user the first push is `git push -u origin main`, and leave it to them unless they ask you to run it.

If the user skips, the project stays without a remote. Say so in the final summary.

## Step 2: Brand

The brand files in [`brand/`](../brand/) are the source of truth for the look of the site. The global styles must match them.

1. **Ask** the user: "Is the `brand/` folder updated for this project (`about.md`, `colors.md`, `fonts.md`)?"

2. Check for yourself as well:
   - `brand/about.md` still contains `Status: TEMPLATE` → not filled in.
   - `brand/colors.md` and `brand/fonts.md` still say "boilerplate defaults" with primary `#1158e5` and DM Sans → probably not updated.

   If the user says "updated" but the files still look like the defaults, point out what you found and ask again.

### If the brand is updated

Apply it to the global styles. Change **values**, not token names.

1. **Colors.** For each row in the "Brand palette" table of `brand/colors.md`, set the matching `--color-brand-*` value in the `@theme` block of [`src/app/(frontend)/globals.css`](../src/app/(frontend)/globals.css).

   | `colors.md` row | Token in `globals.css` |
   | --- | --- |
   | Primary | `--color-brand-primary` |
   | Primary light | `--color-brand-primary-light` |
   | Gray | `--color-brand-gray` |
   | Gray dark | `--color-brand-gray-dark` |
   | Black | `--color-brand-black` |
   | White | `--color-brand-white` |

   If `colors.md` lists a color that has no token yet, add a `--color-brand-<name>` token for it. If it changes body text color, update the `color` on `body` in the base layer too.

2. **Fonts.** From `brand/fonts.md`:
   - replace the font import and its options (family, weights, `variable`) in [`src/app/(frontend)/layout.tsx`](../src/app/(frontend)/layout.tsx), and the class on `<html>` that applies the variable;
   - point `--font-sans` / `--font-mono` in the `@theme` block of `globals.css` at the new variable;
   - load only the weights listed in `fonts.md`.

3. **Type scale.** If `fonts.md` changes sizes, weights or line heights, update `h1`, `h2`, `h3`, `p` in the base layer and `.section-title` / `.hero-title` in the components layer of `globals.css`.

4. **Buttons and sections.** If `colors.md` changes the button or section rules, update `.btn-primary`, `.btn-outline` and `.section` in `globals.css`.

5. Check nothing still uses a hard-coded value:

   ```bash
   grep -rnE "#[0-9a-fA-F]{6}\b" src --include='*.tsx'
   bunx tsc --noEmit
   ```

6. Tell the user which tokens and fonts changed, old value → new value.

### If the brand is not updated

1. **Ask** the user to update the three files, and tell them what each needs:
   - `brand/about.md`: fill in every section and delete the `Status: TEMPLATE` line;
   - `brand/colors.md`: replace the hex values in the palette table;
   - `brand/fonts.md`: replace the families, weights and scale.

2. Offer two ways forward:
   - they edit the files and tell you when done → then run "If the brand is updated" above;
   - they give you the details in chat (company, audience, tone, colors, fonts) → you write them into the three files, show the result, and after they confirm, apply them to the global styles.

3. If they want to continue with the defaults for now, leave the styles as they are and note in the final summary that the brand is still the boilerplate default.

Do not invent a brand. No colors, fonts or copy that the user did not provide.

## Step 3: Environment variables

1. If `.env` does not exist, create it from the example:

   ```bash
   cp .env.example .env
   ```

2. **Ask** the user to fill in `.env`. They edit the file themselves; do not ask them to paste secrets into the chat.

   Required:

   | Variable | Value |
   | --- | --- |
   | `DATABASE_URL` | Postgres connection string for **this** project's database, not the boilerplate's |
   | `PAYLOAD_SECRET` | Long random string, for example from `openssl rand -hex 32` |
   | `NEXT_PUBLIC_SERVER_URL` | `http://localhost:3000` for local development, no trailing slash |
   | `PREVIEW_SECRET` | Random string |
   | `CRON_SECRET` | Random string |
   | `ADMIN_DEFAULT_USER_EMAIL` | Email for the first admin user |
   | `ADMIN_DEFAULT_USER_PASSWORD` | Password for the first admin user |

   Optional, and can be set later in the admin panel under **Settings → Integrations** instead:

   | Variable | Effect when empty |
   | --- | --- |
   | `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS`, `EMAIL_FROM_NAME` | No email is sent; submissions are still saved in the CMS |
   | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY` | reCAPTCHA is off; forms work normally |

   You may offer to generate the three random secrets and write them into `.env` yourself.

3. When the user says it is done, verify that every required variable has a value, without showing the values:

   ```bash
   for v in DATABASE_URL PAYLOAD_SECRET NEXT_PUBLIC_SERVER_URL PREVIEW_SECRET CRON_SECRET ADMIN_DEFAULT_USER_EMAIL ADMIN_DEFAULT_USER_PASSWORD; do
     grep -qE "^$v=.+" .env && echo "$v: set" || echo "$v: MISSING"
   done
   ```

   If any are missing, tell the user which ones and wait. Do not continue to Step 4 with missing required variables.

4. Confirm with the user that `DATABASE_URL` points at a new, empty database for this project. The next step writes to it.

## Step 4: Install, create the schema, seed the admin user

1. Install dependencies:

   ```bash
   bun install
   ```

2. Create the database schema. On a new, empty database, run the migrations:

   ```bash
   bun run payload migrate
   ```

   If the database is not empty, or the command reports conflicts, stop and tell the user what it said. Do not drop or reset anything on your own.

3. Seed the default admin user:

   ```bash
   bun run seed
   ```

   Expected output is one of:
   - `Admin user <email> created.`
   - `Admin user <email> already exists; skipping.`

   The seed never changes an existing user's password. If it fails because `ADMIN_DEFAULT_USER_*` is missing, go back to Step 3. If it fails because tables are missing, the schema step did not complete.

## Step 5: Run the project

Give the user these instructions, and start the dev server for them if they ask.

```bash
bun run dev
```

- Site: `http://localhost:3000`
- Admin: `http://localhost:3000/admin` — log in with `ADMIN_DEFAULT_USER_EMAIL` / `ADMIN_DEFAULT_USER_PASSWORD`

First things to do in the admin panel:

1. **Settings → General:** site name, logo, favicon, contact details.
2. **Settings → SEO:** default title suffix, meta description, organization name and URL.
3. **Settings → Integrations:** Resend and reCAPTCHA keys, if wanted.
4. **Pages:** create a page with the slug `home`. It is served at `/`.
5. **Header** and **Footer:** add navigation links.

Other commands:

| Command | Purpose |
| --- | --- |
| `bun run build` then `bun run start` | Production build and server |
| `bun run generate:types` | After any schema change |
| `bun run payload migrate:create <name>` | Create a migration after a schema change |
| `bun run payload migrate` | Apply pending migrations |

## Finish

End with a short summary:

- git remote: the new URL, or "none set";
- brand: applied (list changed tokens and fonts), or "still boilerplate defaults";
- `.env`: all required variables set, and which optional integrations are configured (names only);
- admin user: created, or already existed;
- how to run: `bun run dev`, and the two URLs;
- anything skipped or failed, with the exact error.

Then point to what comes next: for new sections and post types the agent asks first ([`ASKING.md`](ASKING.md)) and builds using the project patterns ([`README.md`](README.md)).
