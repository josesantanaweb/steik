import { describe, expect, it } from "vitest";
import { PAGE_TITLES } from "./page-titles";

describe("PAGE_TITLES", () => {
  it("defines a non-empty title for every page", () => {
    for (const title of Object.values(PAGE_TITLES)) {
      expect(title.trim().length).toBeGreaterThan(0);
    }
  });

  it("has unique titles", () => {
    const titles = Object.values(PAGE_TITLES);

    expect(new Set(titles).size).toBe(titles.length);
  });
});
