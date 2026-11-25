import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createMatch,
  deleteMatch,
  getMatchById,
  getMatches,
  updateMatch,
} from "./actions";

const mocks = vi.hoisted(() => ({
  matchCount: vi.fn(),
  matchFindMany: vi.fn(),
  matchFindUnique: vi.fn(),
  matchCreate: vi.fn(),
  matchUpdate: vi.fn(),
  matchDelete: vi.fn(),
  leagueFindUnique: vi.fn(),
  teamFindMany: vi.fn(),
  transaction: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  db: {
    match: {
      count: mocks.matchCount,
      findMany: mocks.matchFindMany,
      findUnique: mocks.matchFindUnique,
      create: mocks.matchCreate,
      update: mocks.matchUpdate,
      delete: mocks.matchDelete,
    },
    league: { findUnique: mocks.leagueFindUnique },
    team: { findMany: mocks.teamFindMany },
    $transaction: mocks.transaction,
  },
  isPrismaError: (error: unknown) =>
    typeof error === "object" && error !== null && "code" in error,
}));

const leagueId = "550e8400-e29b-41d4-a716-446655440000";
const homeTeamId = "550e8400-e29b-41d4-a716-446655440001";
const awayTeamId = "550e8400-e29b-41d4-a716-446655440002";
const match = {
  id: "match-1",
  externalId: null,
  kickoff: new Date("2026-04-28T13:00:00.000Z"),
  status: "SCHEDULED",
  season: "2025-2026",
  round: null,
  homeScore: null,
  awayScore: null,
  leagueId,
  homeTeamId,
  awayTeamId,
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
  league: { id: leagueId, name: "La Liga" },
  homeTeam: { id: homeTeamId, name: "Real Madrid" },
  awayTeam: { id: awayTeamId, name: "Roma" },
};
const validMatch = {
  kickoff: "2026-04-28T13:00:00.000Z",
  season: "2025-2026",
  leagueId,
  homeTeamId,
  awayTeamId,
};

describe("matches actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects an invalid status filter", async () => {
    const result = await getMatches(new URLSearchParams({ status: "UNKNOWN" }));

    expect(result).toMatchObject({ success: false, status: 400 });
    expect(mocks.transaction).not.toHaveBeenCalled();
  });

  it("lists matches filtered by team and status", async () => {
    mocks.transaction.mockResolvedValue([1, [match]]);

    const result = await getMatches(
      new URLSearchParams({ teamId: homeTeamId, status: "SCHEDULED" }),
    );

    expect(mocks.matchFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          status: "SCHEDULED",
          AND: [{ OR: [{ homeTeamId }, { awayTeamId: homeTeamId }] }],
        },
      }),
    );
    expect(result).toMatchObject({
      success: true,
      data: { data: [match], total: 1 },
    });
  });

  it("gets a match with its relations", async () => {
    mocks.matchFindUnique.mockResolvedValue(match);

    const result = await getMatchById(match.id);

    expect(result).toMatchObject({ success: true, status: 200, data: match });
  });

  it("rejects a match with the same home and away team", async () => {
    const result = await createMatch({ ...validMatch, awayTeamId: homeTeamId });

    expect(result).toMatchObject({ success: false, status: 400 });
    expect(mocks.matchCreate).not.toHaveBeenCalled();
  });

  it("rejects teams outside the selected league", async () => {
    mocks.leagueFindUnique.mockResolvedValue({ id: leagueId });
    mocks.teamFindMany.mockResolvedValue([
      { id: homeTeamId, leagueId },
      { id: awayTeamId, leagueId: "another-league" },
    ]);

    const result = await createMatch(validMatch);

    expect(result).toMatchObject({ success: false, status: 400 });
    expect(mocks.matchCreate).not.toHaveBeenCalled();
  });

  it("creates a match after validating its relations", async () => {
    mocks.leagueFindUnique.mockResolvedValue({ id: leagueId });
    mocks.teamFindMany.mockResolvedValue([
      { id: homeTeamId, leagueId },
      { id: awayTeamId, leagueId },
    ]);
    mocks.matchCreate.mockResolvedValue(match);

    const result = await createMatch(validMatch);

    expect(result).toMatchObject({ success: true, status: 201, data: match });
  });

  it("validates merged teams when updating a match", async () => {
    mocks.matchFindUnique.mockResolvedValue(match);

    const result = await updateMatch(match.id, { awayTeamId: homeTeamId });

    expect(result).toMatchObject({ success: false, status: 400 });
    expect(mocks.matchUpdate).not.toHaveBeenCalled();
  });

  it("returns not found when deleting a missing match", async () => {
    mocks.matchDelete.mockRejectedValue({ code: "P2025" });

    const result = await deleteMatch(match.id);

    expect(result).toMatchObject({ success: false, status: 404 });
  });
});
