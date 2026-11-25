import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formatKickoffTime, getFakeMatches } from "@/modules/matches/utils";
import { MatchDetailCard } from "./match-detail-card";

const match = getFakeMatches()[0];

const renderMatchDetailCard = (
  isFavorite = false,
  onToggleFavorite = vi.fn(),
) =>
  render(
    <MatchDetailCard
      match={match}
      isFavorite={isFavorite}
      onToggleFavorite={onToggleFavorite}
    />,
  );

describe("MatchDetailCard", () => {
  it("renders the competition, teams, kickoff and venue", () => {
    renderMatchDetailCard();

    expect(screen.getByText(match.competition)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: match.homeTeam.name }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: match.awayTeam.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(formatKickoffTime(match.kickoff))).toHaveAttribute(
      "datetime",
      match.kickoff,
    );
    expect(screen.getByText("30 April 2026 - 09:00 A M")).toBeInTheDocument();
    expect(screen.getByText("Santiago Bernabeu")).toBeInTheDocument();
  });

  it("marks the match as favorite", () => {
    renderMatchDetailCard(true);

    expect(
      screen.getByRole("button", {
        name: `Quitar ${match.homeTeam.name} vs ${match.awayTeam.name} de favoritos`,
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onToggleFavorite with the match id", async () => {
    const user = userEvent.setup();
    const onToggleFavorite = vi.fn();
    renderMatchDetailCard(false, onToggleFavorite);

    await user.click(
      screen.getByRole("button", {
        name: `Marcar ${match.homeTeam.name} vs ${match.awayTeam.name} como favorito`,
      }),
    );

    expect(onToggleFavorite).toHaveBeenCalledExactlyOnceWith(match.id);
  });
});
