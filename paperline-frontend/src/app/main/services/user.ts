import type {
  DeleteAccountPayload,
  UpdateUserPayload,
} from "@/app/auth/types/types";
import { prodEndpoint, testingEndpoint } from "@/app/constants/api";
import { useAuthStore } from "@/app/store/authStore";

//User update requests
const token = useAuthStore.getState().token;

const update = async (data: Partial<UpdateUserPayload>) => {
  const res = await fetch(`${prodEndpoint}/api/auth/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Update failed");
  }

  return result;
};

const deleteAccount = async () => {
  const res = await fetch(`${testingEndpoint}/api/auth/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export { update, deleteAccount };
