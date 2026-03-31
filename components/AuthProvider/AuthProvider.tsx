'use client';

import { checkSession, getMe } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
          const user = await getMe();
        if (user) setUser(user);
      } else {
        clearIsAuthenticated();
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return (
    <>
      <Toaster position="top-right" />
      {children}
    </>
  );
};

export default AuthProvider;