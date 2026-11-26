import type { League } from "@/modules/leagues/types";

export const TeamsTab = {
  ALL: "ALL",
  FAVORITES: "FAVORITES",
} as const;
export type TeamsTab = (typeof TeamsTab)[keyof typeof TeamsTab];

export const TEAMS_TABS: { key: TeamsTab; label: string }[] = [
  { key: TeamsTab.ALL, label: "Todos" },
  { key: TeamsTab.FAVORITES, label: "Favoritos" },
];

export const isTeamsTab = (key: string): key is TeamsTab =>
  Object.values(TeamsTab).some((tab) => tab === key);

export const ALL_LEAGUES = "ALL";

export interface Team {
  id: string;
  name: string;
  league: League;
  logo: string;
}

export const FormResult = {
  WIN: "WIN",
  LOSS: "LOSS",
  DRAW: "DRAW",
} as const;
export type FormResult = (typeof FormResult)[keyof typeof FormResult];

export interface TeamStat {
  key: string;
  label: string;
  value: number;
  suffix?: string;
  percentage: number;
}

/**
 * Fake football statistics for UI development.
 * Replace with real team data later.
 */
export const TEAM_STATISTICS: TeamStat[] = [
  { key: "goalsPerGame", label: "Goles por partido", value: 2.4, percentage: 48 },
  { key: "shotsOnTarget", label: "Tiros a puerta", value: 5.8, percentage: 58 },
  { key: "fouls", label: "Faltas", value: 12.4, percentage: 62 },
  {
    key: "yellowCards",
    label: "Tarjetas amarillas",
    value: 2.1,
    percentage: 42,
  },
  {
    key: "possession",
    label: "Posesión",
    value: 62,
    suffix: "%",
    percentage: 62,
  },
  {
    key: "passCompletion",
    label: "Pases completados",
    value: 89,
    suffix: "%",
    percentage: 89,
  },
  { key: "corners", label: "Córners", value: 6.2, percentage: 52 },
  { key: "saves", label: "Paradas", value: 3.4, percentage: 44 },
];
