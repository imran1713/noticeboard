import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppConfig } from "../../appConfig";
import { People } from "../Models/People";

const JWT_SECRET = AppConfig.jwtSecret;

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided." });
    }

    const decoded: jwt.JwtPayload | string = jwt.verify(token, JWT_SECRET);
    const { email, userId } = decoded as { email: string; userId: string };
    if (!userId || !email) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided." });
    }

    const user = await People.findOne({
      ...(userId && { _id: userId }),
      email: email,
    });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No user found!" });
    }

    req.headers.user = JSON.parse(JSON.stringify(user));

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token." });
  }
};
