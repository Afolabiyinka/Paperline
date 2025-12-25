import { Request, Response } from "express";
import { LoginPayload, RegisterPayload } from "../../types/auth";
import { User } from "../../models/user/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { configDotenv } from "dotenv";

configDotenv();

const jwtsecret = process.env.JWT_SECRET || "";

const loginUser = async (req: Request, res: Response) => {
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
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      message: "Something went wrong",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const createAccount = async (req: Request, res: Response) => {
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

    return res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        username: user?.getDataValue("username"),
        firstname: user.getDataValue("firstname"),
        lastname: user.getDataValue("lastname"),
        email: user?.getDataValue("email"),
        id: user?.getDataValue("id"),
      },
    });
  } catch (error) {
    return res.status(504).json({
      message: "Failed to create account",
    });
    console.log(error);
  }
};

export { loginUser, createAccount };
