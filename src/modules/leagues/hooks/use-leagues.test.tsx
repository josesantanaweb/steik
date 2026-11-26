import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getLeagues } from "@/lib/api/leagues";
import { useLeagues } from "./use-leagues";

vi.mock("@/lib/api/leagues", () => ({
  getLeagues: vi.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useLeagues", () => {
  beforeEach(() => {
    vi.mocked(getLeagues).mockReset();
    queryClient.clear();
  });

  it("returns the leagues from the API", async () => {
    vi.mocked(getLeagues).mockResolvedValue([
      { id: "serie-a", name: "Serie A" },
    ]);

    const { result } = renderHook(() => useLeagues(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([
      { id: "serie-a", name: "Serie A" },
    ]);
  });
});
