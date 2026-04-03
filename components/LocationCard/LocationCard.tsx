"use client";

import Image from "next/image";
import Link from "next/link";
import css from "./LocationCard.module.css";

import type { Location } from "@/types/location";
import { getLocationTypeLabel } from "@/lib/utils/locationType";

interface LocationCardProps {
  location: Location;
}

export default function LocationCard({ location }: LocationCardProps) {
  const rating = location.rate || 0;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const totalStars = 5;

  const locationTypeLabel =
    location.locationTypeId?.name ||
    getLocationTypeLabel(
      (location as Location & { locationType?: string }).locationType,
    );

  return (
    <article className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={location.image}
          alt={location.name}
          width={340}
          height={340}
          className={css.image}
        />
      </div>

      <div className={css.content}>
        <p className={css.type}>{locationTypeLabel}</p>

        <div className={css.rating}>
          {[...Array(totalStars)].map((_, index) => {
            if (index < fullStars) {
              return (
                <svg key={index} className={css.star}>
                  <use href="/icons.svg#icon-star_filled" />
                </svg>
              );
            }

            if (index === fullStars && hasHalfStar) {
              return (
                <svg key={index} className={css.star}>
                  <use href="/icons.svg#icon_half" />
                </svg>
              );
            }

            return (
              <svg key={index} className={css.star}>
                <use href="/icons.svg#icon-rate" />
              </svg>
            );
          })}
        </div>

        <h3 className={css.title}>{location.name}</h3>

        <Link href={`/locations/${location._id}`} className={css.btnAll}>
          Переглянути локацію
        </Link>
      </div>
    </article>
  );
}
