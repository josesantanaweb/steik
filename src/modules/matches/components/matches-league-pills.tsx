"use client";

import type { ReactElement } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Pill } from "@/modules/shared/components/ui";
import { MATCH_LEAGUES, type MatchLeague } from "@/modules/matches/types";

interface MatchesLeaguePillsProps {
  activeLeague: MatchLeague;
  onLeagueChange: (league: MatchLeague) => void;
  onFilterClick?: () => void;
}

export const MatchesLeaguePills = ({
  activeLeague,
  onLeagueChange,
  onFilterClick,
}: MatchesLeaguePillsProps): ReactElement => {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <button
        type="button"
        onClick={onFilterClick}
        aria-label="Filtros"
        className="border-stroke bg-surface text-body hover:text-foreground flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors"
      >
        <SlidersHorizontal size={16} strokeWidth={2} aria-hidden="true" />
      </button>

      <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pr-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {MATCH_LEAGUES.map((league) => {
          const isActive = league.key === activeLeague;

          return (
            <Pill
              key={league.key}
              active={isActive}
              aria-pressed={isActive}
              onClick={() => onLeagueChange(league.key)}
            >
              {league.label}
            </Pill>
          );
        })}
      </div>
    </div>
  );
};
