import "server-only";
import type { League, Prisma } from "@prisma/client";
import { db, isPrismaError } from "@/lib/db";
import { parsePaginationParams } from "@/lib/pagination";
import type { ApiResult, PaginatedResult } from "@/modules/shared/types";
import { CreateLeagueSchema, UpdateLeagueSchema } from "./schema";

export async function getLeagues(
  searchParams: URLSearchParams,
): Promise<ApiResult<PaginatedResult<League>>> {
  const { limit, offset } = parsePaginationParams(searchParams);
  const search = searchParams.get("search")?.trim();
  const where: Prisma.LeagueWhereInput = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { slug: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  try {
    const [total, leagues] = await db.$transaction([
      db.league.count({ where }),
      db.league.findMany({
        where,
        orderBy: { name: "asc" },
        skip: offset,
        take: limit,
      }),
    ]);

    return {
      success: true,
      status: 200,
      data: {
        data: leagues,
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
      message: "Error al obtener las ligas",
    };
  }
}

export async function getLeagueById(id: string): Promise<ApiResult<League>> {
  try {
    const league = await db.league.findUnique({ where: { id } });

    if (!league) {
      return { success: false, status: 404, message: "Liga no encontrada" };
    }

    return { success: true, status: 200, data: league };
  } catch {
    return {
      success: false,
      status: 500,
      message: "Error al obtener la liga",
    };
  }
}

export async function createLeague(input: unknown): Promise<ApiResult<League>> {
  const parsed = CreateLeagueSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      message: "Datos de liga inválidos",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const league = await db.league.create({ data: parsed.data });
    return { success: true, status: 201, data: league };
  } catch (error) {
    if (isPrismaError(error) && error.code === "P2002") {
      return {
        success: false,
        status: 409,
        message: "Ya existe una liga con ese slug o identificador externo",
      };
    }

    return { success: false, status: 500, message: "Error al crear la liga" };
  }
}

export async function updateLeague(
  id: string,
  input: unknown,
): Promise<ApiResult<League>> {
  const parsed = UpdateLeagueSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      message: "Datos de liga inválidos",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const league = await db.league.update({
      where: { id },
      data: parsed.data,
    });
    return { success: true, status: 200, data: league };
  } catch (error) {
    if (isPrismaError(error)) {
      if (error.code === "P2025") {
        return { success: false, status: 404, message: "Liga no encontrada" };
      }

      if (error.code === "P2002") {
        return {
          success: false,
          status: 409,
          message: "Ya existe una liga con ese slug o identificador externo",
        };
      }
    }

    return {
      success: false,
      status: 500,
      message: "Error al actualizar la liga",
    };
  }
}

export async function deleteLeague(id: string): Promise<ApiResult<League>> {
  try {
    const league = await db.league.delete({ where: { id } });
    return { success: true, status: 200, data: league };
  } catch (error) {
    if (isPrismaError(error)) {
      if (error.code === "P2025") {
        return { success: false, status: 404, message: "Liga no encontrada" };
      }

      if (error.code === "P2003" || error.code === "P2014") {
        return {
          success: false,
          status: 409,
          message: "No se puede eliminar una liga con equipos o partidos",
        };
      }
    }

    return {
      success: false,
      status: 500,
      message: "Error al eliminar la liga",
    };
  }
}
