import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { apiClient } from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";
import { StockListResponse } from "../../api/types";

export function useStockSearch(term: string) {
  return useQuery<StockListResponse>({
    enabled: term.trim().length > 1,
    queryKey: queryKeys.stocks.search(term),
    queryFn: async () => {
      const { data } = await apiClient.get<StockListResponse>(ENDPOINTS.STOCKS, {
        params: { symbol: term.trim(), source: "docs" },
      });
      return data;
    },
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
