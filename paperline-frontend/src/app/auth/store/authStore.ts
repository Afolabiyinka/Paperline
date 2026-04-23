import type { AuthUser } from "@/app/settings/types/types";
import { create } from "zustand";

type AuthUserStore = {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser) => void;
  logout: () => void;
};


export const useAuthStore = create<AuthUserStore>((set) => ({
  authUser: null,
  setAuthUser: (user) => {
    set({ authUser: user });
  },
  logout: () => {
    set({ authUser: null });
    window.location.href = "/";
  },
}));
