"use client";

import { useState, type ReactElement } from "react";
import { Trophy } from "lucide-react";
import { FavoriteButton } from "@/modules/shared/components/ui";
import { TeamLogo } from "@/modules/teams/components/team-logo";
import {
  MATCH_LEAGUE_LOGOS,
  type Match,
  type MatchTeam,
} from "@/modules/matches/types";
import {
  formatKickoffDate,
  formatKickoffTime,
  formatOdd,
} from "@/modules/matches/utils";

interface MatchCardProps {
  match: Match;
  isFavorite: boolean;
  onToggleFavorite: (matchId: string) => void;
}

const ODD_OPTIONS = [
  { key: "home", label: "1" },
  { key: "draw", label: "X" },
  { key: "away", label: "2" },
] as const;

const LeagueLogo = ({
  src,
  name,
}: {
  src: string;
  name: string;
}): ReactElement => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <Trophy size={18} strokeWidth={2} aria-hidden="true" />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      onError={() => setHasError(true)}
      className="size-5 object-contain"
    />
  );
};

const TeamSide = ({ team }: { team: MatchTeam }): ReactElement => (
  <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
    <TeamLogo src={team.logo} name={team.name} className="size-12" />
    <span className="line-clamp-2 text-center text-sm font-semibold text-white">
      {team.name}
    </span>
  </div>
);

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
        <TeamSide team={match.homeTeam} />

        <div className="flex w-28 shrink-0 flex-col items-center gap-1 text-center">
          <time
            dateTime={match.kickoff}
            className="text-base font-bold text-white"
          >
            {formatKickoffTime(match.kickoff)}
          </time>
          <span className="text-body text-sm">
            {formatKickoffDate(match.kickoff)}
          </span>
        </div>

        <TeamSide team={match.awayTeam} />
      </div>

      <ul className="mt-4 grid grid-cols-3 gap-3">
        {ODD_OPTIONS.map((option) => {
          const value = match.odds[option.key];

          return (
            <li key={option.key}>
              <button
                type="button"
                aria-label={`Cuota ${option.label}: ${formatOdd(value)}`}
                className="border-stroke bg-canvas flex w-full cursor-pointer flex-col items-center gap-1 rounded-xl border py-2 transition-colors"
              >
                <span className="text-body text-xs font-semibold">
                  {option.label}
                </span>
                <span className="text-sm font-bold text-white">
                  {formatOdd(value)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
};
