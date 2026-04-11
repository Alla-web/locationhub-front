"use client";

import Link from "next/link";
import { useEffect } from "react";
import css from "./AuthPromptModal.module.css";

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
    <div className={css.backdrop} onClick={onClose} role="presentation">
      <div
        className={css.modal}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-prompt-title"
        aria-describedby="auth-prompt-description"
      >
        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Закрити модальне вікно"
        >
          ×
        </button>

        <h2 id="auth-prompt-title" className={css.title}>
          {title}
        </h2>

        <p id="auth-prompt-description" className={css.text}>
          {message}
        </p>

        <div className={css.actions}>
          <Link href={loginHref} className={css.primaryButton}>
            Увійти
          </Link>

          <Link href={registerHref} className={css.secondaryButton}>
            Зареєструватися
          </Link>
        </div>
      </div>
    </div>
  );
}
