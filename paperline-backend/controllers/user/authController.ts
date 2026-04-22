import { Response } from "express";
import { LoginPayload, RegisterPayload } from "../../types/auth";
import { User } from "../../models/user/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { configDotenv } from "dotenv";
import { AuthenticatedRequest } from "../../types/request/types";

configDotenv();

const jwtsecret = process.env.JWT_SECRET || "";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: (process.env.NODE_ENV === "production" ? "none" : "lax") as
    | "none"
    | "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const loginUser = async (req: AuthenticatedRequest, res: Response) => {
  const { email, password } = req.body as LoginPayload;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email, and password is required",
    });
  }

  try {
    //Check if user with email exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    //Check if passwords match
    const isMatch = await bcrypt.compare(
      password,
      user.getDataValue("password")
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user?.getDataValue("id") }, jwtsecret, {
      expiresIn: "24h",
    });

    res.cookie("token", token, cookieOptions);
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      message: "Something went wrong",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const createAccount = async (req: AuthenticatedRequest, res: Response) => {
  const { firstname, lastname, email, password, username } =
    req.body as RegisterPayload;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({
      message: "All input field are required",
    });
  }

  try {
    const emailTaken = await User.findOne({
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
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      email,
      firstname,
      lastname,
      username: `${lastname} ${firstname}`,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user?.getDataValue("id") }, jwtsecret, {
      expiresIn: "24h",
    });

    res.cookie("token", token, cookieOptions);
    res.status(200).json({ message: "Account created successfully" });
  } catch (error) {
    return res.status(504).json({
      message: "Failed to create account",
    });
  }
};

const logout = async (req: AuthenticatedRequest, res: Response) => {
  res.clearCookie("token", cookieOptions);
  res.json({ message: "Logged out" });
};

export { loginUser, createAccount, logout };
