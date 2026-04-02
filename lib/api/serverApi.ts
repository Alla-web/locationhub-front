import { nextServer } from "./api"; // Або імпортуй api, якщо nextServer падає з відносним шляхом
import { cookies } from "next/headers";
import { RegisterPayload } from "@/types/user";
import { AxiosResponse } from "axios";
import { GetLocationsParams, GetLocationsResponse } from "@/types/location";

export const checkSession =
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
