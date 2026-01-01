import useToastMessage from "@/lib/useToastmsg";
import type { SignupPayload } from "../types/types";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/authStore";
import { signup } from "../services/request";

export default function useSignUp() {
  const [signUpData, setSignUpData] = React.useState<SignupPayload>({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmedPassword: "",
  });

  const { toastError, toastSuccess } = useToastMessage();
  const navigate = useNavigate();
  const { setAuthUser, setToken } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: SignupPayload) => signup(payload),
    onSuccess: (data) => {
      setAuthUser(data.user);
      setToken(data.token);
      toastSuccess(data.message);
      navigate("/onboarding");
    },
    onError: (err) => toastError(err.message),
  });

  function handleSubmit() {
    if (!signUpData.email) return toastError("Email is required");
    if (!signUpData.password) return toastError("Password is required");
    if (signUpData.password.length < 6)
      return toastError("Password must be at least 6 characters");
    if (signUpData.password.toLowerCase() === signUpData.password)
      return toastError("Password must contain an uppercase letter");
    if (signUpData.password !== signUpData.confirmedPassword)
      return toastError("Passwords don't match");

    mutate({
      email: signUpData.email,
      firstname: signUpData.firstname,
      lastname: signUpData.lastname,
      password: signUpData.password,
    });
  }
  return {
    signUpData,
    setSignUpData,
    handleSubmit,
    loading: isPending,
  };
}
