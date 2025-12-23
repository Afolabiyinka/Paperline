import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useToastMessage from "@/lib/useToastmsg";
import type { UpdateUserPayload } from "@/app/auth/types/types";
import { useAuthStore } from "@/app/store/authStore";

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
  const { toastError, toastSuccess, toastLoading } = useToastMessage();
  const baseUrl = import.meta.env.VITE_BASEURL!;

  useEffect(() => {
    if (authUser) {
      setupdatedData({
        email: authUser.email,
        username: authUser.username,
        id: authUser.id,
        lastname: authUser.lastname,
        firstname: authUser.firstname,
        profilePic: authUser.profilePic,
      });
    }
  }, [authUser]);

  // Mutation to update user
  const { mutate } = useMutation({
    mutationFn: async (data: Partial<UpdateUserPayload>) => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseUrl}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.status === 401) {
        window.location.href = "/auth/login";
      }
      if (!res.ok) {
        toastError(result.message || "Failed to update user");
        throw new Error(result.message || "Update failed");
      }

      return result;
    },
    onMutate: () => toastLoading("Updating info..."),
    onSuccess: (data) => {
      toastSuccess(data.message);
      if (data.user) {
        setAuthUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    },
    onError: () => {
      toastError("Something went wrong");
    },
  });
  ``;

  function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    mutate(updatedData);
  }

  // NEW: update profile picture only
  async function updateProfilePic(url: string) {
    mutate({ profilePic: url });
    setupdatedData((prev) => ({ ...prev, profilePic: url }));
  }

  return {
    logout,
    authUser,
    updatedData,
    setupdatedData,
    handleUpdate,
    updateProfilePic,
    setAuthUser,
  };
}
