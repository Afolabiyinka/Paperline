import type { AuthUser } from "@/app/settings/types/types";
import { create } from "zustand";

type AuthUserStore = {
  authUser: AuthUser | null;
  isAuthResolved: boolean;

  setAuthUser: (user: AuthUser | null) => void;
  setAuthResolved: (value: boolean) => void;

  logout: () => void;
};

export const useAuthStore = create<AuthUserStore>((set) => ({
  authUser: null,
  isAuthResolved: false,

  setAuthUser: (user) => {
    set({ authUser: user });
  },

  setAuthResolved: (value) => {
    set({ isAuthResolved: value });
  },

  logout: () => {
    set({ authUser: null, isAuthResolved: true });
    window.location.href = "/";
  },
}));