import type { UpdateUserPayload } from "@/app/auth/types/auth.types";
import type { AuthUser, MyBlogs } from "../types/settings.types";
import { apiClient } from "@/shared/api/apiClient";
import type { PaginatedResponse, Response } from "@/shared/shared.types";
import type { BlogPost } from "@/app/blogs/types/blog.types";

//User update requests

const getUser = async () => {
  try {
    const res = await apiClient.get<AuthUser>(`/me`,);
    return res.data
  } catch {
    return null;
  }
};

const update = async (data: Partial<UpdateUserPayload>) => {
  try {
    const res = await apiClient.put<Response>(`/me`, data);
    return res.data;
  } catch (err) {
    throw new Error()
  }
};

const deleteAccount = async () => {
  try {
    const res = await apiClient.delete(`/auth/delete`);
    return res.data;
  } catch (err) {
    throw new Error()
  }
};

const getUserBlogs = async (page: number): Promise<MyBlogs> => {
  try {
    const res = await apiClient.get<PaginatedResponse<BlogPost>>(`/blogs/my-blogs?page=${page}`);
    return res.data;
  } catch (err) {
    throw new Error()
  }
}

const logout = async () => {
  try {
    const res = await apiClient.post(`/auth/logout`)
    return res.data;
  }
  catch (err) {
    throw new Error()
  }
}

export { update, deleteAccount, getUser, getUserBlogs, logout };
