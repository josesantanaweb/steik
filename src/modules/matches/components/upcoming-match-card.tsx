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

interface UpcomingMatchCardProps {
  match: Match;
  isFavorite: boolean;
  onToggleFavorite: (matchId: string) => void;
}

export const UpcomingMatchCard = ({
  match,
  isFavorite,
  onToggleFavorite,
}: UpcomingMatchCardProps): ReactElement => {
  const matchLabel = `${match.homeTeam.name} vs ${match.awayTeam.name}`;

  return (
    <article className="bg-surface border-stroke relative flex flex-col items-center gap-3 rounded-xl border p-4">
      <Link
        href={ROUTES.MATCH_DETAIL(match.id)}
        aria-label={`Ver detalle de ${matchLabel}`}
        className="focus-visible:ring-primary focus-visible:ring-offset-canvas absolute inset-0 rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      />

      <div className="flex w-full items-center justify-between">
        <div className="pointer-events-none flex items-center gap-1">
          <LeagueLogo
            src={MATCH_LEAGUE_LOGOS[match.league]}
            name={match.competition}
          />
          <p className="text-body text-base">{match.competition}</p>
        </div>

        <FavoriteButton
          name={matchLabel}
          isFavorite={isFavorite}
          onToggle={() => onToggleFavorite(match.id)}
          className="relative z-10"
        />
      </div>

      <div className="pointer-events-none grid w-full grid-cols-3 items-center">
        <MatchTeamSide team={match.homeTeam} />

        <div className="flex flex-col items-center justify-center">
          <time
            dateTime={match.kickoff}
            className="text-sm font-semibold text-white"
          >
            {formatKickoffTime(match.kickoff)}
          </time>
          <p className="text-body text-xs">
            {formatKickoffDate(match.kickoff)}
          </p>
        </div>

        <MatchTeamSide team={match.awayTeam} />
      </div>

      <OddsGrid odds={match.odds} className="pointer-events-none" />
    </article>
  );
};
