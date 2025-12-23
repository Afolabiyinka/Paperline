import { Router } from "express";
import { createAccount, loginUser } from "../controllers/user/authController";
import { authMiddleware } from "../middleware/authMiddleWare";
import { deleteAccount, updateProfile } from "../controllers/user/userController";


export const authRouter = Router()
authRouter.route("/login").post(loginUser)
authRouter.route("/signup").post(createAccount)

//Proctected Routes

authRouter.route("/profile").put(authMiddleware, updateProfile);
authRouter.route("/delete").delete( deleteAccount)
