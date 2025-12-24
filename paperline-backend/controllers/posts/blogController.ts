import { Request, Response } from "express";
import { CreateBlogPayload, deleteBlogPayload } from "../../types/blog";
import { Blog } from "../../models/posts/Blog";
import { User } from "../../models/user/User";

const createBlog = async (req: Request, res: Response) => {
  const { content, coverImageUrl, title, authorId } =
    req.body as CreateBlogPayload;

  try {
    if (!title || !content) {
      return res.status(400).json({
        message: "Title & content is required",
      });
    }

    const author = await User.findByPk(authorId);
    if (!author) {
      return res.status(400).json({
        message: "Author not found",
      });
    }
    const blog = await Blog.create({
      title,
      content,
      coverImageUrl,
      authorId,
    });

    return res.status(201).json({
      message: "Blog created succesfully",
      blog,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.log("ERR", err);
  }
};

const getParticularBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  const blog = await Blog.findByPk(id, {
    include: {
      model: User,
      as: "author",
      attributes: ["id", "username", "email", "profilePic"],
    },
  });

  if (!blog) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }

  return res.status(200).json(blog);
};
const getAllBlogs = async (req: Request, res: Response) => {
  const blogs = await Blog.findAll({
    include: {
      model: User,
      as: "author",
      attributes: ["id", "username", "email", "profilePic"],
    },
  });

  res.status(200).json({
    blogs,
  });
};
const deleteBlog = async (req: Request, res: Request) => {
  const { id } = req.body as deleteBlogPayload;
};

const searchBlog = async (req: Request, res: Response) => {};

export { searchBlog, createBlog, deleteBlog, getAllBlogs, getParticularBlog };
