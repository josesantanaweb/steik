import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { OddsGrid } from "./odds-grid";

describe("OddsGrid", () => {
  it("renders the three odds with their labels", () => {
    render(<OddsGrid odds={{ home: 2.1, draw: 2, away: 1.6 }} />);

    expect(
      screen.getByRole("button", { name: "Cuota 1: 2.10" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cuota X: 2.00" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cuota 2: 1.60" }),
    ).toBeInTheDocument();
  });
});
