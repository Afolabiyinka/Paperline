type BlogPost = {
  id: string;
  title: string;
  content: string;
  coverImageUrl: string;
  author: { id: string; username: string; email: string; profilePic: string };
  createdAt?: Date | string;
};

type CreateBlogPayload = {
  title: string;
  content: string;
  coverImageUrl: string | null;
};

export type { BlogPost, CreateBlogPayload };
