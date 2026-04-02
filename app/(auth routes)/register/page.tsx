import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import AuthTabs from "@/components/AuthTabs/AuthTabs";
import css from "./page.module.css";

export default function RegisterPage() {
  return (
    <>
      <AuthTabs current="register" />
      <h1 className={css.registerTitle}>Реєстрація</h1>
      <RegistrationForm />
    </>
  );
}