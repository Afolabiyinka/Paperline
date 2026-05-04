import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));

export const authRoutes: RouteObject[] = [
    { path: "login", Component: Login, handle: { title: "Login to your account" } },
    { path: "signup", Component: SignUp, handle: { title: "Create an account" } },
]