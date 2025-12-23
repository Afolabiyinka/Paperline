import useToastMessage from "@/lib/useToastmsg";
import type { SignupPayload } from "../types/types";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useSignUp() {
  const [signUpData, setSignUpData] = React.useState<SignupPayload>({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmedPassword: "",
  });

  const { toastError, toastLoading, toastSuccess } = useToastMessage();
  const baseUrl = import.meta.env.VITE_BASEURL!;
  const navigate = useNavigate();

  const { data, isPending, isSuccess, error, mutate } = useMutation({
    mutationFn: async () => {
      const payload = {
        email: signUpData.email,
        firstname: signUpData.firstname,
        lastname: signUpData.lastname,
        password: signUpData.password,
      };
      const res = await fetch(`${baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data;
    },
    onSuccess: (data) => {
      toastSuccess(data.message);
      navigate("/auth/login");
    },
    onError: (err) => toastError(err.message),
    onMutate: () => toastLoading("Creating account"),
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

    mutate();
  }
  return {
    signUpData,
    setSignUpData,
    handleSubmit,
  };
}
