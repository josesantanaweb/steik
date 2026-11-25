import { NextRequest, NextResponse } from "next/server";
import { createMatch, getMatches } from "@/modules/matches/actions";

export async function GET(request: NextRequest) {
  const result = await getMatches(request.nextUrl.searchParams);
  return NextResponse.json(result, { status: result.status });
}

export async function POST(request: NextRequest) {
  try {
    const result = await createMatch(await request.json());
    return NextResponse.json(result, { status: result.status });
  } catch {
    return NextResponse.json(
      { success: false, status: 400, message: "JSON inválido" },
      { status: 400 },
    );
  }
}
