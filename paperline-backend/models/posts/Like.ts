import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";

export const Likes = sequelize.define("Likes", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
