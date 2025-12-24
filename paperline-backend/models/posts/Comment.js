"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
exports.Comments = db_1.sequelize.define("Comment", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    authorId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
});
//# sourceMappingURL=Comment.js.map