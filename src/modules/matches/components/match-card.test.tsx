import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ROUTES } from "@/constants";
import { MATCH_LEAGUE_LOGOS } from "@/modules/matches/types";
import { getFakeMatches } from "@/modules/matches/utils";
import { MatchCard } from "./match-card";

const match = getFakeMatches()[0];

describe("MatchCard", () => {
  it("renders both teams, the kickoff time and date", () => {
    render(
      <MatchCard match={match} isFavorite={false} onToggleFavorite={vi.fn()} />,
    );

    expect(screen.getByText("Real Madrid")).toBeInTheDocument();
    expect(screen.getByText("Roma")).toBeInTheDocument();
    expect(screen.getByText("09:00 AM")).toBeInTheDocument();
    expect(screen.getByText("28 Apr")).toBeInTheDocument();
  });

  it("renders the three odds with their labels", () => {
    render(
      <MatchCard match={match} isFavorite={false} onToggleFavorite={vi.fn()} />,
    );

    expect(
      screen.getByRole("button", { name: "Cuota 1: 2.10" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cuota X: 2.00" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cuota 2: 1.60" }),
    ).toBeInTheDocument();
  });

  it("shows the league logo for the match league", () => {
    render(
      <MatchCard match={match} isFavorite={false} onToggleFavorite={vi.fn()} />,
    );

    expect(screen.getByRole("img", { name: match.competition })).toHaveAttribute(
      "src",
      MATCH_LEAGUE_LOGOS[match.league],
    );
  });

  it("falls back to the trophy icon when the league logo fails to load", () => {
    render(
      <MatchCard match={match} isFavorite={false} onToggleFavorite={vi.fn()} />,
    );

    fireEvent.error(screen.getByRole("img", { name: match.competition }));

    expect(
      screen.queryByRole("img", { name: match.competition }),
    ).not.toBeInTheDocument();
    expect(screen.getByText(match.competition)).toBeInTheDocument();
  });

  it("links to the match detail page", () => {
    render(
      <MatchCard match={match} isFavorite={false} onToggleFavorite={vi.fn()} />,
    );

    expect(
      screen.getByRole("link", { name: "Ver detalle de Real Madrid vs Roma" }),
    ).toHaveAttribute("href", ROUTES.MATCH_DETAIL(match.id));
  });

  it("reflects the favorite state", () => {
    render(
      <MatchCard match={match} isFavorite onToggleFavorite={vi.fn()} />,
    );

    expect(
      screen.getByRole("button", {
        name: "Quitar Real Madrid vs Roma de favoritos",
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onToggleFavorite with the match id", () => {
    const onToggleFavorite = vi.fn();
    render(
      <MatchCard
        match={match}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Marcar Real Madrid vs Roma como favorito",
      }),
    );

    expect(onToggleFavorite).toHaveBeenCalledWith(match.id);
  });
});
