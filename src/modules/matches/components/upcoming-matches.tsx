"use client";

import type { ReactElement } from "react";
import type { Match } from "@/modules/matches/types";
import { cn } from "@/modules/shared/utils/cn";
import { UpcomingMatchCard } from "./upcoming-match-card";

interface UpcomingMatchesProps {
  matches: Match[];
  favoriteIds: Set<string>;
  onToggleFavorite: (matchId: string) => void;
  title?: string;
  className?: string;
}

export const UpcomingMatches = ({
  matches,
  favoriteIds,
  onToggleFavorite,
  title = "Próximos juegos",
  className,
}: UpcomingMatchesProps): ReactElement => {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <h4 className="text-lg font-semibold text-white uppercase">{title}</h4>

      {matches.length === 0 ? (
        <p className="text-body text-sm">No hay próximos partidos.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {matches.map((match) => (
            <li key={match.id}>
              <UpcomingMatchCard
                match={match}
                isFavorite={favoriteIds.has(match.id)}
                onToggleFavorite={onToggleFavorite}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
