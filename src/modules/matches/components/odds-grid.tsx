import type { ReactElement } from "react";
import type { MatchOdds } from "@/modules/matches/types";
import { formatOdd } from "@/modules/matches/utils";
import { cn } from "@/modules/shared/utils/cn";

const ODD_OPTIONS = [
  { key: "home", label: "1" },
  { key: "draw", label: "X" },
  { key: "away", label: "2" },
] as const;

interface OddsGridProps {
  odds: MatchOdds;
  className?: string;
}

export const OddsGrid = ({ odds, className }: OddsGridProps): ReactElement => {
  return (
    <ul className={cn("grid w-full grid-cols-3 gap-3", className)}>
      {ODD_OPTIONS.map((option) => {
        const value = odds[option.key];

        return (
          <li key={option.key}>
            <button
              type="button"
              aria-label={`Cuota ${option.label}: ${formatOdd(value)}`}
              className="border-stroke bg-surface flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border px-3 py-2 transition-colors"
            >
              <span className="text-body text-sm">{option.label}</span>
              <span className="text-base font-semibold text-white">
                {formatOdd(value)}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
