import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../HomePage";
import * as useStockListModule from "../../../hooks/queries/useStockList";
import * as useStockSearchModule from "../../../hooks/queries/useStockSearch";

const createClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

describe("HomePage", () => {
  it("renders title and description", () => {
    vi.spyOn(useStockListModule, "useStockList").mockReturnValue({
      data: { data: [] },
      isLoading: false,
      isError: false,
      isFetching: false,
    } as any);
    vi.spyOn(useStockSearchModule, "useStockSearch").mockReturnValue({
      data: undefined,
      isFetching: false,
      isError: false,
    } as any);

    render(
      <QueryClientProvider client={createClient()}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(
      screen.getByText(/Información del mercado de valores/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Resumen de las acciones disponibles/i)
    ).toBeInTheDocument();
  });
});
