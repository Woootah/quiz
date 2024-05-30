import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Footer from "./footer";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const game = () => {
  const [questions, setQuestions] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(0); 
  const { Email, setFinalScore} = useContext(UserContext);
  const navigate = useNavigate();
  const [inputAnswer, setInputAnswer] = useState(""); 
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    if(!Email){
      navigate('/'); 
    }
  }, [])

  useEffect(() => {
    axios
      .get("https://chizquiz-be.vercel.app/questions")
      .then((res) => {
        const loadedQuestions = res.data; 
        loadedQuestions.forEach((question) => {
          if(question.type === 'multiple'){
            question.choices = shuffle(question.choices)
          }
        }); 
        setQuestions(loadedQuestions); 
      })
      .catch((err) => console.log(err));
  }, []);
  
  const checkAns = (e) => {
    let isCorrect = false; 
   if(questions[questionIdx].type === 'identification'){
    if(inputAnswer === questions[questionIdx].correctAnswer){
      isCorrect = true; 
    }
   }
   else if(questions[questionIdx].type === 'multiple'){
    if(e.target.innerHTML === questions[questionIdx].correctAnswer){
      isCorrect = true; 
    }
   }

   if(isCorrect){
    setScore(score + 1)
   }

   return isCorrect; 
  }

  const handleNext = (e) => {
    checkAns(e); 
    if(questionIdx == questions.length - 1){
        setFinalScore(checkAns(e) ? score + 1 : score); 
        navigate('/result'); 
    }
    else {
      setQuestionIdx(questionIdx + 1); 
      setInputAnswer('');  
    }
  }

  const shuffle = (arr) => {
    for(let i = arr.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1)); 
      [arr[i], arr[j]] = [arr[j], arr[i]]; 
    }
    return arr; 
  }


  return (
    <div className="bg-cwhite h-screen grid place-content-center text-center">
      <p className="absolute top-4 right-4 font-secondary">Score: {score} / 5</p>
      {questions.length > 0 ? (
        <div>
          <div className="text-xl font-secondary w-[60vw] break-words">
            <p>{questions[questionIdx].question}</p></div>
          {questions[questionIdx].type === "identification" ? (
            <div className="flex flex-col">
              <input type="text" placeholder="Enter your answer here . ." className="mt-16 p-4 bg-transparent border-2 border-cred outline-none w-[65vw] text-center placeholder:font-secondary placeholder:text-gray-500 placeholder:text-sm font-secondary" value={inputAnswer} onChange={(e) => setInputAnswer(e.target.value)}/>
              <button className="mt-8 font-secondary underline text-cred" onClick={handleNext}>next</button>
            </div>
          ) : (
            <div className="w-[60vw] grid grid-cols-2 gap-6 mt-16 font-secondary text-cwhite">
              {questions[questionIdx].choices && questions[questionIdx].choices.map((choice, index) => (
                <button key={index} className="py-3 easing bg-cred border border-cred hover:bg-transparent hover:text-cred" onClick={(e) => handleNext(e)}>{choice}</button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="font-secondary">Loading</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default game;
