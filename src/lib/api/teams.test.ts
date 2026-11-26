import { beforeEach, describe, expect, it, vi } from "vitest";
import { API_ROUTES, CATALOG_PAGE_SIZE } from "@/constants";
import { getTeams } from "./teams";

const teamRecord = {
  id: "arsenal-id",
  name: "Arsenal",
  logo: "arsenal.png",
  league: { id: "premier-league-id", name: "Premier League" },
};

const paginatedResponse = {
  success: true,
  status: 200,
  data: {
    data: [teamRecord],
    total: 1,
    limit: CATALOG_PAGE_SIZE,
    offset: 0,
    nextPage: null,
  },
};

describe("getTeams", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches and maps the teams from the API", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => paginatedResponse,
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(getTeams()).resolves.toEqual([
      {
        ...teamRecord,
        logo: "/images/teams/arsenal.png",
      },
    ]);
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_ROUTES.TEAMS}?limit=${CATALOG_PAGE_SIZE}`,
    );
  });

  it("throws the API error when the request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({
          success: false,
          status: 500,
          message: "Error al obtener los equipos",
        }),
      }),
    );

    await expect(getTeams()).rejects.toThrow("Error al obtener los equipos");
  });
});
