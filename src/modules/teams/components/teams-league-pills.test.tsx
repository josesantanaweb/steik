import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TeamsLeague } from "@/modules/teams/types";
import { TeamsLeaguePills } from "./teams-league-pills";

describe("TeamsLeaguePills", () => {
  it("renders the filter button", () => {
    render(
      <TeamsLeaguePills
        activeLeague={TeamsLeague.ALL}
        onLeagueChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Filtros" })).toBeInTheDocument();
  });

  it("renders one pill per league", () => {
    render(
      <TeamsLeaguePills
        activeLeague={TeamsLeague.ALL}
        onLeagueChange={vi.fn()}
      />,
    );

    for (const label of [
      "Todos",
      "Premier League",
      "La Liga",
      "Serie A",
      "Bundesliga",
      "Ligue 1",
    ]) {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    }
  });

  it("marks only the active league as pressed", () => {
    render(
      <TeamsLeaguePills
        activeLeague={TeamsLeague.LA_LIGA}
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

  it("calls onLeagueChange with the selected league", () => {
    const onLeagueChange = vi.fn();
    render(
      <TeamsLeaguePills
        activeLeague={TeamsLeague.ALL}
        onLeagueChange={onLeagueChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Bundesliga" }));

    expect(onLeagueChange).toHaveBeenCalledWith(TeamsLeague.BUNDESLIGA);
  });

  it("calls onFilterClick when the filter button is clicked", () => {
    const onFilterClick = vi.fn();
    render(
      <TeamsLeaguePills
        activeLeague={TeamsLeague.ALL}
        onLeagueChange={vi.fn()}
        onFilterClick={onFilterClick}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Filtros" }));

    expect(onFilterClick).toHaveBeenCalledTimes(1);
  });
});
