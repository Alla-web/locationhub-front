import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

// тут шде звернення на БЕКЕНД,
// тому всі URL у маршрутах мають точно співпадати з ендпоінтами на бекенді
export const api = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api`,
  withCredentials: true,
});
