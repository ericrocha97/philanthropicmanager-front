import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const { "philanthropicManager.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.API_URL || "https://philanthropicmanager-api.ericrocha.dev"
  });

  api.interceptors.request.use((config) => {
    return config;
  });

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return api;
}
