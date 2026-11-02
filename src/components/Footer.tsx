import { sections } from "../lib/sections";

export function Footer() {
  return (
    <footer className="shell pt-[clamp(3rem,5.78vw,4.625rem)] pb-10">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between sm:gap-[60px]">
        <div>
          <div className="label mb-5 text-soft">signed, sealed, deployed</div>
          <div className="display-foot">
            Thanks,
            <br />
            <em className="italic">Human.</em>
          </div>
        </div>
        <div className="label leading-[2.1] text-soft sm:pb-2.5 sm:text-right">
          Machine
          <br />
          2014 → 2026
          <br />
          <span className="text-red">delivered twelve years later</span>
        </div>
      </div>

      <div className="label mt-12 flex flex-col gap-4 border-t border-ink pt-5 text-soft sm:flex-row sm:items-end sm:justify-between sm:gap-10">
        <div className="flex flex-wrap gap-x-[26px] gap-y-2">
          {sections
            .filter((section) => section.id !== "menu")
            .map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="transition-colors hover:text-ink"
              >
                {section.label}
              </a>
            ))}
          <a
            href="https://github.com/jfortez/machinepls"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            Source ↗
          </a>
        </div>
        <div>
          ps no bugs :) · vite + react + motion · static assets on cloudflare
        </div>
      </div>

      <div className="mt-[22px] text-[10px] tracking-[.06em] text-dim">
        No cookies, no tracking, no newsletter. The only thing this site asks for is your attention,
        briefly.
      </div>

      <div className="label-tight mt-[34px] flex justify-between gap-6 border-t border-line pt-[18px] text-dim">
        <span>machine.pls · 2026</span>
        <span>drawn, written, shipped</span>
      </div>
    </footer>
  );
}
