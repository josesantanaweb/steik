import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PageTitle } from "./page-title";

const { back } = vi.hoisted(() => ({ back: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back }),
}));

describe("PageTitle", () => {
  it("renders the title as a level 1 heading", () => {
    render(<PageTitle title="Historial" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Historial" }),
    ).toBeInTheDocument();
  });

  it("does not render the back button by default", () => {
    render(<PageTitle title="Historial" />);

    expect(
      screen.queryByRole("button", { name: "Volver" }),
    ).not.toBeInTheDocument();
  });

  it("renders the back button and navigates back when showBackButton is set", () => {
    render(<PageTitle title="Nueva apuesta" showBackButton />);

    fireEvent.click(screen.getByRole("button", { name: "Volver" }));

    expect(back).toHaveBeenCalledTimes(1);
  });

  it("renders the action slot", () => {
    render(
      <PageTitle title="Equipos" action={<button type="button">Buscar</button>} />,
    );

    expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();
  });

  it("forwards extra props to the root element", () => {
    render(<PageTitle title="Partidos" data-testid="page-title" inert />);

    expect(screen.getByTestId("page-title")).toHaveAttribute("inert");
  });
});
