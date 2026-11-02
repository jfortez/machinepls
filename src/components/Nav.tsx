import { useReducedMotion } from "motion/react";
import { div as MDiv, li as MLi } from "motion/react-m";
import { useEffect, useId, useRef, useState } from "react";
import { menuSpring } from "../lib/menu";
import { sections } from "../lib/sections";

/**
 * Sticky nav plus the small-screen section menu. The trigger owns
 * aria-expanded; the panel is a modal dialog that traps attention (Escape,
 * backdrop, visible close button) and returns focus to the trigger on close.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const reduce = useReducedMotion();

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b border-line bg-paper"
    >
      <div className="shell flex h-[58px] items-center justify-between gap-6">
        <a
          href="#top"
          className="text-[12.5px] font-bold tracking-[.24em] text-ink"
        >
          MACHINE<span className="text-red">.</span>PLS
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-[30px] text-[11.5px] text-soft lg:flex">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="transition-colors hover:text-ink"
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-[7px] rounded-full border border-red/55 px-[11px] py-[6px] text-[10.5px] tracking-[.1em] text-red sm:flex">
            <i aria-hidden="true" className="block h-[5px] w-[5px] rounded-full bg-red" />
            no bugs :)
          </div>
          <button
            ref={triggerRef}
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="section-menu"
            onClick={() => (open ? close() : setOpen(true))}
            className="flex items-center gap-2 border border-line px-3 py-2 text-[10.5px] tracking-[.16em] uppercase text-ink lg:hidden"
          >
            <span aria-hidden="true" className="text-[13px] leading-none">
              ☰
            </span>
            Menu
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div
            aria-hidden="true"
            onClick={close}
            className="absolute inset-0 bg-ink/60"
          />
          <MDiv
            ref={panelRef}
            id="section-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={reduce ? false : { x: 32, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={
              reduce
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: menuSpring.stiffness,
                    damping: menuSpring.damping,
                  }
            }
            className="relative ml-auto h-full w-full max-w-[30rem] overflow-y-auto bg-ink px-6 py-6 text-paper"
          >
            <div className="flex items-center justify-between border-b border-paper/20 pb-4">
              <span id={titleId} className="label text-onDarkDim">
                Sections
              </span>
              <button
                type="button"
                onClick={close}
                className="label-tight border border-paper/25 px-3 py-1.5 text-paper"
              >
                Close menu
              </button>
            </div>
            <ul className="mt-6">
              {sections.map((section, index) => (
                <MLi
                  key={section.id}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: menuSpring.stiffness,
                          damping: menuSpring.damping,
                          delay: index * menuSpring.staggerSeconds,
                        }
                  }
                >
                  <a
                    href={`#${section.id}`}
                    onClick={close}
                    className="flex items-baseline justify-between border-b border-paper/15 py-4 font-serif text-[2rem] text-paper"
                  >
                    {section.label}
                    <span className="font-mono text-[9px] tracking-[.16em] text-onDarkMute">
                      {section.number}
                    </span>
                  </a>
                </MLi>
              ))}
            </ul>
          </MDiv>
        </div>
      )}
    </header>
  );
}
