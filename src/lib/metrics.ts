/**
 * Every number the page displays is measured here, once, and imported by the
 * components. Nothing on the page inlines a statistic.
 *
 * Measurements, with the command or run that produced them:
 *
 * - jsGzipKb — 112,926 bytes, `gzip -9 -c dist/assets/*.js | wc -c` after
 *   `pnpm build` (source: final production build). Before the LazyMotion + m
 *   migration the same command measured 126,778 bytes of a 401,219-byte
 *   bundle; the m build is 353,746 bytes raw.
 * - cssGzipKb — 6,060 bytes, same command against `dist/assets/*.css`.
 * - largestContentfulPaintSeconds — 0.50 s in headless Chromium with a fresh
 *   profile (cold cache) against `pnpm preview --port 4789`, read from
 *   `largest-contentful-paint` entries after fonts settled. An earlier run of
 *   the same page measured 0.48 s; the table shows the final run.
 * - cumulativeLayoutShift — 0.0014 in that final run, from `layout-shift`
 *   entries without recent input (an earlier run measured 0.0016).
 * - testCount — 14 passing tests, printed by `pnpm test`.
 * - svgKilobytes — 2,291 bytes of serialized inline landscape SVG, measured in
 *   the built page via `document.querySelector("#pictures svg").outerHTML`.
 * - responsiveMinPx / responsiveMaxPx — the narrowest and widest viewports the
 *   layout was actually checked at in headless Chromium (also 768 and 1024).
 *
 * A placeholder zero here means "not measured yet", never "zero".
 */

export type StatMetric = {
  readonly id: "lcp" | "js" | "cls";
  readonly value: number;
  readonly decimals: number;
  readonly unit: string;
  readonly label: readonly [string, string];
};

export const metrics = {
  jsGzipKb: 112.9,
  cssGzipKb: 6,
  largestContentfulPaintSeconds: 0.5,
  cumulativeLayoutShift: 0.001,
  testCount: 14,
  svgKilobytes: 2.3,
  responsiveMinPx: 390,
  responsiveMaxPx: 1600,
} as const;

export const stats: readonly StatMetric[] = [
  {
    id: "lcp",
    value: metrics.largestContentfulPaintSeconds,
    decimals: 2,
    unit: "s",
    label: ["largest contentful", "paint, local cold cache"],
  },
  {
    id: "js",
    value: metrics.jsGzipKb,
    decimals: 1,
    unit: "kB",
    label: ["javascript", "gzipped"],
  },
  {
    id: "cls",
    value: metrics.cumulativeLayoutShift,
    decimals: 3,
    unit: "",
    label: ["cumulative", "layout shift"],
  },
];

export const formatStatValue = (stat: Pick<StatMetric, "value" | "decimals">): string =>
  stat.value.toFixed(stat.decimals);
