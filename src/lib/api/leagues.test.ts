import { beforeEach, describe, expect, it, vi } from "vitest";
import { API_ROUTES, CATALOG_PAGE_SIZE } from "@/constants";
import { getLeagues } from "./leagues";

const leagues = [
  { id: "la-liga-id", name: "La Liga" },
  { id: "premier-league-id", name: "Premier League" },
];

describe("getLeagues", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches the leagues from the API", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        status: 200,
        data: {
          data: leagues,
          total: leagues.length,
          limit: CATALOG_PAGE_SIZE,
          offset: 0,
          nextPage: null,
        },
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(getLeagues()).resolves.toEqual(leagues);
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_ROUTES.LEAGUES}?limit=${CATALOG_PAGE_SIZE}`,
    );
  });

  it("throws a Spanish error when the request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ success: false, status: 500 }),
      }),
    );

    await expect(getLeagues()).rejects.toThrow(
      "No se pudieron cargar las ligas",
    );
  });
});
