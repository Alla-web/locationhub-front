"use client";

import { useRef } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Loader from "../Loader/Loader";

import "swiper/css";
import "swiper/css/pagination";

import css from "./ReviewsBlock.module.css";
import ErrorBox from "@/components/ErrorBox/ErrorBox";
import type { GetFeedbacksResponse } from "@/types/feedback";
import { getFeedbacks } from "@/lib/api/clientApi";

export default function ReviewsBlock() {
  const swiperRef = useRef<SwiperType | null>(null);

  const { data, isLoading, isError, error } = useQuery<GetFeedbacksResponse>({
    queryKey: ["feedbacks"],
    queryFn: getFeedbacks,
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const feedbacks = data?.feedbacks ?? [];

  return (
    <section className={`section ${css.section}`}>
      <div className="container">
        <div className={css.topRow}>
          <h2 className={css.title}>Останні відгуки</h2>
        </div>

        {isLoading && <Loader />}

        {!isLoading && feedbacks.length === 0 && (
          <p>Поки що немає відгуків на локацї</p>
        )}

        {isError && (
          <ErrorBox
            query=""
            errorMessage={error?.message || "Something went wrong!"}
          />
        )}

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={16}
          slidesPerView={1}
          loop={feedbacks.length > 3}
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
          {feedbacks.map((feedback) => {
            console.log(feedback);

            const rate = feedback.rate || 0;
            const fullStars = Math.floor(rate);
            const hasHalfStar = rate - fullStars >= 0.5;
            const totalStars = 5;

            return (
              <SwiperSlide key={feedback._id} className={css.slide}>
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

                  <p className={css.text}>{feedback.description}</p>

                  <div className={css.meta}>
                    <p className={css.author}>
                      {feedback.ownerId?.name || "Інкогніто"}
                    </p>

                    <p className={css.locationType}>
                      {feedback.locationId?.locationTypeId?.type || "Локація"}
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
