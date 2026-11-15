import { describe, expect, it } from "vitest";
import { normalizeText } from "./normalize-text";

describe("normalizeText", () => {
  it("lowercases text", () => {
    expect(normalizeText("Real Madrid")).toBe("real madrid");
  });

  it("removes diacritics", () => {
    expect(normalizeText("Atlético Múnich")).toBe("atletico munich");
  });

  it("trims surrounding whitespace", () => {
    expect(normalizeText("  Roma  ")).toBe("roma");
  });
});
