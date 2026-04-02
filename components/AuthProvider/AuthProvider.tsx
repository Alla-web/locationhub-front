"use client";

import { checkSession } from "@/lib/api/clientApi"; // Виправлений імпорт
import { getMe } from "@/lib/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast"; // Повернули Тостер

type Props = { children: React.ReactNode };

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const setAuthReady = useAuthStore((state) => state.setAuthReady);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const sessionData = await checkSession();

        if (sessionData) {
          const user = await getMe();

          if (user) {
            setUser(user);
          } else {
            clearIsAuthenticated();
          }
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        clearIsAuthenticated();
      } finally {
        setAuthReady();
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated, setAuthReady]);

  return (
    <>
      <Toaster position="top-right" />
      {children}
    </>
  );
};

export default AuthProvider;
