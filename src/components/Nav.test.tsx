import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import App from "../App";
import { sections } from "../lib/sections";

describe("the nav", () => {
  it("points every anchor at an element that exists", () => {
    render(<App />);

    const nav = screen.getByRole("navigation", { name: "Sections" });
    const links = within(nav).getAllByRole("link");

    expect(links).toHaveLength(sections.length);
    for (const link of links) {
      const href = link.getAttribute("href");
      expect(href).toMatch(/^#[a-z-]+$/);
      expect(document.querySelector(href!)).not.toBeNull();
    }
    expect(links.map((link) => link.getAttribute("href"))).toEqual(
      sections.map((section) => `#${section.id}`),
    );
  });
});
