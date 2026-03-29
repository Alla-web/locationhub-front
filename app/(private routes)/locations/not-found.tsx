"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import css from "./not-found.module.css";

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    const timerId = setTimeout(() => router.push("/notes/filter/all"), 5000);

    return () => clearTimeout(timerId);
  }, [router]);

  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
