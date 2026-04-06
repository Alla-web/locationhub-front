"use client";

import { useRouter } from "next/navigation";

import css from "./error.module.css";

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  const router = useRouter();

  return (
    <div className={css.errorContainer}>
      <p>{error.message}</p>
      <button onClick={() => router.push("/")} className={css.resetButton}>
        Reset
      </button>
    </div>
  );
}
