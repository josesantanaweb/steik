import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { getFakeMatches } from "@/modules/matches/utils";
import { MatchList } from "./match-list";

describe("MatchList", () => {
  it("renders one card per match", () => {
    const matches = getFakeMatches();
    render(
      <MatchList
        matches={matches}
        favoriteIds={new Set()}
        onToggleFavorite={vi.fn()}
      />,
    );

    expect(screen.getAllByRole("article")).toHaveLength(matches.length);
  });

  it("shows an empty state when there are no matches", () => {
    render(
      <MatchList matches={[]} favoriteIds={new Set()} onToggleFavorite={vi.fn()} />,
    );

    expect(
      screen.getByText("No hay partidos para esta liga."),
    ).toBeInTheDocument();
  });
});
