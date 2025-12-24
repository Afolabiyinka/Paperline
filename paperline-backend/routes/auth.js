"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/user/authController");
const authMiddleWare_1 = require("../middleware/authMiddleWare");
const userController_1 = require("../controllers/user/userController");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.route("/login").post(authController_1.loginUser);
exports.authRouter.route("/signup").post(authController_1.createAccount);
//Proctected Routes
exports.authRouter.route("/profile").put(authMiddleWare_1.authMiddleware, userController_1.updateProfile);
exports.authRouter.route("/delete").delete(userController_1.deleteAccount);
//# sourceMappingURL=auth.js.map