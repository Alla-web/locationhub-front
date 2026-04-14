"use client";

import { useRef, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import imageCompression from "browser-image-compression";

import { useAuthStore } from "@/lib/store/authStore";
import { updateProfile } from "@/lib/api/clientApi";
import { MAX_ORIGINAL_FILE_SIZE } from "@/types/location";

import css from "./EditProfileModal.module.css";

const profileValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .max(50, "Ім'я має містити не більше 50 символів")
    .required("Обов'язкове поле"),
});

interface ProfileFormValues {
  name: string;
}

export default function EditProfileModal() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const queryClient = useQueryClient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(user?.avatarUrl || "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClose = () => {
    router.back();
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Можна завантажувати тільки зображення");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_ORIGINAL_FILE_SIZE) {
      toast.error("Оригінальний файл занадто великий. Максимум 15 MB");
      event.target.value = "";
      return;
    }

    try {
      if (file.size > 1 * 1024 * 1024) {
        const compressedBlob = await imageCompression(file, {
          maxSizeMB: 1, // максимум 1MB
          maxWidthOrHeight: 1920, // масимальний розмір
          useWebWorker: true,
        });
        toast.success("Фото оптимізовано перед завантаженням");

        const compressedFile = new File([compressedBlob], file.name, {
          type: compressedBlob.type || file.type,
        });

        if (previewUrl && previewUrl !== user?.avatarUrl) {
          URL.revokeObjectURL(previewUrl);
        }

        setSelectedFile(compressedFile);
        setPreviewUrl(URL.createObjectURL(compressedFile));
      } else {
        if (previewUrl && previewUrl !== user?.avatarUrl) {
          URL.revokeObjectURL(previewUrl);
        }

        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }

      event.target.value = "";
    } catch (error) {
      event.target.value = "";
      console.error(error);
      toast.error("Помилка обробки зображення");
    }
  };

  const handleSubmit = async (
    values: ProfileFormValues,
    actions: FormikHelpers<ProfileFormValues>,
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);

      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      //тимчасово
      if (selectedFile) {
        console.log("selectedFile", {
          name: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type,
          lastModified: selectedFile.lastModified,
        });
      }
      ////

      const updatedUser = await updateProfile(formData);
      setUser(updatedUser);
      await queryClient.invalidateQueries({
        queryKey: ["profile", "me"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["userLocations"],
      });

      toast.success("Профіль успішно оновлено");
      handleClose();
    } catch (error: unknown) {
      const errorMessage =
        (isAxiosError(error) && error.response?.data?.error) ||
        "Помилка при оновленні";
      toast.error(errorMessage);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modalContainer}>
        <button type="button" onClick={handleClose} className={css.closeButton}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h2 className={css.modalTitle}>Редагувати профіль</h2>

        <Formik
          initialValues={{ name: user?.name || "" }}
          validationSchema={profileValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, isValid }) => (
            <Form className={css.form}>
              {/* Секція аватара */}
              <div className={css.inputGroup}>
                <p className={css.inputLabel}>Аватар</p>
                <div className={css.avatarRow}>
                  <div className={css.avatarPreview}>
                    <Image
                      src={previewUrl || "/user-defaul-photo.webp"}
                      alt="User avatar preview"
                      fill
                      sizes="100px"
                      className={css.avatarImage}
                    />
                  </div>
                  <button
                    type="button"
                    className={css.uploadPhotoButton}
                    onClick={handleOpenFilePicker}
                  >
                    Завантажити фото
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              <div className={css.inputGroup}>
                <label htmlFor="name" className={css.inputLabel}>
                  Ім&apos;я
                </label>
                <Field
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Введіть нове ім'я"
                  className={css.inputField}
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className={css.errorText}
                />
              </div>

              <div className={css.actionButtons}>
                <button
                  type="button"
                  onClick={handleClose}
                  className={css.cancelButton}
                  disabled={isSubmitting}
                >
                  Відмінити
                </button>
                <button
                  type="submit"
                  className={css.saveButton}
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? "Збереження..." : "Зберегти"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
