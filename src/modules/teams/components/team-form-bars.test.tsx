import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormResult } from "@/modules/teams/types";
import { TeamFormBars } from "./team-form-bars";

describe("TeamFormBars", () => {
  it("renders one bar per result", () => {
    const { container } = render(
      <TeamFormBars
        results={[FormResult.WIN, FormResult.LOSS, FormResult.WIN]}
      />,
    );

    expect(container.querySelectorAll("span")).toHaveLength(3);
  });

  it("colors wins with success and losses with error", () => {
    const { container } = render(
      <TeamFormBars results={[FormResult.WIN, FormResult.LOSS]} />,
    );

    const [win, loss] = Array.from(container.querySelectorAll("span"));
    expect(win).toHaveClass("bg-success");
    expect(loss).toHaveClass("bg-error");
  });

  it("exposes a summary label with the number of wins", () => {
    render(
      <TeamFormBars
        results={[FormResult.WIN, FormResult.LOSS, FormResult.WIN]}
      />,
    );

    expect(
      screen.getByRole("img", {
        name: "Últimos 3 partidos: 2 victorias",
      }),
    ).toBeInTheDocument();
  });
});
