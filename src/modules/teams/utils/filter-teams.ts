import { ALL_LEAGUES, TeamsTab, type Team } from "../types";
import { normalizeText } from "@/modules/shared/utils/normalize-text";

interface FilterTeamsOptions {
  league: string;
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
    const matchesLeague =
      league === ALL_LEAGUES || team.league.id === league;
    const matchesTab = tab === TeamsTab.ALL || favoriteIds.has(team.id);
    const matchesQuery =
      normalizedQuery === "" ||
      normalizeText(team.name).includes(normalizedQuery);

    return matchesLeague && matchesTab && matchesQuery;
  });
};
