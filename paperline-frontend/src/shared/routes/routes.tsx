import { authRoutes } from "@/app/auth/auth.routes";
import { blogRoutes } from "@/app/blogs/blog.routes";
import { markettingRoutes } from "@/marketing/home.routes";
import { lazy, useEffect } from "react";
import { Outlet, useMatches, type RouteObject } from "react-router-dom";


//Layouts
const AuthLayout = lazy(() => import("@/app/auth"));
const HomeLayout = lazy(() => import("@/marketing/index"));
const BlogLayout = lazy(() => import("@/app/blogs/pages/Index"));
const Notfound = lazy(() => import("@/components/Notfound"));


const RootWrapper = () => {
  const matches = useMatches();
  useEffect(() => {
    const currentMatch = [...matches].reverse().find((m) =>
      (m.handle as { title?: string })?.title
    );
    const pageTitle = (currentMatch?.handle as { title?: string })?.title || "";
    document.title = `${pageTitle}`;
  }, [matches]);
  return <Outlet />;
};

export const routes: RouteObject[] = [
  {
    element: <RootWrapper />,
    children: [
      {
        path: "",
        Component: AuthLayout,
        children: authRoutes
      },
      {
        path: "/",
        Component: HomeLayout,
        children: [
          {
            children: markettingRoutes
          },
          {
            path: "blogs",
            Component: BlogLayout,
            children: blogRoutes
          },
        ]
      },

      {
        path: "*",
        Component: Notfound,
        handle: {
          title: "Oop's Page not found"
        }
      },
    ]
  }

];
