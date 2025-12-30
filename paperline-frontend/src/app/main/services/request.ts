import type { BlogPost } from "../types/types";

const baseUrl = import.meta.env.VITE_BASEURL!;

async function getAllblogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${baseUrl}/api/blogs/`, {});
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
    const res = await fetch(`${baseUrl}/api/blogs/blog/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
  return null;
}

export { getAllblogs, getParticularBlog };
