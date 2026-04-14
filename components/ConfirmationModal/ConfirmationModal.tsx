"use client";

import { useEffect, useState } from "react";
import css from "./ConfirmationModal.module.css";

type ConfirmationModalProps = {
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
};

export const ConfirmationModal = ({
  title = "Ви точно хочете вийти?",
  message = "Ми будемо сумувати за вами!",
  confirmButtonText = "Вийти",
  cancelButtonText = "Відмінити",
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onCancel]);

  const handleBackdropClick = () => {
    onCancel();
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await onConfirm();

      onCancel();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Щось пішло не так");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className="container">
        <div className={css.modal} onClick={handleModalClick}>
          <button
            type="button"
            className={css.closeButton}
            onClick={onCancel}
            aria-label="Close modal"
          >
            ×
          </button>

          <h2 className={css.title}>{title}</h2>

          <p className={css.text}>{message}</p>

          {error && <p className={css.error}>{error}</p>}

          <div className={css.actionsContainer}>
            <button
              type="button"
              className={`${css.buttons} ${css.confirmButton}`}
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Завантаження..." : confirmButtonText}
            </button>

            <button
              type="button"
              className={`${css.buttons} ${css.cancelButton}`}
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
