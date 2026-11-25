"use client";

import { useState, type ReactElement } from "react";
import type { MatchOdds } from "@/modules/matches/types";
import { formatOdd } from "@/modules/matches/utils";
import { OddsButton } from "@/modules/shared/components/ui/odds-button";
import { cn } from "@/modules/shared/utils/cn";

interface MarketOption {
  key: string;
  label: string;
  odd: number;
  detail?: string;
}

interface Market {
  key: string;
  title: string;
  options: MarketOption[];
}

const getMarkets = (
  odds: MatchOdds,
  homeTeamName: string,
  awayTeamName: string,
): Market[] => [
  {
    key: "full-time-result",
    title: "Resultado final (1X2)",
    options: [
      { key: "home", label: "1", odd: odds.home },
      { key: "draw", label: "X", odd: odds.draw },
      { key: "away", label: "2", odd: odds.away },
    ],
  },
  {
    key: "double-chance",
    title: "Doble oportunidad",
    options: [
      { key: "home-draw", label: "1X", odd: 2.1 },
      { key: "home-away", label: "12", odd: 2 },
      { key: "draw-away", label: "2X", odd: 1.5 },
    ],
  },
  {
    key: "team-wins-half",
    title: "Equipo gana al menos 1 mitad",
    options: [
      { key: "home", label: "1", odd: 1.4 },
      { key: "away", label: "2", odd: 1.5 },
    ],
  },
  {
    key: "total-goals",
    title: "Total de goles",
    options: [
      { key: "over", label: "Más de", detail: "2.5 Goles", odd: 1.9 },
      { key: "under", label: "Menos de", detail: "2.5 Goles", odd: 1.9 },
    ],
  },
  {
    key: "home-team-total-goals",
    title: `Total de goles (${homeTeamName})`,
    options: [
      { key: "over", label: "Más de", detail: "0.5 Goles", odd: 1.1 },
      { key: "under", label: "Menos de", detail: "0.5 Goles", odd: 6 },
    ],
  },
  {
    key: "away-team-total-goals",
    title: `Total de goles (${awayTeamName})`,
    options: [
      { key: "over", label: "Más de", detail: "0.5 Goles", odd: 1.08 },
      { key: "under", label: "Menos de", detail: "0.5 Goles", odd: 7 },
    ],
  },
];

interface MatchMarketsProps {
  odds: MatchOdds;
  homeTeamName: string;
  awayTeamName: string;
}

export const MatchMarkets = ({
  odds,
  homeTeamName,
  awayTeamName,
}: MatchMarketsProps): ReactElement => {
  const [selections, setSelections] = useState<Record<string, string>>({
    "full-time-result": "home",
  });

  const toggleSelection = (marketKey: string, optionKey: string): void => {
    setSelections((current) => ({
      ...current,
      [marketKey]: current[marketKey] === optionKey ? "" : optionKey,
    }));
  };

  return (
    <section aria-labelledby="markets-title" className="flex flex-col gap-3">
      <h2 id="markets-title" className="text-lg font-semibold uppercase">
        Mercados
      </h2>

      <div className="flex flex-col gap-3">
        {getMarkets(odds, homeTeamName, awayTeamName).map((market) => (
          <article
            key={market.key}
            className="border-stroke bg-surface flex flex-col gap-4 rounded-2xl border p-5"
          >
            <h3 className="text-sm font-semibold">{market.title}</h3>

            <ul
              className={cn(
                "grid gap-3",
                market.options.length === 2 ? "grid-cols-2" : "grid-cols-3",
              )}
            >
              {market.options.map((option) => {
                const isSelected = selections[market.key] === option.key;
                const odd = formatOdd(option.odd);
                const optionLabel = option.detail
                  ? `${option.label} ${option.detail}`
                  : option.label;

                return (
                  <li key={option.key}>
                    <OddsButton
                      ariaLabel={`${market.title}, ${optionLabel}: ${odd}`}
                      label={optionLabel}
                      value={odd}
                      isSelected={isSelected}
                      onClick={() => toggleSelection(market.key, option.key)}
                    />
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};
