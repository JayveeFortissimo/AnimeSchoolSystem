import express from "express";
import { Request, Response } from "express";
import { register,login,logout } from "../controller/auth/auth";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

router.post("/register", register);
router.post("/login",login);
router.post("/logout", logout);

export default router;
