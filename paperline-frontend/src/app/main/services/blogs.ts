import { prodEndpoint } from "@/app/constants/api";
import type { BlogPost } from "../types/types";

prodEndpoint;

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
  id: number | string
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

export { getAllblogs, getParticularBlog };
