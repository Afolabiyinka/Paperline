import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Blogs = lazy(() => import("@/app/blogs/pages/blogs/Blogs"));
const CreateBlog = lazy(() => import("@/app/blogs/pages/blogs/CreateBlog"));
const BlogPage = lazy(() => import("@/app/blogs/pages/blogs/BlogPage"));
const ProctectedRoute = lazy(() => import("@/shared/routes/proctectedroute"));

export const blogRoutes: RouteObject[] = [
  { index: true, Component: Blogs, handle: { title: "Paperline | Stories" } },
  {
    path: "create",
    element: <ProctectedRoute children={<CreateBlog />} />,
    handle: { title: "Write a story" },
  },
  { path: ":id", Component: BlogPage, handle: { title: "Blog" } },

];
