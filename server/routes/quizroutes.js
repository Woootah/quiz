import express from "express";
import { Question } from "../models/question.js";
import passport from "passport";

const router = express.Router();

// * Google Authentication
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect:
      "http://localhost:5173/?message=You can only play once per email",
  }),
  (req, res) => {
    if (req.authInfo && req.authInfo.message == "Already Played") {
      return res.redirect(
        "http://localhost:5173/?message=You can only play once per email"
      );
    }
    res.send("waw sabaw");
  }
);

// * create questions
router.post("/create", async (req, res) => {
  try {
    const { question, type, choices, correctAnswer } = req.body;

    if (type === "multiple" && (!choices || choices.length < 4)) {
      res.status(400).send({
        message: "There should be 4 choices for a multiple-choice question.",
      });
    }

    if (type === "identification" && choices != null) {
      res.status(400).send({
        message: "Questions of type identification doesn't require choices",
      });
    }

    const newQuestion = new Question({
      question,
      type,
      choices: type === "multiple" ? choices : undefined,
      correctAnswer,
    });

    const saveQuestion = await newQuestion.save();
    res.status(200).send(saveQuestion);
  } catch (error) {
    res.status(500).send({ message: `SERVER ERROR => ${error}` });
  }
});

export default router;
