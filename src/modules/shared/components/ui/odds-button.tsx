import type { ReactElement } from "react";
import { cn } from "@/modules/shared/utils/cn";

interface OddsButtonProps {
  ariaLabel: string;
  label: string;
  value: string;
  isSelected: boolean;
  onClick: () => void;
}

export const OddsButton = ({
  ariaLabel,
  label,
  value,
  isSelected,
  onClick,
}: OddsButtonProps): ReactElement => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={isSelected}
      onClick={onClick}
      className={cn(
        "border-stroke bg-canvas/50 focus-visible:ring-primary flex min-h-14 w-full cursor-pointer flex-col items-center justify-center rounded-xl border px-2 py-2 transition-colors focus-visible:ring-2 focus-visible:outline-none",
        isSelected && "border-primary bg-primary",
      )}
    >
      <span className={cn("text-body text-sm", isSelected && "text-canvas")}>
        {label}
      </span>
      <span
        className={cn(
          "text-base font-semibold text-white",
          isSelected && "text-canvas",
        )}
      >
        {value}
      </span>
    </button>
  );
};
