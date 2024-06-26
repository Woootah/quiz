import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import Routes from "./routes/quizroutes.js";
import cors from "cors";

const app = express();

// * env
dotenv.config();

// * middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_DOMAIN,
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

// * routes
app.use("/", Routes);
