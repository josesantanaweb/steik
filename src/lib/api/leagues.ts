import { API_ROUTES, CATALOG_PAGE_SIZE } from "@/constants";
import type { League } from "@/modules/leagues/types";
import type { ApiResult, PaginatedResult } from "@/modules/shared/types";

export async function getLeagues(): Promise<League[]> {
  const res = await fetch(
    `${API_ROUTES.LEAGUES}?limit=${CATALOG_PAGE_SIZE}`,
  );
  const result = (await res.json()) as ApiResult<
    PaginatedResult<League>
  >;

  if (!res.ok || !result.success) {
    throw new Error(result.message || "No se pudieron cargar las ligas");
  }

  return result.data.data;
}
