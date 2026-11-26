import { describe, expect, it, vi } from "vitest";
import { seedCatalog } from "./seed.mjs";

const catalog = {
  leagues: [
    {
      name: "La Liga",
      slug: "la-liga",
      country: "españa",
      logo: "la-liga.png",
      externalId: null,
    },
    {
      name: "Serie A",
      slug: "serie-a",
      country: "italia",
      logo: "serie-a.png",
      externalId: null,
    },
  ],
  teams: [
    {
      name: "Real Madrid",
      slug: "real-madrid",
      leagueSlug: "la-liga",
      logo: "real-madrid.png",
      externalId: null,
    },
    {
      name: "Roma",
      slug: "roma",
      leagueSlug: "serie-a",
      logo: "roma.png",
      externalId: null,
    },
  ],
};

function createDbMock() {
  const leagueUpsert = vi.fn(({ create }) =>
    Promise.resolve({ id: `${create.slug}-id`, slug: create.slug }),
  );
  const teamUpsert = vi.fn().mockResolvedValue({});

  return {
    db: {
      league: { upsert: leagueUpsert },
      team: { upsert: teamUpsert },
    },
    leagueUpsert,
    teamUpsert,
  };
}

describe("seedCatalog", () => {
  it("relates teams using the id returned by their league upsert", async () => {
    const { db, teamUpsert } = createDbMock();

    await expect(seedCatalog(db, catalog)).resolves.toEqual({
      leagues: 2,
      teams: 2,
    });

    expect(teamUpsert.mock.calls.map(([args]) => args.create.leagueId)).toEqual(
      ["la-liga-id", "serie-a-id"],
    );
  });

  it("uses unique slugs to make repeated runs idempotent", async () => {
    const { db, leagueUpsert, teamUpsert } = createDbMock();

    await seedCatalog(db, catalog);
    await seedCatalog(db, catalog);

    expect(leagueUpsert).toHaveBeenCalledTimes(4);
    expect(teamUpsert).toHaveBeenCalledTimes(4);
    for (const call of [...leagueUpsert.mock.calls, ...teamUpsert.mock.calls]) {
      expect(call[0].where.slug).toBeDefined();
      expect(call[0].update).toEqual(call[0].create);
    }
  });

  it("rejects a team whose league is missing from the catalog", async () => {
    const { db, teamUpsert } = createDbMock();
    const invalidCatalog = {
      leagues: [],
      teams: [catalog.teams[0]],
    };

    await expect(seedCatalog(db, invalidCatalog)).rejects.toThrow(
      "La liga la-liga no existe en el catálogo",
    );
    expect(teamUpsert).not.toHaveBeenCalled();
  });

  it("rejects an invalid catalog shape", async () => {
    const { db } = createDbMock();

    await expect(seedCatalog(db, {})).rejects.toThrow(
      "El catálogo debe contener listas de ligas y equipos",
    );
  });
});
