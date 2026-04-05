"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Formik, Field, ErrorMessage, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import css from "./page.module.css";

import { LocationType } from "@/types/locationType";
import { Region } from "@/types/region";
import { CreateLocationPayload } from "@/types/location";
import { getRegions, getLocationTypes } from "@/lib/api/clientApi";
import { createLocation } from "@/lib/api/clientApi";

const defaultValues: CreateLocationPayload = {
  image: "",
  name: "",
  regionId: "",
  locationTypeId: "",
  description: "",
};

const locationValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Field name shoulf contain 3 character at least")
    .max(100, "Field name shoulf contain 100 characters maximum")
    .required("Locations name shoulden't be empty"),
  regionId: Yup.string().required("Choose a region"),
  locationTypeId: Yup.string().required("Choose a location type"),
  description: Yup.string()
    .trim()
    .min(10, "Field name shoulf contain 10 character at least")
    .max(1000, "Field name shoulf contain 1000 characters maximum")
    .required("Locations name shoulden't be empty"),
});

export default function CreateLocation() {
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

  type BackendErrorResponse = {
    message?: string;
    errors?: Record<string, string>;
  };

  const handleSubmit = async (
    values: CreateLocationPayload,
    actions: FormikHelpers<CreateLocationPayload>,
  ) => {
    try {
      actions.resetForm();
      const newLocation = await createLocation(values);

      console.log("newLocation: ", newLocation);

      if (newLocation) {
        toast.success("New locations was successfuly created");
        router.push(`/locations/${newLocation._id}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError<BackendErrorResponse>(error)) {
        const backendErrors = error.response?.data;

        if (backendErrors?.errors) {
          actions.setErrors(backendErrors.errors);
        } else {
          actions.setStatus(backendErrors?.message || "Something went wrong");
        }
      } else {
        actions.setStatus("Unknown issue occured");
      }
    } finally {
      actions.resetForm();
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
              src="/placeholder-image.jpg"
              alt="plaseholder photo"
              fill
              unoptimized
              style={{ objectFit: "cover" }}
            />
          </div>

          <button className={css.downLoadPhotoBtn}>Завантажити фото</button>

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
                          {region.name}
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
                    onClick={() => formikProps.resetForm()}
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
                  >
                    {`Error: ${formikProps.status}`}
                    toast.error(formikProps.status)
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
