import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Balance } from "./balance";

describe("Balance", () => {
  it("shows a positive amount with a plus sign", () => {
    render(<Balance amount={100} />);

    expect(screen.getByText("+$100.00")).toBeInTheDocument();
  });

  it("shows a negative amount with a minus sign in the error color", () => {
    render(<Balance amount={-25} />);

    const amount = screen.getByText("-$25.00");
    expect(amount).toBeInTheDocument();
    expect(amount).toHaveClass("text-error");
  });

  it("renders the add button with an accessible name", () => {
    render(<Balance amount={0} />);

    expect(
      screen.getByRole("button", { name: "Añadir movimiento" }),
    ).toBeInTheDocument();
  });

  it("calls onAdd when the add button is clicked", () => {
    const onAdd = vi.fn();
    render(<Balance amount={100} onAdd={onAdd} />);

    fireEvent.click(screen.getByRole("button", { name: "Añadir movimiento" }));

    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});
