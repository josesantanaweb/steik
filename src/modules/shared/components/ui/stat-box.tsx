import type { ReactElement } from "react";
import { cn } from "@/modules/shared/utils/cn";

export interface StatBoxProps {
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
}

export const StatBox = ({
  label,
  value,
  highlight = false,
  className,
}: StatBoxProps): ReactElement => {
  return (
    <div
      className={cn(
        "border-stroke bg-surface flex flex-col items-start gap-1 rounded-xl border p-3",
        className,
      )}
    >
      <p className="text-body text-xs font-semibold uppercase">{label}</p>
      <h4
        className={cn(
          "text-xl font-semibold",
          highlight ? "text-primary" : "text-white",
        )}
      >
        {value}
      </h4>
    </div>
  );
};
