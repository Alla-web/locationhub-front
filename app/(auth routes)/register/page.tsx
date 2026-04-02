import { Suspense } from "react";

import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";

import css from "./page.module.css";
import AuthNav from "@/components/AuthNav/AuthNav";

export default function RegisterPage() {
  return (
    <>
      <AuthNav />
      <h1 className={css.loginTitle}>Реєстрація</h1>
      <Suspense fallback={null}>
        <RegistrationForm />
      </Suspense>
    </>
  );
}