import { Metadata } from "next";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";

import LocationClient from "./Location.client";
import { getLocations } from "@/lib/api/serverApi";
import { GetLocationsParams } from "@/types/location";

interface FilteredLocationsPageProps {
  searchParams: Promise<{ search?: string }>;
  params: Promise<{ slug: string[] }>;
}

export default async function FilteredLocationsPage({
  searchParams,
  params,
}: FilteredLocationsPageProps) {
  const { slug } = (await params) || {};
  const search = decodeURIComponent(slug?.[0] ?? "");

  const locationsParams: GetLocationsParams = {
    page: 1,
    perPage: 6,
    search,
    regionId: "",
    locationTypeId: "",
    sort: "",
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["locations", 1, 6, search, "", "", ""],
    queryFn: () => getLocations(locationsParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LocationClient initialSearch={search} />
    </HydrationBoundary>
  );
}
