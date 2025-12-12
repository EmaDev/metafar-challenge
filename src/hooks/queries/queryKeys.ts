export const queryKeys = {
  stocks: {
    list: (exchange: string) => ["stocks", "list", exchange] as const,
    meta: (symbol?: string) => ["stocks", "meta", symbol] as const,
    timeSeries: (
      symbol: string,
      interval: string,
      startDate?: string,
      endDate?: string
    ) => ["stocks", "timeSeries", symbol, interval, startDate, endDate] as const,
    search: (term: string) => ["stocks", "search", term] as const,
  },
} as const;
