import { letterLines } from "../lib/letter";

/** The original letter as a rotated receipt: numbered gutter, dashed header, red stamp. */
export function Receipt() {
  return (
    <figure
      id="receipt"
      aria-labelledby="receipt-caption"
      className="receipt relative mx-auto w-full max-w-[438px] border border-ink2 bg-card px-[1.625rem] pt-6 pb-5 shadow-receipt lg:mx-0"
    >
      <figcaption id="receipt-caption" className="sr-only">
        The original letter, 2014 → 2026
      </figcaption>
      <div
        aria-hidden="true"
        className="absolute -top-[1.1rem] -right-2 rotate-[7deg] border-2 border-red bg-paper px-2.5 py-1 text-[10.5px] tracking-[.2em] text-red md:-right-4"
      >
        DELIVERED
      </div>
      <div className="mb-[11px] flex justify-between border-b border-dashed border-ink/30 pb-2.5 text-[9px] tracking-[.13em] uppercase text-soft">
        <span>inbox / machine</span>
        <span>2014 → 2026</span>
      </div>
      {letterLines.map((line) => (
        <div
          key={line.number}
          data-line={line.number}
          className="grid grid-cols-[26px_1fr] text-[13px] leading-[1.86] tracking-[-.01em]"
        >
          <div
            aria-hidden="true"
            className="pr-[13px] text-right text-[10.5px] text-gutter select-none"
          >
            {line.number}
          </div>
          <div>{line.text}</div>
        </div>
      ))}
    </figure>
  );
}
