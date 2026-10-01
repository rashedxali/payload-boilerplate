# Agents

This repo is a Payload CMS + Next.js boilerplate. Follow these steps in order for every task.

## Getting started

When the user asks to get started or set up the project, follow [`.agents/GETTING_STARTED.md`](.agents/GETTING_STARTED.md) step by step: replace the git remote, apply the brand to the global styles, fill in `.env`, seed the admin user, then give the run instructions.

## Before you write code

1. **Ask first.** Follow [`.agents/ASKING.md`](.agents/ASKING.md). For any new section, block, post type or content field, ask the user where the data comes from and what editors can change, and wait for the answers. Do not guess from a screenshot.
2. **Read the brand.** For any UI work, read [`brand/about.md`](brand/about.md), [`brand/colors.md`](brand/colors.md) and [`brand/fonts.md`](brand/fonts.md). Use only the colors and fonts defined there. If `about.md` is still a template, ask the user for the brand details.
3. **Follow the project patterns.** Blocks and post types are built exactly as described in [`.agents/README.md`](.agents/README.md).
4. **Use the skills.**
   - Payload CMS: start with `.agents/skills/payload/SKILL.md`, then see `.agents/skills/payload/reference/` for detailed docs.
   - Frontend design: `.agents/skills/frontend-design/SKILL.md` for layout and craft. Where it conflicts with `brand/`, `brand/` wins.

## Project facts

- Package manager: Bun (`bun install`, `bun run <script>`).
- Database: Postgres. Run `bun run generate:types` after every schema change.
- Do not run migrations against a shared database without the user's approval.
