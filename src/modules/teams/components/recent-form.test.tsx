import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormResult } from "@/modules/teams/types";
import { FormBadge, RecentForm } from "./recent-form";

describe("FormBadge", () => {
  it("renders a win with success colors and a Spanish label", () => {
    render(<FormBadge result={FormResult.WIN} />);

    const badge = screen.getByRole("img", { name: "Ganada" });
    expect(badge).toHaveClass("text-success", "border-success", "bg-success/10");
    expect(badge).toHaveTextContent("G");
  });

  it("renders a loss with error colors and a Spanish label", () => {
    render(<FormBadge result={FormResult.LOSS} />);

    const badge = screen.getByRole("img", { name: "Perdida" });
    expect(badge).toHaveClass("text-error", "border-error", "bg-error/10");
    expect(badge).toHaveTextContent("P");
  });

  it("renders a draw with stroke colors and a Spanish label", () => {
    render(<FormBadge result={FormResult.DRAW} />);

    const badge = screen.getByRole("img", { name: "Empate" });
    expect(badge).toHaveClass("border-stroke", "bg-surface");
    expect(badge).toHaveTextContent("E");
  });
});

describe("RecentForm", () => {
  it("renders the default title", () => {
    render(<RecentForm results={[FormResult.WIN]} />);

    expect(
      screen.getByRole("heading", { name: "Forma reciente" }),
    ).toBeInTheDocument();
  });

  it("accepts a custom title", () => {
    render(<RecentForm results={[FormResult.WIN]} title="Últimos partidos" />);

    expect(
      screen.getByRole("heading", { name: "Últimos partidos" }),
    ).toBeInTheDocument();
  });

  it("renders one badge per result", () => {
    render(
      <RecentForm
        results={[FormResult.WIN, FormResult.DRAW, FormResult.LOSS]}
      />,
    );

    expect(screen.getByRole("img", { name: "Ganada" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Empate" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Perdida" })).toBeInTheDocument();
  });
});
