import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TeamsTitleBar } from "./teams-title-bar";

describe("TeamsTitleBar", () => {
  it("renders the default title as a heading", () => {
    render(<TeamsTitleBar />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Lista de equipos" }),
    ).toBeInTheDocument();
  });

  it("renders a custom title", () => {
    render(<TeamsTitleBar title="Mis equipos" />);

    expect(
      screen.getByRole("heading", { name: "Mis equipos" }),
    ).toBeInTheDocument();
  });

  it("calls onSearchToggle when the search icon is clicked", () => {
    const onSearchToggle = vi.fn();
    render(<TeamsTitleBar onSearchToggle={onSearchToggle} />);

    fireEvent.click(screen.getByRole("button", { name: "Buscar equipos" }));

    expect(onSearchToggle).toHaveBeenCalledTimes(1);
  });

  it("hides the title row and makes it inert while the search is open", () => {
    render(<TeamsTitleBar isSearchOpen />);

    const titleRow = screen.getByRole("heading", {
      hidden: true,
    }).parentElement;
    expect(titleRow).toHaveAttribute("inert");
    expect(titleRow).toHaveAttribute("aria-hidden", "true");
  });

  it("shows the title row when the search is closed", () => {
    render(<TeamsTitleBar isSearchOpen={false} />);

    const titleRow = screen.getByRole("heading").parentElement;
    expect(titleRow).not.toHaveAttribute("inert");
  });

  it("reflects the open state with aria-expanded", () => {
    const { rerender } = render(<TeamsTitleBar isSearchOpen={false} />);

    const button = screen.getByRole("button", { name: "Buscar equipos" });
    expect(button).toHaveAttribute("aria-expanded", "false");

    rerender(<TeamsTitleBar isSearchOpen />);
    expect(
      screen.getByRole("button", { name: "Buscar equipos", hidden: true }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("shows the query in the search input", () => {
    render(<TeamsTitleBar isSearchOpen searchValue="roma" />);

    expect(screen.getByRole("searchbox")).toHaveValue("roma");
  });

  it("reports search changes through onSearchChange", () => {
    const onSearchChange = vi.fn();
    render(
      <TeamsTitleBar
        isSearchOpen
        searchValue=""
        onSearchChange={onSearchChange}
      />,
    );

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "psg" },
    });

    expect(onSearchChange).toHaveBeenCalledWith("psg");
  });

  it("closes the search through onSearchToggle when the close button is clicked", () => {
    const onSearchToggle = vi.fn();
    render(<TeamsTitleBar isSearchOpen onSearchToggle={onSearchToggle} />);

    fireEvent.click(screen.getByRole("button", { name: "Cerrar búsqueda" }));

    expect(onSearchToggle).toHaveBeenCalledTimes(1);
  });
});
