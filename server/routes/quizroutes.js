import express from "express";
import { Question } from "../models/question.js";

const router = express.Router();

// router.get('/', async (req, res) => {
//     res.send("hello world!")
// })

// * create questions
router.post("/create", async (req, res) => {
  try {
    const { question, type, choices, correctAnswer } = req.body;

    if (type === "multiple" && (!choices || choices.length < 4)) {
      res
        .status(400)
        .send({
          message: "There should be 4 choices for a multiple-choice question.",
        });
    }

    if (type === "identification" && choices != null) {
      res
        .status(400)
        .send({
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
    res.status(500).send({ message: `SERVER ERROR => ${error}`});
  }
});

export default router;
