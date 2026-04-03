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
import type {
  GetLocationsParams,
  GetLocationsResponse,
} from "@/types/location";
import type { LocationType } from "@/types/locationType";
import type { Region } from "@/types/region";
import type { LocationFilters } from "@/types/location";
import ErrorBox from "@/components/ErrorBox/ErrorBox";

interface LocationsPageProps {
  initialSearch: string;
}

export default function LocationPage({ initialSearch }: LocationsPageProps) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebounceValue(search, 1000);
  const [filters, setFilters] = useState<LocationFilters>({
    regionId: "",
    locationTypeId: "",
    sort: "",
  });

  const locationsParams: GetLocationsParams = {
    page,
    perPage,
    search: debouncedSearch,
    regionId: filters.regionId,
    locationTypeId: filters.locationTypeId,
    sort: filters.sort,
  };

  const locationsQuery = useQuery<GetLocationsResponse>({
    queryKey: ["locations"],
    queryFn: () => getLocations(locationsParams),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const regionsQuery = useQuery<Region[]>({
    queryKey: ["regions"],
    queryFn: getRegions,
    staleTime: 30 * 60 * 1000,
  });

  const locationTypesQuery = useQuery<LocationType[]>({
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
    <div className={css.locationsPage}>
      <h1 className={css.pageTitle}>Усі місця відпочинку</h1>

      {locationTypesQuery.data &&
        regionsQuery.data &&
        !locationTypesQuery.isLoading &&
        !regionsQuery.isLoading && (
          <LocationSearchBox
            search={search}
            regions={regionsQuery.data || []}
            locationTypes={locationTypesQuery.data || []}
            filters={filters}
            onSearchChange={setSearch}
            onFiltersChange={setFilters}
          />
        )}

      {locationsQuery.data && !locationsQuery.isLoading && (
        <LocationsList locations={locationsQuery.data.locations} />
      )}
    </div>
  );
}
