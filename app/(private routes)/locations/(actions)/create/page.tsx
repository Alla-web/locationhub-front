"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Image from "next/image";

import css from "./page.module.css";

import { LocationType } from "@/types/locationType";
import { Region } from "@/types/region";
import { getRegions, getLocationTypes } from "@/lib/api/clientApi";

interface CreateLocationType {
  name: string;
  regionId: string;
  locationTypeId: string;
  description: string;
}

const initialValues: CreateLocationType = {
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

  const handleCancel = () => {};

  const handleSubmit = (values: CreateLocationType) => {
    console.log(values);
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
            initialValues={initialValues}
            validationSchema={locationValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={css.formikForm}>
              <label>
                Назва місця
                <Field
                  type="text"
                  name="name"
                  placeholder="Введіть назву місця"
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
              </label>

              <div className={css.buttonsContainer}>
                <button
                  className={`${css.buttons} ${css.calcelBtn}`}
                  onClick={handleCancel}
                  type="button"
                >
                  Відмінити
                </button>
                <button
                  className={`${css.buttons} ${css.postBtn}`}
                  type="submit"
                >
                  Опублікувати
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
