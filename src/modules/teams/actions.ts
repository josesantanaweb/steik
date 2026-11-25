import "server-only";
import type { Prisma } from "@prisma/client";
import { db, isPrismaError } from "@/lib/db";
import { parsePaginationParams } from "@/lib/pagination";
import type { ApiResult, PaginatedResult } from "@/modules/shared/types";
import { CreateTeamSchema, UpdateTeamSchema } from "./schema";

const teamInclude = { league: true } satisfies Prisma.TeamInclude;
export type TeamWithLeague = Prisma.TeamGetPayload<{
  include: typeof teamInclude;
}>;

async function leagueExists(leagueId: string): Promise<boolean> {
  const league = await db.league.findUnique({
    where: { id: leagueId },
    select: { id: true },
  });
  return Boolean(league);
}

export async function getTeams(
  searchParams: URLSearchParams,
): Promise<ApiResult<PaginatedResult<TeamWithLeague>>> {
  const { limit, offset } = parsePaginationParams(searchParams);
  const search = searchParams.get("search")?.trim();
  const leagueId = searchParams.get("leagueId");
  const where: Prisma.TeamWhereInput = {
    ...(leagueId ? { leagueId } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { slug: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  try {
    const [total, teams] = await db.$transaction([
      db.team.count({ where }),
      db.team.findMany({
        where,
        include: teamInclude,
        orderBy: { name: "asc" },
        skip: offset,
        take: limit,
      }),
    ]);

    return {
      success: true,
      status: 200,
      data: {
        data: teams,
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
      message: "Error al obtener los equipos",
    };
  }
}

export async function getTeamById(
  id: string,
): Promise<ApiResult<TeamWithLeague>> {
  try {
    const team = await db.team.findUnique({
      where: { id },
      include: teamInclude,
    });

    if (!team) {
      return { success: false, status: 404, message: "Equipo no encontrado" };
    }

    return { success: true, status: 200, data: team };
  } catch {
    return {
      success: false,
      status: 500,
      message: "Error al obtener el equipo",
    };
  }
}

export async function createTeam(
  input: unknown,
): Promise<ApiResult<TeamWithLeague>> {
  const parsed = CreateTeamSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      message: "Datos de equipo inválidos",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    if (!(await leagueExists(parsed.data.leagueId))) {
      return {
        success: false,
        status: 400,
        message: "La liga indicada no existe",
        errors: { leagueId: ["La liga indicada no existe"] },
      };
    }

    const team = await db.team.create({
      data: parsed.data,
      include: teamInclude,
    });
    return { success: true, status: 201, data: team };
  } catch (error) {
    if (isPrismaError(error) && error.code === "P2002") {
      return {
        success: false,
        status: 409,
        message: "Ya existe un equipo con ese slug o identificador externo",
      };
    }

    return { success: false, status: 500, message: "Error al crear el equipo" };
  }
}

export async function updateTeam(
  id: string,
  input: unknown,
): Promise<ApiResult<TeamWithLeague>> {
  const parsed = UpdateTeamSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      message: "Datos de equipo inválidos",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    if (parsed.data.leagueId && !(await leagueExists(parsed.data.leagueId))) {
      return {
        success: false,
        status: 400,
        message: "La liga indicada no existe",
        errors: { leagueId: ["La liga indicada no existe"] },
      };
    }

    const team = await db.team.update({
      where: { id },
      data: parsed.data,
      include: teamInclude,
    });
    return { success: true, status: 200, data: team };
  } catch (error) {
    if (isPrismaError(error)) {
      if (error.code === "P2025") {
        return { success: false, status: 404, message: "Equipo no encontrado" };
      }

      if (error.code === "P2002") {
        return {
          success: false,
          status: 409,
          message: "Ya existe un equipo con ese slug o identificador externo",
        };
      }
    }

    return {
      success: false,
      status: 500,
      message: "Error al actualizar el equipo",
    };
  }
}

export async function deleteTeam(
  id: string,
): Promise<ApiResult<TeamWithLeague>> {
  try {
    const team = await db.team.delete({ where: { id }, include: teamInclude });
    return { success: true, status: 200, data: team };
  } catch (error) {
    if (isPrismaError(error)) {
      if (error.code === "P2025") {
        return { success: false, status: 404, message: "Equipo no encontrado" };
      }

      if (error.code === "P2003" || error.code === "P2014") {
        return {
          success: false,
          status: 409,
          message: "No se puede eliminar un equipo con partidos asociados",
        };
      }
    }

    return {
      success: false,
      status: 500,
      message: "Error al eliminar el equipo",
    };
  }
}
