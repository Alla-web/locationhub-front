"use client";

import Link from "next/link";
import { useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./auth-prompt-modal.module.css";

type AuthPromptModalProps = {
  title?: string;
  message?: string;
  closeMode?: "back" | "home";
};

export default function AuthPromptModal({
  title = "Потрібна авторизація",
  message = "Щоб додати це місце до обраних, будь ласка, увійдіть у свій акаунт або зареєструйтеся.",
  closeMode = "back",
}: AuthPromptModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  const handleClose = useCallback(() => {
    if (closeMode === "home") {
      router.back();
      return;
    }

    router.back();
  }, [closeMode, router]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleClose]);

  const handleBackdropClick = () => {
    handleClose();
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const loginHref = from ? `/login?from=${encodeURIComponent(from)}` : "/login";

  const registerHref = from
    ? `/register?from=${encodeURIComponent(from)}`
    : "/register";

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className={styles.modal}
        onClick={handleModalClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-prompt-title"
        aria-describedby="auth-prompt-description"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Закрити модальне вікно"
        >
          ×
        </button>

        <h2 id="auth-prompt-title" className={styles.title}>
          {title}
        </h2>

        <p id="auth-prompt-description" className={styles.text}>
          {message}
        </p>

        <div className={styles.actions}>
          <Link href={loginHref} className={styles.primaryButton}>
            Увійти
          </Link>

          <Link href={registerHref} className={styles.secondaryButton}>
            Зареєструватися
          </Link>
        </div>
      </div>
    </div>
  );
}
