import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_TWELVE_DATA_API_URL || "https://api.twelvedata.com",
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_TWELVE_DATA_API_KEY;
  if (apiKey) {
    config.params = { ...(config.params || {}), apikey: apiKey };
  }
  return config;
});
