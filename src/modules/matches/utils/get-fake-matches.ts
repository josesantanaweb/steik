import type { Match } from "@/modules/matches/types";

const TEAMS = {
  realMadrid: { name: "Real Madrid", logo: "/images/teams/real-madrid.png" },
  roma: { name: "Roma", logo: "/images/teams/roma.png" },
  arsenal: { name: "Arsenal", logo: "/images/teams/arsenal.png" },
  dortmund: {
    name: "Borussia Dortmund",
    logo: "/images/teams/borussia-dortmund.png",
  },
  manchesterCity: {
    name: "Manchester City",
    logo: "/images/teams/manchester-city.png",
  },
  bayern: { name: "Bayern Múnich", logo: "/images/teams/bayern-munich.png" },
  lazio: { name: "Lazio", logo: "/images/teams/lazio.png" },
} as const;

/** Partidos de prueba para desarrollo de UI. Reemplazar por datos reales. */
export const getFakeMatches = (): Match[] => [
  {
    id: "rm-roma",
    league: "LA_LIGA",
    competition: "La Liga",
    homeTeam: TEAMS.realMadrid,
    awayTeam: TEAMS.roma,
    kickoff: new Date(2026, 3, 28, 9, 0).toISOString(),
    odds: { home: 2.1, draw: 2, away: 1.6 },
  },
  {
    id: "rm-arsenal",
    league: "LA_LIGA",
    competition: "La Liga",
    homeTeam: TEAMS.realMadrid,
    awayTeam: TEAMS.arsenal,
    kickoff: new Date(2026, 3, 28, 9, 0).toISOString(),
    odds: { home: 2.1, draw: 2, away: 1.5 },
  },
  {
    id: "rm-dortmund",
    league: "LA_LIGA",
    competition: "La Liga",
    homeTeam: TEAMS.realMadrid,
    awayTeam: TEAMS.dortmund,
    kickoff: new Date(2026, 3, 28, 9, 0).toISOString(),
    odds: { home: 2.1, draw: 2, away: 1.5 },
  },
  {
    id: "arsenal-city",
    league: "LA_LIGA",
    competition: "La Liga",
    homeTeam: TEAMS.arsenal,
    awayTeam: TEAMS.manchesterCity,
    kickoff: new Date(2026, 3, 28, 12, 30).toISOString(),
    odds: { home: 2.6, draw: 3.2, away: 2.5 },
  },
  {
    id: "bayern-dortmund",
    league: "LA_LIGA",
    competition: "La Liga",
    homeTeam: TEAMS.bayern,
    awayTeam: TEAMS.dortmund,
    kickoff: new Date(2026, 3, 29, 15, 30).toISOString(),
    odds: { home: 1.85, draw: 3.6, away: 3.9 },
  },
  {
    id: "roma-lazio",
    league: "LA_LIGA",
    competition: "La Liga",
    homeTeam: TEAMS.roma,
    awayTeam: TEAMS.lazio,
    kickoff: new Date(2026, 3, 29, 18, 0).toISOString(),
    odds: { home: 2.4, draw: 3.1, away: 2.9 },
  },
];
