import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { FavoriteButton } from "./favorite-button";

describe("FavoriteButton", () => {
  it("labels the action as add when not favorite", () => {
    render(
      <FavoriteButton name="Roma" isFavorite={false} onToggle={vi.fn()} />,
    );

    expect(
      screen.getByRole("button", { name: "Marcar Roma como favorito" }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("labels the action as remove when favorite", () => {
    render(<FavoriteButton name="Roma" isFavorite onToggle={vi.fn()} />);

    const button = screen.getByRole("button", {
      name: "Quitar Roma de favoritos",
    });
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button.querySelector("svg")).toHaveClass("fill-primary");
  });

  it("calls onToggle when clicked", () => {
    const onToggle = vi.fn();
    render(
      <FavoriteButton name="Roma" isFavorite={false} onToggle={onToggle} />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Marcar Roma como favorito" }),
    );

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
