"use client";

import type { ReactElement } from "react";
import { ProgressBar } from "@/modules/shared/components/ui";
import type { TeamStat } from "@/modules/teams/types";
import { cn } from "@/modules/shared/utils/cn";

interface TeamStatisticsProps {
  stats: TeamStat[];
  title?: string;
  className?: string;
}

export const TeamStatistics = ({
  stats,
  title = "Estadísticas",
  className,
}: TeamStatisticsProps): ReactElement => {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <h4 className="text-lg font-semibold text-white uppercase">{title}</h4>

      <div className="bg-surface border-stroke flex flex-col items-center gap-6 rounded-xl border p-4">
        {stats.map((stat) => (
          <div key={stat.key} className="flex w-full flex-col items-center gap-3">
            <div className="flex w-full items-center justify-between">
              <h5 className="text-base font-semibold text-white uppercase">
                {stat.label}
              </h5>
              <p className="text-base font-semibold text-white">
                {stat.value}
                {stat.suffix ?? ""}
              </p>
            </div>

            <ProgressBar value={stat.percentage} label={stat.label} />
          </div>
        ))}
      </div>
    </div>
  );
};
