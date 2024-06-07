import express from "express";
import { Question } from "../models/question.js";
import { Winner } from "../models/winner.js";
import passport from "passport";
import dotenv from "dotenv"

dotenv.config()
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Hello ChizQuizzer"); 
})

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
    console.log('Session ID in callback:', req.sessionID);
    if (req.authInfo && req.authInfo.message == "Already Played") {
      return res.redirect(
        `${process.env.CLIENT_DOMAIN}/?message=You can only play once per email`
      );
    }

    if(req.isAuthenticated() && req.user.email){
      console.log(req.session); 
      console.log("REQ IS AUTHENTICATED: /CALLBACK", req.isAuthenticated());
      return res.redirect(`${process.env.CLIENT_DOMAIN}/play`); 
    }

    console.log("Redirecting to home")
    return res.redirect(
      `${process.env.CLIENT_DOMAIN}`
    );
  }
);

router.get('/api/logout', (req, res) => {
  req.logout((err) => {
    if(err){
      res.status(500).send({message: "Logout Failed", error: err}); 
    }
  });
  res.redirect(process.env.CLIENT_DOMAIN); 
})

router.get("/user", (req, res) => {
  console.log(req.session); 
  console.log('Session ID in user route:', req.sessionID);
  console.log("REQ IS AUTHENTICATED: /USER", req.isAuthenticated());
  if(req.isAuthenticated()){
    res.json({
      email: req.user.email,
      displayName: req.user.displayName
    })
  }
  else {
    console.log("User not authenticated")
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

router.post('/winner', async (req, res) => {
  try{
    const {email, score} = req.body; 
    
    const existingWinner = await Winner.findOne({ email, score });
    if (existingWinner) {
      return res.status(400).send({ message: "Winner already recorded" });
    }
    
    const newWinner = new Winner({
      email, 
      score
    })

    const winner = await newWinner.save(); 
    res.status(200).send(winner); 

  }catch(error){
    res.status(500).send({message: "Recording winner failed"})
  }
})

router.get('/winners', async (req, res) => {
  try{
    const winner = await Winner.find(); 
    if(winner){
      res.status(200).send(winner); 
    }  
  }
  catch(err){
    res.status(500).send({message: "Fetch Failed"})
  }
})

export default router;
