"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { Location } from "@/types/user";

import css from "./ProfilePlaceholder.module.css";

interface ProfilePlaceholderProps {
  userLocations: Location[];
  profileId: string;
}

export default function ProfilePlaceholder({
  userLocations,
  profileId,
}: ProfilePlaceholderProps) {
  const user = useAuthStore((state) => state.user);
  const isOwner = !!user && user._id === profileId;

  return (
    <div className={css.placeholderCard}>
      <p className={css.message}>
        {isOwner && userLocations.length === 0
          ? "Ви ще нічого не публікували, поділіться своєю першою локацією!"
          : "Цей користувач ще не ділився локаціями"}
      </p>

      {isOwner && userLocations.length > 0 ? (
        <Link href="/locations/create" className={css.actionButton}>
          Поділитись локацією
        </Link>
      ) : (
        <Link href="/" className={css.actionButton}>
          Назад до локацій
        </Link>
      )}
    </div>
  );
}
