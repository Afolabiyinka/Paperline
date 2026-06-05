import type { BlogPost } from "@/app/blogs/types/types";
import { prodEndpoint } from "@/shared/constants/api";

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
        const res = await fetch(`${prodEndpoint}/api/blogs/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Search failed");
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Search error:", err);
        throw err;
    }
}