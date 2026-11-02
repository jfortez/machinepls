import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import App from "../App";
import { formatStatValue, metrics, stats } from "../lib/metrics";
import { testRun } from "../lib/testRun";

const loadSection = () => screen.getByRole("region", { name: /small enough/i });
const bugsSection = () => screen.getByRole("region", { name: /ps no bugs/i });

describe("the measured numbers", () => {
  it("renders exactly the stats exported by the metrics module, with no drift", () => {
    render(<App />);

    const rendered = loadSection().querySelectorAll("[data-stat-id]");
    expect(rendered).toHaveLength(stats.length);

    for (const stat of stats) {
      const element = loadSection().querySelector<HTMLElement>(`[data-stat-id="${stat.id}"]`);
      expect(element).not.toBeNull();

      const expected = stat.unit ? `${formatStatValue(stat)} ${stat.unit}` : formatStatValue(stat);
      expect(element!.querySelector(".sr-only")).toHaveTextContent(expected);
      expect(element!.querySelector(".stat-num")).toHaveTextContent(formatStatValue(stat));
    }
  });

  it("shows a terminal summary whose file counts add up to the measured test count", () => {
    render(<App />);

    const fromFiles = testRun.files.reduce((total, file) => total + file.tests, 0);
    expect(fromFiles).toBe(testRun.total);
    expect(fromFiles).toBe(metrics.testCount);

    const section = bugsSection();
    expect(section).toHaveTextContent(`${testRun.total} passed`);
    for (const file of testRun.files) {
      expect(section).toHaveTextContent(`${file.path} (${file.tests})`);
    }
    expect(section).toHaveTextContent(`Every rule on this page is covered by a test.`);
    expect(section).toHaveTextContent(`${metrics.testCount} of them`);
  });
});
