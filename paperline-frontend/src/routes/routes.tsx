import Onboarding from "@/app/onboarding/onboarding";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

// auth
const AuthLayout = lazy(() => import("@/app/auth"));
const Login = lazy(() => import("@/app/auth/pages/login"));
const SignUp = lazy(() => import("@/app/auth/pages/signup"));

// home
const HomeLayout = lazy(() => import("@/marketing"));
const Home = lazy(() => import("@/marketing/pages/Home"));
const About = lazy(() => import("@/marketing/pages/About"));
const Pricing = lazy(() => import("@/marketing/pages/Pricing"));

// blogs
const BlogLayout = lazy(() => import("@/app/blogs/pages/Index"));
const Blogs = lazy(() => import("@/app/blogs/pages/blogs/Blogs"));
const CreateBlog = lazy(() => import("@/app/blogs/pages/blogs/CreateBlog"));
const BlogPage = lazy(() => import("@/app/blogs/pages/blogs/BlogPage"));

// settings
const Settings = lazy(() => import("@/app/settings/Settings"));

// others
const Notfound = lazy(() => import("@/components/Notfound"));
const ProctectedRoute = lazy(() => import("./proctectedroute"));

export const routes: RouteObject[] = [
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "signup", Component: SignUp },
    ],
  },
  {
    path: "/",
    Component: HomeLayout,
    children: [
      { index: true, Component: Home },
      { path: "onboarding", Component: Onboarding },
      { path: "newsletter", Component: About },
      {
        path: "settings",
        element: <ProctectedRoute children={<Settings />} />,
      },
      { path: "pricing", Component: Pricing },

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
];
