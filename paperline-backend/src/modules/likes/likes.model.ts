import { DataTypes } from "sequelize";
import { sequelize } from "../../shared/database/connect";

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
