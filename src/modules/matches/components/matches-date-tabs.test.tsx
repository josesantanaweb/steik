import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import type { MatchDay } from "@/modules/matches/types";
import { MatchesDateTabs } from "./matches-date-tabs";

const days: MatchDay[] = [
  {
    key: "2026-04-27",
    weekdayLabel: "LUN",
    dayLabel: "27",
    monthLabel: "Abr",
    isToday: false,
  },
  {
    key: "2026-04-30",
    weekdayLabel: "HOY",
    dayLabel: "30",
    monthLabel: "Abr",
    isToday: true,
  },
  {
    key: "2026-05-01",
    weekdayLabel: "VIE",
    dayLabel: "01",
    monthLabel: "May",
    isToday: false,
  },
];

describe("MatchesDateTabs", () => {
  it("renders one tab per day with weekday, day number and month", () => {
    render(
      <MatchesDateTabs
        days={days}
        activeDateKey="2026-04-30"
        onDateChange={vi.fn()}
      />,
    );

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveTextContent("LUN");
    expect(tabs[0]).toHaveTextContent("27 Abr");
    expect(tabs[1]).toHaveTextContent("HOY");
  });

  it("marks only the active day as selected", () => {
    render(
      <MatchesDateTabs
        days={days}
        activeDateKey="2026-04-30"
        onDateChange={vi.fn()}
      />,
    );

    const selected = screen.getAllByRole("tab", { selected: true });
    expect(selected).toHaveLength(1);
    expect(selected[0]).toHaveTextContent("HOY");
  });

  it("calls onDateChange with the day key when a tab is clicked", () => {
    const onDateChange = vi.fn();
    render(
      <MatchesDateTabs
        days={days}
        activeDateKey="2026-04-30"
        onDateChange={onDateChange}
      />,
    );

    fireEvent.click(screen.getByRole("tab", { name: /VIE/ }));

    expect(onDateChange).toHaveBeenCalledWith("2026-05-01");
  });
});
