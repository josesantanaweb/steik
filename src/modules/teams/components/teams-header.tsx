"use client";

import type { ReactElement } from "react";
import { Tabs } from "@/modules/shared/components";
import { TEAMS_TABS, isTeamsTab, type TeamsTab } from "@/modules/teams/types";
import { TeamsTitleBar } from "./teams-title-bar";

interface TeamsHeaderProps {
  activeTab: TeamsTab;
  onTabChange: (tab: TeamsTab) => void;
  isSearchOpen: boolean;
  onSearchToggle: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export const TeamsHeader = ({
  activeTab,
  onTabChange,
  isSearchOpen,
  onSearchToggle,
  searchValue,
  onSearchChange,
}: TeamsHeaderProps): ReactElement => {
  const handleTabChange = (key: string): void => {
    if (isTeamsTab(key)) {
      onTabChange(key);
    }
  };

  return (
    <header>
      <TeamsTitleBar
        isSearchOpen={isSearchOpen}
        onSearchToggle={onSearchToggle}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
      />
      <Tabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabs={TEAMS_TABS}
      />
    </header>
  );
};
