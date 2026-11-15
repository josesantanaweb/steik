import { ASSETS } from "@/constants";
import type { Team } from "@/modules/teams/types";

export async function getTeams(): Promise<Team[]> {
  const res = await fetch(ASSETS.DATA.TEAMS);

  if (!res.ok) {
    throw new Error("No se pudieron cargar los equipos");
  }

  return (await res.json()) as Team[];
}
