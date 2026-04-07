"use client";

import Image from "next/image";
import Link from "next/link";

import css from "./LocationCard.module.css";

import type { LocationType } from "@/types/locationType";

interface LocationCardProps {
  location: {
    _id: string;
    image: string;
    name: string;
    rate?: number;
    locationTypeId: LocationType;
  };
}

export default function LocationCard({ location }: LocationCardProps) {
  const rating = location.rate || 0;

  const fullStars = Math.floor(rating);
  const totalStars = 5;

  return (
    <li className={css.cardContainer}>
      <div className={css.imageContainer}>
        <Image
          src={location.image}
          alt={location.name}
          fill
          unoptimized
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={css.cardTexContainer}>
        <h4 className={css.locationType}>{location.locationTypeId?.type}</h4>
        <div className={css.ratingContainer}>
          {[...Array(totalStars)].map((_, index) => {
            if (index < fullStars) {
              return (
                <svg key={index} className={css.star}>
                  <use href="/icons.svg#icon-star_filled" />
                </svg>
              );
            }
          })}
        </div>
        <h3 className={css.locationName}>{location.name}</h3>
        <div className={css.schowLocationLinkContainer}>
          <Link href={`/locations/${location._id}`}>Переглянути локацію</Link>
        </div>
      </div>
    </li>
  );
}
