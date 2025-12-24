"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const blogController_1 = require("../controllers/posts/blogController");
exports.blogRouter = (0, express_1.Router)();
exports.blogRouter.route("/").get(blogController_1.getAllBlogs);
exports.blogRouter.route("/create").post(blogController_1.createBlog);
exports.blogRouter.route("/blog/:id").get(blogController_1.getParticularBlog);
exports.blogRouter.route("/search").get(blogController_1.searchBlog);
//# sourceMappingURL=blog.js.map