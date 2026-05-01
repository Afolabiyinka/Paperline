import { Request, Response } from "express";
import { Op } from "sequelize";
import { CreateBlogPayload, DeleteBlogPayload } from "../../types/blog";
import { Blog } from "../../models/posts/Blog";
import { User } from "../../models/user/User";
import { AuthenticatedRequest } from "../../types/request/types";

const ITEMS_PER_PAGE = 10;

const createBlog = async (req: AuthenticatedRequest, res: Response) => {
  const authorId = req.user?.id;
  const { content, coverImageUrl, title } = req.body as CreateBlogPayload;

  if (!authorId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    if (!title || !content) {
      return res.status(400).json({ message: "Title & content is required" });
    }

    await Blog.create({
      title,
      content,
      authorId,
      ...(coverImageUrl && { coverImageUrl }),
    });

    return res.status(201).json({ message: "Blog created successfully" });
  } catch (err) {
    console.error("ERR", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getParticularBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByPk(id, {
      include: {
        model: User,
        as: "author",
        attributes: ["id", "username", "email", "profilePic"],
      },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(blog);
  } catch (err) {
    console.error("ERR", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllBlogs = async (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(50, parseInt(req.query.limit as string) || ITEMS_PER_PAGE);
  const offset = (page - 1) * limit;

  try {
    const { count, rows: blogs } = await Blog.findAndCountAll({
      include: {
        model: User,
        as: "author",
        attributes: ["id", "username", "email", "profilePic"],
      },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    return res.status(200).json({
      blogs,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
        hasNextPage: page < Math.ceil(count / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    console.error("ERR", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBlog = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.body as DeleteBlogPayload;
  const authorId = req.user?.id;

  try {
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.getDataValue("authorId") !== authorId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await blog.destroy();
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("ERR", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const searchBlog = async (req: Request, res: Response) => {
  const { q } = req.query;
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(50, parseInt(req.query.limit as string) || ITEMS_PER_PAGE);
  const offset = (page - 1) * limit;

  if (!q || typeof q !== "string") {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const { count, rows: blogs } = await Blog.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${q}%` } },
          { content: { [Op.iLike]: `%${q}%` } },
        ],
      },
      include: {
        model: User,
        as: "author",
        attributes: ["id", "username", "email", "profilePic"],
      },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    if (count === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }

    return res.status(200).json({
      blogs,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
        hasNextPage: page < Math.ceil(count / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    console.error("ERR", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserBlogs = async (req: AuthenticatedRequest, res: Response) => {
  const authorId = req.user?.id;
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(50, parseInt(req.query.limit as string) || ITEMS_PER_PAGE);
  const offset = (page - 1) * limit;

  if (!authorId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { count, rows: blogs } = await Blog.findAndCountAll({
      where: { authorId },
      include: {
        model: User,
        as: "author",
        attributes: ["id", "username", "email", "profilePic"],
      },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    if (count === 0) {
      return res.status(404).json({ message: "You have no blogs yet" });
    }

    return res.status(200).json({
      blogs,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
        hasNextPage: page < Math.ceil(count / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    console.error("ERR", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { searchBlog, createBlog, deleteBlog, getAllBlogs, getParticularBlog, getUserBlogs };