import { describe, expect, it } from "vitest";
import { BOTTOM_NAV_ITEMS } from "./navigation";
import { ROUTES } from "./routes";

describe("BOTTOM_NAV_ITEMS", () => {
  it("has five items in the expected order", () => {
    expect(BOTTOM_NAV_ITEMS.map((item) => item.key)).toEqual([
      "dashboard",
      "teams",
      "new-bet",
      "matches",
      "history",
    ]);
  });

  it("has unique keys", () => {
    const keys = BOTTOM_NAV_ITEMS.map((item) => item.key);

    expect(new Set(keys).size).toBe(keys.length);
  });

  it("has exactly one centered item, the new bet button", () => {
    const centerItems = BOTTOM_NAV_ITEMS.filter((item) => item.isCenter);

    expect(centerItems).toHaveLength(1);
    expect(centerItems[0]?.href).toBe(ROUTES.NEW_BET);
  });

  it("points every item to an existing route", () => {
    const routes = Object.values(ROUTES);

    for (const item of BOTTOM_NAV_ITEMS) {
      expect(routes).toContain(item.href);
    }
  });
});
