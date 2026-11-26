import { describe, expect, it } from "vitest";
import { getTeamLogoUrl } from "./get-team-logo-url";

describe("getTeamLogoUrl", () => {
  it("maps a filename to the public teams directory", () => {
    expect(getTeamLogoUrl("arsenal.png")).toBe("/images/teams/arsenal.png");
  });

  it("preserves an existing public path", () => {
    expect(getTeamLogoUrl("/images/teams/roma.png")).toBe(
      "/images/teams/roma.png",
    );
  });

  it("preserves an external URL", () => {
    expect(getTeamLogoUrl("https://example.com/team.png")).toBe(
      "https://example.com/team.png",
    );
  });

  it("returns an empty value when the team has no logo", () => {
    expect(getTeamLogoUrl(null)).toBe("");
  });
});
