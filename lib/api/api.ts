import { LoginRequest, RegisterRequest, SessionResponse } from "@/types/auth";
import { User } from "@/types/user";
import axios from "axios";

export const nextServer = axios.create({
  // baseURL: "/api",
  baseURL: `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api`,
  withCredentials: true, 
});

function mapUserFromApi(raw: Record<string, unknown>): User {
  const email = String(raw.email ?? "");
  const name = raw.name ?? raw.username;
  const avatar = raw.avatarUrl ?? raw.avatar;
  return {
    email,
    username:
      typeof name === "string" && name.length > 0
        ? name
        : email.split("@")[0] ?? "",
    avatar:
      typeof avatar === "string" && avatar.length > 0
        ? avatar
        : "https://ac.goit.global/fullstack/react/default-avatar.jpg",
  };
}

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<Record<string, unknown>>(
    "/auth/register",
    data,
  );
  return mapUserFromApi(res.data);
};

export const login = async (data: LoginRequest):Promise<User> => {
  const res = await nextServer.post<Record<string, unknown>>('/auth/login', data);
  return mapUserFromApi(res.data);
};

export const checkSession = async () => {
  const res = await nextServer.get<SessionResponse>('/auth/refresh');
  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<Record<string, unknown>>('/users/me');
  return mapUserFromApi(data);
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};