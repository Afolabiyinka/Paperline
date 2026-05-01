import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getParticularBlog,
  searchBlog,
  deleteBlog,
  getUserBlogs,
} from "../controllers/posts/blogController";
import { authMiddleware } from "../middleware/authMiddleWare";

export const blogRouter = Router();

blogRouter.route("/").get(getAllBlogs);
blogRouter.route("/create").post(authMiddleware, createBlog);
blogRouter.route("/search").get(searchBlog);
blogRouter.route("/me").get(authMiddleware, getUserBlogs);
blogRouter.route("/delete").delete(authMiddleware, deleteBlog);
blogRouter.route("/:id").get(getParticularBlog);             