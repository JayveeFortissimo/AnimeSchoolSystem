
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config


const  authMiddleware:RequestHandler = async(req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_SECRET_KEY as string, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user as any;
    next();
  });
}

export default authMiddleware;