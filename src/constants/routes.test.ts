import { describe, expect, it } from "vitest";
import { API_ROUTES, ROUTES } from "./routes";

describe("ROUTES", () => {
  it("builds the team detail route", () => {
    expect(ROUTES.TEAM_DETAIL("real-madrid")).toBe("/teams/real-madrid");
  });

  it("builds the match detail route", () => {
    expect(ROUTES.MATCH_DETAIL("rm-roma")).toBe("/matches/rm-roma");
  });

  it("builds the resource API routes", () => {
    expect(API_ROUTES.LEAGUE_DETAIL("league-1")).toBe("/api/leagues/league-1");
    expect(API_ROUTES.TEAM_DETAIL("team-1")).toBe("/api/teams/team-1");
    expect(API_ROUTES.MATCH_DETAIL("match-1")).toBe("/api/matches/match-1");
  });
});
