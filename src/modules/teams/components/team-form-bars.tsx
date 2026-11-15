"use client";

import type { ReactElement } from "react";
import { cn } from "@/modules/shared/utils/cn";
import { FormResult, type FormResult as Result } from "@/modules/teams/types";

interface TeamFormBarsProps {
  results: Result[];
  className?: string;
}

export const TeamFormBars = ({
  results,
  className,
}: TeamFormBarsProps): ReactElement => {
  const wins = results.filter((result) => result === FormResult.WIN).length;

  return (
    <div
      role="img"
      aria-label={`Últimos ${results.length} partidos: ${wins} victorias`}
      className={cn("flex items-center gap-1", className)}
    >
      {results.map((result, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={cn(
            "h-5 w-1.5 rounded-full",
            result === FormResult.WIN ? "bg-success" : "bg-error",
          )}
        />
      ))}
    </div>
  );
};
