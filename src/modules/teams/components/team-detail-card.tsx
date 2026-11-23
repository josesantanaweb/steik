"use client";

import type { ReactElement } from "react";
import { FavoriteButton } from "@/modules/shared/components/ui";
import { TEAMS_LEAGUES, type Team } from "@/modules/teams/types";
import { TeamLogo } from "./team-logo";

interface TeamDetailCardProps {
  team: Team;
  isFavorite: boolean;
  onToggleFavorite: (teamId: string) => void;
  leagueLogo?: string;
}

export const TeamDetailCard = ({
  team,
  isFavorite,
  onToggleFavorite,
  leagueLogo,
}: TeamDetailCardProps): ReactElement => {
  const leagueLabel =
    TEAMS_LEAGUES.find((league) => league.key === team.league)?.label ?? "";

  return (
    <article className="border-stroke bg-surface relative flex h-44 flex-col items-center justify-center rounded-xl border p-4">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          {leagueLogo && (
            <div className="size-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={leagueLogo}
                alt={leagueLabel}
                loading="lazy"
                className="size-full object-contain p-1"
              />
            </div>
          )}
          <p className="text-body text-base">{leagueLabel}</p>
        </div>

        <FavoriteButton
          name={team.name}
          isFavorite={isFavorite}
          onToggle={() => onToggleFavorite(team.id)}
        />
      </div>

      <div className="flex flex-col items-center gap-1">
        <TeamLogo src={team.logo} name={team.name} className="size-20" />
        <h2 className="text-xl font-semibold text-white">{team.name}</h2>
      </div>
    </article>
  );
};
