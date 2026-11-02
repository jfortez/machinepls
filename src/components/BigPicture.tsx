import { useReducedMotion, useScroll, useTransform } from "motion/react";
import { g as MG, path as MPath } from "motion/react-m";
import { useRef } from "react";
import { metrics } from "../lib/metrics";

/**
 * The landscape, drawn once in vector ink: paper sky, halftone, a red sun and
 * four ridges. Layer offsets are scroll parallax, capped well under 40 px.
 */
export function BigPicture() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const sunY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const farY = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const midY = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const nearY = useTransform(scrollYProgress, [0, 1], [6, -6]);
  const frontY = useTransform(scrollYProgress, [0, 1], [2, -2]);

  const drift = (value: typeof sunY) => (reduce ? undefined : { y: value });

  return (
    <>
      <section
        id="pictures"
        aria-labelledby="pictures-title"
        className="relative h-[clamp(22rem,50vw,40rem)] overflow-hidden border-b border-line bg-paper"
      >
        <div ref={ref} className="absolute inset-0">
          <svg
            viewBox="0 0 1280 640"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            focusable="false"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <pattern id="mp-halftone-soft" width="7" height="7" patternUnits="userSpaceOnUse">
                <circle cx="1.6" cy="1.6" r="1.15" fill="var(--color-ink)" opacity=".5" />
              </pattern>
              <pattern id="mp-halftone-fine" width="5" height="5" patternUnits="userSpaceOnUse">
                <circle cx="1.2" cy="1.2" r="0.85" fill="var(--color-ink)" opacity=".6" />
              </pattern>
            </defs>

            <rect width="1280" height="640" fill="var(--color-paper)" />
            <rect width="1280" height="640" fill="url(#mp-halftone-soft)" opacity=".26" />

            <MG style={drift(sunY)}>
              <circle cx="897" cy="257" r="136" fill="var(--color-red)" opacity=".26" />
              <circle cx="892" cy="262" r="136" fill="var(--color-red)" />
              <circle cx="892" cy="262" r="136" fill="url(#mp-halftone-fine)" opacity=".28" />
            </MG>

            <MPath
              style={drift(farY)}
              d="M0 468 C140 426 262 484 382 450 C500 416 602 476 722 450 C842 424 942 478 1060 454 C1160 434 1222 458 1280 444 L1280 640 L0 640 Z"
              fill="var(--color-ink)"
              opacity=".22"
            />
            <MPath
              style={drift(midY)}
              d="M0 518 C120 484 212 534 332 510 C452 486 542 540 662 516 C782 492 882 542 1002 516 C1112 494 1202 522 1280 508 L1280 640 L0 640 Z"
              fill="var(--color-ink)"
              opacity=".46"
            />
            <MPath
              style={drift(nearY)}
              d="M0 584 C130 550 252 596 382 574 C502 556 622 602 762 578 C892 556 1012 598 1142 580 C1212 570 1252 584 1280 576 L1280 640 L0 640 Z"
              fill="var(--color-ink)"
              opacity=".8"
            />
            <MPath
              style={drift(frontY)}
              d="M0 638 C180 616 320 648 470 632 C640 616 780 652 940 636 C1080 622 1200 644 1280 632 L1280 644 L0 644 Z"
              fill="var(--color-ink)"
            />

            <circle cx="330" cy="492" r="3.2" fill="var(--color-ink)" />
            <path d="M329 496 L329 509" stroke="var(--color-ink)" strokeWidth="2.6" />
            <path d="M325 500 L333 500" stroke="var(--color-ink)" strokeWidth="2" />
          </svg>

          <div className="figcaption-fade absolute inset-x-0 bottom-0 flex items-end justify-between gap-10 px-[clamp(1.25rem,3.4375vw,2.75rem)] pt-[74px] pb-[30px]">
            <h2 id="pictures-title" className="display-h3">
              w/ <em className="italic">BIG</em>
              <br />
              pictures ooo
            </h2>
          </div>
        </div>
      </section>

      <div className="shell flex flex-col gap-2 border-b border-line py-4 text-[10.5px] tracking-[.13em] uppercase text-caption sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <span>Fig. 01 — the big picture</span>
        <span className="leading-[1.9] sm:text-right">
          drawn in vector ink, {metrics.svgKilobytes} kB · sharp at any size, which is more than the
          original JPEGs managed
        </span>
      </div>
    </>
  );
}
