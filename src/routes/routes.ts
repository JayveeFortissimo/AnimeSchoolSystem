import express from "express";
import { register, login, logout } from "../controller/auth/auth";
import { getStudentProfile } from "../controller/student/student";
import { protect } from "../middleware/authMiddleware";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// 👇 Step 1: Login with Google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// 👇 Step 2: Google callback
router.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    // This is the idiomatic way to handle redirects with Passport.
    successRedirect: `${process.env.FRONTEND_URL}/page/userprofile`,
    failureRedirect: `${process.env.FRONTEND_URL}/signIn`,
    session:true
  })
);

router.get("/user", protect, getStudentProfile);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
