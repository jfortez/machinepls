/** The only place the menu's motion constants live; the copy and the code share them. */
export const menuSpring = {
  stiffness: 320,
  damping: 30,
  staggerSeconds: 0.05,
  durationMs: 180,
} as const;
