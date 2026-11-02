import { Receipt } from "./Receipt";

export function Hero() {
  return (
    <section
      id="letter"
      aria-labelledby="hero-title"
      className="shell grid items-center gap-12 pt-[clamp(2.5rem,5.78vw,4.625rem)] pb-[clamp(3rem,6.56vw,5.25rem)] lg:grid-cols-[minmax(0,1fr)_27.375rem] lg:gap-14"
    >
      <div className="min-w-0">
        <p className="label mb-[30px] flex flex-wrap items-center gap-x-[9px] gap-y-1 text-soft">
          <span>r/ProgrammerHumor</span>
          <span className="inline-flex items-center gap-[9px] whitespace-nowrap">
            <span aria-hidden="true" className="hidden opacity-50 sm:inline">
              ·
            </span>
            <span className="text-red">12 years ago</span>
          </span>
          <span className="inline-flex items-center gap-[9px] whitespace-nowrap">
            <span aria-hidden="true" className="hidden opacity-50 sm:inline">
              ·
            </span>
            <span>u/kakskaks</span>
          </span>
        </p>

        <h1 id="hero-title" className="display-h1">
          Machine,
          <br />
          pls make
          <br />
          <em className="h1-underline italic">website.</em>
        </h1>

        <p className="mt-[34px] max-w-[442px] font-serif text-[1.4375rem] leading-[1.4] text-body">
          A human asked a machine for a website and then waited twelve years. This is the delivery.
        </p>

        <div className="mt-[42px] flex flex-wrap items-center gap-6">
          <a
            href="#pictures"
            className="inline-flex items-center gap-3 bg-ink px-[22px] py-[15px] text-[11px] tracking-[.13em] uppercase text-paper transition-colors hover:bg-ink2"
          >
            See what it built
            <span aria-hidden="true" className="text-redl">
              →
            </span>
          </a>
          <a
            href="#receipt"
            className="border-b border-ink/35 pb-1 text-[11px] tracking-[.1em] uppercase text-soft transition-colors hover:text-ink"
          >
            Read the original
          </a>
        </div>
      </div>

      <Receipt />
    </section>
  );
}
