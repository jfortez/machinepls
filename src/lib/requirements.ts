import { demands } from "./letter";
import { menuSpring } from "./menu";
import { metrics } from "./metrics";

export type Requirement = {
  readonly index: string;
  /** The demand exactly as the human wrote it, trailing comma included. */
  readonly demand: string;
  readonly answer: string;
  readonly status: "PASS";
};

const answers: readonly string[] = [
  `Fluid from a ${metrics.responsiveMinPx} px phone to a ${metrics.responsiveMaxPx} px display. No zooming, no horizontal scroll, no “please rotate your device”.`,
  `One full-bleed landscape, drawn in vector ink. ${metrics.svgKilobytes} kilobytes, sharp at any size — bigger than any JPEG we could afford.`,
  "Instrument Serif for the voice, JetBrains Mono for the receipts. Both free, both self-hosted, both yours to keep.",
  `A menu that opens on a spring instead of a timer. One easing curve, ${menuSpring.durationMs} ms, closes on Escape like it should.`,
  `No analytics, no cookie banner, no webfont blocking the first paint. ${metrics.jsGzipKb} kB of JavaScript and ${metrics.cssGzipKb} kB of CSS, before images.`,
  `${metrics.testCount} tests, zero failures. Checked by a machine, then checked again by a human who did not believe the machine.`,
];

export const requirements: readonly Requirement[] = demands.map((demand, index) => {
  const answer = answers[index];
  if (!answer) {
    throw new Error(`Missing answer for demand ${index + 1}`);
  }
  return {
    index: String(index + 1).padStart(2, "0"),
    demand,
    answer,
    status: "PASS" as const,
  };
});
