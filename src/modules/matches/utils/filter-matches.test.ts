import { describe, expect, it } from "vitest";
import { MatchLeague, type Match } from "@/modules/matches/types";
import { getFakeMatches } from "./get-fake-matches";
import { filterMatches } from "./filter-matches";

describe("filterMatches", () => {
  const [base] = getFakeMatches();
  const matches: Match[] = [
    { ...base, id: "pl-1", league: "PREMIER_LEAGUE" },
    { ...base, id: "liga-1", league: "LA_LIGA" },
    { ...base, id: "liga-2", league: "LA_LIGA" },
  ];

  it("returns every match when the league is ALL", () => {
    expect(filterMatches(matches, MatchLeague.ALL)).toHaveLength(matches.length);
  });

  it("returns only the matches of the selected league", () => {
    const result = filterMatches(matches, MatchLeague.LA_LIGA);

    expect(result.map((match) => match.id)).toEqual(["liga-1", "liga-2"]);
  });

  it("returns an empty list when no match belongs to the league", () => {
    expect(filterMatches(matches, MatchLeague.LIGUE_1)).toEqual([]);
  });
});
