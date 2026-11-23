import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { LeagueLogo } from "./league-logo";

describe("LeagueLogo", () => {
  it("renders the league image", () => {
    render(<LeagueLogo src="/images/leagues/la-liga.png" name="La Liga" />);

    expect(screen.getByRole("img", { name: "La Liga" })).toHaveAttribute(
      "src",
      "/images/leagues/la-liga.png",
    );
  });

  it("falls back when the image fails to load", () => {
    render(<LeagueLogo src="/images/leagues/missing.png" name="La Liga" />);

    fireEvent.error(screen.getByRole("img", { name: "La Liga" }));

    expect(
      screen.queryByRole("img", { name: "La Liga" }),
    ).not.toBeInTheDocument();
  });
});
