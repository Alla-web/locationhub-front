"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { LocationDetails } from "@/types/location-details";
import { LocationType } from "@/types/locationType";
import { Region } from "@/types/region";
import { UpdateLocationPayload } from "@/types/location";
import {
  getRegions,
  getLocationTypes,
  updateLocation,
} from "@/lib/api/clientApi";

import css from "./LocationForm.module.css";

interface LocationFormProps {
  location: LocationDetails;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Мінімум 3 символи")
    .max(100, "Максимум 100 символів")
    .required("Назва не може бути порожньою"),
  regionId: Yup.string().required("Оберіть регіон"),
  locationTypeId: Yup.string().required("Оберіть тип місця"),
  description: Yup.string()
    .trim()
    .min(10, "Мінімум 10 символів")
    .max(1000, "Максимум 1000 символів")
    .required("Опис не може бути порожнім"),
});

const LocationForm = ({ location }: LocationFormProps) => {
  const router = useRouter();

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

  const initialValues: UpdateLocationPayload = {
    name: location.name,
    description: location.description,
    image: location.image,
    regionId: location.regionId._id,
    locationTypeId: location.locationTypeId._id,
  };

  type BackendErrorResponse = {
    message?: string;
    errors?: Record<string, string>;
  };

  const handleSubmit = async (
    values: UpdateLocationPayload,
    actions: FormikHelpers<UpdateLocationPayload>,
  ) => {
    try {
      await updateLocation(location._id, values);
      toast.success("Локацію успішно оновлено!");
      router.push(`/locations/${location._id}`);
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
          <h1 className={css.pageTitle}>Редагування місця</h1>

          <p className={css.photoTitle}>Обкладинка статті</p>
          <div className={css.imageContainer}>
            <Image
              src={location.image || "/placeholder-image.jpg"}
              alt={location.name}
              fill
              unoptimized
              style={{ objectFit: "cover" }}
            />
          </div>
          <button className={css.downLoadPhotoBtn} type="button">
            Завантажити фото
          </button>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
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
                    <Field as="select" name="locationTypeId">
                      <option value="">Оберіть тип місця</option>
                      {locationTypesQuery.data?.map((type) => (
                        <option key={type._id} value={type._id}>
                          {type.type}
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
                    <Field as="select" name="regionId">
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
                  Текст історії
                  <Field
                    as="textarea"
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
                    type="button"
                    onClick={() => router.back()}
                    disabled={formikProps.isSubmitting}
                  >
                    Відмінити зміни
                  </button>
                  <button
                    className={`${css.buttons} ${css.postBtn}`}
                    type="submit"
                    disabled={!formikProps.isValid || formikProps.isSubmitting}
                  >
                    {formikProps.isSubmitting
                      ? "Збереження..."
                      : "Зберегти зміни"}
                  </button>
                </div>

                {formikProps.status && (
                  <div
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
};

export default LocationForm;
