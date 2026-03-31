import { nextServer } from "./api";

import { Location, GetLocationsResponse } from "@/types/location";
import { GetRegionsResponse } from "@/types/region";
import { GetLocationTypesResponse } from "@/types/locationType";

export async function getLocations(
  page?: number,
  search?: string,
  region?: string,
  locationType?: string,
  sort?: string,
) {
  const response = await nextServer.get<GetLocationsResponse>(
    "/api/locations",
    {
      params: {
        page,
        perPage: 9,
        search,
        region,
        locationType,
        sort,
      },
    },
  );

  return response.data;
}

export async function getRegions() {
  const response = await nextServer.get<GetRegionsResponse>(
    "/api/categories/regions",
  );
  return response.data;
}

export async function getLocationTypes() {
  const response = await nextServer.get<GetLocationTypesResponse>(
    "/api/categories/location-types",
  );
  return response.data;
}
