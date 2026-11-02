/**
 * The original letter, as data. Line numbers match the receipt in the design:
 * lines 2–19, empty lines included, because the whitespace is part of the
 * letter. Text is verbatim — lowercasing and trailing commas are the joke.
 */
export type LetterLine = {
  readonly number: number;
  readonly text: string;
};

export const letterLines: readonly LetterLine[] = [
  { number: 2, text: "" },
  { number: 3, text: "" },
  { number: 4, text: "Machine," },
  { number: 5, text: "" },
  { number: 6, text: "Pls make website," },
  { number: 7, text: "" },
  { number: 8, text: "all responsive like," },
  { number: 9, text: "w/ BIG pictures ooo," },
  { number: 10, text: "use my fav fonts," },
  { number: 11, text: "also fancy menus with whooosh on," },
  { number: 12, text: "load fast pls" },
  { number: 13, text: "" },
  { number: 14, text: "Thanks," },
  { number: 15, text: "Human" },
  { number: 16, text: "" },
  { number: 17, text: "PS no bugs :)" },
  { number: 18, text: "" },
  { number: 19, text: "" },
];

/** The six demands, quoted from the letter by line number. */
export const demandLineNumbers = [8, 9, 10, 11, 12, 17] as const;

export const demands = demandLineNumbers.map((lineNumber) => {
  const line = letterLines.find((candidate) => candidate.number === lineNumber);
  if (!line?.text) {
    throw new Error(`Letter line ${lineNumber} is missing or empty`);
  }
  return line.text;
});
