import LoginForm from "@/components/LoginForm/LoginForm";

import css from "./page.module.css";

export default function LoginPage() {
  return (
    <>
    <h1 className={css.loginTitle}>Вхід</h1>
      <LoginForm />
    </>
  );
}