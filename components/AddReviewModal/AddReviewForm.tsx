"use client";

import { useState, useEffect } from "react";
import { createFeedback, getMe } from "@/lib/api/clientApi";
import styles from "./AddReviewForm.module.css";

interface AddReviewFormProps {
  locationId: string | string[] | undefined;
  onSuccess: () => void;
}

export const AddReviewForm = ({
  locationId,
  onSuccess,
}: AddReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("Анонім");
  const [errors, setErrors] = useState<{ rating?: string; comment?: string }>(
    {},
  );
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: { rating?: string; comment?: string } = {};

    if (rating < 1) newErrors.rating = "Оберіть рейтинг";

    if (!comment.trim()) {
      newErrors.comment = "Обов'язкове поле";
    } else if (comment.trim().length < 10) {
      newErrors.comment = "Мінімум 10 символів";
    } else if (comment.length > 100) {
      newErrors.comment = "Максимум 100 символів";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    getMe()
      .then((user) => {
        if (user?.name) setUserName(user.name);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await createFeedback(String(locationId), { rating, comment, userName });
      onSuccess();
    } catch (error) {
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
        className={star <= rating ? styles.starOn : styles.starOff}
        onClick={() => {
          setRating(star);
          setErrors((prev) => ({ ...prev, rating: undefined }));
        }}
        aria-label={`${star} зірок`}
      >
        ★
      </button>
    ));

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <h3 className={styles.subtitle}>Ваш відгук</h3>
        <textarea
          placeholder="Напишіть ваш відгук"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setErrors((prev) => ({ ...prev, comment: undefined }));
          }}
          className={`${styles.textarea} ${errors.comment ? styles.textareaError : ""}`}
        />
        <div className={styles.warning}>
          {errors.comment && <p className={styles.error}>{errors.comment}</p>}
          <p className={styles.counter}>{comment.length}/100</p>
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.stars}>{renderStars()}</div>
        {errors.rating && <p className={styles.error}>{errors.rating}</p>}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onSuccess} className={styles.cancel}>
          Відмінити
        </button>
        <button type="submit" disabled={loading} className={styles.submit}>
          {loading ? "Відправка..." : "Надіслати"}
        </button>
      </div>
    </form>
  );
};