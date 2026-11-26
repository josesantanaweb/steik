import { ASSETS } from "@/constants";

export const getTeamLogoUrl = (logo: string | null): string => {
  if (!logo) {
    return "";
  }

  if (logo.startsWith("/") || /^https?:\/\//.test(logo)) {
    return logo;
  }

  return `${ASSETS.IMAGES.TEAMS}/${logo}`;
};
