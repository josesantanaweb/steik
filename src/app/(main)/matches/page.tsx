"use client";

import { useMemo, useState, type ReactElement } from "react";
import { MATCHES_PAGE_TITLE } from "@/constants";
import { PageTitle } from "@/modules/shared/components";
import {
  MatchList,
  MatchesDateTabs,
  MatchesLeaguePills,
} from "@/modules/matches/components";
import { MatchLeague } from "@/modules/matches/types";
import {
  filterMatches,
  getFakeMatches,
  getMatchDays,
} from "@/modules/matches/utils";

export default function MatchesPage(): ReactElement {
  const [days] = useState(() => getMatchDays(new Date()));
  const [matches] = useState(getFakeMatches);
  const [activeDateKey, setActiveDateKey] = useState(
    () => days.find((day) => day.isToday)?.key ?? "",
  );
  const [activeLeague, setActiveLeague] = useState<MatchLeague>(
    MatchLeague.ALL,
  );
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set());

  const visibleMatches = useMemo(
    () => filterMatches(matches, activeLeague),
    [matches, activeLeague],
  );

  const toggleFavorite = (matchId: string): void => {
    setFavoriteIds((prev) => {
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
      <PageTitle title={MATCHES_PAGE_TITLE} />
      <MatchesDateTabs
        days={days}
        activeDateKey={activeDateKey}
        onDateChange={setActiveDateKey}
      />
      <MatchesLeaguePills
        activeLeague={activeLeague}
        onLeagueChange={setActiveLeague}
      />
      <MatchList
        matches={visibleMatches}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
      />
    </>
  );
}
