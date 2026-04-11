"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "./auth-prompt-modal.module.css";

type AuthPromptModalProps = {
  title?: string;
  message?: string;
  onClose: () => void;
  from: string;
};

export default function AuthPromptModal({
  title = "Потрібна авторизація",
  message = "Щоб додати це місце до обраних, будь ласка, увійдіть у свій акаунт або зареєструйтеся.",
  onClose,
  from,
}: AuthPromptModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      window.addEventListener("keydown", handleEscape);

      return () => {
        window.removeEventListener("keydown", handleEscape);
      };
    };
  }, [onClose]);

  const loginHref = `/login?from=${encodeURIComponent(from)}`;
  const registerHref = `/register?from=${encodeURIComponent(from)}`;

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-prompt-title"
        aria-describedby="auth-prompt-description"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
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
