import type { LoginPayload, SignupPayload } from "../types/auth.types";
import type { Response } from "@/shared/shared.types";
import { apiClient } from "@/shared/api/apiClient";

const login = async (payload: LoginPayload) => {

  try {
    const res = await apiClient.post<Response>(`/auth/login`, payload);
    return res.data
  }
  catch (err) {
    throw new Error()
  }



};

const signup = async (payload: SignupPayload) => {
  try {
    const res = await apiClient.post<Response>(`api/auth/signup`, payload);

    return res.data
  }
  catch (err) {
    throw new Error()
  }
};

export { login, signup };
