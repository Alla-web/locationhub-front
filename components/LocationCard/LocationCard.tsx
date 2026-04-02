"use client";

import Image from "next/image";
import Link from "next/link";

import css from "./LocationCard.module.css";

import type { Location } from "@/types/location";

interface LocationCardProps {
  location: Location;
}

export default function LocationCard({ location }: LocationCardProps) {
  return (
    <li>
      <Image
        src={location.image}
        alt={location.name}
        width={335}
        height={335}
      />
      <h4>{location.name}</h4>
      <div>{location.rate}</div>
      <h3>{location.locationTypeId.name}</h3>
      <Link href={`/locations/${location._id}`}>Переглянути локацію</Link>
    </li>
  );
}
