import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import Routes from "./routes/quizroutes.js";
import passport from "passport";
import "./passport.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

// * env
dotenv.config();

// * middlewares
app.set("trust proxy", 1);
app.use(cookieParser(process.env.COOKIE_SECRET)); 
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: process.env.CLIENT_DOMAIN,
    credentials: true,
  })
);

// * db connect
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("CONNECTED TO DB");
    app.listen(process.env.PORT, () => {
      console.log("LISTENING ON PORT: ", process.env.PORT);
    });
  })
  .catch((error) => console.log("ERROR CONNECTING TO DB: ", error));

app.use((req, res, next) => {
  console.log("Session ID:", req.sessionID);
  console.log("User:", req.user);
  next();
});

// * routes
app.use("/", Routes);
