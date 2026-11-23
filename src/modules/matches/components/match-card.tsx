"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { FavoriteButton } from "@/modules/shared/components/ui";
import { MATCH_LEAGUE_LOGOS, type Match } from "@/modules/matches/types";
import { formatKickoffDate, formatKickoffTime } from "@/modules/matches/utils";
import { LeagueLogo } from "./league-logo";
import { MatchTeamSide } from "./match-team-side";
import { OddsGrid } from "./odds-grid";

interface MatchCardProps {
  match: Match;
  isFavorite: boolean;
  onToggleFavorite: (matchId: string) => void;
}

export const MatchCard = ({
  match,
  isFavorite,
  onToggleFavorite,
}: MatchCardProps): ReactElement => {
  const matchLabel = `${match.homeTeam.name} vs ${match.awayTeam.name}`;

  return (
    <article className="border-stroke bg-surface relative rounded-2xl border p-4">
      <Link
        href={ROUTES.MATCH_DETAIL(match.id)}
        aria-label={`Ver detalle de ${matchLabel}`}
        className="focus-visible:ring-primary focus-visible:ring-offset-canvas absolute inset-0 rounded-2xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      />

      <header className="flex items-center justify-between">
        <div className="text-body pointer-events-none flex items-center gap-2 text-sm">
          <LeagueLogo
            src={MATCH_LEAGUE_LOGOS[match.league]}
            name={match.competition}
          />
          <span>{match.competition}</span>
        </div>
        <FavoriteButton
          name={matchLabel}
          isFavorite={isFavorite}
          onToggle={() => onToggleFavorite(match.id)}
          className="relative z-10"
        />
      </header>

      <div className="pointer-events-none mt-4 flex items-start">
        <div className="flex min-w-0 flex-1">
          <MatchTeamSide team={match.homeTeam} />
        </div>

        <div className="flex w-28 shrink-0 flex-col items-center gap-1 text-center">
          <time
            dateTime={match.kickoff}
            className="text-base font-semibold text-white"
          >
            {formatKickoffTime(match.kickoff)}
          </time>
          <span className="text-body text-sm">
            {formatKickoffDate(match.kickoff)}
          </span>
        </div>

        <div className="flex min-w-0 flex-1">
          <MatchTeamSide team={match.awayTeam} />
        </div>
      </div>

      <OddsGrid odds={match.odds} className="pointer-events-none mt-4" />
    </article>
  );
};
