import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Team } from "@/modules/teams/types";
import { TeamList } from "./team-list";

const teams: Team[] = [
  { id: "arsenal", name: "Arsenal", league: { id: "premier-league", name: "Premier League" }, logo: "" },
  { id: "roma", name: "Roma", league: { id: "serie-a", name: "Serie A" }, logo: "" },
];

describe("TeamList", () => {
  it("renders one card per team", () => {
    render(
      <TeamList
        teams={teams}
        favoriteIds={new Set()}
        onToggleFavorite={vi.fn()}
      />,
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Roma" })).toBeInTheDocument();
  });

  it("shows an empty state when there are no teams", () => {
    render(
      <TeamList
        teams={[]}
        favoriteIds={new Set()}
        onToggleFavorite={vi.fn()}
      />,
    );

    expect(
      screen.getByText("No hay equipos para este filtro."),
    ).toBeInTheDocument();
  });

  it("marks favorite teams as favorite", () => {
    render(
      <TeamList
        teams={teams}
        favoriteIds={new Set(["roma"])}
        onToggleFavorite={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Quitar Roma de favoritos" }),
    ).toBeInTheDocument();
  });
});
