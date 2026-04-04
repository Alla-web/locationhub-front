"use client";

import css from "./error.module.css";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className={css.errorContainer}>
      <p>{error.message}</p>
      <button onClick={reset} className={css.resetButton}>
        Reset
      </button>
    </div>
  );
}
