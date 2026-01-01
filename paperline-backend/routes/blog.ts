import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getParticularBlog,
  searchBlog,
} from "../controllers/posts/blogController";

export const blogRouter = Router();

blogRouter.route("/").get(getAllBlogs);
blogRouter.route("/create").post(createBlog);
blogRouter.route("/:id").get(getParticularBlog);
blogRouter.route("/search").get(searchBlog);
