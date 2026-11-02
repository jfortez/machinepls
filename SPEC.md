# machinepls — build specification

## What this is

A single-page site that delivers, twelve years late, the website a Reddit user asked a machine for in 2014:

```
Machine,
Pls make website,
all responsive like,
w/ BIG pictures ooo,
use my fav fonts,
also fancy menus with whooosh on,
load fast pls

Thanks,
Human

PS no bugs :)
```

The joke is the brief; the site is the delivery. It must be good enough that the joke lands *because* the execution is serious — not a meme page, a real editorial site with a deadpan premise.

## Ground truth for the design

- `docs/design-desktop.png` — the approved visual target (1280 px wide, one long page).
- `docs/design-reference.html` — the same page as static HTML. Read it for exact values: palette, type sizes, spacing, the SVG landscape paths, every string. Do not ship this file; reimplement it as React components. It is reference only and must stay out of the build.

The reference was designed at exactly 1280 px. Reproduce its proportions with fluid type and spacing, not fixed pixel copies of the whole page.

## Stack (already scaffolded)

- Vite+ (`vp`) + React 19 + TypeScript, pnpm. Entrypoints already exist: `src/main.tsx`, `src/App.tsx`.
- Add **Tailwind CSS v4** (`tailwindcss` + `@tailwindcss/vite`), **Motion** (`motion`), **Vitest** + `@testing-library/react` + `jsdom`, and self-hosted fonts via `@fontsource/instrument-serif` and `@fontsource/jetbrains-mono`. No Google Fonts `<link>` in the shipped page.
- Node 26, pnpm is on PATH as `pnpm`.

## Design tokens

```
paper   #EFE9DF   page ground
paper2  #E5DCCD   band ground (ticker, bugs)
card    #F7F2E9   receipt card
ink     #14120E   text, dark bands, terminal
soft    #5C5548   secondary text
red     #BF3419   the single accent (proof marks, PASS, stamps)
redl    #E2573A   accent on dark ground only
line    rgba(20,18,14,0.16)
```

Type: **Instrument Serif** (display, roman + italic) and **JetBrains Mono** (the letter, labels, terminal). Pairing, not decoration: the serif speaks, the mono records. Never use Inter/Roboto/system sans for body copy.

## Section order and content

1. **Nav** — wordmark `MACHINE.PLS` (red period), section links, `no bugs :)` pill. Sticky, hairline bottom border, paper background, no shadow.
2. **Hero** — eyebrow `r/ProgrammerHumor · 12 years ago · u/kakskaks`; H1 `Machine, / pls make / website.` with *website.* italic and a red thick underline; lede `A human asked a machine for a website and then waited twelve years. This is the delivery.`; primary button `SEE WHAT IT BUILT →`; secondary link `Read the original`. Right: the letter as a rotated receipt card, line numbers 2–19 in the gutter, dashed header `inbox / machine` + `2014 → 2026`, and a red `DELIVERED` stamp breaking the top-right corner.
3. **Ticker** — full-bleed marquee of the six demands, uppercase mono, `✳` separators, paper2 ground. Infinite, seamless, pauses on hover.
4. **Big picture** — full-bleed risograph landscape drawn as inline SVG (paper sky, halftone dots, red sun at ~70 % x, four ink ridges, one tiny figure for scale). Overlaid headline `w/ BIG pictures ooo`. Below it a caption strip: `Fig. 01 — the big picture` / `drawn in vector ink, 4.2 kB · sharp at any size, which is more than the original JPEGs managed`.
5. **Requirements** — header `the brief, itemised` + `Six demands, all met.` + `06 / 06 delivered`; six rows: index, the original demand in mono verbatim (with its trailing comma and lowercase), the answer in serif, a red outlined `PASS`. Copy for the six answers is in the reference HTML — use it verbatim.
6. **Menu band** — dark ink ground. `on the subject of menus` / `Fancy menus, with whooosh on.` / the hover paragraph, and a working four-item menu (The letter, Pictures, Load time, Bugs) that responds to hover and keyboard. Spec line under it: `spring · stiffness 320` and `180 ms`.
7. **Load time** — `load fast pls` / `Small enough to feel instant.` / `measured, not promised`; four stats with serif numerals and mono labels: LCP, JS size, Lighthouse, CLS.
8. **Bugs** — paper2 band, `the small print` / `PS no bugs :)` / the test-suite paragraph, and a terminal card showing a real `pnpm test` run.
9. **Footer** — `signed, sealed, deployed` / `Thanks, Human.` (Human. italic), right-hand `Machine / 2014 → 2026 / delivered twelve years later`, link row, tech line, the no-cookies line, and a closing hairline row `machine.pls · 2026` / `drawn, written, shipped`.

