import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";

export const Comments = sequelize.define("Comment", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
