import React from "react";
import useToastMessage from "@/lib/useToastmsg";
import type { LoginPayload } from "../types/types";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
  const [loginData, setLoginData] = React.useState<LoginPayload>({
    email: "",
    password: "",
  });

  const { toastError, toastSuccess, toastLoading } = useToastMessage();

  const baseUrl = import.meta.env.VITE_BASEURL!;

  const loginMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        email: loginData.email,
        password: loginData.password,
      };

      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toastError(data.message);
        throw new Error(data.message);
      }

      return data;
    },
    onSuccess: (data) => {
      toastSuccess(data.message);
      toastLoading("Signing in...");
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    },
    onError: (err: any) => {
      console.log(err);
    },
    onMutate: () => {
      toastLoading("Signing in");
    },
  });

  const handlelogin = () => {
    if (!loginData.email) return toastError("Email is required");
    if (!loginData.password) return toastError("Password is required");
    if (loginData.password.length < 6)
      return toastError("Password must be at least 6 characters");
    if (loginData.password.toLowerCase() === loginData.password)
      return toastError("Password must contain an uppercase letter");

    loginMutation.mutate();
  };

  return {
    loginData,
    setLoginData,
    handlelogin,
    isLoading: loginMutation.isPending,
  };
}
