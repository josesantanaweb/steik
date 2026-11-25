import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OddsButton } from "./odds-button";

const defaultProps = {
  ariaLabel: "Posesión: 65%",
  label: "Posesión",
  value: "65%",
};

describe("OddsButton", () => {
  it("renders the option and calls onClick", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <OddsButton {...defaultProps} isSelected={false} onClick={onClick} />,
    );

    const button = screen.getByRole("button", { name: "Posesión: 65%" });
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText("Posesión")).toBeInTheDocument();
    expect(screen.getByText("65%")).toBeInTheDocument();

    await user.click(button);

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("marks the option as pressed when selected", () => {
    render(<OddsButton {...defaultProps} isSelected onClick={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: "Posesión: 65%" }),
    ).toHaveAttribute("aria-pressed", "true");
  });
});
