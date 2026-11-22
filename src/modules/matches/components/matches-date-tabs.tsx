"use client";

import { useEffect, useRef, type ReactElement } from "react";
import { cn } from "@/modules/shared/utils/cn";
import type { MatchDay } from "@/modules/matches/types";

interface MatchesDateTabsProps {
  days: MatchDay[];
  activeDateKey: string;
  onDateChange: (dateKey: string) => void;
}

export const MatchesDateTabs = ({
  days,
  activeDateKey,
  onDateChange,
}: MatchesDateTabsProps): ReactElement => {
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView?.({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, [activeDateKey]);

  return (
    <div
      role="tablist"
      aria-label="Fechas de partidos"
      className="border-stroke/30 flex gap-1 overflow-x-auto border-b px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {days.map((day) => {
        const isActive = day.key === activeDateKey;

        return (
          <button
            key={day.key}
            ref={isActive ? activeRef : undefined}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onDateChange(day.key)}
            className={cn(
              "flex min-w-16 shrink-0 cursor-pointer flex-col items-center gap-1 border-b-2 px-3 py-3 transition-colors",
              isActive ? "border-primary" : "border-transparent",
            )}
          >
            <span
              className={cn(
                "text-sm font-semibold uppercase",
                isActive ? "text-primary" : "text-body",
              )}
            >
              {day.weekdayLabel}
            </span>
            <span
              className={cn(
                "text-xs",
                isActive ? "text-primary" : "text-body",
              )}
            >
              {day.dayLabel} {day.monthLabel}
            </span>
          </button>
        );
      })}
    </div>
  );
};
