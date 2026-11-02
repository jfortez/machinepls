import { requirements } from "../lib/requirements";
import { Reveal } from "./Reveal";

const total = String(requirements.length).padStart(2, "0");

export function Requirements() {
  return (
    <section aria-labelledby="requirements-title" className="shell py-[clamp(3.5rem,6.9vw,5.5rem)]">
      <Reveal className="mb-[34px] flex flex-col gap-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
        <div>
          <div className="label text-soft">the brief, itemised</div>
          <h2 id="requirements-title" className="display-h2 mt-3">
            Six demands,
            <br />
            <em className="italic">all met.</em>
          </h2>
        </div>
        <div className="label-tight text-soft">
          {total} / {total} delivered
        </div>
      </Reveal>

      <div>
        {requirements.map((requirement) => (
          <div
            key={requirement.index}
            data-requirement={requirement.index}
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2 border-t border-line py-[26px] lg:grid-cols-[2.875rem_21.5rem_minmax(0,1fr)_4.875rem] lg:items-baseline lg:gap-x-[26px] lg:gap-y-0 [&:last-child]:border-b"
          >
            <div className="col-start-1 row-start-1 text-[10px] tracking-[.1em] text-faint lg:col-start-1 lg:row-start-1">
              {requirement.index}
            </div>
            <div className="col-span-2 col-start-1 row-start-2 min-w-0 text-[13px] tracking-[-.01em] text-pretty lg:col-span-1 lg:col-start-2 lg:row-start-1">
              {requirement.demand}
            </div>
            <div className="col-span-2 col-start-1 row-start-3 font-serif text-[1.3125rem] leading-[1.36] text-ans text-pretty lg:col-span-1 lg:col-start-3 lg:row-start-1">
              {requirement.answer}
            </div>
            <div className="col-start-2 row-start-1 justify-self-end border border-red/45 px-[7px] py-1 text-[10px] tracking-[.17em] text-red lg:col-start-4 lg:row-start-1">
              {requirement.status}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
