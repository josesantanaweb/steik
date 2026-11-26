import { describe, expect, it } from "vitest";
import { ALL_LEAGUES, TeamsTab, type Team } from "../types";
import { filterTeams } from "./filter-teams";

const teams: Team[] = [
  {
    id: "real-madrid",
    name: "Real Madrid",
    league: { id: "la-liga", name: "La Liga" },
    logo: "",
  },
  {
    id: "arsenal",
    name: "Arsenal",
    league: { id: "premier-league", name: "Premier League" },
    logo: "",
  },
  {
    id: "roma",
    name: "Roma",
    league: { id: "serie-a", name: "Serie A" },
    logo: "",
  },
];

describe("filterTeams", () => {
  it("returns every team for the ALL league and ALL tab", () => {
    const result = filterTeams(teams, {
      league: ALL_LEAGUES,
      tab: TeamsTab.ALL,
      favoriteIds: new Set(),
    });

    expect(result).toHaveLength(3);
  });

  it("filters by league id", () => {
    const result = filterTeams(teams, {
      league: "la-liga",
      tab: TeamsTab.ALL,
      favoriteIds: new Set(),
    });

    expect(result.map((team) => team.id)).toEqual(["real-madrid"]);
  });

  it("returns only favorites on the FAVORITES tab", () => {
    const result = filterTeams(teams, {
      league: ALL_LEAGUES,
      tab: TeamsTab.FAVORITES,
      favoriteIds: new Set(["arsenal", "roma"]),
    });

    expect(result.map((team) => team.id)).toEqual(["arsenal", "roma"]);
  });

  it("returns nothing on the FAVORITES tab when there are no favorites", () => {
    const result = filterTeams(teams, {
      league: ALL_LEAGUES,
      tab: TeamsTab.FAVORITES,
      favoriteIds: new Set(),
    });

    expect(result).toEqual([]);
  });

  it("combines the league and favorites filters", () => {
    const result = filterTeams(teams, {
      league: "premier-league",
      tab: TeamsTab.FAVORITES,
      favoriteIds: new Set(["real-madrid", "arsenal"]),
    });

    expect(result.map((team) => team.id)).toEqual(["arsenal"]);
  });

  it("filters by name ignoring case and accents", () => {
    const result = filterTeams(
      [
        ...teams,
        {
          id: "atletico",
          name: "Atlético de Madrid",
          league: { id: "la-liga", name: "La Liga" },
          logo: "",
        },
      ],
      {
        league: ALL_LEAGUES,
        tab: TeamsTab.ALL,
        favoriteIds: new Set(),
        query: "ATLETICO",
      },
    );

    expect(result.map((team) => team.id)).toEqual(["atletico"]);
  });

  it("returns every team when the query is blank", () => {
    const result = filterTeams(teams, {
      league: ALL_LEAGUES,
      tab: TeamsTab.ALL,
      favoriteIds: new Set(),
      query: "   ",
    });

    expect(result).toHaveLength(3);
  });

  it("combines the name query with the league filter", () => {
    const result = filterTeams(teams, {
      league: "serie-a",
      tab: TeamsTab.ALL,
      favoriteIds: new Set(),
      query: "real",
    });

    expect(result).toEqual([]);
  });
});
