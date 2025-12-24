"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParticularBlog = exports.getAllBlogs = exports.deleteBlog = exports.createBlog = exports.searchBlog = void 0;
const Blog_1 = require("../../models/posts/Blog");
const User_1 = require("../../models/user/User");
const createBlog = async (req, res) => {
    const { content, coverImageUrl, title, authorId } = req.body;
    try {
        if (!title || !content) {
            return res.status(400).json({
                message: "Title & content is required",
            });
        }
        const author = await User_1.User.findByPk(authorId);
        if (!author) {
            return res.status(400).json({
                message: "Author not found",
            });
        }
        const blog = await Blog_1.Blog.create({
            title,
            content,
            coverImageUrl,
            authorId,
        });
        return res.status(201).json({
            message: "Blog created succesfully",
            blog,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal server error",
        });
        console.log("ERR", err);
    }
};
exports.createBlog = createBlog;
const getParticularBlog = async (req, res) => {
    const { id } = req.params;
    const blog = await Blog_1.Blog.findByPk(id, {
        include: {
            model: User_1.User,
            as: "author",
            attributes: ["id", "username", "email", "profilePic"],
        },
    });
    if (!blog) {
        return res.status(404).json({
            message: "Blog not found",
        });
    }
    return res.status(200).json(blog);
};
exports.getParticularBlog = getParticularBlog;
const getAllBlogs = async (req, res) => {
    const blogs = await Blog_1.Blog.findAll({
        include: {
            model: User_1.User,
            as: "author",
            attributes: ["id", "username", "email", "profilePic"],
        },
    });
    res.status(200).json({
        blogs,
    });
};
exports.getAllBlogs = getAllBlogs;
const deleteBlog = async (req, res) => {
    const { id } = req.body;
};
exports.deleteBlog = deleteBlog;
const searchBlog = async (req, res) => { };
exports.searchBlog = searchBlog;
//# sourceMappingURL=blogController.js.map