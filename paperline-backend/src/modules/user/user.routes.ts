import { Router } from "express";
import { deleteAccount, updateProfile, getUser } from "./user.controller";
import { authMiddleware } from "../../shared/middleware/authMiddleWare";

export const UserRouter = Router();


UserRouter.use(authMiddleware)
UserRouter.route("/")
    .get(getUser)
    .put(updateProfile)
    .delete(deleteAccount);