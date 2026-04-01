import { nextServer } from "./api"; // Або імпортуй api, якщо nextServer падає з відносним шляхом
import { cookies } from "next/headers";
import { RegisterPayload } from "@/types/user";
import { AxiosResponse } from "axios";
import { GetLocationsResponse } from "@/types/location";

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
    } catch (error) {
      console.log("Серверна перевірка: Сесія відсутня (користувач гість)");
      return null;
    }
  };

export async function getLocations(
  page?: number,
  perPage?: number,
  search?: string,
  regionId?: string,
  locationTypeId?: string,
  sort?: string,
) {
  const params: Record<string, string | number> = {
    page: page ?? 1,
  };

  if (perPage) params.perPage = perPage;
  if (search?.trim()) params.search = search.trim();
  if (regionId) params.regionId = regionId;
  if (locationTypeId) params.locationTypeId = locationTypeId;
  if (sort) params.sort = sort;

  const response = await nextServer.get<GetLocationsResponse>("/locations", {
    params,
    withCredentials: false,
  });

  return response.data;
}
