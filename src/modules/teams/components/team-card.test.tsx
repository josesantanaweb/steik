import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import type { Team } from "@/modules/teams/types";
import { TeamCard } from "./team-card";

const team: Team = {
  id: "arsenal",
  name: "Arsenal",
  league: { id: "premier-league", name: "Premier League" },
  logo: "/images/teams/arsenal.png",
};

describe("TeamCard", () => {
  it("renders the team name and its league label", () => {
    render(
      <TeamCard team={team} isFavorite={false} onToggleFavorite={vi.fn()} />,
    );

    expect(
      screen.getByRole("heading", { name: "Arsenal" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Premier League")).toBeInTheDocument();
  });

  it("shows the logo image", () => {
    render(
      <TeamCard team={team} isFavorite={false} onToggleFavorite={vi.fn()} />,
    );

    expect(screen.getByRole("img", { name: "Arsenal" })).toHaveAttribute(
      "src",
      "/images/teams/arsenal.png",
    );
  });

  it("offers to add the team to favorites when not favorite", () => {
    render(
      <TeamCard team={team} isFavorite={false} onToggleFavorite={vi.fn()} />,
    );

    expect(
      screen.getByRole("button", { name: "Marcar Arsenal como favorito" }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("offers to remove the team from favorites when favorite", () => {
    render(<TeamCard team={team} isFavorite onToggleFavorite={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: "Quitar Arsenal de favoritos" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("links to the team detail page", () => {
    render(
      <TeamCard team={team} isFavorite={false} onToggleFavorite={vi.fn()} />,
    );

    expect(
      screen.getByRole("link", { name: "Ver detalle de Arsenal" }),
    ).toHaveAttribute("href", "/teams/arsenal");
  });

  it("calls onToggleFavorite with the team id", () => {
    const onToggleFavorite = vi.fn();
    render(
      <TeamCard
        team={team}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Marcar Arsenal como favorito" }),
    );

    expect(onToggleFavorite).toHaveBeenCalledWith("arsenal");
  });
});
