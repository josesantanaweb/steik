import { NextRequest, NextResponse } from "next/server";
import {
  deleteLeague,
  getLeagueById,
  updateLeague,
} from "@/modules/leagues/actions";

interface LeagueRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: LeagueRouteContext,
) {
  const { id } = await params;
  const result = await getLeagueById(id);
  return NextResponse.json(result, { status: result.status });
}

export async function PATCH(
  request: NextRequest,
  { params }: LeagueRouteContext,
) {
  try {
    const { id } = await params;
    const result = await updateLeague(id, await request.json());
    return NextResponse.json(result, { status: result.status });
  } catch {
    return NextResponse.json(
      { success: false, status: 400, message: "JSON inválido" },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: LeagueRouteContext,
) {
  const { id } = await params;
  const result = await deleteLeague(id);
  return NextResponse.json(result, { status: result.status });
}
