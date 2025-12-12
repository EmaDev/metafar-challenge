import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DetailPage from "../DetailPage";
import * as useStockMetaModule from "../../../hooks/queries/useStockMeta";
import * as useTimeSeriesModule from "../../../hooks/queries/useTimeSeries";

const createClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

describe("DetailPage", () => {
  it("renders loading state for meta", () => {
    vi.spyOn(useStockMetaModule, "useStockMeta").mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as any);
    vi.spyOn(useTimeSeriesModule, "useTimeSeries").mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    } as any);

    render(
      <QueryClientProvider client={createClient()}>
        <MemoryRouter initialEntries={["/stock/AAPL"]}>
          <Routes>
            <Route path="/stock/:symbol" element={<DetailPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(
      screen.getByText(/Cargando información de la acción/i)
    ).toBeInTheDocument();
  });
});
