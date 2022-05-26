import axios from "axios";
import { parseCookies } from "nookies";

const { "philanthropicManager.token": token } = parseCookies();

export const api = axios.create({
  baseURL: process.env.API_URL || "https://philanthropicmanager-api.ericrocha.dev"
});

if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
