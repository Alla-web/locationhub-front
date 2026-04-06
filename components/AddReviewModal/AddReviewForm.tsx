"use client";

import React, { useState } from "react";
import { createFeedback } from "@/lib/api/clientApi";
import css from "./AddReviewForm.module.css";

interface AddReviewFormProps {
  locationId: string | string[] | undefined;
  onSuccess: () => void;
}

export const AddReviewForm = ({
  locationId,
  onSuccess,
}: AddReviewFormProps) => {
  const [rate, setRate] = useState(0);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<{
    rate?: string;
    text?: string;
    form?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const normalizedLocationId = Array.isArray(locationId)
    ? locationId[0]
    : locationId;

  const validate = () => {
    const newErrors: { rating?: string; comment?: string; form?: string } = {};

    if (!normalizedLocationId) {
      newErrors.form = "Не вдалося визначити локацію";
    }

    if (rate < 1) newErrors.rating = "Оберіть рейтинг";

    if (!text.trim()) {
      newErrors.comment = "Обов'язкове поле";
    } else if (text.trim().length < 10) {
      newErrors.comment = "Мінімум 10 символів";
    } else if (text.length > 100) {
      newErrors.comment = "Максимум 100 символів";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setErrors({});

      await createFeedback(String(normalizedLocationId), {
        LocationId: String(normalizedLocationId),
        rate,
        text: text.trim(),
      });

      onSuccess();
    } catch (error) {
      let message = "Помилка при відправці відгуку";

      if (error instanceof Error) {
        message = error.message;
      }

      setErrors({
        form: message,
      });
      console.error("Помилка при відправці:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () =>
    [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        className={star <= rate ? css.starOn : css.starOff}
        onClick={() => {
          setRate(star);
          setErrors((prev) => ({ ...prev, rate: undefined }));
        }}
        aria-label={`${star} зірок`}
      >
        ★
      </button>
    ));

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.field}>
        <h3 className={css.subtitle}>Ваш відгук</h3>

        <textarea
          placeholder="Напишіть ваш відгук"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setErrors((prev) => ({
              ...prev,
              text: undefined,
              form: undefined,
            }));
          }}
          className={`${css.textarea} ${errors.text ? css.textareaError : ""}`}
        />

        <div className={css.warning}>
          {errors.text && <p className={css.error}>{errors.text}</p>}
          <p className={css.counter}>{text.length}/100</p>
        </div>
      </div>

      <div className={css.field}>
        <div className={css.stars}>{renderStars()}</div>
        {errors.rate && <p className={css.error}>{errors.rate}</p>}
      </div>

      {errors.form && <p className={css.error}>{errors.form}</p>}

      <div className={css.actions}>
        <button type="button" onClick={onSuccess} className={css.cancel}>
          Відмінити
        </button>
        <button type="submit" disabled={loading} className={css.submit}>
          {loading ? "Відправка..." : "Надіслати"}
        </button>
      </div>
    </form>
  );
};
