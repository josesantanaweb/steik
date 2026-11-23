import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { getFakeUpcomingMatches } from "@/modules/matches/utils";
import { UpcomingMatchCard } from "./upcoming-match-card";

const match = getFakeUpcomingMatches()[0];

describe("UpcomingMatchCard", () => {
  it("renders the competition and both teams", () => {
    render(
      <UpcomingMatchCard
        match={match}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
      />,
    );

    expect(screen.getByText("La Liga")).toBeInTheDocument();
    expect(screen.getByText("Real Madrid")).toBeInTheDocument();
    expect(screen.getByText("Roma")).toBeInTheDocument();
  });

  it("renders the three odds", () => {
    render(
      <UpcomingMatchCard
        match={match}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Cuota 1: 1.85" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cuota X: 3.40" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cuota 2: 4.20" }),
    ).toBeInTheDocument();
  });

  it("reflects the favorite state", () => {
    render(
      <UpcomingMatchCard match={match} isFavorite onToggleFavorite={vi.fn()} />,
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
      <UpcomingMatchCard
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
