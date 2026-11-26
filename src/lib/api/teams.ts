import { API_ROUTES, CATALOG_PAGE_SIZE } from "@/constants";
import type { League } from "@/modules/leagues/types";
import type { ApiResult, PaginatedResult } from "@/modules/shared/types";
import type { Team } from "@/modules/teams/types";
import { getTeamLogoUrl } from "@/modules/teams/utils/get-team-logo-url";

interface TeamRecord {
  id: string;
  name: string;
  logo: string | null;
  league: League;
}

export async function getTeams(): Promise<Team[]> {
  const res = await fetch(`${API_ROUTES.TEAMS}?limit=${CATALOG_PAGE_SIZE}`);
  const result = (await res.json()) as ApiResult<
    PaginatedResult<TeamRecord>
  >;

  if (!res.ok || !result.success) {
    throw new Error(result.message || "No se pudieron cargar los equipos");
  }

  return result.data.data.map((team) => ({
    ...team,
    logo: getTeamLogoUrl(team.logo),
  }));
}
