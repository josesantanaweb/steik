import {
  MATCH_DATES_DAYS_AFTER,
  MATCH_DATES_DAYS_BEFORE,
  MATCH_MONTH_LABELS,
  MATCH_TODAY_LABEL,
  MATCH_WEEKDAY_LABELS,
} from "@/constants";
import type { MatchDay } from "@/modules/matches/types";

const pad = (value: number): string => String(value).padStart(2, "0");

const toDateKey = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

/**
 * Genera la tira de fechas alrededor de `today`:
 * `MATCH_DATES_DAYS_BEFORE` días antes, el día actual y `MATCH_DATES_DAYS_AFTER` después.
 */
export const getMatchDays = (today: Date): MatchDay[] => {
  const todayKey = toDateKey(today);
  const days: MatchDay[] = [];

  for (
    let offset = -MATCH_DATES_DAYS_BEFORE;
    offset <= MATCH_DATES_DAYS_AFTER;
    offset++
  ) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + offset,
    );
    const key = toDateKey(date);

    days.push({
      key,
      weekdayLabel:
        key === todayKey
          ? MATCH_TODAY_LABEL
          : MATCH_WEEKDAY_LABELS[date.getDay()],
      dayLabel: pad(date.getDate()),
      monthLabel: MATCH_MONTH_LABELS[date.getMonth()],
      isToday: key === todayKey,
    });
  }

  return days;
};
