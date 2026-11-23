import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressBar } from "./progress-bar";

describe("ProgressBar", () => {
  it("exposes its value through aria attributes", () => {
    render(<ProgressBar value={62} label="Posesión" />);

    const bar = screen.getByRole("progressbar", { name: "Posesión" });
    expect(bar).toHaveAttribute("aria-valuenow", "62");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("clamps values above 100", () => {
    render(<ProgressBar value={140} label="Posesión" />);

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });

  it("clamps values below 0", () => {
    render(<ProgressBar value={-20} label="Posesión" />);

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
  });
});
