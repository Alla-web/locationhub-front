"use client";

import css from "./LocationsList.module.css";

import type { Location } from "@/types/location";
import LocationCard from "../LocationCard/LocationCard";

interface LocationsListProps {
  locations: Location[];
}

export default function LocationsList({ locations }: LocationsListProps) {
  return (
    <ul>
      {locations.map((location) => (
        <LocationCard key={location._id} location={location} />
      ))}
    </ul>
  );
}
