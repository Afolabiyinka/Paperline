import { create } from "zustand";
import type { AuthUser } from "../main/hooks/useUser";

type AuthUserStore = {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser) => void;
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
};

function getStoredToken() {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
}

function getStoredUser() {
  const stored = localStorage.getItem("user");
  return stored ? (JSON.parse(stored) as AuthUser) : null;
}
export const useAuthStore = create<AuthUserStore>((set) => ({
  authUser: getStoredUser(),
  setAuthUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ authUser: user });
  },
  token: getStoredToken(),
  setToken: (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    set({ token: token });
  },
  logout: () => {
    localStorage.clear();
    set({ authUser: null });
    window.location.href = "/";
  },
}));
