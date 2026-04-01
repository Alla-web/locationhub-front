import { User } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isAuthReady: boolean;
  setAuthReady: () => void;
  clearIsAuthenticated: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthReady: false, // Спочатку ми не знаємо, хто цей юзер

  setAuthReady: () => set({ isAuthReady: true }),

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  clearIsAuthenticated: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
