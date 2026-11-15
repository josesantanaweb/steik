import { describe, expect, it } from "vitest";
import { formatSignedPrice } from "./format-signed-price";

describe("formatSignedPrice", () => {
  it("prefixes positive values with a plus sign", () => {
    expect(formatSignedPrice(100)).toBe("+$100.00");
  });

  it("prefixes negative values with a minus sign", () => {
    expect(formatSignedPrice(-42.5)).toBe("-$42.50");
  });

  it("does not add a sign to zero", () => {
    expect(formatSignedPrice(0)).toBe("$0.00");
  });

  it("returns an empty string for NaN", () => {
    expect(formatSignedPrice(Number.NaN)).toBe("");
  });
});
