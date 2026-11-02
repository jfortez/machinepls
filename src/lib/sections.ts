import { demands } from "./letter";

export type Section = {
  /** Element id the link scrolls to. */
  readonly id: string;
  readonly label: string;
  /** Two-digit index shown in the menu band. */
  readonly number: string;
};

/** Page sections in reading order. The nav, the menu band and the footer share this list. */
export const sections: readonly Section[] = [
  { id: "letter", label: "The letter", number: "01" },
  { id: "pictures", label: "Pictures", number: "02" },
  { id: "menu", label: "Menu", number: "03" },
  { id: "load", label: "Load time", number: "04" },
  { id: "bugs", label: "Bugs", number: "05" },
];

/** The four-entry menu shown in the dark band (the nav's "Menu" link is not a destination there). */
export const menuItems = sections
  .filter((section) => section.id !== "menu")
  .map((section, index) => ({ ...section, number: String(index + 1).padStart(2, "0") }));


/**
 * Ticker copy: the six demands as the reference sets them — lowercase machine
 * voice, no trailing commas, "also" dropped because the ticker has no sentence
 * to connect to.
 */
export const tickerDemands = demands.map(
  (demand) =>
    demand
      .replace(/^also /, "")
      .replace(/,$/, "")
      .replace(/^PS no bugs/, "ps no bugs") as string,
);
