import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { getTeams } from "@/lib/api/teams";
import { useTeams } from "./use-teams";

vi.mock("@/lib/api/teams", () => ({
  getTeams: vi.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useTeams", () => {
  beforeEach(() => {
    vi.mocked(getTeams).mockReset();
    queryClient.clear();
  });

  it("returns the teams from the API", async () => {
    vi.mocked(getTeams).mockResolvedValue([
      { id: "roma", name: "Roma", league: "SERIE_A", logo: "" },
    ]);

    const { result } = renderHook(() => useTeams(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(1);
  });
});
