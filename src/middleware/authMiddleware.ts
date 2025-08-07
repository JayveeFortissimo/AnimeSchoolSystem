import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["accessToken"]; 

  if (!token) return res.status(401).json({ message: "Access Token Missing" });

  const users = jwt.verify(
    token,
    process.env.ACCESS_SECRET_KEY as string
  ) as JwtPayload;


  req.user = users;
  next();
};
