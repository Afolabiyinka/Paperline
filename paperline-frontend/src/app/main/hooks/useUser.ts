import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useToastMessage from "@/lib/useToastmsg";
import type { UpdateUserPayload } from "@/app/auth/types/types";
import { useAuthStore } from "@/app/store/authStore";
import { update } from "../services/user";

export interface AuthUser {
  email: string;
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  profilePic: string;
}

export default function useUser() {
  const { authUser, setAuthUser, logout } = useAuthStore();
  const [updatedData, setupdatedData] = useState<Partial<UpdateUserPayload>>(
    {}
  );
  const { toastError, toastSuccess } = useToastMessage();

  useEffect(() => {
    if (authUser) {
      setupdatedData({
        email: authUser.email,
        username: authUser.username,
        lastname: authUser.lastname,
        firstname: authUser.firstname,
        profilePic: authUser.profilePic,
      });
    }
  }, [authUser]);

  // Mutation to update user
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: UpdateUserPayload) => update(payload),
    onSuccess: (data) => {
      toastSuccess(data.message);
      if (data.user) {
        setAuthUser(data.user);
      }
    },
    onError: () => {
      toastError("Something went wrong");
      logout();
      window.location.href = "/auth/login";
    },
  });

  function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    mutate(updatedData);
  }

  // update profile picture only
  async function updateProfilePic(url: string) {
    if (!authUser?.id) return toastError("Unathorised");

    mutate({ profilePic: url, id: authUser.id });

    setupdatedData((prev) => ({
      ...prev,
      profilePic: url,
    }));
  }

  return {
    logout,
    authUser,
    updatedData,
    setupdatedData,
    handleUpdate,
    updateProfilePic,
    setAuthUser,
    loading: isPending,
  };
}
