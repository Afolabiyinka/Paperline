import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getParticularBlog,
  searchBlog,
  deleteBlog,
  getUserBlogs,
} from "./blogController";
import { authMiddleware } from "../../shared/middleware/authMiddleWare";

export const blogRouter = Router();

blogRouter.use(authMiddleware);
blogRouter.route("/").get(getAllBlogs);
blogRouter.route("/create").post(createBlog);
blogRouter.route("/search").get(searchBlog);
blogRouter.route("/me").get(getUserBlogs);
blogRouter.route("/delete").delete(deleteBlog);
blogRouter.route("/:id").get(getParticularBlog);             