"use client";

import { useMemo, useState, type ReactElement } from "react";
import {
  TeamList,
  TeamsHeader,
  TeamsLeaguePills,
} from "@/modules/teams/components";
import { useTeams } from "@/modules/teams/hooks";
import { TeamsLeague, TeamsTab, type Team } from "@/modules/teams/types";
import { filterTeams } from "@/modules/teams/utils";

export default function TeamsPage(): ReactElement {
  const [activeTab, setActiveTab] = useState<TeamsTab>(TeamsTab.ALL);
  const [activeLeague, setActiveLeague] = useState<TeamsLeague>(
    TeamsLeague.ALL,
  );
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: teams, isLoading, isError } = useTeams();

  const visibleTeams: Team[] = useMemo(
    () =>
      filterTeams(teams ?? [], {
        league: activeLeague,
        tab: activeTab,
        favoriteIds,
        query: searchQuery,
      }),
    [teams, activeLeague, activeTab, favoriteIds, searchQuery],
  );

  const toggleFavorite = (teamId: string): void => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(teamId)) {
        next.delete(teamId);
      } else {
        next.add(teamId);
      }
      return next;
    });
  };

  const toggleSearch = (): void => {
    if (isSearchOpen) {
      setSearchQuery("");
    }
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <TeamsHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isSearchOpen={isSearchOpen}
        onSearchToggle={toggleSearch}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <TeamsLeaguePills
        activeLeague={activeLeague}
        onLeagueChange={setActiveLeague}
      />

      {isLoading && (
        <p className="text-body px-5 py-10 text-center text-sm">
          Cargando equipos…
        </p>
      )}

      {isError && (
        <p className="text-error px-5 py-10 text-center text-sm">
          No se pudieron cargar los equipos.
        </p>
      )}

      {!isLoading && !isError && (
        <TeamList
          teams={visibleTeams}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </>
  );
}
