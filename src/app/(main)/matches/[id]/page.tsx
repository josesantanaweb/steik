"use client";

import { use, useState, type ReactElement } from "react";
import { notFound } from "next/navigation";
import { PAGE_TITLES } from "@/constants";
import { PageTitle } from "@/modules/shared/components";
import {
  MatchDetailCard,
  MatchMarkets,
  UpcomingMatches,
} from "@/modules/matches/components";
import {
  getFakeUpcomingMatches,
  getMatchById,
} from "@/modules/matches/utils";

interface MatchDetailPageProps {
  params: Promise<{ id: string }>;
}

const UPCOMING_MATCHES = getFakeUpcomingMatches();

export default function MatchDetailPage({
  params,
}: MatchDetailPageProps): ReactElement {
  const { id } = use(params);
  const match = getMatchById(id);
  const upcomingMatches = UPCOMING_MATCHES.filter(
    (upcomingMatch) => upcomingMatch.id !== id,
  );

  const [favoriteMatchIds, setFavoriteMatchIds] = useState<Set<string>>(
    () => new Set(),
  );

  const toggleMatchFavorite = (matchId: string): void => {
    setFavoriteMatchIds((previous) => {
      const next = new Set(previous);

      if (next.has(matchId)) {
        next.delete(matchId);
      } else {
        next.add(matchId);
      }

      return next;
    });
  };

  if (!match) {
    notFound();
  }

  return (
    <>
      <PageTitle title={PAGE_TITLES.MATCH_DETAIL} showBackButton />
      <div className="flex flex-col gap-6 px-5">
        <MatchDetailCard
          match={match}
          isFavorite={favoriteMatchIds.has(match.id)}
          onToggleFavorite={toggleMatchFavorite}
        />

        <MatchMarkets
          odds={match.odds}
          homeTeamName={match.homeTeam.name}
          awayTeamName={match.awayTeam.name}
        />
        <UpcomingMatches
          matches={upcomingMatches}
          favoriteIds={favoriteMatchIds}
          onToggleFavorite={toggleMatchFavorite}
        />
      </div>
    </>
  );
}
