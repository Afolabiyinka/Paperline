import { sequelize } from "./connect";
import { User } from "../../modules/user/user.model";
import { Blog } from "../../modules/blogs/blog.model";
import { Comments } from "../../modules/comment/comment.model";
import { Likes } from "../../modules/likes/likes.model";


//Associations
User.hasMany(Blog, {
  foreignKey: "authorId",
  as: "blogs",
});
Blog.belongsTo(User, {
  foreignKey: "authorId",
  as: "author",
});

Blog.hasMany(Comments, {
  foreignKey: "blogId",
  as: "comments",
});
Comments.belongsTo(Blog, {
  foreignKey: "blogId",
  as: "blog",
});
Comments.belongsTo(User, {
  foreignKey: "authorId",
  as: "author",
});

Blog.hasMany(Likes, {
  foreignKey: "blogId",
  as: "likes",
});
Likes.belongsTo(Blog, {
  foreignKey: "blogId",
  as: "blog",
});
Likes.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export const syncModels = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("All models synchronized successfully.");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
};