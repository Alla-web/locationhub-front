"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type RefObject } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { LocationDetails, LocationFeedback } from "@/types/location-details";
import css from "./LocationDetails.module.css";

const SEEDED_AUTHOR_IDS = new Set(["69cb86695f62579868ae320c"]);

type LocationDetailsViewProps = {
  locationId: string;
  location: LocationDetails;
  reviews: LocationFeedback[];
  reviewsCount: number;
};

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

function splitDescription(description: string) {
  const paragraphs = description
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (paragraphs.length > 0) {
    return paragraphs;
  }

  return [description.trim()].filter(Boolean);
}

function getReviewAuthor(review: LocationFeedback) {
  if (typeof review.ownerId === "string") {
    if (SEEDED_AUTHOR_IDS.has(review.ownerId)) {
      return "Користувач";
    }

    return "Користувач";
  }

  if (
    SEEDED_AUTHOR_IDS.has(review.ownerId._id) ||
    review.ownerId.name === "Seed User" ||
    review.ownerId.email === "seed@locationhub.local" ||
    review.ownerId.name === "umnyj.start"
  ) {
    return "Користувач";
  }

  return review.ownerId.name || review.ownerId.email || "Користувач";
}

function getLocationAuthor(location: LocationDetails) {
  const authorName = location.ownerId?.name?.trim();
  const authorEmail = location.ownerId?.email?.trim().toLowerCase();

  if (
    SEEDED_AUTHOR_IDS.has(location.ownerId?._id) ||
    authorName === "Seed User" ||
    authorEmail === "seed@locationhub.local" ||
    authorName === "umnyj.start"
  ) {
    return "Автор не вказаний";
  }

  return authorName || location.ownerId?.email || "Профіль автора";
}

function hasLocationAuthorProfile(location: LocationDetails) {
  return Boolean(location.ownerId?._id && getLocationAuthor(location) !== "Автор не вказаний");
}

function ReviewsBlock({
  reviews,
  railRef,
}: {
  reviews: LocationFeedback[];
  railRef: RefObject<HTMLUListElement | null>;
}) {
  if (reviews.length === 0) {
    return (
      <div className={css.emptyState}>
        Поки що відгуків немає. Будьте першим, хто поділиться враженнями.
      </div>
    );
  }

  return (
    <ul ref={railRef} className={css.reviewsList}>
      {reviews.map((review) => {
        return (
          <li key={review._id} className={css.reviewCard}>
            <div className={css.reviewCardTop}>
              <RatingStars rating={review.rate} size="sm" />
            </div>
            <p className={css.reviewText}>{review.text}</p>
            <p className={css.reviewAuthor}>{getReviewAuthor(review)}</p>
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
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);
  const reviewsRailRef = useRef<HTMLUListElement>(null);
  const descriptionParts = splitDescription(location.description);
  const reviewHref =
    isAuthReady && isAuthenticated
      ? `/locations/${locationId}/reviews/new`
      : "/auth-prompt";
  const reviewsSectionLabel =
    reviewsCount > 0 ? `Відгуки (${reviewsCount})` : "Відгуки";

  const scrollReviews = (direction: "prev" | "next") => {
    const element = reviewsRailRef.current;

    if (!element) {
      return;
    }

    const amount = Math.max(element.clientWidth * 0.82, 220);

    element.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <div className={css.wrapper}>
      <div className={css.heroLayout}>
        <section className={css.gallerySection}>
          <div className={css.imageWrap}>
            <Image
              src={location.image}
              alt={location.name}
              fill
              priority
              unoptimized
              sizes="(min-width: 1440px) 560px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 40px)"
              className={css.image}
            />
          </div>
        </section>

        <section className={css.infoSection}>
          <div className={css.ratingInfo}>
            <RatingStars rating={location.rate} />
            <span className={css.ratingValue}>• {location.rate.toFixed(1)}</span>
          </div>

          <h1 className={css.pageTitle}>{location.name}</h1>

          <div className={css.metaList}>
            <p className={css.metaItem}>
              <span className={css.metaLabel}>Регіон:</span>{" "}
              <span className={css.metaValue}>
                {location.regionId?.name ?? "Не вказано"}
              </span>
            </p>
            <p className={css.metaItem}>
              <span className={css.metaLabel}>Тип локації:</span>{" "}
              <span className={css.metaValue}>
                {location.locationTypeId?.name ?? "Не вказано"}
              </span>
            </p>
            <p className={css.metaItem}>
              <span className={css.metaLabel}>Автор статті:</span>{" "}
              {hasLocationAuthorProfile(location) ? (
                <Link
                  href={`/profile/${location.ownerId._id}`}
                  className={css.authorLink}
                >
                  {getLocationAuthor(location)}
                </Link>
              ) : (
                <span className={css.metaValue}>{getLocationAuthor(location)}</span>
              )}
            </p>
          </div>
        </section>
      </div>

      <section className={css.descriptionSection}>
        {descriptionParts.map((paragraph, index) => (
          <p key={`${location._id}-${index}`} className={css.descriptionText}>
            {paragraph}
          </p>
        ))}
      </section>

      <section className={css.reviewsSection} aria-label={reviewsSectionLabel}>
        <div className={css.reviewsHeader}>
          <h2 className={css.sectionTitle}>Відгуки</h2>
          <Link
            href={reviewHref}
            scroll={false}
            className={`${css.primaryButton} ${css.reviewActionButton}`}
          >
            Залишити відгук
          </Link>
        </div>

        <ReviewsBlock reviews={reviews} railRef={reviewsRailRef} />

        {reviews.length > 0 ? (
          <div className={css.reviewsControls}>
            <button
              type="button"
              className={css.sliderButton}
              onClick={() => scrollReviews("prev")}
              aria-label="Попередні відгуки"
            >
              <svg className={css.sliderIcon}>
                <use href="/icons.svg#icon-arrow_back" />
              </svg>
            </button>

            <button
              type="button"
              className={css.sliderButton}
              onClick={() => scrollReviews("next")}
              aria-label="Наступні відгуки"
            >
              <svg className={css.sliderIcon}>
                <use href="/icons.svg#icon-arrow_forward" />
              </svg>
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
