import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

export async function seedCatalog(db, catalog) {
  if (!Array.isArray(catalog?.leagues) || !Array.isArray(catalog?.teams)) {
    throw new Error("El catálogo debe contener listas de ligas y equipos");
  }

  const leagueIds = new Map();

  for (const league of catalog.leagues) {
    const data = {
      name: league.name,
      slug: league.slug,
      country: league.country,
      logo: league.logo,
      externalId: league.externalId,
    };
    const savedLeague = await db.league.upsert({
      where: { slug: league.slug },
      update: data,
      create: data,
    });

    leagueIds.set(savedLeague.slug, savedLeague.id);
  }

  for (const team of catalog.teams) {
    const leagueId = leagueIds.get(team.leagueSlug);

    if (!leagueId) {
      throw new Error(`La liga ${team.leagueSlug} no existe en el catálogo`);
    }

    const data = {
      name: team.name,
      slug: team.slug,
      logo: team.logo,
      externalId: team.externalId,
      leagueId,
    };

    await db.team.upsert({
      where: { slug: team.slug },
      update: data,
      create: data,
    });
  }

  return { leagues: leagueIds.size, teams: catalog.teams.length };
}

async function main() {
  dotenv.config({ path: [".env.local", ".env"], quiet: true });

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL no está definida");
  }

  const [leaguesContent, teamsContent] = await Promise.all([
    readFile(new URL("./data/leagues.json", import.meta.url), "utf8"),
    readFile(new URL("./data/teams.json", import.meta.url), "utf8"),
  ]);
  const catalog = {
    leagues: JSON.parse(leaguesContent),
    teams: JSON.parse(teamsContent),
  };
  const db = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });

  try {
    const result = await seedCatalog(db, catalog);
    console.log(
      `Seed completado: ${result.leagues} ligas y ${result.teams} equipos`,
    );
  } finally {
    await db.$disconnect();
  }
}

if (
  process.argv[1] &&
  fileURLToPath(import.meta.url) === resolve(process.argv[1])
) {
  main().catch((error) => {
    console.error("Error al ejecutar el seed", error);
    process.exitCode = 1;
  });
}
