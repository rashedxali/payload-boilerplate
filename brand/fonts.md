# Fonts

The values below are the boilerplate defaults. Replace them for each project.

## Families

| Role | Family | Weights | Tailwind | Loaded in |
| --- | --- | --- | --- | --- |
| Everything: headings, body, UI | DM Sans | 400, 500, 700 | `font-sans` (default) | `next/font/google` in [`src/app/(frontend)/layout.tsx`](../src/app/(frontend)/layout.tsx) |
| Code and tabular figures only | Geist Mono | variable | `font-mono` | `geist/font/mono` in `layout.tsx` |

There is one typeface for both headings and body. Hierarchy comes from size and weight, not from a second family.

## Type scale

Defined in the base layer of [`src/app/(frontend)/globals.css`](../src/app/(frontend)/globals.css). Write the semantic tag and let the base styles apply.

| Element | Desktop | Mobile (`max-sm`) | Weight | Line height |
| --- | --- | --- | --- | --- |
| `h1` | `text-5xl` (3rem) | `text-4xl` | 500 | 1.4 |
| `h2` | `text-4xl` (2.25rem) | 2rem | 400 | 1.4 |
| `h3` | `text-2xl` (1.5rem) | same | 400 | 1.4 |
| Body, `p` | `text-base` (1rem) | same | 400 | relaxed (1.625) |
| Small, meta | `text-sm` | same | 400 or 500 | default |

All headings use `tracking-tight`. Paragraphs carry `mb-5`.

## Title classes

Block titles come from a rich text field where the editor picks the heading level, so size is set by a wrapper class rather than by the tag.

| Class | Use for | Result |
| --- | --- | --- |
| `section-title` | The title of a block | `text-4xl`, weight 400, `mb-6` |
| `hero-title` | The first, largest title on a page | `text-5xl`, weight 500, no margin |

```tsx
<BlockTitle className="section-title" data={title} />
```

## Rules

- Weights in use are 400, 500 and 700 only. Other weights are not loaded.
- Emphasis: `font-medium` (500). Reserve 700 for rich text bold.
- No uppercase label styling and no letter-spacing changes other than `tracking-tight` on headings.
- Keep text lines under about 80 characters: constrain long copy with `max-w-*`.
- Do not add a font family or a new size outside the scale without asking.

## Changing a font

1. Replace the `next/font` import and options in `layout.tsx` and keep the CSS variable name, or update it.
2. Update `--font-sans` / `--font-mono` in the `@theme` block of `globals.css` if the variable name changed.
3. Update the tables above, including the weights that are loaded.
