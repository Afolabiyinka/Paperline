"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = exports.loginUser = void 0;
const User_1 = require("../../models/user/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const jwtsecret = process.env.JWT_SECRET || "";
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email, and password is required",
        });
    }
    try {
        //Check if user with email exists
        const user = await User_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        //Check if passwords match
        const isMatch = await bcrypt_1.default.compare(password, user.getDataValue("password"));
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user?.getDataValue("id") }, jwtsecret, {
            expiresIn: "24hr",
        });
        return res.status(200).json({
            token,
            user: {
                username: user?.getDataValue("username"),
                firstname: user.getDataValue("firstname"),
                lastname: user.getDataValue("lastname"),
                email: user?.getDataValue("email"),
                id: user?.getDataValue("id"),
                profilePic: user?.getDataValue("profilePic"),
            },
        });
    }
    catch (err) {
        console.log(err);
        return res.status(504).json({
            message: "Something went wrong",
            err,
        });
    }
};
exports.loginUser = loginUser;
const createAccount = async (req, res) => {
    const { firstname, lastname, email, password, username } = req.body;
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({
            message: "All input field are required",
        });
    }
    try {
        const emailTaken = await User_1.User.findOne({
            where: {
                email,
            },
        });
        if (emailTaken) {
            return res.status(400).json({
                message: "Email already taken",
            });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        const user = await User_1.User.create({
            email,
            firstname,
            lastname,
            username: `${lastname} ${firstname}`,
            password: hashedPassword,
        });
        return res.status(201).json({
            message: "Account created successfully",
            user: {
                username: user?.getDataValue("username"),
                firstname: user.getDataValue("firstname"),
                lastname: user.getDataValue("lastname"),
                email: user?.getDataValue("email"),
                id: user?.getDataValue("id"),
            },
        });
    }
    catch (error) {
        return res.status(504).json({
            message: "Failed to create account",
        });
        console.log(error);
    }
};
exports.createAccount = createAccount;
//# sourceMappingURL=authController.js.map