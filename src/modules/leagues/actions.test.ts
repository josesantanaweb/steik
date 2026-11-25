import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createLeague,
  deleteLeague,
  getLeagueById,
  getLeagues,
  updateLeague,
} from "./actions";

const mocks = vi.hoisted(() => ({
  count: vi.fn(),
  findMany: vi.fn(),
  findUnique: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  transaction: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  db: {
    league: {
      count: mocks.count,
      findMany: mocks.findMany,
      findUnique: mocks.findUnique,
      create: mocks.create,
      update: mocks.update,
      delete: mocks.delete,
    },
    $transaction: mocks.transaction,
  },
  isPrismaError: (error: unknown) =>
    typeof error === "object" && error !== null && "code" in error,
}));

const league = {
  id: "league-1",
  name: "La Liga",
  slug: "la-liga",
  country: "España",
  logo: null,
  externalId: null,
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
};

describe("leagues actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lists leagues with search and pagination", async () => {
    mocks.transaction.mockResolvedValue([15, [league]]);

    const result = await getLeagues(
      new URLSearchParams({ search: "liga", limit: "10", offset: "0" }),
    );

    expect(mocks.count).toHaveBeenCalledWith({
      where: {
        OR: [
          { name: { contains: "liga", mode: "insensitive" } },
          { slug: { contains: "liga", mode: "insensitive" } },
        ],
      },
    });
    expect(result).toMatchObject({
      success: true,
      status: 200,
      data: { data: [league], total: 15, nextPage: 10 },
    });
  });

  it("rejects invalid league data", async () => {
    const result = await createLeague({ name: "", slug: "La Liga" });

    expect(result).toMatchObject({ success: false, status: 400 });
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it("creates a league", async () => {
    mocks.create.mockResolvedValue(league);

    const result = await createLeague({ name: "La Liga", slug: "la-liga" });

    expect(result).toMatchObject({ success: true, status: 201, data: league });
  });

  it("returns a conflict when the league already exists", async () => {
    mocks.create.mockRejectedValue({ code: "P2002" });

    const result = await createLeague({ name: "La Liga", slug: "la-liga" });

    expect(result).toMatchObject({ success: false, status: 409 });
  });

  it("returns not found when a league does not exist", async () => {
    mocks.findUnique.mockResolvedValue(null);

    const result = await getLeagueById("missing");

    expect(result).toMatchObject({ success: false, status: 404 });
  });

  it("updates a league", async () => {
    mocks.update.mockResolvedValue({ ...league, name: "Liga EA Sports" });

    const result = await updateLeague(league.id, { name: "Liga EA Sports" });

    expect(mocks.update).toHaveBeenCalledWith({
      where: { id: league.id },
      data: { name: "Liga EA Sports" },
    });
    expect(result).toMatchObject({ success: true, status: 200 });
  });

  it("prevents deleting a league with related records", async () => {
    mocks.delete.mockRejectedValue({ code: "P2014" });

    const result = await deleteLeague(league.id);

    expect(result).toMatchObject({ success: false, status: 409 });
  });
});
