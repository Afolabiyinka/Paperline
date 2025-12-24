"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const databaseUrl = process.env.DATABASE_URL;
console.log(databaseUrl);
if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined in environment variables");
}
exports.sequelize = new sequelize_1.Sequelize(databaseUrl, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
const connectDb = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log("Postgres SQL connected successfully");
    }
    catch (error) {
        console.error("Unable to connect to database", error);
    }
};
exports.connectDb = connectDb;
//# sourceMappingURL=db.js.map