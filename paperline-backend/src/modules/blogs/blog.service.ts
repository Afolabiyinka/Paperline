import * as blogRepository from "./blog.repository";
import { CreateBlogPayload } from "./blog.types";

export const createBlog = async (authorId: string, payload: CreateBlogPayload) => {
    if (!authorId) {
        throw new Error("Unauthorized");
    }

    const { title, content, coverImageUrl } = payload;

    if (!title || !content) {
        throw new Error("Title & content is required");
    }

    return await blogRepository.create(payload);
};