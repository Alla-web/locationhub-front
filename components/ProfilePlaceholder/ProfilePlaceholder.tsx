"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./ProfilePlaceholder.module.css";

interface ProfilePlaceholderProps {
  profileId: string;
}

export default function ProfilePlaceholder({
  profileId,
}: ProfilePlaceholderProps) {
  const user = useAuthStore((state) => state.user);
  const isOwner = !!user && user._id === profileId;

  return (
    <div className={css.placeholderCard}>
      <p className={css.message}>
        {isOwner
          ? "Ви ще нічого не публікували, поділіться своєю першою локацією!"
          : "Цей користувач ще не ділився локаціями"}
      </p>

      {isOwner ? (
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
