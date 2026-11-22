import { describe, expect, it } from "vitest";
import { MATCH_DATES_DAYS_AFTER, MATCH_DATES_DAYS_BEFORE } from "@/constants";
import { getMatchDays } from "./get-match-days";

describe("getMatchDays", () => {
  const today = new Date(2026, 3, 30); // 30 de abril de 2026

  it("returns the days before, today and the days after", () => {
    const days = getMatchDays(today);

    expect(days).toHaveLength(
      MATCH_DATES_DAYS_BEFORE + 1 + MATCH_DATES_DAYS_AFTER,
    );
    expect(days[0].key).toBe("2026-04-27");
    expect(days[MATCH_DATES_DAYS_BEFORE].key).toBe("2026-04-30");
  });

  it("labels the current day as HOY", () => {
    const todayDay = getMatchDays(today).find((day) => day.isToday);

    expect(todayDay).toMatchObject({
      key: "2026-04-30",
      weekdayLabel: "HOY",
      dayLabel: "30",
      isToday: true,
    });
  });

  it("uses Spanish weekday abbreviations", () => {
    const days = getMatchDays(today);

    // 27 de abril de 2026 es lunes
    expect(days[0]).toMatchObject({
      weekdayLabel: "LUN",
      dayLabel: "27",
      isToday: false,
    });
    expect(days[1].weekdayLabel).toBe("MAR");
  });

  it("crosses month boundaries correctly", () => {
    const days = getMatchDays(new Date(2026, 4, 1)); // 1 de mayo

    expect(days.map((day) => day.key)).toContain("2026-04-30");
  });

  it("includes the abbreviated month for each day", () => {
    const days = getMatchDays(today);

    expect(days[0]).toMatchObject({ dayLabel: "27", monthLabel: "Abr" });
    expect(
      getMatchDays(new Date(2026, 8, 17)).find((day) => day.isToday),
    ).toMatchObject({ dayLabel: "17", monthLabel: "Sep" });
  });

  it("marks only one day as today", () => {
    const todayDays = getMatchDays(today).filter((day) => day.isToday);

    expect(todayDays).toHaveLength(1);
  });
});
