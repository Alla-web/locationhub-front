"use client";

import css from "./error.module.css";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className={css.errorContainer}>
      <p>Could not fetch the list of notes.</p>
      <p>{error.message}</p>
      <button onClick={reset} className={css.resetButton}>
        Reset
      </button>
    </div>
  );
}
