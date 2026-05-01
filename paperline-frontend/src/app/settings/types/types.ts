import type { BlogPost } from "@/app/blogs/types/types";

export interface AuthUser {
    id?: string | number;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    profilePic: string;
}

export interface MyBlogs {
    blogs: BlogPost[],
    pagination: {
        total: number,
        page: number,
        totalPages: number,
        hasNextPage: boolean,
        hasPrevPage: boolean
    }
}