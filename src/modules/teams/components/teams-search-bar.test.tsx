import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TeamsSearchBar } from "./teams-search-bar";

describe("TeamsSearchBar", () => {
  it("is inert and hidden while closed", () => {
    const { container } = render(
      <TeamsSearchBar
        isOpen={false}
        value=""
        onValueChange={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(container.firstElementChild).toHaveAttribute("inert");
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("is interactive when open", () => {
    const { container } = render(
      <TeamsSearchBar
        isOpen
        value=""
        onValueChange={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(container.firstElementChild).not.toHaveAttribute("inert");
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "false");
  });

  it("focuses the input when it opens", () => {
    const { rerender } = render(
      <TeamsSearchBar
        isOpen={false}
        value=""
        onValueChange={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    rerender(
      <TeamsSearchBar
        isOpen
        value=""
        onValueChange={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("searchbox", { name: "Buscar equipos" }),
    ).toHaveFocus();
  });

  it("uses the team placeholder by default", () => {
    render(
      <TeamsSearchBar
        isOpen
        value=""
        onValueChange={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByPlaceholderText("Buscar equipo")).toBeInTheDocument();
  });

  it("reports changes through onValueChange", () => {
    const onValueChange = vi.fn();
    render(
      <TeamsSearchBar
        isOpen
        value=""
        onValueChange={onValueChange}
        onClose={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "real" },
    });

    expect(onValueChange).toHaveBeenCalledWith("real");
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = vi.fn();
    render(
      <TeamsSearchBar
        isOpen
        value=""
        onValueChange={vi.fn()}
        onClose={onClose}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Cerrar búsqueda" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn();
    render(
      <TeamsSearchBar
        isOpen
        value=""
        onValueChange={vi.fn()}
        onClose={onClose}
      />,
    );

    fireEvent.keyDown(screen.getByRole("searchbox"), { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
