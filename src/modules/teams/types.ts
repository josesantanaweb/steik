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

export const TeamsLeague = {
  ALL: "ALL",
  PREMIER_LEAGUE: "PREMIER_LEAGUE",
  LA_LIGA: "LA_LIGA",
  SERIE_A: "SERIE_A",
  BUNDESLIGA: "BUNDESLIGA",
  LIGUE_1: "LIGUE_1",
} as const;
export type TeamsLeague = (typeof TeamsLeague)[keyof typeof TeamsLeague];

export type TeamLeague = Exclude<TeamsLeague, typeof TeamsLeague.ALL>;

export interface Team {
  id: string;
  name: string;
  league: TeamLeague;
  logo: string;
}

export const FormResult = {
  WIN: "WIN",
  LOSS: "LOSS",
} as const;
export type FormResult = (typeof FormResult)[keyof typeof FormResult];

export const TEAMS_LEAGUES: { key: TeamsLeague; label: string }[] = [
  { key: TeamsLeague.ALL, label: "Todos" },
  { key: TeamsLeague.PREMIER_LEAGUE, label: "Premier League" },
  { key: TeamsLeague.LA_LIGA, label: "La Liga" },
  { key: TeamsLeague.SERIE_A, label: "Serie A" },
  { key: TeamsLeague.BUNDESLIGA, label: "Bundesliga" },
  { key: TeamsLeague.LIGUE_1, label: "Ligue 1" },
];
