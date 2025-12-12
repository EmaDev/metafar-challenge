import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useTimeSeries } from "../useTimeSeries";
import * as stockService from "../../../services/stockService";
import { QueryClientProvider } from "@tanstack/react-query";
import { createTestQueryClient } from "../../../test/testUtils";
import { queryKeys } from "../queryKeys";

const mockSeries = {
  meta: {
    symbol: "AAPL",
    interval: "15min",
    currency: "USD",
    exchange_timezone: "America/New_York",
    mic_code: "XNAS",
    exchange: "NASDAQ",
    type: "common stock",
  },
  values: [
    {
      datetime: "2024-01-01 10:00:00",
      open: "100",
      high: "105",
      low: "99",
      close: "102",
      volume: "12345",
    },
  ],
  status: "ok",
};

describe("useTimeSeries", () => {
  it("fetches time series with the provided params", async () => {
    const queryClient = createTestQueryClient();
    const spy = vi
      .spyOn(stockService, "fetchTimeSeries")
      .mockResolvedValueOnce(mockSeries as any);

    const { result } = renderHook(
      () => useTimeSeries("AAPL", "15min", "2024-01-01", "2024-01-02"),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.meta.symbol).toBe("AAPL");
    expect(spy).toHaveBeenCalledWith(
      "AAPL",
      "15min",
      "2024-01-01",
      "2024-01-02"
    );
  });

  it("stores the series in cache with the expected queryKey", async () => {
    const queryClient = createTestQueryClient();
    vi.spyOn(stockService, "fetchTimeSeries").mockResolvedValueOnce(
      mockSeries as any
    );

    renderHook(() => useTimeSeries("AAPL", "15min"), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() =>
      expect(
        queryClient.getQueryData(
          queryKeys.stocks.timeSeries("AAPL", "15min", undefined, undefined)
        )
      ).toBeDefined()
    );
  });
});
