"use client";

import Link from "next/link";

import css from "./error.module.css";

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return (
    <div className={css.errorContainer}>
      <h2 className={css.errorTitle}>Error occured:</h2>
      <p>{error.message}</p>
      <Link className={css.goBack} href="/location/filter/all">
        Go to all locations
      </Link>
    </div>
  );
}
