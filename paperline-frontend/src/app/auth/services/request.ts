import { useAuthStore } from "@/app/store/authStore";
import type { LoginPayload, SignupPayload } from "../types/types";
import { prodEndpoint, testingEndpoint } from "../../constants/api";
import type { SuccessResponse } from "@/shared/types";
import type { AuthUser } from "@/app/main/hooks/useUser";

const token = useAuthStore.getState();

const login = async (
  payload: LoginPayload
): Promise<SuccessResponse<AuthUser>> => {
  const res = await fetch(`${prodEndpoint}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

const signup = async (
  payload: SignupPayload
): Promise<SuccessResponse<AuthUser>> => {
  const res = await fetch(`${testingEndpoint}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

export { login, signup };
