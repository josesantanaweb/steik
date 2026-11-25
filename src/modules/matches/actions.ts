import "server-only";
import { MatchStatus, type Prisma } from "@prisma/client";
import { z } from "zod";
import { db, isPrismaError } from "@/lib/db";
import { parsePaginationParams } from "@/lib/pagination";
import type { ApiResult, PaginatedResult } from "@/modules/shared/types";
import { CreateMatchSchema, UpdateMatchSchema } from "./schema";

const matchInclude = {
  league: true,
  homeTeam: true,
  awayTeam: true,
} satisfies Prisma.MatchInclude;
export type MatchWithRelations = Prisma.MatchGetPayload<{
  include: typeof matchInclude;
}>;

async function validateMatchRelations(
  leagueId: string,
  homeTeamId: string,
  awayTeamId: string,
): Promise<ApiResult<never> | null> {
  const league = await db.league.findUnique({
    where: { id: leagueId },
    select: { id: true },
  });

  if (!league) {
    return {
      success: false,
      status: 400,
      message: "La liga indicada no existe",
      errors: { leagueId: ["La liga indicada no existe"] },
    };
  }

  const teams = await db.team.findMany({
    where: { id: { in: [homeTeamId, awayTeamId] } },
    select: { id: true, leagueId: true },
  });

  if (teams.length !== 2) {
    return {
      success: false,
      status: 400,
      message: "Uno o ambos equipos no existen",
      errors: { teamId: ["Uno o ambos equipos no existen"] },
    };
  }

  if (teams.some((team) => team.leagueId !== leagueId)) {
    return {
      success: false,
      status: 400,
      message: "Los equipos deben pertenecer a la liga indicada",
      errors: { leagueId: ["Los equipos deben pertenecer a la liga indicada"] },
    };
  }

  return null;
}

export async function getMatches(
  searchParams: URLSearchParams,
): Promise<ApiResult<PaginatedResult<MatchWithRelations>>> {
  const { limit, offset } = parsePaginationParams(searchParams);
  const leagueId = searchParams.get("leagueId");
  const teamId = searchParams.get("teamId");
  const search = searchParams.get("search")?.trim();
  const statusParam = searchParams.get("status");
  const parsedStatus = statusParam
    ? z.nativeEnum(MatchStatus).safeParse(statusParam)
    : null;

  if (parsedStatus && !parsedStatus.success) {
    return {
      success: false,
      status: 400,
      message: "Estado de partido inválido",
      errors: { status: ["El estado indicado no es válido"] },
    };
  }

  const filters: Prisma.MatchWhereInput[] = [];

  if (teamId) {
    filters.push({ OR: [{ homeTeamId: teamId }, { awayTeamId: teamId }] });
  }

  if (search) {
    filters.push({
      OR: [
        { homeTeam: { name: { contains: search, mode: "insensitive" } } },
        { awayTeam: { name: { contains: search, mode: "insensitive" } } },
        { league: { name: { contains: search, mode: "insensitive" } } },
      ],
    });
  }

  const where: Prisma.MatchWhereInput = {
    ...(leagueId ? { leagueId } : {}),
    ...(parsedStatus?.success ? { status: parsedStatus.data } : {}),
    ...(filters.length > 0 ? { AND: filters } : {}),
  };

  try {
    const [total, matches] = await db.$transaction([
      db.match.count({ where }),
      db.match.findMany({
        where,
        include: matchInclude,
        orderBy: { kickoff: "asc" },
        skip: offset,
        take: limit,
      }),
    ]);

    return {
      success: true,
      status: 200,
      data: {
        data: matches,
        total,
        limit,
        offset,
        nextPage: offset + limit < total ? offset + limit : null,
      },
    };
  } catch {
    return {
      success: false,
      status: 500,
      message: "Error al obtener los partidos",
    };
  }
}

export async function getMatchById(
  id: string,
): Promise<ApiResult<MatchWithRelations>> {
  try {
    const match = await db.match.findUnique({
      where: { id },
      include: matchInclude,
    });

    if (!match) {
      return { success: false, status: 404, message: "Partido no encontrado" };
    }

    return { success: true, status: 200, data: match };
  } catch {
    return {
      success: false,
      status: 500,
      message: "Error al obtener el partido",
    };
  }
}

export async function createMatch(
  input: unknown,
): Promise<ApiResult<MatchWithRelations>> {
  const parsed = CreateMatchSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      message: "Datos de partido inválidos",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const relationError = await validateMatchRelations(
      parsed.data.leagueId,
      parsed.data.homeTeamId,
      parsed.data.awayTeamId,
    );

    if (relationError) return relationError;

    const match = await db.match.create({
      data: parsed.data,
      include: matchInclude,
    });
    return { success: true, status: 201, data: match };
  } catch (error) {
    if (isPrismaError(error) && error.code === "P2002") {
      return {
        success: false,
        status: 409,
        message: "Ya existe un partido con esos datos o identificador externo",
      };
    }

    return {
      success: false,
      status: 500,
      message: "Error al crear el partido",
    };
  }
}

export async function updateMatch(
  id: string,
  input: unknown,
): Promise<ApiResult<MatchWithRelations>> {
  const parsed = UpdateMatchSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      message: "Datos de partido inválidos",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const existing = await db.match.findUnique({ where: { id } });

    if (!existing) {
      return { success: false, status: 404, message: "Partido no encontrado" };
    }

    const leagueId = parsed.data.leagueId ?? existing.leagueId;
    const homeTeamId = parsed.data.homeTeamId ?? existing.homeTeamId;
    const awayTeamId = parsed.data.awayTeamId ?? existing.awayTeamId;

    if (homeTeamId === awayTeamId) {
      return {
        success: false,
        status: 400,
        message: "Datos de partido inválidos",
        errors: {
          awayTeamId: [
            "El equipo visitante debe ser distinto del equipo local",
          ],
        },
      };
    }

    const relationError = await validateMatchRelations(
      leagueId,
      homeTeamId,
      awayTeamId,
    );

    if (relationError) return relationError;

    const match = await db.match.update({
      where: { id },
      data: parsed.data,
      include: matchInclude,
    });
    return { success: true, status: 200, data: match };
  } catch (error) {
    if (isPrismaError(error) && error.code === "P2002") {
      return {
        success: false,
        status: 409,
        message: "Ya existe un partido con esos datos o identificador externo",
      };
    }

    return {
      success: false,
      status: 500,
      message: "Error al actualizar el partido",
    };
  }
}

export async function deleteMatch(
  id: string,
): Promise<ApiResult<MatchWithRelations>> {
  try {
    const match = await db.match.delete({
      where: { id },
      include: matchInclude,
    });
    return { success: true, status: 200, data: match };
  } catch (error) {
    if (isPrismaError(error) && error.code === "P2025") {
      return { success: false, status: 404, message: "Partido no encontrado" };
    }

    return {
      success: false,
      status: 500,
      message: "Error al eliminar el partido",
    };
  }
}
