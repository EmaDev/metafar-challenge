import { useQuery } from "@tanstack/react-query";
import { fetchStockMeta } from "../../services/stockService";
import { MetaStockResponse } from "../../api/types";
import { queryKeys } from "./queryKeys";

export function useStockMeta(symbol?: string) {
  return useQuery<MetaStockResponse | undefined>({
    enabled: Boolean(symbol),
    queryKey: queryKeys.stocks.meta(symbol),
    queryFn: () => fetchStockMeta(symbol as string),
    staleTime: 5 * 60 * 1000,
  });
}
