import { describe, expect, it } from "vitest";
import { isTeamsTab, TEAM_STATISTICS, TeamsTab } from "./types";

describe("isTeamsTab", () => {
  it("accepts known tab keys", () => {
    expect(isTeamsTab(TeamsTab.ALL)).toBe(true);
    expect(isTeamsTab(TeamsTab.FAVORITES)).toBe(true);
  });

  it("rejects unknown keys", () => {
    expect(isTeamsTab("PREMIER")).toBe(false);
    expect(isTeamsTab("")).toBe(false);
  });
});

describe("TEAM_STATISTICS", () => {
  it("defines at least one stat with a unique key", () => {
    expect(TEAM_STATISTICS.length).toBeGreaterThan(0);

    const keys = TEAM_STATISTICS.map((stat) => stat.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("keeps every bar percentage between 0 and 100", () => {
    for (const stat of TEAM_STATISTICS) {
      expect(stat.percentage).toBeGreaterThanOrEqual(0);
      expect(stat.percentage).toBeLessThanOrEqual(100);
    }
  });
});
