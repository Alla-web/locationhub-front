"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { nextServer } from "@/lib/api/api";
import css from "./ProfileInfo.module.css";

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
  const {
    data: userProfile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: isPrivate ? ["profile", "me"] : ["profile", userId],
    queryFn: () => fetchProfile(isPrivate, userId),
  });

  if (isLoading) return <div className={css.loader}>Завантаження...</div>;
  if (isError || !userProfile)
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
        <h1 className={css.userName}>{userProfile.name}</h1>
        <p className={css.userStats}>
          Статей: {userProfile.articlesAmount || 0}
        </p>
      </div>
    </section>
  );
}
