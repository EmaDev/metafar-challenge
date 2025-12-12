import { useQuery } from "@tanstack/react-query";
import { fetchStockList } from "../../services/stockService";
import { StockListResponse } from "../../api/types";
import { queryKeys } from "./queryKeys";

export function useStockList(exchange = "NASDAQ") {
  const storageKey = `stocks:list:${exchange}`;
  const initialDataJson =
    typeof window !== "undefined" ? window.localStorage.getItem(storageKey) : null;
  const initialData = initialDataJson ? (JSON.parse(initialDataJson) as StockListResponse) : undefined;

  return useQuery<StockListResponse>({
    queryKey: queryKeys.stocks.list(exchange),
    queryFn: async () => {
      const data = await fetchStockList(exchange);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, JSON.stringify(data));
      }
      return data;
    },
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
    initialData,
  });
}
