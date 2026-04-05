import { LoginRequest, SessionResponse } from "@/types/auth";
import { RegisterPayload, User } from "@/types/user";
import axios from "axios";

export const nextServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api`,
  withCredentials: true,
});

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.post<SessionResponse>("/auth/refresh");
  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
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
