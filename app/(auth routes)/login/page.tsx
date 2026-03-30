import LoginForm from '@/components/LoginForm/LoginForm';
import AuthNav from '@/components/AuthNav/AuthNav';
import css from './page.module.css';

export default function LoginPage() {
  return (
    <>
      <AuthNav />
      <h1 className={css.loginTitle}>Вхід</h1>
      <LoginForm />
    </>
  );
}