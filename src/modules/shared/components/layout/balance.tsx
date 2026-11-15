"use client";

import type { ReactElement } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/modules/shared/utils/cn";
import { formatSignedPrice } from "@/modules/shared/utils/format-signed-price";

interface BalanceProps {
  amount: number;
  onAdd?: () => void;
  className?: string;
}

export const Balance = ({
  amount,
  onAdd,
  className,
}: BalanceProps): ReactElement => {
  return (
    <div
      className={cn(
        "border-stroke bg-canvas flex items-center gap-3 rounded-full border p-1",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="bg-stroke text-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-lg font-bold"
      >
        $
      </span>

      <span
        className={cn(
          "pr-2 text-base font-semibold tabular-nums",
          amount < 0 ? "text-error" : "text-foreground",
        )}
        aria-label={`Balance ${formatSignedPrice(amount)}`}
      >
        {formatSignedPrice(amount)}
      </span>

      <button
        type="button"
        onClick={onAdd}
        aria-label="Añadir movimiento"
        className="from-primary to-secondary text-surface flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-linear-to-br transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none"
      >
        <Plus size={24} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </div>
  );
};
