import AuthHeader from '@/components/AuthHeader/AuthHeader';
import css from './AuthLayout.module.css';
import AuthNav from '@/components/AuthNav/AuthNav';
import LoginForm from '@/components/LoginForm/LoginForm';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={css.wrapper}>
      <AuthHeader />
      <main className={css.authContainer}>
        {children}
      </main>
    </div>
  );
}