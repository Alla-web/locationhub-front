"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

import { register } from "@/lib/api/api";
import { useAuthStore } from "@/lib/store/authStore";

import css from "./RegistrationForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Обов'язкове поле"),
  email: Yup.string().email("Некоректна пошта").required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, "Мінімум 8 символів")
    .required("Обов'язкове поле"),
});

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

function apiErrorMessage(err: unknown): string {
  if (isAxiosError(err)) {
    const data = err.response?.data as {
      message?: string;
      error?: string;
      errors?: Array<{ message?: string }>;
    };
    if (data?.errors?.[0]?.message) return data.errors[0].message;
    return data?.message ?? data?.error ?? err.message ?? "Помилка реєстрації";
  }
  return "Помилка реєстрації";
}

const RegistrationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useAuthStore((state) => state.setUser);

  const returnUrl = searchParams.get("returnUrl");

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      const user = await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      setUser(user);
      const safe =
        returnUrl && returnUrl.startsWith("/") && !returnUrl.startsWith("//")
          ? returnUrl
          : "/";
      router.push(safe);
    } catch (error: unknown) {
      toast.error(apiErrorMessage(error));
    }
  };

  return (
    <Formik<RegisterFormValues>
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form} noValidate>
          <div className={css.formGroup}>
            <label htmlFor="reg-name">Ім&apos;я*</label>
            <Field
              id="reg-name"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Ваше ім'я"
              className={`${css.formField} ${
                errors.name && touched.name ? css.errorField : ""
              }`}
            />
            <ErrorMessage name="name" component="p" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="reg-email">Пошта*</label>
            <Field
              id="reg-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="hello@relaxmap.ua"
              className={`${css.formField} ${
                errors.email && touched.email ? css.errorField : ""
              }`}
            />
            <ErrorMessage name="email" component="p" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="reg-password">Пароль*</label>
            <Field
              id="reg-password"
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="********"
              className={`${css.formField} ${
                errors.password && touched.password ? css.errorField : ""
              }`}
            />
            <ErrorMessage name="password" component="p" className={css.error} />
          </div>

          <div className={css.registerActions}>
            <button type="submit" className={css.registerButton}>
              Зареєструватись
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
