"use client";

import type { ReactElement } from "react";
import { ChevronRight } from "lucide-react";
import { FavoriteButton } from "@/modules/shared/components/ui";
import { TEAMS_LEAGUES, type Team } from "@/modules/teams/types";
import { getFakeForm } from "@/modules/teams/utils";
import { TeamLogo } from "./team-logo";
import { TeamFormBars } from "./team-form-bars";

interface TeamCardProps {
  team: Team;
  isFavorite: boolean;
  onToggleFavorite: (teamId: string) => void;
}

export const TeamCard = ({
  team,
  isFavorite,
  onToggleFavorite,
}: TeamCardProps): ReactElement => {
  const leagueLabel =
    TEAMS_LEAGUES.find((league) => league.key === team.league)?.label ?? "";

  return (
    <article className="border-stroke bg-surface flex items-center gap-4 rounded-2xl border p-4">
      <TeamLogo src={team.logo} name={team.name} />

      <div className="flex min-w-0 flex-1 flex-col">
        <h2 className="truncate font-semibold text-white">{team.name}</h2>
        <span className="text-body truncate text-sm">{leagueLabel}</span>
      </div>

      <TeamFormBars results={getFakeForm(team.id)} />

      <FavoriteButton
        name={team.name}
        isFavorite={isFavorite}
        onToggle={() => onToggleFavorite(team.id)}
      />

      <ChevronRight
        size={20}
        strokeWidth={2}
        aria-hidden="true"
        className="text-white"
      />
    </article>
  );
};
