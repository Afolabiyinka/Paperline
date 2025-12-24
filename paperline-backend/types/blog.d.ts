export interface CreateBlogPayload {
    title: string;
    content: string;
    coverImageUrl: string;
    authorId: string;
    id: string | number;
}
export interface getBlogPayload {
    id: string | number;
}
export type deleteBlogPayload = getBlogPayload;
//# sourceMappingURL=blog.d.ts.map