import { RegisterPayload } from "@/types/user";
import { nextServer } from "./api";

import { GetLocationsResponse } from "@/types/location";
import { User } from "@/types/user";
import { GetRegionsResponse } from "@/types/region";
import { GetLocationTypesResponse } from "@/types/locationType";

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

export async function getLocationTypes() {
  const response = await nextServer.get<GetLocationTypesResponse>(
    "/categories/location-types",
    { withCredentials: false },
  );
  return response.data;
}

export async function getRegions() {
  const response = await nextServer.get<GetRegionsResponse>(
    "/api/categories/regions",
  );
  return response.data;
}

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
