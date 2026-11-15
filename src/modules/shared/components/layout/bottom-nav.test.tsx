import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ROUTES } from "@/constants";
import { BottomNav } from "./bottom-nav";

const { usePathnameMock } = vi.hoisted(() => ({
  usePathnameMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: usePathnameMock,
}));

const renderAt = (pathname: string): void => {
  usePathnameMock.mockReturnValue(pathname);
  render(<BottomNav />);
};

describe("BottomNav", () => {
  beforeEach(() => {
    usePathnameMock.mockReset();
  });

  it("renders the main navigation landmark", () => {
    renderAt(ROUTES.HOME);

    expect(
      screen.getByRole("navigation", { name: "Navegación principal" })
    ).toBeInTheDocument();
  });

  it("renders one link per item with the correct href", () => {
    renderAt(ROUTES.HOME);

    const list = screen.getByRole("list");
    const links = within(list).getAllByRole("link");

    expect(links).toHaveLength(5);
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      ROUTES.HOME,
      ROUTES.TEAMS,
      ROUTES.NEW_BET,
      ROUTES.MATCHES,
      ROUTES.HISTORY,
    ]);
  });

  it("shows visible labels for the regular items", () => {
    renderAt(ROUTES.HOME);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Equipos")).toBeInTheDocument();
    expect(screen.getByText("Partidos")).toBeInTheDocument();
    expect(screen.getByText("Historial")).toBeInTheDocument();
  });

  it("labels the center button for assistive technology", () => {
    renderAt(ROUTES.HOME);

    expect(
      screen.getByRole("link", { name: "Nueva apuesta" })
    ).toHaveAttribute("href", ROUTES.NEW_BET);
  });

  it("marks the home link as current only on the root route", () => {
    renderAt(ROUTES.HOME);

    expect(screen.getByRole("link", { name: /Dashboard/ })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("link", { name: /Equipos/ })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("marks the matching item as current on a nested route", () => {
    renderAt(`${ROUTES.TEAMS}/42`);

    expect(screen.getByRole("link", { name: /Equipos/ })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("link", { name: /Dashboard/ })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("highlights the active regular item with the primary color", () => {
    renderAt(ROUTES.HISTORY);

    expect(screen.getByRole("link", { name: /Historial/ })).toHaveClass(
      "text-primary"
    );
    expect(screen.getByRole("link", { name: /Partidos/ })).toHaveClass(
      "text-body"
    );
  });

  it("marks the center button as current on its own route", () => {
    renderAt(ROUTES.NEW_BET);

    expect(
      screen.getByRole("link", { name: "Nueva apuesta" })
    ).toHaveAttribute("aria-current", "page");
  });
});
