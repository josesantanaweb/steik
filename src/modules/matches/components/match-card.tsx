"use client";

import type { ReactElement } from "react";
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
    <article className="border-stroke bg-surface rounded-2xl border p-4">
      <header className="flex items-center justify-between">
        <div className="text-body flex items-center gap-2 text-sm">
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
        />
      </header>

      <div className="mt-4 flex items-start">
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

      <OddsGrid odds={match.odds} className="mt-4" />
    </article>
  );
};
