import { nextServer } from "./api";
import { cookies } from "next/headers";

import { GetLocationsParams, GetLocationsResponse } from "@/types/location";
import { RegisterPayload, User } from "@/types/user";
import { AxiosResponse } from "axios";

export const checkServerSession =
  async (): Promise<AxiosResponse<RegisterPayload> | null> => {
    try {
      const cookieStore = await cookies();

      const res = await nextServer.post<RegisterPayload>(
        "/auth/refresh",
        {},
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );

      return res;
    } catch {
      return null;
    }
  };

export async function getLocations(params: GetLocationsParams) {
  const response = await nextServer.get<GetLocationsResponse>("/locations", {
    params,
    withCredentials: false,
  });

  return response.data;
}

export const getMeServer = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};
