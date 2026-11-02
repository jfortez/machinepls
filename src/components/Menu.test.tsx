import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vite-plus/test";
import App from "../App";
import { sections } from "../lib/sections";

const trigger = () => screen.getByRole("button", { name: "Menu" });

describe("the menu", () => {
  it("opens on click and exposes aria-expanded=true", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger());

    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    const dialog = screen.getByRole("dialog", { name: "Sections" });
    for (const section of sections) {
      expect(within(dialog).getByRole("link", { name: new RegExp(section.label) })).toBeInTheDocument();
    }
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(trigger());
    expect(screen.getByRole("dialog", { name: "Sections" })).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog", { name: "Sections" })).not.toBeInTheDocument();
    expect(trigger()).toHaveFocus();
  });

  it("closes on a second trigger click and releases the scroll lock", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(trigger());
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(trigger());
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog", { name: "Sections" })).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });
});
