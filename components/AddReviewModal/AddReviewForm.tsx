"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { isAxiosError } from "axios";
import { createFeedback } from "@/lib/api/clientApi";
import toast from "react-hot-toast";

import css from "./AddReviewForm.module.css";

interface AddReviewFormProps {
  locationId: string | string[] | undefined;
  onClose: () => void;
  onSuccess: () => void;
}

interface ReviewFormValues {
  rate: number;
  description: string;
}

const initialValues: ReviewFormValues = {
  rate: 0,
  description: "",
};

const validationSchema = Yup.object({
  rate: Yup.number()
    .min(1, "Оберіть рейтинг")
    .max(5, "Максимум 5 зірок")
    .required("Оберіть рейтинг"),
  description: Yup.string()
    .trim()
    .min(10, "Мінімум 10 символів")
    .max(100, "Максимум 100 символів")
    .required("Обов'язкове поле"),
});

function apiErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const data = error.response?.data as {
      message?: string;
      error?: string;
      errors?: Array<{ message?: string }>;
    };

    if (data?.errors?.[0]?.message) return data.errors[0].message;
    return (
      data?.message ??
      data?.error ??
      error.message ??
      "Помилка при відправці відгуку"
    );
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Помилка при відправці відгуку";
}

export const AddReviewForm = ({
  locationId,
  onClose,
  onSuccess,
}: AddReviewFormProps) => {
  const queryClient = useQueryClient();

  const normalizedLocationId = Array.isArray(locationId)
    ? locationId[0]
    : locationId;

  return (
    <Formik<ReviewFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        if (!normalizedLocationId) {
          toast.error("Не вдалося визначити локацію");
          setSubmitting(false);
          return;
        }

        try {
          await createFeedback(normalizedLocationId, {
            rate: values.rate,
            description: values.description.trim(),
          });
          await queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
          toast.success("Відгук відправлено на модерацію");
          onSuccess();
        } catch (error) {
          toast.error(apiErrorMessage(error));
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        touched,
        values,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
      }) => (
        <Form className={css.form} noValidate>
          <div className={css.field}>
            <h3 className={css.subtitle}>Ваш відгук</h3>

            <Field
              as="textarea"
              name="description"
              placeholder="Напишіть ваш відгук"
              className={`${css.textarea} ${
                errors.description && touched.description
                  ? css.textareaError
                  : ""
              }`}
            />

            <div className={css.warning}>
              <ErrorMessage
                name="description"
                component="p"
                className={css.error}
              />
              <p className={css.counter}>{values.description.length}/100</p>
            </div>
          </div>

          <div className={css.field}>
            <div className={css.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`${css.starButton} ${
                    star <= values.rate ? css.starOn : css.starOff
                  }`}
                  onClick={() => {
                    setFieldValue("rate", star);
                    setFieldTouched("rate", true, false);
                  }}
                  aria-label={`${star} зірок`}
                >
                  {star <= values.rate ? "★" : "☆"}
                </button>
              ))}
            </div>
            <ErrorMessage name="rate" component="p" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" onClick={onClose} className={css.cancel}>
              Відмінити
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={css.submit}
            >
              {isSubmitting ? (
                <span className={css.submitContent}>
                  <span className={css.loader} aria-hidden="true" />
                  Відправка...
                </span>
              ) : (
                "Надіслати"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
