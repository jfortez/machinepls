# AGENTS.md

Single-page React site for `machinepls`. Read `SPEC.md` before changing anything; the visual ground truth is `design/landing-desktop.png` and `design/landing-reference.html` (reference only, never built).

## Rules

- TypeScript strict, no `any` without a written reason.
- Tailwind v4 utilities for layout and spacing; design tokens live once in `src/index.css` under `@theme`. No hard-coded hex values in components.
- Motion for animation only. Respect `prefers-reduced-motion` everywhere.
- Copy is content, not decoration: the letter lines and the six demands are verbatim and must not be "corrected".
- Numbers shown on the page come from `src/lib/metrics.ts`; never inline a statistic in a component.
- Tests are behaviour-level through the rendered app. `pnpm build && pnpm lint && pnpm test` must pass before any commit.

## Commits

Few, title-only, no body. Squash work in progress rather than stacking commits.

## Out of scope

Deployment, DNS, analytics, CMS, i18n, dark mode. No client-side routing.
