import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { League } from "@/modules/leagues/types";
import { ALL_LEAGUES } from "@/modules/teams/types";
import { TeamsLeaguePills } from "./teams-league-pills";

const leagues: League[] = [
  { id: "premier-league", name: "Premier League" },
  { id: "la-liga", name: "La Liga" },
  { id: "serie-a", name: "Serie A" },
];

describe("TeamsLeaguePills", () => {
  it("renders the filter button", () => {
    render(
      <TeamsLeaguePills
        leagues={leagues}
        activeLeague={ALL_LEAGUES}
        onLeagueChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Filtros" })).toBeInTheDocument();
  });

  it("renders the all option and one pill per database league", () => {
    render(
      <TeamsLeaguePills
        leagues={leagues}
        activeLeague={ALL_LEAGUES}
        onLeagueChange={vi.fn()}
      />,
    );

    for (const label of ["Todos", ...leagues.map((league) => league.name)]) {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    }
  });

  it("marks only the active league as pressed", () => {
    render(
      <TeamsLeaguePills
        leagues={leagues}
        activeLeague="la-liga"
        onLeagueChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "La Liga" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Todos" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("calls onLeagueChange with the selected league id", () => {
    const onLeagueChange = vi.fn();
    render(
      <TeamsLeaguePills
        leagues={leagues}
        activeLeague={ALL_LEAGUES}
        onLeagueChange={onLeagueChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Serie A" }));

    expect(onLeagueChange).toHaveBeenCalledWith("serie-a");
  });

  it("calls onFilterClick when the filter button is clicked", () => {
    const onFilterClick = vi.fn();
    render(
      <TeamsLeaguePills
        leagues={leagues}
        activeLeague={ALL_LEAGUES}
        onLeagueChange={vi.fn()}
        onFilterClick={onFilterClick}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Filtros" }));

    expect(onFilterClick).toHaveBeenCalledTimes(1);
  });
});
