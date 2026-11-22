"use client";

import type { ReactElement } from "react";
import type { Match } from "@/modules/matches/types";
import { MatchCard } from "./match-card";

interface MatchListProps {
  matches: Match[];
  favoriteIds: Set<string>;
  onToggleFavorite: (matchId: string) => void;
}

export const MatchList = ({
  matches,
  favoriteIds,
  onToggleFavorite,
}: MatchListProps): ReactElement => {
  if (matches.length === 0) {
    return (
      <p className="text-body px-5 py-10 text-center text-sm">
        No hay partidos para esta liga.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4 px-5 pb-4">
      {matches.map((match) => (
        <li key={match.id}>
          <MatchCard
            match={match}
            isFavorite={favoriteIds.has(match.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </li>
      ))}
    </ul>
  );
};
