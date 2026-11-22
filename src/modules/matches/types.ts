export interface MatchDay {
  key: string;
  weekdayLabel: string;
  dayLabel: string;
  monthLabel: string;
  isToday: boolean;
}

export const MatchLeague = {
  ALL: "ALL",
  PREMIER_LEAGUE: "PREMIER_LEAGUE",
  LA_LIGA: "LA_LIGA",
  SERIE_A: "SERIE_A",
  BUNDESLIGA: "BUNDESLIGA",
  LIGUE_1: "LIGUE_1",
} as const;
export type MatchLeague = (typeof MatchLeague)[keyof typeof MatchLeague];

export const MATCH_LEAGUES: { key: MatchLeague; label: string }[] = [
  { key: MatchLeague.ALL, label: "Todos" },
  { key: MatchLeague.PREMIER_LEAGUE, label: "Premier League" },
  { key: MatchLeague.LA_LIGA, label: "La Liga" },
  { key: MatchLeague.SERIE_A, label: "Serie A" },
  { key: MatchLeague.BUNDESLIGA, label: "Bundesliga" },
  { key: MatchLeague.LIGUE_1, label: "Ligue 1" },
];

export type MatchCompetitionLeague = Exclude<
  MatchLeague,
  typeof MatchLeague.ALL
>;

export const MATCH_LEAGUE_LOGOS: Record<MatchCompetitionLeague, string> = {
  PREMIER_LEAGUE: "/images/leagues/premier_league.png",
  LA_LIGA: "/images/leagues/la_liga.png",
  SERIE_A: "/images/leagues/serie_a.png",
  BUNDESLIGA: "/images/leagues/bundesliga.png",
  LIGUE_1: "/images/leagues/ligue_1.png",
};

export interface MatchTeam {
  name: string;
  logo: string;
}

export interface MatchOdds {
  home: number;
  draw: number;
  away: number;
}

export interface Match {
  id: string;
  league: MatchCompetitionLeague;
  competition: string;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  kickoff: string;
  odds: MatchOdds;
}
