import { RegisterPayload } from "@/types/user";
import { nextServer } from "./api";

import { GetLocationsParams, GetLocationsResponse } from "@/types/location";
import { User } from "@/types/user";
import { GetRegionsResponse } from "@/types/region";
import { GetLocationTypesResponse } from "@/types/locationType";

export async function getLocations(params: GetLocationsParams) {
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
    "/categories/regions",
    { withCredentials: false },
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
