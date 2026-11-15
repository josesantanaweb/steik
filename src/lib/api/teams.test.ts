import { describe, expect, it, vi, beforeEach } from "vitest";
import { ASSETS } from "@/constants";
import { getTeams } from "./teams";

describe("getTeams", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches the teams JSON from public data", async () => {
    const teams = [{ id: "arsenal", name: "Arsenal" }];
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => teams,
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(getTeams()).resolves.toEqual(teams);
    expect(fetchMock).toHaveBeenCalledWith(ASSETS.DATA.TEAMS);
  });

  it("throws a Spanish error when the request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) }),
    );

    await expect(getTeams()).rejects.toThrow(
      "No se pudieron cargar los equipos",
    );
  });
});
