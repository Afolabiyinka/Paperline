import { prodEndpoint } from "@/shared/constants/api";
import type { BlogPost } from "../types/types";


async function getAllblogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${prodEndpoint}/api/blogs/`, {});
    const data = await res.json();
    return data.blogs;
  } catch (err) {
    console.log(err);
  }
  return [];
}



async function getParticularBlog(
  id: number | string,
): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${prodEndpoint}/api/blogs/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
  return null;
}

async function deleteBlog(id: string): Promise<void> {
  try {
    const res = await fetch(`${prodEndpoint}/api/blogs/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Failed to delete blog");
    }
  } catch (err) {
    console.log(err);
  }
}

export { getAllblogs, getParticularBlog, deleteBlog };
