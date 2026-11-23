"use client";

import { useState } from "react";
import { PAGE_TITLES } from "@/constants";
import { PageTitle } from "@/modules/shared/components";
import { StatGrid, type StatItem } from "@/modules/shared/components/ui";
import { UpcomingMatches } from "@/modules/matches/components";
import { getFakeUpcomingMatches } from "@/modules/matches/utils";
import {
  RecentForm,
  RecommendedMarket,
  TeamDetailCard,
  TeamStatistics,
} from "@/modules/teams/components";
import {
  FormResult,
  TEAM_STATISTICS,
  TeamsLeague,
  type Team,
} from "@/modules/teams/types";

const TEAM: Team = {
  id: "real-madrid",
  name: "Real Madrid",
  league: TeamsLeague.LA_LIGA,
  logo: "/images/teams/real-madrid.png",
};

const TEAM_STATS: StatItem[] = [
  { label: "% de apuestas ganadas", value: "14.10%", highlight: true },
  { label: "Total ganadas", value: "10" },
  { label: "Total perdidas", value: "10" },
  { label: "Ganancias", value: "+1,240.00", highlight: true },
];

const UPCOMING_MATCHES = getFakeUpcomingMatches();

export default function TeamDetailPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteMatchIds, setFavoriteMatchIds] = useState<Set<string>>(
    () => new Set(),
  );

  const toggleMatchFavorite = (matchId: string): void => {
    setFavoriteMatchIds((prev) => {
      const next = new Set(prev);

      if (next.has(matchId)) {
        next.delete(matchId);
      } else {
        next.add(matchId);
      }

      return next;
    });
  };

  return (
    <>
      <PageTitle title={PAGE_TITLES.TEAM_DETAIL} showBackButton />
      <div className="flex flex-col gap-6 px-5">
        <div className="flex flex-col gap-3">
          <TeamDetailCard
            team={TEAM}
            isFavorite={isFavorite}
            onToggleFavorite={() => setIsFavorite((prev) => !prev)}
            leagueLogo="/images/leagues/la-liga.png"
          />
          <StatGrid stats={TEAM_STATS} />
        </div>

        <RecentForm
          results={[FormResult.WIN, FormResult.LOSS, FormResult.DRAW]}
        />

        <TeamStatistics stats={TEAM_STATISTICS} />
        <RecommendedMarket
          market="Más 1.5 goles"
          confidence={78}
          description="El equipo tiene un 78% de probabilidad de que el partido tenga más de 1.5 goles."
        />

        <UpcomingMatches
          matches={UPCOMING_MATCHES}
          favoriteIds={favoriteMatchIds}
          onToggleFavorite={toggleMatchFavorite}
        />
      </div>
    </>
  );
}
