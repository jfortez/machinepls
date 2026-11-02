import { animate, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { span as MSpan } from "motion/react-m";
import { useEffect, useRef } from "react";
import { formatStatValue, stats, type StatMetric } from "../lib/metrics";
import { Reveal } from "./Reveal";

const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Stat({ stat }: { readonly stat: StatMetric }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(prefersReducedMotion() ? stat.value : 0);
  const shown = useTransform(count, (latest) =>
    formatStatValue({ value: latest, decimals: stat.decimals }),
  );

  useEffect(() => {
    if (reduce) {
      count.set(stat.value);
      return;
    }

    if (!inView || stat.value === 0) {
      return;
    }

    count.set(0);
    const controls = animate(count, stat.value, {
      duration: 1.1,
      ease: "easeOut",
      onComplete: () => count.set(stat.value),
    });

    return () => {
      controls.stop();
    };
  }, [count, inView, reduce, stat.value]);

  const final = formatStatValue(stat);

  return (
    <div
      ref={ref}
      data-stat-id={stat.id}
      className="border-line border-r px-5 pt-6 first:pl-0 [&:nth-child(2n)]:border-r-0 min-[900px]:border-r min-[900px]:pl-5 min-[900px]:first:pl-0 min-[900px]:last:border-r-0"
    >
      <div aria-hidden="true" className="stat-num">
        <MSpan>{shown}</MSpan>
        {stat.unit ? <sup className="align-super text-[1.25rem]">{stat.unit}</sup> : null}
      </div>
      <span className="sr-only">{stat.unit ? `${final} ${stat.unit}` : final}</span>
      <div className="label mt-3 text-soft">
        {stat.label[0]}
        <br />
        {stat.label[1]}
      </div>
    </div>
  );
}

export function LoadTime() {
  return (
    <section id="load" aria-labelledby="load-title" className="shell py-[clamp(3.5rem,6.75vw,5.375rem)]">
      <Reveal className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
        <div>
          <div className="label text-soft">load fast pls</div>
          <h2 id="load-title" className="display-h2 mt-3">
            Small enough
            <br />
            <em className="italic">to feel instant.</em>
          </h2>
        </div>
        <div className="label-tight text-soft">measured, not promised</div>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 border-t border-ink min-[900px]:grid-cols-3">
        {stats.map((stat) => (
          <Stat key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
}
