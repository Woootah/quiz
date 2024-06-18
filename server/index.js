import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import Routes from "./routes/quizroutes.js";
import passport from "passport";
import session from "express-session"; 
import "./strategies/google.js"; 
import cors from "cors";
import MongoStore from "connect-mongo";

const app = express();

// * env
dotenv.config();

// * middlewares
app.use(express.json());
app.use(session({
  secret: process.env.COOKIE_SECRET, 
  saveUninitialized: true, 
  resave: false, 
  cookie: {
    maxAge: 60000 * 60, 

  }, 
  store: MongoStore.create({
    mongoUrl: process.env.DB
  })
}))
app.use(passport.initialize()); 
app.use(passport.session()); 
app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST']
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
