import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TeamLogo } from "./team-logo";

describe("TeamLogo", () => {
  it("renders the image when a logo is provided", () => {
    render(<TeamLogo src="/images/teams/roma.png" name="Roma" />);

    expect(screen.getByRole("img", { name: "Roma" })).toHaveAttribute(
      "src",
      "/images/teams/roma.png",
    );
  });

  it("falls back to the initial when the image fails", () => {
    render(<TeamLogo src="/images/teams/roma.png" name="Roma" />);

    fireEvent.error(screen.getByRole("img", { name: "Roma" }));

    expect(screen.queryByRole("img", { name: "Roma" })).not.toBeInTheDocument();
    expect(screen.getByText("R")).toBeInTheDocument();
  });

  it("renders the initial directly when there is no logo", () => {
    render(<TeamLogo name="Barcelona" />);

    expect(
      screen.queryByRole("img", { name: "Barcelona" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });
});
