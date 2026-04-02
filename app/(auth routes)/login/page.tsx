import LoginForm from "@/components/LoginForm/LoginForm";
import AuthTabs from "@/components/AuthTabs/AuthTabs";
import css from "./page.module.css";

export default function LoginPage() {
  return (
    <>
      <AuthTabs current="login" />
      <h1 className={css.loginTitle}>Вхід</h1>
      <LoginForm />
    </>
  );
}