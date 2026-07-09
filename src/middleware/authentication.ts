import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: `Access token required`,
    });

    return;
  }

  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret!);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      message: `Invalid or expired token`,
    });
  }
};

export default authenticateToken;
