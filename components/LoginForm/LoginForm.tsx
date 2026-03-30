'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { login } from '@/lib/api/api';
import { LoginRequest } from '@/types/auth';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import css from './LoginForm.module.css';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Некоректний email')
    .required('Обовʼязкове поле'),
  password: Yup.string()
    .min(6, 'Мінімум 6 символів')
    .required('Обовʼязкове поле'),
});

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setUser = useAuthStore((state) => state.setUser);

  const from = searchParams.get('from');

  const handleSubmit = async (values: LoginRequest) => {
    try {
      const user = await login(values);

      setUser(user);

      router.push(from || '/');
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error || 'Помилка авторизації'
      );
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
        
          <div className={css.formGroup}>
            <label>
              Пошта*
            </label>
            <Field
              type="email"
              name="email"
              placeholder="hello@relaxmap.ua"
              className={`${css.formField} ${errors.email && touched.email ? css.errorField : ''
                }`}
            />
            <ErrorMessage name="email" component="p" className={css.error} />
        
          </div>
          
          <div className={css.formGroup}>
            <label>
              Пароль*
            </label>
            <Field
              type="password"
              name="password"
              placeholder="********"
              className={`${css.formField} ${errors.password && touched.password ? css.errorField : ''
                }`}
            />
            <ErrorMessage name="password" component="p" className={css.error} />
          
          </div>

          <div className={css.loginActions}>
            <button type="submit"
              className={css.loginButton}
            >Увійти
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;