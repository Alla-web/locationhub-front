import { RegisterPayload } from "@/types/user";
import { nextServer } from "./api";

interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (
  payload: LoginPayload,
): Promise<RegisterPayload> => {
  const res = await nextServer.post<RegisterPayload>("/auth/login", payload);
  return res.data;
};

export const logout = async () => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async () => {
  try {
    await nextServer.post("/auth/refresh", {});

    return true;
  } catch (error) {
    console.warn("Сесія відсутня (користувач гість)");
    return false;
  }
};
