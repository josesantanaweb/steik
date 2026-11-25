import { NextRequest, NextResponse } from "next/server";
import { deleteTeam, getTeamById, updateTeam } from "@/modules/teams/actions";

interface TeamRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: TeamRouteContext) {
  const { id } = await params;
  const result = await getTeamById(id);
  return NextResponse.json(result, { status: result.status });
}

export async function PATCH(
  request: NextRequest,
  { params }: TeamRouteContext,
) {
  try {
    const { id } = await params;
    const result = await updateTeam(id, await request.json());
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
  { params }: TeamRouteContext,
) {
  const { id } = await params;
  const result = await deleteTeam(id);
  return NextResponse.json(result, { status: result.status });
}
