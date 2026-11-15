import { describe, expect, it } from "vitest";
import { isTeamsTab, TeamsTab } from "./types";

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
