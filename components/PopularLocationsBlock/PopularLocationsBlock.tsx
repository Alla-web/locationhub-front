"use client";

import { useRef } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Loader from "../Loader/Loader";

import "swiper/css";

import css from "./PopularLocationsBlock.module.css";

import LocationCard from "../LocationCard/LocationCard";
import { getLocations } from "@/lib/api/clientApi";
import type {
  GetLocationsParams,
  GetLocationsResponse,
} from "@/types/location";
import ErrorBox from "@/components/ErrorBox/ErrorBox";
import Link from "next/link";

export default function PopularLocationsBlock() {
  const swiperRef = useRef<SwiperType | null>(null);

  const locationsParams: GetLocationsParams = {
    page: 1,
    perPage: 6,
    sort: "rate-desc",
  };

  const locationsQuery = useQuery<GetLocationsResponse>({
    queryKey: ["popular-locations", locationsParams],
    queryFn: () => getLocations(locationsParams),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const locations = locationsQuery.data?.locations ?? [];

  // const preparedLocations = locations.map((loc) => ({
  //   ...loc,
  //   name: loc.locationTypeId?.type || "Локація",
  //   locationTypeId: {
  //     ...(loc.locationTypeId || {}),
  //     name: loc.name,
  //   },
  // }));

  return (
    <section className={`section ${css.section}`}>
      <div className="container">
        <div className={css.topRow}>
          <h2 className={css.title}>Популярні локації</h2>

          <Link href="/locations" className={`btn ${css.btnAll}`}>
            Всі локації
          </Link>
        </div>

        {locationsQuery.isLoading ? (
          <Loader />
        ) : locationsQuery.isError ? (
          <ErrorBox
            query=""
            errorMessage={
              locationsQuery.error?.message || "Something went wrong!"
            }
          />
        ) : locations.length > 0 ? (
          <>
            <Swiper
              modules={[Navigation, A11y]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1440: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
              }}
              loop={locations.length > 3}
              className={css.swiper}
            >
              {locations.map((loc) => (
                <SwiperSlide key={loc._id} className={css.slide}>
                  <LocationCard location={loc} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={css.bottomControls}>
              <button
                type="button"
                className={css.arrowBtn}
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Попередній слайд"
              >
                <svg
                  className={css.icon}
                  width="24"
                  height="24"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#icon-arrow_back" />
                </svg>
              </button>

              <button
                type="button"
                className={css.arrowBtn}
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Наступний слайд"
              >
                <svg
                  className={css.icon}
                  width="24"
                  height="24"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#icon-arrow_forward" />
                </svg>
              </button>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
