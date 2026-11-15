import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TeamsTab } from "@/modules/teams/types";
import { TeamsHeader } from "./teams-header";

const defaultProps = {
  activeTab: TeamsTab.ALL,
  onTabChange: vi.fn(),
  isSearchOpen: false,
  onSearchToggle: vi.fn(),
  searchValue: "",
  onSearchChange: vi.fn(),
};

describe("TeamsHeader", () => {
  it("renders the title and the search button", () => {
    render(<TeamsHeader {...defaultProps} />);

    expect(
      screen.getByRole("heading", { name: "Lista de equipos" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Buscar equipos" }),
    ).toBeInTheDocument();
  });

  it("renders the Todos and Favoritos tabs", () => {
    render(<TeamsHeader {...defaultProps} />);

    expect(screen.getByRole("button", { name: "Todos" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Favoritos" }),
    ).toBeInTheDocument();
  });

  it("marks the active tab", () => {
    render(<TeamsHeader {...defaultProps} activeTab={TeamsTab.FAVORITES} />);

    expect(screen.getByRole("button", { name: "Favoritos" })).toHaveClass(
      "text-primary",
    );
    expect(screen.getByRole("button", { name: "Todos" })).toHaveClass(
      "text-body",
    );
  });

  it("calls onTabChange with the selected tab key", () => {
    const onTabChange = vi.fn();
    render(<TeamsHeader {...defaultProps} onTabChange={onTabChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Favoritos" }));

    expect(onTabChange).toHaveBeenCalledWith(TeamsTab.FAVORITES);
  });

  it("calls onSearchToggle when the search button is clicked", () => {
    const onSearchToggle = vi.fn();
    render(<TeamsHeader {...defaultProps} onSearchToggle={onSearchToggle} />);

    fireEvent.click(screen.getByRole("button", { name: "Buscar equipos" }));

    expect(onSearchToggle).toHaveBeenCalledTimes(1);
  });

  it("passes the search query down to the search input", () => {
    render(<TeamsHeader {...defaultProps} isSearchOpen searchValue="roma" />);

    expect(screen.getByRole("searchbox")).toHaveValue("roma");
  });
});
