import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useStockList } from "../useStockList";
import * as stockService from "../../../services/stockService";
import { QueryClientProvider } from "@tanstack/react-query";
import { createTestQueryClient } from "../../../test/testUtils";

const mockResponse = {
  data: [
    { symbol: "AAPL", name: "Apple", currency: "USD", type: "common stock" },
    { symbol: "MSFT", name: "Microsoft", currency: "USD", type: "common stock" },
  ],
};

describe("useStockList", () => {
  it("fetches and returns stock list", async () => {
    const queryClient = createTestQueryClient();
    const spy = vi.spyOn(stockService, "fetchStockList").mockResolvedValueOnce(
      mockResponse as any
    );

    const { result } = renderHook(() => useStockList("NASDAQ"), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.data.length).toBe(2);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("stores initial data in cache with staleTime Infinity", async () => {
    const queryClient = createTestQueryClient();
    vi.spyOn(stockService, "fetchStockList").mockResolvedValueOnce(
      mockResponse as any
    );

    const { result } = renderHook(() => useStockList("NASDAQ"), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const cached = queryClient.getQueryData(["stocks", "list", "NASDAQ"]);
    expect(cached).toBeDefined();
  });
});
