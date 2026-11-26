"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ROUTES } from "@/constants";
import { FavoriteButton } from "@/modules/shared/components/ui";
import type { Team } from "@/modules/teams/types";
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
  return (
    <article className="border-stroke bg-surface relative flex items-center gap-4 rounded-2xl border p-4">
      <Link
        href={ROUTES.TEAM_DETAIL(team.id)}
        aria-label={`Ver detalle de ${team.name}`}
        className="absolute inset-0 rounded-2xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none"
      />

      <TeamLogo
        src={team.logo}
        name={team.name}
        className="pointer-events-none"
      />

      <div className="pointer-events-none flex min-w-0 flex-1 flex-col">
        <h2 className="truncate font-semibold text-white">{team.name}</h2>
        <span className="text-body truncate text-sm">{team.league.name}</span>
      </div>

      <TeamFormBars
        results={getFakeForm(team.id)}
        className="pointer-events-none"
      />

      <FavoriteButton
        name={team.name}
        isFavorite={isFavorite}
        onToggle={() => onToggleFavorite(team.id)}
        className="relative z-10"
      />

      <ChevronRight
        size={20}
        strokeWidth={2}
        aria-hidden="true"
        className="pointer-events-none text-white"
      />
    </article>
  );
};
