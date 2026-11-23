import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { getFakeUpcomingMatches } from "@/modules/matches/utils";
import { UpcomingMatches } from "./upcoming-matches";

const matches = getFakeUpcomingMatches();

describe("UpcomingMatches", () => {
  it("renders the default title", () => {
    render(
      <UpcomingMatches
        matches={matches}
        favoriteIds={new Set()}
        onToggleFavorite={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Próximos juegos" }),
    ).toBeInTheDocument();
  });

  it("renders one card per match", () => {
    render(
      <UpcomingMatches
        matches={matches}
        favoriteIds={new Set()}
        onToggleFavorite={vi.fn()}
      />,
    );

    expect(screen.getAllByRole("article")).toHaveLength(matches.length);
  });

  it("shows an empty state when there are no matches", () => {
    render(
      <UpcomingMatches
        matches={[]}
        favoriteIds={new Set()}
        onToggleFavorite={vi.fn()}
      />,
    );

    expect(screen.getByText("No hay próximos partidos.")).toBeInTheDocument();
  });

  it("forwards the favorite toggle with the match id", () => {
    const onToggleFavorite = vi.fn();
    render(
      <UpcomingMatches
        matches={matches}
        favoriteIds={new Set()}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Marcar Real Madrid vs Roma como favorito",
      }),
    );

    expect(onToggleFavorite).toHaveBeenCalledWith(matches[0].id);
  });
});
