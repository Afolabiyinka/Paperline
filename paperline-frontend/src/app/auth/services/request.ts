import { prodEndpoint } from "@/shared/constants/api";
import type { LoginPayload, SignupPayload } from "../types/types";
import type { Response } from "@/shared/types";

const login = async (payload: LoginPayload): Promise<Response> => {
  const res = await fetch(`${prodEndpoint}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

const signup = async (payload: SignupPayload): Promise<Response> => {
  const res = await fetch(`${prodEndpoint}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  const data = await res.json();

  if (!res.ok) {
    const message = data?.message || "Login failed";
    throw new Error(message);
  }

  return data;
};

export { login, signup };
