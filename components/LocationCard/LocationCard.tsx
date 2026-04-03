"use client";

import Image from "next/image";
import Link from "next/link";

import css from "./LocationCard.module.css";

import type { Location } from "@/types/location";

interface LocationCardProps {
  location: Location;
}

export default function LocationCard({ location }: LocationCardProps) {
  const rating = location.rate || 0;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const totalStars = 5;

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
        <h3 className={css.locationType}>{location.name}</h3>
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
        <h4 className={css.locationName}>{location.locationTypeId.name}</h4>
        <div className={css.schowLocationLinkContainer}>
          <Link href={`/locations/${location._id}`}>Переглянути локацію</Link>
        </div>
      </div>
    </li>
  );
}
