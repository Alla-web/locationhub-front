import { User } from "@/types/user";
import { nextServer } from "./api";

interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload): Promise<User> => {
    const res = await nextServer.post<User>("/auth/login", payload);
    return res.data;
};

export const logout = async () => {
    await nextServer.post("/auth/logout");
};

export const checkSession = async () => {
    const res = await nextServer.get<User>("/auth/session");
    return res.data;
};