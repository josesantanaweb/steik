import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MatchMarkets } from "./match-markets";

const odds = { home: 2.1, draw: 2, away: 1.5 };
const homeTeamName = "Real Madrid";
const awayTeamName = "Roma";

const renderMatchMarkets = () =>
  render(
    <MatchMarkets
      odds={odds}
      homeTeamName={homeTeamName}
      awayTeamName={awayTeamName}
    />,
  );

describe("MatchMarkets", () => {
  it("renders every market and its options", () => {
    renderMatchMarkets();

    expect(
      screen.getByRole("heading", { name: "Mercados" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Resultado final (1X2)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Doble oportunidad" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Equipo gana al menos 1 mitad" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Total de goles" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Total de goles (Real Madrid)",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Total de goles (Roma)",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Resultado final (1X2), 1: 2.10" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByText(/2\.5 Goles/)).toHaveLength(2);
    expect(screen.getAllByText(/0\.5 Goles/)).toHaveLength(4);
    const totalGoalsOption = screen.getByRole("button", {
      name: "Total de goles, Más de 2.5 Goles: 1.90",
    });
    expect(totalGoalsOption).toBeInTheDocument();
    expect(totalGoalsOption.querySelectorAll("span")).toHaveLength(2);
    expect(
      screen.getByRole("button", {
        name: "Total de goles (Real Madrid), Menos de 0.5 Goles: 6.00",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Total de goles (Roma), Más de 0.5 Goles: 1.08",
      }),
    ).toBeInTheDocument();
  });

  it("selects and deselects an option within its market", async () => {
    const user = userEvent.setup();
    renderMatchMarkets();

    const option = screen.getByRole("button", {
      name: "Doble oportunidad, 1X: 2.10",
    });

    expect(option).toHaveAttribute("aria-pressed", "false");

    await user.click(option);
    expect(option).toHaveAttribute("aria-pressed", "true");

    await user.click(option);
    expect(option).toHaveAttribute("aria-pressed", "false");
  });

  it("keeps selections independent across goal markets", async () => {
    const user = userEvent.setup();
    renderMatchMarkets();

    const matchGoals = screen.getByRole("button", {
      name: "Total de goles, Más de 2.5 Goles: 1.90",
    });
    const homeGoals = screen.getByRole("button", {
      name: "Total de goles (Real Madrid), Más de 0.5 Goles: 1.10",
    });
    const awayGoals = screen.getByRole("button", {
      name: "Total de goles (Roma), Menos de 0.5 Goles: 7.00",
    });

    await user.click(matchGoals);
    await user.click(homeGoals);
    await user.click(awayGoals);

    expect(matchGoals).toHaveAttribute("aria-pressed", "true");
    expect(homeGoals).toHaveAttribute("aria-pressed", "true");
    expect(awayGoals).toHaveAttribute("aria-pressed", "true");
  });

  it("changes the selected option without affecting other markets", async () => {
    const user = userEvent.setup();
    renderMatchMarkets();

    const home = screen.getByRole("button", {
      name: "Resultado final (1X2), 1: 2.10",
    });
    const draw = screen.getByRole("button", {
      name: "Resultado final (1X2), X: 2.00",
    });
    const doubleChance = screen.getByRole("button", {
      name: "Doble oportunidad, 1X: 2.10",
    });

    await user.click(draw);

    expect(home).toHaveAttribute("aria-pressed", "false");
    expect(draw).toHaveAttribute("aria-pressed", "true");
    expect(doubleChance).toHaveAttribute("aria-pressed", "false");
  });
});
