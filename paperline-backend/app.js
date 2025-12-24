"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const models_1 = require("./models");
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./routes/auth");
const dotenv_1 = require("dotenv");
const blog_1 = require("./routes/blog");
(0, dotenv_1.configDotenv)();
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["https://paperline-icechain.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
//Database stuff
(0, db_1.connectDb)();
(0, models_1.syncModels)();
//Routing stuff
app.use("/api/auth", auth_1.authRouter);
app.use("/api/blogs", blog_1.blogRouter);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
app.get("/", (req, res) => {
    res.send(`<h1> View the api docs <a href="https://bk52izj9t0.apidog.io">Here</a>`);
});
//Send emails
// sendEmail()
//# sourceMappingURL=app.js.map