"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncModels = void 0;
const db_1 = require("../config/db");
const User_1 = require("./user/User");
const Blog_1 = require("./posts/Blog");
const Comment_1 = require("./posts/Comment");
const Like_1 = require("./posts/Like");
const syncModels = async () => {
    try {
        await db_1.sequelize.sync({ force: false }); // Use { force: true } in development to drop and recreate tables
        console.log("All models synchronized successfully.");
    }
    catch (error) {
        console.error("Error syncing models:", error);
    }
};
exports.syncModels = syncModels;
//Associations for the models
User_1.User.hasMany(Blog_1.Blog, {
    foreignKey: "authorId",
    as: "blogs",
});
Blog_1.Blog.belongsTo(User_1.User, {
    foreignKey: "authorId",
    as: "author",
});
Blog_1.Blog.hasMany(Comment_1.Comments, {
    foreignKey: "authorId",
    as: "commentAuthor",
});
Blog_1.Blog.hasMany(Like_1.Likes, {
    foreignKey: "authorId",
    as: "likeauthor",
});
//# sourceMappingURL=index.js.map