import { testRun } from "../lib/testRun";
import { metrics } from "../lib/metrics";
import { Reveal } from "./Reveal";

function Terminal() {
  return (
    <div className="bg-ink px-[18px] pt-4 pb-[18px] text-[12px] leading-[1.95] text-termText">
      <div className="mb-3 flex items-center gap-[6px] border-b border-paper/15 pb-3">
        <i aria-hidden="true" className="block h-[7px] w-[7px] rounded-full bg-termDot" />
        <i aria-hidden="true" className="block h-[7px] w-[7px] rounded-full bg-termDot" />
        <i aria-hidden="true" className="block h-[7px] w-[7px] rounded-full bg-termDot" />
        <span className="label-tight ml-auto text-termMute">~/machinepls</span>
      </div>
      <div className="text-termDim">$ {testRun.command}</div>
      {testRun.files.map((file) => (
        <div key={file.path}>
          <span className="text-termDim">✓</span> {file.path}{" "}
          <span className="text-termDim">({file.tests})</span>
        </div>
      ))}
      <div>&nbsp;</div>
      <div>
        Tests <span className="text-redl">{testRun.total} passed</span> ({testRun.total})
      </div>
      <div className="text-termDim">Duration {testRun.duration}</div>
      <div>&nbsp;</div>
      <div className="text-termDim">$ echo “no bugs :)”</div>
      <div>no bugs :)</div>
    </div>
  );
}

export function Bugs() {
  return (
    <section
      id="bugs"
      aria-labelledby="bugs-title"
      className="border-y border-line bg-paper2 py-[clamp(3.5rem,6.56vw,5.25rem)]"
    >
      <div className="shell grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_31rem] lg:gap-16">
        <Reveal>
          <div className="label text-soft">the small print</div>
          <h2 id="bugs-title" className="display-h2 mt-3">
            PS <em className="italic">no bugs</em> :)
          </h2>
          <p className="mt-5 max-w-[360px] font-serif text-[1.25rem] leading-[1.46] text-caption">
            Every rule on this page is covered by a test. {metrics.testCount} of them, all green
            before every commit. Checked by a machine, then checked again by a human who did not
            believe the machine.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <Terminal />
        </Reveal>
      </div>
    </section>
  );
}
