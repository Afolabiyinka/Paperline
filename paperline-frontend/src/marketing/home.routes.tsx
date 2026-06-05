import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import MyProfile from "@/app/profile/pages/MyProfile";
import SearchPage from "@/app/search/pages/SearchPage";

const Home = lazy(() => import("@/marketing/pages/Home"));
const About = lazy(() => import("@/marketing/pages/About"));
const Pricing = lazy(() => import("@/marketing/pages/Pricing"));
const Onboarding = lazy(() => import("@/app/onboarding/onboarding"));
const ProctectedRoute = lazy(() => import("@/shared/routes/proctectedroute"));

export const markettingRoutes: RouteObject[] = [
    {
        index: true,
        Component: Home,
        handle: { title: "Home" }
    },
    {
        path: "onboarding",
        Component: Onboarding,
        handle: { title: "Get Started" }
    },
    {
        path: "newsletter",
        Component: About,
        handle: { title: "Newsletter" }
    },
    {
        path: "me",
        element: <ProctectedRoute children={<MyProfile />} />,
        handle: { title: "Profile" }
    },
    {
        path: "pricing",
        Component: Pricing,
        handle: { title: "Plans" }
    },
    {
        path: "search",
        Component: SearchPage,
        handle: { title: "Search results" },
    }
];