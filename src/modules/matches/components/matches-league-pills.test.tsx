import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MatchLeague } from "@/modules/matches/types";
import { MatchesLeaguePills } from "./matches-league-pills";

describe("MatchesLeaguePills", () => {
  it("renders a pill for every league", () => {
    render(
      <MatchesLeaguePills
        activeLeague={MatchLeague.ALL}
        onLeagueChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Todos" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Premier League" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "La Liga" })).toBeInTheDocument();
  });

  it("marks only the active league as pressed", () => {
    render(
      <MatchesLeaguePills
        activeLeague={MatchLeague.LA_LIGA}
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

  it("calls onLeagueChange with the league key when a pill is clicked", () => {
    const onLeagueChange = vi.fn();
    render(
      <MatchesLeaguePills
        activeLeague={MatchLeague.ALL}
        onLeagueChange={onLeagueChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Premier League" }));

    expect(onLeagueChange).toHaveBeenCalledWith(MatchLeague.PREMIER_LEAGUE);
  });

  it("calls onFilterClick when the filter button is clicked", () => {
    const onFilterClick = vi.fn();
    render(
      <MatchesLeaguePills
        activeLeague={MatchLeague.ALL}
        onLeagueChange={vi.fn()}
        onFilterClick={onFilterClick}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Filtros" }));

    expect(onFilterClick).toHaveBeenCalledTimes(1);
  });
});
