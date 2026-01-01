import { prodEndpoint } from "@/app/constants/api";
import type { BlogPost } from "../types/types";
import type { UpdateUserPayload } from "@/app/auth/types/types";
import { useAuthStore } from "@/app/store/authStore";

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
    const res = await fetch(`${prodEndpoint}/api/blogs/blog/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
  return null;
}

export { getAllblogs, getParticularBlog };

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

export { update };
