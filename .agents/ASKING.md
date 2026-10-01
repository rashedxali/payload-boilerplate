# Ask before you build

This applies to every AI agent working in this repo. **Before writing or editing any code for a new section, block, post type or content field, ask the user the questions below and wait for the answers.**

A screenshot shows how something looks. It does not show where the data comes from, what editors can change, or how it behaves with more or fewer items. Those decisions define the schema, and a wrong guess means rebuilding the block and migrating content.

## How to ask

1. Read the request and any screenshot, then check what already exists: blocks in `src/blocks/`, post types in `src/collections/`, shared helpers in `src/blocks/shared/`.
2. Work out which questions from the lists below are still open. Skip a question only when the user's message or the screenshot already answers it without doubt.
3. Ask every open question **in one message**, not one at a time.
4. Give options for each question and mark the one you recommend, with a one-line reason.
5. Do not write code until the user has answered. If the user says "you decide", use your recommended options and say which ones you used.
6. After the answers, restate the decided data model in three to five lines, then build it following [`README.md`](README.md).

When the request is a small, unambiguous change (fix a typo, change a spacing value, rename a label), no questions are needed.

## Brand check

Before any UI work, read [`brand/about.md`](../brand/about.md), [`brand/colors.md`](../brand/colors.md) and [`brand/fonts.md`](../brand/fonts.md).

- If `about.md` still contains `Status: TEMPLATE`, ask the user for the brand details, or for permission to continue with neutral placeholder copy.
- If the design needs a color, font or size that is not in `brand/`, ask before adding it. Do not invent one.

## Questions for a new section or block

### Data source (always ask when the section repeats items)

For each repeated element (cards, logos, people, testimonials, FAQs, steps):

- Does this come from an **existing post type** (for example `blogs`, `categories`)?
- Does it need a **new post type**, because the items have their own pages, are reused across the site, or are managed as a list?
- Or does the editor **type the items by hand** in this block (an `array` field)?

| Choose | When |
| --- | --- |
| Relationship to an existing post type | The items already exist as documents and must stay in sync with them |
| New post type + relationship | Items need their own URL, appear in more than one place, or will grow into a managed list |
| Manual `array` in the block | Items exist only in this section and have no page of their own |

### If the data is a relationship

- Does the editor **pick the items by hand**, or are they **automatic** (latest, by category, by date)?
- How many items are shown? Is the number fixed, or set by the editor?
- What order?
- Is there a "view all" link, and where does it go?
- What shows when there are no items?

### Content and behaviour

- Which texts are editable in the CMS, and which are fixed in code?
- Are there layout variants (for example grid and slider) the editor chooses between?
- Buttons and links: a link to an internal document, a free URL, or either?
- Images: uploaded per item, or taken from the related document?
- Does the section contain a form? If so, which form from the Forms collection?
- On mobile: stack, scroll sideways, or hide anything?

### Scope

- Can an existing block be extended, or is this a new block?
- Which pages will use it?

## Questions for a new post type

- What is the URL segment (for example `/events/<slug>`)?
- Is the body rich text, like Blogs, or a block layout, like Pages?
- Which fields does it need beyond title, slug, hero image and SEO?
- Does it need an archive page? With pagination or filters?
- Does it use categories? The shared `categories` collection or its own taxonomy?
- Should it appear in site search, in the navigation link picker, and in rich text links?
- Does it need drafts, live preview and scheduled publishing? (Default: yes, as Blogs.)

## Questions for a change to existing content

- Is the new field required? If so, what value do existing documents get?
- Does removing or renaming a field or block need existing content migrated?
- Is the change for one block or collection, or should it be a shared helper?

## Example

**User:** "Add this section to the home page." *(screenshot: a heading, a short intro, three blog cards with image, category and title, and a "View all" button)*

**Wrong:** build a block with an `items` array holding image, category and title.

**Right:** ask first.

> Before I build this, a few questions:
>
> 1. **Where do the cards come from?**
>    - a) Related to the existing **Blogs** post type *(recommended: the cards look like blog posts, so they stay in sync and link to the post)*
>    - b) Related to a different or new post type, for example Resources
>    - c) Added by hand in the block as an array
> 2. **If related to Blogs, how are posts chosen?**
>    - a) Automatically, the latest three *(recommended)*
>    - b) The editor picks them
>    - c) Latest from a category the editor picks
> 3. **Is the number of cards fixed at three, or set by the editor?**
> 4. **The heading and intro: editable in the CMS?** *(recommended: yes)*
> 5. **"View all" button: always to `/blogs`, or an editable link?**
> 6. **Will this block be used on other pages too?**
>
> `brand/about.md` is still a template, so I will use neutral placeholder copy unless you give me the brand details.

After the answers:

> Building `LatestBlogs`: `title` (heading rich text), `description` (textarea), `limit` (number, default 3), `button` (button group). Posts are queried from `blogs`, newest first, in a server component. Cards reuse `src/components/Card`.
