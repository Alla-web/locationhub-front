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
    <li className={css.cardContainer}>
      <div className={css.imageContainer}>
        <Image
          className={css.image}
          src={location.image}
          alt={location.name}
          fill
        />
      </div>
      <div className={css.cardTexContainer}>
        <h4 className={css.locationType}>{location.name}</h4>
        <div className={css.ratingContainer}>
          <div>{location.rate}</div>
        </div>
        <h3 className={css.locationName}>{location.locationTypeId.name}</h3>
        <div className={css.schowLocationLinkContainer}>
          <Link href={`/locations/${location._id}`}>Переглянути локацію</Link>
        </div>
      </div>
    </li>
  );
}
