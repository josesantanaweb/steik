"use client";

import type { ReactElement } from "react";
import type { Team } from "@/modules/teams/types";
import { TeamCard } from "./team-card";

interface TeamListProps {
  teams: Team[];
  favoriteIds: ReadonlySet<string>;
  onToggleFavorite: (teamId: string) => void;
}

export const TeamList = ({
  teams,
  favoriteIds,
  onToggleFavorite,
}: TeamListProps): ReactElement => {
  if (teams.length === 0) {
    return (
      <p className="text-body px-5 py-10 text-center text-sm">
        No hay equipos para este filtro.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3 px-5 pb-6">
      {teams.map((team) => (
        <li key={team.id}>
          <TeamCard
            team={team}
            isFavorite={favoriteIds.has(team.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </li>
      ))}
    </ul>
  );
};
