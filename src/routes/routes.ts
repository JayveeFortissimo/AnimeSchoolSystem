import express from "express";
import { Request, Response } from "express";
import { register,login } from "../controller/auth/auth";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

router.post("/register", register);
router.post("/login",login);

export default router;
