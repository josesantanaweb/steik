import { describe, expect, it } from "vitest";
import { isActiveRoute } from "./is-active-route";

describe("isActiveRoute", () => {
  it("matches the root only when the pathname is exactly '/'", () => {
    expect(isActiveRoute("/", "/", "/")).toBe(true);
    expect(isActiveRoute("/teams", "/", "/")).toBe(false);
  });

  it("matches the exact route", () => {
    expect(isActiveRoute("/teams", "/teams")).toBe(true);
  });

  it("matches nested routes under the href", () => {
    expect(isActiveRoute("/teams/42", "/teams")).toBe(true);
  });

  it("does not match routes that only share a prefix", () => {
    expect(isActiveRoute("/teamsX", "/teams")).toBe(false);
  });

  it("does not match unrelated routes", () => {
    expect(isActiveRoute("/history", "/teams")).toBe(false);
  });
});
