import { LoginRequest, SessionResponse } from "@/types/auth";
import { User } from "@/types/user";
import axios from "axios";

export const nextServer = axios.create({
  // baseURL: "/api",
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true, // дозволяє axios працювати з cookie
});

export const login = async (data: LoginRequest):Promise<User> => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.get<SessionResponse>('/auth/session');
  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/auth/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};