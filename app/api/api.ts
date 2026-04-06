import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

const backendBaseUrl =
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5000";

// тут шде звернення на БЕКЕНД,
// тому всі URL у маршрутах мають точно співпадати з ендпоінтами на бекенді
export const api = axios.create({
  baseURL: `${backendBaseUrl.replace(/\/$/, "")}/api`,
  withCredentials: true,
});
