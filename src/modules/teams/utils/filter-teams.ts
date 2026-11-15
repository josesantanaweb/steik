import {
  TeamsLeague,
  TeamsTab,
  type Team,
  type TeamsLeague as League,
} from "../types";
import { normalizeText } from "@/modules/shared/utils/normalize-text";

interface FilterTeamsOptions {
  league: League;
  tab: TeamsTab;
  favoriteIds: ReadonlySet<string>;
  query?: string;
}

export const filterTeams = (
  teams: Team[],
  { league, tab, favoriteIds, query = "" }: FilterTeamsOptions,
): Team[] => {
  const normalizedQuery = normalizeText(query);

  return teams.filter((team) => {
    const matchesLeague = league === TeamsLeague.ALL || team.league === league;
    const matchesTab = tab === TeamsTab.ALL || favoriteIds.has(team.id);
    const matchesQuery =
      normalizedQuery === "" ||
      normalizeText(team.name).includes(normalizedQuery);

    return matchesLeague && matchesTab && matchesQuery;
  });
};
