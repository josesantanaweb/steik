import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { RecommendedMarket } from "./recommended-market";

const props = {
  market: "Más 1.5 goles",
  confidence: 78,
  description:
    "El equipo tiene un 78% de probabilidad de que el partido tenga más de 1.5 goles.",
};

describe("RecommendedMarket", () => {
  it("renders the default title", () => {
    render(<RecommendedMarket {...props} />);

    expect(
      screen.getByRole("heading", { name: "Mercado recomendado" }),
    ).toBeInTheDocument();
  });

  it("accepts a custom title", () => {
    render(<RecommendedMarket {...props} title="Mercado sugerido" />);

    expect(
      screen.getByRole("heading", { name: "Mercado sugerido" }),
    ).toBeInTheDocument();
  });

  it("renders the market and its confidence", () => {
    render(<RecommendedMarket {...props} />);

    expect(screen.getByText("Más 1.5 goles")).toBeInTheDocument();
    expect(screen.getByText("78%")).toBeInTheDocument();
    expect(screen.getByText("Confianza")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<RecommendedMarket {...props} />);

    expect(screen.getByText(props.description)).toBeInTheDocument();
  });
});
