import { tickerDemands } from "../lib/sections";

type TickerGroupProps = {
  readonly duplicate?: boolean;
};

function TickerGroup({ duplicate = false }: TickerGroupProps) {
  return (
    <div
      className="flex shrink-0 items-center gap-[26px] pr-[26px]"
      aria-hidden={duplicate || undefined}
      data-testid={duplicate ? "ticker-duplicate" : undefined}
    >
      {tickerDemands.map((demand, index) => (
        <div key={`${demand}-${index}`} className="flex items-center gap-[26px]">
          <span className="text-[10px] whitespace-nowrap tracking-[.19em] uppercase text-ticker">
            {demand}
          </span>
          <span aria-hidden="true" className="text-[12px] text-red">
            ✳
          </span>
        </div>
      ))}
    </div>
  );
}

/** Full-bleed marquee: six demands, twice, second copy hidden from assistive tech. */
export function Ticker() {
  return (
    <section
      aria-label="The six demands, on a loop"
      className="ticker flex h-11 items-center overflow-hidden border-y border-line bg-paper2"
    >
      <div className="ticker-track">
        <TickerGroup />
        <TickerGroup duplicate />
      </div>
    </section>
  );
}
