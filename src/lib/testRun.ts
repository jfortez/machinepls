/**
 * The real `pnpm test` summary, captured after the suite went green. Counts
 * here must add up to `metrics.testCount`; the Bugs test enforces that, so the
 * terminal can never drift from the suite it claims to show.
 */
export type TestFile = {
  readonly path: string;
  readonly tests: number;
};

export const testRun = {
  command: "pnpm test",
  files: [
    { path: "src/components/Letter.test.tsx", tests: 3 },
    { path: "src/components/Requirements.test.tsx", tests: 3 },
    { path: "src/components/Menu.test.tsx", tests: 3 },
    { path: "src/components/Ticker.test.tsx", tests: 2 },
    { path: "src/components/Nav.test.tsx", tests: 1 },
    { path: "src/components/LoadTime.test.tsx", tests: 2 },
  ] satisfies readonly TestFile[],
  total: 14,
  duration: "3.81s",
} as const;
