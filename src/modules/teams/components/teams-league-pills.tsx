"use client";

import type { ReactElement } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { League } from "@/modules/leagues/types";
import { Pill } from "@/modules/shared/components/ui";
import { ALL_LEAGUES } from "@/modules/teams/types";

interface TeamsLeaguePillsProps {
  leagues: League[];
  activeLeague: string;
  onLeagueChange: (league: string) => void;
  onFilterClick?: () => void;
}

export const TeamsLeaguePills = ({
  leagues,
  activeLeague,
  onLeagueChange,
  onFilterClick,
}: TeamsLeaguePillsProps): ReactElement => {
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
        <Pill
          active={activeLeague === ALL_LEAGUES}
          aria-pressed={activeLeague === ALL_LEAGUES}
          onClick={() => onLeagueChange(ALL_LEAGUES)}
        >
          Todos
        </Pill>
        {leagues.map((league) => {
          const isActive = league.id === activeLeague;

          return (
            <Pill
              key={league.id}
              active={isActive}
              aria-pressed={isActive}
              onClick={() => onLeagueChange(league.id)}
            >
              {league.name}
            </Pill>
          );
        })}
      </div>
    </div>
  );
};
