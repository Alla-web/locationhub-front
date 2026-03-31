"use client";

import Image from "next/image";
import Link from "next/link";
import { LocationDetails, LocationFeedback } from "@/types/location-details";
import css from "./LocationDetails.module.css";

type LocationDetailsViewProps = {
  locationId: string;
  location: LocationDetails;
  reviews: LocationFeedback[];
  reviewsCount: number;
};

function formatReviewDate(date: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function RatingStars({
  rating,
  size = "md",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const normalizedRating = Math.max(0, Math.min(5, rating));

  return (
    <div
      className={`${css.stars} ${size === "sm" ? css.starsSmall : ""}`}
      aria-label={`Рейтинг ${normalizedRating.toFixed(1)} з 5`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const starNumber = index + 1;
        let iconId = "icon-star_rate";

        if (normalizedRating >= starNumber) {
          iconId = "icon-star_filled";
        } else if (normalizedRating >= starNumber - 0.5) {
          iconId = "icon-star_half";
        }

        return (
          <svg key={starNumber} className={css.star} aria-hidden="true">
            <use href={`/icons.svg#${iconId}`} />
          </svg>
        );
      })}
    </div>
  );
}

function ReviewsBlock({ reviews }: { reviews: LocationFeedback[] }) {
  if (reviews.length === 0) {
    return (
      <div className={css.emptyState}>
        Поки що відгуків немає. Будьте першим, хто поділиться враженнями.
      </div>
    );
  }

  return (
    <ul className={css.reviewsList}>
      {reviews.map((review) => {
        const owner = typeof review.ownerId === "string" ? null : review.ownerId;

        return (
          <li key={review._id} className={css.reviewCard}>
            <div className={css.reviewCardTop}>
              <div>
                <h3 className={css.reviewAuthor}>
                  {owner?.name || owner?.email || "Користувач"}
                </h3>
                <p className={css.reviewDate}>{formatReviewDate(review.createdAt)}</p>
              </div>
              <div className={css.reviewRating}>
                <RatingStars rating={review.rate} size="sm" />
                <span className={css.reviewRatingValue}>
                  {review.rate.toFixed(1)}
                </span>
              </div>
            </div>
            <p className={css.reviewText}>{review.text}</p>
          </li>
        );
      })}
    </ul>
  );
}

export function LocationDetailsView({
  locationId,
  location,
  reviews,
  reviewsCount,
}: LocationDetailsViewProps) {
  return (
    <>
      <section className={css.infoSection}>
        <div className={css.ratingInfo}>
          <RatingStars rating={location.rate} />
          <span className={css.ratingValue}>{location.rate.toFixed(1)}</span>
        </div>

        <h1 className={css.pageTitle}>{location.name}</h1>

        <ul className={css.metaList}>
          <li className={css.metaItem}>
            <span className={css.metaLabel}>Регіон</span>
            <span className={css.metaValue}>
              {location.regionId?.name ?? "Не вказано"}
            </span>
          </li>
          <li className={css.metaItem}>
            <span className={css.metaLabel}>Тип локації</span>
            <span className={css.metaValue}>
              {location.locationTypeId?.name ?? "Не вказано"}
            </span>
          </li>
          <li className={css.metaItem}>
            <span className={css.metaLabel}>Автор</span>
            <Link href={`/profile/${location.ownerId?._id}`} className={css.authorLink}>
              {location.ownerId?.name || location.ownerId?.email || "Профіль автора"}
            </Link>
          </li>
        </ul>
      </section>

      <section className={css.gallerySection}>
        <div className={css.imageWrap}>
          <Image
            src={location.image}
            alt={location.name}
            fill
            priority
            sizes="(min-width: 1440px) 1152px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 40px)"
            className={css.image}
          />
        </div>
      </section>

      <div className={css.contentGrid}>
        <section className={css.descriptionSection}>
          <h2 className={css.sectionTitle}>Опис місця</h2>
          <p className={css.descriptionText}>{location.description}</p>
        </section>

        <section className={css.reviewsSection}>
          <div className={css.reviewsHeader}>
            <div>
              <h2 className={css.sectionTitle}>Відгуки</h2>
              <p className={css.reviewsSubtitle}>
                {reviewsCount > 0
                  ? `${reviewsCount} відгук${reviewsCount === 1 ? "" : reviewsCount < 5 ? "и" : "ів"}`
                  : "Ще немає відгуків"}
              </p>
            </div>
            <button
              type="button"
              className={`${css.primaryButton} ${css.reviewActionButton}`}
              data-location-id={locationId}
            >
              Залишити відгук
            </button>
          </div>

          <ReviewsBlock reviews={reviews} />
        </section>
      </div>
    </>
  );
}
