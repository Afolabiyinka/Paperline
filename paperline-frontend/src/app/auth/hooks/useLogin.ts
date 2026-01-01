import React from "react";
import useToastMessage from "@/lib/useToastmsg";
import type { LoginPayload } from "../types/types";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/app/store/authStore";
import { login } from "../services/request";

export default function useLogin() {
  const [loginData, setLoginData] = React.useState<LoginPayload>({
    email: "",
    password: "",
  });

  const { toastError, toastSuccess } = useToastMessage();
  const { setAuthUser, setToken } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      toastSuccess(data.message);
      setToken(data.token);
      setAuthUser(data.user);

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  const handlelogin = () => {
    if (!loginData.email) return toastError("Email is required");
    if (!loginData.password) return toastError("Password is required");
    if (loginData.password.length < 6)
      return toastError("Password must be at least 6 characters");
    if (loginData.password.toLowerCase() === loginData.password)
      return toastError("Password must contain an uppercase letter");

    loginMutation.mutate(loginData);
  };

  return {
    loginData,
    setLoginData,
    handlelogin,
    isLoading: loginMutation.isPending,
  };
}
