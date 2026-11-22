import { MatchLeague, type Match } from "@/modules/matches/types";

export const filterMatches = (
  matches: Match[],
  league: MatchLeague,
): Match[] =>
  league === MatchLeague.ALL
    ? matches
    : matches.filter((match) => match.league === league);
