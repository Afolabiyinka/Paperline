import type { BlogPost } from "@/app/blogs/types/blog.types";
import { apiClient } from "@/shared/api/apiClient";

interface SearchResult {
    blogs: BlogPost[],
    pagination: {
        total: number,
        page: number,
        totalPages: number,
        hasNextPage: boolean,
        hasPrevPage: boolean

    }
}
export const searchBlogs = async (query: string): Promise<SearchResult> => {
    try {
        const res = await apiClient.get(`/blogs/search?q=${encodeURIComponent(query)}`)
        return res.data;
    } catch (err) {
        console.error("Search error:", err);
        throw err;
    }
}