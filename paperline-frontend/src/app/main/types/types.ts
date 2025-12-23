type BlogPost = {
  id: string | number;
  title: string;
  content: string;
  coverImageUrl: string;
  author: { id: string; username: string; email: string; profilePic: string };
};

type CreateBlogPost = {
  title: string;
  content: string;
  authorId: number | string;
  coverImageUrl: string;
};

export type { BlogPost, CreateBlogPost };
