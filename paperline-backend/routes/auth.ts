import { Router } from "express";
import { createAccount, loginUser, logout } from "../controllers/user/authController";
import { authMiddleware } from "../middleware/authMiddleWare";
import {
  deleteAccount,
  getUser,
  updateProfile,
} from "../controllers/user/userController";

export const authRouter = Router();
authRouter.route("/login").post(loginUser);
authRouter.route("/signup").post(createAccount);

//Proctected Routes

authRouter.route("/edit-profile").put(authMiddleware, updateProfile);
authRouter.route("/delete").delete(authMiddleware, deleteAccount);
authRouter.route("/me").get(authMiddleware, getUser)
authRouter.route("/logout").post(authMiddleware, logout)