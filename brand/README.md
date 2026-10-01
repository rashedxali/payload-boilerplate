# Brand

This folder is the source of truth for how the site looks and sounds. Anyone building UI here, human or AI agent, reads all three files before writing a component.

| File | Answers |
| --- | --- |
| [`about.md`](about.md) | Who the brand is, who it talks to, and in what voice |
| [`colors.md`](colors.md) | Which colors exist and when to use each |
| [`fonts.md`](fonts.md) | Which typefaces and sizes exist and when to use each |

## Rules

- Use only the colors and fonts defined here. If a design needs something that is not listed, ask the project owner before adding it.
- These files describe the tokens; the code that implements them lives in [`src/app/(frontend)/globals.css`](../src/app/(frontend)/globals.css) and [`src/app/(frontend)/layout.tsx`](../src/app/(frontend)/layout.tsx). When you change one side, change the other in the same commit.
- Where this folder and a general design guideline (for example the `frontend-design` skill) disagree, this folder wins.

## Starting a new project

1. Fill in `about.md` and remove its `Status: TEMPLATE` line.
2. Replace the values in `colors.md`, then update the matching `--color-brand-*` tokens in `globals.css`.
3. Replace the families in `fonts.md`, then update the font import in `layout.tsx` and `--font-sans` / `--font-mono` in `globals.css`.
