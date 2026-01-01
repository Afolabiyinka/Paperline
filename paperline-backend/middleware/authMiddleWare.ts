import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { DecodedUser } from "../types/auth";
import dotenv from "dotenv";
import { AuthenticatedRequest } from "../types/request/types";

dotenv.config();

const jwtsecret = process.env.JWT_SECRET;

if (!jwtsecret) {
  throw new Error("JWT_SECRET is not defined");
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, jwtsecret);

    if (typeof decoded !== "object" || !decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = decoded as DecodedUser;

    req.user = {
      id: user.id,
    };

    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};
