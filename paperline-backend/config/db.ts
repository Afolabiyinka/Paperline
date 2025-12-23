import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
configDotenv();

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Postgres SQL connected successfully");
  } catch (error) {
    console.error("Unable to connect to database", error);
  }
};
