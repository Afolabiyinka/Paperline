import type { BlogPost } from "../types/blog.types";
import { apiClient } from "@/shared/api/apiClient";
import type { Response, PaginatedResponse } from "@/shared/shared.types";


async function getAllblogs() {
  try {
    const res = await apiClient.get<PaginatedResponse<BlogPost>>(`/blogs`)
    return res.data
  } catch (err) {
    throw new Error()
  }
}



async function getParticularBlog(
  id: number | string,
) {
  try {
    const res = await apiClient.get<BlogPost>(`blogs/${id}`);
    return res.data;
  } catch (err) {
    throw new Error()
  }
}

async function deleteBlog(id: string) {
  try {
    const res = await apiClient.delete<Response>(`/blogs/${id}`);
    return res.data
  } catch (err) {
    throw new Error()
  }
}

export { getAllblogs, getParticularBlog, deleteBlog };
