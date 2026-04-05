"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Formik, Field, ErrorMessage, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import axios from "axios";
import { useRef, useState } from "react";
import { useRouter  } from "next/navigation"; 
import css from "./page.module.css";
import { LocationType } from "@/types/locationType";
import { Region } from "@/types/region";
import { CreateLocationPayload } from "@/types/location";
import { getRegions, getLocationTypes } from "@/lib/api/clientApi";
import { createLocation } from "@/lib/api/clientApi";

const defaultValues: CreateLocationPayload = {
  name: "",
  regionId: "",
  locationTypeId: "",
  description: "",

};

const locationValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Назва має містити щонайменше 3 символи")
    .max(96, "Назва має містити не більше 96 символів")
    .required("Назва локації не може бути порожньою"),

  regionId: Yup.string().required("Оберіть регіон"),

  locationTypeId: Yup.string().required("Оберіть тип локації"),

  description: Yup.string()
    .trim()
    .min(20, "Опис має містити щонайменше 20 символів")
    .max(6000, "Опис має містити не більше 6000 символів")
    .required("Опис не може бути порожнім"),
});

export default function CreateLocation() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const locationTypesQuery = useQuery<LocationType[]>({
    queryKey: ["locationTypes"],
    queryFn: getLocationTypes,
    placeholderData: keepPreviousData,
    staleTime: 30 * 60 * 1000,
  });

  const regionsQuery = useQuery<Region[]>({
    queryKey: ["regions"],
    queryFn: getRegions,
    placeholderData: keepPreviousData,
    staleTime: 30 * 60 * 1000,
  });

  type BackendErrorResponse = {
    message?: string;
    errors?: Record<string, string>;
  };

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (
    values: CreateLocationPayload,
    actions: FormikHelpers<CreateLocationPayload>,
  ) => {
    try {
      if (!selectedFile) {
        actions.setStatus("Будь ласка, завантажте фото");
        return;
      }
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("regionId", values.regionId);
      formData.append("locationTypeId", values.locationTypeId);
      formData.append("description", values.description);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const createdLocation = await createLocation(formData);

      router.push(`/locations/${createdLocation._id}`);
      actions.resetForm();
      setSelectedFile(null);
      setPreviewUrl("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: unknown) {
      if (axios.isAxiosError<BackendErrorResponse>(error)) {
        const backendErrors = error.response?.data;

        if (backendErrors?.errors) {
          actions.setErrors(backendErrors.errors);
        } else {
          actions.setStatus(backendErrors?.message || "Щось пішло не так");
        }
      } else {
        actions.setStatus("Unknown issue occured");
      }
    }
  };

  return (
    <div className={css.pageContainer}>
      <div className="container">
        <div className={css.innerContainer}>
          <h1 className={css.pageTitle}>Додавання нового місця</h1>
          <p className={css.photoTitle}>Обкладинка</p>
          <div className={css.imageContainer}>
            <Image
              src={previewUrl || "/placeholder-image.jpg"}
              alt="plaseholder photo"
              fill
              unoptimized
              style={{ objectFit: "cover" }}
            />
          </div>

          <button
            type="button"
            className={css.downLoadPhotoBtn}
            onClick={handleOpenFilePicker}
          >
            Завантажити фото
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <Formik
            initialValues={defaultValues}
            validationSchema={locationValidationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form className={css.formikForm}>
                <label>
                  Назва місця
                  <Field
                    type="text"
                    name="name"
                    placeholder="Введіть назву місця"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className={css.error}
                  />
                </label>

                <label>
                  Тип місця
                  <div className={css.selectWrapper}>
                    <Field as="select" type="text" name="locationTypeId">
                      <option value="">Оберіть тип місця</option>
                      {locationTypesQuery.data?.map((locationType) => (
                        <option key={locationType._id} value={locationType._id}>
                          {locationType.name}
                        </option>
                      ))}
                    </Field>

                    <svg className={css.selectIcon} aria-hidden="true">
                      <use href="/icons.svg#icon-keyboard_arrow_down" />
                    </svg>

                    <ErrorMessage
                      name="locationTypeId"
                      component="p"
                      className={css.error}
                    />
                  </div>
                </label>

                <label>
                  Регіон
                  <div className={css.selectWrapper}>
                    <Field as="select" type="text" name="regionId">
                      <option value="">Оберіть регіон</option>
                      {regionsQuery.data?.map((region) => (
                        <option key={region._id} value={region._id}>
                          {region.region}
                        </option>
                      ))}
                    </Field>

                    <svg className={css.selectIcon} aria-hidden="true">
                      <use href="/icons.svg#icon-keyboard_arrow_down" />
                    </svg>

                    <ErrorMessage
                      name="regionId"
                      component="p"
                      className={css.error}
                    />
                  </div>
                </label>

                <label>
                  Детальний опис
                  <Field
                    as="textarea"
                    type="text"
                    name="description"
                    rows={5}
                    placeholder="Детальний опис локації"
                  />
                  <ErrorMessage
                    name="description"
                    component="p"
                    className={css.error}
                  />
                </label>

                <div className={css.buttonsContainer}>
                  <button
                    className={`${css.buttons} ${css.calcelBtn}`}
                    onClick={() => {
                      formikProps.resetForm();
                      setSelectedFile(null);
                      setPreviewUrl("");

                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    type="button"
                    disabled={formikProps.isSubmitting}
                  >
                    Відмінити
                  </button>
                  <button
                    className={`${css.buttons} ${css.postBtn}`}
                    type="submit"
                    disabled={!formikProps.isValid || formikProps.isSubmitting}
                  >
                    {formikProps.isSubmitting ? "Відправка" : "Опублікувати"}
                  </button>
                </div>

                {formikProps.status && (
                  <div
                    style={{ fontSize: "24px", color: "red" }}
                    className={css.error}
                  >{`Error: ${formikProps.status}`}</div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}