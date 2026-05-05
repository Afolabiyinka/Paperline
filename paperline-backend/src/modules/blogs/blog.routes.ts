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

// Public
blogRouter.get("/", getAllBlogs);
blogRouter.get("/search", searchBlog);
blogRouter.get("/my-blogs", authMiddleware, getUserBlogs);
blogRouter.get("/:id", getParticularBlog);


// Protected
blogRouter.post("/", authMiddleware, createBlog);
blogRouter.delete("/:id", authMiddleware, deleteBlog);             