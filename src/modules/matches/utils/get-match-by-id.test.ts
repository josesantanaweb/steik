import { describe, expect, it } from "vitest";
import { getFakeMatches, getFakeUpcomingMatches } from "./get-fake-matches";
import { getMatchById } from "./get-match-by-id";

describe("getMatchById", () => {
  it("finds a match from the main list", () => {
    const expected = getFakeMatches()[0];

    expect(getMatchById(expected.id)).toEqual(expected);
  });

  it("finds an upcoming match", () => {
    const expected = getFakeUpcomingMatches()[0];

    expect(getMatchById(expected.id)).toEqual(expected);
  });

  it("returns undefined when the match does not exist", () => {
    expect(getMatchById("missing-match")).toBeUndefined();
  });
});
