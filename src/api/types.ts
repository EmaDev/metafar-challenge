export interface MetaStockResponse {
  symbol: string;
  name: string;
  currency: string;
  type: string;
}

export interface StockListResponse {
  data: MetaStockResponse[];
  status?: string;
}

export interface TimeSeriesMeta {
  symbol: string;
  interval: string;
  currency: string;
  exchange_timezone: string;
  mic_code: string;
  exchange: string;
  type: string;
}

export interface TimeSeriesValue {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface TimeSeriesResponse {
  meta: TimeSeriesMeta;
  values: TimeSeriesValue[];
  status: string;
}

