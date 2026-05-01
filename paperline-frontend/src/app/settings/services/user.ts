import type { UpdateUserPayload } from "@/app/auth/types/types";
import { prodEndpoint } from "@/shared/constants/api";
import type { MyBlogs } from "../types/types";

//User update requests

const getUser = async () => {
  try {
    const res = await fetch(`${prodEndpoint}/api/auth/me`, {
      credentials: "include",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch {
    return null;
  }
};

const update = async (data: Partial<UpdateUserPayload>) => {
  const res = await fetch(`${prodEndpoint}/api/auth/edit-profile`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",

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
  const res = await fetch(`${prodEndpoint}/api/auth/delete`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

const getUserBlogs = async (page: number): Promise<MyBlogs> => {
  const res = await fetch(`${prodEndpoint}/api/blogs/me?page=${page}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}

export { update, deleteAccount, getUser, getUserBlogs };
