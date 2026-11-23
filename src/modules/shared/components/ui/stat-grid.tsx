import type { ReactElement } from "react";
import { cn } from "@/modules/shared/utils/cn";
import { StatBox, type StatBoxProps } from "./stat-box";

export type StatItem = Omit<StatBoxProps, "className">;

interface StatGridProps {
  stats: StatItem[];
  className?: string;
}

export const StatGrid = ({
  stats,
  className,
}: StatGridProps): ReactElement => {
  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      {stats.map((stat) => (
        <StatBox key={stat.label} {...stat} />
      ))}
    </div>
  );
};
