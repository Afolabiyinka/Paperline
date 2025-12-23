import Fallback from "@/components/loader/fallbackloader";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

// auth
const AuthLayout = lazy(() => import("@/app/auth"));
const Login = lazy(() => import("@/app/auth/pages/login"));
const SignUp = lazy(() => import("@/app/auth/pages/signup"));

// home
const HomeLayout = lazy(() => import("@/app/home"));
const Home = lazy(() => import("@/app/home/pages/Home"));
const About = lazy(() => import("@/app/home/pages/About"));
const Pricing = lazy(() => import("@/app/home/pages/Pricing"));

// blogs
const BlogLayout = lazy(() => import("@/app/main/pages/Index"));
const Blogs = lazy(() => import("@/app/main/pages/blogs/Blogs"));
const CreateBlog = lazy(() => import("@/app/main/pages/blogs/CreateBlog"));
const BlogPage = lazy(() => import("@/app/main/pages/blogs/BlogPage"));

// settings
const Settings = lazy(() => import("@/app/main/pages/settings/Settings"));

// others
const Notfound = lazy(() => import("@/components/Notfound"));
const ProctectedRoute = lazy(() => import("./proctectedroute"));

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: HomeLayout,
    children: [
      { index: true, Component: Home },
      { path: "newsletter", Component: About },
      {
        path: "settings",
        element: <ProctectedRoute children={<Settings />} />,
      },
      { path: "pricing", Component: Pricing },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "login", Component: Login },
          { path: "signup", Component: SignUp },
        ],
      },
      {
        path: "blogs",
        Component: BlogLayout,
        children: [
          { index: true, Component: Blogs },
          {
            path: "create",
            element: <ProctectedRoute children={<CreateBlog />} />,
          },
          { path: ":id", Component: BlogPage },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: Notfound,
  },
  {
    path: "random",
    Component: Fallback,
  },
];
