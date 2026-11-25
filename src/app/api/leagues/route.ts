import { NextRequest, NextResponse } from "next/server";
import { createLeague, getLeagues } from "@/modules/leagues/actions";

export async function GET(request: NextRequest) {
  const result = await getLeagues(request.nextUrl.searchParams);
  return NextResponse.json(result, { status: result.status });
}

export async function POST(request: NextRequest) {
  try {
    const result = await createLeague(await request.json());
    return NextResponse.json(result, { status: result.status });
  } catch {
    return NextResponse.json(
      { success: false, status: 400, message: "JSON inválido" },
      { status: 400 },
    );
  }
}
