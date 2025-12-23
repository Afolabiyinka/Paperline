import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
configDotenv();

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USERNAME as string,
  process.env.DATABASE_PASSWORD as string,
  {
    port: Number(process.env.DATABASE_PORT) || 5432,
    host: process.env.DATABASE_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
);

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Postgres Sql connected succesfully");
  } catch (error) {
    console.error("Unable to connect to database", error);
  }
};
