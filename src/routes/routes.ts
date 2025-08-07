import express from "express";
import { Request, Response } from "express";
import { register,login,logout } from "../controller/auth/auth";
import { getStudentProfile } from "../controller/student/student";
import { protect } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

router.get('/user', protect, getStudentProfile)

router.post("/register", register);
router.post("/login",login);
router.post("/logout", logout);

export default router;
