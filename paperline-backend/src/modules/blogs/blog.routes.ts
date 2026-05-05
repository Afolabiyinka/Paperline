import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getParticularBlog,
  searchBlog,
  deleteBlog,
  getUserBlogs,
} from "./blog.controller";
import { authMiddleware } from "../../shared/middleware/authMiddleWare";

export const blogRouter = Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/search", searchBlog);
blogRouter.get("/:id", getParticularBlog);

// Protected Routes
blogRouter.post("/", authMiddleware, createBlog);
blogRouter.get("/my-blogs", authMiddleware, getUserBlogs);
blogRouter.delete("/:id", authMiddleware, deleteBlog);