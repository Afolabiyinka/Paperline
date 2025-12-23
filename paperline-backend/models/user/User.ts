import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
export const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  firstname: {
    type: DataTypes.STRING,
  },
  lastname: {
    type: DataTypes.STRING,
  },

  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  profilePic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
