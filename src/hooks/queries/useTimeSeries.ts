import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchTimeSeries } from "../../services/stockService";
import { TimeSeriesResponse } from "../../api/types";
import { queryKeys } from "./queryKeys";

export function useTimeSeries(
  symbol: string,
  interval: string,
  startDate?: string,
  endDate?: string,
  options?: Partial<UseQueryOptions<TimeSeriesResponse>>
) {
  return useQuery<TimeSeriesResponse>({
    enabled: Boolean(symbol),
    queryKey: queryKeys.stocks.timeSeries(symbol, interval, startDate, endDate),
    queryFn: () => fetchTimeSeries(symbol, interval, startDate, endDate),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
    ...options,
  });
}
