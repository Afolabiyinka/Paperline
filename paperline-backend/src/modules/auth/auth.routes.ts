import { Router } from "express";
import { createAccount, loginUser, logout } from "./auth.controller";
import { authMiddleware } from "../../shared/middleware/authMiddleWare";
import { authLimiter } from "../../shared/middleware/rateLimiters";


export const authRouter = Router();

authRouter.use(authLimiter)
authRouter.route("/login").post(loginUser);
authRouter.route("/signup").post(createAccount);

authRouter.route("/logout").post(authMiddleware, logout)