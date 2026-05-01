import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db";
import { User } from "../user/User";

// DB-level attributes — every column on the table
interface BlogAttributes {
  id: string;
  title: string;
  content: string;
  coverImageUrl?: string;
  authorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// fields optional during Blog.create()
interface BlogCreationAttributes extends Optional<BlogAttributes, "id" | "createdAt" | "updatedAt"> { }

export class Blog
  extends Model<BlogAttributes, BlogCreationAttributes>
  implements BlogAttributes {
  declare id: string;
  declare title: string;
  declare content: string;
  declare coverImageUrl?: string;
  declare authorId: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Blog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
      allowNull: true,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Blog",
    timestamps: true,
  }
);


