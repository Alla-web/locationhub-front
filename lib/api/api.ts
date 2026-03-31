import { LoginRequest, SessionResponse } from "@/types/auth";
import { RegisterPayload } from "@/types/user";
import axios from "axios";

export const nextServer = axios.create({
  // baseURL: "/api",
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

export const login = async (data: LoginRequest): Promise<RegisterPayload> => {
  const res = await nextServer.post<RegisterPayload>("/auth/login", data);
  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.post<SessionResponse>("/auth/refresh");
  return res.data.success;
};

export const getMe = async (): Promise<RegisterPayload> => {
  const { data } = await nextServer.get<RegisterPayload>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const register = async (userData: RegisterPayload) => {
  try {
    const response = await nextServer.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Помилка під час реєстрації:", error);
    throw error;
  }
};
