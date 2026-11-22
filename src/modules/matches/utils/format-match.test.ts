import { describe, expect, it } from "vitest";
import { formatKickoffDate, formatKickoffTime, formatOdd } from "./format-match";

describe("format-match", () => {
  const kickoff = new Date(2026, 3, 28, 9, 0).toISOString();

  it("formats the kickoff time as hh:mm AM/PM", () => {
    expect(formatKickoffTime(kickoff)).toBe("09:00 AM");
  });

  it("formats the kickoff date as dd Mon", () => {
    expect(formatKickoffDate(kickoff)).toBe("28 Apr");
  });

  it("formats odds with two decimals", () => {
    expect(formatOdd(2)).toBe("2.00");
    expect(formatOdd(1.6)).toBe("1.60");
  });
});
