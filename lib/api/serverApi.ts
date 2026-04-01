import { nextServer } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";

export const checkSession = async (): Promise<AxiosResponse<User>> => {
  const cookieStore = await cookies();
  const res = await nextServer.get<User>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const geеLocations = async (searchQuery: string) => {
  const response = await nextServer.get("/locations", { params: searchQuery });
  return response.data;
};
