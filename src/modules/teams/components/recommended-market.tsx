import type { ReactElement } from "react";
import { Lightbulb } from "lucide-react";
import { cn } from "@/modules/shared/utils/cn";

interface RecommendedMarketProps {
  market: string;
  confidence: number;
  description: string;
  title?: string;
  className?: string;
}

export const RecommendedMarket = ({
  market,
  confidence,
  description,
  title = "Mercado recomendado",
  className,
}: RecommendedMarketProps): ReactElement => {
  return (
    <div
      className={cn(
        "border-stroke bg-surface flex flex-col gap-3 rounded-xl border p-3",
        className,
      )}
    >
      <h4 className="text-lg font-semibold text-white uppercase">{title}</h4>

      <div className="flex items-center justify-between">
        <span className="border-primary bg-primary/10 text-primary flex h-8 items-center justify-center rounded-full border px-4 py-2 text-center text-sm font-semibold uppercase">
          {market}
        </span>
        <div className="flex flex-col items-end justify-center">
          <h6 className="text-primary text-lg font-semibold">{confidence}%</h6>
          <p className="text-body text-sm">Confianza</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h6 className="text-base font-semibold text-white">Resultado</h6>
        <div className="border-stroke bg-surface flex items-center gap-3 rounded-xl border p-3">
          <span className="bg-stroke flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
            <Lightbulb className="text-primary h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-body text-xs">{description}</p>
        </div>
      </div>
    </div>
  );
};
