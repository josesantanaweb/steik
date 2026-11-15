import * as React from "react";
import { cn } from "@/modules/shared/utils/cn";

export interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children?: React.ReactNode;
}

export const Pill = React.forwardRef<HTMLButtonElement, PillProps>(
  ({ active = false, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "shrink-0 cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold uppercase whitespace-nowrap transition-colors",
          active
            ? "bg-primary border-primary text-surface"
            : "border-stroke bg-surface text-white hover:bg-primary hover:text-surface hover:border-primary",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Pill.displayName = "Pill";
