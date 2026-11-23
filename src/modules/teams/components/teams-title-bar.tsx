"use client";

import type { ReactElement } from "react";
import { Search } from "lucide-react";
import { PAGE_TITLES } from "@/constants";
import { PageTitle } from "@/modules/shared/components/page-title";
import { cn } from "@/modules/shared/utils/cn";
import { TeamsSearchBar } from "./teams-search-bar";

interface TeamsTitleBarProps {
  title?: string;
  isSearchOpen?: boolean;
  onSearchToggle?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export const TeamsTitleBar = ({
  title = PAGE_TITLES.TEAMS,
  isSearchOpen = false,
  onSearchToggle,
  searchValue = "",
  onSearchChange,
}: TeamsTitleBarProps): ReactElement => {
  const handleClose = (): void => {
    if (isSearchOpen) {
      onSearchToggle?.();
    }
  };

  return (
    <div className="grid grid-cols-1 grid-rows-1">
      <PageTitle
        title={title}
        inert={isSearchOpen}
        aria-hidden={isSearchOpen}
        className={cn(
          "col-start-1 row-start-1 transition-[transform,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          isSearchOpen
            ? "pointer-events-none -translate-y-2 opacity-0 duration-200"
            : "translate-y-0 opacity-100 delay-100 duration-300",
        )}
        action={
          <button
            type="button"
            onClick={onSearchToggle}
            aria-label="Buscar equipos"
            aria-expanded={isSearchOpen}
            className="cursor-pointer text-white transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none"
          >
            <Search size={22} strokeWidth={2} aria-hidden="true" />
          </button>
        }
      />

      <TeamsSearchBar
        isOpen={isSearchOpen}
        value={searchValue}
        onValueChange={(value) => onSearchChange?.(value)}
        onClose={handleClose}
        className="col-start-1 row-start-1 px-5 py-5"
      />
    </div>
  );
};
