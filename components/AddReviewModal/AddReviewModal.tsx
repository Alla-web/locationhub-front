"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { AddReviewForm } from "../AddReviewModal/AddReviewForm";
import { IoIosClose } from "react-icons/io";
import styles from "./AddReviewModal.module.css";

export const AddReviewModal = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.locationId;

  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className={styles.backdrop} onClick={handleClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={handleClose}
        >
          <IoIosClose size="34px" />
        </button>

        <h2 className={styles.title}>Залишити відгук</h2>

        <AddReviewForm
          locationId={id}
          onSuccess={handleClose}
        />
      </div>
    </div>
  );
};