# Colors

The values below are the boilerplate defaults. Replace them for each project.

## Brand palette

Implemented as `--color-brand-*` in the `@theme` block of [`src/app/(frontend)/globals.css`](../src/app/(frontend)/globals.css). Each token is available as a Tailwind color, for example `bg-brand-primary`, `text-brand-primary`, `border-brand-primary`.

| Token | Hex | Tailwind name | Use for |
| --- | --- | --- | --- |
| Primary | `#1158e5` | `brand-primary` | Buttons, links, hover states, highlighted labels, colored section backgrounds |
| Primary light | `#f0f6ff` | `brand-primary-light` | Tinted backgrounds, outline button hover, table headers |
| Gray | `#f2f2f2` | `brand-gray` | Alternate section backgrounds, quiet cards |
| Gray dark | `#4d4d4d` | `brand-gray-dark` | Secondary text on light backgrounds |
| Black | `#000000` | `brand-black` | Headings and body text |
| White | `#ffffff` | `brand-white` | Page background, text on primary or dark backgrounds |

## Text colors

| Situation | Class |
| --- | --- |
| Body text on a light background | default (`rgb(0 0 0 / 0.8)` set on `body`) |
| Secondary text on a light background | `text-black/70` |
| Meta text, captions | `text-black/60` |
| Text on a primary or dark background | `text-white` |
| Secondary text on a primary or dark background | `text-white/80` or `text-white/70` |
| Borders on a light background | `border-black/10` |

## Section backgrounds

Sections alternate between three backgrounds. Pass the class to `<Section className="...">`.

| Background | Class | Text |
| --- | --- | --- |
| White (default) | none | default |
| Gray | `bg-brand-gray` | default |
| Primary | `bg-brand-primary text-white` | white |

## Buttons

Use `ButtonLink` from `src/blocks/shared/ui.tsx`. Do not restyle buttons per block.

| Variant | Class | Look |
| --- | --- | --- |
| Primary | `btn-primary` | Primary fill, white text |
| Outline | `btn-outline` | Primary border and text, primary-light on hover |

On a primary background, use a white button: `bg-white text-brand-primary`.

## UI tokens

Form controls, cards and the admin bar use the neutral tokens defined under `:root` in `globals.css` (`background`, `foreground`, `border`, `muted`, `card`, `success`, `warning`, `error`, and their dark theme values). Use them through Tailwind (`bg-background`, `border-border`, `text-muted-foreground`). They are not brand colors; leave them as they are unless the project needs a different neutral scale.

## Rules

- No raw hex values and no arbitrary Tailwind colors (`text-[#123456]`, `bg-blue-600`) in components. Use a token.
- Status colors in forms: `text-red-300` / `text-green-300` on dark backgrounds are the only exceptions in use.
- Need a color that is not here? Ask first. If approved, add it to this file and to `globals.css` together.

## Changing a color

1. Edit the hex in the table above.
2. Edit the matching `--color-brand-*` line in `globals.css`.

Renaming a token means updating every class that uses it; prefer changing values over names.
