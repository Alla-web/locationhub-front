import { Suspense } from "react";

import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";

import css from "./page.module.css";

export default function RegisterPage() {
  return (
    <>
      <h1 className={css.loginTitle}>Реєстрація</h1>
      <Suspense fallback={null}>
        <RegistrationForm />
      </Suspense>
    </>
  );
}
