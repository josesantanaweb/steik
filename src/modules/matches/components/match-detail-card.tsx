import type { ReactElement } from "react";
import { Calendar, MapPin } from "lucide-react";
import { MATCH_LEAGUE_LOGOS, type Match } from "@/modules/matches/types";
import { formatKickoffDate, formatKickoffTime } from "@/modules/matches/utils";
import { FavoriteButton } from "@/modules/shared/components/ui";
import { LeagueLogo } from "./league-logo";
import { MatchTeamSide } from "./match-team-side";

interface MatchDetailCardProps {
  match: Match;
  isFavorite: boolean;
  onToggleFavorite: (matchId: string) => void;
}

export const MatchDetailCard = ({
  match,
  isFavorite,
  onToggleFavorite,
}: MatchDetailCardProps): ReactElement => {
  const matchLabel = `${match.homeTeam.name} vs ${match.awayTeam.name}`;

  return (
    <article className="bg-surface border-stroke relative flex flex-col rounded-xl border">
      <div className="flex flex-col items-center gap-3 p-4">
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
      </div>

      <div className="border-stroke flex w-full items-center justify-between border-t px-4 py-3">
        <div className="flex items-center gap-2">
          <Calendar className="text-body h-3 w-3" />
          <p className="text-body text-xs">30 April 2026 - 09:00 A M</p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="text-body h-3 w-3" />
          <p className="text-body text-xs">Santiago Bernabeu</p>
        </div>
      </div>
    </article>
  );
};
