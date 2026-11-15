import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Pill } from "./pill";

describe("Pill", () => {
  it("renders its children as a button of type button", () => {
    render(<Pill>Premier League</Pill>);

    const pill = screen.getByRole("button", { name: "Premier League" });
    expect(pill).toHaveAttribute("type", "button");
  });

  it("applies the active styles when active", () => {
    render(<Pill active>Todos</Pill>);

    expect(screen.getByRole("button", { name: "Todos" })).toHaveClass(
      "bg-primary",
    );
  });

  it("applies the inactive styles by default", () => {
    render(<Pill>La Liga</Pill>);

    const pill = screen.getByRole("button", { name: "La Liga" });
    expect(pill).toHaveClass("bg-surface");
    expect(pill).not.toHaveClass("bg-primary");
  });

  it("forwards aria attributes and click handlers", () => {
    const onClick = vi.fn();
    render(
      <Pill aria-pressed={true} onClick={onClick}>
        Serie A
      </Pill>,
    );

    const pill = screen.getByRole("button", { name: "Serie A" });
    expect(pill).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(pill);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