## Behaviour (this is where the joke is delivered)

- **Menu**: a real menu, desktop and mobile. On mobile a full-screen overlay, items staggered in on a spring, `Escape` and backdrop close it, `aria-expanded` on the trigger, focus moved into the panel and back on close, body scroll locked while open. Desktop: hover/focus states that lean the label with a spring, red indicator.
- **Reveals**: sections rise/fade in once on scroll (`whileInView`, `once: true`), small distances (12–20 px), never blocking first paint of the hero.
- **Ticker**: seamless loop with CSS transform, paused on hover, duplicated content with `aria-hidden` on the duplicate.
- **Big picture**: the sun and the ridge layers drift at different rates on scroll (subtle parallax, ≤ 40 px). Vector only.
- **Stats**: numerals count up once on view; the final displayed value must equal the value in code.
- **Reduced motion**: `prefers-reduced-motion` kills the marquee animation, parallax and count-ups; content is visible immediately.
- **Keyboard**: every interactive element reachable, visible focus ring in ink or red, skip link to `#main`.

## Numbers must be true

The reference uses placeholder stats (`0.6 s`, `41 kB`, `100`, `14 tests`). After the build:

- Replace the JS figure with the **real gzipped size of the built JS** (`dist/assets/*.js`).
- Replace the test count with the **real number of passing tests**.
- Replace LCP with a **measured** value; if you cannot measure it, drop the number and keep the label honest (e.g. `measured on a cold cache` only when it was).
- "100 Lighthouse" and "0.00 CLS" may only appear if actually measured; otherwise remove that stat and keep the grid to three items.

A page whose punchline is "no bugs" must not lie about its own numbers.

## Tests (Vitest + React Testing Library)

At least six tests, all behaviour-level, through the rendered app:

1. The letter renders all 18 numbered lines (2–19) with the six demands verbatim.
2. Requirements renders six rows, each with `PASS`, and row copy matches the data module.
3. The menu opens on click, exposes `aria-expanded="true"`, closes on `Escape`.
4. The ticker duplicates its content and marks the duplicate `aria-hidden`.
5. Every nav anchor points at an element that exists in the document.
6. Stats render the exact values exported by the metrics module (no drift between copy and code).

## Commands

```
pnpm install
pnpm dev                                   # local
pnpm build                                 # tsc -b && vp build  -> dist/
pnpm lint                                  # vp lint (oxlint, type-aware)
pnpm test                                  # vitest run
pnpm preview --port 4789 --strictPort      # serve dist/ for a smoke check
```

Never chain `rm -rf` into a compound command; leave scratch dirs under `/tmp`.

## Deployment

Static build in `dist/`, deployed to Cloudflare with Wrangler (`wrangler.jsonc`, `assets.directory = "./dist"`, `not_found_handling = "single-page-application"`). Do not run `wrangler deploy` — publishing is handled outside this repo work.

## Definition of done

- `pnpm build`, `pnpm lint` and `pnpm test` all green, from a clean `node_modules`.
- The page matches `docs/design-desktop.png` at 1280 px and degrades honestly at 390 px: single column, no horizontal scroll, the receipt still legible, the letter never truncated.
- No console errors or warnings in the browser.
- Every number on the page is measured, not invented.
- `README.md` is short: what it is, how to run, how to deploy.
