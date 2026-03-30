import AuthHeader from '@/components/AuthHeader/AuthHeader';
import css from './AuthLayout.module.css';

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