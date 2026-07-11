import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not defined");
}



export const sequelize =

  new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });


//Local database connection

// export const sequelize = new Sequelize(
//   process.env.DATABASE_NAME as string,
//   process.env.DATABASE_USERNAME as string,
//   process.env.DATABASE_PASSWORD,
//   {
//     port: Number(process.env.DATABASE_HOST) || 5432,
//     host: process.env.DATABASE_HOST || "localhost",
//     dialect: "postgres",
//     logging: false,
//   }
// );


export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Neon Database connected successfully");
  } catch (err) {
    console.error("Unable to connect to Database", err);
  }
};