import { useReducedMotion } from "motion/react";
import { div as MDiv } from "motion/react-m";
import type { ReactNode } from "react";

type RevealProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
};

/**
 * Sections rise once, by 16 px, when they first come into view. Reduced motion
 * renders the plain element so nothing is ever hidden behind an animation.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <MDiv
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </MDiv>
  );
}
