import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import App from "../App";
import { demands, letterLines } from "../lib/letter";

const receipt = () => screen.getByRole("figure", { name: /the original letter/i });

describe("the letter", () => {
  it("renders all 18 numbered lines, from 2 to 19", () => {
    const { container } = render(<App />);

    const rows = Array.from(container.querySelectorAll("[data-line]"));
    expect(rows).toHaveLength(18);
    expect(rows.map((row) => Number(row.getAttribute("data-line")))).toEqual(
      Array.from({ length: 18 }, (_, index) => index + 2),
    );
  });

  it("quotes the six demands verbatim", () => {
    render(<App />);

    const figure = receipt();
    for (const demand of demands) {
      expect(within(figure).getByText(demand)).toBeInTheDocument();
    }
  });

  it("keeps the letter's empty lines as empty lines", () => {
    const { container } = render(<App />);

    const numbered = (number: number) => {
      const row = container.querySelector(`[data-line="${number}"]`);
      expect(row).not.toBeNull();
      return row!.lastElementChild!.textContent;
    };

    expect(numbered(4)).toBe("Machine,");
    expect(numbered(17)).toBe("PS no bugs :)");

    const emptyLines = letterLines.filter((line) => line.text === "").map((line) => line.number);
    expect(emptyLines).toEqual([2, 3, 5, 7, 13, 16, 18, 19]);
    for (const line of emptyLines) {
      expect(numbered(line)).toBe("");
    }
  });
});
