"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";
import ProfilePlaceholder from "@/components/ProfilePlaceholder/ProfilePlaceholder";
import LocationCard from "@/components/LocationCard/LocationCard";
import Link from "next/link";
import css from "./ProfileLocationsGrid.module.css";

import { fetchUserLocations } from "@/lib/api/clientApi";
import { UserLocationsResponse } from "@/types/user";

interface ProfileLocationsGridProps {
  isPrivate: boolean;
  userId?: string;
}

export default function ProfileLocationsGrid({
  isPrivate,
  userId,
}: ProfileLocationsGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const user = useAuthStore((state) => state.user);
  const targetId = isPrivate ? user?._id : userId;

  const { data, isLoading, isError } = useQuery<UserLocationsResponse>({
    queryKey: ["locations", targetId, currentPage],
    queryFn: () => fetchUserLocations(targetId as string, currentPage),
    enabled: !!targetId,
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) return <div className={css.loader}>Завантаження...</div>;
  if (isError) return <div className={css.loader}>Помилка завантаження</div>;

  const locations = data?.data || [];
  const { totalPages } = data?.pagination || { totalPages: 1 };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className={css.gridContainer}>
      {isPrivate && (
        <ProfilePlaceholder
          profileId={targetId || ""}
          userLocations={locations}
        />
      )}

      <div className={css.grid}>
        {locations.map((loc) => {
          return (
            <div key={loc._id} className={css.cardWrapper}>
              <LocationCard location={loc as any} />

              {isPrivate && (
                <Link
                  href={`/locations/${loc._id}/edit`}
                  className={css.editOverlayBtn}
                  title="Редагувати локацію"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className={css.pagination}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={css.pageArrow}
          >
            ←
          </button>

          {getPageNumbers().map((page, idx) => (
            <button
              key={idx}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
              className={`${css.pageBtn} ${currentPage === page ? css.activePage : ""} ${
                page === "..." ? css.dots : ""
              }`}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={css.pageArrow}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
