import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import App from "../App";
import { tickerDemands } from "../lib/sections";

const ticker = () => screen.getByRole("region", { name: /the six demands, on a loop/i });

describe("the ticker", () => {
  it("shows every demand twice, once as an aria-hidden duplicate", () => {
    render(<App />);

    const duplicate = screen.getByTestId("ticker-duplicate");
    expect(duplicate).toHaveAttribute("aria-hidden", "true");

    for (const demand of tickerDemands) {
      expect(within(ticker()).getAllByText(demand)).toHaveLength(2);
      expect(within(duplicate).getByText(demand)).toBeInTheDocument();
    }
  });

  it("duplicates exactly the visible copy, and only the copy", () => {
    render(<App />);

    const duplicate = screen.getByTestId("ticker-duplicate");
    const visible = duplicate.previousElementSibling;

    expect(visible).not.toBeNull();
    expect(visible).not.toHaveAttribute("aria-hidden");
    expect(duplicate.textContent).toBe(visible!.textContent);
    expect(visible!.textContent).toContain(tickerDemands[0]);
  });
});
