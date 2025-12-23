import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
configDotenv();

const databaseUrl = process.env.DATABASE_URL;
console.log(databaseUrl);

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

export const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
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
