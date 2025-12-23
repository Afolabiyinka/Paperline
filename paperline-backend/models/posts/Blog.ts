import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";

export const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true, // ✅ must have
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    coverImageUrl: {
      type: DataTypes.STRING,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
