import { sequelize } from "../config/db";
import { User } from "./user/User";
import { Blog } from "./posts/Blog";
import { Comments } from "./posts/Comment";
import { Likes } from "./posts/Like";

export const syncModels = async () => {
  try {
    await sequelize.sync({ force: false }); // Use { force: true } in development to drop and recreate tables
    console.log("All models synchronized successfully.");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
};

//Associations for the models

User.hasMany(Blog, {
  foreignKey: "authorId",
  as: "blogs",
});

Blog.belongsTo(User, {
  foreignKey: "authorId",
  as: "author",
});

Blog.hasMany(Comments, {
  foreignKey: "authorId",
  as: "commentAuthor",
});
Blog.hasMany(Likes, {
  foreignKey: "authorId",
  as: "likeauthor",
});
