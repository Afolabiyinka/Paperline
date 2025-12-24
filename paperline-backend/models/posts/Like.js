"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Likes = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
exports.Likes = db_1.sequelize.define("Likes", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    authorId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
});
//# sourceMappingURL=Like.js.map