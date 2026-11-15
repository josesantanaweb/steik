import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./header";

describe("Header", () => {
  it("renders the header landmark with the logo link", () => {
    render(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Ir al inicio" }),
    ).toBeInTheDocument();
  });

  it("shows the balance with its sign", () => {
    render(<Header balance={100} />);

    expect(screen.getByText("+$100.00")).toBeInTheDocument();
  });

  it("defaults the balance to zero", () => {
    render(<Header />);

    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });
});
