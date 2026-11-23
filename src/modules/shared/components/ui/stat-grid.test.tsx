import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatGrid, type StatItem } from "./stat-grid";

const stats: StatItem[] = [
  { label: "% de apuestas ganadas", value: "14.10%", highlight: true },
  { label: "Total ganadas", value: "10" },
  { label: "Total perdidas", value: "8" },
  { label: "Ganancias", value: "+1,240.00", highlight: true },
];

describe("StatGrid", () => {
  it("renders every stat label and value", () => {
    render(<StatGrid stats={stats} />);

    for (const stat of stats) {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByText(stat.value)).toBeInTheDocument();
    }
  });

  it("highlights the value when the stat is marked as highlight", () => {
    render(<StatGrid stats={stats} />);

    expect(screen.getByText("14.10%")).toHaveClass("text-primary");
  });

  it("renders non-highlighted values in white", () => {
    render(<StatGrid stats={stats} />);

    expect(screen.getByText("10", { selector: "h4" })).toHaveClass(
      "text-white",
    );
    expect(screen.getByText("8", { selector: "h4" })).toHaveClass("text-white");
  });
});
