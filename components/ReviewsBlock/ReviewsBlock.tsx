"use client";

import { useRef } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import css from "./ReviewsBlock.module.css";
import ErrorBox from "@/components/ErrorBox/ErrorBox";
import { getFeedbacks, type Feedback } from "@/lib/api/clientApi";

interface GetFeedbacksResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalFeedbacks: number;
  feedbacks: Feedback[];
}

export default function ReviewsBlock() {
  const swiperRef = useRef<SwiperType | null>(null);

  const reviewsQuery = useQuery<GetFeedbacksResponse>({
    queryKey: ["reviews"],
    queryFn: getFeedbacks,
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  if (reviewsQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (reviewsQuery.isError) {
    return (
      <ErrorBox
        query=""
        errorMessage={reviewsQuery.error?.message || "Something went wrong!"}
      />
    );
  }

  const reviews = reviewsQuery.data?.feedbacks ?? [];

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className={`section ${css.section}`}>
      <div className="container">
        <div className={css.topRow}>
          <h2 className={css.title}>Останні відгуки</h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={16}
          slidesPerView={1}
          loop={reviews.length > 3}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          className={css.swiper}
        >
          {reviews.map((review) => {
            const rating = review.rate || 0;
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating - fullStars >= 0.5;
            const totalStars = 5;

            return (
              <SwiperSlide key={review._id} className={css.slide}>
                <article className={css.card}>
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
                            <use href="/icons.svg#icon-star_half" />
                          </svg>
                        );
                      }

                      return (
                        <svg key={index} className={css.star}>
                          <use href="/icons.svg#icon-star_rate" />
                        </svg>
                      );
                    })}
                  </div>

                  <p className={css.text}>{review.description}</p>

                  <div className={css.meta}>
                    <p className={css.author}>{review.userName}</p>
                    <p className={css.locationType}>
                      {review.locationId?.locationTypeId?.type || "Локація"}
                    </p>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className={css.bottomControls}>
          <button
            type="button"
            className={css.arrowBtn}
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Попередній слайд"
          >
            <svg className={css.icon} aria-hidden="true">
              <use href="/icons.svg#icon-arrow_back" />
            </svg>
          </button>

          <button
            type="button"
            className={css.arrowBtn}
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Наступний слайд"
          >
            <svg className={css.icon} aria-hidden="true">
              <use href="/icons.svg#icon-arrow_forward" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
