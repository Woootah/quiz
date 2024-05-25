import express from "express";
import { Question } from "../models/question.js";
import passport from "passport";
import dotenv from "dotenv"

dotenv.config()
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
      `${process.env.CLIENT_DOMAIN}/?message=You can only play once per email`,
  }),
  (req, res) => {
    if (req.authInfo && req.authInfo.message == "Already Played") {
      return res.redirect(
        `${process.env.CLIENT_DOMAIN}/?message=You can only play once per email`
      );
    }
    res.redirect(
      `${process.env.CLIENT_DOMAIN}`
    );
  }
);

router.get("/user", (req, res) => {
  if(req.isAuthenticated()){
    res.json({
      email: req.user.email,
      displayName: req.user.displayName
    })
  }
  else {
    res.status(401).send({message: "Not Authenticated"})
  }
})

// * create questions
router.post("/create", async (req, res) => {
  try {
    const { question, type, choices, correctAnswer } = req.body;

    if (type === "multiple" && !choices) {
      res.status(400).send({
        message: "Provide choices for multiple choice type question",
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

router.get('/questions', async (req, res) => {
  try{
    const questions = await Question.aggregate([{$sample: {size: 5}}]); 
    return res.status(200).send(questions)
  }
  catch(error){
    res.status(500).send({error})
  }
})

export default router;
