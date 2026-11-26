import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import type { Team } from "@/modules/teams/types";
import { TeamDetailCard } from "./team-detail-card";

const team: Team = {
  id: "real-madrid",
  name: "Real Madrid",
  league: { id: "la-liga", name: "La Liga" },
  logo: "/images/teams/real-madrid.png",
};

describe("TeamDetailCard", () => {
  it("renders the team name and its league label", () => {
    render(
      <TeamDetailCard
        team={team}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Real Madrid" }),
    ).toBeInTheDocument();
    expect(screen.getByText("La Liga")).toBeInTheDocument();
  });

  it("shows the team logo image", () => {
    render(
      <TeamDetailCard
        team={team}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
      />,
    );

    expect(screen.getByRole("img", { name: "Real Madrid" })).toHaveAttribute(
      "src",
      "/images/teams/real-madrid.png",
    );
  });

  it("shows the league logo when provided", () => {
    render(
      <TeamDetailCard
        team={team}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
        leagueLogo="/images/leagues/la-liga.png"
      />,
    );

    expect(screen.getByRole("img", { name: "La Liga" })).toHaveAttribute(
      "src",
      "/images/leagues/la-liga.png",
    );
  });

  it("offers to add the team to favorites when not favorite", () => {
    render(
      <TeamDetailCard
        team={team}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Marcar Real Madrid como favorito" }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("offers to remove the team from favorites when favorite", () => {
    render(
      <TeamDetailCard team={team} isFavorite onToggleFavorite={vi.fn()} />,
    );

    expect(
      screen.getByRole("button", { name: "Quitar Real Madrid de favoritos" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onToggleFavorite with the team id when the star is clicked", () => {
    const onToggleFavorite = vi.fn();
    render(
      <TeamDetailCard
        team={team}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Marcar Real Madrid como favorito" }),
    );

    expect(onToggleFavorite).toHaveBeenCalledWith("real-madrid");
  });
});
