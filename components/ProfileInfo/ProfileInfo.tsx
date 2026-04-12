"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { nextServer } from "@/lib/api/api";

import css from "./ProfileInfo.module.css";

import { useAuthStore } from "@/lib/store/authStore";
import { fetchUserLocations } from "@/lib/api/clientApi";
import { UserLocationsResponse } from "@/types/user";

interface ProfileInfoProps {
  isPrivate: boolean;
  userId?: string;
}

const fetchProfile = async (isPrivate: boolean, userId?: string) => {
  const endpoint = isPrivate ? "/users/me" : `/users/${userId}`;
  const response = await nextServer.get(endpoint);
  return response.data;
};

export default function ProfileInfo({ isPrivate, userId }: ProfileInfoProps) {
  const user = useAuthStore((state) => state.user);
  const accountOwnerId = isPrivate ? user?._id : userId;

  const {
    data: userProfile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: isPrivate ? ["profile", "me"] : ["profile", userId],
    queryFn: () => fetchProfile(isPrivate, userId),
  });

  const {
    data: userLocations,
    isLoading: userLocationsLoading,
    isError: isUserLocationsError,
  } = useQuery<UserLocationsResponse>({
    queryKey: ["userLocations", accountOwnerId],
    queryFn: () => fetchUserLocations(accountOwnerId ?? ""),
    enabled: !!accountOwnerId,
  });

  console.log("userLocations: ", userLocations?.data);

  if (isLoading && userLocationsLoading)
    return <div className={css.loader}>Завантаження...</div>;

  if ((isError && isUserLocationsError) || !userProfile)
    return <div className={css.error}>Користувача не знайдено</div>;

  return (
    <section className={css.profileHeader}>
      <div className={css.avatarWrapper}>
        <Image
          src={userProfile.avatarUrl || "/user-defaul-photo.webp"}
          alt={`Аватар ${userProfile.name}`}
          fill
          sizes="(max-width: 768px) 64px, 96px"
          className={css.avatar}
          priority
        />
      </div>
      <div className={css.userInfo}>
        <div className={css.nameAndButton}>
          <h1 className={css.userName}>{userProfile.name}</h1>

          {isPrivate && (
            <Link href="/edit" className={css.editProfileBtn}>
              Редагувати профіль
            </Link>
          )}
        </div>

        <p className={css.userStats}>
          {/* Статей: {userProfile.articlesAmount || 0} */}
          Статей: {userLocations?.data.length ?? 0}
        </p>
      </div>
    </section>
  );
}
