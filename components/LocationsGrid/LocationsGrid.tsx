"use client";

import Image from "next/image";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";
import { nextServer } from "@/lib/api/api";
import ProfilePlaceholder from "@/components/ProfilePlaceholder/ProfilePlaceholder";
import css from "./LocationsGrid.module.css";

interface LocationsGridProps {
  isPrivate: boolean;
  userId?: string;
}

interface Location {
  _id: string;
  name: string;
  image?: string;
  locationType: string;
  rate: number;
}

interface LocationsResponse {
  data: Location[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const fetchLocations = async (targetId: string, page: number) => {
  const response = await nextServer.get<LocationsResponse>(
    `/users/${targetId}/places?page=${page}&limit=6`,
  );
  return response.data;
};

export default function LocationsGrid({
  isPrivate,
  userId,
}: LocationsGridProps) {
  const user = useAuthStore((state) => state.user);
  const targetId = isPrivate ? user?._id : userId;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["locations", targetId],
    queryFn: ({ pageParam = 1 }) =>
      fetchLocations(targetId as string, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.totalPages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    enabled: !!targetId,
  });

  if (isLoading)
    return <div className={css.loader}>Завантаження локацій...</div>;
  if (isError)
    return <div className={css.loader}>Помилка завантаження локацій</div>;

  const locations = data?.pages.flatMap((page) => page.data) || [];

  if (!locations || locations.length === 0) {
    return <ProfilePlaceholder profileId={targetId || ""} />;
  }

  const renderStars = (rate: number) => {
    const fullStars = Math.round(rate || 0);
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span
          key={i}
          className={i < fullStars ? css.starActive : css.starMuted}
        >
          ★
        </span>
      ));
  };

  return (
    <div className={css.gridContainer}>
      {/* Сітка карток */}
      <div className={css.grid}>
        {locations.map((location) => (
          <article key={location._id} className={css.card}>
            <div className={css.imageWrapper}>
              <Image
                src={location.image || "/placeholder-image.webp"} // Заміни на свій плейсхолдер
                alt={location.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={css.image}
              />
            </div>

            <div className={css.cardContent}>
              <div className={css.meta}>
                <span className={css.category}>{location.locationType}</span>
                <div className={css.rating}>{renderStars(location.rate)}</div>
              </div>

              <h3 className={css.title}>{location.name}</h3>

              <div className={css.actions}>
                <Link
                  href={`/locations/${location._id}`}
                  className={css.viewBtn}
                >
                  Переглянути локацію
                </Link>

                {/* Кнопка редагування показується ТІЛЬКИ в приватному профілі */}
                {isPrivate && (
                  <Link
                    href={`/locations/${location._id}/edit`}
                    className={css.editBtn}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {hasNextPage && (
        <div className={css.loadMoreWrapper}>
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={css.loadMoreBtn}
          >
            {isFetchingNextPage ? "Завантаження..." : "Показати ще"}
          </button>
        </div>
      )}
    </div>
  );
}
