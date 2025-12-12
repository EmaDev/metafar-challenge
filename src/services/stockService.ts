import { apiClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";
import {
  StockListResponse,
  TimeSeriesResponse,
  MetaStockResponse,
} from "../api/types";

export async function fetchStockList(
  exchange = "NASDAQ",
  start = 0,
  limit = 200
) {
  const { data } = await apiClient.get<StockListResponse>(ENDPOINTS.STOCKS, {
    params: { source: "docs", exchange, start, limit },
  });
  return data;
}

export async function fetchStockMeta(symbol: string) {
  const { data } = await apiClient.get<{ data: MetaStockResponse[] }>(
    ENDPOINTS.STOCKS,
    { params: { source: "docs", symbol } }
  );
  return data.data?.[0];
}

export async function fetchTimeSeries(
  symbol: string,
  interval: string,
  startDate?: string,
  endDate?: string
) {
  const params: Record<string, string | undefined> = {
    symbol,
    interval,
  };
  if (startDate) params.start_date = startDate;
  if (endDate) params.end_date = endDate;

  const { data } = await apiClient.get<TimeSeriesResponse>(
    ENDPOINTS.TIME_SERIES,
    { params }
  );
  return data;
}
