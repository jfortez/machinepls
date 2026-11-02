import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import App from "../App";
import { requirements } from "../lib/requirements";

const requirementsSection = () => screen.getByRole("region", { name: /^six demands/i });

const row = (index: string): HTMLElement => {
  const found = requirementsSection().querySelector<HTMLElement>(`[data-requirement="${index}"]`);
  expect(found).not.toBeNull();
  return found!;
};

describe("the requirements table", () => {
  it("renders six rows, each marked PASS", () => {
    render(<App />);

    expect(requirementsSection().querySelectorAll("[data-requirement]")).toHaveLength(6);
    for (const requirement of requirements) {
      expect(within(row(requirement.index)).getByText("PASS")).toBeInTheDocument();
    }
  });

  it("uses the copy exported by the requirements module, not a parallel copy", () => {
    render(<App />);

    for (const requirement of requirements) {
      const element = row(requirement.index);
      expect(within(element).getByText(requirement.demand)).toBeInTheDocument();
      expect(within(element).getByText(requirement.answer)).toBeInTheDocument();
    }
  });

  it("counts six delivered out of six", () => {
    render(<App />);

    expect(within(requirementsSection()).getByText("06 / 06 delivered")).toBeInTheDocument();
  });
});
