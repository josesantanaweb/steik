import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createTeam,
  deleteTeam,
  getTeamById,
  getTeams,
  updateTeam,
} from "./actions";

const mocks = vi.hoisted(() => ({
  teamCount: vi.fn(),
  teamFindMany: vi.fn(),
  teamFindUnique: vi.fn(),
  teamCreate: vi.fn(),
  teamUpdate: vi.fn(),
  teamDelete: vi.fn(),
  leagueFindUnique: vi.fn(),
  transaction: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  db: {
    team: {
      count: mocks.teamCount,
      findMany: mocks.teamFindMany,
      findUnique: mocks.teamFindUnique,
      create: mocks.teamCreate,
      update: mocks.teamUpdate,
      delete: mocks.teamDelete,
    },
    league: { findUnique: mocks.leagueFindUnique },
    $transaction: mocks.transaction,
  },
  isPrismaError: (error: unknown) =>
    typeof error === "object" && error !== null && "code" in error,
}));

const leagueId = "550e8400-e29b-41d4-a716-446655440000";
const team = {
  id: "team-1",
  name: "Real Madrid",
  slug: "real-madrid",
  logo: null,
  externalId: null,
  leagueId,
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
  league: { id: leagueId, name: "La Liga" },
};
const validTeam = { name: "Real Madrid", slug: "real-madrid", leagueId };

describe("teams actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lists teams filtered by league and search", async () => {
    mocks.transaction.mockResolvedValue([1, [team]]);

    const result = await getTeams(
      new URLSearchParams({ leagueId, search: "madrid" }),
    );

    expect(mocks.teamFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ leagueId }),
        include: { league: true },
      }),
    );
    expect(result).toMatchObject({
      success: true,
      data: { data: [team], total: 1, nextPage: null },
    });
  });

  it("returns not found when a team does not exist", async () => {
    mocks.teamFindUnique.mockResolvedValue(null);

    const result = await getTeamById("missing");

    expect(result).toMatchObject({ success: false, status: 404 });
  });

  it("rejects a team whose league does not exist", async () => {
    mocks.leagueFindUnique.mockResolvedValue(null);

    const result = await createTeam(validTeam);

    expect(result).toMatchObject({
      success: false,
      status: 400,
      errors: { leagueId: ["La liga indicada no existe"] },
    });
    expect(mocks.teamCreate).not.toHaveBeenCalled();
  });

  it("creates a team with its league", async () => {
    mocks.leagueFindUnique.mockResolvedValue({ id: leagueId });
    mocks.teamCreate.mockResolvedValue(team);

    const result = await createTeam(validTeam);

    expect(mocks.teamCreate).toHaveBeenCalledWith({
      data: validTeam,
      include: { league: true },
    });
    expect(result).toMatchObject({ success: true, status: 201, data: team });
  });

  it("rejects an empty team update", async () => {
    const result = await updateTeam(team.id, {});

    expect(result).toMatchObject({ success: false, status: 400 });
    expect(mocks.teamUpdate).not.toHaveBeenCalled();
  });

  it("updates a team", async () => {
    mocks.teamUpdate.mockResolvedValue({ ...team, name: "Real Madrid CF" });

    const result = await updateTeam(team.id, { name: "Real Madrid CF" });

    expect(result).toMatchObject({ success: true, status: 200 });
  });

  it("returns a conflict when deleting a team with matches", async () => {
    mocks.teamDelete.mockRejectedValue({ code: "P2003" });

    const result = await deleteTeam(team.id);

    expect(result).toMatchObject({ success: false, status: 409 });
  });
});
