export const ROUTES = {
  HOME: "/",
  TEAMS: "/teams",
  TEAM_DETAIL: (id: string) => `/teams/${id}`,
  MATCHES: "/matches",
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
};
