import { Suspense } from 'react';

import AuthNav from '@/components/AuthNav/AuthNav';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';

import css from './page.module.css';

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
