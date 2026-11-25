import { NextRequest, NextResponse } from "next/server";
import {
  deleteMatch,
  getMatchById,
  updateMatch,
} from "@/modules/matches/actions";

interface MatchRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: MatchRouteContext,
) {
  const { id } = await params;
  const result = await getMatchById(id);
  return NextResponse.json(result, { status: result.status });
}

export async function PATCH(
  request: NextRequest,
  { params }: MatchRouteContext,
) {
  try {
    const { id } = await params;
    const result = await updateMatch(id, await request.json());
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
  { params }: MatchRouteContext,
) {
  const { id } = await params;
  const result = await deleteMatch(id);
  return NextResponse.json(result, { status: result.status });
}
