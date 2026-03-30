import { User } from "@/types/user";
import { create } from "zustand";

interface AuthStore{
    user: User | null;
    isAuthenticated: boolean;
    clearIsAuthenticated: () => void;
    setUser: (user: User) => void;
    
}

export const useAuthStore = create<AuthStore>()((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set({
        user,
        isAuthenticated: true,
    }),
    clearIsAuthenticated: () => set({
        user: null,
        isAuthenticated: false,
    }),
}));