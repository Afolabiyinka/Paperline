import { create } from "zustand";
import type { AuthUser } from "../main/hooks/useUser";

type AuthUserStore = {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthUserStore>((set) => ({
  authUser: (() => {
    const stored = localStorage.getItem("user");
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  })(),
  setAuthUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ authUser: user });
  },
  logout: () => {
    localStorage.clear();
    set({ authUser: null });
    window.location.href = "/";
  },
}));
