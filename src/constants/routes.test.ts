import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";

describe("ROUTES", () => {
  it("builds the team detail route", () => {
    expect(ROUTES.TEAM_DETAIL("real-madrid")).toBe("/teams/real-madrid");
  });

  it("builds the match detail route", () => {
    expect(ROUTES.MATCH_DETAIL("rm-roma")).toBe("/matches/rm-roma");
  });
});
