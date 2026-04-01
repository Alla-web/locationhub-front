import { Metadata } from "next";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";

import LocationClient from "./Location.client";
import { getLocations } from "@/lib/api/serverApi";

interface FilteredLocationsPageProps {
  searchParams: Promise<{ search?: string }>;
  params: Promise<{ slug: string[] }>;
}

export default async function FilteredLocationsPage({
  params,
  searchParams,
}: FilteredLocationsPageProps) {
  const sp = await searchParams;
  const search = sp?.search || "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["locations", search],
    queryFn: () => getLocations(search), //доробити!!!
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LocationClient initialSearch={search} />
    </HydrationBoundary>
  );
}
