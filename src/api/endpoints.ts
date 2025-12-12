export const ENDPOINTS = {
  STOCKS: "/stocks",
  TIME_SERIES: "/time_series",
} as const;

export type EndpointKey = keyof typeof ENDPOINTS;
