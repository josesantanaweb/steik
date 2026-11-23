import type { Match } from "@/modules/matches/types";
import { getFakeMatches, getFakeUpcomingMatches } from "./get-fake-matches";

/** Busca un partido por id en los datos de prueba. */
export const getMatchById = (id: string): Match | undefined =>
  [...getFakeMatches(), ...getFakeUpcomingMatches()].find(
    (match) => match.id === id,
  );
