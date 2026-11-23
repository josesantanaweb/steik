import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import type { TeamStat } from "@/modules/teams/types";
import { TeamStatistics } from "./team-statistics";

const stats: TeamStat[] = [
  { key: "possession", label: "Posesión", value: 62, suffix: "%", percentage: 62 },
  { key: "fouls", label: "Faltas", value: 12.4, percentage: 62 },
];

describe("TeamStatistics", () => {
  it("renders the default title", () => {
    render(<TeamStatistics stats={stats} />);

    expect(
      screen.getByRole("heading", { name: "Estadísticas" }),
    ).toBeInTheDocument();
  });

  it("accepts a custom title", () => {
    render(<TeamStatistics stats={stats} title="Datos del equipo" />);

    expect(
      screen.getByRole("heading", { name: "Datos del equipo" }),
    ).toBeInTheDocument();
  });

  it("renders every stat label and formatted value", () => {
    render(<TeamStatistics stats={stats} />);

    expect(screen.getByText("Posesión")).toBeInTheDocument();
    expect(screen.getByText("62%")).toBeInTheDocument();
    expect(screen.getByText("Faltas")).toBeInTheDocument();
    expect(screen.getByText("12.4")).toBeInTheDocument();
  });

  it("renders a progress bar per stat", () => {
    render(<TeamStatistics stats={stats} />);

    expect(
      screen.getByRole("progressbar", { name: "Posesión" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("progressbar", { name: "Faltas" }),
    ).toBeInTheDocument();
  });
});
