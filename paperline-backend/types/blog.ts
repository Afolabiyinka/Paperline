export interface CreateBlogPayload {
    title: string;
    content: string;
    coverImageUrl?: string;
}

export interface BlogByIdPayload {
    id: string;
}

export type DeleteBlogPayload = BlogByIdPayload;