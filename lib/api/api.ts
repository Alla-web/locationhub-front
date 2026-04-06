import axios from "axios";

// це NEXT.js-сервер, що звертається до URL ФРОНТЕНДУ
export const nextServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api`,
  withCredentials: true,
});
