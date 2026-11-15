import { describe, expect, it } from "vitest";
import { FormResult } from "../types";
import { getFakeForm } from "./get-fake-form";

describe("getFakeForm", () => {
  it("returns five results by default", () => {
    expect(getFakeForm("arsenal")).toHaveLength(5);
  });

  it("returns the requested length", () => {
    expect(getFakeForm("arsenal", 3)).toHaveLength(3);
  });

  it("only returns WIN or LOSS", () => {
    for (const result of getFakeForm("roma", 50)) {
      expect([FormResult.WIN, FormResult.LOSS]).toContain(result);
    }
  });

  it("is deterministic for the same seed", () => {
    expect(getFakeForm("psg")).toEqual(getFakeForm("psg"));
  });

  it("differs between seeds", () => {
    expect(getFakeForm("psg", 20)).not.toEqual(getFakeForm("roma", 20));
  });
});
