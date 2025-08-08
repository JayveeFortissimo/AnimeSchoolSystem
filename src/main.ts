import express from "express";
import cors from "cors";
import router from "./routes/routes";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cookieSession from "cookie-session";
import dotenv from "dotenv";

dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET } = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !SESSION_SECRET) {
  console.error("Error: Missing required environment variables for Google OAuth or session.");
  process.exit(1);
}

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));



app.use(cookieSession({
  name:'accessToken',
  maxAge: 24 * 60 * 60 * 1000,
  keys: [SESSION_SECRET]
}));

app.use(passport.initialize());
app.use(passport.session());

// Configure Passport Google Strategy
passport.use(
    "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/secrets",
    },
    function (accessToken, refreshToken, profile, done) {

        console.log(accessToken, "asdasd")
      // In a real app, you would find or create a user in your database here.

      console.log(profile, "This is a profile")
      return done(null, profile);
    }
  )
);

// Save the session to cookie
passport.serializeUser((user: any, done) => {
                 //ID kinuha lang kasi napaka daming byte sa cookies
  done(null, user.id);
});

// REad the session from the cokies
passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

app.use(router);

export default app;
