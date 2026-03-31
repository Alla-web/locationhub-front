"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "usehooks-ts";

import css from "./Location.client.module.css";

import LocationsList from "@/components/LocationsList/LocationsList";
import LocationSearchBox from "@/components/locationSearchBox/locationSearchBox";
import {
  getLocations,
  getLocationTypes,
  getRegions,
} from "@/lib/api/clientApi";
import type { GetLocationsResponse } from "@/types/location";
import type { GetLocationTypesResponse } from "@/types/locationType";
import type { GetRegionsResponse } from "@/types/region";
import type { LocationFilters } from "@/types/location";
import ErrorBox from "@/components/ErrorBox/ErrorBox";
import { error } from "console";

interface LocationsPageProps {
  initialSearch: string;
  initialPage: number;
}

export default function LocationPage({
  initialSearch,
  initialPage = 1,
}: LocationsPageProps) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebounceValue(search, 1000);
  const [filters, setFilters] = useState<LocationFilters>({
    region: "",
    locationType: "",
    sort: "",
  });

  const locationsQuery = useQuery<GetLocationsResponse>({
    queryKey: [
      "locations",
      page,
      debouncedSearch,
      filters.region,
      filters.locationType,
      filters.sort,
    ],
    queryFn: () =>
      getLocations(
        page,
        debouncedSearch,
        filters.region,
        filters.locationType,
        filters.sort,
      ),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const regionsQuery = useQuery<GetRegionsResponse>({
    queryKey: ["regions"],
    queryFn: getRegions,
    staleTime: 30 * 60 * 1000,
  });

  const locationTypesQuery = useQuery<GetLocationTypesResponse>({
    queryKey: ["locationTypes"],
    queryFn: getLocationTypes,
    staleTime: 30 * 60 * 1000,
  });

  if (
    locationsQuery.isLoading ||
    regionsQuery.isLoading ||
    locationTypesQuery.isLoading
  ) {
    return <p>Loading...</p>;
  }

  if (
    locationsQuery.isError ||
    regionsQuery.isError ||
    locationTypesQuery.isError
  ) {
    return (
      <ErrorBox
        query={search}
        errorMessage={
          locationsQuery.error?.message ||
          locationTypesQuery.error?.message ||
          regionsQuery.error?.message ||
          "Something went wrong!"
        }
      />
    );
  }

  return (
    <div>
      <LocationSearchBox
        search={search}
        regions={regionsQuery.data?.data ?? []}
        locationTypes={locationTypesQuery.data?.data ?? []}
        filters={filters}
        onSearchChange={setSearch}
        onFiltersChange={setFilters}
      />
      <LocationsList locations={locationsQuery.data?.locations ?? []} />
    </div>
  );
}
