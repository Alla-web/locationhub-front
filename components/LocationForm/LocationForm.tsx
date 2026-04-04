"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LocationDetails } from "@/types/location-details";
import { Region } from "@/types/region";
import { LocationType } from "@/types/locationType";
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

interface LocationFormValues {
  name: string;
  description: string;
  image: string;
  regionId: string;
  locationTypeId: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Мінімум 2 символи")
    .max(100, "Максимум 100 символів")
    .required("Обов'язкове поле"),
  description: Yup.string()
    .min(10, "Мінімум 10 символів")
    .max(1000, "Максимум 1000 символів")
    .required("Обов'язкове поле"),
  image: Yup.string().url("Введіть коректний URL").required("Обов'язкове поле"),
  regionId: Yup.string().required("Обов'язкове поле"),
  locationTypeId: Yup.string().required("Обов'язкове поле"),
});

const LocationForm = ({ location }: LocationFormProps) => {
  const router = useRouter();
  const [regions, setRegions] = useState<Region[]>([]);
  const [locationTypes, setLocationTypes] = useState<LocationType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [regionsData, locationTypesData] = await Promise.all([
          getRegions(),
          getLocationTypes(),
        ]);
        setRegions(regionsData);
        setLocationTypes(locationTypesData);
      } catch {
        toast.error("Помилка завантаження даних");
      }
    };
    fetchCategories();
  }, []);

  const initialValues: LocationFormValues = {
    name: location.name,
    description: location.description,
    image: location.image,
    regionId: location.regionId._id,
    locationTypeId: location.locationTypeId._id,
  };

  const handleSubmit = async (values: LocationFormValues) => {
    try {
      const payload: UpdateLocationPayload = values;
      await updateLocation(location._id, payload);
      toast.success("Локацію успішно оновлено!");
      router.push(`/locations/${location._id}`);
    } catch {
      toast.error("Помилка оновлення локації");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label>Назва*</label>
            <Field
              type="text"
              name="name"
              placeholder="Назва локації"
              className={`${css.formField} ${errors.name && touched.name ? css.errorField : ""}`}
            />
            <ErrorMessage name="name" component="p" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label>Тип місця*</label>
            <Field
              as="select"
              name="locationTypeId"
              className={`${css.formField} ${errors.locationTypeId && touched.locationTypeId ? css.errorField : ""}`}
            >
              <option value="">Оберіть тип локації</option>
              {locationTypes.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="locationTypeId"
              component="p"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label>Регіон*</label>
            <Field
              as="select"
              name="regionId"
              className={`${css.formField} ${errors.regionId && touched.regionId ? css.errorField : ""}`}
            >
              <option value="">Оберіть регіон</option>
              {regions.map((region) => (
                <option key={region._id} value={region._id}>
                  {region.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="regionId" component="p" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label>Текст історії*</label>
            <Field
              as="textarea"
              name="description"
              placeholder="Опис локації"
              className={`${css.formField} ${css.textarea} ${errors.description && touched.description ? css.errorField : ""}`}
            />
            <ErrorMessage
              name="description"
              component="p"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label>Зображення (URL)*</label>
            <Field
              type="text"
              name="image"
              placeholder="https://example.com/image.jpg"
              className={`${css.formField} ${errors.image && touched.image ? css.errorField : ""}`}
            />
            <ErrorMessage name="image" component="p" className={css.error} />
          </div>

          <div className={css.formActions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Відмінити зміни
            </button>
            <button type="submit" className={css.submitButton}>
              Зберегти зміни
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LocationForm;
