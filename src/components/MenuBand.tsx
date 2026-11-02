import { useReducedMotion } from "motion/react";
import { span as MSpan } from "motion/react-m";
import { useState } from "react";
import { menuSpring } from "../lib/menu";
import { menuItems } from "../lib/sections";
import { Reveal } from "./Reveal";

/**
 * A working menu, not a picture of one: hover or focus leans the label on a
 * spring and the red indicator follows. The spec line under it reports the
 * same constants the code animates with.
 */
export function MenuBand() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id="menu"
      aria-labelledby="menu-title"
      className="overflow-hidden bg-ink py-[clamp(3.5rem,6.56vw,5.25rem)] text-paper"
    >
      <div className="shell grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_26.875rem] lg:gap-16">
        <Reveal>
          <div className="label text-onDarkDim">on the subject of menus</div>
          <h2 id="menu-title" className="display-h2 mt-3">
            Fancy menus,
            <br />
            <em className="text-redl italic">with whooosh on.</em>
          </h2>
          <p className="mt-[22px] max-w-[398px] font-serif text-[1.25rem] leading-[1.46] text-onDarkSoft">
            Reach for the lettering and it leans in — finger, cursor, or key. Open the menu and it
            arrives on a spring instead of a timer: the difference between a door and a door that was
            expecting you.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="border border-paper/20 bg-ink2">
            {menuItems.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onMouseEnter={() => setActive(item.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(item.id)}
                  onBlur={() => setActive(null)}
                  className={[
                    "flex items-center justify-between border-b border-paper/15 px-[22px] py-[19px] font-serif text-[1.8125rem] text-paper last:border-b-0",
                    isActive ? "bg-redl/15 shadow-[inset_3px_0_0_var(--color-redl)]" : "",
                  ].join(" ")}
                >
                  <MSpan
                    animate={reduce ? undefined : { x: isActive ? 6 : 0 }}
                    transition={{
                      type: "spring",
                      stiffness: menuSpring.stiffness,
                      damping: menuSpring.damping,
                    }}
                  >
                    {item.label}
                  </MSpan>
                  <span className="font-mono text-[9px] tracking-[.16em] text-onDarkMute">
                    {isActive ? `→ ${item.number}` : item.number}
                  </span>
                </a>
              );
            })}
          </div>
          <div className="label-tight mt-3.5 flex justify-between text-onDarkMute">
            <span>spring · stiffness {menuSpring.stiffness}</span>
            <span>{menuSpring.durationMs} ms</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
