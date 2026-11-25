export const ROUTES = {
  HOME: "/",
  TEAMS: "/teams",
  TEAM_DETAIL: (id: string) => `/teams/${id}`,
  MATCHES: "/matches",
  MATCH_DETAIL: (id: string) => `/matches/${id}`,
  HISTORY: "/history",
  NEW_BET: "/bets/new",
  LOGIN: "/login",
  REGISTER: "/register",
};

export const API_ROUTES = {
  AUTH: {
    ME: "/api/auth/me",
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    GOOGLE: "/api/auth/google",
  },
  LEAGUES: "/api/leagues",
  LEAGUE_DETAIL: (id: string) => `/api/leagues/${id}`,
  TEAMS: "/api/teams",
  TEAM_DETAIL: (id: string) => `/api/teams/${id}`,
  MATCHES: "/api/matches",
  MATCH_DETAIL: (id: string) => `/api/matches/${id}`,
};
